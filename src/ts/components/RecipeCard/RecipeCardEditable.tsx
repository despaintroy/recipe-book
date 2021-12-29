import React, { useState } from 'react'

import ReactHtmlParser from 'react-html-parser'
import { deleteRecipe } from 'ts/services/recipe'
import { Recipe } from 'ts/utils/models'

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

import EditRecipeModal from '../EditRecipeModal'
import DeleteRecipeDialog from './DeleteRecipeDialog'
import Directions from './Directions'

export default function RecipeCardEditable(props: {
	recipe: Recipe
	onEdit?: () => void
	onDelete?: () => void
}): React.ReactElement {
	const { recipe, onEdit, onDelete } = props
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)

	function recipeTimeString(): string {
		const prepTime = recipe.prepTime ? `${recipe.prepTime} prep` : ''
		const cookTime = recipe.cookTime ? `${recipe.cookTime} cook` : ''
		return [prepTime, cookTime].filter(Boolean).join(' + ')
	}

	function getDomain(): string {
		const url = new URL(recipe.url)
		return url.hostname
	}

	function handleDelete(): Promise<void> {
		return deleteRecipe(recipe.bookID, recipe.id).then(() => {
			onDelete && onDelete()
		})
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
						{ReactHtmlParser(recipe.description)}
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
							<Icon sx={{ my: 'auto', marginRight: 2 }}>link</Icon>
							<Button
								component='a'
								href={recipe.url}
								target='_blank'
								sx={{
									position: 'relative',
									left: -4,
									textTransform: 'lowercase',
								}}
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
					<Directions recipeInstructions={recipe.recipeInstructions} />
				</CardContent>
				<CardActions>
					<Button size='small' onClick={(): void => setShowEditModal(true)}>
						Edit
					</Button>
					<Button size='small' onClick={(): void => setShowDeleteDialog(true)}>
						Delete
					</Button>
				</CardActions>
			</Card>

			<DeleteRecipeDialog
				open={showDeleteDialog}
				handleClose={(): void => setShowDeleteDialog(false)}
				handleDelete={handleDelete}
			/>
			<EditRecipeModal
				recipe={recipe}
				open={showEditModal}
				handleClose={(): void => setShowEditModal(false)}
				onEdit={onEdit}
			/>
		</>
	)
}
