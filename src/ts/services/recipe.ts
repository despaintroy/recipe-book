import * as hash from 'json-hash'
import { Recipe } from 'ts/utils/models'

import { getBookByID, updateBook } from './book'

export async function addRecipe(bookID: string, recipe: Recipe): Promise<void> {
	const book = await getBookByID(bookID)
	if (!book) return Promise.reject()
	recipe.id = hash.digest(recipe)
	const recipes = (book.recipes || []).concat(recipe)
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
