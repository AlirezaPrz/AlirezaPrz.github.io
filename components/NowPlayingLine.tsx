"use client"

import Link from "next/link"
import { timeAgo } from "@/lib/format"
import { useNowPlaying } from "./useNowPlaying"

/**
 * One ledger line under the intro: today's entry, written live from Last.fm.
 * It disappears entirely if Last.fm isn't set up or isn't answering.
 */
export function NowPlayingLine() {
  const state = useNowPlaying()

  if (state.status === "unconfigured" || state.status === "error") return null

  const track = state.status === "ok" ? state.tracks[0] : undefined
  if (state.status === "ok" && !track) return null

  return (
    <div
      className="ledger-row mt-10 grid max-w-[36rem] grid-cols-[6.5rem_1fr] gap-x-4 pt-4 sm:grid-cols-[7.5rem_1fr]"
      aria-live="polite"
    >
      <p className="mono flex items-center gap-2 pt-[3px] text-muted">
        {track?.nowPlaying ? (
          <>
            <span className="live-dot" aria-hidden="true" />
            <span className="text-accent">Right now</span>
          </>
        ) : (
          <span>{track?.playedAt ? timeAgo(track.playedAt) : "Today"}</span>
        )}
      </p>
      {state.status === "loading" ? (
        <p className="text-muted">
          <span className="inline-block h-[0.9em] w-56 max-w-full animate-pulse rounded-sm bg-surface align-middle" />
          <span className="sr-only">Checking what I&apos;m listening to</span>
        </p>
      ) : (
        <p className="min-w-0">
          {track!.nowPlaying ? "Listening to " : "Last listened to "}
          <a href={track!.url} target="_blank" rel="noreferrer" className="link">
            {track!.name}
          </a>{" "}
          by <span className="font-medium text-ink">{track!.artist}</span>.{" "}
          <Link href="/life#music" className="mono whitespace-nowrap text-muted transition-colors hover:text-accent">
            more music
          </Link>
        </p>
      )}
    </div>
  )
}
