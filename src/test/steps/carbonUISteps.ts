import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { LandingPage } from "../../../utils/pages/landing.page";
import { EstimateBrowserPage } from "../../../utils/pages/estimateBrowser.page";
import { ReportsPage } from "../../../utils/pages/reports.page";
import * as data from "../../../utils/data/fixtures.data.json";
import { pageFixture } from "../../hooks/pageFixture";
import { expect } from "@playwright/test";
import { UserProfilePage } from "../../../utils/pages/userProfile.page";
import { EstimateSpecificLibraryPage } from "../../../utils/pages/estimateSpecificLibrary";
import { AdminPage } from "../../../utils/pages/admin.page";
setDefaultTimeout(60 * 1000);

Then(
  "the estimate browser option should be available with all the projects listed",
  async function () {
    const landingPage = new LandingPage(pageFixture.page);
    const estimateBrowserPage = new EstimateBrowserPage(pageFixture.page);

    await landingPage.selectEstimateBrowser();
    console.log("\nEstimate Browser selected");
    await pageFixture.page.waitForTimeout(7000)
    await estimateBrowserPage.searchEstimate(data.estimateDescription);
    console.log("\nEstimate Searched");
    await pageFixture.page.waitForTimeout(3000);
  }
);

Then("the User selects the Reports options", async function () {
  const landingPage = new LandingPage(pageFixture.page);
  await landingPage.selectReports();
  console.log("\nReports selected");
});

Then("all the Reports should be available", async function () {
  const reportsPage = new ReportsPage(pageFixture.page);
  reportsPage.selectEstimateLevelReport();
  await pageFixture.page.waitForTimeout(1500);
  reportsPage.selectEstimateAggregate("Item")
  await pageFixture.page.waitForTimeout(1500);
  reportsPage.selectEstimateLevelReport();  
  reportsPage.selectEstimateAggregate("Resource")
  await pageFixture.page.waitForTimeout(8000);
});

When('the User clicks on comparator option', async function () {
  const reportsPage = new ReportsPage(pageFixture.page);
  reportsPage.selectComparator();
  await pageFixture.page.waitForTimeout(1500);
});

Then('IFT comparator reports will be available', async function () {
  const reportsPage = new ReportsPage(pageFixture.page);
  reportsPage.selectComparatorReport("Baseline Estimate");
  await pageFixture.page.waitForTimeout(1500);
  reportsPage.selectBaseEstimate()
  await pageFixture.page.waitForTimeout(1500);
  reportsPage.selectComparatorReport("Revision");
  await pageFixture.page.waitForTimeout(1500);
  reportsPage.selectRevision()
  await pageFixture.page.waitForTimeout(20000);
  reportsPage.selectComparatorReport("Compare By");
  await pageFixture.page.waitForTimeout(1500);
  reportsPage.selectEstimateAggregate("Carbon Variance")
  await pageFixture.page.waitForTimeout(1500);
});

When('the User clicks Cost-Element Comparator option', async function () {
  const reportsPage = new ReportsPage(pageFixture.page);
  reportsPage.selectCostElementComparator();
  await pageFixture.page.waitForTimeout(1500);
});

Then('Cost-Element Comparator reports will be available', async function () {
  const reportsPage = new ReportsPage(pageFixture.page);
  reportsPage.selectComparatorReport("Base Estimate");
  await pageFixture.page.waitForTimeout(1500);
  reportsPage.selectBaseEstimate()
  await pageFixture.page.waitForTimeout(1500);
  reportsPage.selectComparatorReport("Revision");
  await pageFixture.page.waitForTimeout(1500);
  // reportsPage.selectRevision()
  // await pageFixture.page.waitForTimeout(20000);
  reportsPage.selectComparatorReport("Compare By");
  await pageFixture.page.waitForTimeout(1500);
  reportsPage.selectEstimateAggregate("Inflation")
  await pageFixture.page.waitForTimeout(3000);
});

When('the User clicks on CCESS option', async function () {
  const reportsPage = new ReportsPage(pageFixture.page);
  reportsPage.selectCCESS();
  await pageFixture.page.waitForTimeout(1500);
});

Then('CCESS reports should be available', async function () {
  const reportsPage = new ReportsPage(pageFixture.page);
  reportsPage.selectCCESSEstimate();
  await pageFixture.page.waitForTimeout(10000);
});

When('the User clicks on Cost and Carbon Expenditure Profile option', async function () {
  const reportsPage = new ReportsPage(pageFixture.page);
  reportsPage.selectCostandCarbonExpenditureProfile();
  await pageFixture.page.waitForTimeout(3000);
});

