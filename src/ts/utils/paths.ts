const Paths = {
	home: '/home',
	getBookDetailLink: (id: string): string => `/book/${id}`,
	bookDetail: '/book/:id',
	account: '/account',
	signIn: '/signin',
	signUp: '/signup',
}

export default Paths
