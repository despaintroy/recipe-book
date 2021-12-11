import React from 'react'

import { Link } from 'react-router-dom'
import Paths from 'ts/utils/paths'

import { Button, Container, Typography } from '@mui/material'

export default function Home(): React.ReactElement {
	return (
		<>
			<Container>
				<Typography variant='h1'>Home</Typography>
				<Button
					component={Link}
					fullWidth
					variant='contained'
					to={Paths.getBookDetailLink('1')}
					sx={{ mt: 2 }}
				>
					Import Recipe
				</Button>
			</Container>
		</>
	)
}
