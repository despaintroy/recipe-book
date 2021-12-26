import { signIn } from 'ts/services/auth'
import { getMessage } from 'ts/services/errors'
import * as yup from 'yup'

export const fieldsArray = ['email', 'password'] as const
type Fields = typeof fieldsArray[number]

export interface FormValues {
	email: string
	password: string
}

export const initialValues: FormValues = {
	email: '',
	password: '',
}

export const validationSchema = yup.object({
	email: yup
		.string()
		.email('Enter a valid email')
		.required('Email is required'),
	password: yup.string().required('Password is required'),
})

export function handleSubmit(values: FormValues): Promise<void> {
	return signIn(values.email, values.password).catch(e =>
		Promise.reject(new Error(getMessage(e)))
	)
}

export function getHandleSubmitFunction(
	setErrorText: (text: string) => void
): (values: FormValues) => Promise<void> {
	const submit = function (values: FormValues): Promise<void> {
		return signIn(values.email, values.password).catch(e => {
			setErrorText(getMessage(e))
			return Promise.reject(new Error(getMessage(e)))
		})
	}

	return submit
}
