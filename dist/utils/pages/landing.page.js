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
exports.LandingPage = void 0;
class LandingPage {
    constructor(page) {
        this.page = page;
        this.estimateBrowser = page.getByText("Estimate Browser", { exact: true });
        this.reports = page.getByText("Reports", { exact: true });
        this.admin = page.getByText("Admin", { exact: true });
    }
    selectEstimateBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.estimateBrowser.click();
            yield this.page.waitForLoadState("load");
        });
    }
    selectReports() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.reports.click();
            yield this.page.waitForLoadState("load");
        });
    }
    selectAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.admin.click();
            yield this.page.waitForLoadState("load");
        });
    }
}
exports.LandingPage = LandingPage;
