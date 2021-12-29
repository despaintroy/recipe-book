type keys = 'authToken'

export function set(key: keys, value: string): void {
	localStorage.setItem(key, value)
}

export function get(key: keys): string | null {
	return localStorage.getItem(key)
}

export function remove(key: keys): void {
	localStorage.removeItem(key)
}
