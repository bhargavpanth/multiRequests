"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
const request_1 = require("./utils/request");
function requestMultipleUrls(urls, extra, headers) {
    if (!urls)
        errors_1.error(errors_1.errorMessage.url_not_found);
    if ((urls?.length > 1 && headers?.length !== 1 || urls.length)) {
        errors_1.error(errors_1.errorMessage.mismatch_urls_and_headers);
    }
    if (urls.length === headers.length) {
        urls.map((url, index) => extra?.retry ?
            request_1.requestRetry(url, extra.retry, headers[index]) :
            request_1.request(url, headers[index]));
    }
    else if (headers?.length === 1) {
        urls.map(url => extra?.retry ?
            request_1.requestRetry(url, extra.retry, headers) :
            request_1.request(url, headers));
    }
    else {
        urls.map(url => extra?.retry ?
            request_1.requestRetry(url, extra.retry) :
            request_1.request(url));
    }
}
exports.requestMultipleUrls = requestMultipleUrls;
