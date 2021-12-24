import React from 'react'

import { FormState } from 'ts/utils/formState'

import { Alert } from '@mui/material'

export default function FormErrorMessage<FieldNames extends string>(props: {
	formState: FormState<FieldNames>
}): React.ReactElement {
	const { formState } = props

	if (formState.formMessage) {
		return (
			<Alert sx={{ mt: 2 }} severity='error'>
				{formState.formMessage || 'Form error'}
			</Alert>
		)
	}

	return <></>
}
