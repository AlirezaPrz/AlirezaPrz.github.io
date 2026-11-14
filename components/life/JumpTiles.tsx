import Image from "next/image"
import { lifts } from "@/data/lifting"
import type { TopTrack } from "@/lib/lastfm"
import type { WatchedFilm } from "@/lib/letterboxd"
import { kg, lbToKg, stars } from "@/lib/format"
import { Icon, type IconName } from "../Icon"

type Tile = {
  href: string
  label: string
  line: React.ReactNode
  fallbackIcon: IconName
  media: React.ReactNode | null
}

type Card = { key: string; content: React.ReactNode; className?: string }

/** Positions for 3, 2 or 1 cards; each spreads a little further on hover. */
const layouts: Record<number, string[]> = {
  // posters are narrow, so they can sit further apart
  3: [
    "-rotate-6 -translate-x-[62%] group-hover:-translate-x-[78%] group-hover:-rotate-[9deg]",
    "z-10 group-hover:-translate-y-1",
    "rotate-6 translate-x-[62%] group-hover:translate-x-[78%] group-hover:rotate-[9deg]",
  ],
  2: [
    "-rotate-[5deg] -translate-x-[34%] group-hover:-translate-x-[46%] group-hover:-rotate-[8deg]",
    "z-10 rotate-[5deg] translate-x-[34%] group-hover:translate-x-[46%] group-hover:rotate-[8deg]",
  ],
  1: ["group-hover:-translate-y-1 group-hover:rotate-[-2deg]"],
}

/**
 * Three slightly fanned cards, the first one in the middle. Posters, album
 * covers and lift cards all use the same fan so the tiles read as one set.
 */
// squares are wider, so they overlap more to stay inside the tile
const squareThree = [
  "-rotate-6 -translate-x-[68%] group-hover:-translate-x-[80%] group-hover:-rotate-[8deg]",
  "z-10 group-hover:-translate-y-1",
  "rotate-6 translate-x-[68%] group-hover:translate-x-[80%] group-hover:rotate-[8deg]",
]

function Fan({ cards, shape }: { cards: Card[]; shape: "poster" | "square" }) {
  const box = shape === "poster" ? "aspect-[2/3] w-[30%]" : "aspect-square w-[36%]"
  const ordered = cards.length >= 3 ? [cards[1], cards[0], cards[2]] : cards
  const place =
    shape === "square" && ordered.length >= 3 ? squareThree : (layouts[Math.min(ordered.length, 3)] ?? [])
  return (
    <div className="relative flex h-full items-center justify-center">
      {ordered.slice(0, 3).map((card, i) => (
        <div
          key={card.key}
          className={`absolute overflow-hidden rounded-md outline-[3px] outline-surface outline-solid transition-[translate,rotate,background-color,color] duration-700 ease-[var(--ease-out-expo)] ${box} ${place[i] ?? ""} ${card.className ?? ""}`}
        >
          {card.content}
        </div>
      ))}
    </div>
  )
}

const picture = (src: string): React.ReactNode => (
  <Image src={src} alt="" fill sizes="(min-width: 640px) 9rem, 5rem" className="object-cover" />
)

/** A lift as a cover: the name up top, the kilograms set large at the bottom.
 *  The right-hand card aligns right so its text isn't hidden behind the middle one. */
function LiftCard({ name, lb, align = "start" }: { name: string; lb: number; align?: "start" | "end" }) {
  return (
    <div className={`flex h-full flex-col justify-between p-[9%] ${align === "end" ? "items-end text-right" : ""}`}>
      <span className="font-mono text-[clamp(0.6875rem,4.2cqi,0.8125rem)] leading-none opacity-70">{name}</span>
      <span className="flex items-baseline gap-0.5 leading-none">
        <span className="text-[clamp(0.875rem,7.2cqi,1.5rem)] font-extrabold tracking-[-0.04em] tabular-nums">
          {Math.round(lbToKg(lb))}
        </span>
        <span className="font-mono text-[clamp(0.625rem,3.8cqi,0.8125rem)] opacity-70">kg</span>
      </span>
    </div>
  )
}

