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
const login_page_1 = require("../../../utils/pages/login.page");
const data = __importStar(require("../../../utils/data/fixtures.data.json"));
const pageFixture_1 = require("../../hooks/pageFixture");
(0, cucumber_1.setDefaultTimeout)(60 * 1000);
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
(0, cucumber_1.Given)('User is on NH Application Home Page test variable data', () => __awaiter(void 0, void 0, void 0, function* () {
    yield pageFixture_1.pageFixture.page.goto(data.NHCarbon2URL);
    const loginPage = new login_page_1.LoginPage(pageFixture_1.pageFixture.page);
    yield loginPage.performLogin('vijay');
}));
(0, cucumber_1.When)('User perform the create variable test data', () => __awaiter(void 0, void 0, void 0, function* () {
    const randomStr = generateRandomString(10);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Variables"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Add new Variable"]').click();
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Type"]').click();
    yield pageFixture_1.pageFixture.page.locator('//div[normalize-space(text())="SECTION"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').fill('%12 ' + randomStr);
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Quantity"]/following::input)[2]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Quantity"]/following::input)[2]').fill('2' + randomStr);
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Unit"]').click();
    yield pageFixture_1.pageFixture.page.locator('//div[normalize-space(text())="1000"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').click();
    yield pageFixture_1.pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').fill('TESTDATA' + randomStr);
    yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Save Variable"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
}));
(0, cucumber_1.When)('User perform the update variable test data', () => __awaiter(void 0, void 0, void 0, function* () {
    const randomStr = generateRandomString(10);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Variables"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//div[normalize-space(text())="Code"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
    yield pageFixture_1.pageFixture.page.locator('(//td[contains(@class,"dx-command-expand dx-datagrid-group-space")]//div)[1]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').clear();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').fill('%1 ' + randomStr);
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Quantity"]/following::input)[2]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Quantity"]/following::input)[2]').clear();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Quantity"]/following::input)[2]').fill('3' + randomStr);
    yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
    yield pageFixture_1.pageFixture.page.locator('//span[@class="dx-button-text"]/following-sibling::i[1]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//div[normalize-space(text())="1000"]').click();
    yield pageFixture_1.pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').click();
    yield pageFixture_1.pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').clear();
    yield pageFixture_1.pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').fill('TESTDATA' + randomStr);
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Save Variable"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
}));
(0, cucumber_1.When)('User perform the delete variable test data', () => __awaiter(void 0, void 0, void 0, function* () {
    const randomStr = generateRandomString(10);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Variables"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//div[normalize-space(text())="Code"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
    yield pageFixture_1.pageFixture.page.locator('//div[normalize-space(text())="Code"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
    yield pageFixture_1.pageFixture.page.locator('(//td[contains(@class,"dx-command-expand dx-datagrid-group-space")]//div)[1]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Delete"]').click();
    yield pageFixture_1.pageFixture.page.locator('//div[normalize-space(text())="Delete Variable"]').click();
    yield pageFixture_1.pageFixture.page.locator('//div[@data-test-id="GenericModal-destructive-Delete-100-40"]//div[1]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
}));
