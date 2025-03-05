import { Before, After, BeforeAll, AfterAll, Status } from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";

let page: Page;
let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  var type
  // Based on the test type, select headless or headed mode
  if (process.env.TEST_TYPE == "API") {
    type = true
  } else {
    type = false
  }
  browser = await chromium.launch({
    headless: type,
    args: ["--start-maximized"],
  });
});

Before(async function ({pickle}) {
  context = await browser.newContext({
    viewport: null,
    recordVideo: {
        dir: `./test-results/videos/${pickle.name}`,
        size: {
            width: 1920,
            height: 1080
        }
    }});
  page = await context.newPage();
  pageFixture.page = page;
});

After(async function ({ pickle, result }) {
  await pageFixture.page.waitForTimeout(2000);
  if (result?.status == Status.FAILED) {
    const img = await pageFixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png",
    });
    await this.attach(img, "image/png");
  }

  await pageFixture.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
