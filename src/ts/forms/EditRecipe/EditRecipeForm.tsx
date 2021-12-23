import React from 'react'

import { updateRecipe } from 'ts/services/recipe'
import { beforeSubmit, handleValueChange, validateForm } from 'ts/utils/helpers'
import { Recipe, RecipeRef } from 'ts/utils/models'

import { LoadingButton } from '@mui/lab'
import { Alert, Box, TextField } from '@mui/material'

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
			<TextField
				margin='normal'
				required
				fullWidth
				id='name'
				label='Recipe Name'
				name='name'
				variant='standard'
				defaultValue={formState.values.name}
				onChange={(e): void =>
					setFormState(state => handleValueChange(e, state))
				}
				onBlur={(): void => {
					formState.touched.name = true
					setFormState(state => validateForm(state))
				}}
				error={formState.touched.name && !formState.isValid.name}
				helperText={formState.touched.name && formState.messages.name}
			/>
			<TextField
				margin='normal'
				multiline
				fullWidth
				id='description'
				label='Description'
				name='description'
				variant='standard'
				defaultValue={formState.values.description}
				onChange={(e): void =>
					setFormState(state => handleValueChange(e, state))
				}
				onBlur={(): void => {
					formState.touched.description = true
					setFormState(state => validateForm(state))
				}}
				error={formState.touched.description && !formState.isValid.description}
				helperText={
					formState.touched.description && formState.messages.description
				}
			/>
			<TextField
				margin='normal'
				fullWidth
				id='url'
				label='URL'
				name='url'
				variant='standard'
				defaultValue={formState.values.url}
				onChange={(e): void =>
					setFormState(state => handleValueChange(e, state))
				}
				onBlur={(): void => {
					formState.touched.url = true
					setFormState(state => validateForm(state))
				}}
				error={formState.touched.url && !formState.isValid.url}
				helperText={formState.touched.url && formState.messages.url}
			/>
			<TextField
				margin='normal'
				fullWidth
				id='recipeYield'
				label='Makes'
				name='recipeYield'
				variant='standard'
				defaultValue={formState.values.recipeYield}
				onChange={(e): void =>
					setFormState(state => handleValueChange(e, state))
				}
				onBlur={(): void => {
					formState.touched.recipeYield = true
					setFormState(state => validateForm(state))
				}}
				error={formState.touched.recipeYield && !formState.isValid.recipeYield}
				helperText={
					formState.touched.recipeYield && formState.messages.recipeYield
				}
			/>
			<TextField
				margin='normal'
				fullWidth
				id='totalTime'
				label='Total Time'
				name='totalTime'
				variant='standard'
				defaultValue={formState.values.totalTime}
				onChange={(e): void =>
					setFormState(state => handleValueChange(e, state))
				}
				onBlur={(): void => {
					formState.touched.totalTime = true
					setFormState(state => validateForm(state))
				}}
				error={formState.touched.totalTime && !formState.isValid.totalTime}
				helperText={formState.touched.totalTime && formState.messages.totalTime}
			/>
			<TextField
				margin='normal'
				fullWidth
				id='cookTime'
				label='Cook Time'
				name='cookTime'
				variant='standard'
				defaultValue={formState.values.cookTime}
				onChange={(e): void =>
					setFormState(state => handleValueChange(e, state))
				}
				onBlur={(): void => {
					formState.touched.cookTime = true
					setFormState(state => validateForm(state))
				}}
				error={formState.touched.cookTime && !formState.isValid.cookTime}
				helperText={formState.touched.cookTime && formState.messages.cookTime}
			/>
			<TextField
				margin='normal'
				fullWidth
				id='prepTime'
				label='Prep Time'
				name='prepTime'
				variant='standard'
				defaultValue={formState.values.prepTime}
				onChange={(e): void =>
					setFormState(state => handleValueChange(e, state))
				}
				onBlur={(): void => {
					formState.touched.prepTime = true
					setFormState(state => validateForm(state))
				}}
				error={formState.touched.prepTime && !formState.isValid.prepTime}
				helperText={formState.touched.prepTime && formState.messages.prepTime}
			/>

			{formState.attemptedSubmit && formState.formMessage && (
				<Alert sx={{ mt: 2 }} severity='error'>
					{formState.formMessage || 'Form error'}
				</Alert>
			)}

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
