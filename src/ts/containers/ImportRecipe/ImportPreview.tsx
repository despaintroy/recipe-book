import React from 'react'

import { Recipe } from 'ts/utils/models'

import { Card, CardContent, CardMedia, Typography } from '@mui/material'

export default function ImportPreview(props: {
	recipe: Recipe
}): React.ReactElement {
	const { recipe } = props

	return (
		<Card sx={{ my: 1, display: 'inline-block', width: '100%' }}>
			<CardMedia
				component={recipe.image ? 'img' : 'div'}
				src={recipe.image}
				sx={{
					maxHeight: '150px',
					minHeight: '40px',
					backgroundColor: 'secondary.main',
				}}
			/>
			<CardContent>
				<Typography variant='h3' sx={{ mb: 1 }}>
					{recipe.name}
				</Typography>

				{recipe.totalTime && (
					<Typography variant='body2'>{recipe.totalTime}</Typography>
				)}
			</CardContent>
		</Card>
	)
}
