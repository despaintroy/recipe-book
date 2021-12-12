import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { Book } from 'ts/utils/models'
import Paths from 'ts/utils/paths'

import {
	Avatar,
	Divider,
	Icon,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Menu,
	MenuItem,
} from '@mui/material'
import { Box } from '@mui/system'

import DeleteBookDialog from './DeleteBookDialog'

export default function BookItem(props: {
	book: Book
	deleteCallback: () => void
}): React.ReactElement {
	const { book, deleteCallback } = props
	const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)

	const showMenu = (event: React.MouseEvent<HTMLButtonElement>): void =>
		setMenuAnchor(event.currentTarget)

	const closeMenu = (): void => setMenuAnchor(null)

	return (
		<Box key={book.id}>
			<ListItem
				secondaryAction={
					<IconButton onClick={showMenu}>
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

			<Menu
				anchorEl={menuAnchor}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={!!menuAnchor}
				onClose={closeMenu}
				keepMounted
			>
				<MenuItem
					onClick={(): void => {
						setShowDeleteDialog(true)
						closeMenu()
					}}
				>
					Delete
				</MenuItem>
			</Menu>

			<DeleteBookDialog
				book={book}
				open={showDeleteDialog}
				handleClose={(): void => setShowDeleteDialog(false)}
				deleteCallback={deleteCallback}
			/>
		</Box>
	)
}
