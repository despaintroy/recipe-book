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
	validateField: (fieldName: FieldNames) => void
	beforeSubmit: () => void
	handleValueChange: (fieldName: FieldNames, value: string) => void
	touch: (fieldName: FieldNames) => void
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
			for (const field of fields) this.validateField(field)
			this.formValid = Object.values(state.isValid).every(isValid => isValid)
		},

		validateField: function (fieldName: FieldNames): void {
			if (this.validators[fieldName].length === 0) {
				this.isValid[fieldName] = true
				this.messages[fieldName] = ''
				return
			}

			for (const validator of this.validators[fieldName]) {
				const { isValid, message: messages } = validator(this)
				this.isValid[fieldName] = isValid
				this.messages[fieldName] = messages
				if (!this.isValid[fieldName]) break
			}
		},

		beforeSubmit: function (): void {
			this.validate()
			for (const key in this.touched) this.touch(key)
			this.attemptedSubmit = true
			if (!this.formValid)
				this.formMessage = 'Please fix the errors in the form'
		},

		handleValueChange: function (fieldName: FieldNames, value: string): void {
			this.values[fieldName] = value

			if (!this.isValid[fieldName]) this.validateField(fieldName)
		},

		touch: function (fieldName: FieldNames): void {
			this.touched[fieldName] = true
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
