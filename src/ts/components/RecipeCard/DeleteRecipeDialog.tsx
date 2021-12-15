import React, { useState } from 'react'

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
	open: boolean
	handleClose: () => void
	handleDelete: () => Promise<void>
}): React.ReactElement {
	const { open, handleClose, handleDelete } = props
	const [waiting, setWaiting] = useState(false)
	const [error, setError] = useState('')

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
					onClick={(): void => {
						setWaiting(true)
						handleDelete()
							.then(() => handleClose)
							.catch(() => setError('Error deleting recipe'))
							.finally(() => setWaiting(false))
					}}
					loading={waiting}
					variant='contained'
				>
					Delete
				</LoadingButton>
			</DialogActions>
		</Dialog>
	)
}
