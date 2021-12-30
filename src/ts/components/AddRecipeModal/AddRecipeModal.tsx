import React from 'react'

import SwipeableViews from 'react-swipeable-views'
import theme from 'theme'
import CreateRecipe from 'ts/containers/CreateRecipe'
import ImportRecipe from 'ts/containers/ImportRecipe'

import CloseIcon from '@mui/icons-material/Close'
import { Box, Container, Tab, Tabs, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Slide from '@mui/material/Slide'
import Toolbar from '@mui/material/Toolbar'
import { TransitionProps } from '@mui/material/transitions'

// TODO: Split this file into multiple components

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />
})

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

function TabPanel(props: TabPanelProps): React.ReactElement {
	const { children, value, index } = props

	return (
		<Box
			role='tabpanel'
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</Box>
	)
}

export default function AddRecipeModal(props: {
	bookID: string
	open: boolean
	handleClose: () => void
	onAdd: (recipeID: string) => void
}): React.ReactElement {
	const { bookID, open, handleClose, onAdd } = props
	const [value, setValue] = React.useState(0)

	const handleChange = (
		event: React.SyntheticEvent,
		newValue: number
	): void => {
		setValue(newValue)
	}

	const handleChangeIndex = (index: number): void => {
		setValue(index)
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
				<Box sx={{ bgcolor: 'background.paper' }}>
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor='secondary'
						textColor='inherit'
						variant='fullWidth'
						aria-label='full width tabs example'
					>
						<Tab label='Import Recipe' id='full-width-tab-1' />
						<Tab label='Create New' id='full-width-tab-2' />
					</Tabs>
					<SwipeableViews
						axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
						index={value}
						onChangeIndex={handleChangeIndex}
					>
						<TabPanel value={value} index={0}>
							<ImportRecipe bookID={bookID} onAdd={onAdd} />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<CreateRecipe bookID={bookID} onAdd={onAdd} />
						</TabPanel>
					</SwipeableViews>
				</Box>
			</Container>
		</Dialog>
	)
}