Then('Cost and Carbon Expenditure Profile reports will be available', async function () {
  const reportsPage = new ReportsPage(pageFixture.page);
  reportsPage.selectCCEPEstimate();
  await pageFixture.page.waitForTimeout(4000);
});

When('the User selects the Admin Control-Panel option', async function () {
  const landingPage = new LandingPage(pageFixture.page);
  await landingPage.selectAdmin();
  console.log("\nAdmin selected");
  const adminPage = new AdminPage(pageFixture.page);
  await adminPage.selectControlPanel();
  console.log("\nControl Panel selected");

});

Then('all the Assign Inflation Index should be available', async function () {
  const adminPage = new AdminPage(pageFixture.page);
  await adminPage.selectAssignInflationIndex();
  console.log("\nAssign Inflation Index selected");
  await pageFixture.page.waitForTimeout(3000);
});

When('the User clicks on Admin Master Data option', async function () {
  const adminPage = new AdminPage(pageFixture.page);
  await adminPage.selectMasterData();
  console.log("\nMaster Data selected");
  await pageFixture.page.waitForTimeout(1500);
});

Then('all the Codes will be available', async function () {
  const adminPage = new AdminPage(pageFixture.page);
  await adminPage.selectCodes();
  console.log("\nCodes selected");
});

When('the User clicks on Admin Master Data Baseline Assumptions', async function () {
  const adminPage = new AdminPage(pageFixture.page);
  await adminPage.selectBaselineAssumptions();
  console.log("\nBaseline Assumptions selected");
  await pageFixture.page.waitForTimeout(1500);
});

Then('all the transport assumptions will be available', async function () {
  const adminPage = new AdminPage(pageFixture.page);
  await adminPage.selectTransport();
  console.log("\nTransport Assumptions selected");
});

Then('all the Mode of transportwill be available', async function () {
  const adminPage = new AdminPage(pageFixture.page);
  await adminPage.selectModeOfTransport();
  console.log("\nMode of Transport selected");
  await pageFixture.page.waitForTimeout(1500);
});

When('the User clicks on Admin Master Data Emission Factors', async function () {
  const adminPage = new AdminPage(pageFixture.page);
  await adminPage.selectEmissionFactors();
  console.log("\nEmission Factors selected");
  await pageFixture.page.waitForTimeout(1500);
});

Then('Base Carbon Library will be available', async function () {
  const adminPage = new AdminPage(pageFixture.page);
  await adminPage.selectBaseCarbonLibrary();
  console.log("\nBase Carbon Library selected");
  await pageFixture.page.waitForTimeout(10000);
});

When('the User clicks on Admin Master Data Dynamic Carbon Library', async function () {
  const adminPage = new AdminPage(pageFixture.page);
  await adminPage.selectDynamicCarbonLibrary();
  console.log("\nDynamic Carbon Library selected");
  await pageFixture.page.waitForTimeout(1500);
});

Then('Dynamic Carbon Library will be available', async function () {
  const adminPage = new AdminPage(pageFixture.page);
  await adminPage.verfiyDynamicCarbonLibrary();
  await pageFixture.page.waitForTimeout(1500);
});

When('the User clicks on Admin Role Based Access', async function () {
  const adminPage = new AdminPage(pageFixture.page);
  await adminPage.selectRoleBasedAccess();
  console.log("\nRole Based Access selected");
  await pageFixture.page.waitForTimeout(1500);
});

Then('Assign Estimators to Roles option will be available', async function () {
  const adminPage = new AdminPage(pageFixture.page);
  await adminPage.selectAssignEstimatorsToRoles();
  adminPage.select("Select Role");
  await pageFixture.page.waitForTimeout(1500);
  adminPage.selectRole("Authority Estimators");
  await pageFixture.page.waitForTimeout(1500);
  adminPage.select("Select Role");
  await pageFixture.page.waitForTimeout(1500);
  adminPage.selectRole("Contractors");
  await pageFixture.page.waitForTimeout(1500);
});

Then('Role Permissions option will also be available', async function () {
  const adminPage = new AdminPage(pageFixture.page);
  await adminPage.selectRolePermissions();
  console.log("\nRole Permissions selected");
  await pageFixture.page.waitForTimeout(1500);
  adminPage.select("Select Role");
  await pageFixture.page.waitForTimeout(1500);
  adminPage.selectRole("Authority Estimators");
  await pageFixture.page.waitForTimeout(1500);
  adminPage.select("Select Role");
  await pageFixture.page.waitForTimeout(1500);
  adminPage.selectRole("Contractors");
  await pageFixture.page.waitForTimeout(1500);
});