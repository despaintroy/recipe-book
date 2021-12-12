import React, { useState } from 'react'

import { getAllBooks } from 'ts/services/book'
import { Book } from 'ts/utils/models'

import { Button, Container, Icon, Typography } from '@mui/material'

import BookListItems from './BookListItems'
import NewBookModal from './NewBookModal'

export default function BookList(): React.ReactElement {
	const [books, setBooks] = useState<Book[]>()
	const [showModal, setShowModal] = useState(false)

	React.useEffect(() => refreshBooks(), [])

	function refreshBooks(): void {
		getAllBooks().then(setBooks)
	}

	return (
		<Container maxWidth='sm'>
			<Typography variant='h1' sx={{ mb: 3 }}>
				Recipe Books
			</Typography>

			<BookListItems books={books} refreshBooks={refreshBooks} />

			<Button
				variant='outlined'
				sx={{ mt: 2 }}
				startIcon={<Icon>add</Icon>}
				fullWidth
				onClick={(): void => setShowModal(true)}
			>
				Create New Book
			</Button>

			<NewBookModal
				open={showModal}
				handleClose={(): void => setShowModal(false)}
				submitCallback={(): void => {
					setBooks(undefined)
					refreshBooks()
				}}
			/>
		</Container>
	)
}
