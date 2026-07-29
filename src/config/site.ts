export const siteConfig = {
  name: 'Daily Minty',
  shortName: 'Minty',
  tagline: 'Daily closing, finally calm.',
  description:
    'Daily Minty helps small businesses close the day with confidence. Petty cash and bill payment, synced to Xero, in one calm dashboard.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dailyminty.com',
  loginUrl:
    process.env.NEXT_PUBLIC_WAITLIST_URL ||
    'https://www.minty.oliveandvinehk.com/',
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