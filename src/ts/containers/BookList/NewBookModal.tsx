import React, { FormEvent, useContext, useRef } from 'react'

import { UserContext } from 'MainAuthorized'
import { createBook } from 'ts/services/book'

import {
	Alert,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from '@mui/material'

export default function NewBookModal(props: {
	open: boolean
	handleClose: () => void
	submitCallback?: () => void
}): React.ReactElement {
	const { open, handleClose, submitCallback } = props
	const user = useContext(UserContext).user
	const input = useRef<HTMLInputElement>(null)
	const [errorText, setErrorText] = React.useState('')
	const [submitting, setSubmitting] = React.useState(false)

	function handleSubmit(e: FormEvent): void {
		e.preventDefault()
		const name = input.current?.value
		setErrorText('')
		if (name) {
			setSubmitting(true)
			createBook(name)
				.then((): void => {
					handleClose()
					submitCallback && submitCallback()
				})
				.catch((): void => setErrorText('Error creating book'))
				.finally(() => setSubmitting(false))
		} else {
			setErrorText('Name is required')
		}
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>New Recipe Book</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Create a new recipe book. Recipe books can optionally be shared with
						other users.
					</DialogContentText>
					<TextField
						inputRef={input}
						defaultValue={`${user.name}'s Recipes`}
						placeholder={`${user.name}'s Recipes`}
						autoFocus
						id='name'
						label='Recipe Book Name'
						fullWidth
						variant='standard'
						sx={{ mt: 2 }}
					/>
					{errorText && (
						<Alert severity='error' sx={{ mt: 2 }}>
							{errorText}
						</Alert>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button variant='contained' type='submit' disabled={submitting}>
						{submitting ? (
							<CircularProgress size={24} color='inherit' />
						) : (
							'Create'
						)}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}
