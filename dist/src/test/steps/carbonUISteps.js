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
const reports_page_1 = require("../../../utils/pages/reports.page");
const data = __importStar(require("../../../utils/data/fixtures.data.json"));
const pageFixture_1 = require("../../hooks/pageFixture");
const admin_page_1 = require("../../../utils/pages/admin.page");
(0, cucumber_1.setDefaultTimeout)(60 * 1000);
(0, cucumber_1.Then)("the estimate browser option should be available with all the projects listed", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const landingPage = new landing_page_1.LandingPage(pageFixture_1.pageFixture.page);
        const estimateBrowserPage = new estimateBrowser_page_1.EstimateBrowserPage(pageFixture_1.pageFixture.page);
        yield landingPage.selectEstimateBrowser();
        console.log("\nEstimate Browser selected");
        yield pageFixture_1.pageFixture.page.waitForTimeout(7000);
        yield estimateBrowserPage.searchEstimate(data.estimateDescription);
        console.log("\nEstimate Searched");
        yield pageFixture_1.pageFixture.page.waitForTimeout(3000);
    });
});
(0, cucumber_1.Then)("the User selects the Reports options", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const landingPage = new landing_page_1.LandingPage(pageFixture_1.pageFixture.page);
        yield landingPage.selectReports();
        console.log("\nReports selected");
    });
});
(0, cucumber_1.Then)("all the Reports should be available", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const reportsPage = new reports_page_1.ReportsPage(pageFixture_1.pageFixture.page);
        reportsPage.selectEstimateLevelReport();
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        reportsPage.selectEstimateAggregate("Item");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        reportsPage.selectEstimateLevelReport();
        reportsPage.selectEstimateAggregate("Resource");
        yield pageFixture_1.pageFixture.page.waitForTimeout(8000);
    });
});
(0, cucumber_1.When)('the User clicks on comparator option', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const reportsPage = new reports_page_1.ReportsPage(pageFixture_1.pageFixture.page);
        reportsPage.selectComparator();
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
    });
});
(0, cucumber_1.Then)('IFT comparator reports will be available', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const reportsPage = new reports_page_1.ReportsPage(pageFixture_1.pageFixture.page);
        reportsPage.selectComparatorReport("Baseline Estimate");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        reportsPage.selectBaseEstimate();
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        reportsPage.selectComparatorReport("Revision");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        reportsPage.selectRevision();
        yield pageFixture_1.pageFixture.page.waitForTimeout(20000);
        reportsPage.selectComparatorReport("Compare By");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        reportsPage.selectEstimateAggregate("Carbon Variance");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
    });
});
(0, cucumber_1.When)('the User clicks Cost-Element Comparator option', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const reportsPage = new reports_page_1.ReportsPage(pageFixture_1.pageFixture.page);
        reportsPage.selectCostElementComparator();
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
    });
});
(0, cucumber_1.Then)('Cost-Element Comparator reports will be available', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const reportsPage = new reports_page_1.ReportsPage(pageFixture_1.pageFixture.page);
        reportsPage.selectComparatorReport("Base Estimate");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        reportsPage.selectBaseEstimate();
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        reportsPage.selectComparatorReport("Revision");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        // reportsPage.selectRevision()
        // await pageFixture.page.waitForTimeout(20000);
        reportsPage.selectComparatorReport("Compare By");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        reportsPage.selectEstimateAggregate("Inflation");
        yield pageFixture_1.pageFixture.page.waitForTimeout(3000);
    });
});
(0, cucumber_1.When)('the User clicks on CCESS option', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const reportsPage = new reports_page_1.ReportsPage(pageFixture_1.pageFixture.page);
        reportsPage.selectCCESS();
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
    });
});
(0, cucumber_1.Then)('CCESS reports should be available', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const reportsPage = new reports_page_1.ReportsPage(pageFixture_1.pageFixture.page);
        reportsPage.selectCCESSEstimate();
        yield pageFixture_1.pageFixture.page.waitForTimeout(10000);
    });
});
(0, cucumber_1.When)('the User clicks on Cost and Carbon Expenditure Profile option', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const reportsPage = new reports_page_1.ReportsPage(pageFixture_1.pageFixture.page);
        reportsPage.selectCostandCarbonExpenditureProfile();
        yield pageFixture_1.pageFixture.page.waitForTimeout(3000);
    });
});
(0, cucumber_1.Then)('Cost and Carbon Expenditure Profile reports will be available', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const reportsPage = new reports_page_1.ReportsPage(pageFixture_1.pageFixture.page);
        reportsPage.selectCCEPEstimate();
        yield pageFixture_1.pageFixture.page.waitForTimeout(4000);
    });
});
(0, cucumber_1.When)('the User selects the Admin Control-Panel option', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const landingPage = new landing_page_1.LandingPage(pageFixture_1.pageFixture.page);
        yield landingPage.selectAdmin();
        console.log("\nAdmin selected");
        const adminPage = new admin_page_1.AdminPage(pageFixture_1.pageFixture.page);
        yield adminPage.selectControlPanel();
        console.log("\nControl Panel selected");
    });
});
(0, cucumber_1.Then)('all the Assign Inflation Index should be available', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const adminPage = new admin_page_1.AdminPage(pageFixture_1.pageFixture.page);
        yield adminPage.selectAssignInflationIndex();
        console.log("\nAssign Inflation Index selected");
        yield pageFixture_1.pageFixture.page.waitForTimeout(3000);
    });
});
(0, cucumber_1.When)('the User clicks on Admin Master Data option', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const adminPage = new admin_page_1.AdminPage(pageFixture_1.pageFixture.page);
        yield adminPage.selectMasterData();
        console.log("\nMaster Data selected");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
    });
});
(0, cucumber_1.Then)('all the Codes will be available', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const adminPage = new admin_page_1.AdminPage(pageFixture_1.pageFixture.page);
        yield adminPage.selectCodes();
        console.log("\nCodes selected");
    });
});
(0, cucumber_1.When)('the User clicks on Admin Master Data Baseline Assumptions', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const adminPage = new admin_page_1.AdminPage(pageFixture_1.pageFixture.page);
        yield adminPage.selectBaselineAssumptions();
        console.log("\nBaseline Assumptions selected");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
    });
});
(0, cucumber_1.Then)('all the transport assumptions will be available', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const adminPage = new admin_page_1.AdminPage(pageFixture_1.pageFixture.page);
        yield adminPage.selectTransport();
        console.log("\nTransport Assumptions selected");
    });
});
(0, cucumber_1.Then)('all the Mode of transportwill be available', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const adminPage = new admin_page_1.AdminPage(pageFixture_1.pageFixture.page);
        yield adminPage.selectModeOfTransport();
        console.log("\nMode of Transport selected");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
    });
});
(0, cucumber_1.When)('the User clicks on Admin Master Data Emission Factors', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const adminPage = new admin_page_1.AdminPage(pageFixture_1.pageFixture.page);
        yield adminPage.selectEmissionFactors();
        console.log("\nEmission Factors selected");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
    });
});
(0, cucumber_1.Then)('Base Carbon Library will be available', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const adminPage = new admin_page_1.AdminPage(pageFixture_1.pageFixture.page);
        yield adminPage.selectBaseCarbonLibrary();
        console.log("\nBase Carbon Library selected");
        yield pageFixture_1.pageFixture.page.waitForTimeout(10000);
    });
});
(0, cucumber_1.When)('the User clicks on Admin Master Data Dynamic Carbon Library', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const adminPage = new admin_page_1.AdminPage(pageFixture_1.pageFixture.page);
        yield adminPage.selectDynamicCarbonLibrary();
        console.log("\nDynamic Carbon Library selected");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
    });
});
(0, cucumber_1.Then)('Dynamic Carbon Library will be available', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const adminPage = new admin_page_1.AdminPage(pageFixture_1.pageFixture.page);
        yield adminPage.verfiyDynamicCarbonLibrary();
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
    });
});
(0, cucumber_1.When)('the User clicks on Admin Role Based Access', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const adminPage = new admin_page_1.AdminPage(pageFixture_1.pageFixture.page);
        yield adminPage.selectRoleBasedAccess();
        console.log("\nRole Based Access selected");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
    });
});
(0, cucumber_1.Then)('Assign Estimators to Roles option will be available', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const adminPage = new admin_page_1.AdminPage(pageFixture_1.pageFixture.page);
        yield adminPage.selectAssignEstimatorsToRoles();
        adminPage.select("Select Role");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        adminPage.selectRole("Authority Estimators");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        adminPage.select("Select Role");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        adminPage.selectRole("Contractors");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
    });
});
(0, cucumber_1.Then)('Role Permissions option will also be available', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const adminPage = new admin_page_1.AdminPage(pageFixture_1.pageFixture.page);
        yield adminPage.selectRolePermissions();
        console.log("\nRole Permissions selected");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        adminPage.select("Select Role");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        adminPage.selectRole("Authority Estimators");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        adminPage.select("Select Role");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
        adminPage.selectRole("Contractors");
        yield pageFixture_1.pageFixture.page.waitForTimeout(1500);
    });
});
