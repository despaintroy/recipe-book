import React, { useEffect, useLayoutEffect } from 'react'

import { FormErrorMessage } from 'ts/components/FormComponents'
import useList from 'ts/hooks/useList'
import {
	createKeyedValue,
	getValues,
	KeyedValue,
	lastIndex,
	toKeyedValues,
} from 'ts/utils/helpers'

import {
	Icon,
	IconButton,
	Input,
	InputAdornment,
	InputProps,
	OutlinedInput,
	OutlinedInputProps,
	Typography,
} from '@mui/material'
import { Box } from '@mui/system'

type variant = 'bullet' | 'outlined'

export interface TextListInputProps {
	initialList: string[]
	uniquePrefix: string
	itemName: string
	variant: variant
	errorText: string | string[]
	onChange: (list: string[]) => void
}

TextListInput.defaultProps = {
	itemName: 'item',
	variant: 'bullet',
	errorText: '',
}

export default function TextListInput(
	props: TextListInputProps
): React.ReactElement {
	const { initialList, uniquePrefix, onChange, itemName, variant } = props
	const [focusedField, setFocusedField] = React.useState<number | null>(null)
	const [items, insertItem, modifyItem, removeItem] = useList(
		toKeyedValues(initialList.concat(['']))
	)

	const error = Array.isArray(props.errorText)
		? props.errorText[0]
		: props.errorText

	useEffect(() => {
		onChange(getValues(items).filter(item => item !== ''))

		const lastIdx = lastIndex(items)

		// Add a new field if the last one is not empty
		if (lastIdx < 0 || items[lastIdx].value !== '') {
			insertItem(items.length, createKeyedValue(''))
			return
		}

		// If the last two fields are empty, remove the last one
		if (lastIdx > 0 && items[lastIdx - 1].value === '') {
			removeItem(lastIdx)
		}
	}, [items])

	useLayoutEffect(() => {
		focusedField && focusInput(focusedField)
	}, [focusedField, items])

	const focusInput = (index: number): void => {
		const input: HTMLTextAreaElement | null = document.querySelector(
			`textarea[name="${uniquePrefix}.${index}"]`
		)
		if (input) input.focus()
	}

	const makeInputProps = (
		item: KeyedValue<string>,
		index: number
	): InputProps & OutlinedInputProps => ({
		fullWidth: true,
		multiline: true,
		type: 'text',
		defaultValue: item.value,
		placeholder: `New ${itemName}`,
		name: `${uniquePrefix}.${index}`,
		onFocus: (): void => setFocusedField(index),
		onBlur: (): void => {
			setTimeout(() => setFocusedField(f => (f === index ? null : f)), 300)
		},
		onChange: (e): void => {
			modifyItem(index, {
				key: item.key,
				value: e.target.value,
			})
		},
		onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>): void => {
			if (e.key === 'Enter') {
				e.preventDefault()
				if (items[index + 1]?.value === '') focusInput(index + 1)
				else if (index != lastIndex(items)) {
					insertItem(index + 1, createKeyedValue(''))
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
		},
		endAdornment: focusedField === index && index !== lastIndex(items) && (
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
		),
	})

	if (variant === 'outlined') {
		return (
			<Box>
				{items.map((item, index) => (
					<Box key={item.key}>
						<Typography
							variant='h3'
							sx={{ mt: 1, textTransform: 'capitalize' }}
						>
							{index === lastIndex(items)
								? `New ${itemName}`
								: `${itemName} ${index + 1}.`}
						</Typography>
						<OutlinedInput {...makeInputProps(item, index)} sx={{ my: 1 }} />
					</Box>
				))}
				<FormErrorMessage message={error} />
			</Box>
		)
	}

	return (
		<Box>
			<ul style={{ margin: 0 }}>
				{items.map((item, idx) => (
					<li key={item.key}>
						<Input
							{...makeInputProps(item, idx)}
							disableUnderline={focusedField !== idx}
						/>
					</li>
				))}
			</ul>
			<FormErrorMessage message={error} />
		</Box>
	)
}
