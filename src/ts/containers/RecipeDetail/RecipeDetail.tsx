import React, { useContext } from 'react'

import { BookContext } from 'MainAuthorized'
import { useHistory, useParams } from 'react-router-dom'
import RecipeCardEditable from 'ts/components/RecipeCard'
import Paths from 'ts/utils/paths'

import { Alert, Container } from '@mui/material'

export default function RecipeDetail(): React.ReactElement {
	const urlParams = useParams<{ id: string }>()
	const { book, refreshBook } = useContext(BookContext)
	const recipe = book?.recipes?.find(r => r.id === urlParams.id)
	const history = useHistory()

	if (!book || !recipe) {
		// TODO: Show more helpful error message, link to home page
		return (
			<Container sx={{ mt: 2 }}>
				<Alert severity='error'>Recipe not found.</Alert>
			</Container>
		)
	}

	const onDelete = (): void => {
		refreshBook()
		history.push(Paths.getBookDetailLink(book.id))
	}

	const onEdit = (): void => {
		refreshBook()
	}

	return (
		<Container maxWidth='md'>
			<RecipeCardEditable
				recipe={recipe}
				recipeRef={{ bookID: book.id, recipeID: recipe.id }}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		</Container>
	)
}
