import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import * as apiHelper from "../../../utils/apiHelper/carbonApi"
setDefaultTimeout(60 * 1000);
const fs = require('fs');

When("the user logs in to generate the API token", async function () {
  var tokenResp = await apiHelper.getSignIn();
  this.token = await tokenResp.json();
  this.token = this.token.data.accessToken;

  // Write token to a text file
  fs.writeFile('api_token.txt', this.token, (err: Error | null) => {
    if (err) {
      console.error('Error writing token to file:', err);
      return;
    }
    console.log('Token has been stored in api_token.txt');
  });
  console.log("\nUser Login was successful, Token is generated\n");
});

async function readTokenFromFile() {
  const tokenFilePath = 'api_token.txt';
  try {
    const token = fs.readFileSync(tokenFilePath, 'utf8').trim();
    const waitTime = 5000; // 5 seconds (adjust as needed)
    await new Promise(resolve => setTimeout(resolve, waitTime));
    return token;
  } catch (err) {
    console.error('Error reading token from file:', err);
    return null;
  }
}

When("the user makes a call to verify the existing user", async function () {
  const waitTime = 40000;
  await new Promise(resolve => setTimeout(resolve, waitTime));
  const token = await readTokenFromFile();
  this.userResp = await apiHelper.getCurrentUserInfo(token);
});

Then("the existing user call response is success", async function () {
  expect(this.userResp.ok()).toBeTruthy();
  console.log("\nUser Info was retrieved succeessfully\n");
  let userInfo = await this.userResp.json()
  // console.log(
  //   `\nUser Info is as follows:\n\n${JSON.stringify(userInfo)}\n\n`
  // );
});

When("the user makes the call to verify the Health", async function () {
  const token = await readTokenFromFile();
  this.healthResp = await apiHelper.getServicesHealth(token);
});

Then("the health response is success", async function () {
  expect(this.healthResp.ok()).toBeTruthy();
  console.log("\nSystem Health was retrieved succesfully\n");
  let health = await this.healthResp.json()
  // console.log(
  //   `\nSystem Health is as follows:\n${JSON.stringify(health.data)}\n\n`
  // );
});

When(/^the user makes a call to get the carbon expenditure profile for project (.*)/, async function (id: string) {
  const token = await readTokenFromFile();
  this.project = id
  this.carbonProfile = await apiHelper.getCarbonExpenProfile(token, this.project);
});

Then("the carbon profile is retrieved successfully", async function () {
  expect(this.carbonProfile.ok()).toBeTruthy();
  console.log("\nCarbon Profile was retrieved succesfully\n");
  let carbon = await this.carbonProfile.json()
  // console.log(
  //   `\nCarbon Profile for Project ${this.project} is as follows:\n${JSON.stringify(carbon.data)}\n\n`
  // );
});

When(/^the user makes a call to get the estimate revision for project (.*)/, async function (id: string) {
  const token = await readTokenFromFile();
  this.project = id
  this.revision = await apiHelper.getEstimateRevision(token, this.project);
});

Then("the estimate revision details are retrieved successfully", async function () {
  expect(this.revision.ok()).toBeTruthy();
  console.log("\nEstimate Revision details were retrieved succesfully\n");
  let rev = await this.revision.json()
  // console.log(
  //   `\nEstimate Revision for Project ${this.project} is as follows:\n${JSON.stringify(rev.data)}\n\n`
  // );
  expect(rev.data[0].DataTypeName).toEqual("Project")
});

When(/^the project aggregate call is done for project (.*)/, async function (id: string) {
  const token = await readTokenFromFile();
  this.project = id
  this.section = await apiHelper.getSectionAggregate(token, this.project);
});

Then("the project sections are retrieved successfully", async function () {
  expect(this.section.ok()).toBeTruthy();
  console.log("\nSection Aggregates were retrieved succesfully\n");
  let sec = await this.section.json()
  // console.log(
  //   `\nSection Aggregate for Project ${this.project} is as follows:\n${JSON.stringify(sec.data)}\n\n`
  // );
});

When(/^the item resource tree aggregation is retrieved for project (.*) and section (.*)/, async function (id: string, sectionId: string) {
  const token = await readTokenFromFile();
  this.project = id
  this.section = sectionId
  this.resource = await apiHelper.getResourceAggregate(token, this.project, this.section);
});

Then("the respurce details are retrieved successfully", async function () {
  expect(this.resource.ok()).toBeTruthy();
  //expect(this.resource.status).toBeNaN();
  console.log("\nResource Aggregates were retrieved succesfully\n");
  let res = await this.resource.json()
  // console.log(
  //   `\nResource Aggregate for Project ${this.project}-section ${this.section} is as follows:\n${JSON.stringify(res.data)}\n\n`
  // );
});

When('the user makes the call to verify the getAllProject API', async function () {
  const token = await readTokenFromFile();
  this.allProjectResp = await apiHelper.getAllProject(token);
});

Then('the projectAll response is success', async function () {
  expect(this.allProjectResp.status()).toBe(200);
  expect(this.allProjectResp.ok()).toBeTruthy();
  console.log("All Projects are retrieved succesfully\n");
  let allProject = await this.allProjectResp.json()
  expect(allProject).toHaveProperty('data');
  // console.log(
  //   `All Projects info is as follows:\n${JSON.stringify(allProject.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the getProjectById API for id (.*)/, async function (id: string) {
  const token = await readTokenFromFile();
  this.id = id;
  this.getProjectByIdResp = await apiHelper.getProjectById(token, this.id);
});

Then('the getProjectById response is success', async function () {
  expect(this.getProjectByIdResp.status()).toBe(200);
  expect(this.getProjectByIdResp.ok()).toBeTruthy();
  console.log("Project is retrieved succesfully\n");
  let getProjectById = await this.getProjectByIdResp.json()
  expect(getProjectById).toHaveProperty('data');
  // console.log(
  //   `Project info is as follows:\n${JSON.stringify(getProjectById.data)}\n\n`
  // );
});

When('the user makes the call to verify the getProjectMetaAll API', async function () {
  const token = await readTokenFromFile();
  this.projectMetaResp = await apiHelper.getProjectMetaAll(token);
});

Then('the projectsMetaAll response is success', async function () {
  expect(this.projectMetaResp.status()).toBe(200);
  expect(this.projectMetaResp.ok()).toBeTruthy();
  console.log("Projects meta are retrieved succesfully\n");
  let projectMeta = await this.projectMetaResp.json()
  expect(projectMeta).toHaveProperty('data');
  // console.log(
  //   `All Projects Meta info is as follows:\n${JSON.stringify(projectMeta.data)}\n\n`
  // );
});

