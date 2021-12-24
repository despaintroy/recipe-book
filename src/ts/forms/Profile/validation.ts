import { EMAIL_REGEX } from 'ts/utils/constants'
import { newFormState } from 'ts/utils/helpers'
import { FormState, User } from 'ts/utils/models'

const fieldsArray = ['name', 'email'] as const
type Fields = typeof fieldsArray[number]

export const emailValidator = (state: FormState<Fields>): FormState<Fields> => {
	state.isValid.email = !!state.values.email.match(EMAIL_REGEX)
	state.messages.email = state.isValid.email ? '' : 'Invalid email address'
	return { ...state }
}

export const nameValidator = (state: FormState<Fields>): FormState<Fields> => {
	state.isValid.name = state.values.name.length > 0
	state.messages.name = state.isValid.name ? '' : 'Required'
	return { ...state }
}

export const getInitialFormState = (user: User): FormState<Fields> => {
	return {
		...newFormState(fieldsArray),
		values: {
			name: user.name ?? '',
			email: user.email ?? '',
		},
		validators: {
			email: [emailValidator],
			name: [nameValidator],
		},
	}
}
