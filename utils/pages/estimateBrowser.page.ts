import { Locator, Page } from "@playwright/test";
import { CustomFunction } from "../utilities/customFunction";
import { pageFixture } from "../../src/hooks/pageFixture";

export class EstimateBrowserPage {
  private page: Page;
  private descriptionSearchBox: Locator;
  private manageRevision: Locator;
  private estimateNoSearchBox: Locator;
  private estimateRow: string;
  private contextOption: string;
  private estimate: String;
  private estimateProjectlist: string;
  private actions: Locator;

  constructor(page: Page) {
    this.page = page;
    this.descriptionSearchBox = page
      .locator("(//input[@aria-label='Filter cell'])[3]");
    this.estimateNoSearchBox = page
      .locator("(//input[@aria-label='Filter cell'])[2]")
    this.manageRevision = page.getByText("Manage Revisions", { exact: true });
    this.estimateRow = `tr[role='row']`;
    this.estimate = "[role='gridcell'] >> text='{desc}'";
    this.contextOption = `.dx-icon-spindown`;
    this.estimateProjectlist = "(//td[@role='gridcell'][normalize-space()='{desc}'])[7]";
    this.actions = page.getByRole('row', { name: 'New Scheme 03 11.07 Verify CCFT-115 with IFT spindown' }).getByLabel('spindown')
  }

  async searchEstimate(desc: string) {
    await this.descriptionSearchBox.type(desc, {timeout: 40000});
    await this.page.waitForLoadState("load");
  }

  async searchEstimateNo(desc: string) {
    await this.estimateNoSearchBox.type(desc);
    await this.page.waitForLoadState("load");
  }

  async selectEstimate(desc: string) {
    await this.page.waitForTimeout(1000);
    const estimateListNew = this.estimate
      .toString()
      .replace("{desc}", desc);
    await this.page.locator(estimateListNew).nth(1).click();
    await this.page.waitForLoadState("load");
  }

  async selectManageEstimate(desc: string) {
    const customFunction = new CustomFunction(pageFixture.page);
    const estimateNew = this.estimate
      .toString()
      .replace("{desc}", desc);
    customFunction.clickOnSibling(
      this.estimateRow,
      estimateNew,
      this.contextOption,
      1
    );
    await this.page.waitForTimeout(500)
    await this.manageRevision.click()
    await this.page.waitForLoadState("load");
  }

  async selectManageEstimateProject(desc: string) {
    const estimateListNew = this.estimateProjectlist
      .toString()
      .replace("{desc}", desc);
    await this.page.locator(estimateListNew).click(); //Selecting the correct Estimate out of 2
    await this.page.waitForLoadState("load");
  }

  async selectActions() {
    await this.actions.click();
    await this.page.waitForTimeout(2000)
    await this.manageRevision.click();
    await this.page.waitForTimeout(5000)
  }

  async selectRevision() {
    await this.page.locator("(//td[@role='gridcell'][normalize-space()='CT12-CP.0005'])[2]").click();
  }
}
