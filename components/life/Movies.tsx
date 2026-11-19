import { favorites } from "@/data/favorites"
import { site } from "@/data/site"
import type { WatchedFilm } from "@/lib/letterboxd"
import { formatDay, stars } from "@/lib/format"
import { Poster } from "./Poster"

function Rating({ value }: { value?: number }) {
  if (!value) return <span className="text-muted">unrated</span>
  return (
    <span className="tracking-[0.06em] text-ink" aria-label={`Rated ${value} out of 5`}>
      {stars(value)}
    </span>
  )
}

type PosterItem = { key: string; title: string; year?: number; poster?: string; url?: string }

/** A row of posters with title and year underneath (titles hide on phones). */
function PosterRow({ films, className }: { films: PosterItem[]; className: string }) {
  return (
    <ul className={`mt-6 grid gap-3 sm:gap-4 ${className}`}>
      {films.map((f) => {
        const body = (
          <>
            <Poster src={f.poster} title={f.title} sizes="(min-width: 768px) 10rem, 30vw" />
            <p className="mt-2.5 hidden leading-snug font-medium text-ink transition-colors group-hover:text-accent sm:block">
              {f.title}
              {f.year && <span className="mono ml-1.5 font-normal text-muted">{f.year}</span>}
            </p>
          </>
        )
        return (
          <li key={f.key}>
            {f.url ? (
              <a href={f.url} target="_blank" rel="noreferrer" className="group block" aria-label={f.title}>
                {body}
              </a>
            ) : (
              <div className="group">{body}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function Movies({ films, fiveStars }: { films: WatchedFilm[] | null; fiveStars: WatchedFilm[] }) {
  return (
    <>
      <div className="mt-12">
        <h3 className="text-[1.125rem] tracking-[-0.015em]">Recently Watched</h3>
        {films && films.length > 0 ? (
          // A diary: watched-date gutter, poster, entry, hairline. Two columns on wide screens.
          <ol className="mt-6 grid gap-x-12 lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-3">
            {films.map((f) => (
              <li
                key={f.id}
                className="ledger-row group grid grid-cols-[4.5rem_3.5rem_1fr] items-center gap-x-4 py-4 last:border-b last:border-b-rule sm:grid-cols-[5.5rem_4rem_1fr] lg:[&:nth-child(3)]:border-b lg:[&:nth-child(3)]:border-b-rule"
              >
                <p className="mono self-start pt-1 text-muted transition-colors duration-300 group-hover:text-accent">
                  {f.watchedDate ? <time dateTime={f.watchedDate}>{formatDay(f.watchedDate)}</time> : "—"}
                  {f.rewatch && <span className="block">rewatch</span>}
                </p>
                <a href={f.url} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
                  <Poster src={f.poster} title={f.title} sizes="64px" />
                </a>
                <div className="min-w-0">
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noreferrer"
                    className="line-clamp-2 leading-snug font-medium text-ink transition-colors group-hover:text-accent"
                  >
                    {f.title}
                    {f.year && <span className="mono ml-1.5 font-normal text-muted">{f.year}</span>}
                  </a>
                  <p className="mono mt-1">
                    <Rating value={f.rating} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="ledger-row mt-6 grid grid-cols-[4.5rem_1fr] gap-x-4 border-b border-b-rule py-4 sm:grid-cols-[5.5rem_1fr]">
            <span className="mono pt-[3px] text-muted">Today</span>
            <span>
              Letterboxd isn&apos;t answering right now.{" "}
              <a href={site.links.letterboxd} target="_blank" rel="noreferrer" className="link">
                See my diary there
              </a>
              .
            </span>
          </p>
        )}
      </div>

      <div className="mt-16">
        <h3 className="text-[1.125rem] tracking-[-0.015em]">Favourites</h3>
        <p className="mt-1 text-muted">The four I&apos;d defend in an argument.</p>
        <PosterRow
          className="max-w-[44rem] grid-cols-4"
          films={favorites.map((f) => ({ key: f.title, title: f.title, year: f.year, poster: f.poster, url: f.url }))}
        />
      </div>

      {fiveStars.length > 0 && (
        <div className="mt-16">
          <h3 className="text-[1.125rem] tracking-[-0.015em]">Recent five-star films</h3>
          <p className="mt-1 text-muted">Synced from my Letterboxd diary, so this one keeps itself up to date.</p>
          <PosterRow
            className="grid-cols-3 sm:grid-cols-6"
            films={fiveStars.map((f) => ({ key: f.id, title: f.title, year: f.year, poster: f.poster, url: f.url }))}
          />
        </div>
      )}
    </>
  )
}
