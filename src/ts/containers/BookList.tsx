import React from 'react'

import { Link } from 'react-router-dom'
import Paths from 'ts/utils/paths'

import {
	Avatar,
	Button,
	Card,
	CardActionArea,
	CardHeader,
	Container,
	Icon,
	IconButton,
	Typography,
} from '@mui/material'
import { Box } from '@mui/system'

export default function BookList(): React.ReactElement {
	return (
		<Container maxWidth='sm'>
			<Typography variant='h1'>Recipe Books</Typography>

			<Box mt={3}>
				<Card sx={{ display: 'flex' }}>
					<CardActionArea component={Link} to={Paths.getBookDetailLink('1')}>
						<CardHeader
							avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>D</Avatar>}
							title='DeSpain Family Recipes'
							subheader='36 recipes'
						/>
					</CardActionArea>
					<Box sx={{ my: 'auto', mx: 1 }}>
						<IconButton>
							<Icon>more_vert_icon</Icon>
						</IconButton>
					</Box>
				</Card>
			</Box>

			<Button
				variant='outlined'
				sx={{ mt: 2 }}
				startIcon={<Icon>add</Icon>}
				fullWidth
			>
				Create New Book
			</Button>
		</Container>
	)
}
