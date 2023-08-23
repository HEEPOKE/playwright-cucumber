import { Given, When, Then, After } from "@cucumber/cucumber";
import { Browser, expect, chromium } from "@playwright/test";
import config from "../../configs/config";
import pageFixture from "../../hooks/fixture";
import MainAction from "../../pages";
import SearchPage from "../../pages/serachPage";
import Assert from "../../helpers/wrapper/assert";

let browser: Browser;
let searchPage: SearchPage;
let mainAction: MainAction;
let assert: Assert;

Given("I open the YouTube website", async () => {
  browser = await chromium.launch({ headless: false });
  const playwrightPage = await browser.newPage();
  searchPage = new SearchPage(playwrightPage);
  mainAction = new MainAction(playwrightPage);
  assert = new Assert(pageFixture.page);
  await mainAction.goTo(config.BASE_URL);
  await assert.assertURL(config.BASE_URL);
  pageFixture.logger.info("Navigated to YouTube");
});

Given('I open the YouTube website', async function () {
  await pageFixture.page.goto(config.BASE_URL);
  pageFixture.logger.info("Navigated to YouTube")
})

When("I search for {string}", async (searchQuery: string) => {
  await searchPage.searchForVideo(searchQuery);
  pageFixture.logger.info(`Searching for song: ${searchQuery}`);
});

Then("I should see search results", async () => {
  const searchResultsCount = await searchPage.getSearchResultsCount();
  expect(searchResultsCount).toBeGreaterThan(0);
});

Then("I play the video {string}", async (videoTitle: string) => {
  await searchPage.clickVideo(videoTitle);
  pageFixture.logger.info("Playing Song on YouTube");
});

After(async () => {
  await browser.close();
});
