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
exports.EstimateSpecificLibraryPage = void 0;
class EstimateSpecificLibraryPage {
    constructor(page) {
        this.page = page;
        this.addLibrary = page.getByText("Add Library", { exact: true });
        this.libraryName = page.locator("input[name='libraryName']");
        this.saveDialog = page.locator(".submit-button");
        this.applyToEstimate = page.getByText("Apply To Estimate", { exact: true });
    }
    addNewLibrary() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.addLibrary.click();
            yield this.page.waitForTimeout(500);
            yield this.libraryName.type(`${process.env.CCFTCONTRACTORUSERNAME} Library`);
            yield this.page.waitForTimeout(500);
            yield this.saveDialog.click();
        });
    }
    applyLibrarytoEstimate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.waitForTimeout(500);
            yield this.applyToEstimate.click();
            yield this.page.waitForSelector("div[aria-label='Add Supplier']", {
                timeout: 90000,
            });
        });
    }
}
exports.EstimateSpecificLibraryPage = EstimateSpecificLibraryPage;
