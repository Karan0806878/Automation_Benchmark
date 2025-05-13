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


Given('User is on NH Application Home Page test section', async () => {
    await pageFixture.page.goto(data.NHCarbon2URL);
  const loginPage = new LoginPage(pageFixture.page);
  await loginPage.performLogin('vijay');
});

When('User Navigates to Project Screen', async () => {
    await pageFixture.page.waitForTimeout(2000);
    await pageFixture.page.goto(data.Projectscreen);
});

When('User Creates a Section', async () => {
     const randomStr = generateRandomString(10);
     await pageFixture.page.locator('//span[normalize-space(text())="Add Section"]').click();
     await pageFixture.page.waitForTimeout(1000);
     await pageFixture.page.locator('(//label[normalize-space(text())="Number"]/following::input)[1]').click();
     await pageFixture.page.locator('(//label[normalize-space(text())="Number"]/following::input)[1]').fill('1');
     await pageFixture.page.waitForTimeout(1000);
     await pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').click();
     await pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').fill('ABC ' + randomStr);
     await pageFixture.page.waitForTimeout(1000);
    //  await pageFixture.page.locator('(//label[normalize-space(text())="Activity"]/following::input)[2]').click();
    //  await pageFixture.page.locator('//div[normalize-space(text())="Activ6"]').click();
     await pageFixture.page.locator('(//label[normalize-space(text())="WBS Level"]/following::input)[1]').click();
     await pageFixture.page.locator('(//label[normalize-space(text())="WBS Level"]/following::input)[1]').fill('12');
     await pageFixture.page.locator('(//input[@role="spinbutton"])[1]').click();
     await pageFixture.page.locator('(//input[@role="spinbutton"])[1]').fill('12');
     await pageFixture.page.waitForTimeout(1000);
     await pageFixture.page.locator('//input[@placeholder="Unit"]').click();
     await pageFixture.page.locator('//div[normalize-space(text())="$"]').click();
     await pageFixture.page.waitForTimeout(1000);
    //  await pageFixture.page.locator('(//label[normalize-space(text())="Organization"]/following::input)[2]').click();
    //  await pageFixture.page.locator('//div[normalize-space(text())="05. Advanced Works"]').click();
     await pageFixture.page.locator('//span[normalize-space(text())="Save"]').click();
     await pageFixture.page.waitForTimeout(5000);

     await pageFixture.page.locator('//i[@class="dx-icon dx-icon-search"]').click();
     await pageFixture.page.locator('(//span[normalize-space(text())="Maintenance"]/following::input)[3]').clear();
     await pageFixture.page.locator('(//span[normalize-space(text())="Maintenance"]/following::input)[3]').fill('ABC');
     await pageFixture.page.waitForTimeout(4000);
     await pageFixture.page.locator('(//span[normalize-space(text())="Maintenance"]/following::input)[3]').click();
     await pageFixture.page.waitForTimeout(2000);
     await pageFixture.page.mouse.click(x, y); // Random click based on generated coordinates
     //await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
     await pageFixture.page.waitForTimeout(1000);
     await pageFixture.page.locator('(//div[@class="dx-datagrid-group-closed"])[1]').click();
     await pageFixture.page.locator('//span[text()="Show details"]/following-sibling::div').click();
     
     const verifyValue = await pageFixture.page.locator('(//label[normalize-space(text())="Number"]/following::input)[1]').inputValue();
     if (verifyValue == "1") {
      console.log("verify Value:", verifyValue);
    } else {
      console.log("verify Value:", verifyValue);
      throw new Error("Unexpected Value Displayed. Test stopped.");
    }
     

}); 

const { x, y } = generateRandomCoordinates(0, 1000, 0, 1000); // This will generate random X and Y within a range

