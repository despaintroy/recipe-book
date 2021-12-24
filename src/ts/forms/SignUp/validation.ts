import { EMAIL_REGEX } from 'ts/utils/constants'
import {
	FieldValidatorResponse,
	FormState,
	newFormState,
} from 'ts/utils/formState'

const fieldsArray = ['name', 'email', 'password1', 'password2'] as const
type Fields = typeof fieldsArray[number]

export const nameValidator = (
	state: FormState<Fields>
): FieldValidatorResponse => {
	const isValid = state.values.name.length > 0
	return {
		isValid: isValid,
		message: isValid ? '' : 'Invalid email address',
	}
}

export const emailValidator = (
	state: FormState<Fields>
): FieldValidatorResponse => {
	const isValid = !!state.values.email.match(EMAIL_REGEX)
	return {
		isValid: isValid,
		message: isValid ? '' : 'Invalid email address',
	}
}

export const password1Validator = (
	state: FormState<Fields>
): FieldValidatorResponse => {
	const isValid = state.values.password1.length > 4
	return {
		isValid: isValid,
		message: isValid ? '' : 'Must be at least 5 characters long',
	}
}

export const password2Validator = (
	state: FormState<Fields>
): FieldValidatorResponse => {
	const isValid = state.values.password1 === state.values.password2
	return {
		isValid: isValid,
		message: isValid ? '' : 'Passwords do not match',
	}
}

export const getInitialFormState = (): FormState<Fields> => {
	return {
		...newFormState(fieldsArray),
		validators: {
			name: [nameValidator],
			email: [emailValidator],
			password1: [password1Validator],
			password2: [password2Validator],
		},
	}
}
