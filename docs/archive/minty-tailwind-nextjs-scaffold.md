# Daily Minty — Next.js 14 + TypeScript + Tailwind

Complete restructured project meeting the new stack requirements:

| Requirement | Choice |
|---|---|
| **Framework** | Next.js 14 (App Router) + TypeScript |
| **Styling** | Tailwind CSS v3.4 |
| **Package Manager** | npm |
| **Hosting** | Vercel |

5 pages, one deployment, full SEO infrastructure.

| URL | Page |
|---|---|
| `/` | Penny Landing (main) |
| `/pricing` | Pricing |
| `/get-started` | Getting Started |
| `/resources/support` | FAQ |
| `/resources/contact` | Contact |

---

## 📁 Updated Project Structure (Tailwind)

```
daily-minty-landing/
├── public/
│   ├── assets/
│   │   ├── (all PNGs and MP4s from the 5 HTML files)
│   │   ├── og-image.png            ← 1200x630 social share
│   │   └── favicon.ico
│   └── robots.txt (auto-generated)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              (Root layout + SEO + Tailwind base)
│   │   ├── globals.css             (Tailwind directives ONLY)
│   │   ├── page.tsx                (/)
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── not-found.tsx
│   │   │
│   │   ├── pricing/page.tsx        (/pricing)
│   │   ├── get-started/page.tsx    (/get-started)
│   │   │
│   │   └── resources/
│   │       ├── support/page.tsx    (/resources/support)
│   │       └── contact/page.tsx    (/resources/contact)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/                     (shared, reusable Tailwind components)
│   │   │   ├── Button.tsx
│   │   │   ├── Container.tsx
│   │   │   └── Section.tsx
│   │   ├── landing/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ProblemSection.tsx
│   │   │   ├── OutcomeSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── HelpsYouSection.tsx
│   │   │   └── DemoSection.tsx
│   │   ├── pricing/
│   │   │   ├── PricingHero.tsx
│   │   │   ├── PricingGrid.tsx
│   │   │   ├── PricingCard.tsx
│   │   │   └── PricingFaqBlurb.tsx
│   │   ├── support/
│   │   │   ├── SupportHero.tsx
│   │   │   ├── WhatYouGetSection.tsx
│   │   │   ├── GuidesSection.tsx
│   │   │   ├── GuideCard.tsx       ('use client')
│   │   │   ├── MiniFaqSection.tsx
│   │   │   └── StillHaveQuestions.tsx
│   │   ├── faq/
│   │   │   ├── FaqHeader.tsx
│   │   │   ├── FaqTabs.tsx         ('use client')
│   │   │   ├── FaqAccordion.tsx    ('use client')
│   │   │   ├── PermissionsTable.tsx
│   │   │   └── StillNeedHelp.tsx
│   │   └── contact/
│   │       ├── ContactHero.tsx
│   │       ├── ContactForm.tsx     ('use client')
│   │       └── ContactChannels.tsx
│   │
│   ├── config/
│   │   ├── site.ts
│   │   ├── nav.ts
│   │   ├── footer.ts
│   │   ├── landing.ts
│   │   ├── pricing.ts
│   │   ├── support.ts
│   │   ├── faq.ts
│   │   └── contact.ts
│   │
│   └── lib/
│       └── utils.ts                (cn() helper for conditional classes)
│
├── tailwind.config.ts              (Brand tokens as Tailwind theme)
├── postcss.config.mjs
├── next.config.mjs
├── tsconfig.json
├── package.json
├── .env.example
├── .gitignore
├── vercel.json
└── README.md
```

**What changed from the vanilla-CSS version:**

| Vanilla CSS version | Tailwind version |
|---|---|
| `src/app/globals.css` had ~600 lines of styles | `src/app/globals.css` is ~10 lines (Tailwind directives only) |
| Brand colors in `:root` CSS variables | Brand tokens in `tailwind.config.ts` `theme.extend.colors` |
| Per-page stylesheets (`landing.css`, `pricing.css`, etc.) | **Deleted** — styling lives in component className strings |
| Custom utility classes (`.btn`, `.wrap`) | Reusable `<Button>` and `<Container>` components |
| Hover/responsive in CSS media queries | Tailwind `hover:`, `md:`, `lg:` modifiers |

---

# Section 1 — Foundation files

## 1.1 `package.json`

```json
{
  "name": "daily-minty-landing",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "next": "14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.5.2"
  },
  "devDependencies": {
    "@types/node": "^20.14.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.5",
    "postcss": "^8.4.41",
    "tailwindcss": "^3.4.10",
    "typescript": "^5.5.0"
  }
}
```

## 1.2 `tailwind.config.ts` — Brand tokens lifted into Tailwind theme

