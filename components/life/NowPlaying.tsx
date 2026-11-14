"use client"

import Image from "next/image"
import { site } from "@/data/site"
import { timeAgo } from "@/lib/format"
import { Icon } from "../Icon"
import { useNowPlaying } from "../useNowPlaying"

function Art({ src, alt, size }: { src?: string; alt: string; size: number }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-md bg-surface"
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={`${size}px`} className="object-cover" />
      ) : (
        <div className="grid h-full place-items-center text-muted">
          <Icon name="headphones" size={Math.round(size / 3)} />
        </div>
      )}
    </div>
  )
}

/** Live "now playing" plus the last few scrobbles. Polls every 30 s. */
export function NowPlaying() {
  const state = useNowPlaying()

  if (state.status === "unconfigured" || state.status === "error") {
    return (
      <p className="ledger-row grid grid-cols-[5.5rem_1fr] gap-x-4 border-b border-b-rule py-4">
        <span className="mono pt-[3px] text-muted">Today</span>
        <span>
          {state.status === "unconfigured"
            ? "The live feed is taking the day off."
            : "Last.fm isn't answering right now."}{" "}
          <a href={site.links.lastfm} target="_blank" rel="noreferrer" className="link">
            My full listening history
          </a>{" "}
          is still on Last.fm.
        </span>
      </p>
    )
  }

  if (state.status === "loading") {
    return (
      <div aria-busy="true" className="flex items-center gap-5">
        <div className="size-24 animate-pulse rounded-md bg-surface" />
        <div className="flex-1 space-y-3">
          <div className="h-3 w-24 animate-pulse rounded-sm bg-surface" />
          <div className="h-5 w-48 max-w-full animate-pulse rounded-sm bg-surface" />
          <div className="h-4 w-32 animate-pulse rounded-sm bg-surface" />
        </div>
        <span className="sr-only">Loading what I&apos;m listening to</span>
      </div>
    )
  }

  const [current, ...recent] = state.tracks
  if (!current) {
    return <p className="text-muted">Nothing scrobbled yet. Suspiciously quiet.</p>
  }

  return (
    <div>
      <div className="flex items-center gap-5" aria-live="polite">
        <Art src={current.image} alt={current.album ? `Cover of ${current.album}` : ""} size={96} />
        <div className="min-w-0">
          <p className="mono flex items-center gap-2 text-muted">
            {current.nowPlaying ? (
              <>
                <span className="live-dot" aria-hidden="true" />
                <span className="text-accent">Playing right now</span>
              </>
            ) : (
              <>Last played {current.playedAt ? timeAgo(current.playedAt) : ""}</>
            )}
          </p>
          <a
            href={current.url}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block truncate text-[1.125rem] leading-tight font-extrabold tracking-[-0.02em] text-ink transition-colors hover:text-accent"
          >
            {current.name}
          </a>
          <p className="truncate text-muted">{current.artist}</p>
        </div>
      </div>

      {recent.length > 0 && (
        <ol className="mt-8 border-b border-rule">
          {recent.slice(0, 5).map((t) => (
            <li
              key={`${t.name}-${t.playedAt}`}
              className="ledger-row group grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-2.5"
            >
              <Art src={t.image} alt="" size={40} />
              <a href={t.url} target="_blank" rel="noreferrer" className="min-w-0">
                <span className="block truncate leading-snug font-medium text-ink transition-colors group-hover:text-accent">
                  {t.name}
                </span>
                <span className="block truncate text-[0.9375rem] text-muted">{t.artist}</span>
              </a>
              <span className="mono text-muted">{t.playedAt ? timeAgo(t.playedAt) : ""}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
