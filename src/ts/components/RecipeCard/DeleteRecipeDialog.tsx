import React, { useContext, useState } from 'react'

import { BookContext } from 'MainAuthorized'
import { deleteRecipe } from 'ts/services/recipe'
import { Recipe } from 'ts/utils/models'

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

export default function DeleteRecipeDialog(props: {
	recipe: Recipe
	open: boolean
	handleClose: () => void
	deleteCallback: () => void
}): React.ReactElement {
	const { recipe, open, handleClose, deleteCallback } = props
	const [waiting, setWaiting] = useState(false)
	const [error, setError] = useState('')
	const bookContext = useContext(BookContext)

	function handleDelete(): void {
		setWaiting(true)
		if (!bookContext.book) {
			setError('Error deleting recipe')
			return
		}
		deleteRecipe(bookContext.book.id ?? '', recipe.id)
			.then((): void => {
				handleClose()
				deleteCallback()
			})
			.catch(() => setError('Error deleting recipe'))
			.finally(() => setWaiting(false))
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Delete this recipe?</DialogTitle>
			<DialogContent>
				<DialogContentText>This action cannot be undone.</DialogContentText>
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
