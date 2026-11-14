"use client"

import Image from "next/image"
import { useId, useState } from "react"
import type { Project } from "@/data/types"
import { formatMonth } from "@/lib/format"
import { Icon } from "./Icon"
import { Tags } from "./Tag"
import { outlineButton } from "./ui"

function Cover({ cover }: { cover: NonNullable<Project["cover"]> }) {
  return (
    <Image
      src={cover.src}
      alt={cover.alt}
      fill
      sizes="(min-width: 1024px) 24rem, (min-width: 640px) 80vw, 92vw"
      className="object-cover"
    />
  )
}


export function ProjectEntry({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)
  const detailsId = useId()
  const { links, details } = project

  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className={`ledger-row group grid gap-x-6 gap-y-5 py-10 sm:grid-cols-[9.5rem_1fr] lg:py-12 ${project.cover ? "lg:grid-cols-[9.5rem_1fr_22rem]" : ""}`}
    >
      <p className="mono hidden text-muted transition-colors duration-300 group-hover:text-accent sm:block sm:pt-2">
        <time dateTime={project.date}>{formatMonth(project.date)}</time>
        <span className="block">{project.kind}</span>
      </p>

      {project.cover && (
        <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] transition-[translate] duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 sm:col-start-2 lg:col-start-3 lg:row-start-1">
          <Cover cover={project.cover} />
        </div>
      )}

      <div className="min-w-0 sm:col-start-2 lg:row-start-1">
        <h2 id={`${project.slug}-title`} className="title">
          {project.title}
        </h2>
        <p className="mono mt-1.5 text-muted sm:hidden">
          {formatMonth(project.date)} · {project.kind}
        </p>
        <p className="mt-3 max-w-[34rem]">{project.oneLiner}</p>
        <Tags items={project.stack} className="mt-5" />

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {links.github && (
            <a href={links.github} target="_blank" rel="noreferrer" className={outlineButton}>
              <Icon name="github" size={15} />
              GitHub
            </a>
          )}
          {links.demo && (
            <a href={links.demo} target="_blank" rel="noreferrer" className={outlineButton}>
              <Icon name="arrowUpRight" size={15} />
              {links.demoLabel ?? "Demo"}
            </a>
          )}
          {details && (
            <button
              type="button"
              aria-expanded={open}
              aria-controls={detailsId}
              onClick={() => setOpen((v) => !v)}
              className="mono inline-flex items-center gap-1 py-1.5 text-[0.8125rem] text-muted transition-colors not-first:ml-2 hover:text-accent"
            >
              {open ? "Show less" : "Show more"}
              <Icon
                name="chevronDown"
                size={15}
                className={`transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>
      </div>

      {details && (
        <div id={detailsId} className={`unfold sm:col-start-2 ${project.cover ? "lg:col-[2/4]" : ""}`} data-open={open} inert={!open}>
          <div>
            <div className="grid gap-x-12 gap-y-8 pt-4 lg:grid-cols-2">
              <section>
                <h3 className="text-[1rem] tracking-[-0.01em]">The Project</h3>
                <p className="mt-2">{details.project}</p>
                <h3 className="mt-8 text-[1rem] tracking-[-0.01em]">Thoughts</h3>
                <p className="mt-2">{details.thoughts}</p>
              </section>
              <section>
                <h3 className="text-[1rem] tracking-[-0.01em]">Technical Overview</h3>
                <ul className="mt-2 space-y-3">
                  {details.technical.map((point) => (
                    <li key={point} className="grid grid-cols-[1rem_1fr]">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-2.5 bg-rule-strong" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