When('the user makes the call to verify the createRevision API', async function () {
  const token = await readTokenFromFile();
  this.createRevisionResp = await apiHelper.createRevision(token);
});

Then('the createRevision response is success', async function () {
  expect(this.createRevisionResp.status()).toBe(200);
  expect(this.createRevisionResp.ok()).toBeTruthy();
  console.log("Created Revision is retrieved succesfully\n");
  let createdRevision= await this.createRevisionResp.json()
  expect(createdRevision).toHaveProperty('data');
  // console.log(
  //   `All Projects info is as follows:\n${JSON.stringify(createdRevision.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the getRevision API for projectId (.*)/, async function (projectId: string) {
  const token = await readTokenFromFile();
  this.projectId = projectId;
  this.getRevisionResp = await apiHelper.getRevision(token, this.projectId);
});

Then('the getRevision response is success', async function () {
  expect(this.getRevisionResp.status()).toBe(200);
  expect(this.getRevisionResp.ok()).toBeTruthy();
  console.log("Created Revision is retrieved succesfully\n");
  let fetchedRevision = await this.getRevisionResp.json()
  expect(fetchedRevision).toHaveProperty('data');
  // console.log(
  //   `All Revisions info is as follows:\n${JSON.stringify(fetchedRevision.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the IFTSpend API for projectId (.*)/, async function (projectId: string) {
  const token = await readTokenFromFile();
  this.projectId = projectId;
  this.IFTSpendResp = await apiHelper.IFTSpend(token, this.projectId);
});

Then('the IFTSpend response is success', async function () {
  expect(this.IFTSpendResp.status()).toBe(200);
  expect(this.IFTSpendResp.ok()).toBeTruthy();
  console.log("IFTSpendResp is retrieved succesfully\n");
  let fetchedIFTSpendResp = await this.IFTSpendResp.json()
  expect(fetchedIFTSpendResp).toHaveProperty('data');
  // console.log(
  //   `IFTSpend info is as follows:\n${JSON.stringify(fetchedIFTSpendResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the IFTInflation API for projectId (.*)/, async function (projectId: string) {
  const token = await readTokenFromFile();
  this.projectId = projectId;
  this.IFTInflationResp = await apiHelper.IFTInflation(token, this.projectId);
});

Then('the IFTInflation response is success', async function () {
  expect(this.IFTInflationResp.status()).toBe(200);
  expect(this.IFTInflationResp.ok()).toBeTruthy();
  console.log("IFTInflationResp is retrieved succesfully\n");
  let fetchedIFTInflationResp = await this.IFTInflationResp.json()
  expect(fetchedIFTInflationResp).toHaveProperty('data');
  // console.log(
  //   `IFTInflation info is as follows:\n${JSON.stringify(fetchedIFTInflationResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the IFTResult API for projectId (.*)/, async function (projectId: string) {
  const token = await readTokenFromFile();
  this.projectId = projectId;
  this.IFTResultResp = await apiHelper.IFTResult(token, this.projectId);
});

Then('the IFTResult response is success', async function () {
  expect(this.IFTResultResp.status()).toBe(200);
  expect(this.IFTResultResp.ok()).toBeTruthy();
  console.log("IFTResultResp is retrieved succesfully\n");
  let fetchedIFTResultResp = await this.IFTResultResp.json()
  expect(fetchedIFTResultResp).toHaveProperty('data');
  // console.log(
  //   `IFTResult info is as follows:\n${JSON.stringify(fetchedIFTResultResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the getRoles API', async function () {
  const token = await readTokenFromFile();
  this.rolesResp = await apiHelper.getRoles(token);
});

Then('the getRoles response is success', async function () {
  expect(this.rolesResp.status()).toBe(200);
  expect(this.rolesResp.ok()).toBeTruthy();
  console.log("All Roles are retrieved succesfully\n");
  let fetchedrolesResp = await this.rolesResp.json()
  expect(fetchedrolesResp).toHaveProperty('data');
  // console.log(
  //   `All Roles info is as follows:\n${JSON.stringify(fetchedrolesResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the getAccessList API', async function () {
  const token = await readTokenFromFile();
  this.accessListResp = await apiHelper.getAccessList(token);
});

Then('the getAccessList response is success', async function () {
  expect(this.accessListResp.status()).toBe(200);
  expect(this.accessListResp.ok()).toBeTruthy();
  console.log("AccessListResp is retrieved succesfully\n");
  let fetchedaccessListResp = await this.accessListResp.json()
  expect(fetchedaccessListResp).toHaveProperty('data');
  // console.log(
  //   `Access List info is as follows:\n${JSON.stringify(fetchedaccessListResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the getAccessLevel API', async function () {
  const token = await readTokenFromFile();
  this.accessLevelResp = await apiHelper.getAccessLevel(token);
});

Then('the getAccessLevel response is success', async function () {
  expect(this.accessLevelResp.status()).toBe(200);
  expect(this.accessLevelResp.ok()).toBeTruthy();
  console.log("AccessLevelResp is retrieved succesfully\n");
  let fetchedaccessLevelResp = await this.accessLevelResp.json()
  expect(fetchedaccessLevelResp).toHaveProperty('data');
  // console.log(
  //   `Access Level info is as follows:\n${JSON.stringify(fetchedaccessLevelResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the getRoleAccess API for (.*)/, async function (id: string) {
  const token = await readTokenFromFile();
  this.id = id;
  this.roleAccessResp = await apiHelper.getRoleAccess(token, this.id);
});

Then('the getRoleAccess response is success', async function () {
  expect(this.roleAccessResp.status()).toBe(200);
  expect(this.roleAccessResp.ok()).toBeTruthy();
  console.log("RoleAccessResp is retrieved succesfully\n");
  let fetchedaccessLevelResp = await this.roleAccessResp.json()
  expect(fetchedaccessLevelResp).toHaveProperty('data');
  // console.log(
  //   `Role Access info is as follows:\n${JSON.stringify(fetchedaccessLevelResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the createRoleAccess API', async function () {
  const token = await readTokenFromFile();
  this.createdRoleAccessResp = await apiHelper.createRoleAccess(token);
});

Then('the createRoleAccess response is success', async function () {
  expect(this.createdRoleAccessResp.status()).toBe(200);
  expect(this.createdRoleAccessResp.ok()).toBeTruthy();
  console.log("RoleAccessResp is retrieved succesfully\n");
  let fetchedRoleAccessResp = await this.createdRoleAccessResp.json()
  expect(fetchedRoleAccessResp).toHaveProperty('data');
  // console.log(
  //   `Role Access info is as follows:\n${JSON.stringify(fetchedRoleAccessResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the scheduleUpdate API', async function () {
  const token = await readTokenFromFile();
  this.scheduleUpdateResp = await apiHelper.scheduleUpdate(token);
});

