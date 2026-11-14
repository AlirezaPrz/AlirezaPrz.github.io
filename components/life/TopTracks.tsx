import Image from "next/image"
import type { TopTrack } from "@/lib/lastfm"
import { Icon } from "../Icon"

export function TopTracks({ tracks }: { tracks: TopTrack[] | null }) {
  if (!tracks || tracks.length === 0) {
    return (
      <p className="ledger-row grid grid-cols-[5.5rem_1fr] gap-x-4 border-b border-b-rule py-4">
        <span className="mono pt-[3px] text-muted">This month</span>
        <span>
          {tracks
            ? "Not enough scrobbles to rank anything yet. Busy month."
            : "Nothing ranked yet. The charts come back when the live feed does."}
        </span>
      </p>
    )
  }

  return (
    <ol className="border-b border-rule">
      {tracks.map((t, i) => (
        <li
          key={t.url}
          className="ledger-row group grid grid-cols-[1.25rem_3rem_1fr_auto] items-center gap-x-4 py-3"
        >
          <span className="mono text-muted transition-colors group-hover:text-accent">{i + 1}</span>
          <div className="relative size-12 overflow-hidden rounded-md bg-surface">
            {t.image ? (
              <Image src={t.image} alt="" fill sizes="48px" className="object-cover" />
            ) : (
              <div className="grid h-full place-items-center text-muted">
                <Icon name="headphones" size={16} />
              </div>
            )}
          </div>
          <a href={t.url} target="_blank" rel="noreferrer" className="min-w-0">
            <span className="block truncate leading-snug font-medium text-ink transition-colors group-hover:text-accent">
              {t.name}
            </span>
            <span className="block truncate text-[0.9375rem] text-muted">{t.artist}</span>
          </a>
          <span className="mono text-muted">
            {t.playcount}
            <span className="sr-only"> plays</span>
            <span aria-hidden="true">×</span>
          </span>
        </li>
      ))}
    </ol>
  )
}
