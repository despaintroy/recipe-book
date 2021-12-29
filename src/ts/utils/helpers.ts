import { v4 as uuidv4 } from 'uuid'

export interface KeyedValue<T> {
	key: string
	value: T
}

export function toKeyedValues<T>(values: T[]): KeyedValue<T>[] {
	return values.map(value => createKeyedValue(value))
}

export function getValues<T>(values: KeyedValue<T>[]): T[] {
	return values.map(kv => kv.value)
}

export function createKeyedValue<T>(value: T): KeyedValue<T> {
	return {
		key: uuidv4(),
		value,
	}
}

export function lastIndex<T>(values: T[]): number {
	return values.length - 1
}
