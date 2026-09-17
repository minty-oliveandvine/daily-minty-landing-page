# Daily Minty — marketing site

The public site at [dailyminty.com](https://dailyminty.com): the landing page, pricing, the
learning guides, FAQ, the Xero integration page and a contact form. Next.js 14 (App Router) +
TypeScript + Tailwind 3, deployed on Vercel. There is no backend of its own — the only server
code is the contact endpoint, which sends mail through Microsoft Graph.

```bash
npm install
cp .env.example .env.local     # the NEXT_PUBLIC_* values are optional; the MS_* ones only matter for the contact form
npm run dev                    # http://localhost:3000
```

## Pages

| URL                           | What                                                  | Copy lives in                 |
| ----------------------------- | ----------------------------------------------------- | ----------------------------- |
| `/`                           | landing                                               | `src/config/landing.ts`       |
| `/pricing`                    | plans and module tiles                                | `src/components/pricing/PricingGrid.tsx` |
| `/resources/learning`         | getting-started guides (YouTube embeds)               | `src/config/get-started.ts`   |
| `/resources/faq`              | FAQ                                                   | `src/config/faq.ts`           |
| `/resources/xero-integration` | how the Xero sync works (in the sitemap, not the nav) | `src/config/xero-integration.ts` |
| `/resources/contact`          | the contact form                                      | `src/components/contact/ContactFormSection.tsx` |
| `/api/contact`                | POST only; validates, rate-limits, sends via Graph    | `src/app/api/contact/route.ts`, `src/lib/graph-mailer.ts` |

The navbar and footer are data: `src/config/nav.ts` and `footer.ts`. `sitemap.ts` and
`robots.ts` are generated from `src/config/site.ts`, which also holds the brand name, tagline,
the waitlist and login URLs and the contact address. Brand colours and fonts are Tailwind
tokens in `tailwind.config.ts`.

## Where things are

|                     |                                                                    |
| ------------------- | ------------------------------------------------------------------ |
| `src/app/`          | routes (one folder per URL), `layout.tsx` with the site metadata   |
| `src/components/`   | by page: `landing/`, `pricing/`, `get-started/`, `support/`, `contact/`, `xero/`; shared `layout/` and `ui/` |
| `src/config/`       | page copy and link tables — edit these, not the components         |
| `src/animations/`   | GSAP entrance animations                                           |
| `src/lib/`          | `graph-mailer.ts`, `rate-limit.ts`, `utils.ts`                     |
| `public/`           | by page: `brand/`, `landing/`, `pricing/`, `guides/`, `support/`, `shared/` |
| `e2e/`              | Playwright tests, see below                                        |
| `docs/`             | `contact-form-implementation.md` (how the form works and what is still open), `feedback/`, `archive/` |

## Scripts

|                     |                                                        |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | dev server on 3000                                     |
| `npm run build`     | production build                                       |
| `npm run start`     | serve the production build                             |
| `npm run lint`      | eslint (`next/core-web-vitals`)                        |
| `npm run type-check`| `tsc --noEmit`                                         |
| `npm run test:e2e`  | Playwright — starts its own dev server on 3002         |

There is no CI in this repo; `lint`, `type-check`, `build` and `test:e2e` are the gates
somebody runs before a commit.

## Testing

`e2e/` holds characterisation tests: every page the navbar, footer and sitemap point at
renders; every internal link resolves; every image and icon a page references is served;
the contact form renders and its API refuses what it should (GET, a cross-site POST, a filled
honeypot, an instant submit). The route list is derived from `src/config` and `sitemap.ts`,
so adding a page to either puts it under test. **Nothing ever submits a valid message** —
that would send real mail.

## The contact form

`POST /api/contact` checks origin, rate limit (2/min, 5/10 min, 10/hour per IP), body size,
a honeypot field, a minimum fill time, then validates and sends through Microsoft Graph as
`CONTACT_MAILBOX`. It needs `MS_TENANT_ID`, `MS_CLIENT_ID`, `MS_CLIENT_SECRET` and
`CONTACT_MAILBOX` in the deployed environment, and the app registration needs `Mail.Send`
consent — `docs/contact-form-implementation.md` has the setup and the open items.

## Env

All variables are listed in `.env.example`. The `NEXT_PUBLIC_*` ones are inlined at build
time and have defaults in `src/config/site.ts`; the `MS_*` ones are server-only and required
for the form to send.
