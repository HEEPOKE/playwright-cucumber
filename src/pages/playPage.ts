import { Page, expect } from "@playwright/test";

class PlayPage {
  constructor(private page: Page) {
    this.page = page
  }

  async waitForPlayButton() {
    await this.page.waitForSelector("button.ytp-play-button", {
      timeout: 50000,
    });
  }

  async searchAndPlayVideo(videoTitle: string) {
    // await this.page.fill("input#search", videoTitle);
    // await this.page.press("input#search", "Enter");
    await this.page.locator("input.ytd-searchbox").press(videoTitle);
    await this.page.click(`text="${videoTitle}"`);
    await this.page.waitForSelector("button.ytp-play-button");
  }

  async selectVideo(videoTitle: string) {
    await this.page.click(`text="${videoTitle}"`);
  }

  async isVideoPlaying() {
    const playButton = await this.page.locator("button.ytp-play-button");
    return !(await playButton.isDisabled());
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
