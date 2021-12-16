import React, { FormEvent, useEffect } from 'react'

import { scrapeRecipe } from 'ts/services/recipeScrape'
import { Recipe } from 'ts/utils/models'

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
	setRecipeCallback: (recipe: Recipe | null) => void
}): React.ReactElement {
	const { setRecipeCallback } = props
	const [url, setUrl] = React.useState('')
	const [recipe, setRecipe] = React.useState<Recipe | null>(null)
	const [submitting, setSubmitting] = React.useState(false)
	const [error, setError] = React.useState('')

	useEffect(() => setRecipeCallback(recipe), [recipe])

	function onSubmit(e: FormEvent): void {
		e.preventDefault()
		setError('')
		setRecipe(null)
		setSubmitting(true)
		scrapeRecipe(url)
			.then((r: Recipe) => setRecipe(r))
			.catch(() => setError('Unable to import recipe fom that URL'))
			.finally(() => setSubmitting(false))
	}

	return (
		<Box>
			<Typography variant='h2' sx={{ mb: 3 }}>
				Import Recipe
			</Typography>

			<Paper
				component='form'
				onSubmit={onSubmit}
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
					disabled={submitting}
				>
					{submitting ? (
						<CircularProgress size={24} />
					) : (
						<Icon>cloud_download</Icon>
					)}
				</IconButton>
			</Paper>

			{error && (
				<Alert severity='error' sx={{ mb: 2 }}>
					{error}
				</Alert>
			)}

			{recipe && <ImportPreview recipe={recipe} />}
		</Box>
	)
}
