import React, { useContext, useState } from 'react'

import { UserContext } from 'MainAuthorized'
import { useHistory, useLocation } from 'react-router'
import { Link, matchPath } from 'react-router-dom'
import { signOut } from 'ts/services/auth'
import Paths from 'ts/utils/paths'

import {
	AppBar,
	Button,
	Icon,
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@mui/material'

export default function HeaderBar(): React.ReactElement {
	const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
	const location = useLocation()
	const history = useHistory()
	const user = useContext(UserContext).user

	const routerMatch = matchPath(location.pathname, {
		path: Paths.home,
		exact: true,
		strict: false,
	})

	const showMenu = (event: React.MouseEvent<HTMLButtonElement>): void =>
		setMenuAnchor(event.currentTarget)

	const closeMenu = (): void => setMenuAnchor(null)

	return (
		<>
			<AppBar
				position='relative'
				elevation={0}
				sx={{ borderBottom: 1, borderColor: 'divider' }}
			>
				<Toolbar>
					<IconButton
						size='large'
						color='inherit'
						onClick={(): void => history.goBack()}
						sx={{ display: { xs: 'flex', sm: 'none' } }}
					>
						<Icon sx={{ display: 'block', alignSelf: 'center' }}>
							{!routerMatch && 'arrow_back'}
						</Icon>
					</IconButton>

					<Button
						component={Link}
						to={Paths.home}
						sx={{
							fontSize: '1.2rem',
							fontWeight: 'bold',
							marginRight: 'auto',
							marginLeft: { xs: 'auto', sm: '0' },
						}}
					>
						Recipes
					</Button>

					<div>
						<Button onClick={showMenu} color='inherit'>
							<Typography
								sx={{ marginRight: 1, display: { xs: 'none', sm: 'inline' } }}
							>
								{user.name}
							</Typography>
							<Icon>account_circle</Icon>
						</Button>
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
							<MenuItem component={Link} to={Paths.account} onClick={closeMenu}>
								<ListItemIcon>
									<Icon>account_circle</Icon>
								</ListItemIcon>
								Account
							</MenuItem>
							<MenuItem onClick={(): void => window.location.reload()}>
								<ListItemIcon>
									<Icon>refresh</Icon>
								</ListItemIcon>
								Refresh
							</MenuItem>
							<MenuItem onClick={signOut}>
								<ListItemIcon>
									<Icon>logout</Icon>
								</ListItemIcon>
								Sign Out
							</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</>
	)
}
