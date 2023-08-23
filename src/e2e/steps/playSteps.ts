import { Given, When, Then, After } from '@cucumber/cucumber';
import { Browser, Page, expect, chromium } from "@playwright/test";
import config from "../../configs/config";
import pageFixture from "../../hooks/fixture";

let browser: Browser;
let page: Page;

Given('I am on the YouTube website', async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto(config.BASE_URL);
  pageFixture.logger.info("Navigation to Youtube")
});

When('I search for the video {string}', async (videoName: string) => {
  await page.fill('input#search', videoName);
  await page.click('button#search-icon-legacy');
});

When('I select the video {string}', async (videoTitle: string) => {
  await page.click(`text="${videoTitle}"`);
  await page.waitForSelector('button.ytp-play-button');
});

Then('the video should start playing', async () => {
  const isPlaying = await page.$eval('button.ytp-play-button', (btn) => {
    return !btn.getAttribute('aria-label')?.includes('Play');
  });
  expect(isPlaying).toBeTruthy;
});

When('the user clicks the "Pause" button', async () => {
  await page.click('button.ytp-play-button');
});

When('the user selects a different video quality', async () => {
  await page.click('button.ytp-settings-button');
  await page.click('text=Quality');
  await page.click('text=720p');
  await page.click('button.ytp-settings-button');
});

Then('the video quality should change accordingly', async () => {
  const newQuality = '360p';
  await page.waitForSelector(`text=${newQuality}`);
  const currentQualityLabel = await page.textContent('div.ytp-menuitem-checked');
  expect(currentQualityLabel).toEqual(newQuality);
});

After(async () => {
  await browser.close();
});
