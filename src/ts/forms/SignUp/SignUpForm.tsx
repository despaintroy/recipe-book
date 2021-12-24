import * as React from 'react'

import { FormErrorMessage, FormTextField } from 'ts/components/FormComponents'
import { getMessage } from 'ts/services/errors'
import { signUp } from 'ts/services/user'
import { beforeSubmit } from 'ts/utils/helpers'
import Paths from 'ts/utils/paths'

import { LoadingButton } from '@mui/lab'
import { Box, Link } from '@mui/material'

import { getInitialFormState } from './validation'

export default function SignUpForm(): React.ReactElement {
	const [submitting, setSubmitting] = React.useState(false)

	const [formState, setFormState] = React.useState(getInitialFormState)

	function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault()

		setFormState(state => beforeSubmit(state))

		if (!formState.formValid) return

		setSubmitting(true)

		signUp(
			formState.values.email,
			formState.values.password1,
			formState.values.name
		)
			.catch(e =>
				setFormState(state => {
					return { ...state, formMessage: getMessage(e) }
				})
			)
			.finally(() => setSubmitting(false))
	}

	return (
		<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
			<FormTextField
				label='Name'
				fieldName='name'
				formState={formState}
				setFormState={setFormState}
				autoComplete='name'
			/>
			<FormTextField
				label='Email'
				type='email'
				fieldName='email'
				formState={formState}
				setFormState={setFormState}
				autoComplete='email'
			/>
			<FormTextField
				label='Password'
				type='password'
				fieldName='password1'
				formState={formState}
				setFormState={setFormState}
				autoComplete='new-password'
			/>
			<FormTextField
				label='Confirm Password'
				type='password'
				fieldName='password2'
				formState={formState}
				setFormState={setFormState}
				autoComplete='new-password'
			/>

			<FormErrorMessage formState={formState} />

			<LoadingButton
				loading={submitting}
				fullWidth
				variant='contained'
				sx={{ mt: 2, mb: 2 }}
				type='submit'
			>
				Sign Up
			</LoadingButton>
			<Link href={Paths.signIn} variant='body2'>
				{'Already have an account? Sign In'}
			</Link>
		</Box>
	)
}
