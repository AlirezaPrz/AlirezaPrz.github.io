import { NextResponse } from "next/server"
import { getRecentTracks, lastfmConfig } from "@/lib/lastfm"

export const dynamic = "force-dynamic"

export type NowPlayingPayload =
  | { status: "ok"; tracks: Awaited<ReturnType<typeof getRecentTracks>> & {} }
  | { status: "unconfigured" }
  | { status: "error" }

export async function GET() {
  if (!lastfmConfig()) {
    return NextResponse.json<NowPlayingPayload>({ status: "unconfigured" })
  }
  const tracks = await getRecentTracks(6)
  if (!tracks) {
    return NextResponse.json<NowPlayingPayload>({ status: "error" }, { status: 502 })
  }
  return NextResponse.json<NowPlayingPayload>(
    { status: "ok", tracks },
    // Let Vercel's edge cache absorb bursts; clients poll every 30 s anyway
    { headers: { "Cache-Control": "public, s-maxage=15, stale-while-revalidate=15" } },
  )
}
