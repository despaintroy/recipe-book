const Paths = {
	home: '/home',
	getRecipeDetailLink: (id: string): string => `/recipe/${id}`,
	recipeDetail: '/recipe/:id',
	getBookDetailLink: (id: string): string => `/book/${id}`,
	bookDetail: '/book/:id',
	account: '/account',
	signIn: '/signin',
	signUp: '/signup',
}

export default Paths
