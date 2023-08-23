import { LaunchOptions, chromium, firefox, webkit } from 'playwright-core';
import config from '../../configs/config';

const options: LaunchOptions = {
  headless: !true
};

const browserLaunchers = {
  chrome: chromium,
  firefox: firefox,
  safari: webkit
};

const invokeBrowser = () => {
  const browserType = config.BROWSER || 'chrome';

  const browserLauncher = browserLaunchers[browserType];
  if (!browserLauncher) {
    throw new Error('Please set the proper browser!');
  }

  return browserLauncher.launch(options);
};

export default invokeBrowser;