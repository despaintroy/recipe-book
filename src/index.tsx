import 'sass/index.scss'
import 'sass/app.scss'

import React from 'react'
import ReactDOM from 'react-dom'

import theme from 'theme'

import { ThemeProvider } from '@emotion/react'

import App from './App'

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
