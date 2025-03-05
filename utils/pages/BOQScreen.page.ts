import { Locator, Page } from "@playwright/test";
import { CustomFunction } from "../utilities/customFunction";
import { pageFixture } from "../../src/hooks/pageFixture";

export class BOQScreenPage {
  private page: Page;
  private selectSection: string;
  private itemRow: string;
  private total: string;
  private recalculate: Locator;


  constructor(page: Page) {
    this.page = page;
    this.selectSection = "[role='gridcell'] >> text='{desc}'";
    this.itemRow = '.dx-data-row.dx-row-lines.dx-column-lines';
    this.total = "td[aria-colindex='7']";
    this.recalculate = page.getByText("RECALCULATE");
  }

  async verifyCarbonValues(desc: string){
    const customFunction = new CustomFunction(pageFixture.page)
    const selectItemNew = this.selectSection
      .toString()
      .replace("{desc}", desc);
    return customFunction.getSiblingText(this.itemRow, selectItemNew, this.total, 1)
  }

  async Recalculate() {
    await this.recalculate.click();
    await this.page.waitForFunction(() => document.readyState === 'complete');
  }
 
}
