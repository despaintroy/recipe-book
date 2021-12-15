import React from 'react'

import { Recipe } from 'ts/utils/models'

import Timeline from '@mui/lab/Timeline'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import {
	Button,
	Card,
	CardContent,
	CardMedia,
	Icon,
	Typography,
} from '@mui/material'
import { Box } from '@mui/system'

export default function RecipeCard(props: {
	recipe: Recipe
}): React.ReactElement {
	const { recipe } = props

	function Directions(): React.ReactElement {
		if (recipe.recipeInstructions.length === 0) {
			return (
				<Typography variant='body1' sx={{ mt: 1 }}>
					No directions available
				</Typography>
			)
		}

		if (recipe.recipeInstructions.length === 1) {
			return (
				<Typography variant='body1' sx={{ mt: 1 }}>
					{recipe.recipeInstructions.join()}
				</Typography>
			)
		}

		return (
			<Timeline position='right' sx={{ p: 0 }}>
				{recipe.recipeInstructions.map((instruction: string, idx) => (
					<TimelineItem key={instruction}>
						<TimelineOppositeContent
							sx={{
								flex: 0,
								color: 'primary.main',
								width: '2ch',
								marginRight: 2,
							}}
						>
							<b>{idx + 1}</b>
						</TimelineOppositeContent>
						<TimelineSeparator>
							<TimelineDot />
							{idx < recipe.recipeInstructions.length - 1 && (
								<TimelineConnector />
							)}
						</TimelineSeparator>
						<TimelineContent>{instruction}</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
		)
	}

	function recipeTimeString(): string {
		const prepTime = recipe.prepTime ? `${recipe.prepTime} prep` : ''
		const cookTime = recipe.cookTime ? `${recipe.cookTime} cook` : ''
		return [prepTime, cookTime].filter(Boolean).join(' + ')
	}

	function getDomain(): string {
		const url = new URL(recipe.url)
		return url.hostname
	}

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

				{(recipe.totalTime || recipe.prepTime || recipe.cookTime) && (
					<Box sx={{ display: 'flex', mb: 2 }}>
						<Icon sx={{ my: 'auto', marginRight: 2 }}>timer</Icon>
						<Box>
							<Typography variant='body1' fontWeight={'bold'}>
								{recipe.totalTime}
							</Typography>
							<Typography variant='body2' color='GrayText'>
								{recipeTimeString()}
							</Typography>
						</Box>
					</Box>
				)}

				{recipe.recipeYield && (
					<Box sx={{ display: 'flex', mb: 2 }}>
						<Icon sx={{ my: 'auto', marginRight: 2 }}>restaurant</Icon>
						<Typography variant='body1' fontWeight={'bold'}>
							Makes {recipe.recipeYield}
						</Typography>
					</Box>
				)}

				{recipe.url && (
					<Box sx={{ display: 'flex', mb: 2 }}>
						<Icon sx={{ my: 'auto', marginRight: 2 }}>open_in_new</Icon>
						<Button
							component='a'
							href={recipe.url}
							target='_blank'
							sx={{
								position: 'relative',
								left: -4,
								textTransform: 'lowercase',
							}}
							startIcon={<Icon fontSize='small'>link</Icon>}
						>
							{getDomain()}
						</Button>
					</Box>
				)}

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
				<Directions />
			</CardContent>
		</Card>
	)
}
