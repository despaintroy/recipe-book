import { Recipe } from 'ts/utils/models'
import { v4 as uuidv4 } from 'uuid'

import { getBookByID, updateBook } from './book'

export async function addRecipe(
	bookID: string,
	recipe: Recipe
): Promise<string> {
	const book = await getBookByID(bookID)
	if (!book) return Promise.reject()
	recipe.id = uuidv4()
	const recipes = (book.recipes || []).concat(recipe)
	return updateBook(bookID, { recipes: recipes }).then(() => recipe.id)
}

export type UpdateRecipeParams = Partial<Exclude<Recipe, 'id'>>

export const updateRecipe = async (
	bookID: string,
	recipeID: string,
	updateFields: UpdateRecipeParams
): Promise<void> => {
	const book = await getBookByID(bookID)
	const recipe = book?.recipes.find(r => r.id === recipeID)
	if (!book || !book.recipes || !recipe) return Promise.reject()

	Object.entries(updateFields).forEach(([key, value]) => {
		if (value !== undefined)
			recipe[key as keyof Recipe] = value as string & string[]
	})

	const recipes = book.recipes.filter(recipe => recipe.id !== recipeID)
	recipes.push(recipe)
	return updateBook(bookID, { recipes: recipes })
}

export async function deleteRecipe(
	bookID: string,
	recipeID: string
): Promise<void> {
	const book = await getBookByID(bookID)
	if (!book || !book.recipes) return Promise.reject()
	const recipes = book.recipes.filter(recipe => recipe.id !== recipeID)
	return updateBook(bookID, { recipes: recipes })
}
