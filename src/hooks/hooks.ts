import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from '@playwright/test';
import { fixture } from '../hooks/pageFixture';

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

Before(async function () {
  context = await browser.newContext();
  const page = await browser.newPage();
  fixture.page = page;
});

After(async function ({ pickle, result }) {
  console.log(result?.status);
  // screenshot
  if (result?.status == Status.FAILED) {
    const img = await fixture.page.screenshot({
      path: `./test-result/screenshots/${pickle.name}.png`,
    });
    await this.attach(img, 'image/png');
  }
  await fixture.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
