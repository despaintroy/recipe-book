import React, { useState } from 'react'

import { signOut } from 'ts/services/auth'

import {
	AppBar,
	Button,
	Icon,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@mui/material'

export default function HeaderBar(props: {
	noborder?: boolean
}): React.ReactElement {
	const { noborder } = props
	const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)

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
					<IconButton size='large' color='inherit'>
						<Icon>arrow_back</Icon>
					</IconButton>

					<Button sx={{ margin: 'auto' }}>
						<Typography variant='h6' component='div'>
							DeSpain Recipe Book
						</Typography>
						<Icon color='inherit' sx={{ marginLeft: 1 }}>
							arrow_drop_down
						</Icon>
					</Button>

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
							<MenuItem onClick={closeMenu}>Shared</MenuItem>
							<MenuItem onClick={signOut}>Sign Out</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</>
	)
}