export function JumpTiles({
  films,
  topTracks,
  totalLb,
}: {
  films: WatchedFilm[] | null
  topTracks: TopTrack[] | null
  totalLb: number
}) {
  const posters = (films ?? []).filter((f) => f.poster).slice(0, 3)
  const covers = (topTracks ?? []).filter((t) => t.image).slice(0, 3)
  const lastFilm = films?.[0]
  const top = topTracks?.[0]

  // Heaviest lift in the middle of the fan; it takes the accent on hover
  const byWeight = [...lifts].sort((a, b) => b.lb - a.lb)
  const liftCards: Card[] = byWeight.map((l, i) => ({
    key: l.name,
    // order in, order out: [heaviest, 2nd, 3rd] → middle, left, right
    content: <LiftCard name={l.name} lb={l.lb} align={i === 2 ? "end" : "start"} />,
    className: i === 0 ? "bg-ink text-bg group-hover:bg-accent group-hover:text-accent-ink" : "bg-ink text-bg",
  }))

  const tiles: Tile[] = [
    {
      href: "#movies",
      label: "Movies",
      line: lastFilm
        ? `Last: ${lastFilm.title}${lastFilm.rating ? ` ${stars(lastFilm.rating)}` : ""}`
        : "What I've been watching",
      fallbackIcon: "film",
      media: posters.length ? (
        <Fan shape="poster" cards={posters.map((f) => ({ key: f.id, content: picture(f.poster!) }))} />
      ) : null,
    },
    {
      href: "#music",
      label: "Music",
      line: top ? `On repeat: “${top.name}” by ${top.artist}` : "What's in my ears",
      fallbackIcon: "headphones",
      media: covers.length ? (
        <Fan shape="square" cards={covers.map((t) => ({ key: t.url, content: picture(t.image!) }))} />
      ) : null,
    },
    {
      href: "#lifting",
      label: "Lifting",
      // the phone square already shows the total, so the line doesn't repeat it there
      line: (
        <>
          <span className="sm:hidden">Squat, bench, and deadlift, added up</span>
          <span className="hidden sm:inline">{kg(totalLb)} kg total across the big three</span>
        </>
      ),
      fallbackIcon: "barbell",
      media: (
        <>
          {/* Phones: the tile is a small square, so it carries the total instead */}
          <div className="flex h-full items-end p-2.5 sm:hidden">
            <span className="text-[1.375rem] leading-none font-extrabold tracking-[-0.05em] text-ink tabular-nums">
              {kg(totalLb)}
            </span>
          </div>
          {/* card text is sized from the tile's own width (cqi), so it fits at every breakpoint */}
          <div className="@container hidden h-full sm:block">
            <Fan shape="square" cards={liftCards} />
          </div>
        </>
      ),
    },
  ]

  return (
    <nav
      aria-label="Jump to section"
      className="mt-12 md:mt-16"
      data-rise
      style={{ "--i": 2 } as React.CSSProperties}
    >
      <p className="mono text-muted">Jump to:</p>
      <ul className="mt-3 grid gap-4 sm:grid-cols-3 sm:gap-5">
        {tiles.map((t) => (
          <li key={t.href}>
            <a href={t.href} className="group grid grid-cols-[5.5rem_1fr_auto] items-center gap-x-4 sm:block">
              <div
                aria-hidden="true"
                className="relative aspect-square overflow-hidden rounded-[10px] bg-surface transition-[translate] duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 sm:aspect-[4/3]"
              >
                {t.media ?? (
                  <div className="grid h-full place-items-center text-muted">
                    <Icon name={t.fallbackIcon} size={32} />
                  </div>
                )}
              </div>
              <span className="min-w-0 sm:mt-4 sm:block">
                <span className="flex items-center justify-between gap-3 text-[1.125rem] font-extrabold tracking-[-0.02em] text-ink sm:text-[1.5rem]">
                  {t.label}
                  <Icon
                    name="arrowUp"
                    size={18}
                    className="hidden rotate-180 text-muted transition-[translate,color] duration-500 group-hover:translate-y-0.5 group-hover:text-accent sm:block"
                  />
                </span>
                <span className="mono mt-0.5 block truncate text-muted sm:mt-1">{t.line}</span>
              </span>
              <Icon name="arrowUp" size={18} className="rotate-180 text-muted sm:hidden" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
