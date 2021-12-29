import { updateRecipe } from 'ts/services/recipe'
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
	bookID: string,
	recipeID: string
): Promise<void> {
	return updateRecipe(bookID, recipeID, {
		...values,
	})
}
