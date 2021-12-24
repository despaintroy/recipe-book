import React, { useContext, useEffect } from 'react'

import { UserContext } from 'MainAuthorized'
import { FormErrorMessage, FormTextField } from 'ts/components/FormComponents'
import { getMessage } from 'ts/services/errors'
import { updateEmail, updateName } from 'ts/services/user'
import { beforeSubmit } from 'ts/utils/formState'

import { LoadingButton } from '@mui/lab'
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
			<FormTextField
				label='Name'
				fieldName='name'
				autoComplete='name'
				formState={formState}
				setFormState={setFormState}
			/>
			<FormTextField
				label='Email'
				fieldName='email'
				autoComplete='email'
				formState={formState}
				setFormState={setFormState}
			/>

			<FormErrorMessage formState={formState} />

			<LoadingButton
				type='submit'
				disabled={!hasChanged}
				loading={submitting}
				fullWidth
				variant='contained'
				sx={{ mt: 2 }}
			>
				Save Changes
			</LoadingButton>
		</Box>
	)
}