> This is the **single source of truth** for colors, fonts, shadows, and breakpoints. Backend developers maintaining the site adjust theme values here, not in component code.

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/config/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.75rem', // 28px — matches original .wrap
      screens: {
        '2xl': '1140px',  // max-width matches original .wrap cap
      },
    },
    extend: {
      colors: {
        // Brand palette — ported from CSS variables
        cream:       '#fdf6ec',
        peach:       '#fbe7d2',
        'peach-deep':'#f4d4b3',
        mint:        '#d6efe8',
        'mint-soft': '#eaf6f2',
        'mint-deep': '#b9e2d6',
        teal: {
          DEFAULT: '#2fb8a6',
          deep:    '#1f9e8d',
          grad1:   '#00CBC6',
          grad2:   '#00D5BF',
        },
        ink: {
          DEFAULT: '#0f2d3a',
          soft:    '#2c4754',
          muted:   '#6b8088',
        },
        line: {
          DEFAULT: '#e7ddd0',
          soft:    '#efe8da',
        },
        'brand-deep': '#124b6a',
        // Accent peach for "problem" highlight text
        'peach-accent': '#d96a3a',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'minty-sm': '0 1px 2px rgba(15,45,58,.04), 0 2px 8px rgba(15,45,58,.04)',
        'minty-md': '0 4px 12px rgba(15,45,58,.06), 0 12px 32px rgba(15,45,58,.06)',
        'minty-lg': '0 8px 20px rgba(15,45,58,.08), 0 24px 48px rgba(15,45,58,.08)',
        'teal-glow':'0 6px 18px rgba(47,184,166,.3)',
      },
      backgroundImage: {
        'teal-gradient': 'linear-gradient(90deg, #00CBC6 0%, #00D5BF 100%)',
        'teal-gradient-hover': 'linear-gradient(90deg, #00D8D3 0%, #00E2CC 100%)',
        'hero-teal': `
          radial-gradient(ellipse 70% 90% at 88% 55%, #8fe8d4 0%, #5fd4bf 28%, rgba(95,212,191,0) 65%),
          radial-gradient(ellipse 50% 70% at 95% 40%, #b9f0e0 0%, rgba(185,240,224,0) 55%),
          linear-gradient(110deg, #00BDB8 0%, #00CBC6 50%, #00D5BF 100%)
        `,
      },
      keyframes: {
        catFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%':      { transform: 'translateY(-14px) rotate(2deg)' },
        },
        tierFade: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulseRing: {
          '0%,100%': { boxShadow: '0 0 0 4px rgba(47,184,166,.2)' },
          '50%':     { boxShadow: '0 0 0 8px rgba(47,184,166,.05)' },
        },
        subRipple: {
          '0%':   { transform: 'scale(0.85)', opacity: '0.4' },
          '70%':  { transform: 'scale(1.25)', opacity: '0' },
          '100%': { transform: 'scale(1.35)', opacity: '0' },
        },
      },
      animation: {
        'cat-float':  'catFloat 5.5s ease-in-out infinite',
        'tier-fade':  'tierFade 0.35s ease',
        'pulse-ring': 'pulseRing 2s ease-in-out infinite',
        'sub-ripple': 'subRipple 2.6s ease-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
```

## 1.3 `postcss.config.mjs`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## 1.4 `src/app/globals.css` — ONLY Tailwind directives

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Minor base resets — Tailwind's preflight covers most of this already */
@layer base {
  html {
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  body {
    @apply font-sans text-ink bg-white leading-normal;
  }
  h1, h2, h3, h4 {
    @apply text-ink font-bold tracking-tight;
    text-wrap: balance;
  }
  p {
    @apply text-ink-soft;
    margin: 0;
  }
}

/* Screen-reader-only utility — Tailwind has `sr-only` built in, kept for clarity */
```

## 1.5 `next.config.mjs`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  compress: true,
  poweredByHeader: false,
};
export default nextConfig;
```

## 1.6 `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## 1.7 `.env.example`

```bash
NEXT_PUBLIC_SITE_URL=https://dailyminty.com
NEXT_PUBLIC_WAITLIST_URL=https://www.minty.oliveandvinehk.com/
NEXT_PUBLIC_CONTACT_EMAIL=hello@dailyminty.com
```

## 1.8 `src/lib/utils.ts` — `cn()` helper

> Standard Tailwind utility for merging className strings without conflicts.

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes intelligently.
 * Later classes override earlier ones for the same property.
 *
 * Usage:
 *   cn('p-4 bg-red-500', condition && 'bg-blue-500', 'p-6')
 *   → 'bg-blue-500 p-6'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

# Section 2 — Reusable UI Primitives

## 2.1 `src/components/ui/Container.tsx`

```tsx
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'footer' | 'main' | 'article';
}

/**
 * Site-wide content wrapper — max 1140px wide, centered, with 28px gutter.
 * Replaces the original `.wrap` CSS class.
 */
export default function Container({
  children,
  className,
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[1140px] px-7', className)}>
      {children}
    </Tag>
  );
}
```

## 2.2 `src/components/ui/Button.tsx`

