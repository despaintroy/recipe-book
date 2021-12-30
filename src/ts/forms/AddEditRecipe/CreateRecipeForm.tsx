import React from 'react'

import BaseForm from './BaseForm'
import { FormValues, submitCreate } from './controller'

export default function CreateRecipeForm(props: {
	bookID: string
	onSuccess?: (recipeID: string) => void
}): React.ReactElement {
	const { bookID, onSuccess } = props

	async function handleSubmit(values: FormValues): Promise<void> {
		const recipeID = await submitCreate(values, bookID)
		onSuccess && onSuccess(recipeID)
	}

	return (
		<BaseForm
			recipe={{}}
			handleSubmit={handleSubmit}
			submitButtonText='Create Recipe'
		/>
	)
}
