
import expect from 'expect.js'
import { requestMultipleUrls } from '../src'
import { isPromise } from './fixtures/utils'
import { errorMessage } from '../src/errors'

// Can introduce ES6 shim for promise.allSettled
// https://www.npmjs.com/package/promise.allsettled

describe('Behavioural tests', () => {

	const port = parseInt(process.env.PORT) || 4000
	const ip = process.env.IP || 'http://127.0.0.1'
	const url = `${ip}:${port}`

	describe('passing urls', () => {
		let results
		before(() => {
			results = requestMultipleUrls([
				`${url}/api/customer/abc123/fetchSubscriptions`,
				`${url}/api/customer/abc123/fetchSubscriptions`
			])
		})
		it('return two promises', () => {
			expect(results.length).to.be(2)
			results.forEach(result => {
				expect(isPromise(result)).to.be(true)
			})
		})
		it('resolves the promises to the responses', () => {
			Promise.all(results).then(result => {
				result.forEach(data => {
					expect(data).to.be.an(Object)
					expect(data).to.have.property('titles')
				})
			})
		})
	})

	describe('passing urls and wrong headers', () => {
		let results
		before(async () => {
			results = requestMultipleUrls([
				`${url}/api/customer/abc123/news/123/fetchNewsContent`,
				`${url}/api/customer/abc123/slow?timeout=2000`
			], { headers: [{ token: 'bogus_token' }] })
		})
		it('rejects with appropriate message', async () => {
			await Promise.all(results)
				.catch(err => {
					expect(err.error.message).to.equal('unauthorized request')
				})
		})
	})

	describe('passing unequal number of urls and headers', () => {
		let results
		before(async () => {
			results = requestMultipleUrls([
				`${url}/api/customer/abc123/news/123/fetchNewsContent`,
				`${url}/api/customer/abc123/news/123/fetchNewsContent`,
				`${url}/api/customer/abc123/news/123/fetchNewsContent`
			], { headers: [ { token: 'bogus_token' }, { token: 'token' } ]})
		})
		it('rejects the promise with appropriate message', async () => {
			await Promise.all([results]).catch(err => {
				expect(err).to.be(errorMessage.mismatch_urls_and_headers)
			})
		})
	})

	describe('passing urls with retry', () => {
		/**
		 * Restructuring of code is required to test retry policy (using sinon spy)
		 * Finding it difficult to justify the restructring process as it will
		 * involve changing the paradigm in which the current method is implemented
		 * **/
		describe('default', () => {
			let results, retry = 2
			before(async () => {
				results = await requestMultipleUrls([
					`${url}/api/customer/abc123/timingOut`,
					`${url}/api/customer/abc123/fetchSubscriptions`
				], { retry })
			})
			it('return two promises', async () => {
				expect(results.length).to.be(2)
			})
			it('rejects the promises', async function () {
				// overriding the timeout property on 'this'
				// does not work when using an anonymous function
				this.timeout(10000)
				await Promise.all(results).catch(err => {
					expect(err).to.be(errorMessage.retries_limit_exceeded)
				})
			})
		})
	})

})
