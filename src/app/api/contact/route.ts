import { NextResponse } from 'next/server';
import { sendContactEmail, type ContactSubmission } from '@/lib/graph-mailer';
import { check, clientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const MAX_LENGTHS: Record<keyof ContactSubmission, number> = {
  name: 100,
  email: 200,
  businessName: 150,
  topic: 100,
  message: 5000,
};

// Mirrors the client-side limits (which are only a UX guard) so the server never
// rejects something the UI just promised, then adds an hourly ceiling the client
// does not enforce — that one is the real backstop against sustained abuse.
const RULES = [
  { limit: 2, windowMs: 60 * 1000 }, // burst: 2 per minute
  { limit: 5, windowMs: 10 * 60 * 1000 }, // matches the form's 5 per 10 minutes
  { limit: 10, windowMs: 60 * 60 * 1000 }, // ceiling: 10 per hour
];

/** Reject bodies large enough to be an attack rather than a message. */
const MAX_BODY_BYTES = 20_000;

/** A human cannot fill this form in under three seconds. */
const MIN_FILL_MS = 3_000;

/** Generic reply for anything we silently drop, so probes learn nothing. */
const SILENT_OK = { ok: true };

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  // Same-origin form posts from some browsers omit Origin; allow only if there is
  // also no cross-site referer. Anything with a foreign Origin is rejected.
  if (!origin) return true;

  try {
    const host = request.headers.get('host');
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function validate(body: Record<string, unknown>): { data?: ContactSubmission; error?: string } {
  const get = (key: string) => (typeof body[key] === 'string' ? (body[key] as string).trim() : '');

  const data: ContactSubmission = {
    name: get('name'),
    email: get('email'),
    businessName: get('businessName'),
    topic: get('topic'),
    message: get('message'),
  };

  if (!data.name || !data.email || !data.topic || !data.message) {
    return { error: 'Please fill in all required fields.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { error: 'Please enter a valid email address.' };
  }
  for (const [key, limit] of Object.entries(MAX_LENGTHS)) {
    const value = data[key as keyof ContactSubmission];
    if (value && value.length > limit) {
      return { error: `${key} is too long.` };
    }
  }

  return { data };
}

export async function POST(request: Request) {
  const ip = clientIp(request);

  // 1. Reject cross-site posts outright.
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 403 });
  }

  // 2. Rate limit before doing any work, so floods stay cheap to reject.
  const { allowed, retryAfter } = check(`contact:${ip}`, RULES);
  if (!allowed) {
    const mins = Math.ceil(retryAfter / 60);
    return NextResponse.json(
      {
        error:
          retryAfter > 90
            ? `You've sent several messages recently. Please try again in about ${mins} minute${
                mins === 1 ? '' : 's'
              }, or email us directly.`
            : `Please wait ${retryAfter} seconds before sending another message.`,
      },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    );
  }

  // 3. Refuse oversized payloads without buffering them.
  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 413 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // 4. Honeypot — real users never see this field, bots fill everything.
  if (typeof body.company === 'string' && body.company.length > 0) {
    console.warn('[contact] honeypot triggered', { ip });
    return NextResponse.json(SILENT_OK);
  }

  // 5. Timing check — a form completed instantly was not typed by a person.
  const renderedAt = Number(body.renderedAt);
  if (Number.isFinite(renderedAt) && renderedAt > 0) {
    const elapsed = Date.now() - renderedAt;
    if (elapsed < MIN_FILL_MS) {
      console.warn('[contact] submitted too fast', { ip, elapsed });
      return NextResponse.json(SILENT_OK);
    }
  }

  const { data, error } = validate(body);
  if (!data) {
    return NextResponse.json({ error }, { status: 400 });
  }

  try {
    await sendContactEmail(data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] send failed:', err);
    return NextResponse.json(
      { error: 'Something went wrong sending your message. Please email us directly.' },
      { status: 500 }
    );
  }
}

/** Anything other than POST is not a valid way to reach this endpoint. */
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
