import React from 'react'

import { useFormik } from 'formik'
import {
	FormErrorMessage,
	FormikTextField,
	SubmitButton,
} from 'ts/components/FormComponents'
import { Recipe } from 'ts/utils/models'

import { Box, Typography } from '@mui/material'

import { FormValues, validationSchema } from './controller'
import TextListInput from './TextListInput'

export default function BaseForm(props: {
	recipe: Partial<Recipe>
	handleSubmit: (values: FormValues) => Promise<void>
	submitButtonText?: string
	onSuccess?: () => void
}): React.ReactElement {
	const { recipe, handleSubmit, submitButtonText, onSuccess } = props
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
		recipeInstructions: recipe.recipeInstructions ?? [],
	}

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values: FormValues): Promise<void> =>
			handleSubmit(values)
				.then(() => onSuccess && onSuccess())
				.catch(error => setFormError(error.message)),
	})

	const handleUpdateIngredients = (recipeIngredients: string[]): void => {
		formik.setFieldValue('recipeIngredients', recipeIngredients)
	}

	const handleUpdateDirections = (recipeInstructions: string[]): void => {
		formik.setFieldValue('recipeInstructions', recipeInstructions)
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

			<Typography variant='h2' sx={{ mt: 4 }}>
				Time
			</Typography>
			<FormikTextField
				formik={formik}
				fieldName='totalTime'
				label='Total Time'
			/>
			<FormikTextField formik={formik} fieldName='prepTime' label='Prep Time' />
			<FormikTextField formik={formik} fieldName='cookTime' label='Cook Time' />

			<Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
				Ingredients
			</Typography>
			<TextListInput
				initialList={formik.values.recipeIngredients}
				uniquePrefix='recipeIngredients'
				onChange={handleUpdateIngredients}
				itemName='ingredient'
				errorText={formik.errors.recipeIngredients}
			/>

			<Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
				Directions
			</Typography>
			<TextListInput
				initialList={formik.values.recipeInstructions}
				uniquePrefix='recipeDirections'
				onChange={handleUpdateDirections}
				itemName='step'
				variant='outlined'
				errorText={formik.errors.recipeInstructions}
			/>

			<FormErrorMessage message={formError} />
			<SubmitButton
				isSubmitting={formik.isSubmitting}
				buttonText={submitButtonText ?? 'Submit'}
			/>
		</Box>
	)
}