Then('the scheduleUpdate response is success', async function () {
  expect(this.scheduleUpdateResp.status()).toBe(200);
  expect(this.scheduleUpdateResp.ok()).toBeTruthy();
  console.log("ScheduleUpdateResp is retrieved succesfully\n");
  let fetchedScheduleUpdateResp = await this.scheduleUpdateResp.json()
  expect(fetchedScheduleUpdateResp).toHaveProperty('data');
  // console.log(
  //   `Role Access info is as follows:\n${JSON.stringify(fetchedScheduleUpdateResp.data)}\n\n`
  // );
});

When(/the user makes the call to verify the getSchedule API for parameter (.*)/, async function (params: string) {
  const token = await readTokenFromFile();
  const processedParams = params.replace(/or/g, '||');
  this.params = processedParams
  this.getScheduleResp = await apiHelper.getSchedule(token, this.params);
});

Then('the getSchedule response is success', async function () {
  expect(this.getScheduleResp.status()).toBe(200);
  expect(this.getScheduleResp.ok()).toBeTruthy();
  console.log("GetScheduleResp is retrieved succesfully\n");
  let fetchedGetScheduleResp = await this.getScheduleResp.json()
  expect(fetchedGetScheduleResp).toHaveProperty('data');
  // console.log(
  //   `GetScheduleResp info is as follows:\n${JSON.stringify(fetchedGetScheduleResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the getResourceLibraryForSpecificGroup API for Resource_Group_id (.*)/, async function (id: string) {
  const token = await readTokenFromFile();
  this.id = id
  this.resourceLibraryResp = await apiHelper.getResourceLibraryForSpecificGroup(token, this.id);
});

Then('the getResourceLibraryForSpecificGroup response is success', async function () {
  expect(this.resourceLibraryResp.status()).toBe(200);
  expect(this.resourceLibraryResp.ok()).toBeTruthy();
  console.log("ResourceLibraryRespforSpecificGroup is retrieved succesfully\n");
  let fetchedResourceLibraryRespforSpecificGroup = await this.resourceLibraryResp.json()
  expect(fetchedResourceLibraryRespforSpecificGroup).toHaveProperty('data');
  // console.log(
  //   `ResourceLibraryRespforSpecificGroup info is as follows:\n${JSON.stringify(fetchedResourceLibraryRespforSpecificGroup.data)}\n\n`
  // );
});

When('the user makes the call to verify the resourceLibraryInsertBulk API', async function () {  
  const token = await readTokenFromFile();
  this.resourceLibraryInsertBulkResp = await apiHelper.resourceLibraryInsertBulk(token);
});

Then('the resourceLibraryInsertBulk response is success', async function () {
  expect(this.resourceLibraryInsertBulkResp.status()).toBe(200);
  expect(this.resourceLibraryInsertBulkResp.ok()).toBeTruthy();
  console.log("ResourceLibraryInsertBulkResp is retrieved succesfully\n");
  let fetchedResourceLibraryInsertBulkResp = await this.resourceLibraryInsertBulkResp.json()
  expect(fetchedResourceLibraryInsertBulkResp).toHaveProperty('data');
  // console.log(
  //   `ResourceLibraryInsertBulkResp info is as follows:\n${JSON.stringify(fetchedResourceLibraryInsertBulkResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the getResourceLibraryCarbon API', async function () {
  const token = await readTokenFromFile();
  this.resourceLibraryCarbonResp = await apiHelper.getResourceLibraryCarbon(token);
});

Then('the getResourceLibraryCarbon response is success', async function () {
  expect(this.resourceLibraryCarbonResp.status()).toBe(200);
  expect(this.resourceLibraryCarbonResp.ok()).toBeTruthy();
  console.log("ResourceLibraryCarbonResp is retrieved succesfully\n");
  let fetchedResourceLibraryCarbonResp = await this.resourceLibraryCarbonResp.json()
  expect(fetchedResourceLibraryCarbonResp).toHaveProperty('data');
  // console.log(
  //   `ResourceLibraryCarbonResp info is as follows:\n${JSON.stringify(fetchedResourceLibraryCarbonResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the getResourceLibrarySuppliers API', async function () {  
  const token = await readTokenFromFile();
  this.resourceLibrarySuppliersResp = await apiHelper.getResourceLibrarySuppliers(token);
});

Then('the getResourceLibrarySuppliers response is success', async function () {
  expect(this.resourceLibrarySuppliersResp.status()).toBe(200);
  expect(this.resourceLibrarySuppliersResp.ok()).toBeTruthy();
  console.log("ResourceLibrarySuppliersResp is retrieved succesfully\n");
  let fetchedResourceLibrarySuppliersResp = await this.resourceLibrarySuppliersResp.json()
  expect(fetchedResourceLibrarySuppliersResp).toHaveProperty('data');
  // console.log(
  //   `ResourceLibrarySuppliersResp info is as follows:\n${JSON.stringify(fetchedResourceLibrarySuppliersResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the projectResourceBulkUpdate API', async function () { 
  const token = await readTokenFromFile();
  this.projectResourceBulkUpdateResp = await apiHelper.projectResourceBulkUpdate(token);
});

Then('the projectResourceBulkUpdate response is success', async function () {
  await new Promise(resolve => setTimeout(resolve, 30000));
  expect(this.projectResourceBulkUpdateResp.status()).toBe(200);
  expect(this.projectResourceBulkUpdateResp.ok()).toBeTruthy();
  console.log("ProjectResourceBulkUpdateResp is retrieved succesfully\n");
  let fetchedProjectResourceBulkUpdateResp = await this.projectResourceBulkUpdateResp.json()
  expect(fetchedProjectResourceBulkUpdateResp).toHaveProperty('data');
  // console.log(
  //   `ProjectResourceBulkUpdateResp info is as follows:\n${JSON.stringify(fetchedProjectResourceBulkUpdateResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the getProjectResource API for id (.*)/, async function (id: string) {
  const token = await readTokenFromFile();
   this.id = id;
   this.getProjectResourceResp = await apiHelper.getProjectResource(token, this.id);  
  });

