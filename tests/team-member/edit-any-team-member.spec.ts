import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://dev-sales.scintiacallflow.ai/');
  await page.getByRole('textbox', { name: 'Entrez l\'e-mail' }).click();
  await page.getByRole('textbox', { name: 'Entrez l\'e-mail' }).fill('digimarkvercel@gmail.com');
  await page.getByRole('textbox', { name: 'Entrez le mot de passe' }).click();
  await page.getByRole('textbox', { name: 'Entrez le mot de passe' }).fill('string');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.getByRole('textbox', { name: 'Entrez le code OTP' }).click();
  await page.getByRole('textbox', { name: 'Entrez le code OTP' }).fill('000000');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByRole('link', { name: 'Équipe' }).click();
  await page.locator('#radix-_r_23_').click();
  await page.getByRole('menuitem', { name: 'Modifier' }).click();
  await page.getByRole('textbox', { name: 'Prénom' }).fill('Maryam');
  await page.getByRole('textbox', { name: 'Mot de passe', exact: true }).click();
  await page.getByRole('textbox', { name: 'Mot de passe', exact: true }).fill('12345678');
  await page.getByRole('textbox', { name: 'Confirmer le mot de passe' }).click();
  await page.getByRole('textbox', { name: 'Confirmer le mot de passe' }).fill('12345678');
  await page.getByRole('button', { name: 'Mettre à jour le membre' }).click();
});