```tsx
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'pill-dark' | 'white' | 'ghost' | 'text' | 'outline-white';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  external?: boolean;
  type?: never;
  onClick?: never;
  disabled?: never;
}

interface NativeButtonProps extends BaseProps {
  href?: never;
  external?: never;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

type ButtonProps = LinkButtonProps | NativeButtonProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-teal-gradient text-white shadow-teal-glow hover:bg-teal-gradient-hover hover:-translate-y-px hover:shadow-[0_10px_24px_rgba(47,184,166,0.36)]',
  'pill-dark':
    'bg-ink text-white hover:bg-[#1a3e4d] hover:-translate-y-px',
  white:
    'bg-white text-ink shadow-minty-sm hover:-translate-y-px hover:shadow-minty-md',
  ghost:
    'bg-white text-ink border border-line hover:border-ink-soft hover:-translate-y-px',
  text:
    'bg-transparent text-ink hover:text-teal-deep',
  'outline-white':
    'bg-transparent text-white shadow-[inset_0_0_0_1.5px_rgba(255,255,255,.7)] hover:bg-white/10 hover:shadow-[inset_0_0_0_1.5px_white]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-[18px] py-[10px] text-sm',
  md: 'px-[26px] py-[14px] text-[15px]',
  lg: 'px-9 py-[18px] text-base',
};

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold no-underline cursor-pointer border-0 font-sans transition-all duration-150';

export default function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const classes = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  if ('href' in props && props.href) {
    if (props.external) {
      return (
        <a href={props.href} className={classes} rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type || 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cn(classes, props.disabled && 'opacity-60 cursor-not-allowed')}
    >
      {children}
    </button>
  );
}
```

## 2.3 `src/components/ui/Section.tsx`

```tsx
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  ariaLabelledBy?: string;
}

/**
 * Page section wrapper. Pass background/padding via className.
 *
 * Example:
 *   <Section className="bg-peach py-20" ariaLabelledBy="problem-title">
 */
export default function Section({
  children,
  className,
  id,
  ariaLabelledBy,
}: SectionProps) {
  return (
    <section id={id} aria-labelledby={ariaLabelledBy} className={cn(className)}>
      {children}
    </section>
  );
}
```

---

# Section 3 — Config files (content-only, no styling)

## 3.1 `src/config/site.ts`

```typescript
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
```

## 3.2 `src/config/nav.ts`

```typescript
import { siteConfig } from './site';

export interface NavChild {
  label: string;
  href: string;
  enabled: boolean;
}
export interface NavLink {
  key: string;
  label: string;
  href: string;
  enabled: boolean;
  variant?: 'text' | 'primary' | 'dark';
  external?: boolean;
  children?: NavChild[];
}

export const navLinks: NavLink[] = [
  { key: 'home',     label: 'Home',    href: '/',        variant: 'text', enabled: true },
  { key: 'pricing',  label: 'Pricing', href: '/pricing', variant: 'text', enabled: true },
  {
    key: 'resources',
    label: 'Resources',
    href: '#',
    variant: 'text',
    enabled: true,
    children: [
      { label: 'Learning / FAQ', href: '/resources/support', enabled: true },
      { label: 'Contact',       href: '/resources/contact', enabled: true },
    ],
  },
  {
    key: 'get-started',
    label: 'Get Started with Minty',
    href: '/get-started',
    variant: 'primary',
    enabled: true,
  },
  {
    key: 'login',
    label: 'Log In',
    href: siteConfig.loginUrl,
    variant: 'dark',
    external: true,
    enabled: true,
  },
];
```

## 3.3 `src/config/footer.ts`

```typescript
import { siteConfig } from './site';

export interface FooterChildLink {
  key: string; label: string; href: string;
  external?: boolean; enabled: boolean;
}
export interface FooterLink {
  key: string; label: string; href: string;
  external?: boolean; style: 'text' | 'button'; enabled: boolean;
  children?: FooterChildLink[];
}

export const footerLinks: FooterLink[] = [
  { key: 'home',    label: 'Home',    href: '/',        style: 'text', enabled: true },
  { key: 'pricing', label: 'Pricing', href: '/pricing', style: 'text', enabled: true },
  {
    key: 'resources', label: 'Resources', href: '#', style: 'text', enabled: true,
    children: [
      { key: 'support-faq', label: 'Support / FAQ', href: '/resources/support', enabled: true },
      { key: 'contact',     label: 'Contact',       href: '/resources/contact', enabled: true },
    ],
  },
  {
    key: 'get-started', label: 'Get started with Minty',
    href: '/get-started', style: 'button', enabled: false, // placeholder
  },
  {
    key: 'login', label: 'Log In',
    href: siteConfig.loginUrl, external: true, style: 'button', enabled: true,
  },
];

export function getVisibleFooterLinks(): FooterLink[] {
  return footerLinks
    .filter((l) => l.enabled)
    .map((l) => ({ ...l, children: l.children?.filter((c) => c.enabled) }));
}
```

> **The page configs (`landing.ts`, `pricing.ts`, `support.ts`, `faq.ts`, `contact.ts`) are content-only and don't change between the vanilla-CSS and Tailwind versions.** Reuse them from the previous artifact — they're already pure data.

---

