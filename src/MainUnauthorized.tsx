import React from 'react'

import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom'
import SignIn from 'ts/containers/SignIn'
import SignUp from 'ts/containers/SignUp'
import Paths from 'ts/utils/paths'

import { Box } from '@mui/system'

function MainUnauthorized(): React.ReactElement {
	return (
		<Box className='App'>
			<Router basename='/'>
				<Switch>
					<Route exact path={Paths.signIn} component={SignIn} />
					<Route exact path={Paths.signUp} component={SignUp} />

					{/* Default redirect */}
					<Route path='/'>
						<Redirect to={Paths.signIn} />
					</Route>
				</Switch>
			</Router>
		</Box>
	)
}

export default MainUnauthorized
