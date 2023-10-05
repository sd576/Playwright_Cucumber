import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from '@playwright/test';
import { pageFixture } from '../hooks/pageFixture';

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

Before(async function () {
  context = await browser.newContext();
  const page = await browser.newPage();
  pageFixture.page = page;
});

After(async function ({ pickle, result }) {
  console.log(result?.status);
  // screenshot
  if (result?.status == Status.FAILED) {
    const img = await pageFixture.page.screenshot({
      path: `./test-result/screenshots/${pickle.name}.png`,
    });
    await this.attach(img, 'image/png');
  }
  await pageFixture.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
