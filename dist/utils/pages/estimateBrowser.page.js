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
exports.EstimateBrowserPage = void 0;
const customFunction_1 = require("../utilities/customFunction");
const pageFixture_1 = require("../../src/hooks/pageFixture");
class EstimateBrowserPage {
    constructor(page) {
        this.page = page;
        this.descriptionSearchBox = page
            .locator("(//input[@aria-label='Filter cell'])[3]");
        this.estimateNoSearchBox = page
            .locator("(//input[@aria-label='Filter cell'])[2]");
        this.manageRevision = page.getByText("Manage Revisions", { exact: true });
        this.estimateRow = `tr[role='row']`;
        this.estimate = "[role='gridcell'] >> text='{desc}'";
        this.contextOption = `.dx-icon-spindown`;
        this.estimateProjectlist = "(//td[@role='gridcell'][normalize-space()='{desc}'])[7]";
        this.actions = page.getByRole('row', { name: 'New Scheme 03 11.07 Verify CCFT-115 with IFT spindown' }).getByLabel('spindown');
    }
    searchEstimate(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.descriptionSearchBox.type(desc, { timeout: 40000 });
            yield this.page.waitForLoadState("load");
        });
    }
    searchEstimateNo(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.estimateNoSearchBox.type(desc);
            yield this.page.waitForLoadState("load");
        });
    }
    selectEstimate(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.waitForTimeout(1000);
            const estimateListNew = this.estimate
                .toString()
                .replace("{desc}", desc);
            yield this.page.locator(estimateListNew).nth(1).click();
            yield this.page.waitForLoadState("load");
        });
    }
    selectManageEstimate(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            const customFunction = new customFunction_1.CustomFunction(pageFixture_1.pageFixture.page);
            const estimateNew = this.estimate
                .toString()
                .replace("{desc}", desc);
            customFunction.clickOnSibling(this.estimateRow, estimateNew, this.contextOption, 1);
            yield this.page.waitForTimeout(500);
            yield this.manageRevision.click();
            yield this.page.waitForLoadState("load");
        });
    }
    selectManageEstimateProject(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            const estimateListNew = this.estimateProjectlist
                .toString()
                .replace("{desc}", desc);
            yield this.page.locator(estimateListNew).click(); //Selecting the correct Estimate out of 2
            yield this.page.waitForLoadState("load");
        });
    }
    selectActions() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.actions.click();
            yield this.page.waitForTimeout(2000);
            yield this.manageRevision.click();
            yield this.page.waitForTimeout(5000);
        });
    }
    selectRevision() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.locator("(//td[@role='gridcell'][normalize-space()='CT12-CP.0005'])[2]").click();
        });
    }
}
exports.EstimateBrowserPage = EstimateBrowserPage;
