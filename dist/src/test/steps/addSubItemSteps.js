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
const estimateBrowser_page_1 = require("../../../utils/pages/estimateBrowser.page");
const pageFixture_1 = require("../../hooks/pageFixture");
const projectSummary_page_1 = require("../../../utils/pages/projectSummary.page");
const data = __importStar(require("../../../utils/data/fixtures.data.json"));
const landing_page_1 = require("../../../utils/pages/landing.page");
(0, cucumber_1.Then)('the user searches project and clicks on actions and selects manage revision', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const landingPage = new landing_page_1.LandingPage(pageFixture_1.pageFixture.page);
        const estimateBrowserPage = new estimateBrowser_page_1.EstimateBrowserPage(pageFixture_1.pageFixture.page);
        yield landingPage.selectEstimateBrowser();
        console.log("Estimate Browser selected");
        yield pageFixture_1.pageFixture.page.waitForTimeout(5000);
        // await estimateBrowserPage.searchEstimate(data.estimateDescription) for estimate browser  
        // await estimateBrowserPage.selectManageEstimate(data.estimateDescription) for estimate browser
        // for subitem and add resource
        // await estimateBrowserPage.searchEstimate("Verify HE-1154 H3"); 
        // for IFT
        yield estimateBrowserPage.searchEstimate("Verify CCFT-115 with IFT");
        yield pageFixture_1.pageFixture.page.waitForTimeout(5000);
        yield estimateBrowserPage.selectActions();
        console.log("Manage Revisions Opened");
    });
});
(0, cucumber_1.Then)('user selects the project and selects a section', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const estimateBrowserPage = new estimateBrowser_page_1.EstimateBrowserPage(pageFixture_1.pageFixture.page);
        const projectSummaryPage = new projectSummary_page_1.ProjectSummaryPage(pageFixture_1.pageFixture.page);
        yield estimateBrowserPage.searchEstimateNo("CT12-CP.0005");
        yield pageFixture_1.pageFixture.page.waitForTimeout(5000);
        yield estimateBrowserPage.selectRevision();
        yield projectSummaryPage.openSection(data.section);
        console.log(`Section-${data.section} opened`);
    });
});
(0, cucumber_1.Then)('user expand the section and add a subItem', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const projectSummaryPage = new projectSummary_page_1.ProjectSummaryPage(pageFixture_1.pageFixture.page);
        const item = "Stage 0 - National Highways Other Costs";
        yield projectSummaryPage.expandSection(item);
        console.log(`Item expanded ${item}`);
        yield projectSummaryPage.addSubItem("");
    });
});
