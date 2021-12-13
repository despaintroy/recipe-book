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
	// const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)

	// const showMenu = (event: React.MouseEvent<HTMLButtonElement>): void =>
	// 	setMenuAnchor(event.currentTarget)

	// const closeMenu = (): void => setMenuAnchor(null)

	return (
		<Box key={recipe.id}>
			<ListItem
				// secondaryAction={
				// 	<IconButton onClick={showMenu}>
				// 		<Icon>more_vert</Icon>
				// 	</IconButton>
				// }
				dense
				disablePadding
			>
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

			{/* <Menu
				anchorEl={menuAnchor}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={!!menuAnchor}
				onClose={closeMenu}
				keepMounted
			>
				<MenuItem
					onClick={(): void => {
						setShowDeleteDialog(true)
						closeMenu()
					}}
				>
					Delete
				</MenuItem>
			</Menu> */}
		</Box>
	)
}
