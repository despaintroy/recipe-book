import React from 'react'

import { useFormik } from 'formik'
import {
	FormErrorMessage,
	FormikTextField,
	SubmitButton,
} from 'ts/components/FormComponents'
import { createSubmitHandler } from 'ts/utils/helpers'

import { Box } from '@mui/system'

import { initialValues, submit, validationSchema } from './controller'

export default function ChangePasswordForm(): React.ReactElement {
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
			<FormikTextField
				formik={formik}
				fieldName='password1'
				label='New Password'
				type='password'
				autoComplete='new-password'
			/>
			<FormikTextField
				formik={formik}
				fieldName='password2'
				label='Confirm New Password'
				type='password'
				autoComplete='new-password'
			/>

			<FormErrorMessage message={formError} />
			<SubmitButton isSubmitting={formik.isSubmitting} />
		</Box>
	)
}
