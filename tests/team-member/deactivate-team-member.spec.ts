import { test, expect } from '@playwright/test';

test.use({
  storageState: 'playwright/.auth/user.json'
});

test('test', async ({ page }) => {
  await page.goto('https://dev-sales.scintiacallflow.ai/dashboard');
  await page.getByRole('link', { name: 'Équipe' }).click();
  await page.locator('#radix-_r_1f_').click();
  await page.getByRole('menuitem', { name: 'Désactiver' }).click();
  await page.getByRole('button', { name: 'Désactiver' }).click();
});