import { test, expect } from '@playwright/test';
import { publicPaths } from './routes';

// Every internal link on every page resolves. Pins the fact that nothing links
// to a route before that route is removed, and that nothing links to a page
// that no longer exists afterwards.

test('every internal link on every page resolves', async ({ page, request }) => {
  const seen = new Map<string, string>(); // href -> first page it was found on
  for (const path of publicPaths()) {
    await page.goto(path);
    const hrefs = await page
      .locator('a[href^="/"]')
      .evaluateAll((els) => els.map((el) => (el as HTMLAnchorElement).getAttribute('href') ?? ''));
    for (const href of hrefs) {
      const clean = href.split('#')[0].split('?')[0];
      if (clean && !seen.has(clean)) seen.set(clean, path);
    }
  }
  expect(seen.size, 'the site has internal links').toBeGreaterThan(0);

  const broken: string[] = [];
  for (const [href, foundOn] of seen) {
    const res = await request.get(href);
    if (res.status() !== 200) broken.push(`${href} -> ${res.status()} (linked from ${foundOn})`);
  }
  expect(broken, 'broken internal links').toEqual([]);
});

test('sitemap.xml and robots.txt are served and agree', async ({ request }) => {
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toMatch(/Sitemap: .*\/sitemap\.xml/);

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  const expected = [
    '/pricing',
    '/resources/learning',
    '/resources/faq',
    '/resources/xero-integration',
    '/resources/contact',
  ];
  for (const path of expected) {
    expect(xml, `sitemap lists ${path}`).toContain(`${path}</loc>`);
  }
});
