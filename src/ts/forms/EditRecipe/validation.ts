import { URL_REGEX } from 'ts/utils/constants'
import {
	FieldValidatorResponse,
	FormState,
	newFormState,
} from 'ts/utils/formState'
import { Recipe } from 'ts/utils/models'

const fieldsArray = [
	'name',
	'description',
	'url',
	'recipeYield',
	'cookTime',
	'prepTime',
	'totalTime',
] as const
type Fields = typeof fieldsArray[number]

const nameValidator = (state: FormState<Fields>): FieldValidatorResponse => {
	const isValid = state.values.name.length > 0
	return {
		isValid: isValid,
		message: isValid ? '' : 'Required',
	}
}

const urlValidator = (state: FormState<Fields>): FieldValidatorResponse => {
	const isValid =
		state.values.url.length === 0 || !!state.values.url.match(URL_REGEX)
	return {
		isValid: isValid,
		message: isValid ? '' : 'Invalid URL',
	}
}

export const getInitialFormState = (recipe: Recipe): FormState<Fields> => {
	const state = newFormState(fieldsArray)
	return {
		...state,
		values: {
			name: recipe.name,
			description: recipe.description,
			url: recipe.url,
			recipeYield: recipe.recipeYield,
			cookTime: recipe.cookTime,
			prepTime: recipe.prepTime,
			totalTime: recipe.totalTime,
		},
		validators: {
			name: [nameValidator],
			description: [],
			url: [urlValidator],
			recipeYield: [],
			cookTime: [],
			prepTime: [],
			totalTime: [],
		},
	}
}
