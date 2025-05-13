import { Locator, Page } from "@playwright/test";
import "dotenv/config";

export class LoginPage {
  private page: Page;
  private email: Locator;
  private pwd: Locator;
  private submit: Locator;
  private invalidLogin: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.locator("input[name='email']");
    this.pwd = page.locator("input[name='password']");
    this.submit = page.getByText("Log In", { exact: true });
    this.invalidLogin = page.locator(".dx-toast-message").nth(0); // As there are 2 duplicate elements, select 1
  }

  async performLogin(usertype: string): Promise<string | null> {
    let token: string | null = null;

    if (usertype === "admin") {
      await this.email.type(process.env.CCFTADMINUSERNAME ?? "NewUsername");
      await this.pwd.type(process.env.CCFTPASSWORD ?? "DefaultPwd");

      await this.submit.click({ timeout: 10000 });
      await this.page.waitForLoadState("load");

      await this.page.waitForFunction(() => {
        return localStorage.getItem("user");
      }, { timeout: 60000 });

      token = await this.page.evaluate(() => {
        const user = JSON.parse(localStorage.getItem("user")!);
        return user.accessToken;
      });

      if (token) {
        return token;
      } else {
        return null;
      }
    } else if (usertype === "contractor") {
      await this.email.type(process.env.CCFTCONTRACTORUSERNAME ?? "NewUsername");
      await this.pwd.type(process.env.CCFTPASSWORD ?? "DefaultPwd");
      await this.submit.click({ timeout: 10000 });
      await this.page.waitForLoadState("load");
    } else if (usertype === "vijay") {
      await this.email.type(process.env.CCFTCONTRACTORUSERNAME ?? "vijaym");
      await this.pwd.type(process.env.CCFTPASSWORD ?? "Welcome123");
      await this.submit.click({ timeout: 10000 });
      await this.page.waitForLoadState("load");
    }

    return token;
  }

  async performInvalidLogin() {
    await this.email.type("Invalid User");
    await this.pwd.type("Invalid Pwd");
    await this.submit.click({ timeout: 10000 });
    await this.page.waitForLoadState("load");
    await this.page.waitForTimeout(1000)
    return await this.invalidLogin.textContent();
  }
}
