import { Given, When, Then, After } from '@cucumber/cucumber';
import { Browser, chromium } from "@playwright/test";
import config from "../../configs/config";
import pageFixture from "../../hooks/fixture";
import MainAction from '../../pages';
import PlayPage from '../../pages/playPage';

let browser: Browser;
let playPage: PlayPage;
let mainAction: MainAction;

Given("I open the YouTube website",async () => {
  browser = await chromium.launch({ headless: false });
  const playwrightPage = await browser.newPage();
  playPage = new PlayPage(playwrightPage);
  mainAction = new MainAction(playwrightPage);
  await mainAction.goTo(config.BASE_URL);
  pageFixture.logger.info('Navigated to YouTube');
});

When('I search for the video {string}', async (videoTitle: string) => {
  await playPage.searchAndPlayVideo(videoTitle);
  pageFixture.logger.info(`Search and play video: ${videoTitle}`);
});

When('the user clicks the "Pause" button', async () => {
  await playPage.pauseVideo();
  pageFixture.logger.info('Pause the video');
});

When('the user selects a different video quality', async () => {
  const qualityOption = '360p';
  await playPage.changeVideoQuality(qualityOption);
  pageFixture.logger.info(`Change video quality to ${qualityOption}`);
});

Then('the video quality should change accordingly', async () => {
  const newQuality = '720p';
  await playPage.checkVideoQuality(newQuality);
  pageFixture.logger.info('Video quality changed accordingly');
});

After(async () => {
  await browser.close();
});
