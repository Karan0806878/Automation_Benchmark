import { Then } from "@cucumber/cucumber";
import { ProjectSummaryPage } from "../../../utils/pages/projectSummary.page";
import { pageFixture } from "../../hooks/pageFixture";
import { ManageRevisionPage } from "../../../utils/pages/manageRevision.page";
import { IFTComparator } from "../../../utils/pages/IFTComparator.page";
import { LandingPage } from "../../../utils/pages/landing.page";
import { ReportsPage } from "../../../utils/pages/reports.page";

Then('user creates a revision and then clicks on actions and select View IFT', async function () {
    const manageRevisionPage = new ManageRevisionPage(pageFixture.page);
    // await manageRevisionPage.addNewRevision();
    console.log('\nNew Revision added successfully');
    await manageRevisionPage.selectLatestEstimate();
    await manageRevisionPage.selectViewIFT();
    await pageFixture.page.waitForTimeout(5000);
    console.log('\nIFT screen opened for the revision');
});

Then('user make adjustments to Revision in each IFT tab', async function () {
    const iftComparator = new IFTComparator(pageFixture.page);
    await iftComparator.revisionAdjustment();
    await pageFixture.page.waitForTimeout(2500);
    await iftComparator.expandStage("Pre PCF Stage")
    await pageFixture.page.waitForTimeout(1000);
    await iftComparator.expandCompositeTotal("Stage 0 - National Highways Other Costs");
    await pageFixture.page.waitForTimeout(1000);
    await iftComparator.expandNormalItem("Levels")
    await pageFixture.page.waitForTimeout(10000);
});

Then('user goes to comparator and compares the baseline and revesion for cost and Carbon', async function () {
    const landingPage = new LandingPage(pageFixture.page);
    const reportsPage = new ReportsPage(pageFixture.page);
    await landingPage.selectReports();
    console.log("\nReports selected");
    reportsPage.selectComparator();
    await pageFixture.page.waitForTimeout(1500);
    reportsPage.selectComparatorReport("Base Estimate");
    await pageFixture.page.waitForTimeout(1500);
    reportsPage.selectBaseEstimate()
    await pageFixture.page.waitForTimeout(1500);
    reportsPage.selectComparatorReport("Revision");
    await pageFixture.page.waitForTimeout(1500);
    reportsPage.selectRevision()
    await pageFixture.page.waitForTimeout(20000);
    reportsPage.selectComparatorReport("Compare By");
    await pageFixture.page.waitForTimeout(1500);
    reportsPage.selectEstimateAggregate("Carbon")
    await pageFixture.page.waitForTimeout(3000);
    reportsPage.selectComparatorReport("Base Estimate");
    await pageFixture.page.waitForTimeout(1500);
});

Then('user marks the revision as nominate preferred revision', async function () {
    const iftComparator = new IFTComparator(pageFixture.page);
    const reportsPage = new ReportsPage(pageFixture.page);
    await iftComparator.nominateRevision();
    await pageFixture.page.waitForTimeout(10000);
});

Then('user shall view the CESS report for the revision', async function () {
    const reportsPage = new ReportsPage(pageFixture.page);
    reportsPage.selectCCESS();
    await pageFixture.page.waitForTimeout(1500);
});

Then('user shall view the carbon expense profile report', async function () {
    const reportsPage = new ReportsPage(pageFixture.page);
    reportsPage.selectCostandCarbonExpenditureProfile();
    await pageFixture.page.waitForTimeout(3000);
});
