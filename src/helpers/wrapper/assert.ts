import { expect, Page } from '@playwright/test';

class Assert {
  constructor(private page: Page) {}

  async assertTitle(title: string) {
    await expect(this.page).toHaveTitle(title);
  }

  async assertTitleContains(title: string) {
    const pageTitle = await this.page.title();
    expect(pageTitle).toContain(title);
  }

  async assertURL(url: string) {
    await expect(this.page).toHaveURL(url);
  }

  async assertURLContains(fragment: string) {
    const pageURL = await this.page.url();
    expect(pageURL).toContain(fragment);
  }
}

export default Assert;