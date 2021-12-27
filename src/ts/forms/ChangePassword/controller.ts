import { useContext } from 'react'

import { UserContext } from 'MainAuthorized'
import { getMessage } from 'ts/services/errors'
import { updatePassword } from 'ts/services/user'
import * as yup from 'yup'

export interface FormValues {
	password1: string
	password2: string
}

export const initialValues: FormValues = {
	password1: '',
	password2: '',
}

export const validationSchema = yup.object({
	password1: yup
		.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters long'),
	password2: yup
		.string()
		.required('Password is required')
		.equals([yup.ref('password1')], 'Passwords do not match'),
})

export function submit(values: FormValues): Promise<void> {
	const { updateUser } = useContext(UserContext)

	return updatePassword(values.password1)
		.then(() => updateUser())
		.catch(e => Promise.reject(new Error(getMessage(e))))
}
