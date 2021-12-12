import React from 'react'

import { Book } from 'ts/utils/models'

import { CircularProgress, Divider } from '@mui/material'
import { Box } from '@mui/system'

import BookItem from './BookItem'

export default function BookListItems(props: {
	books: Book[] | undefined
	refreshBooks: () => void
}): React.ReactElement {
	const { books, refreshBooks } = props

	if (!books)
		return (
			<Box sx={{ textAlign: 'center' }}>
				<CircularProgress />
			</Box>
		)

	if (books.length === 0)
		return <p>Get started by creating your first recipe book!</p>

	return (
		<Box>
			<Divider />
			{books.map(book => (
				<BookItem book={book} key={book.id} deleteCallback={refreshBooks} />
			))}
		</Box>
	)
}
