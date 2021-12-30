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

export interface RecipeResponse {
	url?: string
	name: string
	image?: string
	description?: string
	cookTime?: string
	prepTime?: string
	totalTime?: string
	recipeYield?: string
	recipeIngredients: string[]
	recipeInstructions: string[]
}
export interface Recipe extends RecipeResponse {
	id: string
	bookID: string
}

export interface BookResponse {
	id: string
	title: string
	recipes?: Omit<Recipe, 'bookID'>[]
	created?: number
}

export interface Book {
	id: string
	title: string
	recipes: Recipe[]
	created?: number
}
