import axios from 'axios'
import { Recipe } from 'ts/utils/models'

const api = axios.create({
	baseURL: 'https://us-central1-recipe-book-2a0f2.cloudfunctions.net/app/api',
})

export function scrapeRecipe(url: string): Promise<Recipe> {
	return !url
		? Promise.reject({ message: 'No URL provided' })
		: api
				.get('/recipe', { params: { url: url } })
				.then(r => r.data)
				.catch(e => Promise.reject(e))
}