# Section 4 — Root layout & SEO

## 4.1 `src/app/layout.tsx`

```tsx
import type { Metadata, Viewport } from 'next';
import { siteConfig } from '@/config/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  robots: {
    index: true, follow: true,
    googleBot: {
      index: true, follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website', locale: 'en_US',
    url: siteConfig.url, siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.social.twitter,
  },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  alternates: { canonical: siteConfig.url },
  category: 'business',
};

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1, themeColor: '#2fb8a6',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '280', priceCurrency: 'HKD' },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## 4.2 `src/app/sitemap.ts`

```typescript
import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteConfig.url}/`,                  lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${siteConfig.url}/pricing`,           lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteConfig.url}/get-started`,       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.url}/resources/support`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteConfig.url}/resources/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
```

## 4.3 `src/app/robots.ts`

```typescript
import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

---

# Section 5 — Shared layout components

## 5.1 `src/components/layout/Navbar.tsx`

```tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navLinks, type NavLink } from '@/config/nav';
import { cn } from '@/lib/utils';
import Container from '@/components/ui/Container';

function navLinkClass(variant?: 'text' | 'primary' | 'dark'): string {
  if (variant === 'primary') {
    return 'inline-flex items-center justify-center gap-2 rounded-full bg-teal-gradient text-white text-sm font-semibold px-[18px] py-[10px] shadow-teal-glow hover:bg-teal-gradient-hover hover:-translate-y-px transition-all duration-150 ml-1';
  }
  if (variant === 'dark') {
    return 'inline-flex items-center justify-center rounded-full bg-ink text-white text-sm font-semibold px-[18px] py-[10px] hover:bg-[#1a3e4d] hover:-translate-y-px transition-all duration-150 ml-1';
  }
  return 'inline-flex items-center text-ink no-underline px-[14px] py-2 rounded-full font-semibold text-sm hover:bg-ink/[0.06] transition-colors';
}

function isActive(pathname: string, link: NavLink): boolean {
  if (link.href === '/' && pathname === '/') return true;
  if (link.href !== '/' && link.href !== '#' && pathname.startsWith(link.href)) return true;
  if (link.children) {
    return link.children.some((c) => c.enabled && pathname.startsWith(c.href));
  }
  return false;
}

export default function Navbar() {
  const pathname = usePathname();
  const visible = navLinks.filter((l) => l.enabled);

  return (
    <nav className="relative top-0 z-50 bg-white border-b border-ink/[0.06]" aria-label="Primary">
      <Container className="flex items-center justify-between py-[18px]">
        <Link href="/" className="inline-flex items-center" aria-label="Daily Minty home">
          <Image
            src="/assets/minty-logo-v2.png"
            alt="Daily Minty"
            width={132}
            height={44}
            priority
            className="h-11 w-auto block"
          />
        </Link>

        <div className="flex gap-1.5 items-center max-md:hidden">
          {visible.map((link) => {
            const active = isActive(pathname, link);

            // Resources dropdown
            if (link.children) {
              return (
                <div key={link.key} className="relative group">
                  <button
                    type="button"
                    className={cn(
                      navLinkClass(link.variant),
                      'flex items-center gap-1 select-none',
                      active && 'bg-ink/[0.08]'
                    )}
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="ml-0.5 inline-block w-2 h-2 border-r-2 border-b-2 border-current rotate-45 -translate-y-px transition-transform group-hover:rotate-[225deg] group-focus-within:rotate-[225deg]"
                    />
                  </button>
                  <div
                    role="menu"
                    className={cn(
                      'absolute top-full left-1/2 -translate-x-1/2 translate-y-1.5 min-w-[200px]',
                      'bg-white border border-ink/10 rounded-2xl shadow-minty-lg p-2 z-[60]',
                      'opacity-0 invisible pointer-events-none transition-all duration-150',
                      'group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0',
                      'group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:translate-y-0',
                      'before:content-[""] before:absolute before:-top-2 before:left-0 before:right-0 before:h-2'
                    )}
                  >
                    {link.children.filter((c) => c.enabled).map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        role="menuitem"
                        className="block px-3.5 py-2.5 rounded-[10px] text-sm font-semibold text-ink hover:bg-teal/10 hover:text-teal-deep transition-colors"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            const className = cn(
              navLinkClass(link.variant),
              active && link.variant !== 'primary' && link.variant !== 'dark' && 'bg-ink/[0.08]'
            );

            if (link.external) {
              return (
                <a key={link.key} href={link.href} className={className} rel="noopener noreferrer">
                  {link.label}
                </a>
              );
            }

            return (
              <Link
                key={link.key}
                href={link.href}
                className={className}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </Container>
    </nav>
  );
}
```

## 5.2 `src/components/layout/Footer.tsx`

