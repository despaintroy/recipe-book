import 'sass/index.scss'
import 'sass/app.scss'

import React from 'react'
import ReactDOM from 'react-dom'

import MainAuthorized from 'MainAuthorized'
import MainUnauthorized from 'MainUnauthorized'
import theme from 'theme'
import * as managedLocalStorage from 'ts/services/managedLocalStorage'

import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		{managedLocalStorage.get('authToken') ? (
			<MainAuthorized />
		) : (
			<MainUnauthorized />
		)}
	</ThemeProvider>,
	document.getElementById('root')
)
