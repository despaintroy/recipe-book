import React, { useEffect } from 'react'

import { BookContext } from 'MainAuthorized'
import { useParams } from 'react-router-dom'
import AddRecipeModal from 'ts/components/AddRecipeModal'
import RecipeList from 'ts/components/RecipeList'
import { getBookByID } from 'ts/services/book'
import { addRecipe } from 'ts/services/recipe'
import { Recipe } from 'ts/utils/models'

import {
	Alert,
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
	const { book, refreshBook, setBook } = React.useContext(BookContext)
	const [loading, setLoading] = React.useState(false)

	useEffect(() => {
		if (!book || book.id !== urlParams.id) {
			setLoading(true)
			getBookByID(urlParams.id)
				.then((b): void => setBook(b))
				.catch(() => setBook(null))
				.finally(() => setLoading(false))
		}
	}, [book])

	if (loading) {
		return (
			<Box sx={{ textAlign: 'center', mt: 3 }}>
				<CircularProgress />
			</Box>
		)
	}

	if (!book) {
		return (
			<Container maxWidth='md'>
				<Alert severity='error' sx={{ mt: 2 }}>
					Book not found
				</Alert>
			</Container>
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
