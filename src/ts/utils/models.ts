export interface User {
	id: string
	lastSignIn?: Date
	name: string | null | undefined
	email: string | null | undefined
	phone: string | null | undefined
}

export interface UserData {
	id: string
	bookIDs?: string[]
}

export interface FormState<FieldNames extends string> {
	values: Record<FieldNames, string>
	isValid: Record<FieldNames, boolean>
	messages: Record<FieldNames, string>
	touched: Record<FieldNames, boolean>
	validators: Record<
		FieldNames,
		(state: FormState<FieldNames>) => FormState<FieldNames>
	>
	formValid: boolean
	formMessage: string
	attemptedSubmit: boolean
}

export interface RecipeResponse {
	url: string
	name: string
	image: string
	description: string
	cookTime: string
	prepTime: string
	totalTime: string
	recipeYield: string
	recipeIngredients: string[]
	recipeInstructions: string[]
}
export interface Recipe extends RecipeResponse {
	id: string
}

export interface Book {
	id: string
	title: string
	recipes?: Recipe[]
	created?: number
}
