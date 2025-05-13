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
// function generateRandomCoordinates(minX: number, maxX: number, minY: number, maxY: number) {
//   const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
//   const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
//   return { x, y };
// }
(0, cucumber_1.Given)('User is on NH Application Home Page test Item', () => __awaiter(void 0, void 0, void 0, function* () {
    yield pageFixture_1.pageFixture.page.goto(data.NHCarbon2URL);
    const loginPage = new login_page_1.LoginPage(pageFixture_1.pageFixture.page);
    yield loginPage.performLogin('vijay');
}));
(0, cucumber_1.When)('User Navigates to Project Detail Screen to create Normal Item', () => __awaiter(void 0, void 0, void 0, function* () {
    yield pageFixture_1.pageFixture.page.waitForTimeout(5000);
    yield pageFixture_1.pageFixture.page.goto(data.Projectscreen);
}));
(0, cucumber_1.When)('User Add a Normal Item', () => __awaiter(void 0, void 0, void 0, function* () {
    const randomStr = generateRandomString(10);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Add Section"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Number"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Number"]/following::input)[1]').fill('1');
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').click();
    yield pageFixture_1.pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').fill('ABC ' + randomStr);
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Activity"]/following::input)[2]').click();
    yield pageFixture_1.pageFixture.page.locator('//div[normalize-space(text())="Activ6"]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="WBS Level"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="WBS Level"]/following::input)[1]').fill('12');
    yield pageFixture_1.pageFixture.page.locator('(//input[@role="spinbutton"])[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//input[@role="spinbutton"])[1]').fill('12');
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//input[@placeholder="Unit"]').click();
    yield pageFixture_1.pageFixture.page.locator('//div[normalize-space(text())="/m/week"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Organization"]/following::input)[2]').click();
    yield pageFixture_1.pageFixture.page.locator('//div[normalize-space(text())="05. Advanced Works"]').click();
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Save"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(25000);
    yield pageFixture_1.pageFixture.page.locator('//div[@aria-label="Search"]//div[1]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//span[normalize-space(text())="Help"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//span[normalize-space(text())="Help"]/following::input)[1]').fill('ABC');
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//input[@placeholder="Search Entities"]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
    //  await pageFixture.page.mouse.click(x, y); // Random click based on generated coordinates
    yield pageFixture_1.pageFixture.page.locator('(//td[contains(@class,"dx-command-expand dx-datagrid-group-space")]//div)[1]').click();
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Add"]').click();
    yield pageFixture_1.pageFixture.page.locator('//span[normalize-space(text())="Normal Item"]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Item Code"]/following::input)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Item Code"]/following::input)[1]').fill('ABCD');
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Item Description"]/following::textarea)[1]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Item Description"]/following::textarea)[1]').fill('TESTDATA');
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Quantity"]/following::input)[2]').click();
    yield pageFixture_1.pageFixture.page.locator('(//label[normalize-space(text())="Quantity"]/following::input)[2]').fill('10');
    yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
}));