Then('the getProjectResource response is success', async function () {
  await new Promise(resolve => setTimeout(resolve, 30000));
  expect(this.getProjectResourceResp.status()).toBe(200);
  expect(this.getProjectResourceResp.ok()).toBeTruthy();
  console.log("ProjectResourceResp is retrieved succesfully\n");
  let fetchedProjectResourceResp = await this.getProjectResourceResp.json()
  expect(fetchedProjectResourceResp).toHaveProperty('data');
  // console.log(
  //   `ProjectResourceResp info is as follows:\n${JSON.stringify(fetchedProjectResourceResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the projectResourceInsertBulk API', async function () {  
  const token = await readTokenFromFile();
  this.projectResourceInsertBulkResp = await apiHelper.projectResourceInsertBulk(token);
});

Then('the projectResourceInsertBulk response is success', async function () {
  await new Promise(resolve => setTimeout(resolve, 50000));
  expect(this.projectResourceInsertBulkResp.status()).toBe(200);
  expect(this.projectResourceInsertBulkResp.ok()).toBeTruthy();
  console.log("ProjectResourceInsertBulkResp is retrieved succesfully\n");
  let fetchedProjectResourceInsertBulkResp = await this.projectResourceInsertBulkResp.json()
  expect(fetchedProjectResourceInsertBulkResp).toHaveProperty('data');
  // console.log(
  //   `ProjectResourceInsertBulkResp info is as follows:\n${JSON.stringify(fetchedProjectResourceInsertBulkResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the deleteProjectResourceInsertBulk API for id (.*) and projectId (.*)/, async function (ids: string, projectId: string) {
  const token = await readTokenFromFile();
  this.ids = ids;
  this.projectId = projectId; 
  this.deleteProjectResourceInsertBulkResp = await apiHelper.deleteProjectResourceInsertBulk(token, this.ids, this.projectId);
});

Then('the deleteProjectResourceInsertBulk response is success', async function () {
  await new Promise(resolve => setTimeout(resolve, 50000));
  expect(this.deleteProjectResourceInsertBulkResp.status()).toBe(200);
  expect(this.deleteProjectResourceInsertBulkResp.ok()).toBeTruthy();
  console.log("DeleteProjectResourceInsertBulkResp is retrieved succesfully\n");
  let fetchedDeleteProjectResourceInsertBulkResp = await this.deleteProjectResourceInsertBulkResp.json()
  // expect(fetchedDeleteProjectResourceInsertBulkResp).toHaveProperty('data');
  // console.log(
  //   `DeleteProjectResourceInsertBulkResp info is as follows:\n${JSON.stringify(fetchedDeleteProjectResourceInsertBulkResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the fetchProjectResource API', async function () {
  const token = await readTokenFromFile();
  this.fetchProjectResourceResp = await apiHelper.fetchProjectResource(token);
});

Then('the fetchProjectResource response is success', async function () {
  await new Promise(resolve => setTimeout(resolve, 30000));
  expect(this.fetchProjectResourceResp.status()).toBe(200);
  expect(this.fetchProjectResourceResp.ok()).toBeTruthy();
  console.log("FetchProjectResourceResp is retrieved succesfully\n");
  let fetchedFetchProjectResourceResp = await this.fetchProjectResourceResp.json()
  expect(fetchedFetchProjectResourceResp).toHaveProperty('data');
  // console.log(
  //   `FetchProjectResourceResp info is as follows:\n${JSON.stringify(fetchedFetchProjectResourceResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the fetchProjectItem API', async function () {
  const token = await readTokenFromFile();
  this.fetchProjectItemResp = await apiHelper.fetchProjectItem(token);
});

Then('the fetchProjectItem response is success', async function () {
  await new Promise(resolve => setTimeout(resolve, 30000));
  expect(this.fetchProjectItemResp.status()).toBe(200);
  expect(this.fetchProjectItemResp.ok()).toBeTruthy();
  console.log("FetchProjectItemResp is retrieved succesfully\n");
  let fetchedFetchProjectItemResp = await this.fetchProjectItemResp.json()
  expect(fetchedFetchProjectItemResp).toHaveProperty('data');
  // console.log(
  //   `FetchProjectItemResp info is as follows:\n${JSON.stringify(fetchedFetchProjectItemResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the projectItemBulkUpdate API', async function () {
  const token = await readTokenFromFile();
  this.projectItemBulkUpdateResp = await apiHelper.projectItemBulkUpdate(token);
});

Then('the projectItemBulkUpdate response is success', async function () {
  await new Promise(resolve => setTimeout(resolve, 30000));
  expect(this.projectItemBulkUpdateResp.status()).toBe(200);
  expect(this.projectItemBulkUpdateResp.ok()).toBeTruthy();
  console.log("ProjectItemBulkUpdateResp is retrieved succesfully\n");
  let fetchedProjectItemBulkUpdateResp = await this.projectItemBulkUpdateResp.json()
  expect(fetchedProjectItemBulkUpdateResp).toHaveProperty('data');
  // console.log(
  //   `ProjectItemBulkUpdateResp info is as follows:\n${JSON.stringify(fetchedProjectItemBulkUpdateResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the projectItemBulkInsert API', async function () {
  const token = await readTokenFromFile();
  this.projectItemBulkInsertResp = await apiHelper.projectItemBulkInsert(token);
});

Then('the projectItemBulkInsert response is success', async function () {
  await new Promise(resolve => setTimeout(resolve, 30000));
  expect(this.projectItemBulkInsertResp.status()).toBe(200);
  expect(this.projectItemBulkInsertResp.ok()).toBeTruthy();
  console.log("ProjectItemBulkInsertResp is retrieved succesfully\n");
  let fetchedProjectItemBulkInsertResp = await this.projectItemBulkInsertResp.json()
  expect(fetchedProjectItemBulkInsertResp).toHaveProperty('data');
  // console.log(
  //   `ProjectItemBulkInsertResp info is as follows:\n${JSON.stringify(fetchedProjectItemBulkInsertResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the projectSubItemBulkInsert API', async function () {
  const token = await readTokenFromFile();
  this.projectSubItemBulkInsertResp = await apiHelper.projectSubItemBulkInsert(token);
});

Then('the projectSubItemBulkInsert response is success', async function () {
  expect(this.projectSubItemBulkInsertResp.status()).toBe(200);
  expect(this.projectSubItemBulkInsertResp.ok()).toBeTruthy();
  console.log("ProjectSubItemBulkInsertResp is retrieved succesfully\n");
  let fetchedProjectSubItemBulkInsertResp = await this.projectSubItemBulkInsertResp.json()
  expect(fetchedProjectSubItemBulkInsertResp).toHaveProperty('data');
  // console.log(
  //   `ProjectSubItemBulkInsertResp info is as follows:\n${JSON.stringify(fetchedProjectSubItemBulkInsertResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the getProjectItem API for id (.*)/, async function (id: string) {
  const token = await readTokenFromFile();
  this.id = id;
  this.getProjectItemResp = await apiHelper.getProjectItem(token, this.id);
});

