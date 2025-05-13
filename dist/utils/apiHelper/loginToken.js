"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setToken = setToken;
exports.getToken = getToken;
let token = null;
function setToken(newToken) {
    token = newToken;
}
function getToken() {
    return token;
}
