import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "../../../utils/pages/login.page";
import * as data from "../../../utils/data/fixtures.data.json";
import { pageFixture } from "../../hooks/pageFixture";
import { test } from '@playwright/test';
setDefaultTimeout(60 * 1000);

function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

Given('User is on NH Application Home Page test variable data', async () => {
  await pageFixture.page.goto(data.NHCarbon2URL);
  const loginPage = new LoginPage(pageFixture.page);
  await loginPage.performLogin('vijay');
});

 When('User perform the create variable test data', async () => {
      const randomStr = generateRandomString(10);
      await pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//span[normalize-space(text())="Variables"]').click();
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//span[normalize-space(text())="Add new Variable"]').click();
      await pageFixture.page.locator('//span[normalize-space(text())="Type"]').click();
      await pageFixture.page.locator('//div[normalize-space(text())="SECTION"]').click();
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').click();
      await pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').fill('%12 ' + randomStr);
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('(//label[normalize-space(text())="Quantity"]/following::input)[2]').click();
      await pageFixture.page.locator('(//label[normalize-space(text())="Quantity"]/following::input)[2]').fill('2' + randomStr);
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//span[normalize-space(text())="Unit"]').click();
      await pageFixture.page.locator('//div[normalize-space(text())="1000"]').click();
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').click();
      await pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').fill('TESTDATA' + randomStr);
      await pageFixture.page.waitForTimeout(2000);
      await pageFixture.page.locator('//span[normalize-space(text())="Save Variable"]').click();
      await pageFixture.page.waitForTimeout(2000);

  });


  When('User perform the update variable test data', async () => {
    const randomStr = generateRandomString(10);
    await pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//span[normalize-space(text())="Variables"]').click();
    await pageFixture.page.waitForTimeout(1000)
    await pageFixture.page.locator('//div[normalize-space(text())="Code"]').click();
    await pageFixture.page.waitForTimeout(2000);
    await pageFixture.page.locator('(//td[contains(@class,"dx-command-expand dx-datagrid-group-space")]//div)[1]').click();
    await pageFixture.page.waitForTimeout(2000);
    await pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').click();
    await pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').clear();
    await pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').fill('%1 ' + randomStr);
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('(//label[normalize-space(text())="Quantity"]/following::input)[2]').click();
    await pageFixture.page.locator('(//label[normalize-space(text())="Quantity"]/following::input)[2]').clear();
    await pageFixture.page.locator('(//label[normalize-space(text())="Quantity"]/following::input)[2]').fill('3' + randomStr);
    await pageFixture.page.waitForTimeout(2000);
    await pageFixture.page.locator('//span[@class="dx-button-text"]/following-sibling::i[1]').click();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//div[normalize-space(text())="1000"]').click();
    await pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').click();
    await pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').clear();
    await pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').fill('TESTDATA' + randomStr);
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//span[normalize-space(text())="Save Variable"]').click();
    await pageFixture.page.waitForTimeout(2000);

  });

  When('User perform the delete variable test data', async () => {
    const randomStr = generateRandomString(10);
    await pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//span[normalize-space(text())="Variables"]').click();
    await pageFixture.page.waitForTimeout(1000)
    await pageFixture.page.locator('//div[normalize-space(text())="Code"]').click();
    await pageFixture.page.waitForTimeout(2000);
    await pageFixture.page.locator('//div[normalize-space(text())="Code"]').click();
    await pageFixture.page.waitForTimeout(2000);
    await pageFixture.page.locator('(//td[contains(@class,"dx-command-expand dx-datagrid-group-space")]//div)[1]').click();
    await pageFixture.page.waitForTimeout(2000);
    await pageFixture.page.locator('//span[normalize-space(text())="Delete"]').click();
    await pageFixture.page.locator('//div[normalize-space(text())="Delete Variable"]').click();
    await pageFixture.page.locator('//div[@data-test-id="GenericModal-destructive-Delete-100-40"]//div[1]').click();
    await pageFixture.page.waitForTimeout(1000);
  });