When('User Update a Section', async () => {
    const randomStr = generateRandomString(10);
    await pageFixture.page.locator('//div[@aria-label="Search"]//div[1]').click();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//span[normalize-space(text())="Export to Excel"]/following::input').click();
    await pageFixture.page.locator('//span[normalize-space(text())="Export to Excel"]/following::input').fill('ABC');
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//input[@placeholder="Search Entities"]').click();
    
    await pageFixture.page.waitForTimeout(2000);
    await pageFixture.page.mouse.click(x, y); // Random click based on generated coordinates
    await pageFixture.page.locator('(//td[contains(@class,"dx-command-expand dx-datagrid-group-space")]//div)[1]').click();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//span[text()="Show details"]/following-sibling::div').click();
    await pageFixture.page.locator('(//label[normalize-space(text())="Number"]/following::input)[1]').click();
     await pageFixture.page.locator('(//label[normalize-space(text())="Number"]/following::input)[1]').fill('2');
     await pageFixture.page.waitForTimeout(1000);
     await pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').click();
     await pageFixture.page.locator('//label[normalize-space(text())="Description"]/following::textarea').fill('ABC ' + randomStr);
     await pageFixture.page.waitForTimeout(1000);
     await pageFixture.page.locator('(//label[normalize-space(text())="WBS Level"]/following::input)[1]').click();
     await pageFixture.page.locator('(//label[normalize-space(text())="WBS Level"]/following::input)[1]').fill('13');
     await pageFixture.page.locator('(//input[@role="spinbutton"])[1]').click();
     await pageFixture.page.locator('(//input[@role="spinbutton"])[1]').fill('25');
     await pageFixture.page.locator('//input[@placeholder="/m/week"]').click();
     await pageFixture.page.locator('//div[normalize-space(text())="1000"]').click();
     await pageFixture.page.waitForTimeout(1000);

     await pageFixture.page.locator('(//label[normalize-space(text())="Organization"]/following::input)[2]').click();
     await pageFixture.page.locator('//div[normalize-space(text())="04. Lands"]').click();
     await pageFixture.page.locator('//span[normalize-space(text())="Save"]').click();
     await pageFixture.page.waitForTimeout(18000);


    
});

When('User Duplicate a Section', async () => {
    const randomStr = generateRandomString(10);
    await pageFixture.page.locator('//div[@aria-label="Search"]//div[1]').click();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//span[normalize-space(text())="Export to Excel"]/following::input').click();
    await pageFixture.page.locator('//span[normalize-space(text())="Export to Excel"]/following::input').fill('ABC');
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//input[@placeholder="Search Entities"]').click();
    
    await pageFixture.page.waitForTimeout(2000);
    await pageFixture.page.mouse.click(x, y); // Random click based on generated coordinates
    await pageFixture.page.locator('(//td[contains(@class,"dx-command-expand dx-datagrid-group-space")]//div)[1]').click();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//span[text()="Show details"]/following-sibling::div').click();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//span[normalize-space(text())="Duplicate"]').click();
    await pageFixture.page.waitForTimeout(18000);




});


When('User Delete a Section', async () => {
    const randomStr = generateRandomString(10);
    await pageFixture.page.locator('//div[@aria-label="Search"]//div[1]').click();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//span[normalize-space(text())="Export to Excel"]/following::input').click();
    await pageFixture.page.locator('//span[normalize-space(text())="Export to Excel"]/following::input').fill('ABC');
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//input[@placeholder="Search Entities"]').click();
    
    await pageFixture.page.waitForTimeout(2000);
    await pageFixture.page.mouse.click(x, y); // Random click based on generated coordinates
    await pageFixture.page.locator('(//td[contains(@class,"dx-command-expand dx-datagrid-group-space")]//div)[1]').click();
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator('//span[text()="Show details"]/following-sibling::div').click();
    await pageFixture.page.waitForTimeout(1000)
    await pageFixture.page.locator('//span[normalize-space(text())="Delete"]').click();
    await pageFixture.page.locator('//div[normalize-space(text())="Confirm Delete"]');
    await pageFixture.page.locator('//div[@data-test-id="GenericModal-destructive-Delete-100-40"]//div[1]').click();
   await pageFixture.page.waitForTimeout(12000)

});