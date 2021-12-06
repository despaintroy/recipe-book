import React from 'react'

import {
	Link as RouterLink,
	LinkProps as RouterLinkProps,
} from 'react-router-dom'

import { colors } from '@mui/material'
import { createTheme } from '@mui/material/styles'

// Allow adapting MUI links to react-router-dom links
const LinkBehavior = React.forwardRef<
	any,
	Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
	const { href, ...other } = props
	return <RouterLink ref={ref} to={href} {...other} />
})

LinkBehavior.displayName = 'LinkBehavior'

const theme = createTheme({
	palette: {
		primary: {
			main: '#d84315',
			light: '#ff7543',
			dark: '#9f0000',
		},
		secondary: {
			main: '#ffb300',
			light: '#ffe54c',
			dark: '#c68400',
		},
	},
	components: {
		MuiLink: {
			defaultProps: {
				// @ts-ignore
				component: LinkBehavior,
			},
		},
		MuiButtonBase: {
			defaultProps: {
				LinkComponent: LinkBehavior,
			},
		},
	},
	typography: {
		h1: {
			color: colors.deepOrange[800],
			fontSize: '2.5rem',
			fontWeight: '500',
			marginTop: '1.5rem',
		},
		h2: {
			color: colors.deepOrange[800],
			fontSize: '1.5rem',
			fontWeight: '500',
			marginTop: '1.5rem',
		},
	},
})

export default theme
