import { expect, test } from '@playwright/test';
import { login } from './helpers/login';
import testData from './test-data/add-industry-data.json';


test('test add-new-industries', async ({ page }) => {
  const { industries } = testData;

  // Step 1: Login and navigate to Paramètres
  await login(page);
  await page.getByRole('link', { name: 'Paramètres' }).click();
  await page.waitForLoadState('networkidle');

  
  // Step 3: Add each industry and verify
  for (const industry of industries) {
    // Fill and submit new industry
    const input = page.getByRole('textbox', { name: "Ajouter des secteurs d'activité" });
    await input.fill(industry);

    await page.getByRole('button', { name: 'Ajouter' }).first().click();

    // Wait for API request to complete
    await page.waitForLoadState('networkidle');

    // Optional: Verify the input is cleared after successful addition
    await expect(input).toHaveValue('');
  }

  // Final verification: all industries are in the list
  for (const industry of industries) {
    await expect(page.getByText(industry, { exact: true })).toBeVisible();
  }
});