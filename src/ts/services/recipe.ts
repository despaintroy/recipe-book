import { Recipe } from 'ts/utils/models'

import { getBookByID, updateBook } from './book'

export async function addRecipe(bookID: string, recipe: Recipe): Promise<void> {
	const book = await getBookByID(bookID)
	if (!book) return Promise.reject()
	const recipes = (book.recipes || []).concat(recipe)
	return updateBook(bookID, { recipes: recipes })
}
