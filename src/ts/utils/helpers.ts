import { getMessage } from 'ts/services/errors'

export function createSubmitHandler<FormValues>(
	submitFunction: (values: FormValues) => Promise<void>,
	setErrorText: (text: string) => void
): (values: FormValues) => Promise<void> {
	const submit = function (values: FormValues): Promise<void> {
		return submitFunction(values).catch(e => {
			setErrorText(getMessage(e))
			return Promise.reject(new Error(getMessage(e)))
		})
	}

	return submit
}
