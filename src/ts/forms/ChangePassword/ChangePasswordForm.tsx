import React, { useContext } from 'react'

import { UserContext } from 'MainAuthorized'
import { FormErrorMessage, FormTextField } from 'ts/components/FormComponents'
import { getMessage } from 'ts/services/errors'
import { updatePassword } from 'ts/services/user'
import { beforeSubmit } from 'ts/utils/helpers'

import { LoadingButton } from '@mui/lab'
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
			<FormTextField
				label='New Password'
				fieldName='password1'
				autoComplete='new-password'
				type='password'
				formState={formState}
				setFormState={setFormState}
			/>
			<FormTextField
				label='Confirm New Password'
				fieldName='password2'
				autoComplete='new-password'
				type='password'
				formState={formState}
				setFormState={setFormState}
			/>

			<FormErrorMessage formState={formState} />

			<LoadingButton
				type='submit'
				disabled={!(formState.values.password1 && formState.values.password2)}
				loading={submitting}
				fullWidth
				variant='contained'
				sx={{ mt: 2 }}
			>
				Change Password
			</LoadingButton>
		</Box>
	)
}
