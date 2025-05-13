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
exports.ProjectSummaryPage = void 0;
const customFunction_1 = require("../utilities/customFunction");
const pageFixture_1 = require("../../src/hooks/pageFixture");
class ProjectSummaryPage {
    constructor(page) {
        this.page = page;
        this.selectSection = "[role='gridcell'] >> text='{desc}'";
        this.itemRow = '.dx-data-row.dx-row-lines.dx-column-lines';
        this.editButton = "//span[@title='Edit']";
        this.quantity = page.locator("(//span[text()='No data']/following::input)[2]");
        this.cost = page.locator("(//span[text()='Quantity']/following::input)[2]");
        this.save = page.locator("//span[text()='Save']");
        this.expandArrow = ".dx-treelist-icon-container";
        this.subItem = page.getByText("Add SubItem", { exact: true });
        this.group = page.getByRole('gridcell', { name: 'Drainage and Service Ducts' });
        this.code = page.locator("//td[text()='MHGang1']");
        this.doubleClickCode = page.locator("(//td[@role='gridcell'][normalize-space()='MHGang1'])[2]");
        this.resource = page.getByText("Add Resource", { exact: true });
        this.resourceGroup = page.locator("(//td[normalize-space()='Design'])[1]");
        this.resourceCode = page.locator("(//td[normalize-space()='SignsTechAssuranceL'])[1]");
        this.doubleClickResourceCode = page.locator("(//td[normalize-space()='[ - ]'])[1]");
        this.item = page.getByText("Add Item", { exact: true });
    }
    openSection(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            const customFunction = new customFunction_1.CustomFunction(pageFixture_1.pageFixture.page);
            const selectSectionNew = this.selectSection
                .toString()
                .replace("{desc}", desc);
            customFunction.clickNthNoDispElement(selectSectionNew, 1);
            yield this.page.waitForLoadState("load");
        });
    }
    clickEditButton(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.waitForTimeout(5000);
            const customFunction = new customFunction_1.CustomFunction(pageFixture_1.pageFixture.page);
            const selectItemNew = this.selectSection
                .toString()
                .replace("{desc}", desc);
            customFunction.clickOnSibling(this.itemRow, selectItemNew, this.editButton, 1);
            yield this.page.waitForTimeout(500);
            yield this.page.waitForLoadState("load");
        });
    }
    updateDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.quantity.click();
            yield this.quantity.fill("");
            yield this.quantity.type("1");
            yield this.cost.click();
            yield this.cost.fill("");
            yield this.cost.type("1");
            yield this.save.click();
            yield this.page.waitForTimeout(5000);
        });
    }
    expandSection(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            const customFunction = new customFunction_1.CustomFunction(pageFixture_1.pageFixture.page);
            const selectItemNew = this.selectSection
                .toString()
                .replace("{desc}", desc);
            customFunction.clickOnSibling(this.itemRow, selectItemNew, this.expandArrow, 1);
        });
    }
    expandSection1(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.locator("body > div:nth-child(2) > span:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(9) > div:nth-child(1) > div:nth-child(1) > div:nth-child(6) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(1) > div:nth-child(1) > div:nth-child(3) > span:nth-child(1)").click();
        });
    }
    addSubItem(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            const customFunction = new customFunction_1.CustomFunction(pageFixture_1.pageFixture.page);
            const selectItemNew = this.selectSection
                .toString()
                .replace("{desc}", desc);
            customFunction.rightClickOnSibling(this.itemRow, selectItemNew, selectItemNew, 1);
            yield this.subItem.click();
            yield this.page.waitForLoadState("load");
            yield this.page.waitForTimeout(5000);
            yield this.group.dblclick();
            yield this.page.waitForLoadState("load");
            yield this.page.waitForTimeout(5000);
            yield this.code.dblclick();
            yield this.page.waitForLoadState("load");
            yield this.page.waitForTimeout(5000);
            yield this.doubleClickCode.dblclick();
            yield this.page.waitForLoadState("load");
            yield this.page.waitForTimeout(5000);
            yield this.page.getByRole('button', { name: 'save' }).click();
            yield this.page.waitForTimeout(5000);
        });
    }
    addItem(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            const customFunction = new customFunction_1.CustomFunction(pageFixture_1.pageFixture.page);
            const selectItemNew = this.selectSection
                .toString()
                .replace("{desc}", desc);
            customFunction.rightClickOnSibling(this.itemRow, selectItemNew, selectItemNew, 1);
            yield this.item.click();
            yield this.page.locator("(//td[normalize-space()='Preliminaries'])[1]").click();
            yield this.page.waitForLoadState("load");
            yield this.page.waitForTimeout(5000);
            yield this.page.locator("(//span[@class='dx-checkbox-icon'])[2]").click();
            yield this.page.waitForTimeout(9000);
            yield this.page.getByText("ADD SELECTED ITEM").click();
            yield this.page.waitForTimeout(9000);
            yield this.page.getByRole('button', { name: 'save' }).click();
            yield this.page.waitForTimeout(9000);
        });
    }
    addResource(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            const customFunction = new customFunction_1.CustomFunction(pageFixture_1.pageFixture.page);
            const selectItemNew = this.selectSection
                .toString()
                .replace("{desc}", desc);
            customFunction.rightClickOnSibling(this.itemRow, selectItemNew, selectItemNew, 1);
            yield this.page.waitForTimeout(3000);
            yield this.resource.click();
            yield this.page.waitForLoadState("load");
            yield this.resourceGroup.dblclick();
            yield this.page.waitForLoadState("load");
            yield this.page.waitForTimeout(9000);
            yield this.resourceCode.dblclick();
            yield this.page.waitForLoadState("load");
            yield this.page.waitForTimeout(9000);
            yield this.doubleClickResourceCode.dblclick();
            yield this.page.waitForLoadState("load");
            yield this.page.waitForTimeout(9000);
            yield this.page.getByRole('button', { name: 'save' }).click();
            yield this.page.waitForTimeout(9000);
        });
    }
}
exports.ProjectSummaryPage = ProjectSummaryPage;