Then('the getProjectItem response is success', async function () {
  expect(this.getProjectItemResp.status()).toBe(200);
  expect(this.getProjectItemResp.ok()).toBeTruthy();
  console.log("GetProjectItemResp is retrieved succesfully\n");
  let fetchedGetProjectItemResp = await this.getProjectItemResp.json()
  expect(fetchedGetProjectItemResp).toHaveProperty('data');
  // console.log(
  //   `GetProjectItemResp info is as follows:\n${JSON.stringify(fetchedGetProjectItemResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the getSASReportProjectList API', async function () {
  const token = await readTokenFromFile();
  this.getSASReportProjectListResp = await apiHelper.getSASReportProjectList(token);
});

Then('the getSASReportProjectList response is success', async function () {
  expect(this.getSASReportProjectListResp.status()).toBe(200);
  expect(this.getSASReportProjectListResp.ok()).toBeTruthy();
  console.log("GetSASReportProjectListResp is retrieved succesfully\n");
  let fetchedGetSASReportProjectListResp = await this.getSASReportProjectListResp.json()
  expect(fetchedGetSASReportProjectListResp).toHaveProperty('data');
  // console.log(
  //   `GetSASReportProjectListResp info is as follows:\n${JSON.stringify(fetchedGetSASReportProjectListResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the getSASReportProjectById API for id (.*)/, async function (id: string) {
  const token = await readTokenFromFile();
  this.id = id;
  this.getSASReportProjectByIdResp = await apiHelper.getSASReportProjectById(token, this.id);
});

Then('the getSASReportProjectById response is success', async function () {
  expect(this.getSASReportProjectByIdResp.status()).toBe(200);
  expect(this.getSASReportProjectByIdResp.ok()).toBeTruthy();
  console.log("GetSASReportProjectByIdResp is retrieved succesfully\n");
  let fetchedGetSASReportProjectByIdResp = await this.getSASReportProjectByIdResp.json()
  expect(fetchedGetSASReportProjectByIdResp).toHaveProperty('data');
  // console.log(
  //   `GetSASReportProjectByIdResp info is as follows:\n${JSON.stringify(fetchedGetSASReportProjectByIdResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the getSASReportProjectDetails API for id (.*)/, async function (id: string) {
  this.id = id;
  this.getSASReportProjectDetailsResp = await apiHelper.getSASReportProjectDetails(this.token, this.id);
});

Then('the getSASReportProjectDetails response is success', async function () {
  expect(this.getSASReportProjectDetailsResp.status()).toBe(200);
  expect(this.getSASReportProjectDetailsResp.ok()).toBeTruthy();
  console.log("GetSASReportProjectDetailsResp is retrieved succesfully\n");
  let fetchedGetSASReportProjectDetailsResp = await this.getSASReportProjectDetailsResp.json()
  expect(fetchedGetSASReportProjectDetailsResp).toHaveProperty('data');
  // console.log(
  //   `GetSASReportProjectDetailsResp info is as follows:\n${JSON.stringify(fetchedGetSASReportProjectDetailsResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the getSASCESSReportProjectDetails API for id (.*)/, async function (id: string) {
  const token = await readTokenFromFile();
  this.id = id;
  this.getSASCESSReportProjectDetailsResp = await apiHelper.getSASCESSReportProjectDetails(token, this.id);
});

Then('the getSASCESSReportProjectDetails response is success', async function () {
  expect(this.getSASCESSReportProjectDetailsResp.status()).toBe(200);
  expect(this.getSASCESSReportProjectDetailsResp.ok()).toBeTruthy();
  console.log("GetSASCESSReportProjectDetailsResp is retrieved succesfully\n");
  let fetchedGetSASCESSReportProjectDetailsResp = await this.getSASCESSReportProjectDetailsResp.json()
  expect(fetchedGetSASCESSReportProjectDetailsResp).toHaveProperty('data');
  // console.log(
  //   `GetSASCESSReportProjectDetailsResp info is as follows:\n${JSON.stringify(fetchedGetSASCESSReportProjectDetailsResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the getItemLibrary API for parameter (.*)/, async function (params: string) {
  const token = await readTokenFromFile();
  this.params = params;
  this.getItemLibraryResp = await apiHelper.getItemLibrary(token, this.params);
});

Then('the getItemLibrary response is success', async function () {
  expect(this.getItemLibraryResp.status()).toBe(200);
  expect(this.getItemLibraryResp.ok()).toBeTruthy();
  console.log("GetItemLibraryResp is retrieved succesfully\n");
  let fetchedGetItemLibraryResp = await this.getItemLibraryResp.json()
  expect(fetchedGetItemLibraryResp).toHaveProperty('data');
  // console.log(
  //   `GetItemLibraryResp info is as follows:\n${JSON.stringify(fetchedGetItemLibraryResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the getItemLibraryCarbon API', async function () {
  const token = await readTokenFromFile();
  this.getItemLibraryCarbonResp = await apiHelper.getItemLibraryCarbon(token);
});

Then('the getItemLibraryCarbon response is success', async function () {
  expect(this.getItemLibraryCarbonResp.status()).toBe(200);
  expect(this.getItemLibraryCarbonResp.ok()).toBeTruthy();
  console.log("GetItemLibraryCarbonResp is retrieved succesfully\n");
  let fetchedGetItemLibraryCarbonResp = await this.getItemLibraryCarbonResp.json()
  expect(fetchedGetItemLibraryCarbonResp).toHaveProperty('data');
  // console.log(
  //   `GetItemLibraryCarbonResp info is as follows:\n${JSON.stringify(fetchedGetItemLibraryCarbonResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the itemLibraryCarbonUpdate API', async function () {
  const token = await readTokenFromFile();
  this.itemLibraryCarbonUpdateResp = await apiHelper.itemLibraryCarbonUpdate(token);
});

Then('the itemLibraryCarbonUpdate response is success', async function () {
  expect(this.itemLibraryCarbonUpdateResp.status()).toBe(200);
  expect(this.itemLibraryCarbonUpdateResp.ok()).toBeTruthy();
  console.log("ItemLibraryCarbonUpdateResp is retrieved succesfully\n");
  let fetchedItemLibraryCarbonUpdateResp = await this.itemLibraryCarbonUpdateResp.json()
  expect(fetchedItemLibraryCarbonUpdateResp).toHaveProperty('data');
  // console.log(
  //   `ItemLibraryCarbonUpdateResp info is as follows:\n${JSON.stringify(fetchedItemLibraryCarbonUpdateResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the getJourneyLegs API', async function () {
  const token = await readTokenFromFile();
  this.getJourneyLegsResp = await apiHelper.getJourneyLegs(token);
});

