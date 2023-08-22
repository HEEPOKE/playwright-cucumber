import { Given, When, Then, After } from "@cucumber/cucumber";
import { Browser, Page, expect, chromium } from "@playwright/test";
import config from "../../configs/config";

let browser: Browser;
let page: Page;

Given("I open the YouTube website", async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto(config.baseUrl);
});

When("I search for {string}", async (searchQuery: string) => {
  await page.fill('input[id="search"]', searchQuery);
  await page.press('input[id="search"]', "Enter");
  await page.waitForSelector("#search-results");
});

Then("I should see search results", async () => {
  const searchResults = await page.$$("#search-results .search-result");
  expect(searchResults.length).toBeGreaterThan(0);
});

Then("I play the video {string}", async (videoTitle: string) => {
  const videoSelector = `//yt-formatted-string[contains(text(), "${videoTitle}")]`;
  await page.click(videoSelector);
  await page.waitForSelector("video");
});

After(async () => {
  await browser.close();
});
