import React, { FormEvent } from 'react'

import { addRecipe } from 'ts/services/recipe'
import { scrapeRecipe } from 'ts/services/recipeScrape'
import { Recipe } from 'ts/utils/models'

import { LoadingButton } from '@mui/lab'
import {
	Alert,
	CircularProgress,
	Divider,
	Icon,
	IconButton,
	InputBase,
	Paper,
	Typography,
} from '@mui/material'
import { Box } from '@mui/system'

import ImportPreview from './ImportPreview'

export default function ImportRecipe(props: {
	onAdd: (recipeID: string) => void
	bookID: string
}): React.ReactElement {
	const { onAdd, bookID } = props

	const [scraping, setScraping] = React.useState(false)
	const [scrapeError, setScrapeError] = React.useState('')
	const [url, setUrl] = React.useState('')
	const [recipe, setRecipe] = React.useState<Recipe | null>(null)

	const [adding, setAdding] = React.useState(false)
	const [addRecipeError, setAddRecipeError] = React.useState('')

	function handleScrape(e: FormEvent): void {
		e.preventDefault()
		setScrapeError('')
		setRecipe(null)

		if (!url) {
			setScrapeError('Enter a URL')
			return
		}

		setScraping(true)
		scrapeRecipe(url)
			.then((r: Recipe) => setRecipe(r))
			.catch(() => setScrapeError('Unable to import recipe fom URL'))
			.finally(() => setScraping(false))
	}

	function handleAddRecipe(event: React.MouseEvent): void {
		event.preventDefault()

		setAddRecipeError('')

		if (!recipe) {
			setAddRecipeError('No recipe selected')
			return
		}

		setAdding(true)

		addRecipe(bookID, recipe)
			.then(recipeID => onAdd(recipeID))
			.catch(() => setAddRecipeError('Error adding recipe'))
			.finally(() => setAdding(false))
	}

	return (
		<Box>
			<Typography variant='h2' sx={{ mb: 3 }}>
				Import Recipe
			</Typography>

			<Paper
				component='form'
				onSubmit={handleScrape}
				sx={{ py: 1, px: 1, mb: 2, display: 'flex', alignItems: 'center' }}
			>
				<InputBase
					placeholder='Recipe URL'
					sx={{ width: '100%', mx: 1 }}
					onChange={(e): void => setUrl(e.target.value)}
				/>
				<Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
				<IconButton
					type='submit'
					color='primary'
					sx={{ p: 1 }}
					disabled={scraping}
				>
					{scraping ? (
						<CircularProgress size={24} />
					) : (
						<Icon>cloud_download</Icon>
					)}
				</IconButton>
			</Paper>

			{scrapeError && (
				<Alert severity='error' sx={{ mb: 2 }}>
					{scrapeError}
				</Alert>
			)}

			{recipe && <ImportPreview recipe={recipe} />}

			{addRecipeError && (
				<Alert sx={{ mt: 2 }} severity='error'>
					{addRecipeError}
				</Alert>
			)}

			{recipe && (
				<LoadingButton
					loading={adding}
					onClick={handleAddRecipe}
					fullWidth
					variant='contained'
					sx={{ mt: 2, mb: 2 }}
				>
					Import Recipe
				</LoadingButton>
			)}
		</Box>
	)
}
