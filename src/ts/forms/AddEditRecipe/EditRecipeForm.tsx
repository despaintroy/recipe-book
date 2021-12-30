import React from 'react'

import { Recipe } from 'ts/utils/models'

import BaseForm from './BaseForm'

export default function EditRecipeForm(props: {
	recipe: Recipe
	onSuccess?: () => void
}): React.ReactElement {
	const { recipe, onSuccess } = props
	return <BaseForm recipe={recipe} onSuccess={onSuccess} />
}
