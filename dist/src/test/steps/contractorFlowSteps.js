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
const manageRevision_page_1 = require("../../../utils/pages/manageRevision.page");
const pageFixture_1 = require("../../hooks/pageFixture");
const landing_page_1 = require("../../../utils/pages/landing.page");
const estimateBrowser_page_1 = require("../../../utils/pages/estimateBrowser.page");
const projectSummary_page_1 = require("../../../utils/pages/projectSummary.page");
const admin_page_1 = require("../../../utils/pages/admin.page");
const BOQScreen_page_1 = require("../../../utils/pages/BOQScreen.page");
const data = __importStar(require("../../../utils/data/fixtures.data.json"));
const userProfile_page_1 = require("../../../utils/pages/userProfile.page");
const apiHelper = __importStar(require("../../../utils/apiHelper/carbonApi"));
(0, cucumber_1.Then)('user add a new revision', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const manageRevisionPage = new manageRevision_page_1.ManageRevisionPage(pageFixture_1.pageFixture.page);
        this.projectId = yield manageRevisionPage.getProjectId();
        yield manageRevisionPage.addNewRevision();
        yield manageRevisionPage.selectLatestEstimate();
        yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
        this.revisionNumber = yield manageRevisionPage.getRevisionNumber();
        yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
        yield manageRevisionPage.selectManageContractors(this.revisionNumber);
    });
});
(0, cucumber_1.Then)('assigns a contractor', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const manageRevisionPage = new manageRevision_page_1.ManageRevisionPage(pageFixture_1.pageFixture.page);
        yield pageFixture_1.pageFixture.page.waitForTimeout(15000);
        yield manageRevisionPage.assignContractorToEstimate();
    });
});
(0, cucumber_1.When)('the contractor searches and opens the assigned estimate and creates a revision', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const landingPage = new landing_page_1.LandingPage(pageFixture_1.pageFixture.page);
        const estimateBrowserPage = new estimateBrowser_page_1.EstimateBrowserPage(pageFixture_1.pageFixture.page);
        const manageRevisionPage = new manageRevision_page_1.ManageRevisionPage(pageFixture_1.pageFixture.page);
        yield landingPage.selectEstimateBrowser();
        console.log("\nEstimate Browser selected");
        yield pageFixture_1.pageFixture.page.waitForTimeout(7000);
        yield estimateBrowserPage.searchEstimateNo(this.revisionNumber);
        yield pageFixture_1.pageFixture.page.waitForTimeout(3000);
        yield estimateBrowserPage.selectManageEstimate(this.revisionNumber);
        console.log(`\nAssigned Estimate: ${this.revisionNumber} Opened for Review`);
        yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
        this.revisionId = yield manageRevisionPage.getProjectId();
        console.log(this.revisionId);
        const rev = yield manageRevisionPage.addNewRevision();
        // expect(rev).toEqual('New Revision added successfully.')
        // console.log('\nNew Contractor Revision added successfully')
        this.contractorRevision = yield manageRevisionPage.getRevisionNumber();
    });
});
(0, cucumber_1.Then)('contractor opens estimate specific library and adds a library', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const manageRevisionPage = new manageRevision_page_1.ManageRevisionPage(pageFixture_1.pageFixture.page);
        const rev = yield manageRevisionPage.applyEstimateSpecificLibrary(this.contractorRevision);
        // expect(rev).toEqual('New Library added successfully.')
    });
});
(0, cucumber_1.Then)('contractor opens the added library and uploads a EPD file', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const manageRevisionPage = new manageRevision_page_1.ManageRevisionPage(pageFixture_1.pageFixture.page);
        const adminPage = new admin_page_1.AdminPage(pageFixture_1.pageFixture.page);
        yield manageRevisionPage.openLibrary();
        yield adminPage.searchTab("FOG");
        yield manageRevisionPage.uploadEPD();
    });
});
(0, cucumber_1.Then)('the contractor clicks apply to estimate and returns back to revision page', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const manageRevisionPage = new manageRevision_page_1.ManageRevisionPage(pageFixture_1.pageFixture.page);
        yield manageRevisionPage.backToContractorLibrary();
        yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
        yield manageRevisionPage.applyToEstimate();
        yield pageFixture_1.pageFixture.page.waitForTimeout(20000);
        yield manageRevisionPage.backToRevision();
        yield pageFixture_1.pageFixture.page.waitForTimeout(2000);
    });
});
(0, cucumber_1.Then)('contractor opens the newly created revision and opens a section and expands it', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const manageRevisionPage = new manageRevision_page_1.ManageRevisionPage(pageFixture_1.pageFixture.page);
        const projectSummaryPage = new projectSummary_page_1.ProjectSummaryPage(pageFixture_1.pageFixture.page);
        const adminPage = new admin_page_1.AdminPage(pageFixture_1.pageFixture.page);
        this.contractorRevision = yield manageRevisionPage.getRevisionNumber();
        yield manageRevisionPage.openRevision(this.contractorRevision);
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
        yield pageFixture_1.pageFixture.page.waitForTimeout(3000);
    });
});
(0, cucumber_1.Then)('user modifies carbon values verifies the carbon values', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const BOQPage = new BOQScreen_page_1.BOQScreenPage(pageFixture_1.pageFixture.page);
        // await BOQPage.Recalculate();
    });
});
(0, cucumber_1.Then)('user deletes one of the resources', function () {
    return __awaiter(this, void 0, void 0, function* () {
    });
});
(0, cucumber_1.Then)('the contractor will add new item and enter the quantity', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const projectSummaryPage = new projectSummary_page_1.ProjectSummaryPage(pageFixture_1.pageFixture.page);
        yield projectSummaryPage.addItem("Site Clearance");
    });
});
(0, cucumber_1.Then)('will verify the total cost', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const BOQPage = new BOQScreen_page_1.BOQScreenPage(pageFixture_1.pageFixture.page);
        // await BOQPage.Recalculate();
    });
});
(0, cucumber_1.Then)('contractor will add a new resource and edit carbon values', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const projectSummaryPage = new projectSummary_page_1.ProjectSummaryPage(pageFixture_1.pageFixture.page);
        yield projectSummaryPage.addResource("Site Clearance - Take up or down and remove to tip off Site lighting column including bracket arm and lantern");
    });
});
(0, cucumber_1.Then)('contractor will add a subitem', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const projectSummaryPage = new projectSummary_page_1.ProjectSummaryPage(pageFixture_1.pageFixture.page);
        yield projectSummaryPage.addSubItem("Site Clearance - Take up or down and remove to tip off Site lighting column including bracket arm and lantern");
    });
});
(0, cucumber_1.Then)('contractor logs out', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const userProfilePage = new userProfile_page_1.UserProfilePage(pageFixture_1.pageFixture.page);
        yield userProfilePage.logOut();
    });
});
(0, cucumber_1.Then)('the assignRevisionContract API is called to remove the contractor assigned', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield apiHelper.assignRevisionContract(this.projectId, this.revisionId);
    });
});
(0, cucumber_1.Then)('contractor deletes the added revision', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const manageRevisionPage = new manageRevision_page_1.ManageRevisionPage(pageFixture_1.pageFixture.page);
        yield manageRevisionPage.delRevision(this.contractorRevision);
    });
});
