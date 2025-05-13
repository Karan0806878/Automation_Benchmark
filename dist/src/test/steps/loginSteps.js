"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
const login_page_1 = require("../../../utils/pages/login.page");
const data = __importStar(require("../../../utils/data/fixtures.data.json"));
const pageFixture_1 = require("../../hooks/pageFixture");
(0, cucumber_1.setDefaultTimeout)(60 * 1000);
const loginToken_1 = require("../../../utils/apiHelper/loginToken");
(0, cucumber_1.Given)("User launches the Carbon tool", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield pageFixture_1.pageFixture.page.goto(data.NHCarbon2URL);
    });
});
(0, cucumber_1.Then)(/^the user login should be successful with (.*) profile/, function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        const loginPage = new login_page_1.LoginPage(pageFixture_1.pageFixture.page);
        const newToken = yield loginPage.performLogin(user);
        if (user === "admin" && newToken) {
            (0, loginToken_1.setToken)(newToken);
            console.log(newToken);
        }
        console.log(`\nUser Login is successful with ${user} profile`);
    });
});
(0, cucumber_1.Then)("the user login should fail when incorrect credentials are used", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const loginPage = new login_page_1.LoginPage(pageFixture_1.pageFixture.page);
        yield loginPage.performInvalidLogin();
        var error = yield loginPage.performInvalidLogin();
        (0, test_1.expect)(error).toEqual("Invalid credentials");
        console.log("\nCorrect Error Message is displayed");
        yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
    });
});
