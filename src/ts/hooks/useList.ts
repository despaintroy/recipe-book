import { useState } from 'react'

export default function useList<T>(
	initialItems: T[]
): [
	items: T[],
	insertItem: (index: number, item: T) => void,
	modifyItem: (index: number, item: T) => void,
	removeItem: (index: number) => void
] {
	const [items, setItems] = useState<T[]>(initialItems)

	const insertItem = (index: number, item: T): void => {
		const newItems = [...items]
		newItems.splice(index, 0, item)
		setItems(newItems)
	}

	const removeItem = (index: number): void => {
		setItems(items.filter((_, i) => i !== index))
	}

	const modifyItem = (index: number, item: T): void => {
		setItems([...items.slice(0, index), item, ...items.slice(index + 1)])
	}

	return [items, insertItem, modifyItem, removeItem]
}
