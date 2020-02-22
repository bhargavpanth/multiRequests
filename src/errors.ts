export enum errorMessage {
	url_not_found = 'URLs cannot be empty',
	mismatch_urls_and_headers = 'Header can be of length 0, 1 ' +
		'or equal to the number of the URLs',
	retries_limit_exceeded = 'number of retries exceeded'
}

export const error = (message: errorMessage) =>
	Promise.reject(message)