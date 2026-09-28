/**
 * Contact form endpoint — POST /api/contact
 *
 * Takes a submission from the site's own form and emails it to the team via
 * Resend. Nothing is stored: no database, no log of the message body. That is
 * deliberate (GDPR data minimisation) and means a failed send is a lost
 * enquiry, so failures are surfaced to the visitor rather than swallowed.
 *
 * Required environment variables (set in the Vercel project, never in git):
 *   RESEND_API_KEY     — API key from resend.com
 *   CONTACT_TO_EMAIL   — inbox that receives enquiries
 *   CONTACT_FROM_EMAIL — verified sender on your Resend domain,
 *                        e.g. "Clavion Website <noreply@clavion.pro>"
 */

interface Payload {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  services?: unknown;
  timeframe?: unknown;
  message?: unknown;
  lang?: unknown;
  /** Honeypot — must stay empty. Hidden from humans, irresistible to bots. */
  website?: unknown;
  /** Client clock at form render, used to reject instant submissions. */
  startedAt?: unknown;
}

const MAX = {
  name: 120,
  email: 200,
  company: 200,
  message: 5000,
  timeframe: 60,
  service: 80,
  services: 10,
} as const;

/** Minimum time a human plausibly needs to fill the form. */
const MIN_FILL_MS = 3000;

/** Per-IP submissions allowed within the window below. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

/**
 * In-memory rate limiting. Fluid Compute reuses instances across requests, so
 * this catches naive floods, but it is per-instance and resets on cold start —
 * it is a speed bump, not a guarantee. The honeypot and timing check do the
 * heavier lifting. If abuse becomes real, move this to Vercel BotID or a
 * shared store rather than trusting the map below.
 */
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT;
}

function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

function strList(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((x): x is string => typeof x === 'string')
    .slice(0, MAX.services)
    .map((x) => x.trim().slice(0, MAX.service))
    .filter(Boolean);
}

/**
 * Deliberately loose: the only thing worth rejecting here is input that
 * clearly is not an address. Over-strict patterns turn away real people with
 * unusual but valid addresses, and a typo is caught by the bounce anyway.
 */
function looksLikeEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

/** Submitted text lands in an HTML email — escape before interpolating. */
function esc(v: string): string {
  return v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Header injection guard: a newline in a header value can append arbitrary
 * headers. Applies to the subject and to the display name in Reply-To.
 */
function headerSafe(v: string): string {
  return v.replace(/[\r\n]+/g, ' ').trim();
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // A misconfigured deployment must not look like a successful send.
    console.error(
      'contact: missing env —',
      { RESEND_API_KEY: !!apiKey, CONTACT_TO_EMAIL: !!to, CONTACT_FROM_EMAIL: !!from }
    );
    return json({ error: 'not_configured' }, 500);
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  // ── Bot checks ────────────────────────────────────────────────────────────
  // Both answer 200: a bot that learns it was caught adapts, and a human can
  // never legitimately trip either of these.
  if (str(body.website, 200) !== '') {
    return json({ ok: true }, 200);
  }

  const startedAt = typeof body.startedAt === 'number' ? body.startedAt : 0;
  if (startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS) {
    return json({ ok: true }, 200);
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return json({ error: 'rate_limited' }, 429);
  }

  // ── Validation ────────────────────────────────────────────────────────────
  const name = str(body.name, MAX.name);
  const email = str(body.email, MAX.email);
  const company = str(body.company, MAX.company);
  const message = str(body.message, MAX.message);
  const timeframe = str(body.timeframe, MAX.timeframe);
  const services = strList(body.services);
  const lang = ['de', 'en', 'es'].includes(String(body.lang))
    ? String(body.lang)
    : 'de';

  const invalid: string[] = [];
  if (!name) invalid.push('name');
  if (!email) invalid.push('email');
  else if (!looksLikeEmail(email)) invalid.push('email');
  if (!message) invalid.push('message');

  if (invalid.length) {
    return json({ error: 'invalid_fields', fields: invalid }, 400);
  }

  // ── Compose ───────────────────────────────────────────────────────────────
  const subject = headerSafe(
    `Neue Anfrage von ${name}${company ? ` (${company})` : ''}`
  );

  const rows: [string, string][] = [
    ['Name', name],
    ['E-Mail', email],
  ];
  if (company) rows.push(['Unternehmen', company]);
  if (services.length) rows.push(['Interesse', services.join(', ')]);
  if (timeframe) rows.push(['Wunschzeitraum', timeframe]);
  rows.push(['Sprache', lang.toUpperCase()]);

  const html = `<!doctype html>
<html lang="de"><body style="margin:0;padding:24px;background:#f5f5f5;font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#111">
  <div style="max-width:620px;margin:0 auto;background:#fff;border-radius:12px;padding:28px">
    <h1 style="margin:0 0 20px;font-size:18px">Neue Anfrage über clavion.pro</h1>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:7px 0;color:#666;width:150px;vertical-align:top">${esc(
              k
            )}</td><td style="padding:7px 0">${esc(v)}</td></tr>`
        )
        .join('')}
    </table>
    <h2 style="margin:24px 0 8px;font-size:14px;color:#666">Nachricht</h2>
    <div style="white-space:pre-wrap;font-size:14px;line-height:1.6;padding:14px;background:#fafafa;border-radius:8px;border:1px solid #eee">${esc(
      message
    )}</div>
    <p style="margin:24px 0 0;font-size:12px;color:#999">
      Direkt antworten geht — Reply-To steht auf ${esc(email)}.
    </p>
  </div>
</body></html>`;

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Nachricht:',
    message,
  ].join('\n');

  // ── Send ──────────────────────────────────────────────────────────────────
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        // Lets the team hit reply and reach the enquirer directly.
        reply_to: `${headerSafe(name)} <${email}>`,
        subject,
        html,
        text,
      }),
    });

    if (!res.ok) {
      // Log the provider's reason, but never the enquiry contents.
      console.error('contact: resend rejected', res.status, await res.text());
      return json({ error: 'send_failed' }, 502);
    }
  } catch (err) {
    console.error('contact: resend unreachable', err);
    return json({ error: 'send_failed' }, 502);
  }

  return json({ ok: true }, 200);
}

/** Anything other than POST is a mistake, not a route worth answering. */
export function GET(): Response {
  return json({ error: 'method_not_allowed' }, 405);
}
