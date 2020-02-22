"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rp = __importStar(require("request-promise"));
const errors_1 = require("../errors");
function request(url, header) {
    const options = {
        uri: url,
        headers: header,
        json: true
    };
    return rp.get(options);
}
exports.request = request;
async function requestRetry(url, retries = 1, header) {
    if (retries == 0) {
        return errors_1.error(errors_1.errorMessage.retries_limit_exceeded);
    }
    try {
        await request(url, header);
    }
    catch (err) {
        if (retries == 0) {
            return errors_1.error(errors_1.errorMessage.retries_limit_exceeded);
        }
        return await requestRetry(url, retries - 1, header);
    }
}
exports.requestRetry = requestRetry;
