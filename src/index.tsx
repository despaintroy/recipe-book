import 'sass/index.scss'
import 'sass/app.scss'

import React from 'react'
import ReactDOM from 'react-dom'

import MainAuthorized from 'MainAuthorized'
import MainUnauthorized from 'MainUnauthorized'
import theme from 'theme'
import { auth } from 'ts/services/auth'
import { formatUser } from 'ts/services/user'
import { User } from 'ts/utils/models'

import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

function App(): React.ReactElement {
	const [user, setUser] = React.useState<User | null>(null)

	React.useEffect(() => {
		auth.onAuthStateChanged(user => {
			setUser(user ? formatUser(user) : null)
		})
	}, [])

	return user ? <MainAuthorized user={user} /> : <MainUnauthorized />
}

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<App />
	</ThemeProvider>,
	document.getElementById('root')
)
