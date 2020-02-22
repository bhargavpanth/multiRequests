"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorMessage;
(function (errorMessage) {
    errorMessage["url_not_found"] = "URLs cannot be empty";
    errorMessage["mismatch_urls_and_headers"] = "Header can be of length 0, 1 or equal to the number of the URLs";
    errorMessage["retries_limit_exceeded"] = "number of retries exceeded";
})(errorMessage = exports.errorMessage || (exports.errorMessage = {}));
exports.error = (message) => Promise.reject(message);
