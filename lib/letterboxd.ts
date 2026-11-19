import "server-only"
import { XMLParser } from "fast-xml-parser"

export interface WatchedFilm {
  id: string
  title: string
  year?: number
  /** 0.5–5, missing if I didn't rate it */
  rating?: number
  watchedDate?: string
  rewatch: boolean
  liked: boolean
  poster?: string
  url: string
}

const letterboxdUser = () => process.env.LETTERBOXD_USERNAME || "AlirezaPrz"

interface RssItem {
  title?: string
  link?: string
  guid?: string | { "#text": string }
  description?: string
  "letterboxd:filmTitle"?: string | number
  "letterboxd:filmYear"?: number
  "letterboxd:memberRating"?: number
  "letterboxd:watchedDate"?: string
  "letterboxd:rewatch"?: string
  "letterboxd:memberLike"?: string
}

/**
 * Every diary entry in the public Letterboxd RSS feed (the latest 50), newest
 * first. Cached for an hour (ISR). Returns null if the feed can't be read.
 */
export async function getDiary(): Promise<WatchedFilm[] | null> {
  const url = `https://letterboxd.com/${letterboxdUser()}/rss/`
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "Mozilla/5.0 (compatible; personal-site/1.0)" },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return null
    const xml = await res.text()

    const parser = new XMLParser({ ignoreAttributes: true, parseTagValue: true, trimValues: true })
    const doc = parser.parse(xml)
    const raw = doc?.rss?.channel?.item
    const items: RssItem[] = Array.isArray(raw) ? raw : raw ? [raw] : []

    return (
      items
        // The feed also contains lists and reviews without a film; keep diary entries only
        .filter((i) => i["letterboxd:filmTitle"] != null)
        .map((i) => {
          const guid = typeof i.guid === "object" ? i.guid["#text"] : i.guid
          const poster = i.description?.match(/<img[^>]+src="([^"]+)"/)?.[1]
          const rating = Number(i["letterboxd:memberRating"])
          return {
            id: guid ?? i.link ?? String(i["letterboxd:filmTitle"]),
            title: String(i["letterboxd:filmTitle"]),
            year: i["letterboxd:filmYear"] ? Number(i["letterboxd:filmYear"]) : undefined,
            rating: Number.isFinite(rating) && rating > 0 ? rating : undefined,
            watchedDate: i["letterboxd:watchedDate"],
            rewatch: i["letterboxd:rewatch"] === "Yes",
            liked: i["letterboxd:memberLike"] === "Yes",
            poster,
            url: i.link ?? `https://letterboxd.com/${letterboxdUser()}/`,
          }
        })
    )
  } catch {
    return null
  }
}

/**
 * The most recent films I rated five stars, one entry per film (rewatches
 * collapse), skipping any title in `exclude` (e.g. the hand-picked favourites).
 */
export function recentFiveStars(diary: WatchedFilm[], exclude: string[] = [], limit = 6): WatchedFilm[] {
  const seen = new Set(exclude.map((t) => t.toLowerCase()))
  const out: WatchedFilm[] = []
  for (const film of diary) {
    const key = film.title.toLowerCase()
    if (film.rating !== 5 || seen.has(key)) continue
    seen.add(key)
    out.push(film)
    if (out.length === limit) break
  }
  return out
}
