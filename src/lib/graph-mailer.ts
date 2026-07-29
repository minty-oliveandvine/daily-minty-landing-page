import 'server-only';

type GraphEnv = {
  tenantId: string;
  clientId: string;
  clientSecret: string;
  mailbox: string;
};

function readEnv(): GraphEnv {
  const { MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, CONTACT_MAILBOX } = process.env;

  const missing = Object.entries({ MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, CONTACT_MAILBOX })
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }

  return {
    tenantId: MS_TENANT_ID!,
    clientId: MS_CLIENT_ID!,
    clientSecret: MS_CLIENT_SECRET!,
    mailbox: CONTACT_MAILBOX!,
  };
}

// Tokens are valid ~60min; cache in module scope so warm invocations skip the round trip.
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(env: GraphEnv): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }

  const res = await fetch(`https://login.microsoftonline.com/${env.tenantId}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env.clientId,
      client_secret: env.clientSecret,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    }),
    cache: 'no-store',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Token request failed (${res.status}): ${data.error_description ?? data.error}`);
  }

  // Refresh 60s early to avoid racing the expiry.
  cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 };
  return cachedToken.value;
}

export type ContactSubmission = {
  name: string;
  email: string;
  businessName?: string;
  topic: string;
  message: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHtml(submission: ContactSubmission): string {
  const rows: Array<[string, string]> = [
    ['Name', submission.name],
    ['Email', submission.email],
    ['Business', submission.businessName || '—'],
    ['Topic', submission.topic],
  ];

  return `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#113B4A;">
      <h2 style="margin:0 0 16px;">New contact form submission</h2>
      <table style="border-collapse:collapse;margin-bottom:16px;">
        ${rows
          .map(
            ([label, value]) => `<tr>
              <td style="padding:4px 16px 4px 0;font-weight:bold;">${label}</td>
              <td style="padding:4px 0;">${escapeHtml(value)}</td>
            </tr>`
          )
          .join('')}
      </table>
      <div style="font-weight:bold;margin-bottom:4px;">Message</div>
      <div style="white-space:pre-wrap;background:#F9FBFC;border:1px solid #E7DDD0;border-radius:8px;padding:12px;">${escapeHtml(
        submission.message
      )}</div>
    </div>
  `;
}

export async function sendContactEmail(submission: ContactSubmission): Promise<void> {
  const env = readEnv();
  const token = await getAccessToken(env);

  const res = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(env.mailbox)}/sendMail`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: {
        subject: `[Contact] ${submission.topic} — ${submission.name}`,
        body: { contentType: 'HTML', content: buildHtml(submission) },
        toRecipients: [{ emailAddress: { address: env.mailbox } }],
        // Lets you hit "Reply" in Outlook and answer the submitter directly.
        replyTo: [{ emailAddress: { address: submission.email, name: submission.name } }],
      },
      saveToSentItems: true,
    }),
    cache: 'no-store',
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Graph sendMail failed (${res.status}): ${detail}`);
  }
}
