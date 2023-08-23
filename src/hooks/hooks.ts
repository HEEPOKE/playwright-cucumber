import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { createLogger } from "winston";
import * as fs from "fs-extra";
import fixture from "./fixture";
import optionsLogger from "../utils/logger";
import invokeBrowser from "../helpers/browsers";
import Assert from "../helpers/wrapper/assert";
import config from "../configs/config";

let browser: Browser;
let context: BrowserContext;
let assert: Assert;
let level: string = "info";

async function setUpBrowser() {
  browser = await invokeBrowser();
}

async function setUpScenario({ pickle }: any) {
  const scenarioName = pickle.name + pickle.id;
  context = await browser.newContext({
    recordVideo: {
      dir: "results/videos",
    },
  });
  const page: Page = await context.newPage();
  fixture.page = page;
  fixture.logger = createLogger(optionsLogger({ scenarioName, level }));
}

async function tearDownScenario({ pickle, result }: any) {
  let videoPath: string;
  let img: Buffer;
  if (result?.status === Status.PASSED) {
    img = await fixture.page.screenshot({
      path: `./results/screenshots/${pickle.name}.png`,
      type: "png",
    });
    videoPath = await fixture.page.video().path();
  }
  await fixture.page.close();
  await context.close();
  if (result?.status === Status.PASSED) {
    await this.attach(img, "image/png");
    await this.attach(fs.readFileSync(videoPath), "video/webm");
  }
}

async function closeBrowser() {
  await browser.close();
}

BeforeAll(setUpBrowser);
Before(setUpScenario);
After(tearDownScenario);
AfterAll(closeBrowser);
