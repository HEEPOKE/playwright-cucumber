import { Page } from "@playwright/test";
import PlaywrightWrapper from "../helpers/wrapper/PlaywrightWrappers";

export default class SearchPage {
  private base: PlaywrightWrapper;

  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }
  async goTo(url:string) {
    await this.base.goto(url);
  }

  async searchForVideo(searchQuery: string) {
    await this.base.waitAndClick("#search-icon-legacy");
    await this.page.fill('input[id="search"]', searchQuery);
    await this.page.press('input[id="search"]', "Enter");
    await this.page.waitForSelector("#search-results");
  }

  async clickVideo(videoTitle: string) {
    const videoSelector = `//yt-formatted-string[contains(text(), "${videoTitle}")]`;
    await this.base.waitAndClick(videoSelector);
    await this.page.waitForSelector("video");
  }

  async getSearchResultsCount(): Promise<number> {
    const searchResults = await this.page.$$("#search-results .search-result");
    return searchResults.length;
  }
}
