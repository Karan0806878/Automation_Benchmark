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
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
const pageFixture_1 = require("./pageFixture");
let page;
let browser;
let context;
(0, cucumber_1.BeforeAll)(function () {
    return __awaiter(this, void 0, void 0, function* () {
        var type;
        // Based on the test type, select headless or headed mode
        if (process.env.TEST_TYPE == "API") {
            type = true;
        }
        else {
            type = false;
        }
        browser = yield test_1.chromium.launch({
            headless: type,
            args: ["--start-maximized"],
        });
    });
});
(0, cucumber_1.Before)(function (_a) {
    return __awaiter(this, arguments, void 0, function* ({ pickle }) {
        context = yield browser.newContext({
            viewport: null,
            recordVideo: {
                dir: `./test-results/videos/${pickle.name}`,
                size: {
                    width: 1920,
                    height: 1080
                }
            }
        });
        page = yield context.newPage();
        pageFixture_1.pageFixture.page = page;
    });
});
(0, cucumber_1.After)(function (_a) {
    return __awaiter(this, arguments, void 0, function* ({ pickle, result }) {
        yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
        if ((result === null || result === void 0 ? void 0 : result.status) == cucumber_1.Status.FAILED) {
            const img = yield pageFixture_1.pageFixture.page.screenshot({
                path: `./test-results/screenshots/${pickle.name}.png`,
                type: "png",
            });
            yield this.attach(img, "image/png");
        }
        yield pageFixture_1.pageFixture.page.close();
        yield context.close();
    });
});
(0, cucumber_1.AfterAll)(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield browser.close();
    });
});
