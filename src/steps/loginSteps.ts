import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Page, Browser } from 'playwright';
import { expect } from '@playwright/test';
import { text } from 'stream/consumers';
import { pageFixture } from '../hooks/pageFixture';

setDefaultTimeout(12000);

Given('User navigates to the application', async function () {
  await pageFixture.page.goto('https://bookcart.azurewebsites.net');
});

Given('User click on the login link', async function () {
  await pageFixture.page.locator(`//span[normalize-space()='Login']`).click();
});

Given('User enters the username as {string}', async function (username) {
  await pageFixture.page.locator(`#mat-input-0`).fill(username);
});

Given('User enter the password as {string}', async function (password) {
  await pageFixture.page.locator(`#mat-input-1`).fill(password);
});

When('User click on the login button', async function () {
  await pageFixture.page.locator(`button[color="primary"]`).click();
});

Then('Login should be success', async function () {
  await pageFixture.page
    .locator(
      `//button[contains(@class, 'mat-focus-indicator mat-menu-trigger')]//span[1]`
    )
    .textContent();
  console.log('Username: ' + text);
});

Then('Login should fail', async function () {
  const failureMessage = pageFixture.page.locator(`mat-error[role='alert']`);
  await expect(failureMessage).toBeVisible();
});
