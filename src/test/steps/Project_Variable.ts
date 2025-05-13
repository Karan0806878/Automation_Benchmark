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


Given('User is on NH Application Home Page test variable', async () => {
    await pageFixture.page.goto(data.NHCarbon2URL);
  const loginPage = new LoginPage(pageFixture.page);
  await loginPage.performLogin('vijay');
});

When('User Navigates to Project Detail Screen to create project variable', async () => {
    await pageFixture.page.waitForTimeout(5000);
    await pageFixture.page.goto(data.Projectscreen);
});

When('User Add a Project Variable', async () => {
     const randomStr = generateRandomString(10);
     await pageFixture.page.locator('//span[normalize-space(text())="Variables"]').click();
     await pageFixture.page.locator('//span[normalize-space(text())="Add Project Variable"]').click();
     await pageFixture.page.waitForTimeout(2000);
     await pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').click();
     await pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').fill('PCFRAHUL');
     await pageFixture.page.waitForTimeout(1000);
     await pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').click();
     await pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').fill('Test Data');
     await pageFixture.page.waitForTimeout(1000);
     await pageFixture.page.locator('(//input[@class="dx-texteditor-input"])[2]').click();
     await pageFixture.page.locator('(//input[@class="dx-texteditor-input"])[2]').fill('10');
     await pageFixture.page.waitForTimeout(1000);
     await pageFixture.page.locator('(//label[normalize-space(text())="Unit"]/following::input)[2]').click();
     await pageFixture.page.locator('//div[normalize-space(text())="/m/week"]').click();
     await pageFixture.page.waitForTimeout(1000);
     await pageFixture.page.locator('//span[normalize-space(text())="Save"]').click();
     await pageFixture.page.locator('//div[@id="root"]/following-sibling::div[1]').click();
     await pageFixture.page.waitForTimeout(4000);



    }); 

    const { x, y } = generateRandomCoordinates(0, 1000, 0, 1000); // This will generate random X and Y within a range

  
   When('User Duplicate a Project Variable', async () => {
      const randomStr = generateRandomString(10);
      await pageFixture.page.locator('//div[@aria-label="Search"]//div[1]').click();
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//span[normalize-space(text())="Help"]/following::input').click();
      await pageFixture.page.locator('//span[normalize-space(text())="Help"]/following::input').fill('1234K');
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//input[@placeholder="Search Entities"]').click();
       
      await pageFixture.page.waitForTimeout(2000);
      await pageFixture.page.mouse.click(x, y); // Random click based on generated coordinates
      
      await pageFixture.page.locator('(//td[contains(@class,"dx-command-expand dx-datagrid-group-space")]//div)[1]').click();
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//span[normalize-space(text())="Duplicate"]').click();
      await pageFixture.page.waitForTimeout(5000);


    }); 

    When('User Update a Project Variable', async () => {
      const randomStr = generateRandomString(10);
      await pageFixture.page.locator('//div[@aria-label="Search"]//div[1]').click();
      await pageFixture.page.waitForTimeout(2000);
      await pageFixture.page.locator('//span[normalize-space(text())="Help"]/following::input').click();
      await pageFixture.page.locator('//span[normalize-space(text())="Help"]/following::input').fill('PCFRAHUL');
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//input[@placeholder="Search Entities"]').click();
       
      await pageFixture.page.waitForTimeout(2000);
      await pageFixture.page.mouse.click(x, y); // Random click based on generated coordinates
      
      await pageFixture.page.locator('(//td[contains(@class,"dx-command-expand dx-datagrid-group-space")]//div)[1]').click();
      await pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').click();
      await pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').clear();
      await pageFixture.page.locator('(//label[normalize-space(text())="Code"]/following::input)[1]').fill('DATAPCFRT');
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').click();
      await pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').clear();
      await pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').fill('Test karan');
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('(//input[@class="dx-texteditor-input"])[2]').click();
      await pageFixture.page.locator('(//input[@class="dx-texteditor-input"])[2]').fill('12');
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//span[normalize-space(text())="Save"]').click();
      await pageFixture.page.waitForTimeout(4000);


    }); 


    When('User Delete a Project Variable', async () => {
      const randomStr = generateRandomString(10);
      await pageFixture.page.locator('//div[@aria-label="Search"]//div[1]').click();
      await pageFixture.page.waitForTimeout(1000);
    
      await pageFixture.page.locator('//span[normalize-space(text())="Help"]/following::input').click();
      await pageFixture.page.locator('//span[normalize-space(text())="Help"]/following::input').fill('DATAPCFRT');
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//input[@placeholder="Search Entities"]').click();
       
      await pageFixture.page.waitForTimeout(2000);
      await pageFixture.page.mouse.click(x, y); // Random click based on generated coordinates
      
      await pageFixture.page.locator('(//td[contains(@class,"dx-command-expand dx-datagrid-group-space")]//div)[1]').click();
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//span[normalize-space(text())="Delete"]').click();
      await pageFixture.page.locator('//div[normalize-space(text())="Confirm Delete"]').click();
      await pageFixture.page.waitForTimeout(1000);
      await pageFixture.page.locator('//div[@data-test-id="GenericModal-destructive-Delete-100-40"]//div[1]').click();
   await pageFixture.page.waitForTimeout(8000)



    }); 