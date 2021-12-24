import React, { Dispatch } from 'react'

import { FormState } from 'ts/utils/formState'

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
			onChange={(e): void => {
				formState.handleValueChange(fieldName, e.target.value)
				setFormState({ ...formState })
			}}
			onBlur={(): void => {
				formState.touch(fieldName)
				formState.validate()
				setFormState({ ...formState })
			}}
			error={formState.touched[fieldName] && !formState.isValid[fieldName]}
			helperText={formState.touched[fieldName] && formState.messages[fieldName]}
		/>
	)
}
