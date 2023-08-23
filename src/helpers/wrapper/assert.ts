import { expect, Page } from '@playwright/test';

class Assert {
  constructor(private page: Page) {}

  async pageTitle() {
    return await this.page.title();
  }

  async pageURL() {
    return await this.page.url();
  }

  async assertTitle(expectedTitle: string) {
    const pageTitle = await this.pageTitle();
    expect(pageTitle).toBe(expectedTitle);
  }

  async assertTitleContains(titleFragment: string) {
    const pageTitle = await this.pageTitle();
    expect(pageTitle).toContain(titleFragment);
  }

  async assertURL(expectedURL: string) {
    const pageURL = await this.pageURL();
    expect(pageURL).toBe(expectedURL);
  }

  async assertURLContains(fragment: string) {
    const pageURL = await this.pageURL();
    expect(pageURL).toContain(fragment);
  }
}

export default Assert;
