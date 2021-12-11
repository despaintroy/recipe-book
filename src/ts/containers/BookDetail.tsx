import React from 'react'

import { useParams } from 'react-router-dom'
import { scrapeRecipe } from 'ts/services/recipeScrape'
import { Recipe } from 'ts/utils/models'

import Timeline from '@mui/lab/Timeline'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import {
	Alert,
	Button,
	Card,
	CircularProgress,
	Container,
	TextField,
	Typography,
} from '@mui/material'

export default function BookDetail(): React.ReactElement {
	const urlParams = useParams<{ id: string }>()
	const [url, setUrl] = React.useState('')
	const [recipe, setRecipe] = React.useState<Recipe | null>(null)
	const [submitting, setSubmitting] = React.useState(false)
	const [error, setError] = React.useState('')

	return (
		<Container>
			<Typography variant='h1'>Import Recipe</Typography>
			{/* <Typography variant='body1'>Book ID: {urlParams.id}</Typography> */}
			<TextField
				label='Recipe URL'
				fullWidth
				sx={{ mt: 5, mb: 2 }}
				onChange={(e): void => setUrl(e.target.value)}
			/>
			<Button
				onClick={(): void => {
					setError('')
					setRecipe(null)
					setSubmitting(true)
					scrapeRecipe(url)
						.then((r: Recipe) => setRecipe(r))
						.catch(e => setError(e.message))
						.finally(() => setSubmitting(false))
				}}
				fullWidth
				variant='contained'
				color='primary'
			>
				{submitting ? <CircularProgress size={24} color='inherit' /> : 'Import'}
			</Button>
			{error && (
				<Alert severity='error' sx={{ mt: 2 }}>
					{error}
				</Alert>
			)}

			{recipe && (
				<Card sx={{ p: 2, my: 4 }}>
					<Typography variant='h2' sx={{ mb: 2 }}>
						{recipe.name}
					</Typography>
					<img src={recipe.image} alt={recipe.name} width={'100%'} />
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
								<TimelineOppositeContent
									sx={{ flex: 0, color: 'primary.main' }}
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
				</Card>
			)}
		</Container>
	)
}
