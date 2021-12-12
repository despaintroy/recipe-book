import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { getAllBooks } from 'ts/services/book'
import { Book } from 'ts/utils/models'
import Paths from 'ts/utils/paths'

import {
	Avatar,
	Button,
	CircularProgress,
	Container,
	Divider,
	Icon,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Typography,
} from '@mui/material'
import { Box } from '@mui/system'

import NewBookModal from './NewBookModal'

export default function BookList(): React.ReactElement {
	const [books, setBooks] = useState<Book[]>()
	const [showModal, setShowModal] = useState(false)

	React.useEffect(() => getBooks(), [])

	function getBooks(): void {
		getAllBooks().then(setBooks)
	}

	return (
		<Container maxWidth='sm'>
			<Typography variant='h1' sx={{ mb: 3 }}>
				Recipe Books
			</Typography>

			{!books ? (
				<Box sx={{ textAlign: 'center' }}>
					<CircularProgress />
				</Box>
			) : (
				<Box>
					<Divider />
					{books.map(book => (
						<Box key={book.id}>
							<ListItem
								secondaryAction={
									<IconButton>
										<Icon>more_vert</Icon>
									</IconButton>
								}
								disablePadding
							>
								<ListItemButton
									component={Link}
									to={Paths.getBookDetailLink(book.id)}
									sx={{ m: 0, py: 2 }}
								>
									<ListItemAvatar>
										<Avatar>
											<Icon>book</Icon>
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={book.title}
										secondary={`${book.recipes?.length ?? 0} recipes`}
									/>
								</ListItemButton>
							</ListItem>
							<Divider />
						</Box>
					))}
				</Box>
			)}

			<Button
				variant='outlined'
				sx={{ mt: 2 }}
				startIcon={<Icon>add</Icon>}
				fullWidth
				onClick={(): void => setShowModal(true)}
			>
				Create New Book
			</Button>

			<NewBookModal
				open={showModal}
				handleClose={(): void => setShowModal(false)}
				submitCallback={(): void => {
					setBooks(undefined)
					getBooks()
				}}
			/>
		</Container>
	)
}
