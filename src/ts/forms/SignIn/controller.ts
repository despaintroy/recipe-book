import { signIn } from 'ts/services/auth'
import { getMessage } from 'ts/services/errors'
import * as yup from 'yup'

export interface FormValues {
	email: string
	password: string
}

export const initialValues: FormValues = {
	email: '',
	password: '',
}

export const validationSchema = yup.object({
	email: yup.string().email('Enter a valid email').required('Required'),
	password: yup.string().required('Required'),
})

export function submit(values: FormValues): Promise<void> {
	return signIn(values.email, values.password).catch(e =>
		Promise.reject(new Error(getMessage(e)))
	)
}
