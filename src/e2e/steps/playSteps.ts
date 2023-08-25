import { When, Then, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import PlayPage from "../../pages/playPage";
import fixture from "../../hooks/fixture";

let playPage: PlayPage;

When("I search for the video {string}", async (videoTitle: string) => {
  playPage = new PlayPage(fixture.page);
  await playPage.searchForVideo(videoTitle);
  fixture.logger.info(`Search for video: ${videoTitle}`);
});

When("I play the video {string}", async (videoTitle: string) => {
  await playPage.playVideo(videoTitle);
});

Given("the user skips ads", async () => {
  await playPage.skipAds();
  fixture.logger.info("Skipped ads");
});

When('the user clicks the "Pause" button', async () => {
  await playPage.pauseVideo();
  fixture.logger.info("Pause the video");
});

Then("the video should pause", async () => {
  const isPaused = await playPage.isVideoPaused();
  expect(isPaused).toBe(true);
});

When("the user selects a different video quality", async () => {
  const qualityOption = "360p";
  await playPage.changeVideoQuality(qualityOption);
  fixture.logger.info(`Change video quality to ${qualityOption}`);
});

Then("the video quality should change accordingly", async () => {
  const newQuality = "720p";
  await playPage.checkVideoQuality(newQuality);
  fixture.logger.info(`Change video quality to ${newQuality}`);
});
