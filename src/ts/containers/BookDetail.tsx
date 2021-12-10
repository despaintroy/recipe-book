import React from 'react'

import { useParams } from 'react-router-dom'
import recipeDataScraper from 'recipe-data-scraper'

import { Button, Container, Typography } from '@mui/material'

export default function BookDetail(): React.ReactElement {
	const urlParams = useParams<{ id: string }>()

	const testScrape = (): void => {
		console.log('testScrape')

		recipeDataScraper(
			'https://www.101cookbooks.com/classic-shortbread-cookies/'
		)
			.then(recipe => alert(recipe.name))
			.catch(err => alert(err.message ?? 'Error'))

		// 	recipeScraper("https://www.101cookbooks.com/classic-shortbread-cookies/").then((r: any) => console.log(r));
		// 	scrapeRecipe('https://www.pillsbury.com/recipes/perfect-apple-pie/1fc2b60f-0a4f-441e-ad93-8bbd00fe5334')
	}

	return (
		<Container>
			<Typography variant='h1'>Recipes</Typography>
			<Typography variant='body1'>Book ID: {urlParams.id}</Typography>
			<Button
				onClick={testScrape}
				fullWidth
				variant='contained'
				color='primary'
			>
				Test Scrape
			</Button>
		</Container>
	)
}
