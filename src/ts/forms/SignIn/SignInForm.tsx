import React from 'react'

import { useFormik } from 'formik'
import {
	FormErrorMessage,
	FormikTextField,
	SubmitButton,
} from 'ts/components/FormComponents'
import { createSubmitHandler } from 'ts/utils/helpers'
import Paths from 'ts/utils/paths'

import { Box, Link } from '@mui/material'

import { initialValues, submit, validationSchema } from './controller'

export default function SignInForm(): React.ReactElement {
	const [formError, setFormError] = React.useState('')

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: createSubmitHandler(submit, setFormError),
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
			<SubmitButton isSubmitting={formik.isSubmitting} />

			<Link href={Paths.signUp} variant='body2'>
				{`Don't have an account? Sign Up`}
			</Link>
		</Box>
	)
}
