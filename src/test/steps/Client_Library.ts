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

Given('User is on NH Application Home Page', async () => {
  await pageFixture.page.goto(data.NHCarbon2URL);
  const loginPage = new LoginPage(pageFixture.page);
  await loginPage.performLogin('vijay');
});

When('User perform the necessary interactions', async () => {
  const randomStr = generateRandomString(10);
  await pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
  await pageFixture.page.waitForTimeout(500);
  await pageFixture.page.locator('//span[normalize-space(text())="Client"]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('//span[normalize-space(text())="Add new Client"]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('(//label[normalize-space(text())="Client Code"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Client Code"]/following::input)[1]').fill('Benchmark ' + randomStr);
  await pageFixture.page.locator('(//label[normalize-space(text())="Company"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Company"]/following::input)[1]').fill('AAA Automation Benchmark');
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('//span[normalize-space(text())="Type"]').click();
  await pageFixture.page.locator('//div[normalize-space(text())="Partnership"]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Client ID"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Client ID"]/following::input)[1]').fill('123');
  await pageFixture.page.locator('(//label[normalize-space(text())="Address"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Address"]/following::input)[1]').fill('Benchmark');
  await pageFixture.page.locator('//span[normalize-space(text())="Salutation"]').click();
  await pageFixture.page.locator('//div[normalize-space(text())="Mr"]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Contact"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Contact"]/following::input)[1]').fill('Data');
  await pageFixture.page.locator('(//label[normalize-space(text())="Job Title"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Job Title"]/following::input)[1]').fill('Test Engneer');
  await pageFixture.page.locator('(//label[normalize-space(text())="Email"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Email"]/following::input)[1]').fill('karan@gmail.com');
  await pageFixture.page.locator('(//label[normalize-space(text())="Mobile"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Mobile"]/following::input)[1]').fill('123456789');
  await pageFixture.page.locator('(//label[normalize-space(text())="Phone"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Phone"]/following::input)[1]').fill('0251456789');
  await pageFixture.page.locator('(//label[normalize-space(text())="Website"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Website"]/following::input)[1]').fill('WWW.FB.COM');
  await pageFixture.page.locator('//span[normalize-space(text())="Save Client"]').click();
  await pageFixture.page.waitForTimeout(1000);
});

When('User perform the update operation', async () => {
  
  await pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
  await pageFixture.page.waitForTimeout(500);
  await pageFixture.page.locator('//span[normalize-space(text())="Client"]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('//div[normalize-space(text())="Company"]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('(//input[@class="dx-texteditor-input"])[1]').click();
  await pageFixture.page.locator('(//input[@class="dx-texteditor-input"])[1]').fill('AAA Automation Benchmark');
  await pageFixture.page.locator('//span[normalize-space(text())="Search"]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('(//label[normalize-space(text())="Company"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Company"]/following::input)[1]').fill('11AA Atomation Benchmark');
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('(//i[contains(@class,"dx-icon dx-icon-spindown")])[2]').click();
  await pageFixture.page.locator('//div[normalize-space(text())="PLC"]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('(//label[normalize-space(text())="Client ID"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Client ID"]/following::input)[1]').fill('123');
  await pageFixture.page.locator('(//label[normalize-space(text())="Address"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Address"]/following::input)[1]').clear();
  await pageFixture.page.locator('(//label[normalize-space(text())="Address"]/following::input)[1]').fill('AA Benchmark');
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('//span[text()="Mr"]/following-sibling::i').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Contact"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Contact"]/following::input)[1]').fill('Data');
  await pageFixture.page.locator('(//label[normalize-space(text())="Job Title"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Job Title"]/following::input)[1]').fill('Test Engneer');
  await pageFixture.page.locator('(//label[normalize-space(text())="Email"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Email"]/following::input)[1]').fill('karan@gmail.com');
  await pageFixture.page.locator('(//label[normalize-space(text())="Mobile"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Mobile"]/following::input)[1]').fill('123456789');
  await pageFixture.page.locator('(//label[normalize-space(text())="Phone"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Phone"]/following::input)[1]').fill('0251456789');
  await pageFixture.page.locator('(//label[normalize-space(text())="Website"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Website"]/following::input)[1]').fill('WWW.sk.COM');
  await pageFixture.page.locator('//span[normalize-space(text())="Save Client"]').click();
  await pageFixture.page.waitForTimeout(1000);
});

When('User perform the duplicate operation', async () => {
  
  const randomStr = generateRandomString(10);
  await pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
  await pageFixture.page.waitForTimeout(500);
  await pageFixture.page.locator('//span[normalize-space(text())="Client"]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('//div[normalize-space(text())="Company"]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('(//input[@class="dx-texteditor-input"])[1]').click();
  await pageFixture.page.locator('(//input[@class="dx-texteditor-input"])[1]').fill('11AA Atomation Benchmark');
  await pageFixture.page.locator('//span[normalize-space(text())="Search"]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
  await pageFixture.page.locator('//span[normalize-space(text())="Duplicate"]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('(//label[normalize-space(text())="Client Code"]/following::input)[1]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('(//label[normalize-space(text())="Client Code"]/following::input)[1]').fill('Automaton cc ' + randomStr);
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('(//label[normalize-space(text())="Company"]/following::input)[1]').click();
  await pageFixture.page.locator('(//label[normalize-space(text())="Company"]/following::input)[1]').clear();
  await pageFixture.page.locator('(//label[normalize-space(text())="Company"]/following::input)[1]').fill('Duplicate Automation Benchmark');
  await pageFixture.page.locator('//span[normalize-space(text())="Save Client"]').click();
  await pageFixture.page.waitForTimeout(2000);
});
When('User perform the delete operation', async () => {
  
  await pageFixture.page.locator('//span[normalize-space(text())="Administration"]').click();
  await pageFixture.page.locator('//span[normalize-space(text())="Libraries"]').hover();
  await pageFixture.page.locator('//span[normalize-space(text())="Client"]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('//div[normalize-space(text())="Company"]').click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.locator('(//input[@class="dx-texteditor-input"])[1]').click();
  await pageFixture.page.locator('(//input[@class="dx-texteditor-input"])[1]').fill('11AA Atomation Benchmark');
  await pageFixture.page.locator('//span[normalize-space(text())="Search"]').click();
  await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
  await pageFixture.page.locator('//span[normalize-space(text())="Delete"]').click();
  await pageFixture.page.locator('//div[normalize-space(text())="Delete Client"]').click();
  await pageFixture.page.locator('//div[@data-test-id="GenericModal-destructive-Delete-100-40"]//div[1]').click();
});

Then('There should be no console errors', async () => {
  const logs = await pageFixture.page.evaluate(() => console.log());
});
