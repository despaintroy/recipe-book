import React from 'react'

import { useFormik } from 'formik'
import {
	FormErrorMessage,
	FormikTextField,
	SubmitButton,
} from 'ts/components/FormComponents'
import { Recipe, RecipeRef } from 'ts/utils/models'

import { Box } from '@mui/material'

import { FormValues, submit, validationSchema } from './controller'
import IngredientsFields from './IngredientsFields'

export default function EditRecipeForm(props: {
	recipe: Recipe
	recipeRef: RecipeRef
	onSuccess?: () => void
}): React.ReactElement {
	const { recipe, recipeRef, onSuccess } = props
	const [formError, setFormError] = React.useState('')

	const initialValues: FormValues = {
		name: recipe.name ?? '',
		description: recipe.description ?? '',
		url: recipe.url ?? '',
		recipeYield: recipe.recipeYield ?? '',
		totalTime: recipe.totalTime ?? '',
		prepTime: recipe.prepTime ?? '',
		cookTime: recipe.cookTime ?? '',
		recipeIngredients: recipe.recipeIngredients ?? [],
	}

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values: FormValues): Promise<void> =>
			submit(values, recipeRef)
				.then(() => onSuccess && onSuccess())
				.catch(error => setFormError(error.message)),
	})

	const handleUpdateIngredients = (recipeIngredients: string[]): void => {
		formik.setFieldValue('recipeIngredients', recipeIngredients)
	}

	return (
		<Box
			component='form'
			onSubmit={formik.handleSubmit}
			noValidate
			sx={{ width: '100%' }}
		>
			<FormikTextField formik={formik} fieldName='name' label='Recipe Name' />
			<FormikTextField
				formik={formik}
				fieldName='description'
				label='Description'
				multiline
			/>
			<FormikTextField
				formik={formik}
				fieldName='url'
				label='Website'
				type='url'
			/>
			<FormikTextField formik={formik} fieldName='recipeYield' label='Makes' />
			<FormikTextField
				formik={formik}
				fieldName='totalTime'
				label='Total Time'
			/>
			<FormikTextField formik={formik} fieldName='prepTime' label='Prep Time' />
			<FormikTextField formik={formik} fieldName='cookTime' label='Cook Time' />

			<IngredientsFields
				ingredients={formik.values.recipeIngredients}
				onChange={handleUpdateIngredients}
			/>

			<FormErrorMessage message={formError} />
			<SubmitButton
				isSubmitting={formik.isSubmitting}
				buttonText='Save Changes'
			/>
		</Box>
	)
}
