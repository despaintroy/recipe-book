import { EMAIL_REGEX } from 'ts/utils/constants'
import { FormState, newFormState } from 'ts/utils/formState'

const fieldsArray = ['email', 'password'] as const
type Fields = typeof fieldsArray[number]

export const emailValidator = (state: FormState<Fields>): FormState<Fields> => {
	state.isValid.email = !!state.values.email.match(EMAIL_REGEX)
	state.messages.email = state.isValid.email ? '' : 'Invalid email address'
	return { ...state }
}

export const passwordValidator = (
	state: FormState<Fields>
): FormState<Fields> => {
	state.isValid.password = state.values.password.length > 0
	state.messages.password = state.isValid.password ? '' : 'Required'
	return { ...state }
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
