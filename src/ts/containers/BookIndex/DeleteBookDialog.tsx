import React, { useState } from 'react'

import { deleteBook } from 'ts/services/book'
import { Book } from 'ts/utils/models'

import { LoadingButton } from '@mui/lab'
import {
	Alert,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material'

export default function DeleteBookDialog(props: {
	book: Book
	open: boolean
	handleClose: () => void
	deleteCallback: () => void
}): React.ReactElement {
	const { book, open, handleClose, deleteCallback } = props
	const [waiting, setWaiting] = useState(false)
	const [error, setError] = useState('')

	function handleDelete(): void {
		setWaiting(true)
		deleteBook(book.id)
			.then((): void => {
				handleClose()
				deleteCallback()
			})
			.catch(() => setError('Error deleting book'))
			.finally(() => setWaiting(false))
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Delete this book?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					This will permanently delete this book and all of its recipes. Any
					users this book is shared with will no longer be able to access it.
				</DialogContentText>
				{error && (
					<Alert severity='error' sx={{ mt: 2 }}>
						{error}
					</Alert>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} autoFocus>
					Cancel
				</Button>
				<LoadingButton
					onClick={handleDelete}
					loading={waiting}
					variant='contained'
				>
					Delete
				</LoadingButton>
			</DialogActions>
		</Dialog>
	)
}
