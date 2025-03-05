import { Locator, Page } from "@playwright/test";
import { CustomFunction } from "../utilities/customFunction";
import { pageFixture } from "../../src/hooks/pageFixture";

export class ReportsPage {
  private page: Page;
  private estimateLevel: Locator;
  private aggregateBy: string;
  private aggregateDropdown: string;
  private aggregateParent: string;
  private comparator: Locator;
  private baseEstimateBy: string;
  private baseEstimateDropdown: string;
  private baseEstimateParent: string;
  private costElementComparator: Locator;
  private CCESS: Locator;
  private CCESSEstimate: Locator;
  private CostandCarbonExpenditureProfile: Locator;
  private CCEPEstimate: Locator;
  private CCEPSummarybtn: Locator;
  private refreshIcon: Locator;
  private portfolioRiskToggle: Locator;
  private inflationToggle: Locator;
  private closeBtn: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.estimateLevel = page.getByText("Estimate - Level", { exact: true });
    this.aggregateBy = `//*[contains(text(), 'Aggregate By')]`;
    this.aggregateDropdown = `input[role='combobox']`;
    this.aggregateParent = ".dropdown";
    this.comparator = page.getByText("Comparator", {exact: true});
    this.baseEstimateParent = ".dropdown";
    this.baseEstimateBy = `//*[contains(text(), '{desc}')]`;
    this.baseEstimateDropdown = `input[role='combobox']`;
    this.costElementComparator = page.getByText("Cost - Element Comparator", {exact: true});
    this.CCESS = page.getByText("Cost and Carbon Estimate Summary Sheet (CCESS)", {exact: true});
    this.CCESSEstimate = page.locator("(//td[@style='text-align: left;'])[15]");
    this.CostandCarbonExpenditureProfile = page.getByText("Cost and Carbon Expenditure Profile", {exact: true});
    this.CCEPEstimate = page.locator("(//td[@style='text-align: left;'])[15]");
    this.CCEPSummarybtn = page.locator("//span[@class='dx-button-text']");
    this.refreshIcon = page.locator("//i[@class='dx-icon dx-icon-refresh']");
    this.portfolioRiskToggle = page.locator("(//div[@class='dx-switch-handle'])[1]");
    this.inflationToggle = page.locator("(//div[@class='dx-switch-handle'])[2]");
    this.closeBtn = page.locator("//i[@class='dx-icon dx-icon-close']")
  }

  async selectEstimateLevelReport() {
    const customFunction = new CustomFunction(pageFixture.page);
    await this.estimateLevel.click();
    await this.page.waitForLoadState("load");
    customFunction.clickOnSibling(
      this.aggregateParent,
      this.aggregateBy,
      this.aggregateDropdown,
      0
    );
    console.log("\nClicked on Estimate Level - Aggregate By dropdown");
  }

  async selectEstimateAggregate(option: string) {
    await this.page.getByText(option, { exact: true }).click()
    await this.page.waitForLoadState("load");
    console.log(`\nAggregate By ${option} selected`);
  }

  async selectBaseEstimate() {
    await this.page.locator("(//div[@class='dx-item-content dx-list-item-content'])[1]").click()
    await this.page.waitForLoadState("load");
  }

  async selectRevision() {
    await this.page.locator("(//div[@class='m-4'])[1]").click()
    await this.page.waitForLoadState("load");
  }
  
  async selectComparator(){
    await this.comparator.click();
  }

  async selectComparatorReport(desc: string) {
    const customFunction = new CustomFunction(pageFixture.page);
    await this.page.waitForLoadState("load");
    const baseEstimateBy = this.baseEstimateBy
      .toString()
      .replace("{desc}", desc);
    customFunction.clickOnSibling(
      this.baseEstimateParent,
      baseEstimateBy,
      this.baseEstimateDropdown,
      0
    );
    await this.page.waitForLoadState("load");
    console.log("\nClicked on Comparator - Aggregate By dropdown");
  }

  async selectCostElementComparator(){
    await this.costElementComparator.click();
  }

  async selectCCESS() {
    await this.CCESS.click();
    const isTrue = await this.refreshIcon.isVisible();
    if (isTrue) {
      console.log("\nCost and Carbon Estimate Summary Sheet Verified");
    } else {
      console.log("\nCost and Carbon Estimate Summary Sheet not Verified");
    }
  }
  
  async selectCCESSEstimate() {
    await this.CCESSEstimate.click();
    await pageFixture.page.waitForTimeout(1500);
    await this.portfolioRiskToggle.click();
    await pageFixture.page.waitForTimeout(1500);
    await this.inflationToggle.click();
    await pageFixture.page.waitForTimeout(1500);
  }

  async selectCostandCarbonExpenditureProfile(){
    await this.CostandCarbonExpenditureProfile.click();
    const isTrue = await this.refreshIcon.isVisible();
    if (isTrue) {
      console.log("\nCost and Carbon Expenditure Profile Sheet Verified");
    } else {
      console.log("\nCost and Carbon Expenditure Profile Sheet not Verified");
    }
  }

  async selectCCEPEstimate() {
    await this.CCEPEstimate.click();
    await this.CCEPSummarybtn.click();
    await pageFixture.page.waitForTimeout(2000);
    await this.closeBtn.click();
  }
}
