import "server-only"

/**
 * Tiny typed Last.fm client. Server-only, so LASTFM_API_KEY never reaches
 * the browser. Every function returns null instead of throwing, so the UI
 * can fall back gracefully.
 */

const API = "https://ws.audioscrobbler.com/2.0/"
// Last.fm serves this grey star image when it has no real artwork
const PLACEHOLDER_HASH = "2a96cbd8b46e442fc41c2b86b821562f"

interface Track {
  name: string
  artist: string
  album?: string
  image?: string
  url: string
  nowPlaying: boolean
  /** Unix seconds; missing while now playing */
  playedAt?: number
}

export interface TopTrack {
  name: string
  artist: string
  url: string
  playcount: number
  image?: string
}

type LfmImage = { "#text": string; size: string }

export function lastfmConfig() {
  const key = process.env.LASTFM_API_KEY
  const user = process.env.LASTFM_USERNAME
  return key && user ? { key, user } : null
}

function pickImage(images?: LfmImage[]): string | undefined {
  if (!images?.length) return undefined
  const order = ["extralarge", "large", "medium", "small"]
  for (const size of order) {
    const url = images.find((i) => i.size === size)?.["#text"]
    if (url && !url.includes(PLACEHOLDER_HASH)) return url
  }
  return undefined
}

const asArray = <T,>(v: T | T[] | undefined): T[] => (v == null ? [] : Array.isArray(v) ? v : [v])

async function call<T>(
  params: Record<string, string>,
  revalidate: number | false,
): Promise<T | null> {
  const cfg = lastfmConfig()
  if (!cfg) return null
  const qs = new URLSearchParams({ ...params, api_key: cfg.key, format: "json" })
  try {
    const res = await fetch(`${API}?${qs}`, {
      ...(revalidate === false ? { cache: "no-store" as const } : { next: { revalidate } }),
      signal: AbortSignal.timeout(6000),
    })
    if (!res.ok) return null
    const json = (await res.json()) as T & { error?: number }
    if (json && typeof json === "object" && "error" in json && json.error) return null
    return json
  } catch {
    return null
  }
}

interface RecentResponse {
  recenttracks: {
    track:
      | Array<{
          name: string
          url: string
          artist: { "#text": string }
          album: { "#text": string }
          image: LfmImage[]
          date?: { uts: string }
          "@attr"?: { nowplaying?: string }
        }>
      | undefined
  }
}

export async function getRecentTracks(limit = 6): Promise<Track[] | null> {
  const cfg = lastfmConfig()
  if (!cfg) return null
  const data = await call<RecentResponse>(
    { method: "user.getrecenttracks", user: cfg.user, limit: String(limit) },
    false,
  )
  if (!data?.recenttracks) return null
  return asArray(data.recenttracks.track)
    .map((t) => ({
      name: t.name,
      artist: t.artist?.["#text"] ?? "",
      album: t.album?.["#text"] || undefined,
      image: pickImage(t.image),
      url: t.url,
      nowPlaying: t["@attr"]?.nowplaying === "true",
      playedAt: t.date ? Number(t.date.uts) : undefined,
    }))
    .slice(0, limit)
}

interface TopTracksResponse {
  toptracks: {
    track: Array<{
      name: string
      url: string
      playcount: string
      artist: { name: string }
      image: LfmImage[]
    }>
  }
}

interface TrackInfoResponse {
  track?: { album?: { image?: LfmImage[] } }
}

/** Top tracks this month, with album art looked up per track (cached 1 h). */
export async function getTopTracks(limit = 5): Promise<TopTrack[] | null> {
  const cfg = lastfmConfig()
  if (!cfg) return null
  const data = await call<TopTracksResponse>(
    { method: "user.gettoptracks", user: cfg.user, period: "1month", limit: String(limit) },
    3600,
  )
  if (!data?.toptracks) return null
  const tracks = asArray(data.toptracks.track).slice(0, limit)

  return Promise.all(
    tracks.map(async (t) => {
      let image = pickImage(t.image)
      if (!image) {
        const info = await call<TrackInfoResponse>(
          { method: "track.getInfo", artist: t.artist.name, track: t.name, autocorrect: "1" },
          3600,
        )
        image = pickImage(info?.track?.album?.image)
      }
      return {
        name: t.name,
        artist: t.artist.name,
        url: t.url,
        playcount: Number(t.playcount),
        image,
      }
    }),
  )
}
