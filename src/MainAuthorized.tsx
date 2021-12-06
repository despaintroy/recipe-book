import React, { Context, useState } from 'react'

import { getUser } from 'ts/services/user'
import { User } from 'ts/utils/models'

import { Container, Typography } from '@mui/material'

export let UserContext: Context<{ user: User; updateUser: () => void }>

function MainAuthorized(props: { user: User }): React.ReactElement {
	const [user, setUser] = useState(props.user)

	const updateUser = (): void => {
		const newUser = getUser()
		newUser && setUser(newUser)
	}

	UserContext = React.createContext({ user, updateUser })

	return (
		<div className='App'>
			<Container>
				<Typography variant='h1'>Authorized</Typography>
			</Container>
		</div>
	)
}

export default MainAuthorized
