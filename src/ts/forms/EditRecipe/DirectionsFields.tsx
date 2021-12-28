import React, { useEffect } from 'react'

import {
	Button,
	Icon,
	IconButton,
	InputAdornment,
	OutlinedInput,
	Typography,
} from '@mui/material'
import { Box } from '@mui/system'

export default function DirectionsFields(props: {
	directions: string[]
	onChange: (directions: string[]) => void
}): React.ReactElement {
	const [directions, setDirections] = React.useState(props.directions)
	const [focusedField, setFocusedField] = React.useState<number | null>(null)

	useEffect(
		() => props.onChange(directions.filter(i => i !== '')),
		[directions]
	)

	const handleAddDirection = (): void => {
		setDirections([...directions, ''])
	}

	const handleRemoveDirection = (index: number): void => {
		setDirections(directions.filter((_, i) => i !== index))
	}

	const handleChangeDirection = (index: number, value: string): void => {
		setDirections(
			directions.map((direction, i) => (i === index ? value : direction))
		)
	}

	const focusInput = (index: number): void => {
		const input: HTMLTextAreaElement | null = document.querySelector(
			`textarea[name="recipeDirections.${index}"]`
		)
		if (input) input.focus()
	}

	const renderList = (): React.ReactElement => {
		return (
			<Box sx={{ mt: 2 }}>
				{directions.length === 0 && <Typography>No Directions</Typography>}
				{directions.map((direction, index) => (
					<>
						<Typography variant='h3' sx={{ mt: 1 }}>
							Step {index + 1}.
						</Typography>
						<OutlinedInput
							key={index}
							fullWidth
							multiline
							type='text'
							defaultValue={direction}
							placeholder='New step'
							name={`recipeDirections.${index}`}
							sx={{ my: 1 }}
							onChange={(e): void => {
								handleChangeDirection(index, e.target.value)
							}}
							onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => {
								if (e.key === 'Enter') {
									e.preventDefault()
									if (index === directions.length - 1) handleAddDirection()
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
											onClick={(): void => handleRemoveDirection(index)}
											onFocus={(): void => setFocusedField(index)}
										>
											<Icon>delete</Icon>
										</IconButton>
									</InputAdornment>
								)
							}
						/>
					</>
				))}
			</Box>
		)
	}

	return (
		<>
			<Typography variant='h2' sx={{ mt: 4 }}>
				Directions
			</Typography>
			{renderList()}
			<Button
				onClick={handleAddDirection}
				startIcon={<Icon>add</Icon>}
				disabled={directions[directions.length - 1] === ''}
			>
				Add Step
			</Button>
		</>
	)
}
