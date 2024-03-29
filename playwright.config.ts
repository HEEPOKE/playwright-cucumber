import { defineConfig, devices } from '@playwright/test'
import config from './src/configs/config'

export default defineConfig({
  testDir: './src/e2e/steps',
  reporter: [['html', { outputFolder: 'results' }]],
  //   testMatch: ['./src/e2e/features/*.feature'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: config.BASE_URL,
    colorScheme: 'dark',
    locale: 'th-TH',
    timezoneId: 'Asia/Bangkok',
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    headless: false,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], locale: 'th-TH' },
    },
  ],
})
