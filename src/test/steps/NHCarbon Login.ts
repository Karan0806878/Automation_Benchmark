import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "../../../utils/pages/login.page";
import * as data from "../../../utils/data/fixtures.data.json";
import { pageFixture } from "../../hooks/pageFixture";
setDefaultTimeout(60 * 1000);

Given('User launches the VER10 Application', async function () {
  await pageFixture.page.goto(data.NHCarbon2URL);
});

When('User enters the vijay', async function () {
  const loginPage = new LoginPage(pageFixture.page);
  await loginPage.performLogin('vijay');
});

Then('The user login should be successful', async function ()  {
  const loginPage = new LoginPage(pageFixture.page);
  console.log('User Login is successful');
});