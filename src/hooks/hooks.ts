import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import fixture from "./fixture";
import optionsLogger from "../utils/logger";
import invokeBrowser from "../helpers/browsers";
const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;
let level: string = "info";

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
  const scenarioName = pickle.name + pickle.id;
  context = await browser.newContext({
    recordVideo: {
      dir: "results/videos",
    },
  });
  const page = await context.newPage();
  fixture.page = page;
  fixture.logger = createLogger(optionsLogger({scenarioName, level}));
});

Before("@auth", async function ({ pickle }) {
  const scenarioName = pickle.name + pickle.id;
  context = await browser.newContext({
    storageState: getStorageState(pickle.name),
    recordVideo: {
      dir: "results/videos",
    },
  });
  const page = await context.newPage();
  fixture.page = page;
  fixture.logger = createLogger(optionsLogger({scenarioName, level}));
});

After(async function ({ pickle, result }) {
  let videoPath: string;
  let img: Buffer;
  if (result?.status == Status.PASSED) {
    img = await fixture.page.screenshot({
      path: `./results/screenshots/${pickle.name}.png`,
      type: "png",
    });
    videoPath = await fixture.page.video().path();
  }
  await fixture.page.close();
  await context.close();
  if (result?.status == Status.PASSED) {
    await this.attach(img, "image/png");
    await this.attach(fs.readFileSync(videoPath), "video/webm");
  }
});

AfterAll(async function () {
  await browser.close();
});

function getStorageState(user: string):
  | string
  | {
      cookies: {
        name: string;
        value: string;
        domain: string;
        path: string;
        expires: number;
        httpOnly: boolean;
        secure: boolean;
        sameSite: "Strict" | "Lax" | "None";
      }[];
      origins: {
        origin: string;
        localStorage: { name: string; value: string }[];
      }[];
    } {
  if (user.endsWith("admin")) return "src/helper/auth/admin.json";
  else if (user.endsWith("lead")) return "src/helper/auth/lead.json";
}
