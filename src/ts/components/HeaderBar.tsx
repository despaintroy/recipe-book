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
				sx={{ borderBottom: noborder ? 0 : 1, borderColor: 'divider' }}
			>
				<Toolbar>
					<IconButton
						size='large'
						color='inherit'
						onClick={(): void => history.goBack()}
						sx={{ display: { xs: 'inline-block', sm: 'none' } }}
					>
						<Icon>{!routerMatch && 'arrow_back'}</Icon>
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
								Account
							</MenuItem>
							<MenuItem onClick={signOut}>Sign Out</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</>
	)
}
