import 'server-only';

/**
 * In-memory sliding-window rate limiter.
 *
 * Deliberately dependency-free. The trade-off: state lives in the process, so on
 * serverless platforms each instance keeps its own counters and they reset when an
 * instance recycles. That makes this a real deterrent against casual abuse and
 * scripted floods hitting a warm instance, but not an airtight global cap.
 *
 * To make limits global, swap `hits`/`blocked` for a shared store (Redis) — the
 * `check()` signature is designed so callers need no changes.
 */

type Rule = {
  /** Maximum allowed requests within the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
};

export type RateLimitResult = {
  allowed: boolean;
  /** Seconds until the caller may retry. Only meaningful when `allowed` is false. */
  retryAfter: number;
};

const hits = new Map<string, number[]>();

// Entries are pruned lazily on access; this bounds memory if a key is never seen
// again (e.g. a one-off attacker IP) so the map cannot grow without limit.
const MAX_KEYS = 10_000;

function prune(now: number, longestWindow: number) {
  if (hits.size < MAX_KEYS) return;
  for (const [key, timestamps] of hits) {
    const fresh = timestamps.filter((t) => t > now - longestWindow);
    if (fresh.length === 0) hits.delete(key);
    else hits.set(key, fresh);
  }
}

/**
 * Records a hit for `key` and reports whether it is allowed under every rule.
 * All rules must pass; the longest applicable wait is returned.
 */
export function check(key: string, rules: Rule[]): RateLimitResult {
  const now = Date.now();
  const longestWindow = Math.max(...rules.map((r) => r.windowMs));

  prune(now, longestWindow);

  const timestamps = (hits.get(key) ?? []).filter((t) => t > now - longestWindow);

  let retryAfter = 0;
  for (const rule of rules) {
    const inWindow = timestamps.filter((t) => t > now - rule.windowMs);
    if (inWindow.length >= rule.limit) {
      // Oldest hit in this window must age out before another is permitted.
      const oldest = Math.min(...inWindow);
      const waitMs = oldest + rule.windowMs - now;
      retryAfter = Math.max(retryAfter, Math.ceil(waitMs / 1000));
    }
  }

  if (retryAfter > 0) {
    // Record the rejected attempt too, so hammering the endpoint extends the block
    // rather than letting an attacker probe at the boundary for free.
    hits.set(key, [...timestamps, now]);
    return { allowed: false, retryAfter };
  }

  hits.set(key, [...timestamps, now]);
  return { allowed: true, retryAfter: 0 };
}

/** Best-effort client IP from proxy headers. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // Left-most entry is the original client; the rest are proxies.
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}
