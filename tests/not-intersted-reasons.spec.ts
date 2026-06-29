import { test, expect } from '@playwright/test';
import { login } from './helpers/login';
import testData from './test-data/add-not-intersted-data.json';

test('Add not interested reasons with validation', async ({ page }) => {
  const { notIntersted } = testData;

  await login(page);
  await page.getByRole('link', { name: 'Paramètres' }).click();
  await page.waitForLoadState('networkidle');

  // Track added reasons for cleanup if needed
  const addedReasons = [];

  for (let i = 0; i < notIntersted.length; i++) {
    const reason = notIntersted[i];
    
    try {
      // Clear the textbox first
      await page.getByRole('textbox', { name: 'Ajouter des raisons' }).click();
      await page.getByRole('textbox', { name: 'Ajouter des raisons' }).clear();
      await page.getByRole('textbox', { name: 'Ajouter des raisons' }).fill(reason);
      
      // Click add button
      await page.getByRole('button', { name: 'Ajouter' }).nth(1).click();
      await page.waitForLoadState('networkidle');
      
      // Verify the reason was added
      await expect(page.locator(`text="${reason}"`)).toBeVisible();
      addedReasons.push(reason);
      
      console.log(`Successfully added reason: ${reason}`);
      
    } catch (error) {
      console.error(`Failed to add reason: ${reason}`, error);
      throw error;
    }
  }

  // Final verification - check that all reasons were added
  expect(addedReasons).toHaveLength(notIntersted.length);
});
