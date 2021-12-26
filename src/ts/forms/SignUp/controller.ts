import { getMessage } from 'ts/services/errors'
import { signUp } from 'ts/services/user'
import * as yup from 'yup'

export interface FormValues {
	name: string
	email: string
	password1: string
	password2: string
}

export const initialValues: FormValues = {
	name: '',
	email: '',
	password1: '',
	password2: '',
}

export const validationSchema = yup.object({
	name: yup.string().required('Name is required'),
	email: yup
		.string()
		.email('Enter a valid email')
		.required('Email is required'),
	password1: yup
		.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters long'),
	password2: yup
		.string()
		.required('Password is required')
		.equals([yup.ref('password1')], 'Passwords do not match'),
})

export function handleSubmit(values: FormValues): Promise<void> {
	return signUp(values.email, values.password1, values.name).catch(e =>
		Promise.reject(new Error(getMessage(e)))
	)
}
