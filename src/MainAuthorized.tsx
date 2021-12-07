import React, { Context, useState } from 'react'

import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom'
import BookDetail from 'ts/containers/BookDetail'
import Home from 'ts/containers/Home'
import { getUser } from 'ts/services/user'
import { User } from 'ts/utils/models'
import Paths from 'ts/utils/paths'

import { Box } from '@mui/system'

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
			<Box sx={{ height: '100vh' }}>
				<Router basename='/'>
					<Switch>
						<Route exact path={Paths.home} component={Home} />
						<Route exact path={Paths.bookDetail} component={BookDetail} />

						{/* Default redirect */}
						<Route path='/'>
							<Redirect to={Paths.home} />
						</Route>
					</Switch>
				</Router>
			</Box>
		</UserContext.Provider>
	)
}

export default MainAuthorized
