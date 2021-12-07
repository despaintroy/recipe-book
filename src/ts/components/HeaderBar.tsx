import React, { useState } from 'react'

import { signOut } from 'ts/services/auth'

import {
	AppBar,
	Icon,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@mui/material'

import Navigation from './Navigation'

export default function HeaderBar(props: {
	noborder?: boolean
}): React.ReactElement {
	const { noborder } = props
	const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
	const [showNav, setShowNav] = useState(false)

	function toggleNav(): void {
		setShowNav(p => !p)
	}

	const showMenu = (event: React.MouseEvent<HTMLButtonElement>): void =>
		setMenuAnchor(event.currentTarget)

	const closeMenu = (): void => setMenuAnchor(null)

	return (
		<>
			<AppBar
				position='relative'
				elevation={0}
				sx={{ borderBottom: noborder ? 0 : 1, borderColor: 'divider' }}
			>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						sx={{ mr: 2 }}
						onClick={toggleNav}
					>
						<Icon>menu</Icon>
					</IconButton>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						Recipe Book
					</Typography>

					<div>
						<IconButton size='large' onClick={showMenu} color='inherit'>
							<Icon>account_circle</Icon>
						</IconButton>
						<Menu
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
							<MenuItem onClick={closeMenu}>Profile</MenuItem>
							<MenuItem onClick={signOut}>Sign Out</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
			<Navigation open={showNav} toggleOpen={toggleNav} />
		</>
	)
}
