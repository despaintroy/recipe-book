import * as React from 'react'

import { getMessage } from 'ts/services/errors'
import { signUp } from 'ts/services/user'
import { beforeSubmit, handleValueChange, validateForm } from 'ts/utils/helpers'
import Paths from 'ts/utils/paths'

import { LoadingButton } from '@mui/lab'
import { Alert, Box, Link, TextField } from '@mui/material'

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
			<TextField
				margin='normal'
				required
				fullWidth
				id='name'
				label='Name'
				name='name'
				autoComplete='name'
				autoFocus
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
				margin='normal'
				required
				fullWidth
				id='email'
				label='Email'
				name='email'
				type='email'
				autoComplete='email'
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
			<TextField
				margin='normal'
				required
				fullWidth
				name='password1'
				label='Password'
				type='password'
				id='password1'
				autoComplete='new-password'
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
				margin='normal'
				required
				fullWidth
				name='password2'
				label='Confirm Password'
				type='password'
				id='password2'
				autoComplete='new-password'
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
			<LoadingButton
				loading={submitting}
				fullWidth
				variant='contained'
				sx={{ mt: 2, mb: 2 }}
			>
				Sign Up
			</LoadingButton>
			<Link href={Paths.signIn} variant='body2'>
				{'Already have an account? Sign In'}
			</Link>
		</Box>
	)
}
