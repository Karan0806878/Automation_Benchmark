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
const pageFixture_1 = require("../../hooks/pageFixture");
const projectSummary_page_1 = require("../../../utils/pages/projectSummary.page");
const data = __importStar(require("../../../utils/data/fixtures.data.json"));
const landing_page_1 = require("../../../utils/pages/landing.page");
const estimateBrowser_page_1 = require("../../../utils/pages/estimateBrowser.page");
const manageRevision_page_1 = require("../../../utils/pages/manageRevision.page");
const admin_page_1 = require("../../../utils/pages/admin.page");
const BOQScreen_page_1 = require("../../../utils/pages/BOQScreen.page");
(0, cucumber_1.Then)('user navigates to Base carbon library and updates the A1-A3, A5W and waste factor for a resource', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const landingPage = new landing_page_1.LandingPage(pageFixture_1.pageFixture.page);
        const adminPage = new admin_page_1.AdminPage(pageFixture_1.pageFixture.page);
        yield landingPage.selectAdmin();
        console.log("\nAdmin selected");
        yield adminPage.selectMasterData();
        yield adminPage.selectEmissionFactors();
        yield adminPage.selectBaseCarbonLibrary();
        yield pageFixture_1.pageFixture.page.waitForTimeout(15000);
        //0200.12.50.30.002
        yield adminPage.searchTab("0200.12.50.30.002");
        yield pageFixture_1.pageFixture.page.waitForTimeout(5000);
        yield adminPage.updateValues();
        yield pageFixture_1.pageFixture.page.waitForTimeout(10000);
    });
});
(0, cucumber_1.Then)('user selects a section and expands it upto resource level', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const projectSummaryPage = new projectSummary_page_1.ProjectSummaryPage(pageFixture_1.pageFixture.page);
        const adminPage = new admin_page_1.AdminPage(pageFixture_1.pageFixture.page);
        const BOQPage = new BOQScreen_page_1.BOQScreenPage(pageFixture_1.pageFixture.page);
        yield pageFixture_1.pageFixture.page.waitForTimeout(5000);
        yield adminPage.searchTab("Direct Works");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        yield projectSummaryPage.openSection("Direct Works");
        console.log(`\nSection-${data.section} opened`);
        yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
        const item = "Segment 1";
        yield projectSummaryPage.expandSection(item);
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        yield projectSummaryPage.expandSection("Site Clearance");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        yield projectSummaryPage.expandSection("Site Clearance - Take up or down and remove to tip off Site lighting column including bracket arm and lantern");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        // await BOQPage.Recalculate();
    });
});
(0, cucumber_1.Then)('user verifies the carbon values', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const BOQPage = new BOQScreen_page_1.BOQScreenPage(pageFixture_1.pageFixture.page);
        var no = yield BOQPage.verifyCarbonValues("Site Clearance - Take up or down and remove to tip off Site lighting column including bracket arm and lantern");
        console.log(no);
    });
});
(0, cucumber_1.Then)('user navigates to the estimate browser home screen and selects manage revision', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const landingPage = new landing_page_1.LandingPage(pageFixture_1.pageFixture.page);
        const estimateBrowserPage = new estimateBrowser_page_1.EstimateBrowserPage(pageFixture_1.pageFixture.page);
        yield landingPage.selectEstimateBrowser();
        yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
        yield estimateBrowserPage.selectActions();
    });
});
(0, cucumber_1.Then)('user add a new revision and opens newly created revision', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const manageRevisionPage = new manageRevision_page_1.ManageRevisionPage(pageFixture_1.pageFixture.page);
        // await manageRevisionPage.addNewRevision();
        yield manageRevisionPage.selectLatestEstimate();
        yield pageFixture_1.pageFixture.page.waitForTimeout(5000);
        const revisionNumber = yield manageRevisionPage.getRevisionNumber();
        if (revisionNumber !== null) {
            yield manageRevisionPage.openRevision(revisionNumber);
        }
        else {
            console.error('Revision number is null.');
        }
        yield pageFixture_1.pageFixture.page.waitForTimeout(10000);
    });
});
(0, cucumber_1.Then)('select any section and expand upto normal item level', function () {
    return __awaiter(this, void 0, void 0, function* () {
    });
});
