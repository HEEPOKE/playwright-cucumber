import { Page } from '@playwright/test';
import { Logger } from 'winston';

interface Fixture {
  page?: Page;
  logger?: Logger;
}

const fixture: Fixture = {};

export default fixture;
