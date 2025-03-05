import { Page, Locator } from "@playwright/test";
import {CustomFunction} from '../utilities/customFunction'
import { pageFixture } from "../../src/hooks/pageFixture";

export class SectionPage {
  private page: Page;
  private selectItem: string;
  private itemOpen: string;
  private itemRow: string;
  private itemRate: string

  constructor(page: Page) {
    this.page = page;
    this.selectItem = "[role='gridcell'] >> text='{desc}'";
    this.itemRow = '.dx-data-row.dx-row-lines.dx-column-lines'
    this.itemOpen = '.dx-treelist-cell-expandable'
    this.itemRate = "td[aria-colindex='4']"
  }
  
  async openItem(desc: string) {
    const customFunction = new CustomFunction(pageFixture.page)
    await this.page.waitForTimeout(500);
    const selectItemNew = this.selectItem
      .toString()
      .replace("{desc}", desc);
    customFunction.clickOnSibling(this.itemRow, selectItemNew, this.itemOpen, 1)
    await this.page.waitForLoadState("load");
  }

  async getItemRate(desc: string){
    const customFunction = new CustomFunction(pageFixture.page)
    const selectItemNew = this.selectItem
      .toString()
      .replace("{desc}", desc);
    return customFunction.getSiblingText(this.itemRow, selectItemNew, this.itemRate, 1) 
  }
}