```tsx
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { getVisibleFooterLinks, type FooterLink } from '@/config/footer';
import { cn } from '@/lib/utils';
import Container from '@/components/ui/Container';

function FooterAnchor({
  href, external, className, children,
}: {
  href: string; external?: boolean; className?: string; children: React.ReactNode;
}) {
  return external ? (
    <a href={href} className={className} rel="noopener noreferrer">{children}</a>
  ) : (
    <Link href={href} className={className}>{children}</Link>
  );
}

function FooterMenuItem({ link }: { link: FooterLink }) {
  const hasChildren = !!link.children && link.children.length > 0;
  const baseTextClass = 'text-ink-muted no-underline text-[13px] font-semibold hover:text-ink transition-colors';
  const buttonClass = 'inline-flex items-center rounded-full bg-ink text-white text-sm font-semibold px-[18px] py-[10px] hover:bg-[#1a3e4d] transition-colors';

  if (!hasChildren) {
    return (
      <FooterAnchor
        href={link.href}
        external={link.external}
        className={link.style === 'button' ? buttonClass : baseTextClass}
      >
        {link.label}
      </FooterAnchor>
    );
  }

  return (
    <div className="relative group">
      <button
        type="button"
        className={cn(baseTextClass, 'inline-flex items-center gap-1.5 bg-transparent border-0 p-0 cursor-pointer font-sans')}
        aria-haspopup="true"
        aria-expanded="false"
      >
        {link.label}
        <span
          aria-hidden="true"
          className="inline-block w-[7px] h-[7px] border-r-2 border-b-2 border-current rotate-45 -translate-y-px transition-transform group-hover:rotate-[225deg] group-focus-within:rotate-[225deg]"
        />
      </button>
      <ul
        role="menu"
        aria-label={`${link.label} submenu`}
        className={cn(
          'absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-1.5 mb-1.5',
          'min-w-[180px] list-none p-2',
          'bg-white border border-ink/10 rounded-2xl shadow-minty-lg z-[60]',
          'opacity-0 invisible pointer-events-none transition-all duration-150',
          'group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:-translate-y-2.5',
          'group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:-translate-y-2.5',
          'after:content-[""] after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-2'
        )}
      >
        {link.children!.map((child) => (
          <li key={child.key} role="none">
            <FooterAnchor
              href={child.href}
              external={child.external}
              className="block px-3.5 py-2.5 rounded-[10px] text-sm font-semibold text-ink bg-transparent hover:bg-teal/10 hover:text-teal-deep transition-colors"
            >
              {child.label}
            </FooterAnchor>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const visibleLinks = getVisibleFooterLinks();

  return (
    <footer className="bg-cream py-9 border-t border-ink/[0.06]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <Container className="flex justify-between items-center gap-6 flex-wrap">
        <div className="flex gap-[18px] items-center text-ink-muted text-[13px]">
          <Link href="/" aria-label="Daily Minty home" className="inline-flex items-center">
            <Image
              src="/assets/minty-logo-v2.png"
              alt=""
              width={78}
              height={26}
              className="h-[26px] w-auto block"
            />
          </Link>
          <span>© {year} {siteConfig.author.name}</span>
        </div>
        <nav className="flex gap-3.5 items-center flex-wrap" aria-label="Footer">
          {visibleLinks.map((link) => (
            <FooterMenuItem key={link.key} link={link} />
          ))}
        </nav>
      </Container>
    </footer>
  );
}
```

---

# Section 6 — Page routes (5 `page.tsx` files)

## 6.1 `src/app/page.tsx` — Penny Landing

```tsx
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import OutcomeSection from '@/components/landing/OutcomeSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import HelpsYouSection from '@/components/landing/HelpsYouSection';
import DemoSection from '@/components/landing/DemoSection';

export const metadata: Metadata = {
  title: 'Daily Minty — Daily closing, finally calm.',
  description:
    'Daily Minty makes daily cash closing simple. Petty cash, bill payment, and Xero sync in one calm dashboard for small business owners.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <OutcomeSection />
        <HowItWorksSection />
        <HelpsYouSection />
        <DemoSection />
      </main>
      <Footer />
    </>
  );
}
```

The other 4 page routes follow the same shape — same imports, same metadata pattern, different component imports. They're identical to the previous artifact's page routes except they no longer import a per-page CSS file (because Tailwind handles styling inline).

---

# Section 7 — Example page sections (Tailwind-styled)

## 7.1 `src/components/landing/HeroSection.tsx`

```tsx
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { landingContent } from '@/config/landing';

export default function HeroSection() {
  const { hero } = landingContent;
  return (
    <section className="bg-white py-15 md:py-20" aria-labelledby="hero-title">
      <Container className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-10 items-center">
        <div className="md:pl-12">
          <h1
            id="hero-title"
            className="text-[44px] md:text-[clamp(44px,5.4vw,64px)] font-extrabold leading-[1.05] tracking-[-0.035em] mb-4"
          >
            {hero.title} <span className="text-ink">{hero.titleAccent}</span>
          </h1>
          <p className="text-[17px] max-w-[460px] text-ink-soft mb-7">
            {hero.lede}
          </p>
          <div className="flex gap-3.5 items-center flex-wrap mb-4">
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="text">
              {hero.secondaryCta.label}
            </Button>
          </div>
          <span className="inline-flex items-center gap-2 text-[13px] text-ink-muted">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-teal text-white">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            {hero.trustText}
          </span>
        </div>
        <div className="aspect-[5/4] flex items-center justify-center">
          <Image
            src="/assets/hero-cat-laptop-phone.png"
            alt={hero.imageAlt}
            width={600}
            height={600}
            priority
            className="w-full max-w-[600px] h-auto object-contain"
          />
        </div>
      </Container>
    </section>
  );
}
```

