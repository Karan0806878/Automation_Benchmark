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

Given('User is on NH Application Home Page test conditon', async () => {
  await pageFixture.page.goto(data.NHCarbon2URL);
  const loginPage = new LoginPage(pageFixture.page);
  await loginPage.performLogin('vijay');
});

 When('User perform the create condition test', async () => {
      const randomStr = generateRandomString(10);

      await pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//span[normalize-space(text())="Condition"]').click();
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//span[normalize-space(text())="Add new Condition"]').click();
      await pageFixture.page.locator('//label[normalize-space(text())="Condition"]/following::textarea').click();
      await pageFixture.page.locator('//label[normalize-space(text())="Condition"]/following::textarea').fill('cond 1 ' + randomStr);
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').click();
      await pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').fill('%1 ' + randomStr);
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('(//span[@class="dx-checkbox-icon"])[4]').click();
      await pageFixture.page.locator('(//span[@class="dx-checkbox-icon"])[5]').click();
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//span[normalize-space(text())="Save Condition"]').click();
      await pageFixture.page.waitForTimeout(1000);


    });


    When('User perform the update condition test', async () => {
        const randomStr = generateRandomString(10);
  
        await pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
        await pageFixture.page.waitForTimeout(1000);
        await pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
        await pageFixture.page.waitForTimeout(1000);
        await pageFixture.page.locator('//span[normalize-space(text())="Condition"]').click();
        await pageFixture.page.waitForTimeout(1000);
        await pageFixture.page.locator('(//td[@class="dx-datagrid-action dx-cell-focus-disabled"]//div)[2]').click();
        await pageFixture.page.waitForTimeout(2000);
        await pageFixture.page.locator('//tr[@data-test-id="Library-Condition-Row-1"]//td[1]').click();
        await pageFixture.page.locator('//label[normalize-space(text())="Condition"]/following::textarea').click();
        await pageFixture.page.locator('//label[normalize-space(text())="Condition"]/following::textarea').fill('%2 ' + randomStr);
        await pageFixture.page.waitForTimeout(1000);
        await pageFixture.page.locator('(//input[@role="textbox"])[2]').click();
        await pageFixture.page.locator('(//input[@role="textbox"])[2]').clear();
        await pageFixture.page.locator('(//input[@role="textbox"])[2]').fill('condition 1 ' + randomStr);
        await pageFixture.page.waitForTimeout(1000);
        await pageFixture.page.locator('(//span[@class="dx-checkbox-icon"])[4]').click();
        await pageFixture.page.waitForTimeout(1000);
        await pageFixture.page.locator('(//span[@class="dx-checkbox-icon"])[5]').click();
        await pageFixture.page.waitForTimeout(1000);
        // await pageFixture.page.locator('//span[normalize-space(text())="Region"]').click();
        // await pageFixture.page.locator('//div[normalize-space(text())="East"]').click();
        // await pageFixture.page.waitForTimeout(1000);
        await pageFixture.page.locator('//span[normalize-space(text())="Save Condition"]').click();
        await pageFixture.page.waitForTimeout(1000);
  


    });


    When('User perform the duplicate condition test', async () => {
        const randomStr = generateRandomString(10);
  
        await pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
        await pageFixture.page.waitForTimeout(1000);
        await pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
        await pageFixture.page.waitForTimeout(1000);
        await pageFixture.page.locator('//span[normalize-space(text())="Condition"]').click();
        await pageFixture.page.waitForTimeout(1000);
        await pageFixture.page.locator('(//td[@class="dx-datagrid-action dx-cell-focus-disabled"]//div)[2]').click();
        await pageFixture.page.waitForTimeout(2000);
        await pageFixture.page.locator('//tr[@data-test-id="Library-Condition-Row-1"]//td[1]').click();
       
        // await pageFixture.page.locator('//td[@data-test-id="Library-Condition-Expand-1007"]//div[1]').click();
        // await pageFixture.page.locator('//span[normalize-space(text())="Search"]').click();
        // await pageFixture.page.waitForTimeout(5000);
        // await pageFixture.page.locator('//td[@data-test-id="Library-Condition-Expand-1007"]//div[1]').click();
        // await pageFixture.page.waitForTimeout(5000);
        // await pageFixture.page.locator('//td[@data-test-id="Library-Condition-Expand-1007"]//div[1]').click();
        await pageFixture.page.waitForTimeout(5000);
        await pageFixture.page.locator('(//span[@class="dx-button-text"])[3]').click();
        await pageFixture.page.waitForTimeout(5000);
        await pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').click();
        await pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').clear();
      await pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').fill('cond 1 ' + randomStr);
        await pageFixture.page.locator('//span[normalize-space(text())="Save Condition"]').click();
        await pageFixture.page.waitForTimeout(1000);
  
    });




    When('User perform the delete condition test', async () => {
        const randomStr = generateRandomString(10);
  
        await pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
        await pageFixture.page.waitForTimeout(1000);
        await pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
        await pageFixture.page.waitForTimeout(1000);
        await pageFixture.page.locator('//span[normalize-space(text())="Condition"]').click();
        await pageFixture.page.waitForTimeout(1000);
        // await pageFixture.page.locator('//input[@placeholder="Search for Code"]').click();
        // await pageFixture.page.waitForTimeout(1000);
        // await pageFixture.page.locator('//input[@placeholder="Search for Code"]').fill('cond 1 ');
        // await pageFixture.page.locator('//span[normalize-space(text())="Search"]').click();
        // await pageFixture.page.waitForTimeout(1000);
        // await pageFixture.page.locator('//td[@data-test-id="Library-Condition-Expand-1067"]//div[1]').click();
        await pageFixture.page.locator('(//td[@class="dx-datagrid-action dx-cell-focus-disabled"]//div)[2]').click();
        await pageFixture.page.waitForTimeout(2000);
        await pageFixture.page.locator('//tr[@data-test-id="Library-Condition-Row-1"]//td[1]').click();
        await pageFixture.page.locator('//span[normalize-space(text())="Delete"]').click();
        await pageFixture.page.locator('//div[normalize-space(text())="Delete Condition"]').click();
        await pageFixture.page.locator('//div[@data-test-id="GenericModal-destructive-Delete-100-40"]//div[1]').click();


    });