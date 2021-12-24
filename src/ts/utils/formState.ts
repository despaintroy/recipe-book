import { FormState, FormValidator } from 'ts/utils/models'

export function newFormState<FieldNames extends string>(
	fields: readonly FieldNames[]
): FormState<FieldNames> {
	const state: FormState<FieldNames> = {
		values: {} as Record<FieldNames, string>,
		messages: {} as Record<FieldNames, string>,
		isValid: {} as Record<FieldNames, boolean>,
		touched: {} as Record<FieldNames, boolean>,
		validators: {} as Record<FieldNames, FormValidator<FieldNames>[]>,
		formValid: false,
		formMessage: '',
		attemptedSubmit: false,
	}
	for (const field of fields) {
		state.values[field] = ''
		state.messages[field] = ''
		state.isValid[field] = false
		state.touched[field] = false
		state.validators[field] = []
	}
	return state
}

export function beforeSubmit<FieldNames extends string>(
	state: FormState<FieldNames>
): FormState<FieldNames> {
	state = validateForm(state)
	for (const key in state.touched) state.touched[key] = true
	state.attemptedSubmit = true
	if (!state.formValid) state.formMessage = 'Please fix the errors in the form'
	return state
}

export function validateField<FieldNames extends string>(
	state: FormState<FieldNames>,
	field: FieldNames
): FormState<FieldNames> {
	if (state.validators[field].length === 0) {
		state.isValid[field] = true
		return state
	}

	for (const validator of state.validators[field]) {
		state = validator(state)
		if (!state.isValid[field]) break
	}
	return state
}

export function validateForm<FieldNames extends string>(
	state: FormState<FieldNames>
): FormState<FieldNames> {
	Object.keys(state.validators).forEach(field => {
		state = validateField(state, field)
	})
	state.formValid = Object.values(state.isValid).every(isValid => isValid)
	return state
}

export function handleValueChange<FieldNames extends string>(
	event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	state: FormState<FieldNames>
): FormState<FieldNames> {
	const name = event.target.name as FieldNames
	const value = event.target.value

	if (!state.isValid[name]) state = validateField(state, name)
	state.values[name] = value
	return state
}
