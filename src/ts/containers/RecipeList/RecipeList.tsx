import React from 'react'

import { Recipe } from 'ts/utils/models'

import { Box } from '@mui/system'

export default function RecipeList(props: {
	recipes: Recipe[]
}): React.ReactElement {
	const { recipes } = props

	return (
		<Box>
			{recipes.map((recipe, index) => (
				<p key={index}>{recipe.name}</p>
			))}
		</Box>
	)
}
