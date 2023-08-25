import { When, Then, Before } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import PlayPage from "../../pages/playPage";
import fixture from "../../hooks/fixture";

let playPage: PlayPage;

Before(async () => {
  playPage = new PlayPage(fixture.page);
});

When("I search for the video {string}", async (videoTitle: string) => {
  await playPage.searchAndPlayVideo(videoTitle);
  fixture.logger.info(`Search and play video: ${videoTitle}`);
});

When("I select the video {string}", async (videoTitle: string) => {
  await playPage.selectVideo(videoTitle);
});

Then("the video should start playing", async () => {
  const isPlaying = await playPage.isVideoPlaying();
  expect(isPlaying).toBeTruthy();
});

When('the user clicks the "Pause" button', async () => {
  await playPage.pauseVideo();
  fixture.logger.info("Pause the video");
});

Then("the video should pause", async () => {
  const isPaused = await playPage.isVideoPaused();
  expect(isPaused).toBeTruthy();
});

When("the user selects a different video quality", async () => {
  const qualityOption = "360p";
  await playPage.changeVideoQuality(qualityOption);
  fixture.logger.info(`Change video quality to ${qualityOption}`);
});

Then("the video quality should change accordingly", async () => {
  const newQuality = "720p";
  await playPage.checkVideoQuality(newQuality);
  fixture.logger.info("Video quality changed accordingly");
});
