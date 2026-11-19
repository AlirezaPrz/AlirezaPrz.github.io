import type { Metadata } from "next"
import { JumpTiles } from "@/components/life/JumpTiles"
import { Lifting, totalLb } from "@/components/life/Lifting"
import { Movies } from "@/components/life/Movies"
import { NowPlaying } from "@/components/life/NowPlaying"
import { RecommendForm } from "@/components/life/RecommendForm"
import { TopTracks } from "@/components/life/TopTracks"
import { music } from "@/data/music"
import { site } from "@/data/site"
import { getTopTracks } from "@/lib/lastfm"
import { favorites } from "@/data/favorites"
import { getDiary, recentFiveStars } from "@/lib/letterboxd"

export const metadata: Metadata = {
  title: "Life Outside",
  description: "What Alireza watches, listens to, and lifts when he isn't coding.",
  alternates: { canonical: "/life" },
}

// Letterboxd and top tracks are rebuilt at most once an hour (ISR)
export const revalidate = 3600

function SectionHead({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div className="max-w-[40rem]">
      <h2 id={`${id}-title`} className="title">
        {title}
      </h2>
      <p className="mt-3">{children}</p>
    </div>
  )
}

export default async function LifePage() {
  const [diary, topTracks] = await Promise.all([getDiary(), getTopTracks(10)])
  const films = diary?.slice(0, 6) ?? null
  // synced from the diary; skips films already in the hand-picked favourites
  const fiveStars = diary ? recentFiveStars(diary, favorites.map((f) => f.title)) : []

  return (
    <>
      <header className="pt-12 sm:pt-16 md:pt-24">
        <h1 className="display" data-rise style={{ "--i": 0 } as React.CSSProperties}>
          Life Outside
        </h1>
        <p className="mt-6 max-w-[36rem]" data-rise style={{ "--i": 1 } as React.CSSProperties}>
          Turns out I&apos;m a person too. When I&apos;m not writing code I&apos;m watching movies, listening to
          way too much music, or lifting. Sometimes all three, badly.
        </p>
      </header>

      <JumpTiles films={films} topTracks={topTracks} totalLb={totalLb} />

      <section id="movies" aria-labelledby="movies-title" className="mt-28 scroll-mt-8 md:mt-36">
        <SectionHead id="movies" title="Movies">
          I log everything on{" "}
          <a href={site.links.letterboxd} target="_blank" rel="noreferrer" className="link">
            Letterboxd
          </a>
          , which is mostly a way to keep a record of my questionable star ratings. This updates on its own.
        </SectionHead>
        <Movies films={films} fiveStars={fiveStars} />
      </section>

      <section id="music" aria-labelledby="music-title" className="mt-28 scroll-mt-8 md:mt-36">
        <SectionHead id="music" title="Music">
          Spotify scrobbles everything to{" "}
          <a href={site.links.lastfm} target="_blank" rel="noreferrer" className="link">
            Last.fm
          </a>
          , so this is live. If the dot is pulsing, that&apos;s what&apos;s in my headphones right now.
        </SectionHead>

        <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-[1.125rem] tracking-[-0.015em]">Now Playing</h3>
            <div className="mt-6">
              <NowPlaying />
            </div>
          </div>
          <div>
            <h3 className="text-[1.125rem] tracking-[-0.015em]">On repeat this month</h3>
            <div className="mt-6">
              <TopTracks tracks={topTracks?.slice(0, 5) ?? null} />
            </div>
          </div>
        </div>

        {music.spotifyPlaylistId && (
          <div className="mt-16">
            <h3 className="text-[1.125rem] tracking-[-0.015em]">A playlist</h3>
            <p className="mt-1 text-muted">{music.playlistBlurb}</p>
            <iframe
              title="Alireza's Spotify playlist"
              src={`https://open.spotify.com/embed/playlist/${music.spotifyPlaylistId}?utm_source=generator&theme=0`}
              width="100%"
              height="352"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="mt-6 rounded-xl border-0"
            />
          </div>
        )}
      </section>

      <section id="lifting" aria-labelledby="lifting-title" className="mt-28 scroll-mt-8 md:mt-36">
        <SectionHead id="lifting" title="Lifting">
          I do a mix of powerlifting and bodybuilding, which means I care about both how much I lift and how it
          looks. The gym is the one place where progress is an actual number, which my inner engineer finds deeply
          comforting.
        </SectionHead>
        <Lifting />
      </section>

      <section
        id="recommend"
        aria-labelledby="recommend-title"
        className="mt-28 scroll-mt-8 border-t border-rule pt-16 md:mt-36 md:pt-20"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_40rem] lg:gap-16">
          <div>
            <h2 id="recommend-title" className="title">
              Tell me what to watch
              <span className="block text-muted">or listen to.</span>
            </h2>
            <p className="mt-4 max-w-[26rem]">
              I&apos;ll actually read it. If it ends up on my Letterboxd with a low rating, that&apos;s between you
              and the movie.
            </p>
          </div>
          <RecommendForm />
        </div>
      </section>
    </>
  )
}
