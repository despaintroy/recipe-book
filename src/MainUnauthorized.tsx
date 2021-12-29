import React from 'react'

import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom'
import SignIn from 'ts/containers/SignIn'
import SignUp from 'ts/containers/SignUp'
import UnauthPaths from 'ts/utils/paths'

import { Box } from '@mui/system'

function MainUnauthorized(): React.ReactElement {
	return (
		<Box className='App'>
			<Router basename='/'>
				<Switch>
					<Route exact path={UnauthPaths.signIn} component={SignIn} />
					<Route exact path={UnauthPaths.signUp} component={SignUp} />

					{/* Default redirect */}
					<Route path='/'>
						<Redirect to={UnauthPaths.signIn} />
					</Route>
				</Switch>
			</Router>
		</Box>
	)
}

export default MainUnauthorized
