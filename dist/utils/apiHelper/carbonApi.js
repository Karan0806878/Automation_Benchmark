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
exports.getSignIn = getSignIn;
exports.getCurrentUserInfo = getCurrentUserInfo;
exports.getServicesHealth = getServicesHealth;
exports.getEstimateRevision = getEstimateRevision;
exports.getCarbonExpenProfile = getCarbonExpenProfile;
exports.getSectionAggregate = getSectionAggregate;
exports.getResourceAggregate = getResourceAggregate;
exports.getAllProject = getAllProject;
exports.getProjectMetaAll = getProjectMetaAll;
exports.createRevision = createRevision;
exports.getRevision = getRevision;
exports.getProjectById = getProjectById;
exports.IFTSpend = IFTSpend;
exports.IFTInflation = IFTInflation;
exports.IFTResult = IFTResult;
exports.getRoles = getRoles;
exports.getAccessList = getAccessList;
exports.getAccessLevel = getAccessLevel;
exports.getRoleAccess = getRoleAccess;
exports.createRoleAccess = createRoleAccess;
exports.scheduleUpdate = scheduleUpdate;
exports.getResourceLibraryForSpecificGroup = getResourceLibraryForSpecificGroup;
exports.resourceLibraryInsertBulk = resourceLibraryInsertBulk;
exports.getSchedule = getSchedule;
exports.getResourceLibraryCarbon = getResourceLibraryCarbon;
exports.getResourceLibrarySuppliers = getResourceLibrarySuppliers;
exports.projectResourceBulkUpdate = projectResourceBulkUpdate;
exports.getProjectResource = getProjectResource;
exports.projectResourceInsertBulk = projectResourceInsertBulk;
exports.deleteProjectResourceInsertBulk = deleteProjectResourceInsertBulk;
exports.fetchProjectResource = fetchProjectResource;
exports.fetchProjectItem = fetchProjectItem;
exports.projectItemBulkUpdate = projectItemBulkUpdate;
exports.projectItemBulkInsert = projectItemBulkInsert;
exports.projectSubItemBulkInsert = projectSubItemBulkInsert;
exports.getProjectItem = getProjectItem;
exports.getSASReportProjectList = getSASReportProjectList;
exports.getSASReportProjectById = getSASReportProjectById;
exports.getSASReportProjectDetails = getSASReportProjectDetails;
exports.getSASCESSReportProjectDetails = getSASCESSReportProjectDetails;
exports.getItemLibrary = getItemLibrary;
exports.getItemLibraryCarbon = getItemLibraryCarbon;
exports.itemLibraryCarbonUpdate = itemLibraryCarbonUpdate;
exports.getJourneyLegs = getJourneyLegs;
exports.deleteMultipleJourneyLegs = deleteMultipleJourneyLegs;
exports.getCESSReport = getCESSReport;
exports.getCESSReportAgg = getCESSReportAgg;
exports.getProjectAggr = getProjectAggr;
exports.getProjectAggrIFTCOMP = getProjectAggrIFTCOMP;
exports.createContractEstimateLibrary = createContractEstimateLibrary;
exports.getResourceEpd = getResourceEpd;
exports.createResourceEpd = createResourceEpd;
exports.updateResourceEpd = updateResourceEpd;
exports.projectAggrIFTCOMP = projectAggrIFTCOMP;
exports.inflationSheetIndex = inflationSheetIndex;
exports.getCodes = getCodes;
exports.getFuelUserCodes = getFuelUserCodes;
exports.getCodeTypeUnitAggr = getCodeTypeUnitAggr;
exports.getTransportAssumption = getTransportAssumption;
exports.addJourneyLeg = addJourneyLeg;
exports.deleteJourneyLeg = deleteJourneyLeg;
exports.getContractEstimateLibraryContent = getContractEstimateLibraryContent;
exports.getContractEstimateLibraryContentAssured = getContractEstimateLibraryContentAssured;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.getRiskRegister = getRiskRegister;
exports.getSupplierResource = getSupplierResource;
exports.assignRevisionContract = assignRevisionContract;
const test_1 = require("@playwright/test");
const data = __importStar(require("../data/fixtures.data.json"));
const loginToken_1 = require("../apiHelper/loginToken");
function getSignIn() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.post("/auth/login", {
            data: {
                Username: process.env.CCFTADMINUSERNAME,
                Password: process.env.CCFTPASSWORD,
                ConnectionName: process.env.CONNECTIONNAME,
            },
        });
        return response;
    });
}
function getCurrentUserInfo(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/currentUserInfo", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getServicesHealth(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/health", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getCarbonExpenProfile(tokenString, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/sas-report/project/${projectId}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getEstimateRevision(tokenString, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/estimate-revisions/${projectId}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getSectionAggregate(tokenString, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/project-aggr/project/${projectId}?aggregatedOn=SECTION`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getResourceAggregate(tokenString, projectId, sectionID) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/project-aggr/project/${projectId}?aggregatedOn=ITEM_RESOURCE_TREE&sectionId=${sectionID}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getAllProject(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/projects", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getProjectById(tokenString, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/project/${id}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getProjectMetaAll(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/projects/meta/all?Comparator=true&isAuthorisedOnly=true", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function createRevision(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.post("/estimate-revision", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
            data: {
                ProjectId: 22302
            }
        });
        return response;
    });
}
function getRevision(tokenString, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/supplier-rescources/SmallTool?ProjectId=${projectId}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function IFTSpend(tokenString, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/ift/spendProfile/${projectId}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function IFTInflation(tokenString, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/ift/inflation/${projectId}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function IFTResult(tokenString, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/ift/result/${projectId}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getRoles(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/role", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getAccessList(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/accessList", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getAccessLevel(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/accessLevel", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getRoleAccess(tokenString, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/roleAccess/${id}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function createRoleAccess(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.post("/roleAccess", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
            data: data.createRoleAccessData
        });
        return response;
    });
}
function scheduleUpdate(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.put("/schedule/63", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
            data: data.scheduleUpdateData
        });
        return response;
    });
}
function getSchedule(tokenString, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/schedule?${params}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            }
        });
        return response;
    });
}
function getResourceLibraryForSpecificGroup(tokenString, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/resource-library?RESOURCE_GROUP_ID=${id}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function resourceLibraryInsertBulk(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.post("/resource-library-carbon/bulk", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
            data: {
                "bulk": [
                    {
                        "RESOURCE_LIBRARY_ID": 120,
                        "SUBCONTRACTOR_ID": 52,
                        "REGION_ID": 30,
                        "EPD_ID": 20
                    },
                    {
                        "RESOURCE_LIBRARY_ID": 120,
                        "SUBCONTRACTOR_ID": 52,
                        "REGION_ID": 30,
                        "EPD_ID": 20
                    }
                ]
            }
        });
        return response;
    });
}
function getResourceLibraryCarbon(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/resource-library-carbon", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getResourceLibrarySuppliers(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/resource-library/contractor/OfficCons", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function projectResourceBulkUpdate(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.put("/project-resource/bulk", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
            data: data.projectResourceBulkUpdateData
        });
        return response;
    });
}
function getProjectResource(tokenString, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/project-resource/${id}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function projectResourceInsertBulk(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.post("/project-resource/bulk", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
            data: data.projectResourceInsertBulkData
        });
        return response;
    });
}
function deleteProjectResourceInsertBulk(tokenString, ids, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.delete(`/project-resource?ids=${ids}&projectId=${projectId}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function fetchProjectResource(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/resource-group", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function fetchProjectItem(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/item-group", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function projectItemBulkUpdate(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.put("/project-item/bulk", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
            data: data.projectItemBulkUpdateData
        });
        return response;
    });
}
function projectItemBulkInsert(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.post("/project-item/bulk", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
            data: data.projectItemBulkInsertData
        });
        return response;
    });
}
function projectSubItemBulkInsert(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.post("/project-sub-item/bulk", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
            data: data.projectSubItemBulkInsertData
        });
        return response;
    });
}
function getProjectItem(tokenString, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/project-item/${id}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            }
        });
        return response;
    });
}
function getSASReportProjectList(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/sas-report/project/list", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getSASReportProjectById(tokenString, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/sas-report/project/${id}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getSASReportProjectDetails(tokenString, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/sas-report/project/${id}/detail?format=true`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getSASCESSReportProjectDetails(tokenString, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/sas-report/cess-report/${id}/detail?format=true`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getItemLibrary(tokenString, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/item-library?${params}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getItemLibraryCarbon(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/item-library/carbon", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function itemLibraryCarbonUpdate(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.put("/item-library/carbon/bulk", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
            data: data.itemLibraryCarbonUpdateData
        });
        return response;
    });
}
function getJourneyLegs(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/journey-leg", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function deleteMultipleJourneyLegs(tokenString, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.delete(`/journey-leg/${id}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getCESSReport(tokenString, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/cess-report?${params}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getCESSReportAgg(tokenString, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/cess-report-agg?${params}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getProjectAggr(tokenString, id, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/project-aggr/project/${id}?${params}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getProjectAggrIFTCOMP(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.post("/project-aggr/ift-comp-costelement", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
            data: data.projectAggrIFTCOMPData
        });
        return response;
    });
}
function createContractEstimateLibrary(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.post("/contract-estimate-library", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
            data: data.createContractEstimateData
        });
        return response;
    });
}
function getResourceEpd(tokenString, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/resourceEpd/${id}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function createResourceEpd(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.post("/resourceEpd", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
            data: data.createResourceEpdData
        });
        return response;
    });
}
function updateResourceEpd(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.post("/resourceEpd", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
            data: data.updateResourceEpdData
        });
        return response;
    });
}
function projectAggrIFTCOMP(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.post("/project-aggr/ift-comp", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
            data: data.projectAggrIFTCOMPData
        });
        return response;
    });
}
function inflationSheetIndex(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/admin/inflation-sheet-index-access", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getCodes(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/codes", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getFuelUserCodes(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/bes/usercodes/Fuel%20or%20Labour%20Type", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getCodeTypeUnitAggr(tokenString, param) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/codetype-unit?${param}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getTransportAssumption(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/transport-assumption", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function addJourneyLeg(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.post("/journey-leg/bulk", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
            data: data.addJourneyLegData
        });
        return response;
    });
}
function deleteJourneyLeg(tokenString, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.delete(`/journey-leg/${id}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getContractEstimateLibraryContent(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/contract-estimate-library/content", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getContractEstimateLibraryContentAssured(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.put("/contract-estimate-library/content/assured", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
            data: data.getContractEstimateLibraryContentAssuredData
        });
        return response;
    });
}
function getUsers(tokenString) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get("/user", {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getUserById(tokenString, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/user/${id}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getRiskRegister(tokenString, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/risk-register/project/${projectId}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function getSupplierResource(tokenString, libraryCode) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        const response = yield apiContext.get(`/supplier-rescources/${libraryCode}`, {
            headers: {
                Authorization: "Bearer " + tokenString,
            },
        });
        return response;
    });
}
function assignRevisionContract(projectId, revisionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = (0, loginToken_1.getToken)();
        const apiContext = yield test_1.request.newContext({
            baseURL: data.carbonLowCarbApi,
        });
        console.log(token);
        console.log(projectId);
        console.log(revisionId);
        const response = yield apiContext.post("/assignRevisionContractors", {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json", // Specify JSON content type
            },
            data: JSON.stringify({
                "REVISION_ID": revisionId,
                "PARENT_PROJ_ID": projectId,
                "CONTRACTORS": [],
            }),
        });
        // const response = await apiContext.post("/assignRevisionContractors", {
        //   headers: {
        //     Authorization: "Bearer " + token,
        //   },
        //   data: {"REVISION_ID":revisionId,"PARENT_PROJ_ID":projectId,"CONTRACTORS":[]}
        // });
        return response;
    });
}
