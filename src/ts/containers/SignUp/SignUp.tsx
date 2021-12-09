import React from 'react'

import SignUpForm from 'ts/forms/SignUp'

import PersonIcon from '@mui/icons-material/Person'
import { Avatar, Box, Container, Paper, Typography } from '@mui/material'

export default function SignUp(): React.ReactElement {
	return (
		<Container
			maxWidth={false}
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
					mt: {
						xs: 2,
						sm: 5,
						md: 10,
					},
					mb: 2,
					p: 4,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					maxWidth: 'sm',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<PersonIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign Up
				</Typography>
				<SignUpForm />
			</Box>
		</Container>
	)
}
