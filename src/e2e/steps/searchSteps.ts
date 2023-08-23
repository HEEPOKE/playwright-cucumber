import { Given, When, Then, After } from "@cucumber/cucumber";
import { Browser, expect, chromium } from "@playwright/test";
import config from "../../configs/config";
import pageFixture from "../../hooks/fixture";
import SearchPage from "../../pages/serachPage";

let browser: Browser;
let page: SearchPage;

Given("I open the YouTube website", async () => {
  browser = await chromium.launch({ headless: false });
  const playwrightPage = await browser.newPage();
  page = new SearchPage(playwrightPage);
  await page.goTo(config.BASE_URL)
  pageFixture.logger.info("Navigation to Youtube");
});

When("I search for {string}", async (searchQuery: string) => {
  await page.searchForVideo(searchQuery);
  pageFixture.logger.info(`Search song name is ${searchQuery}`);
});

Then("I should see search results", async () => {
  const searchResultsCount = await page.getSearchResultsCount();
  expect(searchResultsCount).toBeGreaterThan(0);
});

Then("I play the video {string}", async (videoTitle: string) => {
  await page.clickVideo(videoTitle);
  pageFixture.logger.info("Play Song on Youtube");
});

After(async () => {
  await browser.close();
});