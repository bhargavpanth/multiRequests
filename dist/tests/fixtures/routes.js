"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware = __importStar(require("./middlewares"));
const router = express_1.default.Router();
// checking header
router.get('/customer/:customerId/news/:newsId/fetchNewsContent', middleware.isValidCustomer, middleware.checkToken, middleware.fetchNewsContent);
// route returns a json object
router.get('/customer/:customerId/fetchSubscriptions', middleware.isValidCustomer, middleware.fetchSubscriptionTopics);
// route that times out / throws a server error
router.get('/customer/:customerId/timingOut', middleware.isValidCustomer, middleware.timeOut);
// route that responds slowly
router.get('/customer/:customerId/slow', middleware.isValidCustomer, middleware.slowResponse);
exports.default = router;
