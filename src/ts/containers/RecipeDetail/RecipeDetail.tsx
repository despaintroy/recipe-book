import React, { useContext } from 'react'

import { BookContext } from 'MainAuthorized'
import { useParams } from 'react-router-dom'
import RecipeCard from 'ts/components/RecipeCard'

import { Alert, Container } from '@mui/material'

export default function RecipeDetail(): React.ReactElement {
	const urlParams = useParams<{ id: string }>()
	const book = useContext(BookContext).book
	const recipe = book?.recipes?.find(r => r.id === urlParams.id)

	return (
		<Container maxWidth='md'>
			{recipe ? (
				<RecipeCard recipe={recipe} allowDelete />
			) : (
				<Alert severity='error' sx={{ mt: 2 }}>
					Recipe not found
				</Alert>
			)}
		</Container>
	)
}
