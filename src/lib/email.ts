// COPY of minty-web/lib/emailInput.ts's rules (2026-10-01); the hook is ./emailInput.ts.
// Change every copy (minty-web, billing-frontend, onboarding, Flask static/js/email_input.js).
// No React here: the contact API route imports it.

/** Email fields take English only - printable ASCII (the user's call, 2026-10-01). */
export const EMAIL_ASCII_HINT = 'Email can only contain English letters, numbers and symbols.';

/** One "@", something either side, a dot in the domain - printable ASCII only. */
export const EMAIL_RE = /^[\x21-\x3F\x41-\x7E]+@[\x21-\x3F\x41-\x7E]+\.[\x21-\x3F\x41-\x7E]+$/;

const NOT_EMAIL_CHAR = /[^\x21-\x7E]/g;
const NON_ASCII = /[^\x00-\x7F]/;

export function isEmail(value: unknown): boolean {
  return EMAIL_RE.test(String(value ?? '').trim());
}

/** True when `value` holds a character no email field accepts (Korean, accents, emoji...). */
export function hasNonAsciiEmailChar(value: string): boolean {
  return NON_ASCII.test(value);
}

/** Drops everything but printable ASCII - whitespace included, which no address contains. */
export function sanitizeEmailInput(value: string): string {
  return value.replace(NOT_EMAIL_CHAR, '');
}
