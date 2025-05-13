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
exports.BOQScreenPage = void 0;
const customFunction_1 = require("../utilities/customFunction");
const pageFixture_1 = require("../../src/hooks/pageFixture");
class BOQScreenPage {
    constructor(page) {
        this.page = page;
        this.selectSection = "[role='gridcell'] >> text='{desc}'";
        this.itemRow = '.dx-data-row.dx-row-lines.dx-column-lines';
        this.total = "td[aria-colindex='7']";
        this.recalculate = page.getByText("RECALCULATE");
    }
    verifyCarbonValues(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            const customFunction = new customFunction_1.CustomFunction(pageFixture_1.pageFixture.page);
            const selectItemNew = this.selectSection
                .toString()
                .replace("{desc}", desc);
            return customFunction.getSiblingText(this.itemRow, selectItemNew, this.total, 1);
        });
    }
    Recalculate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.recalculate.click();
            yield this.page.waitForFunction(() => document.readyState === 'complete');
        });
    }
}
exports.BOQScreenPage = BOQScreenPage;
