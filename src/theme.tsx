import React from 'react'

import {
	Link as RouterLink,
	LinkProps as RouterLinkProps,
} from 'react-router-dom'

import { createTheme } from '@mui/material/styles'

import { COLORS } from './ts/utils/constants'

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
			main: COLORS.green,
		},
		secondary: {
			main: COLORS.pink,
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
			color: COLORS.green,
			fontSize: '2.5rem',
			fontWeight: '500',
			marginTop: '1.5rem',
		},
		h2: {
			color: COLORS.green,
			fontSize: '1.5rem',
			fontWeight: '500',
			marginTop: '1.5rem',
		},
	},
})

export default theme
