"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Fails/succeeds after n tries
exports.unreliablePromise = (resolveOn) => () => (--resolveOn > 0) ?
    Promise.reject() :
    Promise.resolve();
exports.isPromise = (value) => Boolean(value && typeof value.then === 'function');
