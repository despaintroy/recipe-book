import React, { useEffect } from 'react'

import {
	Button,
	Icon,
	IconButton,
	Input,
	InputAdornment,
	Typography,
} from '@mui/material'
import { Box } from '@mui/system'

export default function IngredientsFields(props: {
	ingredients: string[]
	onChange: (ingredients: string[]) => void
}): React.ReactElement {
	const [ingredients, setIngredients] = React.useState(props.ingredients)
	const [focusedField, setFocusedField] = React.useState<number | null>(null)

	useEffect(
		() => props.onChange(ingredients.filter(i => i !== '')),
		[ingredients]
	)

	const handleAddIngredient = (): void => {
		setIngredients([...ingredients, ''])
	}

	const handleRemoveIngredient = (index: number): void => {
		setIngredients(ingredients.filter((_, i) => i !== index))
	}

	const handleChangeIngredient = (index: number, value: string): void => {
		setIngredients(
			ingredients.map((ingredient, i) => (i === index ? value : ingredient))
		)
	}

	const focusInput = (index: number): void => {
		const input: HTMLTextAreaElement | null = document.querySelector(
			`textarea[name="recipeIngredients.${index}"]`
		)
		if (input) input.focus()
	}

	const renderList = (): React.ReactElement => {
		return (
			<Box sx={{ mt: 2 }}>
				{ingredients.length === 0 && <Typography>No ingredients</Typography>}
				<ul style={{ margin: 0 }}>
					{ingredients.map((ingredient, index) => (
						<li key={index}>
							<Input
								fullWidth
								multiline
								type='text'
								defaultValue={ingredient}
								placeholder='New ingredient'
								name={`recipeIngredients.${index}`}
								disableUnderline={focusedField !== index}
								onChange={(e): void => {
									handleChangeIngredient(index, e.target.value)
								}}
								onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => {
									if (e.key === 'Enter') {
										e.preventDefault()
										if (index === ingredients.length - 1) handleAddIngredient()
										else focusInput(index + 1)
									}
								}}
								onFocus={(): void => setFocusedField(index)}
								onBlur={(): void => {
									setTimeout(
										() => setFocusedField(f => (f === index ? null : f)),
										300
									)
								}}
								endAdornment={
									focusedField === index && (
										<InputAdornment position='end'>
											<IconButton
												edge='end'
												aria-label='delete'
												onClick={(): void => handleRemoveIngredient(index)}
												onFocus={(): void => setFocusedField(index)}
											>
												<Icon>delete</Icon>
											</IconButton>
										</InputAdornment>
									)
								}
							/>
						</li>
					))}
				</ul>
			</Box>
		)
	}

	return (
		<>
			<Typography variant='h2' sx={{ mt: 4 }}>
				Ingredients
			</Typography>
			{renderList()}
			<Button
				onClick={handleAddIngredient}
				startIcon={<Icon>add</Icon>}
				disabled={ingredients[ingredients.length - 1] === ''}
			>
				Add Ingredient
			</Button>
		</>
	)
}