## 7.2 `src/components/landing/ProblemSection.tsx`

```tsx
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { landingContent } from '@/config/landing';

function renderHeadline(headline: string, highlights: readonly string[]) {
  const pattern = new RegExp(`(${highlights.join('|')})`, 'gi');
  return headline.split(pattern).map((part, i) =>
    highlights.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
      <span key={i} className="text-peach-accent">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function ProblemSection() {
  const { problem } = landingContent;
  return (
    <section className="bg-peach py-20" aria-labelledby="problem-title">
      <Container className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div className="aspect-[5/4] flex items-center justify-center">
          <Image
            src="/assets/problem-cat-box.png"
            alt={problem.imageAlt}
            width={500}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="bg-[#fff7ec] rounded-[22px] p-8 shadow-minty-sm">
          <span className="inline-block bg-peach-deep text-peach-accent font-bold text-[11px] tracking-[0.12em] uppercase px-3 py-[5px] rounded-full mb-[18px]">
            {problem.tag}
          </span>
          <h2 id="problem-title" className="text-[28px] leading-[1.2] mb-[18px]">
            {renderHeadline(problem.headline, problem.highlights)}
          </h2>
          <ul className="list-none p-0 m-0 flex flex-col gap-3">
            {problem.items.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[15px] text-ink-soft">
                <span aria-hidden="true" className="flex-none w-[22px] h-[22px] inline-flex items-center justify-center text-peach-accent font-extrabold text-base leading-none">
                  ✕
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
```

## 7.3 `src/components/landing/HowItWorksSection.tsx`

```tsx
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { landingContent } from '@/config/landing';

export default function HowItWorksSection() {
  const { how } = landingContent;
  return (
    <section id="how" className="bg-white pt-24 pb-20 text-center" aria-labelledby="how-title">
      <Container>
        <h2
          id="how-title"
          className="text-[clamp(30px,3.6vw,42px)] mb-3.5 whitespace-pre-line"
        >
          {how.title}
        </h2>
        <p className="max-w-[580px] mx-auto mb-14 text-ink-muted text-[15px]">
          {how.subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {how.steps.map((step) => (
            <article
              key={step.num}
              className="bg-white border border-line rounded-[22px] p-7 text-center shadow-minty-sm grid grid-rows-[auto_auto_auto_1fr] justify-items-center gap-3.5"
            >
              <div className="w-full aspect-[4/3] flex items-center justify-center">
                <Image
                  src={step.image}
                  alt={step.alt}
                  width={230}
                  height={172}
                  className="w-full h-full object-contain"
                />
              </div>
              <span
                aria-hidden="true"
                className="w-9 h-9 rounded-full bg-mint text-teal-deep inline-flex items-center justify-center font-bold text-base"
              >
                {step.num}
              </span>
              <h3 className="text-[21px] m-0 flex items-center min-h-[2.4em]">{step.title}</h3>
              <p className="text-[15.5px] text-ink-muted min-h-[4em] leading-normal">{step.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

## 7.4 `src/components/pricing/PricingCard.tsx`

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { PricingPlan } from '@/config/pricing';

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      className="flex-none mt-[3px] text-teal-deep">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <article
      data-plan={plan.key}
      className={cn(
        'relative bg-white rounded-[18px] border border-ink/10 p-9 shadow-minty-sm flex flex-col',
        'transition-all duration-200 hover:-translate-y-[3px] hover:shadow-minty-md',
        plan.isPopular && 'bg-[#f4f6fc] border-brand-deep/[0.18] shadow-minty-md -translate-y-1.5',
        plan.isPopular && 'hover:bg-teal-gradient hover:border-teal/40 hover:shadow-[0_12px_32px_rgba(0,203,198,.28)]',
        !plan.isPopular && 'hover:bg-[#f4f6fc] hover:border-brand-deep/[0.18]'
      )}
    >
      <div className="w-full aspect-[16/11] rounded-[14px] bg-[#f4f6fc] border border-ink/[0.08] flex items-center justify-center overflow-hidden mb-5">
        <Image
          src={plan.thumbSrc}
          alt={`${plan.name} module`}
          width={300}
          height={206}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="min-h-[75px] flex flex-wrap items-center gap-2.5">
        <span className="text-[28px] font-extrabold text-brand-deep tracking-tight">{plan.name}</span>
        {plan.popularTag && (
          <span className="inline-block bg-[#d6dcf6] text-brand-deep text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full">
            {plan.popularTag}
          </span>
        )}
      </div>
      <p className="text-ink-soft text-sm leading-[1.45] mt-2 min-h-[81px]">{plan.tagline}</p>
      <div className="mt-[22px] min-h-[130px] flex flex-col">
        <span className="text-[56px] font-extrabold text-brand-deep tracking-[-0.03em] leading-none inline-flex items-baseline gap-1">
          <span className="line-through decoration-[#e0413a] decoration-2 text-ink-muted">
            <span className="text-[22px] font-bold -translate-y-0.5">{plan.strikePrice.currency}</span>
            {plan.strikePrice.amount}
            <span className="text-base font-semibold text-ink-muted ml-1 self-center">{plan.strikePrice.unit}</span>
          </span>
          <span className="text-[30px] text-teal-deep font-extrabold ml-2 self-center">Free</span>
        </span>
        <p className="text-xs text-ink-muted leading-normal mt-2 whitespace-pre-line min-h-[32px]">{plan.meta}</p>
        <p className="text-[12.5px] text-ink-muted mt-2">{plan.trialNote}</p>
      </div>
      <Link
        href={plan.cta.href}
        className={cn(
          'mt-[22px] w-full text-center rounded-[12px] py-3.5 font-bold text-sm no-underline block transition-all duration-150',
          plan.isPopular
            ? 'bg-brand-deep text-white hover:bg-teal-gradient'
            : 'bg-[#eceff7] text-brand-deep hover:bg-brand-deep hover:text-white hover:-translate-y-px'
        )}
      >
        {plan.cta.label}
      </Link>
      <div className="mt-7 text-sm font-bold text-ink">{plan.featuresHeading}</div>
      <ul className="list-none p-0 mt-3.5 flex flex-col gap-3 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
            <CheckIcon />{f}
          </li>
        ))}
      </ul>
    </article>
  );
}
```

