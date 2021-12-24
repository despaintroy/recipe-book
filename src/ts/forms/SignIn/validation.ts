import { EMAIL_REGEX } from 'ts/utils/constants'
import {
	FieldValidatorResponse,
	FormState,
	newFormState,
} from 'ts/utils/formState'

const fieldsArray = ['email', 'password'] as const
type Fields = typeof fieldsArray[number]

export const emailValidator = (
	state: FormState<Fields>
): FieldValidatorResponse => {
	const isValid = !!state.values.email.match(EMAIL_REGEX)
	return {
		isValid: isValid,
		message: isValid ? '' : 'Invalid email address',
	}
}

export const passwordValidator = (
	state: FormState<Fields>
): FieldValidatorResponse => {
	const isValid = state.values.password.length > 0
	return {
		isValid: isValid,
		message: isValid ? '' : 'Required',
	}
}

export const getInitialFormState = (): FormState<Fields> => {
	return {
		...newFormState(fieldsArray),
		validators: {
			email: [emailValidator],
			password: [passwordValidator],
		},
	}
}
