import { test, expect } from '@playwright/test';
import { login } from './helpers/login';
import { time } from 'node:console';


test('test', async ({ page }) => {
  
  await login(page);
  

  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Nouveau client' }).click();
  
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Entrez le nom de l\'entreprise' }).click();
  await page.getByRole('textbox', { name: 'Entrez le nom de l\'entreprise' }).fill('Digimarktest1234');
  
  await page.waitForTimeout(1000);
  await page.getByRole('combobox', { name: 'Sélectionner le secteur d’' }).click();
  await page.getByRole('option', { name: 'food' }).click();
  
  await page.waitForTimeout(1000);
  await page.getByRole('combobox', { name: 'Entrez l\'adresse de l\'' }).click();
  await page.getByRole('combobox', { name: 'Entrez l\'adresse de l\'' }).fill('add');
  await page.getByText('Rue Addi Bâ', { exact: true }).click();
  
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'SIRET :' }).click();
  await page.getByRole('textbox', { name: 'SIRET :' }).fill('12345678900000');

  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Nom du client' }).click();
  await page.getByRole('textbox', { name: 'Nom du client' }).fill('1');
  
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Entrez le numéro de téléphone' }).click();
  await page.getByRole('textbox', { name: 'Entrez le numéro de téléphone' }).fill('251236524');
  
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Adresse e-mail' }).click();
  await page.getByRole('textbox', { name: 'Adresse e-mail' }).fill('test12345@gmail.com');
  await page.getByRole('button', { name: 'Suivant' }).click();
  
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Noms des agents (séparés par' }).click();
  await page.getByRole('textbox', { name: 'Noms des agents (séparés par' }).fill('zeeshantest');

  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Entrez le tarif personnalisé' }).click();
  await page.getByRole('textbox', { name: 'Entrez le tarif personnalisé' }).fill('100');
  
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Appliquer un coupon' }).click();
  await page.getByRole('textbox', { name: 'Appliquer un coupon' }).fill('1');
  
  // Verify pricing is displayed
  await expect(page.getByText('Tarif final')).toBeVisible();
  await expect(page.getByText('Base: 100,00 € - Remise: 1,00 € = 99,00 €')).toBeVisible();
  
  // enter comments
  await page.getByRole('textbox', { name: 'Commentaires internes' }).click();
  await page.getByRole('textbox', { name: 'Commentaires internes' }).fill('test comment');

  // Wait for Suivant button to be enabled before clicking
  await expect(page.getByRole('button', { name: 'Suivant' })).toBeEnabled({ timeout: 5000 });
  await page.getByRole('button', { name: 'Suivant' }).click();

  // Wait for API requests to complete and page to stabilize
  await page.waitForLoadState('networkidle');

  // wait until next page loads
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Verify elements on the next page
  await expect(page.getByText('99,00€')).toBeVisible();
  await expect(page.getByText('1', { exact: true })).toBeVisible();
  await expect(page.getByText('Digimarktest1234')).toBeVisible();
  
  const button = page.getByRole('button', { name: 'Envoyer la proposition' });
  await expect(button).toBeEnabled();
  await button.click();
  
  // Wait for navigation to "Dossiers client" page after submission
  await page.waitForURL('**/my-files', { timeout: 10000 });
  expect(page.url()).toContain('my-files');
  // https://dev-sales.scintiacallflow.ai/my-files

});