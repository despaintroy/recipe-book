import { EMAIL_REGEX } from 'ts/utils/constants'
import { FormState, newFormState } from 'ts/utils/formState'

const fieldsArray = ['name', 'email', 'password1', 'password2'] as const
type Fields = typeof fieldsArray[number]

export const nameValidator = (state: FormState<Fields>): FormState<Fields> => {
	state.isValid.name = state.values.name.length > 0
	state.messages.name = state.isValid.name ? '' : 'Required'
	return { ...state }
}

export const emailValidator = (state: FormState<Fields>): FormState<Fields> => {
	state.isValid.email = !!state.values.email.match(EMAIL_REGEX)
	state.messages.email = state.isValid.email ? '' : 'Invalid email address'
	return { ...state }
}

export const password1Validator = (
	state: FormState<Fields>
): FormState<Fields> => {
	state.isValid.password1 = state.values.password1.length > 4
	state.messages.password1 = state.isValid.password1
		? ''
		: 'Must be at least 5 characters long'
	return { ...state }
}

export const password2Validator = (
	state: FormState<Fields>
): FormState<Fields> => {
	state.isValid.password2 = state.values.password2 === state.values.password1
	state.messages.password2 = state.isValid.password2
		? ''
		: 'Passwords do not match'
	return { ...state }
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
