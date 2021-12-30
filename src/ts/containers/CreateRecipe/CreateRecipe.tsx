import React from 'react'

import { CreateRecipeForm } from 'ts/forms'

import { Box } from '@mui/system'

export default function CreateRecipe(props: {
	onAdd: (recipeID: string) => void
	bookID: string
}): React.ReactElement {
	const { onAdd, bookID } = props

	return (
		<Box>
			<CreateRecipeForm bookID={bookID} onSuccess={onAdd} />
		</Box>
	)
}
