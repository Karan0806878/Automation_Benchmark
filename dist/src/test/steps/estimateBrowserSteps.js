"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const landing_page_1 = require("../../../utils/pages/landing.page");
const estimateBrowser_page_1 = require("../../../utils/pages/estimateBrowser.page");
const projectSummary_page_1 = require("../../../utils/pages/projectSummary.page");
const data = __importStar(require("../../../utils/data/fixtures.data.json"));
const pageFixture_1 = require("../../hooks/pageFixture");
const section_page_1 = require("../../../utils/pages/section.page");
(0, cucumber_1.setDefaultTimeout)(60 * 1000);
(0, cucumber_1.Then)('the user searches and selects the required project', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const landingPage = new landing_page_1.LandingPage(pageFixture_1.pageFixture.page);
        const estimateBrowserPage = new estimateBrowser_page_1.EstimateBrowserPage(pageFixture_1.pageFixture.page);
        yield landingPage.selectEstimateBrowser();
        console.log("\nEstimate Browser selected");
        yield pageFixture_1.pageFixture.page.waitForTimeout(5000);
        // for estimate browser
        // await estimateBrowserPage.searchEstimate(data.estimateDescription)
        // await estimateBrowserPage.selectEstimate(data.estimateDescription)
        // for BOQScreen
        yield estimateBrowserPage.searchEstimate("Verify CCFT-115 with IFT");
        yield estimateBrowserPage.selectEstimate("Verify CCFT-115 with IFT");
        yield pageFixture_1.pageFixture.page.waitForTimeout(500);
        console.log("\nEstimate Opened for Review");
    });
});
(0, cucumber_1.Then)('the item rates are retrieved', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const projectSummaryPage = new projectSummary_page_1.ProjectSummaryPage(pageFixture_1.pageFixture.page);
        const sectionpage = new section_page_1.SectionPage(pageFixture_1.pageFixture.page);
        yield projectSummaryPage.openSection(data.section);
        console.log(`\nSection-${data.section} opened`);
        const item = "Historic Pre PCF Stage Costs";
        yield sectionpage.openItem(item);
        console.log(`\nItem Opened ${item}`);
        var rate = yield sectionpage.getItemRate("Small tools");
        console.log(`\nRate for the Item is ${rate}`);
    });
});
