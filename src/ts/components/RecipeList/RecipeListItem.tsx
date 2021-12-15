import React from 'react'

import { Link } from 'react-router-dom'
import { Recipe } from 'ts/utils/models'
import Paths from 'ts/utils/paths'

import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
} from '@mui/material'
import { Box } from '@mui/system'

export default function RecipeListItem(props: {
	recipe: Recipe
}): React.ReactElement {
	const { recipe } = props

	return (
		<Box key={recipe.id}>
			<ListItem dense disablePadding>
				<ListItemButton
					component={Link}
					to={Paths.getRecipeDetailLink(recipe.id)}
					sx={{ mx: 0, py: 0 }}
				>
					<ListItemAvatar>
						<Avatar src={recipe.image} />
					</ListItemAvatar>
					<ListItemText primary={recipe.name} secondary={recipe.totalTime} />
				</ListItemButton>
			</ListItem>
		</Box>
	)
}
