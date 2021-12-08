import React from 'react'

import { Link } from 'react-router-dom'
import Paths from 'ts/utils/paths'

import { Button, Container, Typography } from '@mui/material'

export default function Home(): React.ReactElement {
	return (
		<>
			<Container>
				<Typography variant='h1'>Home</Typography>
				<Button component={Link} to={Paths.getBookDetailLink('1')}>
					Go to Book Detail
				</Button>
			</Container>
		</>
	)
}
