import React from 'react'

import { Recipe } from 'ts/utils/models'

import BaseForm from './BaseForm'
import { FormValues, submitEdit } from './controller'

export default function EditRecipeForm(props: {
	recipe: Recipe
	onSuccess?: () => void
}): React.ReactElement {
	const { recipe, onSuccess } = props

	function handleSubmit(values: FormValues): Promise<void> {
		return submitEdit(values, recipe.bookID, recipe.id)
	}

	return (
		<BaseForm
			recipe={recipe}
			handleSubmit={handleSubmit}
			submitButtonText='Save Changes'
			onSuccess={onSuccess}
		/>
	)
}
