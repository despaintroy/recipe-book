import * as React from 'react'

import { useFormik } from 'formik'
import {
	FormErrorMessage,
	FormikTextField,
	SubmitButton,
} from 'ts/components/FormComponents'
import { createSubmitHandler } from 'ts/utils/helpers'
import Paths from 'ts/utils/paths'

import { Box, Link } from '@mui/material'

import { handleSubmit, initialValues, validationSchema } from './controller'

export default function SignUpForm(): React.ReactElement {
	const [formError, setFormError] = React.useState('')

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: createSubmitHandler(handleSubmit, setFormError),
	})

	return (
		<Box
			component='form'
			onSubmit={formik.handleSubmit}
			noValidate
			sx={{ mt: 1, width: '100%' }}
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
			<SubmitButton isSubmitting={formik.isSubmitting} />

			<Link href={Paths.signIn} variant='body2'>
				{`Already have an account? Sign In`}
			</Link>
		</Box>
	)
}
