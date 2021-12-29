import {
	getAuth,
	signInWithEmailAndPassword,
	signOut as fireSignOut,
} from 'firebase/auth'
import { firebaseApp } from 'ts/services/firebase'
import * as managedLocalStorage from 'ts/services/managedLocalStorage'

export const auth = getAuth(firebaseApp)

export const signIn = (email: string, password: string): Promise<void> => {
	return signInWithEmailAndPassword(auth, email, password)
		.then(r => {
			r.user.getIdToken().then(token => {
				managedLocalStorage.set('authToken', token)
				location.reload()
			})
		})
		.catch(() => Promise.reject())
}

export const signOut = (): Promise<void> => {
	return fireSignOut(auth).then(() => managedLocalStorage.remove('authToken'))
}
