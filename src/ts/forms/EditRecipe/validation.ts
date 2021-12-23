import { URL_REGEX } from 'ts/utils/constants'
import { newFormState } from 'ts/utils/helpers'
import { FormState, Recipe } from 'ts/utils/models'

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

const nameValidator = (state: FormState<Fields>): FormState<Fields> => {
	state.isValid.name = state.values.name.length > 0
	state.messages.name = state.isValid.name ? '' : 'Required'
	return { ...state }
}

const descriptionValidator = (state: FormState<Fields>): FormState<Fields> => {
	state.isValid.description = true
	return { ...state }
}

const urlValidator = (state: FormState<Fields>): FormState<Fields> => {
	state.isValid.url =
		state.values.url.length === 0 || !!state.values.url.match(URL_REGEX)
	state.messages.url = state.isValid.url ? '' : 'Invalid url'
	return { ...state }
}

const recipeYieldValidator = (state: FormState<Fields>): FormState<Fields> => {
	state.isValid.recipeYield = true
	return { ...state }
}

const recipeTimeValidator = (state: FormState<Fields>): FormState<Fields> => {
	state.isValid.cookTime = true
	state.isValid.prepTime = true
	state.isValid.totalTime = true
	return { ...state }
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
			name: nameValidator,
			description: descriptionValidator,
			url: urlValidator,
			recipeYield: recipeYieldValidator,
			cookTime: recipeTimeValidator,
			prepTime: recipeTimeValidator,
			totalTime: recipeTimeValidator,
		},
	}
}
