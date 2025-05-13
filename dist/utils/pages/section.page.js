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
exports.SectionPage = void 0;
const customFunction_1 = require("../utilities/customFunction");
const pageFixture_1 = require("../../src/hooks/pageFixture");
class SectionPage {
    constructor(page) {
        this.page = page;
        this.selectItem = "[role='gridcell'] >> text='{desc}'";
        this.itemRow = '.dx-data-row.dx-row-lines.dx-column-lines';
        this.itemOpen = '.dx-treelist-cell-expandable';
        this.itemRate = "td[aria-colindex='4']";
    }
    openItem(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            const customFunction = new customFunction_1.CustomFunction(pageFixture_1.pageFixture.page);
            yield this.page.waitForTimeout(500);
            const selectItemNew = this.selectItem
                .toString()
                .replace("{desc}", desc);
            customFunction.clickOnSibling(this.itemRow, selectItemNew, this.itemOpen, 1);
            yield this.page.waitForLoadState("load");
        });
    }
    getItemRate(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            const customFunction = new customFunction_1.CustomFunction(pageFixture_1.pageFixture.page);
            const selectItemNew = this.selectItem
                .toString()
                .replace("{desc}", desc);
            return customFunction.getSiblingText(this.itemRow, selectItemNew, this.itemRate, 1);
        });
    }
}
exports.SectionPage = SectionPage;
