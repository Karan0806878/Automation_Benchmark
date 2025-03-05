import { Then } from "@cucumber/cucumber";
import { EstimateBrowserPage } from "../../../utils/pages/estimateBrowser.page";
import { pageFixture } from "../../hooks/pageFixture";
import * as data from '../../../utils/data/fixtures.data.json'
import { ProjectSummaryPage } from "../../../utils/pages/projectSummary.page";

Then('user selects project and update project details', async function () {
  const estimateBrowserPage = new EstimateBrowserPage(pageFixture.page)
  const projectSummaryPage = new ProjectSummaryPage(pageFixture.page)

  await estimateBrowserPage.selectManageEstimateProject(data.estimateDescription3)
  await projectSummaryPage.openSection(data.section)
  console.log(`Section-${data.section} opened`)
  const item = "Stage 0 - Technical Advisor"
  await projectSummaryPage.clickEditButton(item)
  console.log(`Item Opened ${item}`)
  await projectSummaryPage.updateDetails()
  console.log("Updated quantity successfully")
});