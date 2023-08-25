import fixture from "../hooks/fixture";
import { Page } from "@playwright/test";

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
    const videoSelector = `yt-formatted-string[id="video-title"][title="${videoTitle}"]`;
    await this.page.click(videoSelector);
    await this.page.waitForSelector("video", {
      state: "visible",
      timeout: 10000,
    });
  }

  async skipAds() {
    await this.page.waitForTimeout(6000);

    const skipButtonSelector = "button.ytp-ad-skip-button";
    const skipButton = this.page.locator(skipButtonSelector);

    if (await skipButton.isVisible()) {
      await skipButton.click();
      console.log("Skip button found and clicked.");
    } else {
      await this.page.waitForTimeout(16000);
      console.log("Skip button not found after waiting.");
    }
  }

  async pauseVideo() {
    await this.page.waitForTimeout(1500);
    const videoElement = await this.page.locator("video.video-stream");
    await videoElement.click();
  }

  async isVideoPaused() {
    const playButtonSelector = "button.ytp-play-button";
    const playButtonElement = await this.page.locator(playButtonSelector);

    const isPaused = await playButtonElement.isVisible();
    return isPaused;
  }

  async selectQualityOption(expectedQuality: string) {
    const qualityOptionElement = await this.page.locator(
      `text=${expectedQuality}`
    );

    if (await qualityOptionElement.isVisible()) {
      await qualityOptionElement.click();
      fixture.logger.info(`Selected video quality: ${expectedQuality}`);
    } else {
      fixture.logger.warn(`Video quality option ${expectedQuality} not found.`);
    }
  }

  async changeVideoQuality(qualityOption: string) {
    await this.page.click("button.ytp-settings-button");
    await this.page.click("text=Quality", { timeout: 15000 });
    await this.page.click(`text=${qualityOption}`, { timeout: 15000 });
    await this.page.click("button.ytp-settings-button");
  }

  async checkVideoQuality(expectedQuality: string) {
    await this.page.click("button.ytp-settings-button");
    await this.page.waitForSelector("text=Quality");

    try {
      await this.selectQualityOption(expectedQuality);
    } catch (error) {
      fixture.logger.error(`Error selecting video quality: ${error}`);
    } finally {
      await this.page.click("button.ytp-settings-button");
    }
  }
}

export default PlayPage;
