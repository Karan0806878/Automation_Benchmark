import { Locator, Page } from "@playwright/test";
import {CustomFunction} from '../utilities/customFunction'
import { pageFixture } from "../../src/hooks/pageFixture";

export class ProjectSummaryPage {
  private page: Page;
  private selectSection: string;
  private itemRow: string;
  private editButton: string;
  private quantity: Locator;
  private cost: Locator;
  private save: Locator;
  private expandArrow: string;
  private subItem: Locator;
  private group: Locator;
  private code: Locator;
  private doubleClickCode: Locator;
  private resource: Locator;
  private resourceGroup: Locator;
  private resourceCode: Locator;
  private doubleClickResourceCode: Locator;
  private item: Locator;

  constructor(page: Page) {
    this.page = page;
    this.selectSection = "[role='gridcell'] >> text='{desc}'";
    this.itemRow = '.dx-data-row.dx-row-lines.dx-column-lines';
    this.editButton = "//span[@title='Edit']";
    this.quantity = page.locator("(//span[text()='No data']/following::input)[2]")
    this.cost = page.locator("(//span[text()='Quantity']/following::input)[2]")
    this.save = page.locator("//span[text()='Save']")
    this.expandArrow = ".dx-treelist-icon-container"
    this.subItem = page.getByText("Add SubItem", { exact: true });
    this.group = page.getByRole('gridcell', { name: 'Drainage and Service Ducts' });
    this.code = page.locator("//td[text()='MHGang1']");
    this.doubleClickCode = page.locator("(//td[@role='gridcell'][normalize-space()='MHGang1'])[2]");
    this.resource = page.getByText("Add Resource", { exact: true });
    this.resourceGroup = page.locator("(//td[normalize-space()='Design'])[1]");
    this.resourceCode = page.locator("(//td[normalize-space()='SignsTechAssuranceL'])[1]");
    this.doubleClickResourceCode = page.locator("(//td[normalize-space()='[ - ]'])[1]");
    this.item = page.getByText("Add Item", { exact: true });
  }
  
  async openSection(desc: string) {
    const customFunction = new CustomFunction(pageFixture.page)
    const selectSectionNew = this.selectSection
      .toString()
      .replace("{desc}", desc);
    customFunction.clickNthNoDispElement(selectSectionNew, 1)
    await this.page.waitForLoadState("load");
  }

  async clickEditButton(desc: string) {
    await this.page.waitForTimeout(5000);
    const customFunction = new CustomFunction(pageFixture.page)
    const selectItemNew = this.selectSection
      .toString()
      .replace("{desc}", desc);
    customFunction.clickOnSibling(this.itemRow, selectItemNew, this.editButton, 1)
    await this.page.waitForTimeout(500);
    await this.page.waitForLoadState("load");
  }

  async updateDetails() {
    await this.quantity.click()
    await this.quantity.fill("")
    await this.quantity.type("1")
    await this.cost.click()
    await this.cost.fill("")
    await this.cost.type("1")
    await this.save.click();
    await this.page.waitForTimeout(5000);
  }

  async expandSection(desc: string){
    const customFunction = new CustomFunction(pageFixture.page)
    const selectItemNew = this.selectSection
      .toString()
      .replace("{desc}", desc);
    customFunction.clickOnSibling(this.itemRow, selectItemNew, this.expandArrow, 1)
  }
  async expandSection1(desc: string){
    await this.page.locator("body > div:nth-child(2) > span:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(9) > div:nth-child(1) > div:nth-child(1) > div:nth-child(6) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(1) > div:nth-child(1) > div:nth-child(3) > span:nth-child(1)").click();
    
  }

  async addSubItem(desc: string){
    const customFunction = new CustomFunction(pageFixture.page)
    const selectItemNew = this.selectSection
      .toString()
      .replace("{desc}", desc);
    customFunction.rightClickOnSibling(this.itemRow, selectItemNew, selectItemNew, 1)
    await this.subItem.click()
    await this.page.waitForLoadState("load");
    await this.page.waitForTimeout(5000);
    await this.group.dblclick()
    await this.page.waitForLoadState("load");
    await this.page.waitForTimeout(5000);
    await this.code.dblclick(); 
    await this.page.waitForLoadState("load");
    await this.page.waitForTimeout(5000);
    await this.doubleClickCode.dblclick();
    await this.page.waitForLoadState("load");
    await this.page.waitForTimeout(5000);
    await this.page.getByRole('button', { name: 'save' }).click();
    await this.page.waitForTimeout(5000);
  }

  async addItem(desc: string) {
    const customFunction = new CustomFunction(pageFixture.page)
    const selectItemNew = this.selectSection
      .toString()
      .replace("{desc}", desc);
    customFunction.rightClickOnSibling(this.itemRow, selectItemNew, selectItemNew, 1)
    await this.item.click();
    await this.page.locator("(//td[normalize-space()='Preliminaries'])[1]").click();
    await this.page.waitForLoadState("load");
    await this.page.waitForTimeout(5000);
    await this.page.locator("(//span[@class='dx-checkbox-icon'])[2]").click();
    await this.page.waitForTimeout(9000);
    await this.page.getByText("ADD SELECTED ITEM").click();
    await this.page.waitForTimeout(9000);
    await this.page.getByRole('button', { name: 'save' }).click();
    await this.page.waitForTimeout(9000);
  }

  async addResource(desc: string){
    const customFunction = new CustomFunction(pageFixture.page)
    const selectItemNew = this.selectSection
      .toString()
      .replace("{desc}", desc);
    customFunction.rightClickOnSibling(this.itemRow, selectItemNew, selectItemNew, 1)
    await this.page.waitForTimeout(3000);
    await this.resource.click()
    await this.page.waitForLoadState("load");
    await this.resourceGroup.dblclick()
    await this.page.waitForLoadState("load");
    await this.page.waitForTimeout(9000);
    await this.resourceCode.dblclick(); 
    await this.page.waitForLoadState("load");
    await this.page.waitForTimeout(9000);
    await this.doubleClickResourceCode.dblclick();
    await this.page.waitForLoadState("load");
    await this.page.waitForTimeout(9000);
    await this.page.getByRole('button', { name: 'save' }).click()
    await this.page.waitForTimeout(9000);
  }
}
