"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidCustomer(req, res, next) {
    const customerId = req.params.customerId;
    // Mocking a validCustomerId. This can be replaced by
    // a database call to fetch the customer information. Upon fetching
    // the customer information, the record can be seralised and added
    // to the request object to carry out further validation
    const validCustomerId = 'abc123';
    if (customerId === validCustomerId) {
        next();
    }
    else {
        res.status(404).send({ message: 'invalid customer ID' });
    }
}
exports.isValidCustomer = isValidCustomer;
function fetchSubscriptionTopics(req, res, next) {
    // Mocking a few titles. This can be replaced by a DB call
    // to fetch customer-topic subscriptions
    const titles = ['UK', 'European Union', 'Premier League'];
    res.send({
        titles
    });
}
exports.fetchSubscriptionTopics = fetchSubscriptionTopics;
function timeOut(req, res, next) {
    // mocking server timeout
    res.setTimeout(4000, () => {
        res.status(408).send({ message: 'server timed out' });
    });
}
exports.timeOut = timeOut;
function slowResponse(req, res, next) {
    // mocking a slow response - make this a query param
    const timeOut = parseInt(req.query.timeout);
    res.setTimeout(timeOut, () => {
        res.status(200).send({
            data: `this route responds in ${timeOut} seconds`
        });
    });
}
exports.slowResponse = slowResponse;
function checkToken(req, res, next) {
    const token = req.header('token');
    // Mocking a token
    if (token === 'token') {
        next();
    }
    else {
        res.status(401).send({ message: 'unauthorized request' });
    }
}
exports.checkToken = checkToken;
function fetchNewsContent(req, res, next) {
    const newsId = req.params.newsId;
    // Mocking a newsId
    if (newsId === '123') {
        res.status(200).send({
            content: 'Arsenal FC have made a swift move for a center back'
        });
    }
    else {
        res.status(404).send({
            message: 'unable to fetch news with the given newsId'
        });
    }
}
exports.fetchNewsContent = fetchNewsContent;
