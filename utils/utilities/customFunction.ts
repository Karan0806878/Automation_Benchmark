import { Locator, Page } from "@playwright/test";

export class CustomFunction {
  private page: Page;


  constructor(page: Page) {
    this.page = page;
  }

  // This Function is created as there are inactive elements in DOM with the tag display:none
  async clickNoDispElement(loc: string) {
    await this.page.locator(loc).scrollIntoViewIfNeeded();
    const box = await this.page.locator(loc).boundingBox();
    //@ts-ignore
    await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await this.page.waitForTimeout(500);

  }

  // This nth Function is created as there are inactive elements in DOM with the tag display:none
  async clickNthNoDispElement(loc: string, indx: number) {
    await this.page.locator(loc).nth(indx).scrollIntoViewIfNeeded();
    const box = await this.page.locator(loc).nth(indx).boundingBox();
    //@ts-ignore
    await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await this.page.waitForTimeout(500);
  }

  // Find a Parent relative to element and then click on it's sibling
  async clickOnSibling(paren: string, sibling1: string, sibling2: string, index: number) {
    const locatorX = this.page.locator(sibling1);
    const parent = this.page.locator(paren).filter({ has:  locatorX});
    const target = parent.locator(sibling2).nth(index)
    await target.click()
  }

  // Find a Parent relative to element and then right click on it's sibling
  async rightClickOnSibling(paren: string, sibling1: string, sibling2: string, index: number) {
    const locatorX = this.page.locator(sibling1);
    const parent = this.page.locator(paren).filter({ has: locatorX });
    const target = parent.locator(sibling2).nth(index)
    await target.click({ button: 'right' });
  }

  async getSiblingText(paren: string, sibling1: string, sibling2: string, index: number) {
    const locatorX = this.page.locator(sibling1);
    const parent = this.page.locator(paren).filter({ has:  locatorX});
    const target = parent.locator(sibling2).nth(index)
    return await target.textContent();
  }

  async clickOnSibling1(paren: string, sibling1: string, sibling2: string, index: number) {
    const locatorX = this.page.locator(sibling1);
    const parent = this.page.locator(paren).filter({ has: locatorX });
    const targetElement = parent.locator(sibling2).nth(index)

    if (targetElement) {
      const target = await targetElement.boundingBox();
      if (target) {
        // Calculate the x-coordinate to click slightly to the right of the target element
        const clickX = target.x + target.width + 65; // Adjust the value as needed

        // Calculate the y-coordinate as the center of the target element
        const clickY = target.y + target.height / 2;

        // Move the mouse cursor to the calculated coordinates
        await this.page.mouse.move(clickX, clickY);

        // Click at the adjusted position
        await this.page.mouse.click(clickX, clickY);
      } else {
        console.error('Target element is not visible or does not have a bounding box.');
      }
    } else {
      console.error('Target element not found.');
    }
  }

}
