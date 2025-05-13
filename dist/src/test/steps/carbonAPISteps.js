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
const test_1 = require("@playwright/test");
const apiHelper = __importStar(require("../../../utils/apiHelper/carbonApi"));
(0, cucumber_1.setDefaultTimeout)(60 * 1000);
const fs = require('fs');
(0, cucumber_1.When)("the user logs in to generate the API token", function () {
    return __awaiter(this, void 0, void 0, function* () {
        var tokenResp = yield apiHelper.getSignIn();
        this.token = yield tokenResp.json();
        this.token = this.token.data.accessToken;
        // Write token to a text file
        fs.writeFile('api_token.txt', this.token, (err) => {
            if (err) {
                console.error('Error writing token to file:', err);
                return;
            }
            console.log('Token has been stored in api_token.txt');
        });
        console.log("\nUser Login was successful, Token is generated\n");
    });
});
function readTokenFromFile() {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenFilePath = 'api_token.txt';
        try {
            const token = fs.readFileSync(tokenFilePath, 'utf8').trim();
            const waitTime = 5000; // 5 seconds (adjust as needed)
            yield new Promise(resolve => setTimeout(resolve, waitTime));
            return token;
        }
        catch (err) {
            console.error('Error reading token from file:', err);
            return null;
        }
    });
}
(0, cucumber_1.When)("the user makes a call to verify the existing user", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const waitTime = 40000;
        yield new Promise(resolve => setTimeout(resolve, waitTime));
        const token = yield readTokenFromFile();
        this.userResp = yield apiHelper.getCurrentUserInfo(token);
    });
});
(0, cucumber_1.Then)("the existing user call response is success", function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.userResp.ok()).toBeTruthy();
        console.log("\nUser Info was retrieved succeessfully\n");
        let userInfo = yield this.userResp.json();
        // console.log(
        //   `\nUser Info is as follows:\n\n${JSON.stringify(userInfo)}\n\n`
        // );
    });
});
(0, cucumber_1.When)("the user makes the call to verify the Health", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.healthResp = yield apiHelper.getServicesHealth(token);
    });
});
(0, cucumber_1.Then)("the health response is success", function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.healthResp.ok()).toBeTruthy();
        console.log("\nSystem Health was retrieved succesfully\n");
        let health = yield this.healthResp.json();
        // console.log(
        //   `\nSystem Health is as follows:\n${JSON.stringify(health.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes a call to get the carbon expenditure profile for project (.*)/, function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.project = id;
        this.carbonProfile = yield apiHelper.getCarbonExpenProfile(token, this.project);
    });
});
(0, cucumber_1.Then)("the carbon profile is retrieved successfully", function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.carbonProfile.ok()).toBeTruthy();
        console.log("\nCarbon Profile was retrieved succesfully\n");
        let carbon = yield this.carbonProfile.json();
        // console.log(
        //   `\nCarbon Profile for Project ${this.project} is as follows:\n${JSON.stringify(carbon.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes a call to get the estimate revision for project (.*)/, function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.project = id;
        this.revision = yield apiHelper.getEstimateRevision(token, this.project);
    });
});
(0, cucumber_1.Then)("the estimate revision details are retrieved successfully", function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.revision.ok()).toBeTruthy();
        console.log("\nEstimate Revision details were retrieved succesfully\n");
        let rev = yield this.revision.json();
        // console.log(
        //   `\nEstimate Revision for Project ${this.project} is as follows:\n${JSON.stringify(rev.data)}\n\n`
        // );
        (0, test_1.expect)(rev.data[0].DataTypeName).toEqual("Project");
    });
});
(0, cucumber_1.When)(/^the project aggregate call is done for project (.*)/, function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.project = id;
        this.section = yield apiHelper.getSectionAggregate(token, this.project);
    });
});
(0, cucumber_1.Then)("the project sections are retrieved successfully", function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.section.ok()).toBeTruthy();
        console.log("\nSection Aggregates were retrieved succesfully\n");
        let sec = yield this.section.json();
        // console.log(
        //   `\nSection Aggregate for Project ${this.project} is as follows:\n${JSON.stringify(sec.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the item resource tree aggregation is retrieved for project (.*) and section (.*)/, function (id, sectionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.project = id;
        this.section = sectionId;
        this.resource = yield apiHelper.getResourceAggregate(token, this.project, this.section);
    });
});
(0, cucumber_1.Then)("the respurce details are retrieved successfully", function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.resource.ok()).toBeTruthy();
        //expect(this.resource.status).toBeNaN();
        console.log("\nResource Aggregates were retrieved succesfully\n");
        let res = yield this.resource.json();
        // console.log(
        //   `\nResource Aggregate for Project ${this.project}-section ${this.section} is as follows:\n${JSON.stringify(res.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the getAllProject API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.allProjectResp = yield apiHelper.getAllProject(token);
    });
});
(0, cucumber_1.Then)('the projectAll response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.allProjectResp.status()).toBe(200);
        (0, test_1.expect)(this.allProjectResp.ok()).toBeTruthy();
        console.log("All Projects are retrieved succesfully\n");
        let allProject = yield this.allProjectResp.json();
        (0, test_1.expect)(allProject).toHaveProperty('data');
        // console.log(
        //   `All Projects info is as follows:\n${JSON.stringify(allProject.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the getProjectById API for id (.*)/, function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.id = id;
        this.getProjectByIdResp = yield apiHelper.getProjectById(token, this.id);
    });
});
(0, cucumber_1.Then)('the getProjectById response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getProjectByIdResp.status()).toBe(200);
        (0, test_1.expect)(this.getProjectByIdResp.ok()).toBeTruthy();
        console.log("Project is retrieved succesfully\n");
        let getProjectById = yield this.getProjectByIdResp.json();
        (0, test_1.expect)(getProjectById).toHaveProperty('data');
        // console.log(
        //   `Project info is as follows:\n${JSON.stringify(getProjectById.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the getProjectMetaAll API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.projectMetaResp = yield apiHelper.getProjectMetaAll(token);
    });
});
(0, cucumber_1.Then)('the projectsMetaAll response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.projectMetaResp.status()).toBe(200);
        (0, test_1.expect)(this.projectMetaResp.ok()).toBeTruthy();
        console.log("Projects meta are retrieved succesfully\n");
        let projectMeta = yield this.projectMetaResp.json();
        (0, test_1.expect)(projectMeta).toHaveProperty('data');
        // console.log(
        //   `All Projects Meta info is as follows:\n${JSON.stringify(projectMeta.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the createRevision API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.createRevisionResp = yield apiHelper.createRevision(token);
    });
});
(0, cucumber_1.Then)('the createRevision response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.createRevisionResp.status()).toBe(200);
        (0, test_1.expect)(this.createRevisionResp.ok()).toBeTruthy();
        console.log("Created Revision is retrieved succesfully\n");
        let createdRevision = yield this.createRevisionResp.json();
        (0, test_1.expect)(createdRevision).toHaveProperty('data');
        // console.log(
        //   `All Projects info is as follows:\n${JSON.stringify(createdRevision.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the getRevision API for projectId (.*)/, function (projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.projectId = projectId;
        this.getRevisionResp = yield apiHelper.getRevision(token, this.projectId);
    });
});
(0, cucumber_1.Then)('the getRevision response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getRevisionResp.status()).toBe(200);
        (0, test_1.expect)(this.getRevisionResp.ok()).toBeTruthy();
        console.log("Created Revision is retrieved succesfully\n");
        let fetchedRevision = yield this.getRevisionResp.json();
        (0, test_1.expect)(fetchedRevision).toHaveProperty('data');
        // console.log(
        //   `All Revisions info is as follows:\n${JSON.stringify(fetchedRevision.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the IFTSpend API for projectId (.*)/, function (projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.projectId = projectId;
        this.IFTSpendResp = yield apiHelper.IFTSpend(token, this.projectId);
    });
});
(0, cucumber_1.Then)('the IFTSpend response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.IFTSpendResp.status()).toBe(200);
        (0, test_1.expect)(this.IFTSpendResp.ok()).toBeTruthy();
        console.log("IFTSpendResp is retrieved succesfully\n");
        let fetchedIFTSpendResp = yield this.IFTSpendResp.json();
        (0, test_1.expect)(fetchedIFTSpendResp).toHaveProperty('data');
        // console.log(
        //   `IFTSpend info is as follows:\n${JSON.stringify(fetchedIFTSpendResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the IFTInflation API for projectId (.*)/, function (projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.projectId = projectId;
        this.IFTInflationResp = yield apiHelper.IFTInflation(token, this.projectId);
    });
});
(0, cucumber_1.Then)('the IFTInflation response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.IFTInflationResp.status()).toBe(200);
        (0, test_1.expect)(this.IFTInflationResp.ok()).toBeTruthy();
        console.log("IFTInflationResp is retrieved succesfully\n");
        let fetchedIFTInflationResp = yield this.IFTInflationResp.json();
        (0, test_1.expect)(fetchedIFTInflationResp).toHaveProperty('data');
        // console.log(
        //   `IFTInflation info is as follows:\n${JSON.stringify(fetchedIFTInflationResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the IFTResult API for projectId (.*)/, function (projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.projectId = projectId;
        this.IFTResultResp = yield apiHelper.IFTResult(token, this.projectId);
    });
});
(0, cucumber_1.Then)('the IFTResult response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.IFTResultResp.status()).toBe(200);
        (0, test_1.expect)(this.IFTResultResp.ok()).toBeTruthy();
        console.log("IFTResultResp is retrieved succesfully\n");
        let fetchedIFTResultResp = yield this.IFTResultResp.json();
        (0, test_1.expect)(fetchedIFTResultResp).toHaveProperty('data');
        // console.log(
        //   `IFTResult info is as follows:\n${JSON.stringify(fetchedIFTResultResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the getRoles API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.rolesResp = yield apiHelper.getRoles(token);
    });
});
(0, cucumber_1.Then)('the getRoles response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.rolesResp.status()).toBe(200);
        (0, test_1.expect)(this.rolesResp.ok()).toBeTruthy();
        console.log("All Roles are retrieved succesfully\n");
        let fetchedrolesResp = yield this.rolesResp.json();
        (0, test_1.expect)(fetchedrolesResp).toHaveProperty('data');
        // console.log(
        //   `All Roles info is as follows:\n${JSON.stringify(fetchedrolesResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the getAccessList API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.accessListResp = yield apiHelper.getAccessList(token);
    });
});
(0, cucumber_1.Then)('the getAccessList response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.accessListResp.status()).toBe(200);
        (0, test_1.expect)(this.accessListResp.ok()).toBeTruthy();
        console.log("AccessListResp is retrieved succesfully\n");
        let fetchedaccessListResp = yield this.accessListResp.json();
        (0, test_1.expect)(fetchedaccessListResp).toHaveProperty('data');
        // console.log(
        //   `Access List info is as follows:\n${JSON.stringify(fetchedaccessListResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the getAccessLevel API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.accessLevelResp = yield apiHelper.getAccessLevel(token);
    });
});
(0, cucumber_1.Then)('the getAccessLevel response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.accessLevelResp.status()).toBe(200);
        (0, test_1.expect)(this.accessLevelResp.ok()).toBeTruthy();
        console.log("AccessLevelResp is retrieved succesfully\n");
        let fetchedaccessLevelResp = yield this.accessLevelResp.json();
        (0, test_1.expect)(fetchedaccessLevelResp).toHaveProperty('data');
        // console.log(
        //   `Access Level info is as follows:\n${JSON.stringify(fetchedaccessLevelResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the getRoleAccess API for (.*)/, function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.id = id;
        this.roleAccessResp = yield apiHelper.getRoleAccess(token, this.id);
    });
});
(0, cucumber_1.Then)('the getRoleAccess response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.roleAccessResp.status()).toBe(200);
        (0, test_1.expect)(this.roleAccessResp.ok()).toBeTruthy();
        console.log("RoleAccessResp is retrieved succesfully\n");
        let fetchedaccessLevelResp = yield this.roleAccessResp.json();
        (0, test_1.expect)(fetchedaccessLevelResp).toHaveProperty('data');
        // console.log(
        //   `Role Access info is as follows:\n${JSON.stringify(fetchedaccessLevelResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the createRoleAccess API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.createdRoleAccessResp = yield apiHelper.createRoleAccess(token);
    });
});
(0, cucumber_1.Then)('the createRoleAccess response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.createdRoleAccessResp.status()).toBe(200);
        (0, test_1.expect)(this.createdRoleAccessResp.ok()).toBeTruthy();
        console.log("RoleAccessResp is retrieved succesfully\n");
        let fetchedRoleAccessResp = yield this.createdRoleAccessResp.json();
        (0, test_1.expect)(fetchedRoleAccessResp).toHaveProperty('data');
        // console.log(
        //   `Role Access info is as follows:\n${JSON.stringify(fetchedRoleAccessResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the scheduleUpdate API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.scheduleUpdateResp = yield apiHelper.scheduleUpdate(token);
    });
});
(0, cucumber_1.Then)('the scheduleUpdate response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.scheduleUpdateResp.status()).toBe(200);
        (0, test_1.expect)(this.scheduleUpdateResp.ok()).toBeTruthy();
        console.log("ScheduleUpdateResp is retrieved succesfully\n");
        let fetchedScheduleUpdateResp = yield this.scheduleUpdateResp.json();
        (0, test_1.expect)(fetchedScheduleUpdateResp).toHaveProperty('data');
        // console.log(
        //   `Role Access info is as follows:\n${JSON.stringify(fetchedScheduleUpdateResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/the user makes the call to verify the getSchedule API for parameter (.*)/, function (params) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        const processedParams = params.replace(/or/g, '||');
        this.params = processedParams;
        this.getScheduleResp = yield apiHelper.getSchedule(token, this.params);
    });
});
(0, cucumber_1.Then)('the getSchedule response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getScheduleResp.status()).toBe(200);
        (0, test_1.expect)(this.getScheduleResp.ok()).toBeTruthy();
        console.log("GetScheduleResp is retrieved succesfully\n");
        let fetchedGetScheduleResp = yield this.getScheduleResp.json();
        (0, test_1.expect)(fetchedGetScheduleResp).toHaveProperty('data');
        // console.log(
        //   `GetScheduleResp info is as follows:\n${JSON.stringify(fetchedGetScheduleResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the getResourceLibraryForSpecificGroup API for Resource_Group_id (.*)/, function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.id = id;
        this.resourceLibraryResp = yield apiHelper.getResourceLibraryForSpecificGroup(token, this.id);
    });
});
(0, cucumber_1.Then)('the getResourceLibraryForSpecificGroup response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.resourceLibraryResp.status()).toBe(200);
        (0, test_1.expect)(this.resourceLibraryResp.ok()).toBeTruthy();
        console.log("ResourceLibraryRespforSpecificGroup is retrieved succesfully\n");
        let fetchedResourceLibraryRespforSpecificGroup = yield this.resourceLibraryResp.json();
        (0, test_1.expect)(fetchedResourceLibraryRespforSpecificGroup).toHaveProperty('data');
        // console.log(
        //   `ResourceLibraryRespforSpecificGroup info is as follows:\n${JSON.stringify(fetchedResourceLibraryRespforSpecificGroup.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the resourceLibraryInsertBulk API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.resourceLibraryInsertBulkResp = yield apiHelper.resourceLibraryInsertBulk(token);
    });
});
(0, cucumber_1.Then)('the resourceLibraryInsertBulk response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.resourceLibraryInsertBulkResp.status()).toBe(200);
        (0, test_1.expect)(this.resourceLibraryInsertBulkResp.ok()).toBeTruthy();
        console.log("ResourceLibraryInsertBulkResp is retrieved succesfully\n");
        let fetchedResourceLibraryInsertBulkResp = yield this.resourceLibraryInsertBulkResp.json();
        (0, test_1.expect)(fetchedResourceLibraryInsertBulkResp).toHaveProperty('data');
        // console.log(
        //   `ResourceLibraryInsertBulkResp info is as follows:\n${JSON.stringify(fetchedResourceLibraryInsertBulkResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the getResourceLibraryCarbon API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.resourceLibraryCarbonResp = yield apiHelper.getResourceLibraryCarbon(token);
    });
});
(0, cucumber_1.Then)('the getResourceLibraryCarbon response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.resourceLibraryCarbonResp.status()).toBe(200);
        (0, test_1.expect)(this.resourceLibraryCarbonResp.ok()).toBeTruthy();
        console.log("ResourceLibraryCarbonResp is retrieved succesfully\n");
        let fetchedResourceLibraryCarbonResp = yield this.resourceLibraryCarbonResp.json();
        (0, test_1.expect)(fetchedResourceLibraryCarbonResp).toHaveProperty('data');
        // console.log(
        //   `ResourceLibraryCarbonResp info is as follows:\n${JSON.stringify(fetchedResourceLibraryCarbonResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the getResourceLibrarySuppliers API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.resourceLibrarySuppliersResp = yield apiHelper.getResourceLibrarySuppliers(token);
    });
});
(0, cucumber_1.Then)('the getResourceLibrarySuppliers response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.resourceLibrarySuppliersResp.status()).toBe(200);
        (0, test_1.expect)(this.resourceLibrarySuppliersResp.ok()).toBeTruthy();
        console.log("ResourceLibrarySuppliersResp is retrieved succesfully\n");
        let fetchedResourceLibrarySuppliersResp = yield this.resourceLibrarySuppliersResp.json();
        (0, test_1.expect)(fetchedResourceLibrarySuppliersResp).toHaveProperty('data');
        // console.log(
        //   `ResourceLibrarySuppliersResp info is as follows:\n${JSON.stringify(fetchedResourceLibrarySuppliersResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the projectResourceBulkUpdate API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.projectResourceBulkUpdateResp = yield apiHelper.projectResourceBulkUpdate(token);
    });
});
(0, cucumber_1.Then)('the projectResourceBulkUpdate response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise(resolve => setTimeout(resolve, 30000));
        (0, test_1.expect)(this.projectResourceBulkUpdateResp.status()).toBe(200);
        (0, test_1.expect)(this.projectResourceBulkUpdateResp.ok()).toBeTruthy();
        console.log("ProjectResourceBulkUpdateResp is retrieved succesfully\n");
        let fetchedProjectResourceBulkUpdateResp = yield this.projectResourceBulkUpdateResp.json();
        (0, test_1.expect)(fetchedProjectResourceBulkUpdateResp).toHaveProperty('data');
        // console.log(
        //   `ProjectResourceBulkUpdateResp info is as follows:\n${JSON.stringify(fetchedProjectResourceBulkUpdateResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the getProjectResource API for id (.*)/, function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.id = id;
        this.getProjectResourceResp = yield apiHelper.getProjectResource(token, this.id);
    });
});
(0, cucumber_1.Then)('the getProjectResource response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise(resolve => setTimeout(resolve, 30000));
        (0, test_1.expect)(this.getProjectResourceResp.status()).toBe(200);
        (0, test_1.expect)(this.getProjectResourceResp.ok()).toBeTruthy();
        console.log("ProjectResourceResp is retrieved succesfully\n");
        let fetchedProjectResourceResp = yield this.getProjectResourceResp.json();
        (0, test_1.expect)(fetchedProjectResourceResp).toHaveProperty('data');
        // console.log(
        //   `ProjectResourceResp info is as follows:\n${JSON.stringify(fetchedProjectResourceResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the projectResourceInsertBulk API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.projectResourceInsertBulkResp = yield apiHelper.projectResourceInsertBulk(token);
    });
});
(0, cucumber_1.Then)('the projectResourceInsertBulk response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise(resolve => setTimeout(resolve, 50000));
        (0, test_1.expect)(this.projectResourceInsertBulkResp.status()).toBe(200);
        (0, test_1.expect)(this.projectResourceInsertBulkResp.ok()).toBeTruthy();
        console.log("ProjectResourceInsertBulkResp is retrieved succesfully\n");
        let fetchedProjectResourceInsertBulkResp = yield this.projectResourceInsertBulkResp.json();
        (0, test_1.expect)(fetchedProjectResourceInsertBulkResp).toHaveProperty('data');
        // console.log(
        //   `ProjectResourceInsertBulkResp info is as follows:\n${JSON.stringify(fetchedProjectResourceInsertBulkResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the deleteProjectResourceInsertBulk API for id (.*) and projectId (.*)/, function (ids, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.ids = ids;
        this.projectId = projectId;
        this.deleteProjectResourceInsertBulkResp = yield apiHelper.deleteProjectResourceInsertBulk(token, this.ids, this.projectId);
    });
});
(0, cucumber_1.Then)('the deleteProjectResourceInsertBulk response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise(resolve => setTimeout(resolve, 50000));
        (0, test_1.expect)(this.deleteProjectResourceInsertBulkResp.status()).toBe(200);
        (0, test_1.expect)(this.deleteProjectResourceInsertBulkResp.ok()).toBeTruthy();
        console.log("DeleteProjectResourceInsertBulkResp is retrieved succesfully\n");
        let fetchedDeleteProjectResourceInsertBulkResp = yield this.deleteProjectResourceInsertBulkResp.json();
        // expect(fetchedDeleteProjectResourceInsertBulkResp).toHaveProperty('data');
        // console.log(
        //   `DeleteProjectResourceInsertBulkResp info is as follows:\n${JSON.stringify(fetchedDeleteProjectResourceInsertBulkResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the fetchProjectResource API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.fetchProjectResourceResp = yield apiHelper.fetchProjectResource(token);
    });
});
(0, cucumber_1.Then)('the fetchProjectResource response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise(resolve => setTimeout(resolve, 30000));
        (0, test_1.expect)(this.fetchProjectResourceResp.status()).toBe(200);
        (0, test_1.expect)(this.fetchProjectResourceResp.ok()).toBeTruthy();
        console.log("FetchProjectResourceResp is retrieved succesfully\n");
        let fetchedFetchProjectResourceResp = yield this.fetchProjectResourceResp.json();
        (0, test_1.expect)(fetchedFetchProjectResourceResp).toHaveProperty('data');
        // console.log(
        //   `FetchProjectResourceResp info is as follows:\n${JSON.stringify(fetchedFetchProjectResourceResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the fetchProjectItem API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.fetchProjectItemResp = yield apiHelper.fetchProjectItem(token);
    });
});
(0, cucumber_1.Then)('the fetchProjectItem response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise(resolve => setTimeout(resolve, 30000));
        (0, test_1.expect)(this.fetchProjectItemResp.status()).toBe(200);
        (0, test_1.expect)(this.fetchProjectItemResp.ok()).toBeTruthy();
        console.log("FetchProjectItemResp is retrieved succesfully\n");
        let fetchedFetchProjectItemResp = yield this.fetchProjectItemResp.json();
        (0, test_1.expect)(fetchedFetchProjectItemResp).toHaveProperty('data');
        // console.log(
        //   `FetchProjectItemResp info is as follows:\n${JSON.stringify(fetchedFetchProjectItemResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the projectItemBulkUpdate API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.projectItemBulkUpdateResp = yield apiHelper.projectItemBulkUpdate(token);
    });
});
(0, cucumber_1.Then)('the projectItemBulkUpdate response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise(resolve => setTimeout(resolve, 30000));
        (0, test_1.expect)(this.projectItemBulkUpdateResp.status()).toBe(200);
        (0, test_1.expect)(this.projectItemBulkUpdateResp.ok()).toBeTruthy();
        console.log("ProjectItemBulkUpdateResp is retrieved succesfully\n");
        let fetchedProjectItemBulkUpdateResp = yield this.projectItemBulkUpdateResp.json();
        (0, test_1.expect)(fetchedProjectItemBulkUpdateResp).toHaveProperty('data');
        // console.log(
        //   `ProjectItemBulkUpdateResp info is as follows:\n${JSON.stringify(fetchedProjectItemBulkUpdateResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the projectItemBulkInsert API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.projectItemBulkInsertResp = yield apiHelper.projectItemBulkInsert(token);
    });
});
(0, cucumber_1.Then)('the projectItemBulkInsert response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise(resolve => setTimeout(resolve, 30000));
        (0, test_1.expect)(this.projectItemBulkInsertResp.status()).toBe(200);
        (0, test_1.expect)(this.projectItemBulkInsertResp.ok()).toBeTruthy();
        console.log("ProjectItemBulkInsertResp is retrieved succesfully\n");
        let fetchedProjectItemBulkInsertResp = yield this.projectItemBulkInsertResp.json();
        (0, test_1.expect)(fetchedProjectItemBulkInsertResp).toHaveProperty('data');
        // console.log(
        //   `ProjectItemBulkInsertResp info is as follows:\n${JSON.stringify(fetchedProjectItemBulkInsertResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the projectSubItemBulkInsert API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.projectSubItemBulkInsertResp = yield apiHelper.projectSubItemBulkInsert(token);
    });
});
(0, cucumber_1.Then)('the projectSubItemBulkInsert response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.projectSubItemBulkInsertResp.status()).toBe(200);
        (0, test_1.expect)(this.projectSubItemBulkInsertResp.ok()).toBeTruthy();
        console.log("ProjectSubItemBulkInsertResp is retrieved succesfully\n");
        let fetchedProjectSubItemBulkInsertResp = yield this.projectSubItemBulkInsertResp.json();
        (0, test_1.expect)(fetchedProjectSubItemBulkInsertResp).toHaveProperty('data');
        // console.log(
        //   `ProjectSubItemBulkInsertResp info is as follows:\n${JSON.stringify(fetchedProjectSubItemBulkInsertResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the getProjectItem API for id (.*)/, function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.id = id;
        this.getProjectItemResp = yield apiHelper.getProjectItem(token, this.id);
    });
});
(0, cucumber_1.Then)('the getProjectItem response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getProjectItemResp.status()).toBe(200);
        (0, test_1.expect)(this.getProjectItemResp.ok()).toBeTruthy();
        console.log("GetProjectItemResp is retrieved succesfully\n");
        let fetchedGetProjectItemResp = yield this.getProjectItemResp.json();
        (0, test_1.expect)(fetchedGetProjectItemResp).toHaveProperty('data');
        // console.log(
        //   `GetProjectItemResp info is as follows:\n${JSON.stringify(fetchedGetProjectItemResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the getSASReportProjectList API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.getSASReportProjectListResp = yield apiHelper.getSASReportProjectList(token);
    });
});
(0, cucumber_1.Then)('the getSASReportProjectList response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getSASReportProjectListResp.status()).toBe(200);
        (0, test_1.expect)(this.getSASReportProjectListResp.ok()).toBeTruthy();
        console.log("GetSASReportProjectListResp is retrieved succesfully\n");
        let fetchedGetSASReportProjectListResp = yield this.getSASReportProjectListResp.json();
        (0, test_1.expect)(fetchedGetSASReportProjectListResp).toHaveProperty('data');
        // console.log(
        //   `GetSASReportProjectListResp info is as follows:\n${JSON.stringify(fetchedGetSASReportProjectListResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the getSASReportProjectById API for id (.*)/, function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.id = id;
        this.getSASReportProjectByIdResp = yield apiHelper.getSASReportProjectById(token, this.id);
    });
});
(0, cucumber_1.Then)('the getSASReportProjectById response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getSASReportProjectByIdResp.status()).toBe(200);
        (0, test_1.expect)(this.getSASReportProjectByIdResp.ok()).toBeTruthy();
        console.log("GetSASReportProjectByIdResp is retrieved succesfully\n");
        let fetchedGetSASReportProjectByIdResp = yield this.getSASReportProjectByIdResp.json();
        (0, test_1.expect)(fetchedGetSASReportProjectByIdResp).toHaveProperty('data');
        // console.log(
        //   `GetSASReportProjectByIdResp info is as follows:\n${JSON.stringify(fetchedGetSASReportProjectByIdResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the getSASReportProjectDetails API for id (.*)/, function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        this.id = id;
        this.getSASReportProjectDetailsResp = yield apiHelper.getSASReportProjectDetails(this.token, this.id);
    });
});
(0, cucumber_1.Then)('the getSASReportProjectDetails response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getSASReportProjectDetailsResp.status()).toBe(200);
        (0, test_1.expect)(this.getSASReportProjectDetailsResp.ok()).toBeTruthy();
        console.log("GetSASReportProjectDetailsResp is retrieved succesfully\n");
        let fetchedGetSASReportProjectDetailsResp = yield this.getSASReportProjectDetailsResp.json();
        (0, test_1.expect)(fetchedGetSASReportProjectDetailsResp).toHaveProperty('data');
        // console.log(
        //   `GetSASReportProjectDetailsResp info is as follows:\n${JSON.stringify(fetchedGetSASReportProjectDetailsResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the getSASCESSReportProjectDetails API for id (.*)/, function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.id = id;
        this.getSASCESSReportProjectDetailsResp = yield apiHelper.getSASCESSReportProjectDetails(token, this.id);
    });
});
(0, cucumber_1.Then)('the getSASCESSReportProjectDetails response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getSASCESSReportProjectDetailsResp.status()).toBe(200);
        (0, test_1.expect)(this.getSASCESSReportProjectDetailsResp.ok()).toBeTruthy();
        console.log("GetSASCESSReportProjectDetailsResp is retrieved succesfully\n");
        let fetchedGetSASCESSReportProjectDetailsResp = yield this.getSASCESSReportProjectDetailsResp.json();
        (0, test_1.expect)(fetchedGetSASCESSReportProjectDetailsResp).toHaveProperty('data');
        // console.log(
        //   `GetSASCESSReportProjectDetailsResp info is as follows:\n${JSON.stringify(fetchedGetSASCESSReportProjectDetailsResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the getItemLibrary API for parameter (.*)/, function (params) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.params = params;
        this.getItemLibraryResp = yield apiHelper.getItemLibrary(token, this.params);
    });
});
(0, cucumber_1.Then)('the getItemLibrary response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getItemLibraryResp.status()).toBe(200);
        (0, test_1.expect)(this.getItemLibraryResp.ok()).toBeTruthy();
        console.log("GetItemLibraryResp is retrieved succesfully\n");
        let fetchedGetItemLibraryResp = yield this.getItemLibraryResp.json();
        (0, test_1.expect)(fetchedGetItemLibraryResp).toHaveProperty('data');
        // console.log(
        //   `GetItemLibraryResp info is as follows:\n${JSON.stringify(fetchedGetItemLibraryResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the getItemLibraryCarbon API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.getItemLibraryCarbonResp = yield apiHelper.getItemLibraryCarbon(token);
    });
});
(0, cucumber_1.Then)('the getItemLibraryCarbon response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getItemLibraryCarbonResp.status()).toBe(200);
        (0, test_1.expect)(this.getItemLibraryCarbonResp.ok()).toBeTruthy();
        console.log("GetItemLibraryCarbonResp is retrieved succesfully\n");
        let fetchedGetItemLibraryCarbonResp = yield this.getItemLibraryCarbonResp.json();
        (0, test_1.expect)(fetchedGetItemLibraryCarbonResp).toHaveProperty('data');
        // console.log(
        //   `GetItemLibraryCarbonResp info is as follows:\n${JSON.stringify(fetchedGetItemLibraryCarbonResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the itemLibraryCarbonUpdate API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.itemLibraryCarbonUpdateResp = yield apiHelper.itemLibraryCarbonUpdate(token);
    });
});
(0, cucumber_1.Then)('the itemLibraryCarbonUpdate response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.itemLibraryCarbonUpdateResp.status()).toBe(200);
        (0, test_1.expect)(this.itemLibraryCarbonUpdateResp.ok()).toBeTruthy();
        console.log("ItemLibraryCarbonUpdateResp is retrieved succesfully\n");
        let fetchedItemLibraryCarbonUpdateResp = yield this.itemLibraryCarbonUpdateResp.json();
        (0, test_1.expect)(fetchedItemLibraryCarbonUpdateResp).toHaveProperty('data');
        // console.log(
        //   `ItemLibraryCarbonUpdateResp info is as follows:\n${JSON.stringify(fetchedItemLibraryCarbonUpdateResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the getJourneyLegs API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.getJourneyLegsResp = yield apiHelper.getJourneyLegs(token);
    });
});
(0, cucumber_1.Then)('the getJourneyLegs response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getJourneyLegsResp.status()).toBe(200);
        (0, test_1.expect)(this.getJourneyLegsResp.ok()).toBeTruthy();
        console.log("GetJourneyLegsResp is retrieved succesfully\n");
        let fetchedGetJourneyLegsResp = yield this.getJourneyLegsResp.json();
        (0, test_1.expect)(fetchedGetJourneyLegsResp).toHaveProperty('data');
        // console.log(
        //   `GetJourneyLegsResp info is as follows:\n${JSON.stringify(fetchedGetJourneyLegsResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the deleteMultipleJourneyLegs API for id (.*)/, function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.id = id;
        this.deleteMultipleJourneyLegsResp = yield apiHelper.deleteMultipleJourneyLegs(token, this.id);
    });
});
(0, cucumber_1.Then)('the deleteMultipleJourneyLegs response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.deleteMultipleJourneyLegsResp.status()).toBe(200);
        (0, test_1.expect)(this.deleteMultipleJourneyLegsResp.ok()).toBeTruthy();
        console.log("DeleteMultipleJourneyLegsResp is retrieved succesfully\n");
        let fetchedDeleteMultipleJourneyLegsResp = yield this.deleteMultipleJourneyLegsResp.json();
        (0, test_1.expect)(fetchedDeleteMultipleJourneyLegsResp).toHaveProperty('data');
        // console.log(
        //   `DeleteMultipleJourneyLegsResp info is as follows:\n${JSON.stringify(fetchedDeleteMultipleJourneyLegsResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the getCESSReport API for parameter (.*)/, function (params) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        const processedParams = params.replace(/or/g, '||');
        this.params = processedParams;
        this.getCESSReportResp = yield apiHelper.getCESSReport(token, this.params);
    });
});
(0, cucumber_1.Then)('the getCESSReport response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getCESSReportResp.status()).toBe(200);
        (0, test_1.expect)(this.getCESSReportResp.ok()).toBeTruthy();
        console.log("GetCESSReportResp is retrieved succesfully\n");
        let fetchedGetCESSReportResp = yield this.getCESSReportResp.json();
        (0, test_1.expect)(fetchedGetCESSReportResp).toHaveProperty('data');
        // console.log(
        //   `GetCESSReportResp info is as follows:\n${JSON.stringify(fetchedGetCESSReportResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the getCESSReportAgg API for parameter (.*)/, function (params) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        const processedParams = params.replace(/or/g, '||');
        this.params = processedParams;
        this.getCESSReportAggResp = yield apiHelper.getCESSReportAgg(token, this.params);
    });
});
(0, cucumber_1.Then)('the getCESSReportAgg response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getCESSReportAggResp.status()).toBe(200);
        (0, test_1.expect)(this.getCESSReportAggResp.ok()).toBeTruthy();
        console.log("GetCESSReportAggResp is retrieved succesfully\n");
        let fetchedGetCESSReportAggResp = yield this.getCESSReportAggResp.json();
        (0, test_1.expect)(fetchedGetCESSReportAggResp).toHaveProperty('data');
        // console.log(
        //   `GetCESSReportAggResp info is as follows:\n${JSON.stringify(fetchedGetCESSReportAggResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the getProjectAggr API for id (.*) and parameter (.*)/, function (id, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.id = id;
        this.params = params;
        this.getProjectAggrResp = yield apiHelper.getProjectAggr(token, this.id, this.params);
    });
});
(0, cucumber_1.Then)('the getProjectAggr response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getProjectAggrResp.status()).toBe(200);
        (0, test_1.expect)(this.getProjectAggrResp.ok()).toBeTruthy();
        console.log("GetProjectAggrResp is retrieved succesfully\n");
        let fetchedGetProjectAggrResp = yield this.getProjectAggrResp.json();
        (0, test_1.expect)(fetchedGetProjectAggrResp).toHaveProperty('data');
        // console.log(
        //   `GetProjectAggrResp info is as follows:\n${JSON.stringify(fetchedGetProjectAggrResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the ProjectAggrIFTCOMP API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.ProjectAggrIFTCOMPResp = yield apiHelper.getProjectAggrIFTCOMP(token);
    });
});
(0, cucumber_1.Then)('the ProjectAggrIFTCOMP response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.ProjectAggrIFTCOMPResp.status()).toBe(200);
        (0, test_1.expect)(this.ProjectAggrIFTCOMPResp.ok()).toBeTruthy();
        console.log("ProjectAggrIFTCOMPResp is retrieved succesfully\n");
        let fetchedProjectAggrIFTCOMPResp = yield this.ProjectAggrIFTCOMPResp.json();
        (0, test_1.expect)(fetchedProjectAggrIFTCOMPResp).toHaveProperty('data');
        // console.log(
        //   `ProjectAggrIFTCOMPResp info is as follows:\n${JSON.stringify(fetchedProjectAggrIFTCOMPResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the createContractEstimateLibrary API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.createContractEstimateLibraryResp = yield apiHelper.createContractEstimateLibrary(token);
    });
});
(0, cucumber_1.Then)('the createContractEstimateLibrary response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.createContractEstimateLibraryResp.status()).toBe(200);
        (0, test_1.expect)(this.createContractEstimateLibraryResp.ok()).toBeTruthy();
        console.log("CreateContractEstimateLibraryResp is retrieved succesfully\n");
        let fetchedCreateContractEstimateLibraryResp = yield this.createContractEstimateLibraryResp.json();
        (0, test_1.expect)(fetchedCreateContractEstimateLibraryResp).toHaveProperty('data');
        // console.log(
        //   `CreateContractEstimateLibraryResp info is as follows:\n${JSON.stringify(fetchedCreateContractEstimateLibraryResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the getResourceEpd API for id (.*)/, function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.id = id;
        this.getResourceEpdResp = yield apiHelper.getResourceEpd(token, this.id);
    });
});
(0, cucumber_1.Then)('the getResourceEpd response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getResourceEpdResp.status()).toBe(200);
        (0, test_1.expect)(this.getResourceEpdResp.ok()).toBeTruthy();
        console.log("GetResourceEpdResp is retrieved succesfully\n");
        let fetchedGetResourceEpdResp = yield this.getResourceEpdResp.json();
        (0, test_1.expect)(fetchedGetResourceEpdResp).toHaveProperty('data');
        // console.log(
        //   `GetResourceEpdResp info is as follows:\n${JSON.stringify(fetchedGetResourceEpdResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the createResourceEpd API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.createResourceEpdResp = yield apiHelper.createResourceEpd(token);
    });
});
(0, cucumber_1.Then)('the createResourceEpd response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.createResourceEpdResp.status()).toBe(200);
        (0, test_1.expect)(this.createResourceEpdResp.ok()).toBeTruthy();
        console.log("CreateResourceEpdResp is retrieved succesfully\n");
        let fetchedCreateResourceEpdResp = yield this.createResourceEpdResp.json();
        (0, test_1.expect)(fetchedCreateResourceEpdResp).toHaveProperty('data');
        // console.log(
        //   `CreateResourceEpdResp info is as follows:\n${JSON.stringify(fetchedCreateResourceEpdResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the updateResourceEpd API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.updateResourceEpdResp = yield apiHelper.updateResourceEpd(token);
    });
});
(0, cucumber_1.Then)('the updateResourceEpd response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.updateResourceEpdResp.status()).toBe(200);
        (0, test_1.expect)(this.updateResourceEpdResp.ok()).toBeTruthy();
        console.log("UpdateResourceEpdResp is retrieved succesfully\n");
        let fetchedUpdateResourceEpdResp = yield this.updateResourceEpdResp.json();
        (0, test_1.expect)(fetchedUpdateResourceEpdResp).toHaveProperty('data');
        // console.log(
        //   `UpdateResourceEpdResp info is as follows:\n${JSON.stringify(fetchedUpdateResourceEpdResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the projectAggrIFTCOMP API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.AggrIFTCOMPResp = yield apiHelper.projectAggrIFTCOMP(token);
    });
});
(0, cucumber_1.Then)('the projectAggrIFTCOMP response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.AggrIFTCOMPResp.status()).toBe(200);
        (0, test_1.expect)(this.AggrIFTCOMPResp.ok()).toBeTruthy();
        console.log("AggrIFTCOMPResp is retrieved succesfully\n");
        let fetchedAggrIFTCOMPResp = yield this.AggrIFTCOMPResp.json();
        (0, test_1.expect)(fetchedAggrIFTCOMPResp).toHaveProperty('data');
        // console.log(
        //   `AggrIFTCOMPResp info is as follows:\n${JSON.stringify(fetchedAggrIFTCOMPResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the inflationSheetIndex API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.inflationSheetIndexResp = yield apiHelper.inflationSheetIndex(token);
    });
});
(0, cucumber_1.Then)('the inflationSheetIndex response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.inflationSheetIndexResp.status()).toBe(200);
        (0, test_1.expect)(this.inflationSheetIndexResp.ok()).toBeTruthy();
        console.log("InflationSheetIndexResp is retrieved succesfully\n");
        let fetchedInflationSheetIndexResp = yield this.inflationSheetIndexResp.json();
        (0, test_1.expect)(fetchedInflationSheetIndexResp).toHaveProperty('data');
        // console.log(
        //   `InflationSheetIndexResp info is as follows:\n${JSON.stringify(fetchedInflationSheetIndexResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the getCodes API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.getCodesResp = yield apiHelper.getCodes(token);
    });
});
(0, cucumber_1.Then)('the getCodes response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getCodesResp.status()).toBe(200);
        (0, test_1.expect)(this.getCodesResp.ok()).toBeTruthy();
        console.log("GetCodesResp is retrieved succesfully\n");
        let fetchedGetCodesResp = yield this.getCodesResp.json();
        (0, test_1.expect)(fetchedGetCodesResp).toHaveProperty('data');
        // console.log(
        //   `GetCodesResp info is as follows:\n${JSON.stringify(fetchedGetCodesResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the getFuelUserCodes API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.getFuelUserCodesResp = yield apiHelper.getFuelUserCodes(token);
    });
});
(0, cucumber_1.Then)('the getFuelUserCodes response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        // expect(this.getFuelUserCodesResp.status()).toBe(200);
        (0, test_1.expect)(this.getFuelUserCodesResp.ok()).toBeTruthy();
        console.log("GetFuelUserCodesResp is retrieved succesfully\n");
        let fetchedGetFuelUserCodesResp = yield this.getFuelUserCodesResp.json();
        // expect(fetchedGetFuelUserCodesResp).toHaveProperty('Properties');
        // console.log(
        //   `GetFuelUserCodesResp info is as follows:\n${JSON.stringify(fetchedGetFuelUserCodesResp)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the getCodeTypeUnitAggr API for parameter (.*)/, function (param) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        const processedParams = param.replace(/or/g, '||');
        this.param = processedParams;
        this.getCodeTypeUnitAggrResp = yield apiHelper.getCodeTypeUnitAggr(token, this.param);
    });
});
(0, cucumber_1.Then)('the getCodeTypeUnitAggr response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getCodeTypeUnitAggrResp.status()).toBe(200);
        (0, test_1.expect)(this.getCodeTypeUnitAggrResp.ok()).toBeTruthy();
        console.log("GetCodeTypeUnitAggrResp is retrieved succesfully\n");
        let fetchedGetCodeTypeUnitAggrResp = yield this.getCodeTypeUnitAggrResp.json();
        (0, test_1.expect)(fetchedGetCodeTypeUnitAggrResp).toHaveProperty('data');
        // console.log(
        //   `GetCodeTypeUnitAggrResp info is as follows:\n${JSON.stringify(fetchedGetCodeTypeUnitAggrResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the getTransportAssumption API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.getTransportResp = yield apiHelper.getTransportAssumption(token);
    });
});
(0, cucumber_1.Then)('the getTransportAssumption response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getTransportResp.status()).toBe(200);
        (0, test_1.expect)(this.getTransportResp.ok()).toBeTruthy();
        console.log("GetTransportResp is retrieved succesfully\n");
        let fetchedGetTransportResp = yield this.getTransportResp.json();
        (0, test_1.expect)(fetchedGetTransportResp).toHaveProperty('data');
        // console.log(
        //   `GetTransportResp info is as follows:\n${JSON.stringify(fetchedGetTransportResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the addJourneyLeg API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.addJourneyLegResp = yield apiHelper.addJourneyLeg(token);
    });
});
(0, cucumber_1.Then)('the addJourneyLeg response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.addJourneyLegResp.status()).toBe(200);
        (0, test_1.expect)(this.addJourneyLegResp.ok()).toBeTruthy();
        console.log("AddJourneyLegResp is retrieved succesfully\n");
        let fetchedAddJourneyLegResp = yield this.addJourneyLegResp.json();
        (0, test_1.expect)(fetchedAddJourneyLegResp).toHaveProperty('data');
        // console.log(
        //   `AddJourneyLegResp info is as follows:\n${JSON.stringify(fetchedAddJourneyLegResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the deleteJourneyLeg API for id (.*)/, function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.id = id;
        this.deleteJourneyLegResp = yield apiHelper.deleteJourneyLeg(token, this.id);
    });
});
(0, cucumber_1.Then)('the deleteJourneyLeg response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.deleteJourneyLegResp.status()).toBe(200);
        (0, test_1.expect)(this.deleteJourneyLegResp.ok()).toBeTruthy();
        console.log("DeleteJourneyLegResp is retrieved succesfully\n");
        let fetchedDeleteJourneyLegResp = yield this.deleteJourneyLegResp.json();
        (0, test_1.expect)(fetchedDeleteJourneyLegResp).toHaveProperty('data');
        // console.log(
        //   `DeleteJourneyLegResp info is as follows:\n${JSON.stringify(fetchedDeleteJourneyLegResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the getContractEstimateLibraryContent API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.contractEstimateLibraryContentResp = yield apiHelper.getContractEstimateLibraryContent(token);
    });
});
(0, cucumber_1.Then)('the getContractEstimateLibraryContent response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.contractEstimateLibraryContentResp.status()).toBe(200);
        (0, test_1.expect)(this.contractEstimateLibraryContentResp.ok()).toBeTruthy();
        console.log("ContractEstimateLibraryContentResp is retrieved succesfully\n");
        let fetchedCELResp = yield this.contractEstimateLibraryContentResp.json();
        (0, test_1.expect)(fetchedCELResp).toHaveProperty('data');
        // console.log(
        //   `ContractEstimateLibraryContentResp info is as follows:\n${JSON.stringify(fetchedCELResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the getContractEstimateLibraryContentAssured API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.assuredResp = yield apiHelper.getContractEstimateLibraryContentAssured(token);
    });
});
(0, cucumber_1.Then)('the getContractEstimateLibraryContentAssured response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.assuredResp.status()).toBe(200);
        (0, test_1.expect)(this.assuredResp.ok()).toBeTruthy();
        console.log("ContractEstimateLibraryContentAssuredResp is retrieved succesfully\n");
        let fetchedCELAResp = yield this.assuredResp.json();
        (0, test_1.expect)(fetchedCELAResp).toHaveProperty('data');
        // console.log(
        //   `ContractEstimateLibraryContentAssuredResp info is as follows:\n${JSON.stringify(fetchedCELAResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)('the user makes the call to verify the getUsers API', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.getUsersResp = yield apiHelper.getUsers(token);
    });
});
(0, cucumber_1.Then)('the getUsers response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getUsersResp.status()).toBe(200);
        (0, test_1.expect)(this.getUsersResp.ok()).toBeTruthy();
        console.log("GetUsersResp is retrieved succesfully\n");
        let fetchedGetUsersResp = yield this.getUsersResp.json();
        (0, test_1.expect)(fetchedGetUsersResp).toHaveProperty('data');
        // console.log(
        //   `GetUsersResp info is as follows:\n${JSON.stringify(fetchedGetUsersResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the getUserById API for id (.*)/, function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.id = id;
        this.getUserByIdResp = yield apiHelper.getUserById(token, this.id);
    });
});
(0, cucumber_1.Then)('the getUserById response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getUserByIdResp.status()).toBe(200);
        (0, test_1.expect)(this.getUserByIdResp.ok()).toBeTruthy();
        console.log("GetUserByIdResp is retrieved succesfully\n");
        let fetchedGetUserByIdResp = yield this.getUserByIdResp.json();
        (0, test_1.expect)(fetchedGetUserByIdResp).toHaveProperty('data');
        // console.log(
        //   `GetUserByIdResp info is as follows:\n${JSON.stringify(fetchedGetUserByIdResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the getRiskRegister API for projectId (.*)/, function (projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.projectId = projectId;
        this.getRiskRegisterResp = yield apiHelper.getRiskRegister(token, this.projectId);
    });
});
(0, cucumber_1.Then)('the getRiskRegister response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.getRiskRegisterResp.status()).toBe(200);
        (0, test_1.expect)(this.getRiskRegisterResp.ok()).toBeTruthy();
        console.log("GetRiskRegisterResp is retrieved succesfully\n");
        let fetchedGetRiskRegisterResp = yield this.getRiskRegisterResp.json();
        (0, test_1.expect)(fetchedGetRiskRegisterResp).toHaveProperty('data');
        // console.log(
        //   `GetRiskRegisterResp info is as follows:\n${JSON.stringify(fetchedGetRiskRegisterResp.data)}\n\n`
        // );
    });
});
(0, cucumber_1.When)(/^the user makes the call to verify the getSupplierResource API for libraryCode (.*)/, function (libraryCode) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield readTokenFromFile();
        this.libraryCode = libraryCode;
        this.supplierResourceResp = yield apiHelper.getSupplierResource(token, this.libraryCode);
    });
});
(0, cucumber_1.Then)('the getSupplierResource response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.supplierResourceResp.status()).toBe(200);
        (0, test_1.expect)(this.supplierResourceResp.ok()).toBeTruthy();
        console.log("GetSupplierResource is retrieved succesfully\n");
        let fetchedGetSupplierResource = yield this.supplierResourceResp.json();
        (0, test_1.expect)(fetchedGetSupplierResource).toHaveProperty('data');
        // console.log(
        //   `GetSupplierResource info is as follows:\n${JSON.stringify(fetchedGetSupplierResource.data)}\n\n`
        // );
    });
});
// When('the user makes the call to verify the assignRevisionContract API', async function () {        
//   this.assignRevisionContract = await apiHelper.assignRevisionContract(this.token); 
// });
(0, cucumber_1.Then)('the assignRevisionContract response is success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.assignRevisionContract.status()).toBe(200);
        (0, test_1.expect)(this.assignRevisionContract.ok()).toBeTruthy();
        console.log("GetSupplierResource is retrieved succesfully\n");
        let fetchedassignRevisionContract = yield this.assignRevisionContract.json();
        (0, test_1.expect)(fetchedassignRevisionContract).toHaveProperty('data');
        console.log(`GetSupplierResource info is as follows:\n${JSON.stringify(fetchedassignRevisionContract.data)}\n\n`);
    });
});
