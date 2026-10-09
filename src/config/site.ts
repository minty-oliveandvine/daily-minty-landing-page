export const siteConfig = {
  name: 'Daily Minty',
  shortName: 'Minty',
  tagline: 'Daily closing, finally calm.',
  description:
    'Daily Minty helps small businesses close the day with confidence. Petty cash and bill payment, synced to Xero, in one calm dashboard.',
  // This site's own address: the canonical tag, og:url, robots.txt's sitemap line and every
  // sitemap.xml entry. www, not the apex - dailyminty.com is attached to the same Vercel
  // project as a redirect to www.dailyminty.com, so the apex would make all of the above point
  // at a redirect. Read server-side only (layout.tsx, robots.ts, sitemap.ts), so it needs no
  // NEXT_PUBLIC_ prefix.
  url: process.env.WWW_URL || 'https://www.dailyminty.com',
  // Read in client components, so next.config.mjs's `env` inlines it - without that entry an
  // unprefixed variable compiles to nothing in the browser bundle and every Log In button
  // silently falls back to the default below.
  loginUrl:
    process.env.WAITLIST_URL || 'https://www.minty.oliveandvinehk.com/',
  waitlistUrl:
    process.env.NEXT_PUBLIC_WAITLIST_FORM_URL ||
    'https://forms.clickup.com/9008167462/f/8ceveh6-19038/4A7KI514BG030HAP22',
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@dailyminty.com',
  ogImage: '/assets/og-image.png',
  keywords: [
    'daily cash close',
    'petty cash app',
    'bill payment app',
    'Xero integration',
    'POS reconciliation',
    'small business accounting',
    'Minty',
    'Daily Minty',
  ],
  author: { name: 'Olive & Vine HK', url: 'https://oliveandvinehk.com' },
  social: { twitter: '@dailyminty' },
} as const;