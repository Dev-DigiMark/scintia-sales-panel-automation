import { expect, test } from '@playwright/test';
import { openAuthenticatedApp } from './helpers/login';
import testData from './test-data/team-member-data.json';

test('test add-new-team-member', async ({ page }) => {
    const { teamMember } = testData;

    // Step 1: Login
    await openAuthenticatedApp(page);
    await expect(page.getByRole('link', { name: 'Équipe' })).toBeVisible();

    // Step 2: Navigate to Équipe page
    await page.getByRole('link', { name: 'Équipe' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('button', { name: 'Nouveau Commercial' })).toBeVisible();

    // Step 3: Open new team member form
    await page.getByRole('button', { name: 'Nouveau Commercial' }).click();

    // Step 4: Fill form with test data (waits not needed due to slowMo in config)
    await page.getByRole('textbox', { name: 'Prénom' }).fill(teamMember.firstName);
    await page.getByRole('textbox', { name: 'Nom de famille' }).fill(teamMember.lastName);
    await page.getByRole('textbox', { name: 'E-mail' }).fill(teamMember.email);
    await page.getByRole('textbox', { name: 'Mot de passe', exact: true }).fill(teamMember.password);
    await page.getByRole('textbox', { name: 'Confirmer le mot de passe' }).fill(teamMember.confirmPassword);

    // Step 5: Submit form
    await page.getByRole('button', { name: 'Ajouter un membre' }).click();
    await page.waitForLoadState('networkidle');

    // Step 6: Verify acceptance criteria - team member appears in list
    const teamMemberRow = page.getByRole('row').filter({ has: page.getByRole('cell', { name: teamMember.email }) });
    await expect(teamMemberRow).toBeVisible({ timeout: 10000 });

    // Verify status cell (4th column - index 3, can compare by email { name: 'zeeshan.zulfiqar@gmail.com' })
    const statusCell = page.getByRole('cell', { name: 'Actif' }).first();
    await expect(statusCell).toHaveText('Actif');

    // Optional: Verify status is "Actif" or expected state
    // const statusText = await statusCell.textContent();
    // expect(statusText?.trim()).toMatch(/Actif|Active/i);
});
