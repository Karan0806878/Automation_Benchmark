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
const pageFixture_1 = require("../../hooks/pageFixture");
const manageRevision_page_1 = require("../../../utils/pages/manageRevision.page");
const IFTComparator_page_1 = require("../../../utils/pages/IFTComparator.page");
const landing_page_1 = require("../../../utils/pages/landing.page");
const reports_page_1 = require("../../../utils/pages/reports.page");
(0, cucumber_1.Then)('user creates a revision and then clicks on actions and select View IFT', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const manageRevisionPage = new manageRevision_page_1.ManageRevisionPage(pageFixture_1.pageFixture.page);
        // await manageRevisionPage.addNewRevision();
        console.log('\nNew Revision added successfully');
        yield manageRevisionPage.selectLatestEstimate();
        yield manageRevisionPage.selectViewIFT();
        yield pageFixture_1.pageFixture.page.waitForTimeout(5000);
        console.log('\nIFT screen opened for the revision');
    });
});
(0, cucumber_1.Then)('user make adjustments to Revision in each IFT tab', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const iftComparator = new IFTComparator_page_1.IFTComparator(pageFixture_1.pageFixture.page);
        yield iftComparator.revisionAdjustment();
        yield pageFixture_1.pageFixture.page.waitForTimeout(2500);
        yield iftComparator.expandStage("Pre PCF Stage");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
        yield iftComparator.expandCompositeTotal("Stage 0 - National Highways Other Costs");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
        yield iftComparator.expandNormalItem("Levels");
        yield pageFixture_1.pageFixture.page.waitForTimeout(10000);
    });
});
(0, cucumber_1.Then)('user goes to comparator and compares the baseline and revesion for cost and Carbon', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const landingPage = new landing_page_1.LandingPage(pageFixture_1.pageFixture.page);
        const reportsPage = new reports_page_1.ReportsPage(pageFixture_1.pageFixture.page);
        yield landingPage.selectReports();
        console.log("\nReports selected");
        reportsPage.selectComparator();
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        reportsPage.selectComparatorReport("Base Estimate");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        reportsPage.selectBaseEstimate();
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        reportsPage.selectComparatorReport("Revision");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        reportsPage.selectRevision();
        yield pageFixture_1.pageFixture.page.waitForTimeout(20000);
        reportsPage.selectComparatorReport("Compare By");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        reportsPage.selectEstimateAggregate("Carbon");
        yield pageFixture_1.pageFixture.page.waitForTimeout(3000);
        reportsPage.selectComparatorReport("Base Estimate");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
    });
});
(0, cucumber_1.Then)('user marks the revision as nominate preferred revision', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const iftComparator = new IFTComparator_page_1.IFTComparator(pageFixture_1.pageFixture.page);
        const reportsPage = new reports_page_1.ReportsPage(pageFixture_1.pageFixture.page);
        yield iftComparator.nominateRevision();
        yield pageFixture_1.pageFixture.page.waitForTimeout(10000);
    });
});
(0, cucumber_1.Then)('user shall view the CESS report for the revision', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const reportsPage = new reports_page_1.ReportsPage(pageFixture_1.pageFixture.page);
        reportsPage.selectCCESS();
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
    });
});
(0, cucumber_1.Then)('user shall view the carbon expense profile report', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const reportsPage = new reports_page_1.ReportsPage(pageFixture_1.pageFixture.page);
        reportsPage.selectCostandCarbonExpenditureProfile();
        yield pageFixture_1.pageFixture.page.waitForTimeout(3000);
    });
});
