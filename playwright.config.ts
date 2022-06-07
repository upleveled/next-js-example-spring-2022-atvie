import { devices, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Runs your local server before starting the tests,
  // so you don't have to run your dev server manually.
  webServer: {
    command: 'yarn start',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
  // Ignore Jest test files
  testIgnore: '**/util/__tests__/**',
  // Retry on CI only, because if the Github Actions test fails,
  // it will retry the whole test suite.
  retries: process.env.CI ? 2 : 0,
  // Setup reporter for Github Actions that prints a line for each test being run.
  // Locally HTML reporter produces a self-contained folder that
  // contains report for the test run that can be served as a web page.
  reporter: process.env.CI ? 'list' : 'html',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  // Creates folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: 'test-results/',
};

export default config;
