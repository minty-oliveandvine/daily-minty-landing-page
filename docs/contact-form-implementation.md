# Contact Form — Implementation Report

**Scope:** Wiring the `/resources/contact` form to deliver submissions into an Outlook
mailbox via the Microsoft Graph API.
**Branch:** `Newlandingpages`
**Status:** Code complete and committed. **Not yet verified against a live send** — see
[Outstanding work](#outstanding-work).

---

## 1. Starting point

The contact page rendered a complete-looking form, but it was inert:

- No `onSubmit` handler and no `action` attribute — submitting reloaded the page.
- Inputs had no `name` attributes, so no values would have been serialised anyway.
- The **Topic** dropdown contained a single placeholder option (`Pick one..`).
- No backend existed — the project had no `src/app/api/` directory at all.

The goal was to make submissions arrive in a monitored mailbox without introducing a
third-party form service.

---

## 2. Architecture

```
ContactFormSection.tsx      POST /api/contact         graph-mailer.ts
  (client component)   ──▶   route.ts (server)   ──▶   Microsoft Graph  ──▶  Outlook
   validates + UI            validates + rate-shapes    OAuth2 + sendMail        mailbox
```

Three layers, each with a single responsibility:

| Layer | File | Responsibility |
|---|---|---|
| UI | `src/components/contact/ContactFormSection.tsx` | Collect input, manage submit state, surface errors |
| API | `src/app/api/contact/route.ts` | Validate, reject spam, translate failures into safe messages |
| Transport | `src/lib/graph-mailer.ts` | Acquire Graph token, compose and send the mail |

Credentials live only in the transport layer, which is server-only. The browser never
receives them.

---

## 3. Implementation detail

### 3.1 Transport — `src/lib/graph-mailer.ts`

Uses the **OAuth2 client-credentials flow** (app-only, no signed-in user):

1. `POST https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token`
   with `scope=https://graph.microsoft.com/.default`.
2. `POST https://graph.microsoft.com/v1.0/users/{mailbox}/sendMail` with a bearer token.

Notable choices:

- **No SDK.** Implemented with plain `fetch` rather than `@azure/msal-node` or the Graph
  client. Two HTTP calls did not justify the dependency weight.
- **Module-scope token cache.** Tokens last ~60 minutes; they are cached and refreshed
  60 seconds early to avoid racing the expiry. Warm serverless invocations skip the token
  round trip entirely.
- **`import 'server-only'`.** The only dependency added (`server-only@0.0.1`, ~1 KB). It
  makes the **build fail loudly** if this module is ever imported into client code — a
  guardrail against leaking `MS_CLIENT_SECRET` into a browser bundle.
- **`replyTo` set to the submitter.** Mail arrives *from* the shared mailbox, but hitting
  Reply in Outlook addresses the person who filled the form.
- **HTML escaping.** All user-supplied values pass through `escapeHtml()` before being
  interpolated into the HTML mail body, preventing markup injection into the email.
- **Fail-fast config.** `readEnv()` throws listing every missing variable by name, rather
  than failing obscurely at request time.

### 3.2 API — `src/app/api/contact/route.ts`

- Pinned to `runtime = 'nodejs'`.
- Required fields: `name`, `email`, `topic`, `message`. `businessName` is optional.
- Email checked against a format regex; all fields have length caps (`message` 5000,
  `name` 100, etc.) mirroring the client-side `maxLength` attributes.
- **Honeypot:** a hidden `company` field. Real users leave it empty; bots fill it. When
  populated the route returns `{ ok: true }` *without sending* — the bot sees success and
  does not retry.
- **Error handling is asymmetric by design:** the full Graph error is logged server-side
  via `console.error`, while the client receives a generic message. Graph errors can
  contain tenant and mailbox detail that should not reach the browser.

### 3.3 UI — `src/components/contact/ContactFormSection.tsx`

Converted to a client component (`'use client'`) with a four-state machine:
`idle → sending → sent | error`.

- Submit button disables and reads `Sending…` during flight.
- Success replaces the form with a confirmation panel and a "Send another message" reset.
- Errors render in an inline banner above the button; the user's input is preserved.
- The **Topic** dropdown was populated with five options, defined in the `TOPICS` array at
  the top of the file. Edit that array to change them.
- Added `id`/`name`/`htmlFor` pairs and `required`/`maxLength` attributes throughout —
  these were previously absent, so the fields were also not accessible to screen readers.

---

## 4. Configuration

Four server-side variables:

| Variable | Purpose |
|---|---|
| `MS_TENANT_ID` | Azure AD tenant (directory) ID |
| `MS_CLIENT_ID` | App registration client ID |
| `MS_CLIENT_SECRET` | App registration client secret |
| `CONTACT_MAILBOX` | Mailbox to send **from** and deliver **to** |

None are prefixed `NEXT_PUBLIC_`, so Next.js will not expose them to the client bundle.

**Local:** stored in `.env.local`, which is gitignored via `.gitignore:29` (`.env*.local`).
Verified with `git check-ignore` — the secret is not tracked.

**Deployment:** `.env.local` is local-only. The four variables must be added to the hosting
provider's environment settings (e.g. Vercel project settings) or sending will fail in
production.

### Azure prerequisite

The app registration requires the **`Mail.Send` _Application_ permission** (not Delegated),
with **admin consent granted**. Without it Graph returns `403 ErrorAccessDenied`.

> Azure Portal → App registrations → *app* → API permissions → Add → Microsoft Graph →
> Application permissions → `Mail.Send` → Add → **Grant admin consent**

Note that `Mail.Send` at application scope grants the ability to send as *any* mailbox in
the tenant. Scoping it down with an ApplicationAccessPolicy limited to `CONTACT_MAILBOX` is
recommended but not currently configured.

---

## 5. Security notes

| Concern | Handling |
|---|---|
| Secret in client bundle | Prevented by `server-only` + no `NEXT_PUBLIC_` prefix |
| Secret in git | `.env.local` gitignored; verified via `git check-ignore` |
| HTML injection into email | All values escaped via `escapeHtml()` |
| Bot spam | Honeypot field |
| Oversized payloads | Length caps enforced server-side, not just in the DOM |
| Internal detail leakage | Graph errors logged server-side only; client gets a generic message |

**Credential hygiene:** the client secret was transmitted in plaintext during development
setup and is present in shell/editor history. Rotating it in Azure and updating both
`.env.local` and the host environment is advised.

---

## 6. Verification performed

- `tsc --noEmit` passes clean.
- `git check-ignore` confirms `.env.local` is untracked.
- Working tree matches `HEAD` — no uncommitted drift.

**Not performed:** no live submission has been sent end-to-end. The Azure admin-consent
step above is a prerequisite, so the Graph call is unproven until that is granted and a
real submission is tested.

---

## 7. Outstanding work

| Item | Notes |
|---|---|
| **Grant `Mail.Send` admin consent** | Blocking — nothing sends until this is done |
| **Test a live submission** | Confirms token flow, permission, and delivery together |
| **Add env vars to the deploy host** | Production will fail without them |
| **`.env.example` does not document the Graph vars** | A new developer cloning the repo gets no hint the four variables exist |
| Rate limiting | None. The endpoint can be POSTed in a loop; the honeypot only stops naive bots |
| Privacy policy link | Still `href="#"` in the form's footer text |
| Confirmation email to submitter | Not implemented — submitters get no receipt |
| Automated tests | None for the route or validation logic |
| `src/components/contact/ContactForm.tsx` | Dead component — despite the name it contains no form and nothing imports it. Candidate for deletion |

---

## 8. Files changed

| File | Change |
|---|---|
| `src/lib/graph-mailer.ts` | **New** — Graph token acquisition and send |
| `src/app/api/contact/route.ts` | **New** — validation and submission endpoint |
| `src/components/contact/ContactFormSection.tsx` | Wired to the API; added state, topics, honeypot, field attributes |
| `.env.local` | **New**, gitignored — real credentials |
| `package.json` / `package-lock.json` | Added `server-only@0.0.1` |
