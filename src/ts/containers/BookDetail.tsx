import React from 'react'

import HeaderBar from 'ts/components/HeaderBar'

import { Container, Typography } from '@mui/material'

export default function BookDetail(): React.ReactElement {
	return (
		<>
			<HeaderBar />
			<Container>
				<Typography variant='h1'>Book 1</Typography>
			</Container>
		</>
	)
}
