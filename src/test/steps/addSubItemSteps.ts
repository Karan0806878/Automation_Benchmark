import { Then } from "@cucumber/cucumber";
import { EstimateBrowserPage } from "../../../utils/pages/estimateBrowser.page";
import { pageFixture } from "../../hooks/pageFixture";
import { ProjectSummaryPage } from "../../../utils/pages/projectSummary.page";
import * as data from '../../../utils/data/fixtures.data.json'
import { LandingPage } from "../../../utils/pages/landing.page";

Then('the user searches project and clicks on actions and selects manage revision', async function () {
    const landingPage = new LandingPage(pageFixture.page)
    const estimateBrowserPage = new EstimateBrowserPage(pageFixture.page)
  
    await landingPage.selectEstimateBrowser()
    console.log("Estimate Browser selected")
    await pageFixture.page.waitForTimeout(5000);
    // await estimateBrowserPage.searchEstimate(data.estimateDescription) for estimate browser  
    // await estimateBrowserPage.selectManageEstimate(data.estimateDescription) for estimate browser

    // for subitem and add resource
    // await estimateBrowserPage.searchEstimate("Verify HE-1154 H3"); 

    // for IFT
    await estimateBrowserPage.searchEstimate("Verify CCFT-115 with IFT");

    await pageFixture.page.waitForTimeout(5000);
    await estimateBrowserPage.selectActions();
    console.log("Manage Revisions Opened")
  });

Then('user selects the project and selects a section', async function () {
    const estimateBrowserPage = new EstimateBrowserPage(pageFixture.page)
    const projectSummaryPage = new ProjectSummaryPage(pageFixture.page)
  
    await estimateBrowserPage.searchEstimateNo("CT12-CP.0005");
    await pageFixture.page.waitForTimeout(5000);
    await estimateBrowserPage.selectRevision();
    await projectSummaryPage.openSection(data.section)
    console.log(`Section-${data.section} opened`)
});

Then('user expand the section and add a subItem', async function () {
    const projectSummaryPage = new ProjectSummaryPage(pageFixture.page)

    const item = "Stage 0 - National Highways Other Costs"
    await projectSummaryPage.expandSection(item)
    console.log(`Item expanded ${item}`)
    await projectSummaryPage.addSubItem("")

  });
