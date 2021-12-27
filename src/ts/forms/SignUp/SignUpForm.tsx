import * as React from 'react'

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

export default function SignUpForm(): React.ReactElement {
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
			sx={{ width: '100%' }}
		>
			<FormikTextField formik={formik} fieldName='name' label='Name' />
			<FormikTextField formik={formik} fieldName='email' label='Email' />
			<FormikTextField
				formik={formik}
				fieldName='password1'
				label='Password'
				type='password'
				autoComplete='new-password'
			/>
			<FormikTextField
				formik={formik}
				fieldName='password2'
				label='Confirm Password'
				type='password'
				autoComplete='new-password'
			/>

			<FormErrorMessage message={formError} />
			<SubmitButton isSubmitting={formik.isSubmitting} buttonText='Sign Up' />

			<Link href={Paths.signIn} variant='body2'>
				{`Already have an account? Sign In`}
			</Link>
		</Box>
	)
}
