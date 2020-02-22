"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./utils/request");
const errors_1 = require("./errors");
function requestMultipleUrls(urls, extra) {
    if (!urls)
        return errors_1.error(errors_1.errorMessage.url_not_found);
    if (extra && extra.headers && extra.headers.length === 1) {
        return urls.map(url => extra && extra.retry ?
            request_1.requestRetry(url, extra.retry, extra.headers) :
            request_1.request(url, extra.headers));
    }
    else if (extra && extra.headers && extra.headers.length === urls.length) {
        return urls.map((url, index) => extra && extra.retry ?
            request_1.requestRetry(url, extra.retry, extra.headers[index]) :
            request_1.request(url, extra.headers[index]));
    }
    else if (!extra || !extra.headers) {
        return urls.map(url => extra && extra.retry ?
            request_1.requestRetry(url, extra.retry) :
            request_1.request(url));
    }
    else {
        return errors_1.error(errors_1.errorMessage.mismatch_urls_and_headers);
    }
}
exports.requestMultipleUrls = requestMultipleUrls;
