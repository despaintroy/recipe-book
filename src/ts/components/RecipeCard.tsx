import React from 'react'

import { Recipe } from 'ts/utils/models'

import Timeline from '@mui/lab/Timeline'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import { Card, Typography } from '@mui/material'

export default function RecipeCard(props: {
	recipe: Recipe
}): React.ReactElement {
	const { recipe } = props

	return (
		<Card sx={{ p: 2, my: 4 }}>
			<Typography variant='h2' sx={{ mb: 2 }}>
				{recipe.name}
			</Typography>
			<img
				src={recipe.image}
				alt={recipe.name}
				width={'100%'}
				style={{ maxHeight: '20rem', objectFit: 'cover' }}
			/>
			<p>
				<b>Description: </b>
				{recipe.description}
			</p>
			<p>
				<b>Total Time: </b>
				{recipe.totalTime}
			</p>
			<b>Ingredients:</b>
			<ul>
				{recipe.recipeIngredients.map((ingredient: string) => (
					<li key={ingredient}>{ingredient}</li>
				))}
			</ul>
			<b>Instructions:</b>
			<Timeline position='right' sx={{ p: 0 }}>
				{recipe.recipeInstructions.map((instruction: string, i) => (
					<TimelineItem key={instruction}>
						<TimelineOppositeContent sx={{ flex: 0, color: 'primary.main' }}>
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
		</Card>
	)
}
