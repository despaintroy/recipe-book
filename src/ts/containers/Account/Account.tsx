import React from 'react'

import theme from 'theme'
import ChangePasswordForm from 'ts/forms/ChangePassword'
import ProfileForm from 'ts/forms/Profile'

import { Container, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'

export default function Account(): React.ReactElement {
	return (
		<Container>
			<Typography variant='h1'>Account</Typography>
			<Box
				sx={{
					mt: 2,
					display: 'flex',
					flexWrap: 'wrap',
					gap: 2,
					[theme.breakpoints.up('sm')]: {
						flexWrap: 'nowrap',
					},
				}}
			>
				<Paper elevation={2} sx={{ padding: 2, width: '100%' }}>
					<Typography variant='h2'>Profile</Typography>
					<ProfileForm />
				</Paper>
				<Paper elevation={2} sx={{ padding: 2, width: '100%' }}>
					<Typography variant='h2'>Password</Typography>
					<ChangePasswordForm />
				</Paper>
			</Box>
		</Container>
	)
}
