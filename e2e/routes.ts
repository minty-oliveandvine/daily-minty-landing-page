// The pages the site links to. Derived from the same config the site renders
// from, so the list cannot drift from what the sitemap and navbar publish.

import { navLinks } from '../src/config/nav';
import { getVisibleFooterLinks } from '../src/config/footer';
import sitemap from '../src/app/sitemap';
import { siteConfig } from '../src/config/site';

function internal(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//');
}

/** Every internal path the navbar and footer link to (children included). */
export function linkedPaths(): string[] {
  const out = new Set<string>();
  for (const link of navLinks) {
    if (!link.enabled) continue;
    if (internal(link.href) && link.href !== '#') out.add(link.href);
    for (const child of link.children ?? []) {
      if (child.enabled && internal(child.href)) out.add(child.href);
    }
  }
  for (const link of getVisibleFooterLinks()) {
    if (internal(link.href)) out.add(link.href);
    for (const child of link.children ?? []) {
      if (internal(child.href)) out.add(child.href);
    }
  }
  return [...out];
}

/** Every path the sitemap publishes, relative to the site root. */
export function sitemapPaths(): string[] {
  return sitemap().map((entry) => entry.url.replace(siteConfig.url, '') || '/');
}

/** The union: the set of pages a visitor can reach. */
export function publicPaths(): string[] {
  return [...new Set(['/', ...linkedPaths(), ...sitemapPaths()])];
}
