import React, { useContext, useState } from 'react'

import { BookContext } from 'MainAuthorized'
import { useHistory } from 'react-router-dom'
import { Recipe } from 'ts/utils/models'
import Paths from 'ts/utils/paths'

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
	CardActions,
	CardContent,
	CardMedia,
	Icon,
	Typography,
} from '@mui/material'
import { Box } from '@mui/system'

import DeleteRecipeDialog from './DeleteRecipeDialog'

export default function RecipeCard(props: {
	recipe: Recipe
	allowDelete?: boolean
}): React.ReactElement {
	const { recipe, allowDelete } = props
	const history = useHistory()
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const bookContext = useContext(BookContext)

	function deleteCallback(): void {
		const bookID = bookContext.book?.id
		if (!bookID) {
			history.push(Paths.home)
			return
		}
		bookContext.refreshBook()
		history.push(Paths.getBookDetailLink(bookID))
	}

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
		<>
			<Card sx={{ my: 2 }}>
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
				<CardActions>
					{/* <Button size='small'>Edit</Button> */}
					{allowDelete && (
						<Button
							size='small'
							onClick={(): void => setShowDeleteDialog(true)}
						>
							Delete
						</Button>
					)}
				</CardActions>
			</Card>

			<DeleteRecipeDialog
				recipe={recipe}
				open={showDeleteDialog}
				handleClose={(): void => setShowDeleteDialog(false)}
				deleteCallback={deleteCallback}
			/>
		</>
	)
}
