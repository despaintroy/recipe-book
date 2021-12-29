import React, { useEffect, useLayoutEffect } from 'react'

import useList from 'ts/hooks/useList'
import { v4 as uuidv4 } from 'uuid'

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

function addKeys(ingredients: string[]): KeyedIngredient[] {
	return ingredients.map(ingredient => createKeyedIngredient(ingredient))
}

function getValues(ingredients: KeyedIngredient[]): string[] {
	return ingredients.map(ing => ing.value).filter(ing => ing !== '')
}

function createKeyedIngredient(value = ''): KeyedIngredient {
	return {
		key: uuidv4(),
		value,
	}
}

export default function IngredientsFields(props: {
	ingredients: string[]
	onChange: (ingredients: string[]) => void
}): React.ReactElement {
	const [focusedField, setFocusedField] = React.useState<number | null>(null)
	const [items, insertItem, modifyItem, removeItem] = useList(
		addKeys(props.ingredients.concat(['']))
	)

	useEffect(() => {
		props.onChange(getValues(items))

		const lastIndex = items.length - 1

		// Add a new field if the last one is not empty
		if (items[lastIndex].value !== '') {
			insertItem(items.length, createKeyedIngredient())
			return
		}

		// If the last two fields are empty, remove the last one
		if (items[lastIndex - 1].value === '') {
			removeItem(lastIndex)
		}
	}, [items])

	useLayoutEffect(() => {
		focusedField && focusInput(focusedField)
	}, [focusedField, items])

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
				{items.length === 0 && <Typography>No ingredients</Typography>}
				<ul style={{ margin: 0 }}>
					{items.map((ingredient, index) => (
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
									modifyItem(index, {
										key: ingredient.key,
										value: e.target.value,
									})
								}}
								onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => {
									if (e.key === 'Enter') {
										e.preventDefault()
										if (items[index + 1]?.value === '') focusInput(index + 1)
										else if (index != items.length - 1) {
											insertItem(index + 1, createKeyedIngredient())
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
									index !== items.length - 1 && (
										<InputAdornment position='end'>
											<IconButton
												edge='end'
												aria-label='delete'
												onClick={(): void => removeItem(index)}
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
