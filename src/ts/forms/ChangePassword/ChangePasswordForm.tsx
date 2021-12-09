import React, { useContext } from 'react'

import { UserContext } from 'MainAuthorized'
import { getMessage } from 'ts/services/errors'
import { updatePassword } from 'ts/services/user'
import { beforeSubmit, handleValueChange, validateForm } from 'ts/utils/helpers'

import { Alert, Button, CircularProgress, TextField } from '@mui/material'
import { Box } from '@mui/system'

import { getInitialFormState } from './validation'

export default function ChangePasswordForm(): React.ReactElement {
	const { updateUser } = useContext(UserContext)
	const [submitting, setSubmitting] = React.useState(false)
	const [formState, setFormState] = React.useState(getInitialFormState())

	function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault()

		setFormState(state => beforeSubmit(state))
		if (!formState.formValid) return

		setSubmitting(true)

		updatePassword(formState.values.password1)
			.then(() => updateUser())
			.catch(e =>
				setFormState(state => {
					return { ...state, formMessage: getMessage(e) }
				})
			)
			.finally(() => setSubmitting(false))
	}

	return (
		<Box component='form' onSubmit={handleSubmit} noValidate>
			<TextField
				variant='standard'
				fullWidth
				label='New Password'
				type='password'
				name='password1'
				margin='normal'
				onChange={(e): void =>
					setFormState(state => handleValueChange(e, state))
				}
				onBlur={(): void => {
					formState.touched.password1 = true
					setFormState(state => validateForm(state))
				}}
				error={formState.touched.password1 && !formState.isValid.password1}
				helperText={formState.touched.password1 && formState.messages.password1}
			/>
			<TextField
				variant='standard'
				fullWidth
				label='Confirm New Password'
				type='password'
				name='password2'
				margin='normal'
				onChange={(e): void =>
					setFormState(state => handleValueChange(e, state))
				}
				onBlur={(): void => {
					formState.touched.password2 = true
					setFormState(state => validateForm(state))
				}}
				error={formState.touched.password2 && !formState.isValid.password2}
				helperText={formState.touched.password2 && formState.messages.password2}
			/>
			{formState.attemptedSubmit && formState.formMessage && (
				<Alert sx={{ mt: 2 }} severity='error'>
					{formState.formMessage || 'Form error'}
				</Alert>
			)}
			<Button
				type='submit'
				disabled={
					submitting ||
					!(formState.values.password1 && formState.values.password2)
				}
				fullWidth
				variant='contained'
				sx={{ mt: 2 }}
			>
				{submitting ? (
					<CircularProgress size={24} color='inherit' />
				) : (
					'Change Password'
				)}
			</Button>
		</Box>
	)
}
