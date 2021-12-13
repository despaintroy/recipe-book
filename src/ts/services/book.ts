import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from 'firebase/firestore'
import { Book } from 'ts/utils/models'

import { database } from './firebase'
import { getUser } from './user'
import { addBookToUser, getUserData, removeBookFromUser } from './userData'

const bookCollection = collection(database, 'books')

export const createBook = async (title: string): Promise<void> => {
	const user = getUser()
	if (!user) return Promise.reject()

	const docRef = doc(bookCollection)

	await setDoc(docRef, {
		id: docRef.id,
		title: title,
		created: new Date().getTime(),
	})
	return await addBookToUser(docRef.id)
}

export const updateBook = async (
	bookID: string,
	book: Partial<Book>
): Promise<void> => {
	return updateDoc(doc(bookCollection, bookID), book)
}

export const getAllBooks = async (): Promise<Book[]> => {
	const userData = await getUserData()
	return await getBooksByIDs(userData.bookIDs ?? [])
}

export const getBookByID = async (id: string): Promise<Book> => {
	const book = await getDoc(doc(bookCollection, id))
	if (book.exists()) return book.data() as Book
	return Promise.reject()
}

export const getBooksByIDs = async (bookIDs: string[]): Promise<Book[]> => {
	const books: Book[] = []
	await Promise.all(
		bookIDs.map(bookId =>
			getBookByID(bookId)
				.then(book => books.push(book))
				.catch(() => console.error('missing book id:', bookId))
		)
	)
	return books
}

export const deleteBook = async (id: string): Promise<void> => {
	const user = getUser()
	if (!user) return Promise.reject()

	await removeBookFromUser(id)
	return await deleteDoc(doc(bookCollection, id))
}
