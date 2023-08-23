import { Page } from '@playwright/test';

class PlaywrightWrapper {
  constructor(private page: Page) {}

  async goto(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async waitAndClick(locator: string) {
    const element = this.page.locator(locator);
    await element.waitFor({ state: 'visible' });
    await element.click();
  }

  async navigateTo(link: string) {
    await Promise.all([this.page.waitForNavigation(), this.page.click(link)]);
  }

  async fillInput(locator: string, value: string) {
    const inputElement = this.page.locator(locator);
    await inputElement.waitFor({ state: 'visible' });
    await inputElement.fill(value);
  }

  async getText(locator: string): Promise<string> {
    const element = this.page.locator(locator);
    await element.waitFor({ state: 'visible' });
    return await element.textContent();
  }
}

export default PlaywrightWrapper;
