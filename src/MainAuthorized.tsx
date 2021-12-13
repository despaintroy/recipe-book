import React, { Context, useState } from 'react'

import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom'
import HeaderBar from 'ts/components/HeaderBar'
import Account from 'ts/containers/Account'
import BookDetail from 'ts/containers/BookDetail'
import BookIndex from 'ts/containers/BookIndex'
import { getUser } from 'ts/services/user'
import { User } from 'ts/utils/models'
import Paths from 'ts/utils/paths'

import { Stack } from '@mui/material'

export let UserContext: Context<{ user: User; updateUser: () => void }>

function MainAuthorized(props: { user: User }): React.ReactElement {
	const [user, setUser] = useState(props.user)

	const updateUser = (): void => {
		const newUser = getUser()
		newUser && setUser(newUser)
	}

	UserContext = React.createContext({ user, updateUser })

	return (
		<UserContext.Provider value={{ user, updateUser }}>
			<Router basename='/'>
				<Stack height='100%'>
					<HeaderBar />
					<Switch>
						<Route exact path={Paths.home} component={BookIndex} />
						<Route exact path={Paths.bookDetail} component={BookDetail} />
						<Route exact path={Paths.account} component={Account} />

						{/* Default redirect */}
						<Route path='/'>
							<Redirect to={Paths.home} />
						</Route>
					</Switch>
				</Stack>
			</Router>
		</UserContext.Provider>
	)
}

export default MainAuthorized
