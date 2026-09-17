// Browser tests for the marketing site. Unlike the app repos this site has no
// backend, so Playwright starts the dev server itself on 3002 (3000 and 3001 are
// billing-frontend and onboarding) and tears it down afterwards.
//
//   npm run test:e2e
//
// The specs are characterisation tests: every linked page renders, every link
// resolves, every image and video the pages reference is actually served, and
// the contact endpoint refuses what it should. They exist so that reorganising
// public/ or deleting a component can be proven harmless. Nothing here ever
// sends a real contact email - see e2e/contact.spec.ts.

import { defineConfig, devices } from '@playwright/test';

const PORT = 3002;
export const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  workers: 1,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [['list']],
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  webServer: {
    command: `npx next dev -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
