import React from 'react'

import { FormState } from 'ts/utils/models'

import { Alert } from '@mui/material'

export default function FormErrorMessage<FieldNames extends string>(props: {
	formState: FormState<FieldNames>
}): React.ReactElement {
	const { formState } = props

	return (
		<>
			{formState.formMessage && (
				<Alert sx={{ mt: 2 }} severity='error'>
					{formState.formMessage || 'Form error'}
				</Alert>
			)}
		</>
	)
}
