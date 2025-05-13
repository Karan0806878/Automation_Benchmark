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
exports.ManageRevisionPage = void 0;
const customFunction_1 = require("../utilities/customFunction");
const pageFixture_1 = require("../../src/hooks/pageFixture");
class ManageRevisionPage {
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
        this.deleteRevision = "//a[@title='Delete']";
        this.estimateRow = '.dx-data-row.dx-row-lines.dx-column-lines';
        this.spindown = ".dx-icon-spindown";
        this.selectRevision = "[role='gridcell'] >> text='{desc}'";
        this.addLibrary = page.getByText("Add Library", { exact: true });
    }
    addNewRevision() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.addRevision.click();
            yield this.confirmYes.click();
            yield this.page.waitForTimeout(35000);
            // await this.page.waitForSelector(".dx-toast-message", { timeout: 90000 });
            // return await this.revisionSuccess.textContent();
        });
    }
    getTotalRevision() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.revisionRow.count();
        });
    }
    addMoreRows() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.addMoreRow.click();
        });
    }
    getEstimateNumber() {
        return __awaiter(this, void 0, void 0, function* () {
            const texts = yield this.revisionRow
                .locator("td[aria-colindex='2']")
                .allTextContents();
            let maxNumber = -Infinity; // Initialize with negative infinity to ensure the first number is greater
            for (const item of texts) {
                const match = item.match(/CT(\d+(?:\.\d+)?)-/);
                if (match && match[1]) {
                    const extractedNumber = parseFloat(match[1]);
                    if (!isNaN(extractedNumber)) {
                        maxNumber = Math.max(maxNumber, extractedNumber);
                    }
                }
            }
            this.estimateNumber = this.estimateNumber.replace("@", maxNumber.toString());
            return yield this.page.getByText(this.estimateNumber).textContent();
        });
    }
    assignEstimateToContractor(estimate, contractor) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page
                .getByText(estimate, { exact: true })
                .click({ button: "right" });
            yield this.manageRevision.click();
            yield this.page.waitForSelector('.role', { timeout: 90000 });
            // Select all the contractors visible
            yield this.pageNavigator.getByText("20", { exact: true }).nth(1).click();
            // Sort the contractors in descending order
            yield this.sortContractor.click();
            yield this.sortContractor.click();
            // Select the Contractor
            yield this.page.getByRole("dialog").getByText(contractor, { exact: true }).click();
            yield this.assignContractor.click();
            yield this.page.waitForTimeout(1000);
            let success = yield this.assignContractorSuccess.textContent();
            // Close the popup
            yield this.closeAssignContractor.click();
            return success;
        });
    }
    openContSpecificLib(estimate) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page
                .getByText(estimate, { exact: true })
                .click({ button: "right" });
            yield this.openEstimateSpecificLib.click();
        });
    }
    selectLatestEstimate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.arrangeEstimates.click();
            yield this.page.waitForTimeout(1000);
        });
    }
    selectViewIFT() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.locator("(//i)[31]").click();
            yield this.viewIFT.click();
        });
    }
    getRevisionNumber() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.page.locator("(//td[@class='dx-hidden-cell'])[3]").textContent();
        });
    }
    openRevision(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            const xpath = `(//td[@role='gridcell'][normalize-space()='{desc}'])[2]`;
            const openRevision = xpath
                .toString()
                .replace("{desc}", desc);
            yield this.page.locator(openRevision).click();
        });
    }
    selectManageContractors(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            const customFunction = new customFunction_1.CustomFunction(pageFixture_1.pageFixture.page);
            const estimateNew = this.selectRevision
                .toString()
                .replace("{desc}", desc);
            customFunction.clickOnSibling(this.estimateRow, estimateNew, this.spindown, 1);
            yield this.page.getByText("Manage Contractors", { exact: true }).click();
        });
    }
    assignContractorToEstimate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sortContractor.click();
            yield this.page.getByRole("dialog").getByText("ContS1", { exact: true }).click();
            yield this.assignContractor.click();
            yield this.page.waitForTimeout(2000);
            yield this.assignContractorSuccess.textContent();
            yield this.closeAssignContractor.click();
            yield pageFixture_1.pageFixture.page.waitForTimeout(5000);
        });
    }
    applyEstimateSpecificLibrary(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            const customFunction = new customFunction_1.CustomFunction(pageFixture_1.pageFixture.page);
            const estimateNew = this.selectRevision
                .toString()
                .replace("{desc}", desc);
            customFunction.clickOnSibling(this.estimateRow, estimateNew, this.spindown, 1);
            yield this.page.waitForTimeout(2000);
            yield this.page.getByText("Apply Estimate-Specific Library", { exact: true }).click();
            yield this.page.waitForTimeout(2000);
            yield this.addLibrary.click();
            yield this.page.waitForTimeout(2000);
            yield this.page.locator("//input[@name='libraryName']").type("Automation");
            yield this.page.waitForTimeout(2000);
            yield this.page.getByText("Save", { exact: true }).click();
            yield this.page.waitForSelector(".dx-toast-message", { timeout: 90000 });
            return yield this.revisionSuccess.textContent();
        });
    }
    openLibrary() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.locator("//label[normalize-space()='Automation']").click();
            yield this.page.waitForTimeout(2000);
        });
    }
    uploadEPD() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.locator("(//div[normalize-space()='Unit'])[1]").click();
            yield this.page.waitForTimeout(2000);
            yield this.page.locator("(//div[normalize-space()='Type'])[1]").click();
            yield this.page.waitForTimeout(2000);
            yield this.page.locator("(//div[normalize-space()='Mode of Transportation 2'])[1]").click();
            yield this.page.waitForTimeout(2000);
        });
    }
    getProjectId() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentURL = yield this.page.url();
            const projectIdMatch = currentURL.match(/\/project\/(\d+)\//);
            if (projectIdMatch && projectIdMatch[1]) {
                const projectId = projectIdMatch[1];
                return projectId;
            }
            else {
                return null;
            }
        });
    }
    backToContractorLibrary() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.locator("//span[normalize-space()='Back to Contractor Libraries']").click();
        });
    }
    applyToEstimate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.locator("//span[normalize-space()='Apply To Estimate']").click();
        });
    }
    backToRevision() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.locator("(//span[@title='Verify CCFT-115 with IFT'])[2]").click();
        });
    }
    delRevision(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.goBack();
            yield this.page.waitForTimeout(2000);
            yield this.page.goBack();
            yield this.page.waitForTimeout(2000);
            yield this.page.locator("(//a[@title='Delete'])[2]").click();
            yield this.page.waitForTimeout(2000);
            yield this.page.locator("//span[normalize-space()='Yes']").click();
            yield this.page.waitForTimeout(25000);
        });
    }
}
exports.ManageRevisionPage = ManageRevisionPage;
