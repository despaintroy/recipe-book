import React from 'react'

import { Recipe } from 'ts/utils/models'

import { Box } from '@mui/system'

import RecipeListItem from './RecipeListItem'

export default function RecipeList(props: {
	recipes: Recipe[]
}): React.ReactElement {
	const { recipes } = props

	return (
		<Box>
			{recipes.map(recipe => (
				<RecipeListItem recipe={recipe} key={recipe.id} />
			))}
		</Box>
	)
}
