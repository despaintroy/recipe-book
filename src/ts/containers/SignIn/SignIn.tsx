import React from 'react'

import SignInForm from 'ts/forms/SignIn'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Avatar, Box, Container, Paper, Typography } from '@mui/material'

export default function SignIn(): React.ReactElement {
	return (
		<Container
			sx={{
				position: 'fixed',
				top: 0,
				bottom: 0,
				backgroundColor: 'primary.main',
				overflow: 'scroll',
			}}
		>
			<Box
				component={Paper}
				elevation={10}
				sx={{
					mx: 'auto',
					mt: 'calc(max(30vh - 100px, 16px))',
					mb: 2,
					p: 4,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					maxWidth: 'sm',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign In
				</Typography>
				<SignInForm />
			</Box>
		</Container>
	)
}
