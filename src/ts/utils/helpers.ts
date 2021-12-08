import { FormState } from 'ts/utils/models'

/* --------------------------------------
							FORM STATE
-------------------------------------- */
export function newFormState<FieldNames extends string>(
	fields: readonly FieldNames[]
): FormState<FieldNames> {
	const state: FormState<FieldNames> = {
		values: {} as Record<FieldNames, string>,
		messages: {} as Record<FieldNames, string>,
		isValid: {} as Record<FieldNames, boolean>,
		touched: {} as Record<FieldNames, boolean>,
		validators: {} as Record<
			FieldNames,
			(state: FormState<FieldNames>) => FormState<FieldNames>
		>,
		formValid: false,
		formMessage: '',
		attemptedSubmit: false,
	}
	for (const field of fields) {
		state.values[field] = ''
		state.messages[field] = ''
		state.isValid[field] = false
		state.touched[field] = false
		state.validators[field] = (): FormState<FieldNames> => state
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

export function validateForm<FieldNames extends string>(
	state: FormState<FieldNames>
): FormState<FieldNames> {
	let isValid = true
	for (const key in state.validators) {
		state = state.validators[key](state)
		if (!state.isValid[key]) isValid = false
	}
	state.formValid = isValid
	return state
}

export function handleValueChange<FieldNames extends string>(
	event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	state: FormState<FieldNames>
): FormState<FieldNames> {
	const name = event.target.name as FieldNames
	const value = event.target.value

	if (!state.isValid[name]) state = state.validators[name](state)
	const fieldValues = state.values
	fieldValues[name] = value
	return { ...state, values: fieldValues }
}
