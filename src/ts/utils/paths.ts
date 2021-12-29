export const AuthPaths = {
	home: '/home',
	getRecipeDetailLink: (bookID: string, recipeID: string): string =>
		`/recipe/${bookID}/${recipeID}`,
	recipeDetail: '/recipe/:bookID/:recipeID',
	getBookDetailLink: (bookID: string): string => `/book/${bookID}`,
	bookDetail: '/book/:bookID',
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