Then('the getJourneyLegs response is success', async function () {
  expect(this.getJourneyLegsResp.status()).toBe(200);
  expect(this.getJourneyLegsResp.ok()).toBeTruthy();
  console.log("GetJourneyLegsResp is retrieved succesfully\n");
  let fetchedGetJourneyLegsResp = await this.getJourneyLegsResp.json()
  expect(fetchedGetJourneyLegsResp).toHaveProperty('data');
  // console.log(
  //   `GetJourneyLegsResp info is as follows:\n${JSON.stringify(fetchedGetJourneyLegsResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the deleteMultipleJourneyLegs API for id (.*)/, async function (id: string) { 
  const token = await readTokenFromFile();
  this.id = id;       
  this.deleteMultipleJourneyLegsResp = await apiHelper.deleteMultipleJourneyLegs(token, this.id);
});

Then('the deleteMultipleJourneyLegs response is success', async function () {
  expect(this.deleteMultipleJourneyLegsResp.status()).toBe(200);
  expect(this.deleteMultipleJourneyLegsResp.ok()).toBeTruthy();
  console.log("DeleteMultipleJourneyLegsResp is retrieved succesfully\n");
  let fetchedDeleteMultipleJourneyLegsResp = await this.deleteMultipleJourneyLegsResp.json()
  expect(fetchedDeleteMultipleJourneyLegsResp).toHaveProperty('data');
  // console.log(
  //   `DeleteMultipleJourneyLegsResp info is as follows:\n${JSON.stringify(fetchedDeleteMultipleJourneyLegsResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the getCESSReport API for parameter (.*)/, async function (params: string) {
  const token = await readTokenFromFile();
  const processedParams = params.replace(/or/g, '||');
  this.params = processedParams
  this.getCESSReportResp = await apiHelper.getCESSReport(token, this.params);
});

Then('the getCESSReport response is success', async function () {
  expect(this.getCESSReportResp.status()).toBe(200);
  expect(this.getCESSReportResp.ok()).toBeTruthy();
  console.log("GetCESSReportResp is retrieved succesfully\n");
  let fetchedGetCESSReportResp = await this.getCESSReportResp.json()
  expect(fetchedGetCESSReportResp).toHaveProperty('data');
  // console.log(
  //   `GetCESSReportResp info is as follows:\n${JSON.stringify(fetchedGetCESSReportResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the getCESSReportAgg API for parameter (.*)/, async function (params: string) {
  const token = await readTokenFromFile();
  const processedParams = params.replace(/or/g, '||');
  this.params = processedParams
  this.getCESSReportAggResp = await apiHelper.getCESSReportAgg(token, this.params);
});

Then('the getCESSReportAgg response is success', async function () {
  expect(this.getCESSReportAggResp.status()).toBe(200);
  expect(this.getCESSReportAggResp.ok()).toBeTruthy();
  console.log("GetCESSReportAggResp is retrieved succesfully\n");
  let fetchedGetCESSReportAggResp = await this.getCESSReportAggResp.json()
  expect(fetchedGetCESSReportAggResp).toHaveProperty('data');
  // console.log(
  //   `GetCESSReportAggResp info is as follows:\n${JSON.stringify(fetchedGetCESSReportAggResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the getProjectAggr API for id (.*) and parameter (.*)/, async function (id: string, params: string) {
  const token = await readTokenFromFile();
  this.id = id;
  this.params = params;
  this.getProjectAggrResp = await apiHelper.getProjectAggr(token, this.id, this.params);
});

Then('the getProjectAggr response is success', async function () {
  expect(this.getProjectAggrResp.status()).toBe(200);
  expect(this.getProjectAggrResp.ok()).toBeTruthy();
  console.log("GetProjectAggrResp is retrieved succesfully\n");
  let fetchedGetProjectAggrResp = await this.getProjectAggrResp.json()
  expect(fetchedGetProjectAggrResp).toHaveProperty('data');
  // console.log(
  //   `GetProjectAggrResp info is as follows:\n${JSON.stringify(fetchedGetProjectAggrResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the ProjectAggrIFTCOMP API', async function () {
  const token = await readTokenFromFile();
  this.ProjectAggrIFTCOMPResp = await apiHelper.getProjectAggrIFTCOMP(token);
});

Then('the ProjectAggrIFTCOMP response is success', async function () {
  expect(this.ProjectAggrIFTCOMPResp.status()).toBe(200);
  expect(this.ProjectAggrIFTCOMPResp.ok()).toBeTruthy();
  console.log("ProjectAggrIFTCOMPResp is retrieved succesfully\n");
  let fetchedProjectAggrIFTCOMPResp = await this.ProjectAggrIFTCOMPResp.json()
  expect(fetchedProjectAggrIFTCOMPResp).toHaveProperty('data');
  // console.log(
  //   `ProjectAggrIFTCOMPResp info is as follows:\n${JSON.stringify(fetchedProjectAggrIFTCOMPResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the createContractEstimateLibrary API', async function () {
  const token = await readTokenFromFile();
  this.createContractEstimateLibraryResp = await apiHelper.createContractEstimateLibrary(token);
});

Then('the createContractEstimateLibrary response is success', async function () {
  expect(this.createContractEstimateLibraryResp.status()).toBe(200);
  expect(this.createContractEstimateLibraryResp.ok()).toBeTruthy();
  console.log("CreateContractEstimateLibraryResp is retrieved succesfully\n");
  let fetchedCreateContractEstimateLibraryResp = await this.createContractEstimateLibraryResp.json()
  expect(fetchedCreateContractEstimateLibraryResp).toHaveProperty('data');
  // console.log(
  //   `CreateContractEstimateLibraryResp info is as follows:\n${JSON.stringify(fetchedCreateContractEstimateLibraryResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the getResourceEpd API for id (.*)/, async function (id: string) {
  const token = await readTokenFromFile();
  this.id = id;
  this.getResourceEpdResp = await apiHelper.getResourceEpd(token, this.id);
});

