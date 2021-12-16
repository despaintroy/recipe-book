import React from 'react'

import ImportRecipe from 'ts/containers/ImportRecipe'
import { Recipe } from 'ts/utils/models'

import CloseIcon from '@mui/icons-material/Close'
import { Container, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
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

export default function AddRecipeModal(props: {
	open: boolean
	handleClose: () => void
	onAdd: (recipe: Recipe) => void
}): React.ReactElement {
	const { open, handleClose, onAdd } = props
	const [recipe, setRecipe] = React.useState<Recipe | null>()

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
					<IconButton
						edge='start'
						color='inherit'
						onClick={handleClose}
						aria-label='close'
					>
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
						Add Recipe
					</Typography>
					<Button
						autoFocus
						color='inherit'
						disabled={!recipe}
						onClick={(): void => {
							recipe && onAdd(recipe)
							handleClose()
						}}
					>
						Save Recipe
					</Button>
				</Toolbar>
			</AppBar>
			<Container maxWidth='sm' sx={{ pt: 10 }}>
				<ImportRecipe setRecipeCallback={setRecipe} />
			</Container>
		</Dialog>
	)
}
