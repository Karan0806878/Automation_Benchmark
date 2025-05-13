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
const manageRevision_page_1 = require("../../../utils/pages/manageRevision.page");
const data = __importStar(require("../../../utils/data/fixtures.data.json"));
const pageFixture_1 = require("../../hooks/pageFixture");
const test_1 = require("@playwright/test");
const userProfile_page_1 = require("../../../utils/pages/userProfile.page");
const estimateSpecificLibrary_1 = require("../../../utils/pages/estimateSpecificLibrary");
(0, cucumber_1.setDefaultTimeout)(60 * 1000);
(0, cucumber_1.Then)('the admin creates a revision and assigns to contractor', function () {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const landingPage = new landing_page_1.LandingPage(pageFixture_1.pageFixture.page);
        const estimateBrowserPage = new estimateBrowser_page_1.EstimateBrowserPage(pageFixture_1.pageFixture.page);
        const manageRevisionPage = new manageRevision_page_1.ManageRevisionPage(pageFixture_1.pageFixture.page);
        yield landingPage.selectEstimateBrowser();
        console.log("\nEstimate Browser selected");
        yield estimateBrowserPage.searchEstimate(data.estimateDescription);
        console.log("\nEstimate Searched");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
        yield estimateBrowserPage.selectManageEstimate(data.estimateDescription);
        console.log("\nManage Revisions Opened");
        const rev = yield manageRevisionPage.addNewRevision();
        (0, test_1.expect)(rev).toEqual('New Revision added successfully.');
        console.log('\nNew Revision added successfully');
        yield manageRevisionPage.addMoreRows();
        this.estimateNumber = yield manageRevisionPage.getEstimateNumber();
        yield pageFixture_1.pageFixture.page.waitForTimeout(1000);
        let contractor = (_a = process.env.CCFTCONTRACTORNAME) !== null && _a !== void 0 ? _a : "Contractor";
        let success = yield manageRevisionPage.assignEstimateToContractor(this.estimateNumber, contractor);
        (0, test_1.expect)(success).toEqual('Contractors updated successfully.');
        console.log(`\nRevision assigned to Contractor: ${contractor}`);
    });
});
(0, cucumber_1.When)('the admin logs out and contractor logs back in', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const userProfilePage = new userProfile_page_1.UserProfilePage(pageFixture_1.pageFixture.page);
        yield userProfilePage.logOut();
    });
});
(0, cucumber_1.When)('the contractor opens the assigned estimate and creates a revision', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const landingPage = new landing_page_1.LandingPage(pageFixture_1.pageFixture.page);
        const estimateBrowserPage = new estimateBrowser_page_1.EstimateBrowserPage(pageFixture_1.pageFixture.page);
        const manageRevisionPage = new manageRevision_page_1.ManageRevisionPage(pageFixture_1.pageFixture.page);
        yield landingPage.selectEstimateBrowser();
        console.log("\nEstimate Browser selected");
        yield estimateBrowserPage.searchEstimateNo(this.estimateNumber);
        yield estimateBrowserPage.selectManageEstimate(this.estimateNumber);
        yield pageFixture_1.pageFixture.page.waitForTimeout(500);
        console.log(`\nAssigned Estimate: ${this.estimateNumber} Opened for Review`);
        const rev = yield manageRevisionPage.addNewRevision();
        (0, test_1.expect)(rev).toEqual('New Revision added successfully.');
        console.log('\nNew Contractor Revision added successfully');
    });
});
(0, cucumber_1.When)('the contractor opens the estimate specific library and adds a new library to estimate', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const manageRevisionPage = new manageRevision_page_1.ManageRevisionPage(pageFixture_1.pageFixture.page);
        const estimateSpecificLibraryPage = new estimateSpecificLibrary_1.EstimateSpecificLibraryPage(pageFixture_1.pageFixture.page);
        const rev = yield manageRevisionPage.getEstimateNumber();
        yield manageRevisionPage.openContSpecificLib(rev !== null && rev !== void 0 ? rev : "noEstimateFound");
        console.log("\nontractor Specific Library Page Opened");
        yield estimateSpecificLibraryPage.addNewLibrary();
        yield estimateSpecificLibraryPage.applyLibrarytoEstimate();
        console.log("\nNew Library added to Contractors revision");
    });
});
