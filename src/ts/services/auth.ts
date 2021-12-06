import {
	getAuth,
	signInWithEmailAndPassword,
	signOut as fireSignOut,
} from 'firebase/auth'
import { firebaseApp } from 'ts/services/firebase'

export const auth = getAuth(firebaseApp)

export const signIn = (email: string, password: string): Promise<void> =>
	signInWithEmailAndPassword(auth, email, password).then(() =>
		Promise.resolve()
	)

export const signOut = (): Promise<void> => fireSignOut(auth)