## 7.5 `src/components/faq/FaqAccordion.tsx`

```tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { FaqItem, FaqBlock } from '@/config/faq';
import PermissionsTable from './PermissionsTable';

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <article
            key={item.id}
            id={`faq-${item.id}`}
            className={cn(
              'bg-white border rounded-[14px] overflow-hidden transition-all duration-200 h-fit',
              'border-line hover:border-ink/[0.18] hover:-translate-y-0.5 hover:shadow-minty-md',
              isOpen && 'border-teal shadow-[0_1px_0_rgba(47,184,166,.06),0_8px_24px_rgba(15,45,58,.06)]',
              item.wide && 'md:col-span-2'
            )}
          >
            <button
              type="button"
              className="w-full flex items-center gap-4 px-[22px] py-[18px] bg-transparent border-0 cursor-pointer text-left font-sans"
              aria-expanded={isOpen}
              aria-controls={`faq-body-${item.id}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <span className="flex-1 text-base font-semibold text-teal-deep leading-[1.4]">
                Q. {item.question}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  'relative flex-none w-10 h-10 rounded-xl bg-teal-gradient shadow-[0_6px_16px_rgba(0,203,198,.30)] transition-transform duration-300',
                  'before:content-[""] before:absolute before:top-1/2 before:left-[11px] before:right-[11px] before:h-[2.5px] before:bg-white before:rounded-sm before:-translate-y-1/2 before:transition-transform before:duration-300',
                  'after:content-[""] after:absolute after:left-1/2 after:top-[11px] after:bottom-[11px] after:w-[2.5px] after:bg-white after:rounded-sm after:-translate-x-1/2 after:transition-transform after:duration-300',
                  isOpen && 'before:rotate-[135deg] after:rotate-[135deg]'
                )}
              />
            </button>
            {isOpen && (
              <div
                id={`faq-body-${item.id}`}
                className="px-[22px] pb-5 text-ink-soft text-[14.5px] leading-[1.65]"
                role="region"
              >
                {renderBlocks(item.body)}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function renderBlocks(blocks: FaqBlock[]) {
  return blocks.map((block, idx) => {
    switch (block.type) {
      case 'p':
        return <p key={idx} className="text-ink-muted [&+p]:mt-2.5">{block.text}</p>;
      case 'p-strong':
        return <p key={idx} className="text-ink-muted [&+p]:mt-2.5"><strong>{block.text}</strong></p>;
      case 'ul':
        return (
          <ul key={idx} className="mt-2.5 pl-5 text-ink-soft text-[14.5px] leading-[1.65] marker:text-teal">
            {block.items.map((it, i) =>
              typeof it === 'string' ? (
                <li key={i} className="mb-1">{it}</li>
              ) : (
                <li key={i} className="mb-1"><strong>{it.strong}</strong> {it.text}</li>
              )
            )}
          </ul>
        );
      case 'ol':
        return (
          <ol key={idx} className="mt-2.5 pl-[22px] text-ink-soft text-[14.5px] leading-[1.65] marker:text-teal-deep marker:font-bold">
            {block.items.map((it, i) => <li key={i} className="mb-2">{it}</li>)}
          </ol>
        );
      case 'permissions-table':
        return <PermissionsTable key={idx} />;
    }
  });
}
```

---

# Section 8 — `vercel.json`

```json
{
  "buildCommand": "next build",
  "framework": "nextjs",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

---

# Section 9 — `README.md`

```markdown
# Daily Minty — Marketing Site (Tailwind)

5-page Next.js 14 + TypeScript + Tailwind application, deployed on Vercel.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 |
| Package Manager | npm |
| Hosting | Vercel |

## Pages

| URL | Page |
|---|---|
| `/` | Penny Landing (main) |
| `/pricing` | Pricing plans |
| `/get-started` | Getting started guides |
| `/resources/support` | Support / FAQ |
| `/resources/contact` | Contact us |

## Quick start

```bash
# 1. Install
npm install

# 2. Configure
cp .env.example .env.local
# Edit .env.local with your values

# 3. Run
npm run dev
```

Open http://localhost:3000

## Where to edit things

| Task | File |
|---|---|
| Edit page copy | `src/config/<page>.ts` |
| Change brand info | `src/config/site.ts` |
| Toggle a nav/footer link | `src/config/nav.ts` or `footer.ts` |
| **Change brand colors / fonts** | `tailwind.config.ts` → `theme.extend.colors` |
| Change a button style | `src/components/ui/Button.tsx` |
| Add a new page | Create `src/app/<route>/page.tsx` + add to `sitemap.ts` |

## Why Tailwind here

- **Brand tokens defined once** in `tailwind.config.ts` — change `teal.deep` and every accent updates
- **No separate stylesheet files** to keep in sync with components
- **Bundle stays tiny** — Tailwind tree-shakes unused classes at build time
- **Responsive built-in** — `md:`, `lg:` modifiers instead of media-query CSS
- **Hover/focus/active states inline** with the component they affect

## SEO

- ✅ Per-page `<title>`, meta description, canonical URL
- ✅ Open Graph + Twitter cards
- ✅ JSON-LD structured data (SoftwareApplication root; FAQPage, Product, ContactPage per page)
- ✅ Auto-generated `sitemap.xml` and `robots.txt`
- ✅ Semantic HTML throughout
- ✅ All images use `next/image` with alt text

## Deployment

Push to GitHub, import on [vercel.com/new](https://vercel.com/new), add env vars, deploy. Vercel auto-detects Next.js + Tailwind — no config needed.
```

---

## 🎯 Honest flags for your team

1. **Some component bodies are sketched as patterns rather than fully written.** I've shown complete examples of `HeroSection`, `ProblemSection`, `HowItWorksSection`, `PricingCard`, and `FaqAccordion`. The remaining components (`OutcomeSection`, `HelpsYouSection`, `DemoSection`, `PricingHero`, `PricingFaqBlurb`, all `support/` and `contact/` components, the FAQ wrapper components) follow the exact same pattern: import config, return JSX with Tailwind classes. Want me to write any of them out in full?

2. **The page configs (`landing.ts`, `pricing.ts`, `support.ts`, `faq.ts`, `contact.ts`) are unchanged from the previous artifact.** They're pure data and have nothing to do with the styling switch. Use the versions we built before.

3. **No CSS files per page anymore.** Removed `landing.css`, `pricing.css`, `support.css`, `faq.css`, `contact.css`. Styling lives in component className strings. The only CSS file is `src/app/globals.css` and it just declares Tailwind directives.

4. **`@apply` is used sparingly** in `globals.css` for body/heading base styles. Industry best practice with Tailwind is to keep almost all styling in classNames so the component is self-contained.

5. **Some "very custom" effects** (animated gradients on the pricing hero card, the cat-float animation, the sub-ripple) live in `tailwind.config.ts` under `keyframes` and `animation`. This keeps animations type-safe and reusable as `animate-cat-float`, `animate-sub-ripple`, etc.

6. **The `cn()` helper requires two tiny dependencies** (`clsx` + `tailwind-merge`). They're industry standard, total ~3KB gzipped. They let you safely combine conditional classes without later utilities being overridden by earlier ones — essential when building Tailwind component libraries.

7. **`tailwind-merge` matters in `Button.tsx`** — if you pass `<Button className="bg-red-500">`, it correctly overrides the variant's default background instead of producing `bg-teal-gradient bg-red-500` (which would be unpredictable).

8. **Reduced motion is handled by Tailwind's `motion-safe:` / `motion-reduce:` modifiers** — I'd recommend wrapping the cat-float and ripple animations like `motion-safe:animate-cat-float` so users with `prefers-reduced-motion: reduce` see a still image instead.

## What to do next

Pick whichever helps most:

1. **Write out the remaining ~15 components in full** so you have a paste-and-deploy ready codebase
2. **Generate the page configs again here** so everything lives in one artifact (`landing.ts` through `contact.ts`)
3. **Build the Contact form API route** with a real email provider (Resend recommended for Vercel)
4. **Add a Tailwind plugin recommendation** (e.g., `@tailwindcss/forms` for nicer default form styles, `@tailwindcss/typography` for rich text)

Which one?