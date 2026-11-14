import type { Metadata } from "next"
import { Icon } from "@/components/Icon"
import { ProjectEntry } from "@/components/ProjectEntry"
import { Tags } from "@/components/Tag"
import { projects } from "@/data/projects"
import { site } from "@/data/site"
import { formatMonth } from "@/lib/format"

export const metadata: Metadata = {
  title: "Projects",
  description: "Things Alireza Pourreza has built: offline AI, automata tools, game bots, and backend systems.",
  alternates: { canonical: "/projects" },
}

export default function ProjectsPage() {
  // Newest first, whatever order the data file is in
  const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date))
  const featured = sorted.filter((p) => p.featured)
  const rest = sorted.filter((p) => !p.featured)

  return (
    <>
      <header className="pt-12 sm:pt-16 md:pt-24">
        <h1 className="display" data-rise style={{ "--i": 0 } as React.CSSProperties}>
          Projects
        </h1>
        <p className="mt-6 max-w-[36rem]" data-rise style={{ "--i": 1 } as React.CSSProperties}>
          Things I&apos;ve built, mostly to find out whether I could. Hit{" "}
          <span className="mono text-ink">Show more</span> for the long version: what it is, how it works, and what
          I&apos;d tell past me.
        </p>
      </header>

      <div className="mt-14 border-b border-rule md:mt-20">
        {featured.map((p) => (
          <ProjectEntry key={p.slug} project={p} />
        ))}
      </div>

      {rest.length > 0 && (
        <section aria-labelledby="also-built" className="mt-28">
          <h2 id="also-built" className="title">
            Also built
          </h2>
          <p className="mt-3 text-muted">Smaller things, coursework, and weekend experiments.</p>

          <ul className="mt-10 border-b border-rule">
            {rest.map((p) => {
              const href = p.links.github ?? p.links.demo
              return (
                <li
                  key={p.slug}
                  className="ledger-row group relative grid gap-x-6 gap-y-2 py-5 sm:grid-cols-[9.5rem_1fr] lg:grid-cols-[9.5rem_1fr_auto]"
                >
                  <p className="mono text-muted transition-colors duration-300 group-hover:text-accent sm:pt-[3px]">
                    <time dateTime={p.date}>{formatMonth(p.date)}</time>
                    <span className="text-rule-strong sm:hidden"> · </span>
                    <span className="sm:block">{p.kind}</span>
                  </p>
                  <div className="min-w-0">
                    <h3 className="text-[1.0625rem] tracking-[-0.015em]">
                      {href ? (
                        // The whole row is this one link (its ::after covers the row)
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="transition-colors duration-300 group-hover:text-accent after:absolute after:inset-0 after:content-['']"
                        >
                          {p.title}
                          <span className="sr-only"> (opens on GitHub)</span>
                        </a>
                      ) : (
                        p.title
                      )}
                    </h3>
                    <p className="mt-1 text-muted">{p.oneLiner}</p>
                    <Tags items={p.stack} className="mt-3" />
                  </div>
                  {href && (
                    <span
                      aria-hidden="true"
                      className="mono mt-2 inline-flex w-fit items-center gap-1.5 self-start rounded-full border border-rule-strong px-3.5 py-1.5 text-ink transition-[translate,border-color,color] duration-300 group-hover:-translate-y-0.5 group-hover:border-accent group-hover:text-accent sm:col-start-2 lg:col-start-3 lg:row-start-1 lg:mt-0"
                    >
                      <Icon name="github" size={15} />
                      GitHub
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      )}

      <p className="mt-16 text-muted">
        Everything else lives on{" "}
        <a href={site.links.github} target="_blank" rel="noreferrer" className="link">
          my GitHub
        </a>
        , including a few repos I&apos;m not ready to talk about.
      </p>
    </>
  )
}
