import React from 'react'

import { FormikContextType } from 'formik'

import { BaseTextFieldProps, TextField } from '@mui/material'

export interface FormikTextFieldProps<Values> extends BaseTextFieldProps {
	formik: FormikContextType<Values>
	fieldName: keyof Values
}

export default function FormikTextField<Values>(
	props: FormikTextFieldProps<Values>
): React.ReactElement {
	const { formik, fieldName, ...rest } = props

	return (
		<TextField
			{...rest}
			fullWidth={rest.fullWidth ?? true}
			margin={rest.margin ?? 'normal'}
			id={rest.id ?? fieldName.toString()}
			name={fieldName.toString()}
			type={rest.type ?? 'text'}
			value={formik.values[fieldName]}
			onChange={formik.handleChange}
			error={formik.touched[fieldName] && !!formik.errors[fieldName]}
			helperText={formik.touched[fieldName] && formik.errors[fieldName]}
		/>
	)
}
