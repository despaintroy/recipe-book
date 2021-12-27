import { getMessage } from 'ts/services/errors'
import { updateEmail, updateName } from 'ts/services/user'
import { User } from 'ts/utils/models'
import * as yup from 'yup'

export interface FormValues {
	name: string
	email: string
}

export const validationSchema = yup.object({
	name: yup.string().required('Name is required'),
	email: yup.string().required('Email is required').email('Email is invalid'),
})

export function submit(values: FormValues, user: User): Promise<void> {
	return Promise.all([
		user.name !== values.name ? updateName(values.name) : Promise.resolve(),
		user.email !== values.email ? updateEmail(values.email) : Promise.resolve(),
	])
		.then(() => Promise.resolve())
		.catch(e => Promise.reject(new Error(getMessage(e))))
}
