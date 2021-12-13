import React from 'react'

import { Recipe } from 'ts/utils/models'

import Timeline from '@mui/lab/Timeline'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import { Card, CardContent, CardMedia, Icon, Typography } from '@mui/material'
import { Box } from '@mui/system'

export default function RecipeCard(props: {
	recipe: Recipe
}): React.ReactElement {
	const { recipe } = props

	return (
		<Card sx={{ my: 4 }}>
			<CardMedia
				component='img'
				height={300}
				image={recipe.image}
				alt={recipe.name}
			/>
			<CardContent>
				<Typography variant='h1' sx={{ mt: 1, mb: 3 }}>
					{recipe.name}
				</Typography>

				<Typography variant='body1' sx={{ mb: 2 }}>
					{recipe.description}
				</Typography>

				<Box sx={{ display: 'flex', mb: 2 }}>
					<Icon sx={{ fontSize: 'inherit', my: 'auto', marginRight: 2 }}>
						timer
					</Icon>
					<Box>
						<Typography variant='body1' fontWeight={'bold'}>
							{recipe.totalTime}
						</Typography>
						<Typography variant='body2' color='GrayText'>
							{[`${recipe.prepTime} prep`, `${recipe.cookTime} cook`].join(
								' + '
							)}
						</Typography>
					</Box>
				</Box>

				<Box sx={{ display: 'flex', mb: 2 }}>
					<Icon sx={{ fontSize: 'inherit', my: 'auto', marginRight: 2 }}>
						restaurant
					</Icon>
					<Typography variant='body1' fontWeight={'bold'}>
						Makes {recipe.recipeYield}
					</Typography>
				</Box>

				<Typography variant='h2' sx={{ mt: 3 }}>
					Ingredients
				</Typography>
				<ul>
					{recipe.recipeIngredients.map((ingredient: string) => (
						<li key={ingredient}>{ingredient}</li>
					))}
				</ul>

				<Typography variant='h2' sx={{ mt: 3 }}>
					Directions
				</Typography>
				<Timeline position='right' sx={{ p: 0 }}>
					{recipe.recipeInstructions.map((instruction: string, i) => (
						<TimelineItem key={instruction}>
							<TimelineOppositeContent
								sx={{
									flex: 0,
									color: 'primary.main',
									width: '2ch',
									marginRight: 2,
								}}
							>
								<b>{i + 1}</b>
							</TimelineOppositeContent>
							<TimelineSeparator>
								<TimelineDot />
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent>{instruction}</TimelineContent>
						</TimelineItem>
					))}
				</Timeline>
			</CardContent>
		</Card>
	)
}
