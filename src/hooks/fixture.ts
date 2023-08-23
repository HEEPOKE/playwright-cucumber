import { Page } from '@playwright/test';
import { Logger } from 'winston';

interface Fixture {
  page?: Page;
  logger?: Logger;
}

const pageFixture: Fixture = {};

export default pageFixture;
