import { Page, expect } from "@playwright/test";

class PlayPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async searchForVideo(videoTitle: string) {
    await this.page.fill("input#search-input", videoTitle);
    await this.page.press("input#search-input", "Enter");
    await this.page.click(`text="${videoTitle}"`);
    await this.page.waitForSelector("video", { state: "visible" });
    await this.page.waitForSelector("button.ytp-play-button", { state: "visible" });
  }


  async playVideo(videoTitle: string) {
    const videoSelector = `yt-formatted-string:has-text("${videoTitle}")`;
    await this.page.waitForSelector(videoSelector, { state: "visible", timeout: 60000 });
    const videoElement = await this.page.locator(videoSelector);
    await videoElement.click();
    await this.page.waitForSelector("video", { state: "visible", timeout: 10000 });
  }

  async isVideoPaused() {
    const playButton = await this.page.locator("button.ytp-play-button");
    return await playButton.isDisabled();
  }

  async pauseVideo() {
    await this.page.click("button.ytp-play-button");
  }

  async changeVideoQuality(qualityOption: string) {
    await this.page.click("button.ytp-settings-button");
    await this.page.click("text=Quality");
    await this.page.click(`text=${qualityOption}`);
    await this.page.click("button.ytp-settings-button");
  }

  async checkVideoQuality(qualityOption: string) {
    await this.page.waitForSelector(`text=${qualityOption}`);
    const currentQualityLabel = await this.page.textContent(
      "div.ytp-menuitem-checked"
    );
    expect(currentQualityLabel).toEqual(qualityOption);
  }
}

export default PlayPage;
