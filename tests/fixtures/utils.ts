// Fails/succeeds after n tries
export const unreliablePromise = (resolveOn) => () =>
	(--resolveOn > 0 ) ?
		Promise.reject() :
		Promise.resolve()

export const isPromise = (value) =>
	Boolean(value && typeof value.then === 'function')
