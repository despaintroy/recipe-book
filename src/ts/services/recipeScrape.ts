import { Recipe } from 'ts/utils/models'

// const recipeEndpoint =
// 	'http://localhost:5001/recipe-book-2a0f2/us-central1/app/api'
const recipeEndpoint =
	'https://us-central1-recipe-book-2a0f2.cloudfunctions.net/app/api'

export function scrapeRecipe(url: string): Promise<Recipe> {
	if (!url) {
		return Promise.reject({ message: 'No URL provided' })
	}
	return fetch(`${recipeEndpoint}/recipe?url=${url}`)
		.then(res =>
			res.json().then(json => {
				console.log(json)
				return json
			})
		)
		.catch(err => Promise.reject(err))
}
