export interface User {
	readonly id: string
	readonly lastSignIn?: Date
	name: string | null | undefined
	email: string | null | undefined
	phone: string | null | undefined
}
