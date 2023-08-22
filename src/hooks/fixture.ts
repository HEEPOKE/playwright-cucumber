import { Page } from "@playwright/test";
import { Logger } from "winston";

const fixture = {
  // @ts-ignore
  page: undefined as Page,
  logger: undefined as Logger,
};

export default fixture;
