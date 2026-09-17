import { test, expect } from '@playwright/test';
import { publicPaths } from './routes';

// Every reachable page renders with its chrome and a heading. This is the
// coarse "nothing is broken" check the other specs build on.

for (const path of publicPaths()) {
  test(`${path} renders`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status(), `GET ${path}`).toBe(200);

    await expect(page.locator('nav[aria-label="Primary"]')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    expect((await h1.textContent())?.trim().length, `${path} has an empty <h1>`).toBeGreaterThan(0);

    await expect(page).toHaveTitle(/.+/);
  });
}

test('unknown paths render the not-found page, not a crash', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.locator('body')).toContainText(/not found|404|can.t find/i);
});
