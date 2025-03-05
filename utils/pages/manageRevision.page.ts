import { Locator, Page } from "@playwright/test";
import { CustomFunction } from "../utilities/customFunction";
import { pageFixture } from "../../src/hooks/pageFixture";

export class ManageRevisionPage {
  private page: Page;
  private addRevision: Locator;
  private confirmYes: Locator;
  private revisionSuccess: Locator;
  private revisionRow: Locator;
  private addMoreRow: Locator;
  private estimateNumber: string;
  private manageRevision: Locator;
  private pageNavigator: Locator;
  private sortContractor: Locator;
  private assignContractor: Locator;
  private assignContractorSuccess: Locator;
  private closeAssignContractor: Locator;
  private openEstimateSpecificLib: Locator;
  private arrangeEstimates: Locator;
  private viewIFT: Locator;
  private schedule: Locator;
  private scope: Locator;
  private riskRegister: Locator;
  private inflationAndSpend: Locator;
  private calender: Locator;
  private savebtn: Locator;
  private carbonToggle: Locator;
  private baselineToggle: Locator;
  private deleteRevision: string;
  private estimateRow: string;
  private spindown: string;
  private selectRevision: string;
  private addLibrary: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addRevision = page.getByText("Add Revision", { exact: true });
    this.confirmYes = page.getByText("Add", { exact: true });
    this.addMoreRow = page.getByText("200", { exact: true });
    this.revisionSuccess = page.locator(".dx-toast-message");
    this.revisionRow = page.locator(
      ".dx-data-row.dx-row-lines.dx-column-lines"
    );
    this.estimateNumber = "CT@-";
    this.manageRevision = page.getByText("Manage Contractors", { exact: true });
    this.pageNavigator = page.locator(".dx-overlay-content .dx-page-sizes");
    this.sortContractor = page.getByText("Un-Assigned From", { exact: true });
    this.assignContractor = page.locator("[data-icon='circle-left']");
    this.assignContractorSuccess = page.locator(".dx-toast-success");
    this.closeAssignContractor = page.locator(".dx-closebutton");
    this.openEstimateSpecificLib = page.getByText("Apply Estimate-Specific Library", { exact: true });
    this.arrangeEstimates = page.locator("(//span[@class='dx-sort dx-sort-up'])[1]");
    this.viewIFT = page.getByText("View IFT", { exact: true });
    this.schedule = page.getByText("Schedule", { exact: true });
    this.scope = page.getByText("Scope", { exact: true });
    this.riskRegister = page.getByText("Risk Register", { exact: true });
    this.inflationAndSpend = page.getByText("Inflation And Spend", { exact: true });
    this.calender = page.locator("(//div[@class='dx-dropdowneditor-icon'])[5]");
    this.savebtn = page.locator("//i[@class='dx-icon dx-icon-save']");
    this.carbonToggle = page.locator("(//div[@class='dx-switch-handle'])[1]");
    this.baselineToggle = page.locator("(//div[@class='dx-switch-handle'])[2]");
    this.deleteRevision = "//a[@title='Delete']";
    this.estimateRow = '.dx-data-row.dx-row-lines.dx-column-lines';
    this.spindown = ".dx-icon-spindown";
    this.selectRevision = "[role='gridcell'] >> text='{desc}'";
    this.addLibrary = page.getByText("Add Library", { exact: true });
  }

  async addNewRevision() {
    await this.addRevision.click();
    await this.confirmYes.click();
    await this.page.waitForTimeout(35000);
    // await this.page.waitForSelector(".dx-toast-message", { timeout: 90000 });
    // return await this.revisionSuccess.textContent();
  }

  async getTotalRevision() {
    return await this.revisionRow.count();
  }

  async addMoreRows() {
    await this.addMoreRow.click();
  }

  async getEstimateNumber() {
    const texts = await this.revisionRow
      .locator("td[aria-colindex='2']")
      .allTextContents();
    let maxNumber = -Infinity; // Initialize with negative infinity to ensure the first number is greater
    for (const item of texts) {
      const match = item.match(/CT(\d+(?:\.\d+)?)-/);

      if (match && match[1]) {
        const extractedNumber = parseFloat(match[1]);
        if (!isNaN(extractedNumber)) {
          maxNumber = Math.max(maxNumber, extractedNumber);
        }
      }
    }
    this.estimateNumber = this.estimateNumber.replace(
      "@",
      maxNumber.toString()
    );
    return await this.page.getByText(this.estimateNumber).textContent();
  }

  async assignEstimateToContractor(estimate: string, contractor: string) {
    await this.page
      .getByText(estimate, { exact: true })
      .click({ button: "right" });
    await this.manageRevision.click();
    await this.page.waitForSelector('.role',  { timeout: 90000 })
    // Select all the contractors visible
    await this.pageNavigator.getByText("20", { exact: true }).nth(1).click();
    // Sort the contractors in descending order
    await this.sortContractor.click();
    await this.sortContractor.click();
    // Select the Contractor
    await this.page.getByRole("dialog").getByText(contractor, { exact: true }).click();
    await this.assignContractor.click();
    await this.page.waitForTimeout(1000);
    let success = await this.assignContractorSuccess.textContent();
    // Close the popup
    await this.closeAssignContractor.click();
    return success;
  }

  async openContSpecificLib(estimate: string) {
    await this.page
      .getByText(estimate, { exact: true })
      .click({ button: "right" });
    await this.openEstimateSpecificLib.click()   
  }

  async selectLatestEstimate(){
    await this.arrangeEstimates.click();
    await this.page.waitForTimeout(1000);
  }
  
  async selectViewIFT(){
    await this.page.locator("(//i)[31]").click()  
    await this.viewIFT.click(); 
  }

  async getRevisionNumber() {
    return await this.page.locator("(//td[@class='dx-hidden-cell'])[3]").textContent();
  }

  async openRevision(desc: string) {
    const xpath = `(//td[@role='gridcell'][normalize-space()='{desc}'])[2]`;
    const openRevision = xpath
    .toString()
    .replace("{desc}", desc);
    await this.page.locator(openRevision).click();
  }

  async selectManageContractors(desc: string) {
    const customFunction = new CustomFunction(pageFixture.page);
    const estimateNew = this.selectRevision
      .toString()
      .replace("{desc}", desc);
    customFunction.clickOnSibling(
      this.estimateRow,
      estimateNew,
      this.spindown,
      1)
    await this.page.getByText("Manage Contractors", { exact: true }).click();
  }

  async assignContractorToEstimate(){
    await this.sortContractor.click();
    await this.page.getByRole("dialog").getByText("ContS1", { exact: true }).click();
    await this.assignContractor.click();
    await this.page.waitForTimeout(2000);
    await this.assignContractorSuccess.textContent();
    await this.closeAssignContractor.click();
    await pageFixture.page.waitForTimeout(5000);
  }

  async applyEstimateSpecificLibrary(desc: string) {
    const customFunction = new CustomFunction(pageFixture.page);
    const estimateNew = this.selectRevision
      .toString()
      .replace("{desc}", desc);
    customFunction.clickOnSibling(
      this.estimateRow,
      estimateNew,
      this.spindown,
      1);
    await this.page.waitForTimeout(2000);
    await this.page.getByText("Apply Estimate-Specific Library", { exact: true }).click();
    await this.page.waitForTimeout(2000);
    await this.addLibrary.click();
    await this.page.waitForTimeout(2000);
    await this.page.locator("//input[@name='libraryName']").type("Automation");
    await this.page.waitForTimeout(2000);
    await this.page.getByText("Save", { exact: true }).click();
    await this.page.waitForSelector(".dx-toast-message", { timeout: 90000 });
    return await this.revisionSuccess.textContent();
  }

  async openLibrary() {
    await this.page.locator("//label[normalize-space()='Automation']").click();
    await this.page.waitForTimeout(2000);
  }

  async uploadEPD() {

    await this.page.locator("(//div[normalize-space()='Unit'])[1]").click()
    await this.page.waitForTimeout(2000);
    await this.page.locator("(//div[normalize-space()='Type'])[1]").click()
    await this.page.waitForTimeout(2000);
    await this.page.locator("(//div[normalize-space()='Mode of Transportation 2'])[1]").click()
    await this.page.waitForTimeout(2000);
}

  async getProjectId() {
    const currentURL = await this.page.url();
    const projectIdMatch = currentURL.match(/\/project\/(\d+)\//);
    if (projectIdMatch && projectIdMatch[1]) {
      const projectId = projectIdMatch[1];
      return projectId;
    } else {
      return null;
    }
  }

  async backToContractorLibrary() {
    await this.page.locator("//span[normalize-space()='Back to Contractor Libraries']").click();
  }

  async applyToEstimate() {
    await this.page.locator("//span[normalize-space()='Apply To Estimate']").click()
  }

  async backToRevision() {
    await this.page.locator("(//span[@title='Verify CCFT-115 with IFT'])[2]").click()
  }

  async delRevision(desc: string) {
    await this.page.goBack();
    await this.page.waitForTimeout(2000);
    await this.page.goBack();
    await this.page.waitForTimeout(2000);
    await this.page.locator("(//a[@title='Delete'])[2]").click();
    await this.page.waitForTimeout(2000);
    await this.page.locator("//span[normalize-space()='Yes']").click();
    await this.page.waitForTimeout(25000);
  }
}
