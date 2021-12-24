export type FieldValidatorResponse = {
	isValid: boolean
	message: string // TODO: make this a string[]
}

export type FieldValidator<FieldNames extends string> = (
	state: FormState<FieldNames>
) => FieldValidatorResponse

export interface FormState<FieldNames extends string> {
	values: Record<FieldNames, string>
	isValid: Record<FieldNames, boolean>
	messages: Record<FieldNames, string>
	touched: Record<FieldNames, boolean>
	validators: Record<FieldNames, FieldValidator<FieldNames>[]>
	formValid: boolean
	formMessage: string
	attemptedSubmit: boolean

	validate: () => void
}

export function newFormState<FieldNames extends string>(
	fields: readonly FieldNames[]
): FormState<FieldNames> {
	const state: FormState<FieldNames> = {
		values: {} as Record<FieldNames, string>,
		messages: {} as Record<FieldNames, string>,
		isValid: {} as Record<FieldNames, boolean>,
		touched: {} as Record<FieldNames, boolean>,
		validators: {} as Record<FieldNames, FieldValidator<FieldNames>[]>,
		formValid: false,
		formMessage: '',
		attemptedSubmit: false,

		validate: function (): void {
			for (const field of fields) {
				const { isValid, message: messages } = validateField(this, field)
				this.isValid[field] = isValid
				this.messages[field] = messages
			}
			this.formValid = Object.values(state.isValid).every(isValid => isValid)
		},
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
	state.validate()
	for (const key in state.touched) state.touched[key] = true
	state.attemptedSubmit = true
	if (!state.formValid) state.formMessage = 'Please fix the errors in the form'
	return state
}

export function validateField<FieldNames extends string>(
	state: FormState<FieldNames>,
	field: FieldNames
): FieldValidatorResponse {
	if (state.validators[field].length === 0) {
		return { isValid: true, message: '' }
	}

	for (const validator of state.validators[field]) {
		const { isValid, message: messages } = validator(state)
		state.isValid[field] = isValid
		state.messages[field] = messages
		if (!state.isValid[field]) break
	}

	return {
		isValid: state.isValid[field],
		message: state.messages[field],
	}
}

export function handleValueChange<FieldNames extends string>(
	event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	state: FormState<FieldNames>
): FormState<FieldNames> {
	const name = event.target.name as FieldNames
	const value = event.target.value
	state.values[name] = value

	if (!state.isValid[name]) {
		const { isValid, message: messages } = validateField(state, name)
		state.isValid[name] = isValid
		state.messages[name] = messages
	}

	return { ...state }
}
