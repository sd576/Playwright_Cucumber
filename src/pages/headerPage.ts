import { Config, Page, expect } from '@playwright/test';
import * as config from '../config.json';

const selectedUrl = config.firstUrl;

export default class HeaderPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private headerPageElements = {
    pageTitle: 'head > title',
    searchInput: 'Search books or authors',
    cartBtn: 'button.mat-focus-indicator.mat-icon-button',
    cartValue: '#mat-badge-content-0',
    loginLink: "//span[text()='Login']/..",
    userMenu:
      "//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]",
    myOrder: "//button[text()='My Orders' and @role='menuitem']",
    logoutLink: "//button[text()='Logout' and @role='menuitem']",
  };

  async navigateToHeaderPage() {
    await this.page.goto(selectedUrl);
  }

  async enterBookName(bookname: string) {
    await this.page
      .locator(`[placeholder="${this.headerPageElements.searchInput}"]`)
      .fill(bookname);
    await this.page.locator("mat-option[role='option']").click();
  }

  async clickOnCart() {
    await this.page.locator(this.headerPageElements.cartBtn).click();
  }

  async getCartValue() {
    await this.page.waitForTimeout(1000);
    return await this.page.textContent(this.headerPageElements.cartValue);
  }

  async clickLoginLink() {
    await this.page.locator(this.headerPageElements.loginLink).click();
  }

  async clickOnUserMenu() {
    await this.page.locator(this.headerPageElements.userMenu).click();
  }

  async clickOnMyOrder() {
    await this.clickOnUserMenu();
    await this.page.locator(this.headerPageElements.myOrder).click();
  }

  async logoutUser() {
    await this.clickOnUserMenu();
    await this.page.locator(this.headerPageElements.logoutLink).click();
  }

  async verifyLoginSuccess() {
    await expect(
      this.page.locator(this.headerPageElements.userMenu)
    ).toBeVisible();
  }
}
