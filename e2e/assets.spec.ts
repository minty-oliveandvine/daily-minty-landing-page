import { test, expect } from '@playwright/test';
import { publicPaths } from './routes';

// Every image, video and icon a page references is actually served. This is
// the proof that moving or deleting files under public/ missed nothing:
// a reference to a file that is gone shows up here as a non-200.

test('every image, video and icon referenced by a page is served', async ({ page, request }) => {
  const refs = new Map<string, string>(); // url -> first page that referenced it
  for (const path of publicPaths()) {
    await page.goto(path);
    // Lazy sections mount on scroll; walk the page so they render their <img>s.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 50));
      }
      window.scrollTo(0, 0);
    });
    const urls = await page.evaluate(() => {
      const out: string[] = [];
      const pick = (sel: string, attr: string) =>
        document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          const v = el.getAttribute(attr);
          if (v) out.push(v);
        });
      pick('img[src]', 'src');
      pick('video[src]', 'src');
      pick('video[poster]', 'poster');
      pick('source[src]', 'src');
      pick('link[rel~="icon"]', 'href');
      // Background images set inline on landing sections.
      document.querySelectorAll<HTMLElement>('[style*="background"]').forEach((el) => {
        const m = el.style.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
        if (m) out.push(m[1]);
      });
      return out;
    });
    for (const u of urls) {
      if (u.startsWith('data:')) continue;
      // next/image rewrites <img src> to /_next/image?url=<source>&w=…; the
      // question here is whether the SOURCE file exists, and asking the dev
      // server to resize a 10 MB PNG on the fly is slow enough to time out.
      const source = u.startsWith('/_next/image?')
        ? new URL(u, 'http://x').searchParams.get('url') ?? u
        : u;
      if (!refs.has(source)) refs.set(source, path);
    }
  }
  expect(refs.size, 'pages reference at least one asset').toBeGreaterThan(10);

  const results = await Promise.all(
    [...refs].map(async ([url, foundOn]) => ({ url, foundOn, status: (await request.get(url)).status() })),
  );
  const missing = results.filter((r) => r.status !== 200).map((r) => `${r.url} -> ${r.status} (on ${r.foundOn})`);
  expect(missing, 'assets that did not load').toEqual([]);
});

test('favicon is served', async ({ request }) => {
  expect((await request.get('/favicon.ico')).status()).toBe(200);
});
