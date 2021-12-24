import React from 'react'

import { FormErrorMessage, FormTextField } from 'ts/components/FormComponents'
import { signIn } from 'ts/services/auth'
import { getMessage } from 'ts/services/errors'
import { beforeSubmit } from 'ts/utils/formState'
import Paths from 'ts/utils/paths'

import { LoadingButton } from '@mui/lab'
import { Box, Link } from '@mui/material'

import { getInitialFormState } from './validation'

export default function SignInForm(): React.ReactElement {
	const [submitting, setSubmitting] = React.useState(false)

	const [formState, setFormState] = React.useState(getInitialFormState())

	function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault()

		setFormState(state => beforeSubmit(state))

		if (!formState.formValid) return

		setSubmitting(true)

		signIn(formState.values.email, formState.values.password)
			.catch(e =>
				setFormState(state => {
					return { ...state, formMessage: getMessage(e) }
				})
			)
			.finally(() => setSubmitting(false))
	}

	return (
		<Box
			component='form'
			onSubmit={handleSubmit}
			noValidate
			sx={{ mt: 1, width: '100%' }}
		>
			<FormTextField
				label='Email'
				fieldName='email'
				formState={formState}
				setFormState={setFormState}
				autoComplete='email'
			/>
			<FormTextField
				type='password'
				label='Password'
				fieldName='password'
				formState={formState}
				setFormState={setFormState}
				autoComplete='current-password'
			/>

			<FormErrorMessage formState={formState} />

			<LoadingButton
				loading={submitting}
				type='submit'
				fullWidth
				variant='contained'
				sx={{ mt: 2, mb: 2 }}
			>
				Sign In
			</LoadingButton>
			<Link href={Paths.signUp} variant='body2'>
				{"Don't have an account? Sign Up"}
			</Link>
		</Box>
	)
}
