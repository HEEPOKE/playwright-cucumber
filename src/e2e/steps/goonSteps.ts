import { Given, setDefaultTimeout } from '@cucumber/cucumber';
import config from '../../configs/config';
import fixture from '../../hooks/fixture';

setDefaultTimeout(60 * 1000 * 3)

Given('I am on the YouTube website', async () => {
    await fixture.page.goto(config.BASE_URL);
    fixture.logger.info("Navigated to the application")
});

Given('I have a search bar', async () => {
    const searchInput = await fixture.page.$('input[id="search"]');
    if (!searchInput) {
      throw new Error('Search bar not found on the page.');
    }
});

