"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expect_js_1 = __importDefault(require("expect.js"));
const src_1 = require("../src");
const utils_1 = require("./fixtures/utils");
const errors_1 = require("../src/errors");
// Can introduce ES6 shim for promise.allSettled
// https://www.npmjs.com/package/promise.allsettled
describe('Behavioural tests', () => {
    const port = parseInt(process.env.PORT) || 4000;
    const ip = process.env.IP || 'http://127.0.0.1';
    const url = `${ip}:${port}`;
    describe('passing urls', () => {
        let results;
        before(() => {
            results = src_1.requestMultipleUrls([
                `${url}/api/customer/abc123/fetchSubscriptions`,
                `${url}/api/customer/abc123/fetchSubscriptions`
            ]);
        });
        it('return two promises', () => {
            expect_js_1.default(results.length).to.be(2);
            results.forEach(result => {
                expect_js_1.default(utils_1.isPromise(result)).to.be(true);
            });
        });
        it('resolves the promises to the responses', () => {
            Promise.all(results).then(result => {
                result.forEach(data => {
                    expect_js_1.default(data).to.be.an(Object);
                    expect_js_1.default(data).to.have.property('titles');
                });
            });
        });
    });
    describe('passing urls and wrong headers', () => {
        let results;
        before(async () => {
            results = src_1.requestMultipleUrls([
                `${url}/api/customer/abc123/news/123/fetchNewsContent`,
                `${url}/api/customer/abc123/slow?timeout=2000`
            ], { headers: [{ token: 'bogus_token' }] });
        });
        it('rejects with appropriate message', async () => {
            await Promise.all(results)
                .catch(err => {
                expect_js_1.default(err.error.message).to.equal('unauthorized request');
            });
        });
    });
    describe('passing unequal number of urls and headers', () => {
        let results;
        before(async () => {
            results = src_1.requestMultipleUrls([
                `${url}/api/customer/abc123/news/123/fetchNewsContent`,
                `${url}/api/customer/abc123/news/123/fetchNewsContent`,
                `${url}/api/customer/abc123/news/123/fetchNewsContent`
            ], { headers: [{ token: 'bogus_token' }, { token: 'token' }] });
        });
        it('rejects the promise with appropriate message', async () => {
            await Promise.all([results]).catch(err => {
                console.log({ err });
                expect_js_1.default(err).to.be(errors_1.errorMessage.mismatch_urls_and_headers);
            });
        });
    });
    describe('passing urls with retry', () => {
        /**
         * To test the retry, using sinon spy, resturcturing of code required
         * For now, the retry policy has not been tested
         * **/
        describe('default', () => {
            let results, retry = 2;
            before(async () => {
                results = await src_1.requestMultipleUrls([
                    `${url}/api/customer/abc123/timingOut`,
                    `${url}/api/customer/abc123/fetchSubscriptions`
                ], { retry });
            });
            it('return two promises', async () => {
                expect_js_1.default(results.length).to.be(2);
            });
            it('rejects the promises', async function () {
                // overriding the timeout property on 'this'
                // does not work when using an anonymous function
                this.timeout(10000);
                await Promise.all(results).catch(err => {
                    expect_js_1.default(err).to.be(errors_1.errorMessage.retries_limit_exceeded);
                });
            });
        });
    });
});
