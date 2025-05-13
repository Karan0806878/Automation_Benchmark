
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

Given('User is on NH Application Home Page test', async () => {
  await pageFixture.page.goto(data.NHCarbon2URL);
  const loginPage = new LoginPage(pageFixture.page);
  await loginPage.performLogin('vijay');
});

 When('User perform the necessary interactions test', async () => {
      const randomStr = generateRandomString(10);

  await pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('(//span[normalize-space(text())="Section"])[2]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('//span[normalize-space(text())="Add new Section"]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('(//label[normalize-space(text())="Section Number"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Section Number"]/following::input)[1]').fill('123 ' + randomStr);
  await pageFixture.page.locator('(//span[@class="dx-checkbox-icon"])[1]').click();
  await pageFixture.page.locator('(//span[@class="dx-checkbox-icon"])[2]').click();
  await pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').click();
  await pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').fill('TEST DATA');
  await pageFixture.page.locator('//span[normalize-space(text())="Save Section"]').click();
  await pageFixture.page.waitForTimeout(1000);
  });
   

  When('User perform the update operation test', async () => {
    const randomStr = generateRandomString(10);
    await pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('(//span[normalize-space(text())="Section"])[2]').click();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('(//td[contains(@class,"dx-command-expand dx-datagrid-group-space")]//div)[1]').click();
    await pageFixture.page.locator('(//label[normalize-space(text())="Section Number"]/following::input)[1]').click();
    await pageFixture.page.locator('(//label[normalize-space(text())="Section Number"]/following::input)[1]').fill('AAA Automation Benchmark');
    await pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').click();
    await pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').fill('RETEST');
    await pageFixture.page.locator('//span[normalize-space(text())="Save Section"]').click();
    await pageFixture.page.waitForTimeout(1000);

  });



  When('User perform the delete operation test', async () => {
    const randomStr = generateRandomString(10);
    await pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('(//span[normalize-space(text())="Section"])[2]').click();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('(//td[contains(@class,"dx-command-expand dx-datagrid-group-space")]//div)[1]').click();
    await pageFixture.page.locator('//span[normalize-space(text())="Delete"]').click();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//div[normalize-space(text())="Delete Section"]').click();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//div[@data-test-id="GenericModal-destructive-Delete-100-40"]//div[1]').click();
    await pageFixture.page.waitForTimeout(1000);
  });