import { test as setup } from '@playwright/test';
import { saveAuthState } from './helpers/auth-state';
import { login } from './helpers/login';

setup('authenticate', async ({ page }) => {
  await login(page);
  await saveAuthState(page);
});
