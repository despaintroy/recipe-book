import { updateRecipe } from 'ts/services/recipe'
import { RecipeRef } from 'ts/utils/models'
import * as yup from 'yup'

export interface FormValues {
	name: string
	description: string
	url: string
	recipeYield: string
	totalTime: string
	prepTime: string
	cookTime: string
	recipeIngredients: string[]
	recipeInstructions: string[]
}

export const validationSchema = yup.object({
	name: yup.string().required('Required'),
	description: yup.string().optional(),
	url: yup.string().url().optional(),
	recipeYield: yup.string().optional(),
	totalTime: yup.string().optional(),
	prepTime: yup.string().optional(),
	cookTime: yup.string().optional(),
})

export function submit(
	values: FormValues,
	recipeRef: RecipeRef
): Promise<void> {
	return updateRecipe(recipeRef, {
		...values,
	})
}
