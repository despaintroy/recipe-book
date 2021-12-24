import React from 'react'

import ImportRecipe from 'ts/containers/ImportRecipe'
import { addRecipe } from 'ts/services/recipe'
import { Recipe } from 'ts/utils/models'

import CloseIcon from '@mui/icons-material/Close'
import { LoadingButton } from '@mui/lab'
import { Alert, Container, Typography } from '@mui/material'
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

export default function AddRecipeModal(props: {
	bookID: string
	open: boolean
	handleClose: () => void
	onAdd: (recipe: Recipe) => void
}): React.ReactElement {
	const { bookID, open, handleClose, onAdd } = props
	const [recipe, setRecipe] = React.useState<Recipe | null>()
	const [error, setError] = React.useState('')
	const [submitting, setSubmitting] = React.useState(false)

	function handleSubmit(event: React.MouseEvent): void {
		event.preventDefault()

		setError('')

		if (!recipe) {
			setError('No recipe selected')
			return
		}

		setSubmitting(true)

		addRecipe(bookID, recipe)
			.then(() => {
				onAdd(recipe)
				handleClose()
			})
			.catch(() => setError('Error adding recipe'))
			.finally(() => setSubmitting(false))
	}

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
				</Toolbar>
			</AppBar>
			<Container maxWidth='sm' sx={{ pt: 10 }}>
				<ImportRecipe setRecipeCallback={setRecipe} />

				{error && (
					<Alert sx={{ mt: 2 }} severity='error'>
						{error}
					</Alert>
				)}

				{recipe && (
					<LoadingButton
						loading={submitting}
						onClick={handleSubmit}
						fullWidth
						variant='contained'
						sx={{ mt: 2, mb: 2 }}
					>
						Import Recipe
					</LoadingButton>
				)}
			</Container>
		</Dialog>
	)
}
