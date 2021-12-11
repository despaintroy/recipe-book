import 'firebase-functions'

import * as cors from 'cors'
import express = require('express')
import {
	Request,
	Response,
} from 'express'
import * as functions from 'firebase-functions'
import recipeDataScraper from 'recipe-data-scraper'

const app = express();

app.use(cors({origin: true}));

interface RecipeDataScraperResponse {
	url: string;
  name: string;
  image: string;
  description: string;
  cookTime: string;
  cookTimeOriginalFormat: string;
  prepTime: string;
  prepTimeOriginalFormat: string;
  totalTime: string;
  totalTimeOriginalFormat: string;
  recipeYield: string;
  recipeIngredients: string[];
  recipeInstructions: string[];
  recipeCategories: string[];
  recipeCuisines: string[];
  recipeTypes: string[];
  keywords: string[];
}

interface RecipeResponse {
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

function createResipeResponseJSON(recipe: RecipeDataScraperResponse): RecipeResponse {
	return {
		url: recipe.url,
		name: recipe.name,
		description: recipe.description,
		image: recipe.image,
		prepTime: recipe.prepTime,
		cookTime: recipe.cookTime,
		totalTime: recipe.totalTime,
		recipeYield: recipe.recipeYield,
		recipeIngredients: recipe.recipeIngredients,
		recipeInstructions: recipe.recipeInstructions,
	}
}

app.get("/api/recipe", (req: Request, res: Response) => {
	const url = req.query.url as string;
	if (!url) res.status(400).send("Missing url parameter");
	recipeDataScraper(url)
			.then(recipe => res.status(200).send(createResipeResponseJSON(recipe)))
			.catch((err) => res.status(500).send(err.message));
});

exports.app = functions.https.onRequest(app);
