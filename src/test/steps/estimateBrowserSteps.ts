import { Then, setDefaultTimeout } from "@cucumber/cucumber"
import { LandingPage } from '../../../utils/pages/landing.page'
import { EstimateBrowserPage } from '../../../utils/pages/estimateBrowser.page'
import { ProjectSummaryPage } from "../../../utils/pages/projectSummary.page"
import * as data from '../../../utils/data/fixtures.data.json'
import { pageFixture } from "../../hooks/pageFixture"
import { SectionPage } from "../../../utils/pages/section.page"
setDefaultTimeout(60 * 1000);


Then('the user searches and selects the required project', async function () {
  const landingPage = new LandingPage(pageFixture.page)
  const estimateBrowserPage = new EstimateBrowserPage(pageFixture.page)

  await landingPage.selectEstimateBrowser()
  console.log("\nEstimate Browser selected")
  await pageFixture.page.waitForTimeout(5000);
  // for estimate browser
  // await estimateBrowserPage.searchEstimate(data.estimateDescription)
  // await estimateBrowserPage.selectEstimate(data.estimateDescription)

  // for BOQScreen
  await estimateBrowserPage.searchEstimate("Verify CCFT-115 with IFT")
  await estimateBrowserPage.selectEstimate("Verify CCFT-115 with IFT")
  await pageFixture.page.waitForTimeout(500)
  console.log("\nEstimate Opened for Review")
});

Then('the item rates are retrieved', async function () {
  const projectSummaryPage = new ProjectSummaryPage(pageFixture.page)
  const sectionpage = new SectionPage(pageFixture.page) 

  await projectSummaryPage.openSection(data.section)
  console.log(`\nSection-${data.section} opened`)
  const item = "Historic Pre PCF Stage Costs"
  await sectionpage.openItem(item)
  console.log(`\nItem Opened ${item}`)
  var rate = await sectionpage.getItemRate("Small tools")
  console.log(`\nRate for the Item is ${rate}`)
});