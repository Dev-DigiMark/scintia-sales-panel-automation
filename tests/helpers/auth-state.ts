import fs from 'fs';
import path from 'path';
import { Page } from '@playwright/test';

export const AUTH_STATE_PATH = path.resolve(__dirname, '../../playwright/.auth/user.json');

export async function saveAuthState(page: Page): Promise<void> {
  fs.mkdirSync(path.dirname(AUTH_STATE_PATH), { recursive: true });
  await page.context().storageState({ path: AUTH_STATE_PATH });
}
