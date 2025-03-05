import { request, APIRequestContext } from "@playwright/test";
import * as data from "../data/fixtures.data.json";
import { getToken } from '../apiHelper/loginToken';

async function getSignIn() {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.post("/auth/login", {
    data: {
      Username: process.env.CCFTADMINUSERNAME,
      Password: process.env.CCFTPASSWORD,
      ConnectionName: process.env.CONNECTIONNAME,
    },
  });
  return response;
}

async function getCurrentUserInfo(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/currentUserInfo", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response;
}

async function getServicesHealth(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/health", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response;
}

async function getCarbonExpenProfile(tokenString: string, projectId: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/sas-report/project/${projectId}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response;
}

async function getEstimateRevision(tokenString: string, projectId: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/estimate-revisions/${projectId}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response;
}

async function getSectionAggregate(tokenString: string, projectId: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/project-aggr/project/${projectId}?aggregatedOn=SECTION`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response;
}

async function getResourceAggregate(tokenString: string, projectId: string, sectionID: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/project-aggr/project/${projectId}?aggregatedOn=ITEM_RESOURCE_TREE&sectionId=${sectionID}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response;
}

async function getAllProject(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/projects", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getProjectById(tokenString: string, id: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/project/${id}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getProjectMetaAll(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/projects/meta/all?Comparator=true&isAuthorisedOnly=true", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function createRevision(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.post("/estimate-revision", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
    data: {
      ProjectId: 22302
    }
  });
  return response
}

async function getRevision(tokenString: string, projectId: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/supplier-rescources/SmallTool?ProjectId=${projectId}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function IFTSpend(tokenString: string, projectId: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/ift/spendProfile/${projectId}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function IFTInflation(tokenString: string, projectId: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/ift/inflation/${projectId}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function IFTResult(tokenString: string, projectId: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/ift/result/${projectId}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getRoles(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/role", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getAccessList(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/accessList", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getAccessLevel(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/accessLevel", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getRoleAccess(tokenString: string, id: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/roleAccess/${id}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function createRoleAccess(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.post("/roleAccess", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
    data: data.createRoleAccessData
  });
  return response
}

async function scheduleUpdate(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.put("/schedule/63", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
   data: data.scheduleUpdateData
  });
  return response
}

async function getSchedule(tokenString: string, params: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/schedule?${params}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    }
  });
  return response
}

async function getResourceLibraryForSpecificGroup(tokenString: string, id: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/resource-library?RESOURCE_GROUP_ID=${id}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function resourceLibraryInsertBulk(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.post("/resource-library-carbon/bulk", {
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
  return response
}

async function getResourceLibraryCarbon(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/resource-library-carbon", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getResourceLibrarySuppliers(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/resource-library/contractor/OfficCons", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function projectResourceBulkUpdate(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.put("/project-resource/bulk", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
    data: data.projectResourceBulkUpdateData
  });
  return response
}

async function getProjectResource(tokenString: string, id: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/project-resource/${id}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function projectResourceInsertBulk(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.post("/project-resource/bulk", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
    data: data.projectResourceInsertBulkData
  });
  return response
}

async function deleteProjectResourceInsertBulk(tokenString: string, ids: string, projectId: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.delete(`/project-resource?ids=${ids}&projectId=${projectId}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function fetchProjectResource(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/resource-group", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function fetchProjectItem(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/item-group", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function projectItemBulkUpdate(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.put("/project-item/bulk", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
    data: data.projectItemBulkUpdateData
  });
  return response
}

async function projectItemBulkInsert(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.post("/project-item/bulk", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
    data: data.projectItemBulkInsertData
  });
  return response
}

async function projectSubItemBulkInsert(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.post("/project-sub-item/bulk", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
    data: data.projectSubItemBulkInsertData
  });
  return response
}

async function getProjectItem(tokenString: string, id: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/project-item/${id}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    }
  });
  return response
}

async function getSASReportProjectList(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/sas-report/project/list", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getSASReportProjectById(tokenString: string, id:string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/sas-report/project/${id}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getSASReportProjectDetails(tokenString: string, id:string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/sas-report/project/${id}/detail?format=true`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getSASCESSReportProjectDetails(tokenString: string, id: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/sas-report/cess-report/${id}/detail?format=true`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getItemLibrary(tokenString: string, params: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/item-library?${params}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getItemLibraryCarbon(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/item-library/carbon", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function itemLibraryCarbonUpdate(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.put("/item-library/carbon/bulk", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
    data: data.itemLibraryCarbonUpdateData
  });
  return response
}

