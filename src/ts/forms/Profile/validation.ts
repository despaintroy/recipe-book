import { EMAIL_REGEX } from 'ts/utils/constants'
import {
	FieldValidatorResponse,
	FormState,
	newFormState,
} from 'ts/utils/formState'
import { User } from 'ts/utils/models'

const fieldsArray = ['name', 'email'] as const
type Fields = typeof fieldsArray[number]

export const nameValidator = (
	state: FormState<Fields>
): FieldValidatorResponse => {
	const isValid = state.values.name.length > 0
	return {
		isValid: isValid,
		message: isValid ? '' : 'Required',
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
