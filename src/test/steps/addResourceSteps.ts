import { Then } from "@cucumber/cucumber";
import { ProjectSummaryPage } from "../../../utils/pages/projectSummary.page";
import { pageFixture } from "../../hooks/pageFixture";

Then('user expand the section and add a resource', async function () {
    const projectSummaryPage = new ProjectSummaryPage(pageFixture.page)

    const item = "Stage 0 - National Highways Other Costs"
    await projectSummaryPage.expandSection(item)
    console.log(`Item expanded ${item}`)
    await pageFixture.page.waitForTimeout(5000);
    await projectSummaryPage.addResource("")
    console.log("Resource successfully added")
  });