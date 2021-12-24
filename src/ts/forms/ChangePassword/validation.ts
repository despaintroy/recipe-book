import { newFormState } from 'ts/utils/helpers'
import { FormState } from 'ts/utils/models'

const fieldsArray = ['password1', 'password2'] as const
type Fields = typeof fieldsArray[number]

export const password1Validator = (
	state: FormState<Fields>
): FormState<Fields> => {
	state.isValid.password1 = state.values.password1.length > 0
	state.messages.password1 = state.isValid.password1 ? '' : 'Required'
	return { ...state }
}

export const password2Validator = (
	state: FormState<Fields>
): FormState<Fields> => {
	state.isValid.password2 = state.values.password1 === state.values.password2
	state.messages.password2 = state.isValid.password2
		? ''
		: 'Passwords do not match'
	return { ...state }
}

export const getInitialFormState = (): FormState<Fields> => {
	return {
		...newFormState(fieldsArray),
		validators: {
			password1: [password1Validator],
			password2: [password2Validator],
		},
	}
}
