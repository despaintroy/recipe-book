import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import AddRecipeModal from 'ts/components/AddRecipeModal'
import { getBookByID } from 'ts/services/book'
import { addRecipe } from 'ts/services/recipe'
import {
	Book,
	Recipe,
} from 'ts/utils/models'

import {
	Box,
	Button,
	CircularProgress,
	Container,
	Typography,
} from '@mui/material'

import RecipeList from '../RecipeList'

export default function BookDetail(): React.ReactElement {
	const urlParams = useParams<{ id: string }>()
	const [book, setBook] = React.useState<Book>()
	const [showNewRecipeModal, setShowNewRecipeModal] = React.useState(false)

	useEffect(() => refreshBook(), [])

	function refreshBook(): void {
		getBookByID(urlParams.id).then(setBook)
	}

	if (!book)
		return (
			<Box sx={{ textAlign: 'center', mt: 3 }}>
				<CircularProgress />
			</Box>
		)

	return (
		<Container maxWidth='md'>
			<Typography variant='h1'>{book.title}</Typography>
			<Button
				onClick={(): void => setShowNewRecipeModal(true)}
				variant='contained'
				fullWidth
				sx={{ my: 2 }}
			>
				New Recipe
			</Button>
			<RecipeList recipes={book.recipes || []} />
			<AddRecipeModal
				open={showNewRecipeModal}
				handleClose={(): void => setShowNewRecipeModal(false)}
				onAdd={(recipe: Recipe): void => {
					addRecipe(book.id, recipe).then(refreshBook)
				}}
			/>
		</Container>
	)
}
