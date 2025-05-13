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

function generateRandomCoordinates(minX: number, maxX: number, minY: number, maxY: number) {
  const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
  const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
  return { x, y };
}

Given('User is on NH Application Home Page test Resource Sub Total', async () => {
    await pageFixture.page.goto(data.NHCarbon2URL);
  const loginPage = new LoginPage(pageFixture.page);
  await loginPage.performLogin('vijay');
});

When('User Navigates to Project Detail Screen to create Resource Sub Total', async () => {
    await pageFixture.page.waitForTimeout(5000);
    await pageFixture.page.goto(data.Projectscreen);
});

const { x, y } = generateRandomCoordinates(0, 1000, 0, 1000); // This will generate random X and Y within a range
When('User Add a Resource Sub Total', async () => {
     const randomStr = generateRandomString(10);

     await pageFixture.page.locator('(//div[@class="dx-button-content"]//i)[2]').click();
     await pageFixture.page.waitForTimeout(1000);

     await pageFixture.page.locator('(//span[normalize-space(text())="Maintenance"]/following::input)[3]').click();
      await pageFixture.page.locator('(//span[normalize-space(text())="Maintenance"]/following::input)[3]').clear();
      await pageFixture.page.locator('(//span[normalize-space(text())="Maintenance"]/following::input)[3]').fill('ABC');
      await pageFixture.page.waitForTimeout(4000);
      await pageFixture.page.locator('(//span[normalize-space(text())="Maintenance"]/following::input)[3]').click();
      await pageFixture.page.waitForTimeout(6000);
      await pageFixture.page.mouse.click(x, y); // Random click based on generated coordinates
      //await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
      await pageFixture.page.locator('//div[contains(@class,"scrollable-container false")]').click();
     
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
      await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
      await pageFixture.page.waitForTimeout(2000);
      await pageFixture.page.locator('(//span[contains(normalize-space(text()), "Add")])[3]').hover();
      await pageFixture.page.waitForTimeout(2000);
      await pageFixture.page.locator('//span[normalize-space(text())="Resource Sub Total"]').click();

      await pageFixture.page.locator('(//label[normalize-space(text())="Description"]/following::textarea)[1]').click();
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('(//label[normalize-space(text())="Description"]/following::textarea)[1]').fill('Test Data');

      await pageFixture.page.locator('(//label[normalize-space(text())="Quantity"]/following::input)[2]').click();
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('(//label[normalize-space(text())="Quantity"]/following::input)[2]').fill('12');

      await pageFixture.page.locator('(//div[@class="dx-dropdowneditor-icon"])[2]').click();
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//div[normalize-space(text())="$"]').click();

      await pageFixture.page.locator('(//div[@class="dx-dropdowneditor-icon"])[2]').click();
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//div[normalize-space(text())="$"]').click();
      await pageFixture.page.locator('//label[normalize-space(text())="Text"]/following::textarea').click();
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//label[normalize-space(text())="Text"]/following::textarea').fill('test');

      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//span[normalize-space(text())="Save"]').click();
      await pageFixture.page.waitForTimeout(4000);

    });

     When('User Update a Resource Sub Total', async () => {
          const randomStr = generateRandomString(10);
    
          await pageFixture.page.locator('(//div[@class="dx-button-content"]//i)[2]').click();
          await pageFixture.page.waitForTimeout(1000);
     
          await pageFixture.page.locator('(//span[normalize-space(text())="Maintenance"]/following::input)[3]').click();
           await pageFixture.page.locator('(//span[normalize-space(text())="Maintenance"]/following::input)[3]').clear();
           await pageFixture.page.locator('(//span[normalize-space(text())="Maintenance"]/following::input)[3]').fill('ABC');
           await pageFixture.page.waitForTimeout(4000);
           await pageFixture.page.locator('(//span[normalize-space(text())="Maintenance"]/following::input)[3]').click();
           await pageFixture.page.waitForTimeout(6000);
           await pageFixture.page.mouse.click(x, y); // Random click based on generated coordinates
           //await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
           await pageFixture.page.waitForTimeout(1000);
           await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
           await pageFixture.page.locator('//div[contains(@class,"scrollable-container false")]').click();
          
           await pageFixture.page.waitForTimeout(1000);
           await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
           await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
           await pageFixture.page.waitForTimeout(2000);
           await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
           await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
           await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
    
           await pageFixture.page.waitForTimeout(2000);
           await pageFixture.page.locator('(//span[text()="Show details"]/following-sibling::div)[3]').click();
    
           await pageFixture.page.locator('(//label[normalize-space(text())="Description"]/following::textarea)[1]').click();
           await pageFixture.page.locator('(//label[normalize-space(text())="Description"]/following::textarea)[1]').clear();
           await pageFixture.page.waitForTimeout(1000);
           await pageFixture.page.locator('(//label[normalize-space(text())="Description"]/following::textarea)[1]').fill('NEW DATA');
     
           await pageFixture.page.locator('(//label[normalize-space(text())="Quantity"]/following::input)[2]').click();
           await pageFixture.page.locator('(//label[normalize-space(text())="Quantity"]/following::input)[2]').clear();
           await pageFixture.page.waitForTimeout(1000);
           await pageFixture.page.locator('(//label[normalize-space(text())="Quantity"]/following::input)[2]').fill('20');
    
    
           await pageFixture.page.locator('(//div[@class="dx-dropdowneditor-icon"])[2]').click();
          await pageFixture.page.waitForTimeout(1000);
          await pageFixture.page.locator('//div[normalize-space(text())="%"]').click();
          await pageFixture.page.locator('//label[normalize-space(text())="Text"]/following::textarea').click();
          await pageFixture.page.locator('//label[normalize-space(text())="Text"]/following::textarea').clear();
          await pageFixture.page.waitForTimeout(1000);
          await pageFixture.page.locator('//label[normalize-space(text())="Text"]/following::textarea').fill('RENAME');
    
          await pageFixture.page.waitForTimeout(1000);
          await pageFixture.page.locator('//span[normalize-space(text())="Save"]').click();
          await pageFixture.page.waitForTimeout(4000);
     
          
        });

        When('User Delete a Resource Sub Total', async () => {
              const randomStr = generateRandomString(10);
        
              await pageFixture.page.locator('(//div[@class="dx-button-content"]//i)[2]').click();
              await pageFixture.page.waitForTimeout(1000);
         
              await pageFixture.page.locator('(//span[normalize-space(text())="Maintenance"]/following::input)[3]').click();
               await pageFixture.page.locator('(//span[normalize-space(text())="Maintenance"]/following::input)[3]').clear();
               await pageFixture.page.locator('(//span[normalize-space(text())="Maintenance"]/following::input)[3]').fill('ABC');
               await pageFixture.page.waitForTimeout(4000);
               await pageFixture.page.locator('(//span[normalize-space(text())="Maintenance"]/following::input)[3]').click();
               await pageFixture.page.waitForTimeout(6000);
               await pageFixture.page.mouse.click(x, y); // Random click based on generated coordinates
               //await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
               await pageFixture.page.waitForTimeout(1000);
               await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
               await pageFixture.page.locator('//div[contains(@class,"scrollable-container false")]').click();
              
               await pageFixture.page.waitForTimeout(1000);
               await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
               await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
               await pageFixture.page.waitForTimeout(2000);
               await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
               await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
               await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
        
               await pageFixture.page.waitForTimeout(2000);
               await pageFixture.page.locator('(//span[text()="Show details"]/following-sibling::div)[3]').click();
        
               await pageFixture.page.waitForTimeout(2000);
               await pageFixture.page.locator('//span[normalize-space(text())="Delete"]').click();
               await pageFixture.page.locator('//div[normalize-space(text())="Delete Selected Resources?"]').click();
               await pageFixture.page.locator('//div[@data-test-id="GenericModal-destructive-Delete-100-40"]//div[1]').click();
               await pageFixture.page.waitForTimeout(5000);
            });