Then('the getResourceEpd response is success', async function () {
  expect(this.getResourceEpdResp.status()).toBe(200);
  expect(this.getResourceEpdResp.ok()).toBeTruthy();
  console.log("GetResourceEpdResp is retrieved succesfully\n");
  let fetchedGetResourceEpdResp = await this.getResourceEpdResp.json()
  expect(fetchedGetResourceEpdResp).toHaveProperty('data');
  // console.log(
  //   `GetResourceEpdResp info is as follows:\n${JSON.stringify(fetchedGetResourceEpdResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the createResourceEpd API', async function () {
  const token = await readTokenFromFile();
  this.createResourceEpdResp = await apiHelper.createResourceEpd(token);
});

Then('the createResourceEpd response is success', async function () {
  expect(this.createResourceEpdResp.status()).toBe(200);
  expect(this.createResourceEpdResp.ok()).toBeTruthy();
  console.log("CreateResourceEpdResp is retrieved succesfully\n");
  let fetchedCreateResourceEpdResp = await this.createResourceEpdResp.json()
  expect(fetchedCreateResourceEpdResp).toHaveProperty('data');
  // console.log(
  //   `CreateResourceEpdResp info is as follows:\n${JSON.stringify(fetchedCreateResourceEpdResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the updateResourceEpd API', async function () {
  const token = await readTokenFromFile();
  this.updateResourceEpdResp = await apiHelper.updateResourceEpd(token);
});

Then('the updateResourceEpd response is success', async function () {
  expect(this.updateResourceEpdResp.status()).toBe(200);
  expect(this.updateResourceEpdResp.ok()).toBeTruthy();
  console.log("UpdateResourceEpdResp is retrieved succesfully\n");
  let fetchedUpdateResourceEpdResp = await this.updateResourceEpdResp.json()
  expect(fetchedUpdateResourceEpdResp).toHaveProperty('data');
  // console.log(
  //   `UpdateResourceEpdResp info is as follows:\n${JSON.stringify(fetchedUpdateResourceEpdResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the projectAggrIFTCOMP API', async function () {
  const token = await readTokenFromFile();
  this.AggrIFTCOMPResp = await apiHelper.projectAggrIFTCOMP(token);
});

Then('the projectAggrIFTCOMP response is success', async function () {
  expect(this.AggrIFTCOMPResp.status()).toBe(200);
  expect(this.AggrIFTCOMPResp.ok()).toBeTruthy();
  console.log("AggrIFTCOMPResp is retrieved succesfully\n");
  let fetchedAggrIFTCOMPResp = await this.AggrIFTCOMPResp.json()
  expect(fetchedAggrIFTCOMPResp).toHaveProperty('data');
  // console.log(
  //   `AggrIFTCOMPResp info is as follows:\n${JSON.stringify(fetchedAggrIFTCOMPResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the inflationSheetIndex API', async function () {
  const token = await readTokenFromFile();
  this.inflationSheetIndexResp = await apiHelper.inflationSheetIndex(token);
});

Then('the inflationSheetIndex response is success', async function () {
  expect(this.inflationSheetIndexResp.status()).toBe(200);
  expect(this.inflationSheetIndexResp.ok()).toBeTruthy();
  console.log("InflationSheetIndexResp is retrieved succesfully\n");
  let fetchedInflationSheetIndexResp = await this.inflationSheetIndexResp.json()
  expect(fetchedInflationSheetIndexResp).toHaveProperty('data');
  // console.log(
  //   `InflationSheetIndexResp info is as follows:\n${JSON.stringify(fetchedInflationSheetIndexResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the getCodes API', async function () {
  const token = await readTokenFromFile();
  this.getCodesResp = await apiHelper.getCodes(token);
});

Then('the getCodes response is success', async function () {
  expect(this.getCodesResp.status()).toBe(200);
  expect(this.getCodesResp.ok()).toBeTruthy();
  console.log("GetCodesResp is retrieved succesfully\n");
  let fetchedGetCodesResp = await this.getCodesResp.json()
  expect(fetchedGetCodesResp).toHaveProperty('data');
  // console.log(
  //   `GetCodesResp info is as follows:\n${JSON.stringify(fetchedGetCodesResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the getFuelUserCodes API', async function () {
  const token = await readTokenFromFile();
  this.getFuelUserCodesResp = await apiHelper.getFuelUserCodes(token);
});

Then('the getFuelUserCodes response is success', async function () {
  // expect(this.getFuelUserCodesResp.status()).toBe(200);
  expect(this.getFuelUserCodesResp.ok()).toBeTruthy();
  console.log("GetFuelUserCodesResp is retrieved succesfully\n");
  let fetchedGetFuelUserCodesResp = await this.getFuelUserCodesResp.json()
  // expect(fetchedGetFuelUserCodesResp).toHaveProperty('Properties');
  // console.log(
  //   `GetFuelUserCodesResp info is as follows:\n${JSON.stringify(fetchedGetFuelUserCodesResp)}\n\n`
  // );
});

When(/^the user makes the call to verify the getCodeTypeUnitAggr API for parameter (.*)/, async function (param: string) {
  const token = await readTokenFromFile();
  const processedParams = param.replace(/or/g, '||');
  this.param = processedParams
  this.getCodeTypeUnitAggrResp = await apiHelper.getCodeTypeUnitAggr(token, this.param);
});

Then('the getCodeTypeUnitAggr response is success', async function () {
  expect(this.getCodeTypeUnitAggrResp.status()).toBe(200);
  expect(this.getCodeTypeUnitAggrResp.ok()).toBeTruthy();
  console.log("GetCodeTypeUnitAggrResp is retrieved succesfully\n");
  let fetchedGetCodeTypeUnitAggrResp = await this.getCodeTypeUnitAggrResp.json()
  expect(fetchedGetCodeTypeUnitAggrResp).toHaveProperty('data');
  // console.log(
  //   `GetCodeTypeUnitAggrResp info is as follows:\n${JSON.stringify(fetchedGetCodeTypeUnitAggrResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the getTransportAssumption API', async function () { 
  const token = await readTokenFromFile();
  this.getTransportResp = await apiHelper.getTransportAssumption(token);
});

Then('the getTransportAssumption response is success', async function () {
  expect(this.getTransportResp.status()).toBe(200);
  expect(this.getTransportResp.ok()).toBeTruthy();
  console.log("GetTransportResp is retrieved succesfully\n");
  let fetchedGetTransportResp = await this.getTransportResp.json()
  expect(fetchedGetTransportResp).toHaveProperty('data');
  // console.log(
  //   `GetTransportResp info is as follows:\n${JSON.stringify(fetchedGetTransportResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the addJourneyLeg API', async function () {
  const token = await readTokenFromFile();
  this.addJourneyLegResp = await apiHelper.addJourneyLeg(token);
});

