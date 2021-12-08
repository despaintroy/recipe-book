import React from 'react'

import { signIn } from 'ts/services/auth'
import { getMessage } from 'ts/services/errors'
import { beforeSubmit, handleValueChange, validateForm } from 'ts/utils/helpers'
import Paths from 'ts/utils/paths'

import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Link,
	TextField,
} from '@mui/material'

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
			<TextField
				margin='normal'
				required
				fullWidth
				type='email'
				id='email'
				label='Email'
				name='email'
				autoComplete='email'
				autoFocus
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
				name='password'
				label='Password'
				type='password'
				id='password'
				autoComplete='current-password'
				onChange={(e): void =>
					setFormState(state => handleValueChange(e, state))
				}
				onBlur={(): void => {
					formState.touched.password = true
					setFormState(state => validateForm(state))
				}}
				error={formState.touched.password && !formState.isValid.password}
				helperText={formState.touched.password && formState.messages.password}
			/>
			{formState.attemptedSubmit && formState.formMessage && (
				<Alert sx={{ mt: 2 }} severity='error'>
					{formState.formMessage || 'Form error'}
				</Alert>
			)}
			<Button
				type='submit'
				disabled={submitting}
				fullWidth
				variant='contained'
				sx={{ mt: 2, mb: 2 }}
			>
				{submitting ? (
					<CircularProgress size={24} color='inherit' />
				) : (
					'Sign In'
				)}
			</Button>
			<Link href={Paths.signUp} variant='body2'>
				{"Don't have an account? Sign Up"}
			</Link>
		</Box>
	)
}
