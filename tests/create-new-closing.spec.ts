import { test, expect } from '@playwright/test';
import { login } from './helpers/login';
import testData from './test-data/create-new-closing-data.json';

test('test create-new-closing', async ({ page }) => {
  const { client, contract, expectedResults } = testData;

  await login(page);

  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Nouveau client' }).click();

  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Entrez le nom de l\'entreprise' }).fill(client.companyName);

  await page.waitForTimeout(1000);
  await page.getByRole('combobox', { name: 'Sélectionner le secteur d\u2019' }).click();
  await page.getByRole('option', { name: client.sector }).click();

  await page.waitForTimeout(1000);
  await page.getByRole('combobox', { name: 'Entrez l\'adresse de l\'' }).fill(client.addressSearch);
  await page.getByText(client.addressSelection, { exact: true }).click();

  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'SIRET :' }).fill(client.siret);

  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Nom du client' }).fill(client.clientName);

  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Entrez le numéro de téléphone' }).fill(client.phone);

  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Adresse e-mail' }).fill(client.email);
  await page.getByRole('button', { name: 'Suivant' }).click();

  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Noms des agents (séparés par' }).fill(contract.agentNames);

  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Entrez le tarif personnalisé' }).fill(contract.baseTariff);

  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Appliquer un coupon' }).fill(contract.couponDiscount);

  // Verify pricing is displayed
  await expect(page.getByText('Tarif final')).toBeVisible();
  await expect(page.getByText(expectedResults.priceBreakdown)).toBeVisible();

  // enter comments
  await page.getByRole('textbox', { name: 'Commentaires internes' }).fill(contract.internalComment);

  // Wait for Suivant button to be enabled before clicking
  await expect(page.getByRole('button', { name: 'Suivant' })).toBeEnabled({ timeout: 5000 });
  await page.getByRole('button', { name: 'Suivant' }).click();

  // Wait for API requests to complete and page to stabilize
  await page.waitForLoadState('networkidle');

  // wait until next page loads
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Verify elements on the next page
  await expect(page.getByText(expectedResults.finalPriceDisplay)).toBeVisible();
  await expect(page.getByText(expectedResults.agentCount, { exact: true })).toBeVisible();
  await expect(page.getByText(client.companyName)).toBeVisible();
  
  const button = page.getByRole('button', { name: 'Envoyer la proposition' });
  await expect(button).toBeEnabled();
  await button.click();
  
  // Wait for navigation to "Dossiers client" page after submission
  await page.waitForURL(`**/${expectedResults.redirectUrl}`, { timeout: 10000 });
  expect(page.url()).toContain(expectedResults.redirectUrl);
  // https://dev-sales.scintiacallflow.ai/my-files

});