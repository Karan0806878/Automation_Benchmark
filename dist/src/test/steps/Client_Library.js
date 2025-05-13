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
(0, cucumber_1.Given)('User is on NH Application Home Page', () => __awaiter(void 0, void 0, void 0, function* () {
    yield pageFixture_1.pageFixture.page.goto(data.NHCarbon2URL);
    const loginPage = new login_page_1.LoginPage(pageFixture_1.pageFixture.page);
    yield loginPage.performLogin('vijay');
}));
(0, cucumber_1.When)('User perform the necessary interactions', () => __awaiter(void 0, void 0, void 0, function* () {
    const randomStr = generateRandomString(10);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
    yield pageFixture_1.pageFixture.page.waitForTimeout(500);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Client"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Add new Client"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Client Code"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Client Code"]/following::input)[1]').fill('Benchmark ' + randomStr);
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Company"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Company"]/following::input)[1]').fill('AAA Automation Benchmark');
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Type"]').click();
    yield pageFixture_1.pageFixture.page.locator('//div[normalize-space(text())="Partnership"]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Client ID"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Client ID"]/following::input)[1]').fill('123');
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Address"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Address"]/following::input)[1]').fill('Benchmark');
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Salutation"]').click();
    yield pageFixture_1.pageFixture.page.locator('//div[normalize-space(text())="Mr"]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Contact"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Contact"]/following::input)[1]').fill('Data');
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Job Title"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Job Title"]/following::input)[1]').fill('Test Engneer');
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Email"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Email"]/following::input)[1]').fill('karan@gmail.com');
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Mobile"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Mobile"]/following::input)[1]').fill('123456789');
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Phone"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Phone"]/following::input)[1]').fill('0251456789');
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Website"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Website"]/following::input)[1]').fill('WWW.FB.COM');
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Save Client"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
}));
(0, cucumber_1.When)('User perform the update operation', () => __awaiter(void 0, void 0, void 0, function* () {
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
    yield pageFixture_1.pageFixture.page.waitForTimeout(500);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Client"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//div[normalize-space(text())="Company"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//input[@class="dx-texteditor-input"])[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//input[@class="dx-texteditor-input"])[1]').fill('AAA Automation Benchmark');
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Search"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Company"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Company"]/following::input)[1]').fill('11AA Atomation Benchmark');
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//i[contains(@class,"dx-icon dx-icon-spindown")])[2]').click();
    yield pageFixture_1.pageFixture.page.locator('//div[normalize-space(text())="PLC"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Client ID"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Client ID"]/following::input)[1]').fill('123');
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Address"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Address"]/following::input)[1]').clear();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Address"]/following::input)[1]').fill('AA Benchmark');
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//span[text()="Mr"]/following-sibling::i').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Contact"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Contact"]/following::input)[1]').fill('Data');
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Job Title"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Job Title"]/following::input)[1]').fill('Test Engneer');
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Email"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Email"]/following::input)[1]').fill('karan@gmail.com');
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Mobile"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Mobile"]/following::input)[1]').fill('123456789');
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Phone"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Phone"]/following::input)[1]').fill('0251456789');
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Website"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Website"]/following::input)[1]').fill('WWW.sk.COM');
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Save Client"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
}));
(0, cucumber_1.When)('User perform the duplicate operation', () => __awaiter(void 0, void 0, void 0, function* () {
    const randomStr = generateRandomString(10);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
    yield pageFixture_1.pageFixture.page.waitForTimeout(500);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Client"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//div[normalize-space(text())="Company"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//input[@class="dx-texteditor-input"])[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//input[@class="dx-texteditor-input"])[1]').fill('11AA Atomation Benchmark');
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Search"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Duplicate"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Client Code"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Client Code"]/following::input)[1]').fill('Automaton cc ' + randomStr);
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Company"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Company"]/following::input)[1]').clear();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Company"]/following::input)[1]').fill('Duplicate Automation Benchmark');
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Save Client"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
}));
(0, cucumber_1.When)('User perform the delete operation', () => __awaiter(void 0, void 0, void 0, function* () {
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Client"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//div[normalize-space(text())="Company"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//input[@class="dx-texteditor-input"])[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//input[@class="dx-texteditor-input"])[1]').fill('11AA Atomation Benchmark');
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Search"]').click();
    yield pageFixture_1.pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Delete"]').click();
    yield pageFixture_1.pageFixture.page.locator('//div[normalize-space(text())="Delete Client"]').click();
    yield pageFixture_1.pageFixture.page.locator('//div[@data-test-id="GenericModal-destructive-Delete-100-40"]//div[1]').click();
}));
(0, cucumber_1.Then)('There should be no console errors', () => __awaiter(void 0, void 0, void 0, function* () {
    const logs = yield pageFixture_1.pageFixture.page.evaluate(() => console.log());
}));
