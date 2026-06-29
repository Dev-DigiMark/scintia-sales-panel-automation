import { expect, Page } from '@playwright/test';

export interface Credentials {
  email: string;
  password: string;
}

export function getCredentials(): Credentials {
  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;

  if (!email || !password) {
    throw new Error('Missing USER_EMAIL or USER_PASSWORD environment variables');
  }

  return { email, password };
}

export async function login(page: Page, credentials?: Credentials): Promise<void> {
  const creds = credentials || getCredentials();

  await page.goto(process.env.BASE_URL || '');
  await page.waitForLoadState('networkidle');
  // await page.waitForLoadState('domcontentloaded');

  await page.getByRole('textbox', { name: 'Entrez l\'e-mail' }).click();
  await page.getByRole('textbox', { name: 'Entrez l\'e-mail' }).fill(creds.email);
  await page.getByRole('textbox', { name: 'Entrez le mot de passe' }).click();
  await page.getByRole('textbox', { name: 'Entrez le mot de passe' }).fill(creds.password);
  if(process.env.ROLE === "mgr"){
    await page.getByRole('radio', { name: 'Responsable commercial', exact: true }).click();
  }else{
    await page.getByRole('radio', { name: 'Commercial', exact: true }).click();
  }
  await page.getByRole('button', { name: 'Se connecter' }).click();

  await page.waitForLoadState('networkidle');

  await page.getByRole('textbox', { name: 'Entrez le code OTP' }).click();
  await page.getByRole('textbox', { name: 'Entrez le code OTP' }).fill(process.env.OTP || '000000');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.waitForLoadState('networkidle');

  
  // Wait for navigation to complete or dashboard to load
  // Update this to match your app's post-login behavior
  await page.waitForURL('**/dashboard');
  const title = await page.title();
  console.log('Page title after login:', title);
  expect(title).toContain('Sales Panel - Scintia Callflow');

}

export async function openAuthenticatedApp(page: Page): Promise<void> {
  await page.goto(process.env.BASE_URL || '');
  await page.waitForLoadState('networkidle');
  await page.waitForURL('**/dashboard');
  await expect(page).toHaveTitle(/Sales Panel - Scintia Callflow/);
}
