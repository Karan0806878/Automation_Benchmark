import { Locator, Page } from "@playwright/test";

export class LandingPage {
  private page: Page;
  private estimateBrowser: Locator;
  private reports: Locator;
  private admin: Locator;

  constructor(page: Page) {
    this.page = page;
    this.estimateBrowser = page.getByText("Estimate Browser", { exact: true });
    this.reports = page.getByText("Reports", { exact: true });
    this.admin = page.getByText("Admin", { exact: true });
  }

  async selectEstimateBrowser() {
    await this.estimateBrowser.click();
    await this.page.waitForLoadState("load");
  }

  async selectReports() {
    await this.reports.click();
    await this.page.waitForLoadState("load");
  }

  async selectAdmin() {
    await this.admin.click();
    await this.page.waitForLoadState("load");
  }
}
