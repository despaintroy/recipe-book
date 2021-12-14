import React from 'react'

import { Recipe } from 'ts/utils/models'

import { Box } from '@mui/system'

import RecipeListItem from './RecipeListItem'
import RecipeMasonryTile from './RecipeMasonryTile'

export default function RecipeList(props: {
	recipes: Recipe[]
	masonry?: boolean
}): React.ReactElement {
	const { recipes, masonry } = props

	if (masonry) {
		return (
			<Box sx={{ columnCount: { xs: 2, sm: 3, md: 4 } }}>
				{recipes.map((recipe, index) => (
					<RecipeMasonryTile recipe={recipe} key={index} />
				))}
			</Box>
		)
	}

	return (
		<Box>
			{recipes.map(recipe => (
				<RecipeListItem recipe={recipe} key={recipe.id} />
			))}
		</Box>
	)
}
