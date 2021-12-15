import React, { useEffect } from 'react'

import RecipeCard from 'ts/components/RecipeCard'
import { scrapeRecipe } from 'ts/services/recipeScrape'
import { Recipe } from 'ts/utils/models'

import { LoadingButton } from '@mui/lab'
import { Alert, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'

export default function ImportRecipe(props: {
	setRecipeCallback: (recipe: Recipe | null) => void
}): React.ReactElement {
	const { setRecipeCallback } = props
	const [url, setUrl] = React.useState('')
	const [recipe, setRecipe] = React.useState<Recipe | null>(null)
	const [submitting, setSubmitting] = React.useState(false)
	const [error, setError] = React.useState('')

	useEffect(() => setRecipeCallback(recipe), [recipe])

	return (
		<Box>
			<Typography variant='h2' sx={{ mb: 3 }}>
				Import Recipe
			</Typography>
			<TextField
				label='Recipe URL'
				fullWidth
				sx={{ mb: 2 }}
				onChange={(e): void => setUrl(e.target.value)}
			/>
			{error && (
				<Alert severity='error' sx={{ mb: 2 }}>
					{error}
				</Alert>
			)}
			<LoadingButton
				onClick={(): void => {
					setError('')
					setRecipe(null)
					setSubmitting(true)
					scrapeRecipe(url)
						.then((r: Recipe) => setRecipe(r))
						.catch(() => setError('Unable to import recipe fom that URL'))
						.finally(() => setSubmitting(false))
				}}
				fullWidth
				variant='contained'
				color='primary'
				loading={submitting}
				disabled={!url}
			>
				Get Recipe
			</LoadingButton>

			{recipe && <RecipeCard recipe={recipe} />}
		</Box>
	)
}
