"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomFunction = void 0;
class CustomFunction {
    constructor(page) {
        this.page = page;
    }
    // This Function is created as there are inactive elements in DOM with the tag display:none
    clickNoDispElement(loc) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.locator(loc).scrollIntoViewIfNeeded();
            const box = yield this.page.locator(loc).boundingBox();
            //@ts-ignore
            yield this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
            yield this.page.waitForTimeout(500);
        });
    }
    // This nth Function is created as there are inactive elements in DOM with the tag display:none
    clickNthNoDispElement(loc, indx) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.locator(loc).nth(indx).scrollIntoViewIfNeeded();
            const box = yield this.page.locator(loc).nth(indx).boundingBox();
            //@ts-ignore
            yield this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
            yield this.page.waitForTimeout(500);
        });
    }
    // Find a Parent relative to element and then click on it's sibling
    clickOnSibling(paren, sibling1, sibling2, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const locatorX = this.page.locator(sibling1);
            const parent = this.page.locator(paren).filter({ has: locatorX });
            const target = parent.locator(sibling2).nth(index);
            yield target.click();
        });
    }
    // Find a Parent relative to element and then right click on it's sibling
    rightClickOnSibling(paren, sibling1, sibling2, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const locatorX = this.page.locator(sibling1);
            const parent = this.page.locator(paren).filter({ has: locatorX });
            const target = parent.locator(sibling2).nth(index);
            yield target.click({ button: 'right' });
        });
    }
    getSiblingText(paren, sibling1, sibling2, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const locatorX = this.page.locator(sibling1);
            const parent = this.page.locator(paren).filter({ has: locatorX });
            const target = parent.locator(sibling2).nth(index);
            return yield target.textContent();
        });
    }
    clickOnSibling1(paren, sibling1, sibling2, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const locatorX = this.page.locator(sibling1);
            const parent = this.page.locator(paren).filter({ has: locatorX });
            const targetElement = parent.locator(sibling2).nth(index);
            if (targetElement) {
                const target = yield targetElement.boundingBox();
                if (target) {
                    // Calculate the x-coordinate to click slightly to the right of the target element
                    const clickX = target.x + target.width + 65; // Adjust the value as needed
                    // Calculate the y-coordinate as the center of the target element
                    const clickY = target.y + target.height / 2;
                    // Move the mouse cursor to the calculated coordinates
                    yield this.page.mouse.move(clickX, clickY);
                    // Click at the adjusted position
                    yield this.page.mouse.click(clickX, clickY);
                }
                else {
                    console.error('Target element is not visible or does not have a bounding box.');
                }
            }
            else {
                console.error('Target element not found.');
            }
        });
    }
}
exports.CustomFunction = CustomFunction;
