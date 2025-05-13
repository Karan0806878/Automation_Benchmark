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
exports.AdminPage = void 0;
const customFunction_1 = require("../utilities/customFunction");
const pageFixture_1 = require("../../src/hooks/pageFixture");
class AdminPage {
    constructor(page) {
        this.page = page;
        this.controlPanel = page.getByText("Control Panel", { exact: true });
        this.assignInflationIndex = page.getByText("Assign Inflation Index", { exact: true });
        this.masterData = page.getByText("Master Data", { exact: true });
        this.codes = page.getByText("Codes", { exact: true });
        this.modeOfTransport = page.getByText("MODE OF TRANSPORTATION");
        this.sourceReference = page.getByText("SOURCE REFERENCE");
        this.transportCategory = page.getByText("TRANSPORT CATEGORY");
        this.wrapCategory = page.getByText("WRAP CATEGORY");
        this.baselineAssumption = page.getByText("Baseline Assumptions", { exact: true });
        this.transport = page.getByText("Transport", { exact: true });
        this.transportAssumption = page.getByText("Transport (Journey Leg) Assumptions", { exact: true });
        this.BAmodeOfTransport = page.getByText("Mode of Transport", { exact: true });
        this.emissionFactors = page.getByText("Emission Factors", { exact: true });
        this.baseCarbonLibrary = page.getByText("Base Carbon Library", { exact: true });
        this.dynamicCarbonLibrary = page.getByText("Dynamic Carbon Library", { exact: true });
        this.roleBasedAccess = page.getByText("Role Based Access", { exact: true });
        this.assignEstimatorsToRoles = page.getByText("Assign Estimators to Roles", { exact: true });
        this.roleBy = `//*[contains(text(), '{desc}')]`;
        this.roleParent = ".dropdown";
        this.roleDropdown = `input[role='combobox']`;
        this.rolePermissions = page.getByText("Role Permissions", { exact: true });
        this.inflationIndex = page.locator("//div[normalize-space()='Inflation Index']");
        this.addIcon = page.locator("//i[@class='dx-icon dx-icon-add']");
        this.undoIcon = page.locator("//i[@class='dx-icon dx-icon-undo']");
        this.editIcon = page.locator("//i[@class='dx-icon dx-icon-edit']");
        this.exportIcon = page.locator("//i[@class='dx-icon dx-icon-xlsxfile']");
        this.search = page.locator("//input[@aria-label='Search in the data grid']");
        this.A1A3 = page.locator("(//td[@class='border-class'])[1]");
    }
    selectControlPanel() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.controlPanel.click();
        });
    }
    selectAssignInflationIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.assignInflationIndex.click();
            const isTrue = yield this.inflationIndex.isVisible();
            if (isTrue) {
                console.log("\nAssign Inflation Index Page Verified");
            }
            else {
                console.log("\nAssign Inflation Index Page not Verified");
            }
        });
    }
    selectMasterData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.masterData.click();
        });
    }
    selectCodes() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.codes.click();
            yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
            yield this.sourceReference.click();
            yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
            yield this.transportCategory.click();
            yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        });
    }
    selectBaselineAssumptions() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.baselineAssumption.click();
        });
    }
    selectTransport() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.transport.click();
            yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
            yield this.transportAssumption.click();
            yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
            yield this.addIcon.click();
            yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
            yield this.undoIcon.click();
            yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        });
    }
    selectModeOfTransport() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.BAmodeOfTransport.click();
            const isTrue = yield this.editIcon.isVisible();
            if (isTrue) {
                console.log("\nMode of Transport Page Verified");
            }
            else {
                console.log("\nMode of Transport Page not Verified");
            }
        });
    }
    selectEmissionFactors() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.emissionFactors.click();
        });
    }
    selectBaseCarbonLibrary() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.baseCarbonLibrary.click();
            const isTrue = yield this.exportIcon.isVisible();
            if (isTrue) {
                console.log("\nBase Carbon Library Page Verified");
            }
            else {
                console.log("\nBase Carbon Library Page not Verified");
            }
        });
    }
    selectDynamicCarbonLibrary() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dynamicCarbonLibrary.click();
        });
    }
    verfiyDynamicCarbonLibrary() {
        return __awaiter(this, void 0, void 0, function* () {
            const isTrue = yield this.exportIcon.isVisible();
            if (isTrue) {
                console.log("\nDynamic Carbon Library Page Verified");
            }
            else {
                console.log("\nDynamic Carbon Library Page not Verified");
            }
        });
    }
    selectRoleBasedAccess() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.roleBasedAccess.click();
        });
    }
    selectAssignEstimatorsToRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.assignEstimatorsToRoles.click();
        });
    }
    select(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            const customFunction = new customFunction_1.CustomFunction(pageFixture_1.pageFixture.page);
            yield this.page.waitForLoadState("load");
            const roleBy = this.roleBy
                .toString()
                .replace("{desc}", desc);
            customFunction.clickOnSibling(this.roleParent, roleBy, this.roleDropdown, 0);
        });
    }
    selectRole(option) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.getByText(option, { exact: true }).click();
            yield this.page.waitForLoadState("load");
            console.log(`\nSelect Role ${option} selected`);
        });
    }
    selectRolePermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.rolePermissions.click();
        });
    }
    searchTab(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.search.fill(desc);
        });
    }
    updateValues() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.A1A3.click();
            yield this.page.keyboard.press('Backspace');
            yield this.page.keyboard.type("2");
            yield this.page.locator("(//div[@role='presentation'][normalize-space()='Description'])[1]").click();
            yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
            yield this.page.locator("(//td[@aria-describedby='dx-col-112'])[2]").click();
            yield this.page.keyboard.press('Backspace');
            yield this.page.keyboard.type("2");
            yield this.page.locator("(//div[@role='presentation'][normalize-space()='Description'])[1]").click();
            yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
            yield this.page.locator("(//td[@aria-describedby='dx-col-132'])[2]").click();
            yield this.page.keyboard.press('Backspace');
            yield this.page.keyboard.type("2");
            yield this.page.locator("(//div[@role='presentation'][normalize-space()='Description'])[1]").click();
        });
    }
}
exports.AdminPage = AdminPage;
