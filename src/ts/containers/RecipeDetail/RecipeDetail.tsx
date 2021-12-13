import React, { useContext } from 'react'

import { BookContext } from 'MainAuthorized'
import { useParams } from 'react-router-dom'
import RecipeCard from 'ts/components/RecipeCard'

import { Alert, Container, Typography } from '@mui/material'

export default function RecipeDetail(): React.ReactElement {
	const urlParams = useParams<{ id: string }>()
	const book = useContext(BookContext).book
	const recipe = book?.recipes?.find(r => r.id === urlParams.id)

	return (
		<Container>
			<Typography variant='h1' sx={{ mb: 3 }}>
				{recipe?.name}
			</Typography>
			{recipe ? (
				<RecipeCard recipe={recipe} />
			) : (
				<Alert severity='error'>Recipe not found</Alert>
			)}
		</Container>
	)
}
