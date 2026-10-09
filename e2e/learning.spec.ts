import { test, expect } from '@playwright/test';

// The guide curriculum on /resources/learning. The page used to carry its numbering inside the
// title strings ("1. Daily Closing ..."), which is how the list silently drifted out of the
// owner's order. Now each guide renders at id="guide-GS-xx-yy", and because those codes sort
// lexicographically into curriculum order, "rendered order == sorted order" is enough to make
// that drift impossible to reintroduce.

const PATH = '/resources/learning';

async function renderedCodes(page: import('@playwright/test').Page) {
  return page
    .locator('[id^="guide-GS-"]')
    .evaluateAll((nodes) => nodes.map((node) => node.id.replace('guide-', '')));
}

test('guides render in canonical curriculum order', async ({ page }) => {
  await page.goto(PATH);
  const codes = await renderedCodes(page);

  expect(codes.length, 'playable guides on the page').toBeGreaterThan(0);
  expect(codes, 'rendered order must equal GS-code order').toEqual([...codes].sort());
  expect(codes[0]).toBe('GS-00-01');
});

test('every module is reachable from the rail', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(PATH);

  const rail = page.locator('nav[aria-label="Guide modules"]');
  await expect(rail).toBeVisible();

  const targets = await rail
    .locator('a')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''));
  expect(targets.length, 'modules in the rail').toBeGreaterThan(0);

  for (const target of targets) {
    expect(target.startsWith('#'), `rail link "${target}" is an anchor`).toBe(true);
    await expect(page.locator(target), `rail target ${target} exists`).toBeAttached();
  }
});

test('a guide opens in place and closes again', async ({ page }) => {
  await page.goto(PATH);

  const row = page.locator('[id^="guide-GS-"]').first();
  const toggle = row.locator('button').first();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');

  // Opening must not reflow anything above the row — that jump (the old card grid promoted the
  // open card with `md:col-span-2 order-first`) is exactly what this layout replaced. Measured
  // in DOCUMENT space, because opening also scrolls the player into view, which legitimately
  // changes viewport-relative coordinates.
  const documentTop = (locator: typeof row) =>
    locator.evaluate((node) => node.getBoundingClientRect().top + window.scrollY);

  const heading = page.locator('h2').first();
  const rowBefore = await documentTop(row);
  const headingBefore = await documentTop(heading);

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');

  expect(Math.abs((await documentTop(row)) - rowBefore), 'the row itself moved').toBeLessThan(2);
  expect(
    Math.abs((await documentTop(heading)) - headingBefore),
    'content above the row moved',
  ).toBeLessThan(2);

  const panelId = await toggle.getAttribute('aria-controls');
  await expect(page.locator(`#${panelId}`)).toBeVisible();
  await expect(page.locator(`#${panelId} iframe`)).toBeAttached();

  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator(`#${panelId}`)).toHaveCount(0);
});

test('unfilmed guides are visible but not focusable', async ({ page }) => {
  await page.goto(PATH);

  const comingSoon = page.getByText('Coming soon', { exact: true });
  const count = await comingSoon.count();

  for (let i = 0; i < count; i += 1) {
    const listItem = comingSoon.nth(i).locator('xpath=ancestor::li[1]');
    await expect(listItem).toBeVisible();
    // A placeholder must not be a focus stop that does nothing.
    await expect(listItem.locator('button, a')).toHaveCount(0);
  }
});

test('the #guide anchor the support cards link to still exists', async ({ page }) => {
  await page.goto(PATH);
  // links.spec.ts strips the fragment, so nothing else covers this target.
  await expect(page.locator('#guide')).toBeAttached();
});
