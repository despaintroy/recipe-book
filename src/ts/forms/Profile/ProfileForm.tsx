import React, { useContext, useEffect } from 'react'

import { useFormik } from 'formik'
import { UserContext } from 'MainAuthorized'
import {
	FormErrorMessage,
	FormikTextField,
	SubmitButton,
} from 'ts/components/FormComponents'
import { getMessage } from 'ts/services/errors'

import { Box } from '@mui/system'

import { FormValues, submit, validationSchema } from './controller'

export default function ProfileForm(): React.ReactElement {
	const { user, updateUser } = useContext(UserContext)
	const [formError, setFormError] = React.useState('')
	const [hasChanged, setHasChanged] = React.useState(false)

	const initialValues: FormValues = {
		name: user.name ?? '',
		email: user.email ?? '',
	}

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values: FormValues): Promise<void> =>
			submit(values, user)
				.then(() => updateUser())
				.catch(error => setFormError(getMessage(error))),
	})

	useEffect(
		() =>
			setHasChanged(
				user.name !== formik.values.name || user.email !== formik.values.email
			),
		[formik.values.name, formik.values.email]
	)

	return (
		<Box
			component='form'
			onSubmit={formik.handleSubmit}
			noValidate
			sx={{ mt: 1, width: '100%' }}
		>
			<FormikTextField formik={formik} fieldName='name' label='Name' />
			<FormikTextField formik={formik} fieldName='email' label='Email' />

			<FormErrorMessage message={formError} />
			<SubmitButton
				isSubmitting={formik.isSubmitting}
				buttonText='Save Changes'
				disabled={!hasChanged}
			/>
		</Box>
	)
}
