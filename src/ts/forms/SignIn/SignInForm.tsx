import React from 'react'

import { useFormik } from 'formik'
import { FormErrorMessage } from 'ts/components/FormComponents'
import Paths from 'ts/utils/paths'

import { LoadingButton } from '@mui/lab'
import { Box, Link, TextField } from '@mui/material'

import {
	getHandleSubmitFunction,
	initialValues,
	validationSchema,
} from './controller'

export default function SignInForm(): React.ReactElement {
	const [formError, setFormError] = React.useState('')

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: getHandleSubmitFunction(setFormError),
	})

	return (
		<Box
			component='form'
			onSubmit={formik.handleSubmit}
			noValidate
			sx={{ mt: 1, width: '100%' }}
		>
			<TextField
				fullWidth
				margin='normal'
				id='email'
				name='email'
				label='Email'
				type='email'
				value={formik.values.email}
				onChange={formik.handleChange}
				error={formik.touched.email && Boolean(formik.errors.email)}
				helperText={formik.touched.email && formik.errors.email}
			/>
			<TextField
				fullWidth
				margin='normal'
				id='password'
				name='password'
				label='Password'
				type='password'
				autoComplete='current-password'
				value={formik.values.password}
				onChange={formik.handleChange}
				error={formik.touched.password && Boolean(formik.errors.password)}
				helperText={formik.touched.password && formik.errors.password}
			/>

			<FormErrorMessage message={formError} />

			<LoadingButton
				loading={formik.isSubmitting}
				type='submit'
				fullWidth
				variant='contained'
				sx={{ mt: 2, mb: 2 }}
			>
				Sign In
			</LoadingButton>
			<Link href={Paths.signUp} variant='body2'>
				{`Don't have an account? Sign Up`}
			</Link>
		</Box>
	)
}
