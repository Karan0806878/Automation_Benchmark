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
const cucumber_1 = require("@cucumber/cucumber");
const projectSummary_page_1 = require("../../../utils/pages/projectSummary.page");
const pageFixture_1 = require("../../hooks/pageFixture");
(0, cucumber_1.Then)('user expand the section and add a resource', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const projectSummaryPage = new projectSummary_page_1.ProjectSummaryPage(pageFixture_1.pageFixture.page);
        const item = "Stage 0 - National Highways Other Costs";
        yield projectSummaryPage.expandSection(item);
        console.log(`Item expanded ${item}`);
        yield pageFixture_1.pageFixture.page.waitForTimeout(5000);
        yield projectSummaryPage.addResource("");
        console.log("Resource successfully added");
    });
});
