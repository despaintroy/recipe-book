export function createSubmitHandler<FormValues>(
	submitFunction: (values: FormValues) => Promise<void>,
	setErrorText: (text: string) => void
): (values: FormValues) => Promise<void> {
	const submit = function (values: FormValues): Promise<void> {
		return submitFunction(values).catch(e => {
			setErrorText(e.message)
			return Promise.reject(e)
		})
	}

	return submit
}
