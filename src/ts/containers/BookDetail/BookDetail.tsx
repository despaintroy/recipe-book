import React from 'react'

import { BookContext } from 'MainAuthorized'
import { useParams } from 'react-router-dom'
import AddRecipeModal from 'ts/components/AddRecipeModal'
import RecipeList from 'ts/components/RecipeList'
import { getBookByID } from 'ts/services/book'
import { addRecipe } from 'ts/services/recipe'
import { Recipe } from 'ts/utils/models'

import {
	Box,
	Button,
	CircularProgress,
	Container,
	Icon,
	Typography,
} from '@mui/material'

export default function BookDetail(): React.ReactElement {
	const urlParams = useParams<{ id: string }>()
	const [showNewRecipeModal, setShowNewRecipeModal] = React.useState(false)
	const { book, setBook } = React.useContext(BookContext)

	function refreshBook(): void {
		getBookByID(urlParams.id).then(book => setBook(book))
	}

	if (!book || book.id !== urlParams.id) {
		refreshBook()
		return (
			<Box sx={{ textAlign: 'center', mt: 3 }}>
				<CircularProgress />
			</Box>
		)
	}

	return (
		<Container>
			<Typography variant='h1'>{book.title}</Typography>
			<Box sx={{ textAlign: 'right' }}>
				<Button
					onClick={(): void => setShowNewRecipeModal(true)}
					startIcon={<Icon>add</Icon>}
					variant='text'
					sx={{ my: 2 }}
				>
					New Recipe
				</Button>
			</Box>
			<RecipeList masonry recipes={book.recipes || []} />
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
