import React from 'react'

import { Link, useLocation } from 'react-router-dom'
import Paths from 'ts/utils/paths'

import {
	Drawer,
	Icon,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material'
import { Box } from '@mui/system'

export default function Navigation(props: {
	open: boolean
	toggleOpen: () => void
}): React.ReactElement {
	const { open, toggleOpen } = props

	const location = useLocation()

	const navItems = [
		{ name: 'Home', path: Paths.home, icon: 'home' },
		{ name: 'Book 1', path: Paths.getBookDetailLink('1'), icon: 'menu_book' },
	]

	return (
		<Drawer anchor='left' open={open} onClose={toggleOpen}>
			<Box
				sx={{
					width: '15rem',
				}}
			>
				<List>
					{navItems.map((item, index) => (
						<ListItemButton
							component={Link}
							to={item.path}
							selected={item.path === location.pathname}
							key={index}
							onClick={(): void => {
								setTimeout(toggleOpen, 200)
							}}
						>
							<ListItemIcon>
								<Icon>{item.icon}</Icon>
							</ListItemIcon>
							<ListItemText primary={item.name} />
						</ListItemButton>
					))}
				</List>
			</Box>
		</Drawer>
	)
}