async function getJourneyLegs(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/journey-leg", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function deleteMultipleJourneyLegs(tokenString: string, id: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.delete(`/journey-leg/${id}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getCESSReport(tokenString: string, params: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/cess-report?${params}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getCESSReportAgg(tokenString: string, params: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/cess-report-agg?${params}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getProjectAggr(tokenString: string, id: string, params: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/project-aggr/project/${id}?${params}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getProjectAggrIFTCOMP(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.post("/project-aggr/ift-comp-costelement", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
    data: data.projectAggrIFTCOMPData
  });
  return response
}

async function createContractEstimateLibrary(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.post("/contract-estimate-library", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
    data: data.createContractEstimateData
  });
  return response
}

async function getResourceEpd(tokenString: string, id: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/resourceEpd/${id}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function createResourceEpd(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.post("/resourceEpd", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
    data: data.createResourceEpdData
  });
  return response
}

async function updateResourceEpd(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.post("/resourceEpd", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
    data: data.updateResourceEpdData
  });
  return response
}

async function projectAggrIFTCOMP(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.post("/project-aggr/ift-comp", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
    data: data.projectAggrIFTCOMPData
  });
  return response
}

async function inflationSheetIndex(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/admin/inflation-sheet-index-access", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getCodes(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/codes", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getFuelUserCodes(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/bes/usercodes/Fuel%20or%20Labour%20Type", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getCodeTypeUnitAggr(tokenString: string, param: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/codetype-unit?${param}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getTransportAssumption(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/transport-assumption", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function addJourneyLeg(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.post("/journey-leg/bulk", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
    data: data.addJourneyLegData
  });
  return response
}

async function deleteJourneyLeg(tokenString: string, id: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.delete(`/journey-leg/${id}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getContractEstimateLibraryContent(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/contract-estimate-library/content", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getContractEstimateLibraryContentAssured(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.put("/contract-estimate-library/content/assured", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
    data: data.getContractEstimateLibraryContentAssuredData
  });
  return response
}

async function getUsers(tokenString: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get("/user", {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getUserById(tokenString: string, id: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/user/${id}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getRiskRegister(tokenString: string, projectId: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/risk-register/project/${projectId}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function getSupplierResource(tokenString: string, libraryCode: string) {
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  const response = await apiContext.get(`/supplier-rescources/${libraryCode}`, {
    headers: {
      Authorization: "Bearer " + tokenString,
    },
  });
  return response
}

async function assignRevisionContract( projectId: string, revisionId: string) {
  const token = getToken();
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: data.carbonLowCarbApi,
  });
  console.log(token)
  console.log(projectId)
  console.log(revisionId)
  const response = await apiContext.post("/assignRevisionContractors", {
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
  return response
}

export {
  getSignIn, getCurrentUserInfo, getServicesHealth, getEstimateRevision, getCarbonExpenProfile, getSectionAggregate, getResourceAggregate, getAllProject, getProjectMetaAll, createRevision,
  getRevision, getProjectById, IFTSpend, IFTInflation, IFTResult, getRoles, getAccessList, getAccessLevel, getRoleAccess, createRoleAccess, scheduleUpdate, getResourceLibraryForSpecificGroup,
  resourceLibraryInsertBulk, getSchedule, getResourceLibraryCarbon, getResourceLibrarySuppliers, projectResourceBulkUpdate, getProjectResource, projectResourceInsertBulk, deleteProjectResourceInsertBulk,
  fetchProjectResource, fetchProjectItem, projectItemBulkUpdate, projectItemBulkInsert, projectSubItemBulkInsert, getProjectItem, getSASReportProjectList, getSASReportProjectById, getSASReportProjectDetails,
  getSASCESSReportProjectDetails, getItemLibrary, getItemLibraryCarbon, itemLibraryCarbonUpdate, getJourneyLegs, deleteMultipleJourneyLegs, getCESSReport, getCESSReportAgg, getProjectAggr,
  getProjectAggrIFTCOMP, createContractEstimateLibrary, getResourceEpd, createResourceEpd, updateResourceEpd, projectAggrIFTCOMP, inflationSheetIndex, getCodes, getFuelUserCodes,
  getCodeTypeUnitAggr, getTransportAssumption, addJourneyLeg, deleteJourneyLeg, getContractEstimateLibraryContent, getContractEstimateLibraryContentAssured, getUsers, getUserById, getRiskRegister,
  getSupplierResource, assignRevisionContract
};
