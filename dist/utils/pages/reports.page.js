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
exports.ReportsPage = void 0;
const customFunction_1 = require("../utilities/customFunction");
const pageFixture_1 = require("../../src/hooks/pageFixture");
class ReportsPage {
    constructor(page) {
        this.page = page;
        this.estimateLevel = page.getByText("Estimate - Level", { exact: true });
        this.aggregateBy = `//*[contains(text(), 'Aggregate By')]`;
        this.aggregateDropdown = `input[role='combobox']`;
        this.aggregateParent = ".dropdown";
        this.comparator = page.getByText("Comparator", { exact: true });
        this.baseEstimateParent = ".dropdown";
        this.baseEstimateBy = `//*[contains(text(), '{desc}')]`;
        this.baseEstimateDropdown = `input[role='combobox']`;
        this.costElementComparator = page.getByText("Cost - Element Comparator", { exact: true });
        this.CCESS = page.getByText("Cost and Carbon Estimate Summary Sheet (CCESS)", { exact: true });
        this.CCESSEstimate = page.locator("(//td[@style='text-align: left;'])[15]");
        this.CostandCarbonExpenditureProfile = page.getByText("Cost and Carbon Expenditure Profile", { exact: true });
        this.CCEPEstimate = page.locator("(//td[@style='text-align: left;'])[15]");
        this.CCEPSummarybtn = page.locator("//span[@class='dx-button-text']");
        this.refreshIcon = page.locator("//i[@class='dx-icon dx-icon-refresh']");
        this.portfolioRiskToggle = page.locator("(//div[@class='dx-switch-handle'])[1]");
        this.inflationToggle = page.locator("(//div[@class='dx-switch-handle'])[2]");
        this.closeBtn = page.locator("//i[@class='dx-icon dx-icon-close']");
    }
    selectEstimateLevelReport() {
        return __awaiter(this, void 0, void 0, function* () {
            const customFunction = new customFunction_1.CustomFunction(pageFixture_1.pageFixture.page);
            yield this.estimateLevel.click();
            yield this.page.waitForLoadState("load");
            customFunction.clickOnSibling(this.aggregateParent, this.aggregateBy, this.aggregateDropdown, 0);
            console.log("\nClicked on Estimate Level - Aggregate By dropdown");
        });
    }
    selectEstimateAggregate(option) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.getByText(option, { exact: true }).click();
            yield this.page.waitForLoadState("load");
            console.log(`\nAggregate By ${option} selected`);
        });
    }
    selectBaseEstimate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.locator("(//div[@class='dx-item-content dx-list-item-content'])[1]").click();
            yield this.page.waitForLoadState("load");
        });
    }
    selectRevision() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.locator("(//div[@class='m-4'])[1]").click();
            yield this.page.waitForLoadState("load");
        });
    }
    selectComparator() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.comparator.click();
        });
    }
    selectComparatorReport(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            const customFunction = new customFunction_1.CustomFunction(pageFixture_1.pageFixture.page);
            yield this.page.waitForLoadState("load");
            const baseEstimateBy = this.baseEstimateBy
                .toString()
                .replace("{desc}", desc);
            customFunction.clickOnSibling(this.baseEstimateParent, baseEstimateBy, this.baseEstimateDropdown, 0);
            yield this.page.waitForLoadState("load");
            console.log("\nClicked on Comparator - Aggregate By dropdown");
        });
    }
    selectCostElementComparator() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.costElementComparator.click();
        });
    }
    selectCCESS() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.CCESS.click();
            const isTrue = yield this.refreshIcon.isVisible();
            if (isTrue) {
                console.log("\nCost and Carbon Estimate Summary Sheet Verified");
            }
            else {
                console.log("\nCost and Carbon Estimate Summary Sheet not Verified");
            }
        });
    }
    selectCCESSEstimate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.CCESSEstimate.click();
            yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
            yield this.portfolioRiskToggle.click();
            yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
            yield this.inflationToggle.click();
            yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        });
    }
    selectCostandCarbonExpenditureProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.CostandCarbonExpenditureProfile.click();
            const isTrue = yield this.refreshIcon.isVisible();
            if (isTrue) {
                console.log("\nCost and Carbon Expenditure Profile Sheet Verified");
            }
            else {
                console.log("\nCost and Carbon Expenditure Profile Sheet not Verified");
            }
        });
    }
    selectCCEPEstimate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.CCEPEstimate.click();
            yield this.CCEPSummarybtn.click();
            yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
            yield this.closeBtn.click();
        });
    }
}
exports.ReportsPage = ReportsPage;
