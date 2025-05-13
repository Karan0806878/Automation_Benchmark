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
exports.IFTComparator = void 0;
const customFunction_1 = require("../utilities/customFunction");
const pageFixture_1 = require("../../src/hooks/pageFixture");
class IFTComparator {
    constructor(page) {
        this.page = page;
        this.addRevision = page.getByText("Add Revision", { exact: true });
        this.confirmYes = page.getByText("Add", { exact: true });
        this.addMoreRow = page.getByText("200", { exact: true });
        this.revisionSuccess = page.locator(".dx-toast-message");
        this.revisionRow = page.locator(".dx-data-row.dx-row-lines.dx-column-lines");
        this.estimateNumber = "CT@-";
        this.manageRevision = page.getByText("Manage Contractors", { exact: true });
        this.pageNavigator = page.locator(".dx-overlay-content .dx-page-sizes");
        this.sortContractor = page.getByText("Un-Assigned From", { exact: true });
        this.assignContractor = page.locator("[data-icon='circle-left']");
        this.assignContractorSuccess = page.locator(".dx-toast-success");
        this.closeAssignContractor = page.locator(".dx-closebutton");
        this.openEstimateSpecificLib = page.getByText("Apply Estimate-Specific Library", { exact: true });
        this.arrangeEstimates = page.locator("(//span[@class='dx-sort dx-sort-up'])[1]");
        this.viewIFT = page.getByText("View IFT", { exact: true });
        this.schedule = page.getByText("Schedule", { exact: true });
        this.scope = page.getByText("Scope", { exact: true });
        this.riskRegister = page.getByText("Risk Register", { exact: true });
        this.inflationAndSpend = page.getByText("Inflation And Spend", { exact: true });
        this.calender = page.locator("(//div[@class='dx-dropdowneditor-icon'])[5]");
        this.savebtn = page.locator("//i[@class='dx-icon dx-icon-save']");
        this.carbonToggle = page.locator("(//div[@class='dx-switch-handle'])[1]");
        this.baselineToggle = page.locator("(//div[@class='dx-switch-handle'])[2]");
        this.menuIcon = page.locator("//i[@class='dx-icon dx-icon-menu']");
        this.itemRow = '.dx-data-row.dx-row-lines.dx-column-lines';
        this.expandArrow = ".dx-treelist-icon-container";
        this.selectSection = "[role='gridcell'] >> text='{desc}'";
        this.nominate = page.getByText("NOMINATE PREFERRED REVISION");
        this.selectRevisionToNominate = page.locator("(//div[@class='dx-dropdowneditor-icon'])[4]");
    }
    revisionAdjustment() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.schedule.click();
            yield this.page.waitForTimeout(2000);
            // await this.page.locator("(//td[@role='gridcell'])[9]").click();
            // await this.calender.click();
            // await this.page.locator("(//span[contains(text(),'8')])[3]").click();
            // await this.savebtn.click();
            // await this.page.waitForTimeout(10000);
            yield this.scope.click();
            yield this.page.waitForTimeout(10000);
            // await this.carbonToggle.click();
            // await this.page.waitForTimeout(1000);
            // await this.baselineToggle.click();
            // await this.page.waitForTimeout(1000);
            // await this.riskRegister.click();
            // await this.page.waitForTimeout(10000);
            // await this.menuIcon.click();
            // await this.page.waitForTimeout(1000);
            // await this.page.locator("//i[@class='dx-icon dx-icon-add']").click();
            // await this.page.waitForTimeout(1000);
            // await this.page.locator("//i[@class='dx-icon dx-icon-revert']").click();
            // await this.page.waitForTimeout(1000);
            // await this.inflationAndSpend.click();
            // await this.page.waitForTimeout(5000);
            // await this.carbonToggle.click();
            // await this.page.waitForTimeout(5000);
        });
    }
    expandStage(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            const customFunction = new customFunction_1.CustomFunction(pageFixture_1.pageFixture.page);
            const selectItemNew = this.selectSection
                .toString()
                .replace("{desc}", desc);
            customFunction.clickOnSibling(this.itemRow, selectItemNew, this.expandArrow, 0);
        });
    }
    expandCompositeTotal(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            const customFunction = new customFunction_1.CustomFunction(pageFixture_1.pageFixture.page);
            const selectItemNew = this.selectSection
                .toString()
                .replace("{desc}", desc);
            customFunction.clickOnSibling(this.itemRow, selectItemNew, this.expandArrow, 0);
        });
    }
    expandNormalItem(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            const customFunction = new customFunction_1.CustomFunction(pageFixture_1.pageFixture.page);
            const selectItemNew = this.selectSection
                .toString()
                .replace("{desc}", desc);
            customFunction.clickOnSibling1(this.itemRow, selectItemNew, this.expandArrow, 0);
        });
    }
    nominateRevision() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.nominate.click();
            yield this.selectRevisionToNominate.click();
            yield this.page.locator("(//div[contains(text(),'CT1-11.07')])[1]").click();
            yield this.page.getByText("SAVE").click();
            yield this.page.getByText("YES").click();
        });
    }
}
exports.IFTComparator = IFTComparator;
