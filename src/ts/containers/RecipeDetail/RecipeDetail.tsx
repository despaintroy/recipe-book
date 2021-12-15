import React, { useContext } from 'react'

import { BookContext } from 'MainAuthorized'
import { useHistory, useParams } from 'react-router-dom'
import RecipeCard from 'ts/components/RecipeCard'
import { deleteRecipe } from 'ts/services/recipe'
import Paths from 'ts/utils/paths'

import { Alert, Container } from '@mui/material'

export default function RecipeDetail(): React.ReactElement {
	const urlParams = useParams<{ id: string }>()
	const bookContext = useContext(BookContext)
	const book = bookContext.book
	const recipe = book?.recipes?.find(r => r.id === urlParams.id)
	const history = useHistory()

	function handleDelete(): Promise<void> {
		if (!book || !recipe) return Promise.reject()
		return deleteRecipe(book.id, recipe.id).then(() => {
			bookContext.refreshBook()
			history.push(Paths.getBookDetailLink(book.id))
		})
	}

	return (
		<Container maxWidth='md'>
			{recipe ? (
				<RecipeCard recipe={recipe} handleDelete={handleDelete} />
			) : (
				<Alert severity='error' sx={{ mt: 2 }}>
					Recipe not found
				</Alert>
			)}
		</Container>
	)
}
