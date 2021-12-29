import React, { useContext } from 'react'

import { BookContext } from 'MainAuthorized'
import { Link, useHistory, useParams } from 'react-router-dom'
import RecipeCardEditable from 'ts/components/RecipeCard'
import { getBookByID } from 'ts/services/book'
import Paths from 'ts/utils/paths'

import { Alert, Button, Container, Icon } from '@mui/material'

export default function RecipeDetail(): React.ReactElement {
	const urlParams = useParams<{ bookID: string; recipeID: string }>()
	const { book, refreshBook, setBook } = useContext(BookContext)
	const recipe = book?.recipes.find(r => r.id === urlParams.recipeID)
	const history = useHistory()

	if (!book) {
		getBookByID(urlParams.bookID).then(book => {
			setBook(book)
		})
		return <></>
	}

	if (!recipe) {
		// TODO: Show more helpful error message, link to home page
		return (
			<Container sx={{ mt: 2 }}>
				<Alert
					severity='error'
					action={
						<Button
							color='inherit'
							size='small'
							component={Link}
							to={Paths.getBookDetailLink(urlParams.bookID)}
						>
							View all {book.title}
							<Icon sx={{ ml: 1 }}>arrow_forward</Icon>
						</Button>
					}
				>
					Recipe not found
				</Alert>
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
			<RecipeCardEditable recipe={recipe} onEdit={onEdit} onDelete={onDelete} />
		</Container>
	)
}
