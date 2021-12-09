import React, { useContext, useEffect } from 'react'

import { UserContext } from 'MainAuthorized'
import { getMessage } from 'ts/services/errors'
import { updateEmail, updateName } from 'ts/services/user'
import { beforeSubmit, handleValueChange, validateForm } from 'ts/utils/helpers'

import { Alert, Button, CircularProgress, TextField } from '@mui/material'
import { Box } from '@mui/system'

import { getInitialFormState } from './validation'

export default function ProfileForm(): React.ReactElement {
	const { user, updateUser } = useContext(UserContext)
	const [submitting, setSubmitting] = React.useState(false)
	const [formState, setFormState] = React.useState(getInitialFormState(user))
	const [hasChanged, setHasChanged] = React.useState(false)

	useEffect(
		() =>
			setHasChanged(
				user.name !== formState.values.name ||
					user.email !== formState.values.email
			),
		[formState]
	)

	function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault()

		setFormState(state => beforeSubmit(state))
		if (!formState.formValid) return

		setSubmitting(true)

		Promise.all([
			user.name !== formState.values.name
				? updateName(formState.values.name)
				: Promise.resolve(),
			user.email !== formState.values.email
				? updateEmail(formState.values.email)
				: Promise.resolve(),
		])
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
				label='Name'
				name='name'
				defaultValue={user.name}
				margin='normal'
				onChange={(e): void =>
					setFormState(state => handleValueChange(e, state))
				}
				onBlur={(): void => {
					formState.touched.name = true
					setFormState(state => validateForm(state))
				}}
				error={formState.touched.name && !formState.isValid.name}
				helperText={formState.touched.name && formState.messages.name}
			/>
			<TextField
				variant='standard'
				fullWidth
				label='Email'
				type='email'
				name='email'
				defaultValue={user.email}
				margin='normal'
				onChange={(e): void =>
					setFormState(state => handleValueChange(e, state))
				}
				onBlur={(): void => {
					formState.touched.email = true
					setFormState(state => validateForm(state))
				}}
				error={formState.touched.email && !formState.isValid.email}
				helperText={formState.touched.email && formState.messages.email}
			/>
			{formState.attemptedSubmit && formState.formMessage && (
				<Alert sx={{ mt: 2 }} severity='error'>
					{formState.formMessage || 'Form error'}
				</Alert>
			)}
			<Button
				type='submit'
				disabled={submitting || !hasChanged}
				fullWidth
				variant='contained'
				sx={{ mt: 2 }}
			>
				{submitting ? (
					<CircularProgress size={24} color='inherit' />
				) : (
					'Save Changes'
				)}
			</Button>
		</Box>
	)
}
