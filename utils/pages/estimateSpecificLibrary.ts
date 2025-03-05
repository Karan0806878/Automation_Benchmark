import { Locator, Page } from "@playwright/test";

export class EstimateSpecificLibraryPage {
  private page: Page;
  private addLibrary: Locator;
  private libraryName: Locator;
  private saveDialog: Locator;
  private applyToEstimate: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addLibrary = page.getByText("Add Library", { exact: true });
    this.libraryName = page.locator("input[name='libraryName']");
    this.saveDialog = page.locator(".submit-button");
    this.applyToEstimate = page.getByText("Apply To Estimate", { exact: true });
  }

  async addNewLibrary() {
    await this.addLibrary.click();
    await this.page.waitForTimeout(500);
    await this.libraryName.type(
      `${process.env.CCFTCONTRACTORUSERNAME} Library`
    );
    await this.page.waitForTimeout(500);
    await this.saveDialog.click();
  }

  async applyLibrarytoEstimate() {
    await this.page.waitForTimeout(500);
    await this.applyToEstimate.click();
    await this.page.waitForSelector("div[aria-label='Add Supplier']", {
      timeout: 90000,
    });
  }
}
