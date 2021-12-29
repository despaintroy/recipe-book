export const AuthPaths = {
	home: '/home',
	getRecipeDetailLink: (id: string): string => `/recipe/${id}`,
	recipeDetail: '/recipe/:id',
	getBookDetailLink: (id: string): string => `/book/${id}`,
	bookDetail: '/book/:id',
	account: '/account',
}

export const UnauthPaths = {
	signIn: '/signin',
	signUp: '/signup',
}

const Paths = {
	...AuthPaths,
	...UnauthPaths,
}

export default Paths
