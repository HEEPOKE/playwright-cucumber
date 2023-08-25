import { Keyboard } from "./../../node_modules/playwright-core/types/types.d";
import { Page, expect } from "@playwright/test";

class PlayPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async searchForVideo(videoTitle: string) {
    const searchInput = this.page.locator("input#search");
    await searchInput.type(videoTitle);
    await searchInput.press("Enter");
  }

  async playVideo(videoTitle: string) {
    const escapedVideoTitle = videoTitle.replace(/"/g, '\\"');
    const videoSelector = `yt-formatted-string:has-text("${escapedVideoTitle}")`;

    await this.page.waitForSelector(videoSelector, {
      state: "visible",
      timeout: 30000,
    });
    const videoElement = await this.page.locator(videoSelector);
    await videoElement.click();
    await this.page.waitForSelector("video", {
      state: "visible",
      timeout: 10000,
    });
  }

  async skipAds() {
    await this.page.waitForTimeout(6000);
    const skipButton = this.page.locator("button.ytp-ad-skip-button");
    await skipButton.click();
  }

  async isVideoPaused() {
    const playButton = await this.page.locator("button.ytp-play-button");
    return !(await playButton.isEnabled());
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
    const currentQualityLabel = await this.page.textContent(
      ".ytp-quality-menu .ytp-menuitem-checked"
    );
    expect(currentQualityLabel).toEqual(qualityOption);
  }
}

export default PlayPage;
