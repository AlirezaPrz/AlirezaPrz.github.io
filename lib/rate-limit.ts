import "server-only"

/**
 * Small in-memory sliding-window rate limiter.
 *
 * On Vercel each serverless instance keeps its own memory, so this is a
 * speed bump rather than a wall. That's enough for a personal site with a
 * honeypot in front of it. If you ever get real spam, swap this for
 * @upstash/ratelimit (see README).
 */
const hits = new Map<string, number[]>()

export function rateLimit(key: string, { limit = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    const retryAfter = Math.ceil((windowMs - (now - recent[0])) / 1000)
    return { ok: false as const, retryAfter }
  }
  recent.push(now)
  hits.set(key, recent)

  // Keep the map from growing forever
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k)
  }
  return { ok: true as const }
}
