import { NextResponse, type NextRequest } from "next/server"
import { rateLimit } from "@/lib/rate-limit"

/**
 * Recommendation form → Formspree.
 *
 * The browser posts here (never to Formspree directly), so the form ID stays
 * server-side and the honeypot and rate limit run before anything is sent.
 */

type Kind = "watch" | "listen"

interface Body {
  kind?: unknown
  title?: unknown
  creator?: unknown
  note?: unknown
  name?: unknown
  /** Honeypot. Real people never see or fill this field. */
  website?: unknown
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "")

function clientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown"
}

export async function POST(req: NextRequest) {
  let body: Body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "That didn't look like a form submission." }, { status: 400 })
  }

  // Bots fill every field. Pretend it worked so they don't adapt.
  if (str(body.website, 200)) return NextResponse.json({ ok: true })

  const kind: Kind = body.kind === "listen" ? "listen" : "watch"
  const title = str(body.title, 160)
  const creator = str(body.creator, 160)
  const note = str(body.note, 1500)
  const name = str(body.name, 80)

  if (title.length < 1) {
    return NextResponse.json(
      { error: kind === "watch" ? "Tell me which movie!" : "Tell me which song or album!" },
      { status: 422 },
    )
  }

  const limit = rateLimit(clientIp(req), { limit: 5, windowMs: 10 * 60 * 1000 })
  if (!limit.ok) {
    return NextResponse.json(
      { error: "That's a lot of recommendations. Give me a few minutes to catch up." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    )
  }

  const formId = process.env.FORMSPREE_FORM_ID
  if (!formId) {
    return NextResponse.json({ error: "The form isn't connected yet." }, { status: 503 })
  }

  const label = kind === "watch" ? "watch" : "listen to"
  try {
    const res = await fetch(`https://formspree.io/f/${encodeURIComponent(formId)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `${kind === "watch" ? "🎬" : "🎧"} ${name || "Someone"} says ${label}: ${title}`,
        type: kind === "watch" ? "Movie / show" : "Music",
        title,
        [kind === "watch" ? "director" : "artist"]: creator || "(not given)",
        why: note || "(no note)",
        from: name || "anonymous",
      }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => "")
      throw new Error(`Formspree ${res.status}: ${detail.slice(0, 300)}`)
    }
  } catch (err) {
    console.error("[recommend] Formspree failed:", err)
    return NextResponse.json({ error: "Something broke on my end. Mind trying again later?" }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
