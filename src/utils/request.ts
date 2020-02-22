import * as rp from 'request-promise'
import { error, errorMessage } from '../errors'

export function request (url: string, header?: Object) {
	const options = {
    uri: url,
    headers: header,
		json: true
	}
	return rp.get(options)
}

export async function requestRetry (url: string, retries: number = 1, header?: Object) {
	if (retries == 0) {
		return error(errorMessage.retries_limit_exceeded)	
	}
	try {
		await request(url, header)
	} catch (err) {
		if (retries == 0) {
			return error(errorMessage.retries_limit_exceeded)
		}
    return await requestRetry(url, retries - 1, header)
	}
}
