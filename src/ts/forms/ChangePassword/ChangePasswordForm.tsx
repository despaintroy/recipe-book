import React from 'react'

import { useFormik } from 'formik'
import {
	FormErrorMessage,
	FormikTextField,
	SubmitButton,
} from 'ts/components/FormComponents'

import { Box } from '@mui/system'

import {
	FormValues,
	initialValues,
	submit,
	validationSchema,
} from './controller'

export default function ChangePasswordForm(): React.ReactElement {
	const [formError, setFormError] = React.useState('')

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values: FormValues): Promise<void> => {
			return submit(values)
				.then(() => formik.resetForm())
				.catch(error => {
					setFormError(error.message)
					formik.resetForm()
				})
		},
	})

	return (
		<Box
			component='form'
			onSubmit={formik.handleSubmit}
			noValidate
			sx={{ width: '100%' }}
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
			<SubmitButton
				isSubmitting={formik.isSubmitting}
				buttonText='Change Password'
				disabled={!formik.values.password1 && !formik.values.password2}
			/>
		</Box>
	)
}
