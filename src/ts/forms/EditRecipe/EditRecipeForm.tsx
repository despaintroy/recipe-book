import React from 'react'

import { FormErrorMessage, FormTextField } from 'ts/components/FormComponents'
import { updateRecipe } from 'ts/services/recipe'
import { beforeSubmit } from 'ts/utils/formState'
import { Recipe, RecipeRef } from 'ts/utils/models'

import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'

import { getInitialFormState } from './validation'

export default function EditRecipeForm(props: {
	recipe: Recipe
	recipeRef: RecipeRef
	onSuccess?: () => void
}): React.ReactElement {
	const { recipe, recipeRef, onSuccess } = props

	const [submitting, setSubmitting] = React.useState(false)
	const [formState, setFormState] = React.useState(getInitialFormState(recipe))

	function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault()

		setFormState(state => beforeSubmit(state))

		if (!formState.formValid) return

		setSubmitting(true)

		updateRecipe(recipeRef, {
			...formState.values,
		}).then(() => onSuccess && onSuccess())
	}

	return (
		<Box
			component='form'
			onSubmit={handleSubmit}
			noValidate
			sx={{ mt: 1, width: '100%' }}
		>
			<FormTextField
				label='Recipe Name'
				fieldName='name'
				formState={formState}
				setFormState={setFormState}
			/>
			<FormTextField
				label='Description'
				fieldName='description'
				multiline
				formState={formState}
				setFormState={setFormState}
			/>
			<FormTextField
				label='URL'
				fieldName='url'
				type='url'
				formState={formState}
				setFormState={setFormState}
			/>
			<FormTextField
				label='Makes'
				fieldName='recipeYield'
				formState={formState}
				setFormState={setFormState}
			/>
			<FormTextField
				label='Total Time'
				fieldName='totalTime'
				formState={formState}
				setFormState={setFormState}
			/>
			<FormTextField
				label='Prep Time'
				fieldName='prepTime'
				formState={formState}
				setFormState={setFormState}
			/>
			<FormTextField
				label='Cook Time'
				fieldName='cookTime'
				formState={formState}
				setFormState={setFormState}
			/>

			<FormErrorMessage formState={formState} />

			<LoadingButton
				loading={submitting}
				type='submit'
				fullWidth
				variant='contained'
				sx={{ mt: 2, mb: 2 }}
			>
				Save Changes
			</LoadingButton>
		</Box>
	)
}
