import { request, requestRetry } from './utils/request'
import { Extra } from './interface'
import { error, errorMessage } from './errors'

export function requestMultipleUrls (urls: string[], extra?: Extra) {

	if (!urls) return error(errorMessage.url_not_found)

	if (extra && extra.headers && extra.headers.length === 1) {
		return urls.map(url =>
			extra && extra.retry ?
				requestRetry(url, extra.retry, extra.headers) :
				request(url, extra.headers)
		)
	} else if (extra && extra.headers && extra.headers.length === urls.length) {
		return urls.map((url, index) =>
			extra && extra.retry ?
				requestRetry(url, extra.retry, extra.headers[index]) :
				request(url, extra.headers[index])
		)
	} else if (!extra || !extra.headers) {
		return urls.map(url =>
			extra && extra.retry ?
				requestRetry(url, extra.retry) :
				request(url)
		)
	} else {
		return error(errorMessage.mismatch_urls_and_headers)
	}

}
