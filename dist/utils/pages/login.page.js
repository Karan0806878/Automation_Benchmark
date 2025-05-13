"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
require("dotenv/config");
class LoginPage {
    constructor(page) {
        this.page = page;
        this.email = page.locator("input[name='email']");
        this.pwd = page.locator("input[name='password']");
        this.submit = page.getByText("Log In", { exact: true });
        this.invalidLogin = page.locator(".dx-toast-message").nth(0); // As there are 2 duplicate elements, select 1
    }
    performLogin(usertype) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            let token = null;
            if (usertype === "admin") {
                yield this.email.type((_a = process.env.CCFTADMINUSERNAME) !== null && _a !== void 0 ? _a : "NewUsername");
                yield this.pwd.type((_b = process.env.CCFTPASSWORD) !== null && _b !== void 0 ? _b : "DefaultPwd");
                yield this.submit.click({ timeout: 10000 });
                yield this.page.waitForLoadState("load");
                yield this.page.waitForFunction(() => {
                    return localStorage.getItem("user");
                }, { timeout: 60000 });
                token = yield this.page.evaluate(() => {
                    const user = JSON.parse(localStorage.getItem("user"));
                    return user.accessToken;
                });
                if (token) {
                    return token;
                }
                else {
                    return null;
                }
            }
            else if (usertype === "contractor") {
                yield this.email.type((_c = process.env.CCFTCONTRACTORUSERNAME) !== null && _c !== void 0 ? _c : "NewUsername");
                yield this.pwd.type((_d = process.env.CCFTPASSWORD) !== null && _d !== void 0 ? _d : "DefaultPwd");
                yield this.submit.click({ timeout: 10000 });
                yield this.page.waitForLoadState("load");
            }
            else if (usertype === "vijay") {
                yield this.email.type((_e = process.env.CCFTCONTRACTORUSERNAME) !== null && _e !== void 0 ? _e : "vijay");
                yield this.pwd.type((_f = process.env.CCFTPASSWORD) !== null && _f !== void 0 ? _f : "Test@2024");
                yield this.submit.click({ timeout: 10000 });
                yield this.page.waitForLoadState("load");
            }
            return token;
        });
    }
    performInvalidLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.email.type("Invalid User");
            yield this.pwd.type("Invalid Pwd");
            yield this.submit.click({ timeout: 10000 });
            yield this.page.waitForLoadState("load");
            yield this.page.waitForTimeout(1000);
            return yield this.invalidLogin.textContent();
        });
    }
}
exports.LoginPage = LoginPage;
