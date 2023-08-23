import { Given, When, Then, After } from "@cucumber/cucumber";
import { Browser, Page, expect, chromium } from "@playwright/test";
import config from "../../configs/config";
import pageFixture from "../../hooks/fixture";

let browser: Browser;
let page: Page;

Given("I open the YouTube website", async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto(config.BASE_URL);
  pageFixture.logger.info("Navigation to Youtube")
});

When("I search for {string}", async (searchQuery: string) => {
  await page.fill('input[id="search"]', searchQuery);
  await page.press('input[id="search"]', "Enter");
  await page.waitForSelector("#search-results");
  pageFixture.logger.info(`Search song name is ${searchQuery}`)
});

Then("I should see search results", async () => {
  const searchResults = await page.$$("#search-results .search-result");
  expect(searchResults.length).toBeGreaterThan(0);
});

Then("I play the video {string}", async (videoTitle: string) => {
  const videoSelector = `//yt-formatted-string[contains(text(), "${videoTitle}")]`;
  await page.click(videoSelector);
  await page.waitForSelector("video");
  pageFixture.logger.info("Play Song on Youtube")
});

After(async () => {
  await browser.close();
});
