import { Given, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "../../../utils/pages/login.page";
import * as data from "../../../utils/data/fixtures.data.json";
import { pageFixture } from "../../hooks/pageFixture";
setDefaultTimeout(60 * 1000);
import { setToken } from '../../../utils/apiHelper/loginToken';

Given("User launches the Carbon tool", async function () {
  await pageFixture.page.goto(data.NHCarbon2URL);
});

Then(/^the user login should be successful with (.*) profile/, async function (user: string) {
  const loginPage = new LoginPage(pageFixture.page);
  const newToken = await loginPage.performLogin(user);
  if (user === "admin" && newToken) {
    setToken(newToken);
    console.log(newToken)
  }
  console.log(`\nUser Login is successful with ${user} profile`);
});

Then(
  "the user login should fail when incorrect credentials are used",
  async function () {
    const loginPage = new LoginPage(pageFixture.page);
    await loginPage.performInvalidLogin();
    var error = await loginPage.performInvalidLogin();
    expect(error).toEqual("Invalid credentials");
    console.log("\nCorrect Error Message is displayed");
    await pageFixture.page.waitForTimeout(2000);
  }
);
