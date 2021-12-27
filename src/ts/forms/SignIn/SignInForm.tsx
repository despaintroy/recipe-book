import React from 'react'

import { useFormik } from 'formik'
import {
	FormErrorMessage,
	FormikTextField,
	SubmitButton,
} from 'ts/components/FormComponents'
import Paths from 'ts/utils/paths'

import { Box, Link } from '@mui/material'

import {
	FormValues,
	initialValues,
	submit,
	validationSchema,
} from './controller'

export default function SignInForm(): React.ReactElement {
	const [formError, setFormError] = React.useState('')

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values: FormValues): Promise<void> =>
			submit(values).catch(error => setFormError(error.message)),
	})

	return (
		<Box
			component='form'
			onSubmit={formik.handleSubmit}
			noValidate
			sx={{ mt: 1, width: '100%' }}
		>
			<FormikTextField formik={formik} fieldName='email' label='Email' />
			<FormikTextField
				formik={formik}
				fieldName='password'
				label='Password'
				type='password'
				autoComplete='current-password'
			/>

			<FormErrorMessage message={formError} />
			<SubmitButton isSubmitting={formik.isSubmitting} buttonText='Sign In' />

			<Link href={Paths.signUp} variant='body2'>
				{`Don't have an account? Sign Up`}
			</Link>
		</Box>
	)
}
