import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { UserData } from 'ts/utils/models'

import { database } from './firebase'
import { getUser } from './user'

const userDataCollection = collection(database, 'userData')

export const addBookToUser = async (bookID: string): Promise<void> => {
	const user = getUser()
	if (!user) return Promise.reject()

	const docRef = doc(userDataCollection, user.id)
	const docSnap = await getDoc(docRef)
	const userData: UserData = docSnap.exists()
		? (docSnap.data() as UserData)
		: { id: user.id, bookIDs: [] }

	if (userData.bookIDs?.includes(bookID)) return Promise.resolve()

	if (!userData.bookIDs) userData.bookIDs = []

	userData.bookIDs = userData.bookIDs.concat(bookID)
	return setDoc(docRef, userData)
}

export const removeBookFromUser = async (bookID: string): Promise<void> => {
	const user = getUser()
	if (!user) return Promise.reject()

	const docRef = doc(userDataCollection, user.id)
	const docSnap = await getDoc(docRef)
	if (!docSnap.exists()) return Promise.resolve()

	const userData: UserData = docSnap.data() as UserData

	if (!userData.bookIDs?.includes(bookID)) return Promise.resolve()

	userData.bookIDs = userData.bookIDs.filter(id => id !== bookID)
	return setDoc(docRef, userData)
}

export const getUserData = async (): Promise<UserData> => {
	const user = getUser()
	if (!user) return Promise.reject()

	const docRef = doc(userDataCollection, user.id)
	const docSnap = await getDoc(docRef)
	return docSnap.exists() ? (docSnap.data() as UserData) : Promise.reject()
}
