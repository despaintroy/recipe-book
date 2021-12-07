import React from 'react'

import { useParams } from 'react-router-dom'

import { Container, Typography } from '@mui/material'

export default function BookDetail(): React.ReactElement {
	const urlParams = useParams<{ id: string }>()

	return (
		<>
			<Container>
				<Typography variant='h1'>Recipes</Typography>
				<Typography variant='body1'>Book ID: {urlParams.id}</Typography>
			</Container>
		</>
	)
}
