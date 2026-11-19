import type { Metadata } from "next"
import Link from "next/link"
import { ExperienceLedger } from "@/components/ExperienceLedger"
import { Icon } from "@/components/Icon"
import { NowPlayingLine } from "@/components/NowPlayingLine"
import { Portrait } from "@/components/Portrait"
import { experience } from "@/data/experience"
import { site } from "@/data/site"
import { primaryButton } from "@/components/ui"

export const metadata: Metadata = {
  // UofT Webring ownership check: rendered as <meta name="uoft-webring" content="…"> in this page's <head>
  other: { "uoft-webring": "cqxWBpVGfc-WIWRDseahEp2G5iCyui0KPgBxhdyzdok" },
}

export default function AboutPage() {
  return (
    <>
      <section className="grid items-start gap-14 pt-12 sm:pt-16 md:grid-cols-12 md:gap-10 md:pt-24">
        <div className="md:col-span-7">
          <h1 className="display" data-rise style={{ "--i": 0 } as React.CSSProperties}>
            Hi, I&apos;m {site.firstName}!
          </h1>

          <div className="mt-8 max-w-[36rem] space-y-5" data-rise style={{ "--i": 1 } as React.CSSProperties}>
            <p>
              I&apos;m a {site.year} Computer Science student at the{" "}
              <a href="https://www.utoronto.ca/" target="_blank" rel="noreferrer" className="link">
                {site.school}
              </a>
              , doing an {site.program}. I graduate in {site.graduation}, assuming the theory courses
              let me.
            </p>
            <p>
              When I&apos;m away from a keyboard, I&apos;m probably{" "}
              <Link href="/life#movies" className="link">
                watching movies
              </Link>
              ,{" "}
              <Link href="/life#music" className="link">
                looping the same album
              </Link>{" "}
              for a week, or{" "}
              <Link href="/life#lifting" className="link">
                lifting
              </Link>{" "}
              heavy things and putting them back down.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3" data-rise style={{ "--i": 2 } as React.CSSProperties}>
            <a
              href={site.links.resume}
              target="_blank"
              rel="noreferrer"
              className={primaryButton}
            >
              <Icon name="download" size={16} />
              Download my resume
            </a>
            <a href={`mailto:${site.links.email}`} className="link-quiet inline-flex items-center gap-1.5 text-muted">
              <Icon name="mail" size={16} />
              or say hi by email
            </a>
          </div>

          <NowPlayingLine />
        </div>

        <div className="md:col-span-5 md:pt-2" data-rise style={{ "--i": 2 } as React.CSSProperties}>
          <Portrait />
        </div>
      </section>

      <section aria-labelledby="past-and-present" className="mt-28 md:mt-32">
        <div className="mb-10">
          <h2 id="past-and-present" className="title">
            Past and Present
          </h2>
          <p className="mt-3 text-muted">Where my weekdays have gone, newest first.</p>
        </div>
        <ExperienceLedger items={experience} />

        <div className="mt-12 sm:ml-[calc(9.5rem+1.5rem)]">
          <Link
            href="/projects"
            className={`group/next ${primaryButton}`}
          >
            See what I&apos;ve built
            <Icon
              name="arrowRight"
              size={16}
              className="transition-transform duration-300 group-hover/next:translate-x-0.5"
            />
          </Link>
        </div>
      </section>
    </>
  )
}
