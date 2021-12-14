import React from 'react'

import { Link } from 'react-router-dom'
import { Recipe } from 'ts/utils/models'
import Paths from 'ts/utils/paths'

import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material'

export default function RecipeMasonryTile(props: {
	recipe: Recipe
}): React.ReactElement {
	const { recipe } = props

	return (
		<Card sx={{ my: 1, display: 'inline-block', width: '100%' }}>
			<CardActionArea
				component={Link}
				to={Paths.getRecipeDetailLink(recipe.id)}
			>
				<CardMedia
					component={recipe.image ? 'img' : 'div'}
					src={recipe.image}
					sx={{
						maxHeight: '200px',
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
			</CardActionArea>
		</Card>
	)
}
