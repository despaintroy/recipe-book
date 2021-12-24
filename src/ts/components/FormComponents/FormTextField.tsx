import React, { Dispatch } from 'react'

import { handleValueChange, validateForm } from 'ts/utils/formState'
import { FormState } from 'ts/utils/models'

import { BaseTextFieldProps, TextField } from '@mui/material'

interface FormTextFieldProps<FieldNames extends string>
	extends BaseTextFieldProps {
	fieldName: FieldNames
	formState: FormState<FieldNames>
	setFormState: Dispatch<React.SetStateAction<FormState<FieldNames>>>
}

export default function FormTextField<FieldNames extends string>(
	props: FormTextFieldProps<FieldNames>
): React.ReactElement {
	const { fieldName, formState, setFormState, ...rest } = props

	return (
		<TextField
			{...rest}
			id={fieldName}
			name={fieldName}
			margin={rest.margin ?? 'normal'}
			fullWidth={rest.fullWidth ?? true}
			variant={rest.variant ?? 'standard'}
			defaultValue={formState.values[fieldName]}
			onChange={(e): void => setFormState(state => handleValueChange(e, state))}
			onBlur={(): void => {
				formState.touched[fieldName] = true
				setFormState(state => validateForm(state))
			}}
			error={formState.touched[fieldName] && !formState.isValid[fieldName]}
			helperText={formState.touched[fieldName] && formState.messages[fieldName]}
		/>
	)
}
