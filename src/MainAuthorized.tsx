import React, { Context, useEffect, useState } from 'react'

import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
	useLocation,
} from 'react-router-dom'
import HeaderBar from 'ts/components/HeaderBar'
import Account from 'ts/containers/Account'
import BookDetail from 'ts/containers/BookDetail'
import BookIndex from 'ts/containers/BookIndex'
import RecipeDetail from 'ts/containers/RecipeDetail/RecipeDetail'
import { auth } from 'ts/services/auth'
import { getBookByID } from 'ts/services/book'
import * as managedLocalStorage from 'ts/services/managedLocalStorage'
import { formatUser, getUser } from 'ts/services/user'
import { Book, User } from 'ts/utils/models'
import AuthPaths from 'ts/utils/paths'

import { Stack } from '@mui/material'

export let UserContext: Context<{ user: User; updateUser: () => void }>
export let BookContext: Context<{
	book: Book | null
	setBook: (book: Book | null) => void
	refreshBook: () => Promise<void>
}>

function ScrollToTop(): React.ReactElement {
	const { pathname } = useLocation()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	return <></>
}

function MainAuthorized(): React.ReactElement {
	const [user, setUser] = useState<User | null | undefined>(undefined)
	const [book, setBook] = useState<Book | null>(null)

	React.useEffect(() => {
		auth.onAuthStateChanged(user => {
			setUser(user ? formatUser(user) : null)
		})
	}, [])

	if (!user) {
		if (user === null) {
			managedLocalStorage.remove('authToken')
			location.reload()
		}
		return <></>
	}

	const updateUser = (): void => {
		const newUser = getUser()
		newUser && setUser(newUser)
	}

	const refreshBook = (): Promise<void> => {
		if (!book) {
			setBook(null)
			return Promise.reject()
		}
		return getBookByID(book.id)
			.then((book): void => setBook(book))
			.catch((): void => setBook(null))
	}

	UserContext = React.createContext({ user, updateUser })
	BookContext = React.createContext({
		book,
		setBook: (book: Book | null): void => setBook(book),
		refreshBook,
	})

	return (
		<UserContext.Provider value={{ user, updateUser }}>
			<BookContext.Provider value={{ book, setBook, refreshBook }}>
				<Router basename='/'>
					<ScrollToTop />
					<Stack height='100%' className='app'>
						<HeaderBar />
						<Switch>
							<Route exact path={AuthPaths.home} component={BookIndex} />
							<Route exact path={AuthPaths.bookDetail} component={BookDetail} />
							<Route
								exact
								path={AuthPaths.recipeDetail}
								component={RecipeDetail}
							/>
							<Route exact path={AuthPaths.account} component={Account} />

							{/* Default redirect */}
							<Route path='/'>
								<Redirect to={AuthPaths.home} />
							</Route>
						</Switch>
					</Stack>
				</Router>
			</BookContext.Provider>
		</UserContext.Provider>
	)
}

export default MainAuthorized
