import React, { useEffect, useLayoutEffect } from 'react'

import {
	Icon,
	IconButton,
	Input,
	InputAdornment,
	Typography,
} from '@mui/material'
import { Box } from '@mui/system'

interface KeyedIngredient {
	key: string
	value: string
}

function makeKeys(ingredients: string[]): KeyedIngredient[] {
	return ingredients.map((ingredient, i) => ({
		key: `${i}-${window.performance.now()}`,
		value: ingredient,
	}))
}

export default function IngredientsFields(props: {
	ingredients: string[]
	onChange: (ingredients: string[]) => void
}): React.ReactElement {
	const [ingredients, setIngredients] = React.useState(
		makeKeys(props.ingredients.concat(['']))
	)
	const [focusedField, setFocusedField] = React.useState<number | null>(null)

	useEffect(() => {
		props.onChange(ingredients.map(ing => ing.value).filter(ing => ing !== ''))

		const lastIndex = ingredients.length - 1

		// Add a new field if the last one is not empty
		if (ingredients[lastIndex].value !== '') {
			handleAddIngredient()
			return
		}

		// If the last two fields are empty, remove the last one
		if (ingredients[lastIndex - 1].value === '') {
			handleRemoveIngredient(lastIndex)
		}
	}, [ingredients])

	useLayoutEffect(() => {
		focusedField && focusInput(focusedField)
	}, [focusedField, ingredients])

	// Insert a new field at given index
	const handleAddIngredient = (
		index: number = ingredients.length - 1
	): void => {
		setIngredients(
			ingredients
				.slice(0, index + 1)
				.concat(makeKeys(['']), ingredients.slice(index + 1))
		)
	}

	const handleRemoveIngredient = (index: number): void => {
		setIngredients(ingredients.filter((_, i) => i !== index))
	}

	const handleChangeIngredient = (index: number, value: string): void => {
		setIngredients(
			ingredients.map((ingredient, i) =>
				i === index ? { ...ingredient, value: value } : ingredient
			)
		)
	}

	const focusInput = (index: number): void => {
		const input: HTMLTextAreaElement | null = document.querySelector(
			`textarea[name="recipeIngredients.${index}"]`
		)
		if (input) input.focus()
	}

	return (
		<>
			<Typography variant='h2' sx={{ mt: 4 }}>
				Ingredients
			</Typography>

			<Box sx={{ mt: 2 }}>
				{ingredients.length === 0 && <Typography>No ingredients</Typography>}
				<ul style={{ margin: 0 }}>
					{ingredients.map((ingredient, index) => (
						<li key={ingredient.key}>
							<Input
								fullWidth
								multiline
								type='text'
								defaultValue={ingredient.value}
								placeholder='New ingredient'
								name={`recipeIngredients.${index}`}
								disableUnderline={focusedField !== index}
								onChange={(e): void => {
									handleChangeIngredient(index, e.target.value)
								}}
								onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => {
									if (e.key === 'Enter') {
										e.preventDefault()
										if (ingredients[index + 1]?.value === '')
											focusInput(index + 1)
										else if (index != ingredients.length - 1) {
											handleAddIngredient(index)
											setFocusedField(index + 1)
										}
									}
									if (e.key === 'ArrowDown') {
										e.preventDefault()
										focusInput(index + 1)
									}
									if (e.key === 'ArrowUp') {
										e.preventDefault()
										focusInput(index - 1)
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
									focusedField === index &&
									index !== ingredients.length - 1 && (
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
		</>
	)
}
