import { expect, test } from '@playwright/test';
import { login } from './helpers/login';
import testData from './test-data/delete-industries-data.json';


test('test delete-industries', async ({ page }) => {
  const { industries } = testData;

  // Step 1: Login and navigate to Paramètres
  await login(page);
  await page.getByRole('link', { name: 'Paramètres' }).click();
  await page.waitForLoadState('networkidle');

  // Step 2: Delete each industry
  for (const industry of industries) {

    // Click delete button using test-data-id attribute (value matches industry name)
    const deleteButton = page.locator(`[test-data-id="${industry}"]`);
    await expect(deleteButton).toBeVisible();
    await deleteButton.click();

    // Wait for API request to complete
    await page.waitForLoadState('networkidle');

  }

  // Final verification: all industries are removed
  for (const industry of industries) {
    await expect(page.getByText(industry, { exact: true })).not.toBeVisible();
  }
});