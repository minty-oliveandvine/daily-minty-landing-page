import { test, expect } from '@playwright/test';

// The contact form and its API. NOTHING here submits a valid message:
// src/lib/graph-mailer.ts would call Microsoft Graph with real credentials.
// Every request below is one the route rejects or silently drops BEFORE it
// reaches the mailer (see the numbered steps in src/app/api/contact/route.ts).
// The route rate-limits to 2 accepted POSTs a minute, so only two of the tests
// send a body that passes the origin check.

test('the form renders with its required fields and a submit button', async ({ page }) => {
  await page.goto('/resources/contact');
  const form = page.locator('form');
  await expect(form).toBeVisible();
  for (const name of ['name', 'email', 'topic', 'message']) {
    await expect(form.locator(`[name="${name}"]`), name).toHaveAttribute('required', '');
  }
  await expect(form.locator('[name="businessName"]')).toBeVisible();
  // The honeypot exists and is hidden from people.
  await expect(form.locator('[name="company"]')).toHaveAttribute('aria-hidden', 'true');
  await expect(form.locator('button[type="submit"]')).toBeEnabled();
});

test('an empty submit is blocked in the browser and sends nothing', async ({ page }) => {
  await page.goto('/resources/contact');
  let posted = false;
  page.on('request', (req) => {
    if (req.url().includes('/api/contact')) posted = true;
  });
  await page.locator('form button[type="submit"]').click();
  await page.waitForTimeout(500);
  expect(posted, 'a POST reached /api/contact').toBe(false);
  // The browser's own validity check keeps focus on the first empty field.
  await expect(page.locator('form [name="name"]')).toBeFocused();
});

test('GET /api/contact is not allowed', async ({ request }) => {
  expect((await request.get('/api/contact')).status()).toBe(405);
});

test('a cross-site POST is refused before anything is read', async ({ request }) => {
  const res = await request.post('/api/contact', {
    headers: { Origin: 'https://evil.example', 'Content-Type': 'application/json' },
    data: { name: 'x', email: 'x@example.com', topic: 'x', message: 'x' },
  });
  expect(res.status()).toBe(403);
});

test('a filled honeypot is dropped silently', async ({ request, baseURL }) => {
  const res = await request.post('/api/contact', {
    headers: { Origin: baseURL!, 'Content-Type': 'application/json' },
    data: { name: 'x', email: 'x@example.com', topic: 'x', message: 'x', company: 'bot' },
  });
  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({ ok: true });
});

test('a form completed instantly is dropped silently', async ({ request, baseURL }) => {
  const res = await request.post('/api/contact', {
    headers: { Origin: baseURL!, 'Content-Type': 'application/json' },
    data: { name: 'x', email: 'x@example.com', topic: 'x', message: 'x', renderedAt: Date.now() },
  });
  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({ ok: true });
});
