import { Then } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixture";
import { ProjectSummaryPage } from "../../../utils/pages/projectSummary.page";
import * as data from '../../../utils/data/fixtures.data.json'
import { LandingPage } from "../../../utils/pages/landing.page";
import { EstimateBrowserPage } from "../../../utils/pages/estimateBrowser.page";
import { ManageRevisionPage } from "../../../utils/pages/manageRevision.page";
import { AdminPage } from "../../../utils/pages/admin.page";
import { BOQScreenPage } from "../../../utils/pages/BOQScreen.page";

Then('user navigates to Base carbon library and updates the A1-A3, A5W and waste factor for a resource', async function () {
    const landingPage = new LandingPage(pageFixture.page);
    const adminPage = new AdminPage(pageFixture.page);

    await landingPage.selectAdmin();
    console.log("\nAdmin selected");
    await adminPage.selectMasterData();
    await adminPage.selectEmissionFactors();
    await adminPage.selectBaseCarbonLibrary();
    await pageFixture.page.waitForTimeout(15000);
    //0200.12.50.30.002
    await adminPage.searchTab("0200.12.50.30.002");
    await pageFixture.page.waitForTimeout(5000);
    await adminPage.updateValues();
    await pageFixture.page.waitForTimeout(10000);
});

Then('user selects a section and expands it upto resource level', async function () {
    const projectSummaryPage = new ProjectSummaryPage(pageFixture.page);
    const adminPage = new AdminPage(pageFixture.page);
    const BOQPage = new BOQScreenPage(pageFixture.page);

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
    await pageFixture.page.waitForTimeout(1500);
    // await BOQPage.Recalculate();
});

Then('user verifies the carbon values', async function () {
    const BOQPage = new BOQScreenPage(pageFixture.page);

    var no = await BOQPage.verifyCarbonValues("Site Clearance - Take up or down and remove to tip off Site lighting column including bracket arm and lantern");
    console.log(no)
});

Then('user navigates to the estimate browser home screen and selects manage revision', async function () {
    const landingPage = new LandingPage(pageFixture.page);
    const estimateBrowserPage = new EstimateBrowserPage(pageFixture.page);

    await landingPage.selectEstimateBrowser();
    await pageFixture.page.waitForTimeout(2000);
    await estimateBrowserPage.selectActions();
});

Then('user add a new revision and opens newly created revision', async function () {
    const manageRevisionPage = new ManageRevisionPage(pageFixture.page);
    // await manageRevisionPage.addNewRevision();
    await manageRevisionPage.selectLatestEstimate();
    await pageFixture.page.waitForTimeout(5000);
    const revisionNumber = await manageRevisionPage.getRevisionNumber();
    if (revisionNumber !== null) {
        await manageRevisionPage.openRevision(revisionNumber);
    } else {
        console.error('Revision number is null.');
    }
    await pageFixture.page.waitForTimeout(10000);
});

Then('select any section and expand upto normal item level', async function () {

});