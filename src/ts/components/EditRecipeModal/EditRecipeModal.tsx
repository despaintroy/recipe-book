import React from 'react'

import EditRecipeForm from 'ts/forms/EditRecipe'
import { Recipe, RecipeRef } from 'ts/utils/models'

import CloseIcon from '@mui/icons-material/Close'
import { Container, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Slide from '@mui/material/Slide'
import Toolbar from '@mui/material/Toolbar'
import { TransitionProps } from '@mui/material/transitions'

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />
})

export default function EditRecipeModal(props: {
	open: boolean
	recipe: Recipe
	recipeRef: RecipeRef
	handleClose: () => void
	onEdit?: () => void
}): React.ReactElement {
	const { open, recipe, recipeRef, handleClose, onEdit } = props

	return (
		<Dialog
			fullScreen
			open={open}
			onClose={handleClose}
			TransitionComponent={Transition}
		>
			<AppBar
				elevation={0}
				sx={{ position: 'fixed', borderBottom: 1, borderColor: 'divider' }}
			>
				<Toolbar>
					<IconButton edge='start' color='inherit' onClick={handleClose}>
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
						Edit Recipe
					</Typography>
				</Toolbar>
			</AppBar>
			<Container maxWidth='sm' sx={{ pt: 10, pb: 4 }}>
				<EditRecipeForm
					recipe={recipe}
					recipeRef={recipeRef}
					onSuccess={(): void => {
						handleClose()
						onEdit && onEdit()
					}}
				/>
			</Container>
		</Dialog>
	)
}
