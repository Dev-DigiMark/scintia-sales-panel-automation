import { test, expect } from '@playwright/test';
import { login, getCredentials } from './helpers/login';

// Keep browser open for 10 seconds after each test to see results
test.afterEach(async ({ page }, testInfo) => {
  if (!process.env.CI) {
    await page.waitForTimeout(10000);
  }
});

test('login with explicit credentials', async ({ page }) => {
  // You can also pass credentials directly if needed
  const credentials = getCredentials();
  await login(page, credentials);
});
