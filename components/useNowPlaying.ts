"use client"

import { useEffect, useState } from "react"
import type { NowPlayingPayload } from "@/app/api/lastfm/now-playing/route"

type NowPlayingState = { status: "loading" } | NowPlayingPayload

const POLL_MS = 30_000

/** Polls the Last.fm route every 30 s, and pauses while the tab is hidden. */
export function useNowPlaying(): NowPlayingState {
  const [state, setState] = useState<NowPlayingState>({ status: "loading" })

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    let cancelled = false

    async function tick() {
      try {
        const res = await fetch("/api/lastfm/now-playing", { cache: "no-store" })
        const data = (await res.json()) as NowPlayingPayload
        if (!cancelled) setState(data)
      } catch {
        if (!cancelled) setState((s) => (s.status === "ok" ? s : { status: "error" }))
      }
      if (!cancelled && document.visibilityState === "visible") {
        timer = setTimeout(tick, POLL_MS)
      }
    }

    function onVisibility() {
      if (document.visibilityState === "visible") {
        clearTimeout(timer)
        tick()
      } else {
        clearTimeout(timer)
      }
    }

    tick()
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      cancelled = true
      clearTimeout(timer)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return state
}
