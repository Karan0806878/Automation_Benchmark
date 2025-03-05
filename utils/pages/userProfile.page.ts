import { Locator, Page } from "@playwright/test";

export class UserProfilePage {
  private page: Page;
  private openMenu: Locator;
  private logOff: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openMenu = page.locator(".user-info");
    this.logOff = page.getByText("Logout", { exact: true });
  }

  async logOut() {
    await this.openMenu.click();
    await this.logOff.click();
    await this.page.waitForTimeout(500)
  }
}
