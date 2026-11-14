import Image from "next/image"
import type { Experience } from "@/data/types"
import { formatRange } from "@/lib/format"

function Mark({ item }: { item: Experience }) {
  if (item.logo) {
    return (
      <Image
        src={item.logo.src}
        alt={item.logo.alt}
        width={40}
        height={40}
        className="size-10 rounded-md border border-rule bg-bg object-contain p-1"
      />
    )
  }
  const letters =
    item.monogram ??
    item.company
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 3)
  return (
    <span
      aria-hidden="true"
      className="mono grid size-10 place-items-center rounded-md border border-rule text-[0.75rem] font-medium text-ink transition-colors duration-300 group-hover:border-accent group-hover:text-accent"
    >
      {letters}
    </span>
  )
}

export function ExperienceLedger({ items }: { items: Experience[] }) {
  return (
    <ol className="border-b border-rule">
      {items.map((item) => (
        <li
          key={`${item.company}-${item.start}`}
          className="ledger-row group grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-2 py-6 sm:grid-cols-[9.5rem_2.5rem_1fr] sm:gap-x-6 sm:py-7"
        >
          <p className="mono col-span-2 text-muted transition-colors duration-300 group-hover:text-accent sm:col-span-1 sm:pt-[3px]">
            <time dateTime={item.start}>{formatRange(item.start, item.end)}</time>
          </p>
          <Mark item={item} />
          <div className="min-w-0">
            <h3 className="text-[1.0625rem] leading-snug tracking-[-0.015em] sm:text-[1.125rem]">
              {item.role}
            </h3>
            <p className="text-muted">
              {item.url ? (
                <a href={item.url} target="_blank" rel="noreferrer" className="link-quiet">
                  {item.company}
                </a>
              ) : (
                item.company
              )}
            </p>
            <p className="mt-2 max-w-[38rem]">{item.summary}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
