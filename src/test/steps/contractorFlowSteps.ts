import { Then, When } from "@cucumber/cucumber";
import { ManageRevisionPage } from "../../../utils/pages/manageRevision.page";
import { pageFixture } from "../../hooks/pageFixture";
import { LandingPage } from "../../../utils/pages/landing.page";
import { EstimateBrowserPage } from "../../../utils/pages/estimateBrowser.page";
import { expect } from "@playwright/test";
import { ProjectSummaryPage } from "../../../utils/pages/projectSummary.page";
import { AdminPage } from "../../../utils/pages/admin.page";
import { BOQScreenPage } from "../../../utils/pages/BOQScreen.page";
import * as data from '../../../utils/data/fixtures.data.json';
import { UserProfilePage } from "../../../utils/pages/userProfile.page";
import * as apiHelper from "../../../utils/apiHelper/carbonApi";

Then('user add a new revision', async function () {
    const manageRevisionPage = new ManageRevisionPage(pageFixture.page);

    this.projectId = await manageRevisionPage.getProjectId()
    await manageRevisionPage.addNewRevision();
    await manageRevisionPage.selectLatestEstimate();
    await pageFixture.page.waitForTimeout(2000);
    this.revisionNumber = await manageRevisionPage.getRevisionNumber();
    await pageFixture.page.waitForTimeout(2000);
    await manageRevisionPage.selectManageContractors(this.revisionNumber);
});

Then('assigns a contractor', async function () {
    const manageRevisionPage = new ManageRevisionPage(pageFixture.page);

    await pageFixture.page.waitForTimeout(15000);
    await manageRevisionPage.assignContractorToEstimate();
});

When('the contractor searches and opens the assigned estimate and creates a revision', async function () {
    const landingPage = new LandingPage(pageFixture.page)
    const estimateBrowserPage = new EstimateBrowserPage(pageFixture.page)
    const manageRevisionPage = new ManageRevisionPage(pageFixture.page)

    await landingPage.selectEstimateBrowser()
    console.log("\nEstimate Browser selected")
    await pageFixture.page.waitForTimeout(7000)
    await estimateBrowserPage.searchEstimateNo(this.revisionNumber)
    await pageFixture.page.waitForTimeout(3000)
    await estimateBrowserPage.selectManageEstimate(this.revisionNumber)
    console.log(`\nAssigned Estimate: ${this.revisionNumber} Opened for Review`)
    await pageFixture.page.waitForTimeout(2000)
    this.revisionId = await manageRevisionPage.getProjectId();
    console.log(this.revisionId)

    const rev = await manageRevisionPage.addNewRevision()
    // expect(rev).toEqual('New Revision added successfully.')
    // console.log('\nNew Contractor Revision added successfully')
    this.contractorRevision = await manageRevisionPage.getRevisionNumber();

});

Then('contractor opens estimate specific library and adds a library', async function () {
    const manageRevisionPage = new ManageRevisionPage(pageFixture.page)

    const rev = await manageRevisionPage.applyEstimateSpecificLibrary(this.contractorRevision)
    // expect(rev).toEqual('New Library added successfully.')
});

Then('contractor opens the added library and uploads a EPD file', async function () {
    const manageRevisionPage = new ManageRevisionPage(pageFixture.page);
    const adminPage = new AdminPage(pageFixture.page);

    await manageRevisionPage.openLibrary();
    await adminPage.searchTab("FOG");
    await manageRevisionPage.uploadEPD();
});

Then('the contractor clicks apply to estimate and returns back to revision page', async function () {
    const manageRevisionPage = new ManageRevisionPage(pageFixture.page)
    await manageRevisionPage.backToContractorLibrary()
    await pageFixture.page.waitForTimeout(2000)
    await manageRevisionPage.applyToEstimate()
    await pageFixture.page.waitForTimeout(20000)
    await manageRevisionPage.backToRevision()
    await pageFixture.page.waitForTimeout(2000)
});

Then('contractor opens the newly created revision and opens a section and expands it', async function () {
    const manageRevisionPage = new ManageRevisionPage(pageFixture.page)
    const projectSummaryPage = new ProjectSummaryPage(pageFixture.page);
    const adminPage = new AdminPage(pageFixture.page);

    this.contractorRevision = await manageRevisionPage.getRevisionNumber();
    await manageRevisionPage.openRevision(this.contractorRevision);
    await pageFixture.page.waitForTimeout(5000);
    await adminPage.searchTab("Direct Works");
    await pageFixture.page.waitForTimeout(1500);
    await projectSummaryPage.openSection("Direct Works")
    console.log(`\nSection-${data.section} opened`)
    await pageFixture.page.waitForTimeout(1000);
    const item = "Segment 1"
    await projectSummaryPage.expandSection(item);
    await pageFixture.page.waitForTimeout(1500);
    await projectSummaryPage.expandSection("Site Clearance");
    await pageFixture.page.waitForTimeout(1500);
    await projectSummaryPage.expandSection("Site Clearance - Take up or down and remove to tip off Site lighting column including bracket arm and lantern");
    await pageFixture.page.waitForTimeout(3000);
});

Then('user modifies carbon values verifies the carbon values', async function () {
    const BOQPage = new BOQScreenPage(pageFixture.page);
    // await BOQPage.Recalculate();
});


Then('user deletes one of the resources', async function () {

});

Then('the contractor will add new item and enter the quantity', async function () {
    const projectSummaryPage = new ProjectSummaryPage(pageFixture.page);

    await projectSummaryPage.addItem("Site Clearance");
});

Then('will verify the total cost', async function () {
    const BOQPage = new BOQScreenPage(pageFixture.page);
    // await BOQPage.Recalculate();
});

Then('contractor will add a new resource and edit carbon values', async function () {
    const projectSummaryPage = new ProjectSummaryPage(pageFixture.page);

    await projectSummaryPage.addResource("Site Clearance - Take up or down and remove to tip off Site lighting column including bracket arm and lantern");
});

Then('contractor will add a subitem', async function () {
    const projectSummaryPage = new ProjectSummaryPage(pageFixture.page);
    await projectSummaryPage.addSubItem("Site Clearance - Take up or down and remove to tip off Site lighting column including bracket arm and lantern");
});

Then('contractor logs out', async function () {
    const userProfilePage = new UserProfilePage(pageFixture.page)
    await userProfilePage.logOut()
});

Then('the assignRevisionContract API is called to remove the contractor assigned', async function () {
    await apiHelper.assignRevisionContract(this.projectId, this.revisionId); 
});

Then('contractor deletes the added revision', async function () {
    const manageRevisionPage = new ManageRevisionPage(pageFixture.page)
   
    await manageRevisionPage.delRevision(this.contractorRevision)
});
