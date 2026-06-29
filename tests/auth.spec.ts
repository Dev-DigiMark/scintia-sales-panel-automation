import { test, expect } from '@playwright/test';
import { saveAuthState } from './helpers/auth-state';
import { login, getCredentials } from './helpers/login';

// Keep browser open for 10 seconds after each test to see results
test.afterEach(async ({ page }, testInfo) => {
  if (!process.env.CI) {
    await page.waitForTimeout(10000);
  }
});

test('login with explicit credentials and save auth state', async ({ page }) => {
  // You can also pass credentials directly if needed
  const credentials = getCredentials();
  await login(page, credentials);
  await saveAuthState(page);
});