Then('the addJourneyLeg response is success', async function () {
  expect(this.addJourneyLegResp.status()).toBe(200);
  expect(this.addJourneyLegResp.ok()).toBeTruthy();
  console.log("AddJourneyLegResp is retrieved succesfully\n");
  let fetchedAddJourneyLegResp = await this.addJourneyLegResp.json()
  expect(fetchedAddJourneyLegResp).toHaveProperty('data');
  // console.log(
  //   `AddJourneyLegResp info is as follows:\n${JSON.stringify(fetchedAddJourneyLegResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the deleteJourneyLeg API for id (.*)/, async function (id: string) {
  const token = await readTokenFromFile();
  this.id = id;
  this.deleteJourneyLegResp = await apiHelper.deleteJourneyLeg(token, this.id);
});

Then('the deleteJourneyLeg response is success', async function () {
  expect(this.deleteJourneyLegResp.status()).toBe(200);
  expect(this.deleteJourneyLegResp.ok()).toBeTruthy();
  console.log("DeleteJourneyLegResp is retrieved succesfully\n");
  let fetchedDeleteJourneyLegResp = await this.deleteJourneyLegResp.json()
  expect(fetchedDeleteJourneyLegResp).toHaveProperty('data');
  // console.log(
  //   `DeleteJourneyLegResp info is as follows:\n${JSON.stringify(fetchedDeleteJourneyLegResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the getContractEstimateLibraryContent API', async function () {
  const token = await readTokenFromFile();
  this.contractEstimateLibraryContentResp = await apiHelper.getContractEstimateLibraryContent(token);
});

Then('the getContractEstimateLibraryContent response is success', async function () {
  expect(this.contractEstimateLibraryContentResp.status()).toBe(200);
  expect(this.contractEstimateLibraryContentResp.ok()).toBeTruthy();
  console.log("ContractEstimateLibraryContentResp is retrieved succesfully\n");
  let fetchedCELResp = await this.contractEstimateLibraryContentResp.json()
  expect(fetchedCELResp).toHaveProperty('data');
  // console.log(
  //   `ContractEstimateLibraryContentResp info is as follows:\n${JSON.stringify(fetchedCELResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the getContractEstimateLibraryContentAssured API', async function () {
  const token = await readTokenFromFile();
  this.assuredResp = await apiHelper.getContractEstimateLibraryContentAssured(token);
});

Then('the getContractEstimateLibraryContentAssured response is success', async function () {
  expect(this.assuredResp.status()).toBe(200);
  expect(this.assuredResp.ok()).toBeTruthy();
  console.log("ContractEstimateLibraryContentAssuredResp is retrieved succesfully\n");
  let fetchedCELAResp = await this.assuredResp.json()
  expect(fetchedCELAResp).toHaveProperty('data');
  // console.log(
  //   `ContractEstimateLibraryContentAssuredResp info is as follows:\n${JSON.stringify(fetchedCELAResp.data)}\n\n`
  // );
});

When('the user makes the call to verify the getUsers API', async function () {
  const token = await readTokenFromFile();
  this.getUsersResp = await apiHelper.getUsers(token);
});

Then('the getUsers response is success', async function () {
  expect(this.getUsersResp.status()).toBe(200);
  expect(this.getUsersResp.ok()).toBeTruthy();
  console.log("GetUsersResp is retrieved succesfully\n");
  let fetchedGetUsersResp = await this.getUsersResp.json()
  expect(fetchedGetUsersResp).toHaveProperty('data');
  // console.log(
  //   `GetUsersResp info is as follows:\n${JSON.stringify(fetchedGetUsersResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the getUserById API for id (.*)/, async function (id: string) {
  const token = await readTokenFromFile();
  this.id = id;
  this.getUserByIdResp = await apiHelper.getUserById(token, this.id);
});

Then('the getUserById response is success', async function () {
  expect(this.getUserByIdResp.status()).toBe(200);
  expect(this.getUserByIdResp.ok()).toBeTruthy();
  console.log("GetUserByIdResp is retrieved succesfully\n");
  let fetchedGetUserByIdResp = await this.getUserByIdResp.json()
  expect(fetchedGetUserByIdResp).toHaveProperty('data');
  // console.log(
  //   `GetUserByIdResp info is as follows:\n${JSON.stringify(fetchedGetUserByIdResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the getRiskRegister API for projectId (.*)/, async function (projectId: string) {
  const token = await readTokenFromFile();
  this.projectId = projectId;
  this.getRiskRegisterResp = await apiHelper.getRiskRegister(token, this.projectId); 
});

Then('the getRiskRegister response is success', async function () {
  expect(this.getRiskRegisterResp.status()).toBe(200);
  expect(this.getRiskRegisterResp.ok()).toBeTruthy();
  console.log("GetRiskRegisterResp is retrieved succesfully\n");
  let fetchedGetRiskRegisterResp = await this.getRiskRegisterResp.json()
  expect(fetchedGetRiskRegisterResp).toHaveProperty('data');
  // console.log(
  //   `GetRiskRegisterResp info is as follows:\n${JSON.stringify(fetchedGetRiskRegisterResp.data)}\n\n`
  // );
});

When(/^the user makes the call to verify the getSupplierResource API for libraryCode (.*)/, async function (libraryCode: string) {
  const token = await readTokenFromFile();
  this.libraryCode = libraryCode;
  this.supplierResourceResp = await apiHelper.getSupplierResource(token, this.libraryCode); 
});

Then('the getSupplierResource response is success', async function () {
  expect(this.supplierResourceResp.status()).toBe(200);
  expect(this.supplierResourceResp.ok()).toBeTruthy();
  console.log("GetSupplierResource is retrieved succesfully\n");
  let fetchedGetSupplierResource = await this.supplierResourceResp.json()
  expect(fetchedGetSupplierResource).toHaveProperty('data');
  // console.log(
  //   `GetSupplierResource info is as follows:\n${JSON.stringify(fetchedGetSupplierResource.data)}\n\n`
  // );
});

// When('the user makes the call to verify the assignRevisionContract API', async function () {        
//   this.assignRevisionContract = await apiHelper.assignRevisionContract(this.token); 
// });


Then('the assignRevisionContract response is success', async function () {
  expect(this.assignRevisionContract.status()).toBe(200);
  expect(this.assignRevisionContract.ok()).toBeTruthy();
  console.log("GetSupplierResource is retrieved succesfully\n");
  let fetchedassignRevisionContract = await this.assignRevisionContract.json()
  expect(fetchedassignRevisionContract).toHaveProperty('data');
  console.log(
    `GetSupplierResource info is as follows:\n${JSON.stringify(fetchedassignRevisionContract.data)}\n\n`
  );
});
