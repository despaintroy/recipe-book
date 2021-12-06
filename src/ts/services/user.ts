import {
	createUserWithEmailAndPassword,
	updateEmail as updateFireEmail,
	updatePassword as updateFirePassword,
	updateProfile,
	User as FireUser,
} from 'firebase/auth'
import { auth } from 'ts/services/auth'
import { User } from 'ts/utils/models'

export const formatUser = (user: FireUser | null): User | null => {
	if (user)
		return {
			id: user.uid,
			name: user.displayName,
			email: user.email,
			phone: user.phoneNumber,
			lastSignIn:
				(user.metadata.lastSignInTime &&
					new Date(user.metadata.lastSignInTime)) ||
				undefined,
		}
	else return null
}

// --------------------------------------------------
//   POST
// --------------------------------------------------

export const signUp = (
	email: string,
	password: string,
	name?: string
): Promise<void> =>
	createUserWithEmailAndPassword(auth, email, password).then(credential =>
		updateProfile(credential.user, { displayName: name })
	)

// --------------------------------------------------
//   GET
// --------------------------------------------------

export const getUser = (): User | null => formatUser(auth.currentUser)

// --------------------------------------------------
//   PATCH
// --------------------------------------------------

export const updateName = (name: string): Promise<void> =>
	auth.currentUser
		? updateProfile(auth.currentUser, { displayName: name })
		: Promise.reject()

export const updateEmail = (email: string): Promise<void> =>
	auth.currentUser ? updateFireEmail(auth.currentUser, email) : Promise.reject()

export const updatePassword = (password: string): Promise<void> =>
	auth.currentUser
		? updateFirePassword(auth.currentUser, password)
		: Promise.reject()
