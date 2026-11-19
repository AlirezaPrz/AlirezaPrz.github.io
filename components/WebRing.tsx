"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { Icon } from "./Icon"

const RING = "https://uoftwebring.com"
const MEMBER_ID = 57

const arrowClass =
  "grid size-8 place-items-center rounded-full text-muted transition-[color,background-color,translate] duration-300 hover:bg-surface hover:text-accent"

/** UofT Webring: previous site, the ring's logo, next site. Shown on the About page only. */
export function WebRing() {
  const pathname = usePathname()
  if (pathname !== "/") return null

  return (
    <nav aria-label="UofT Webring" className="-ml-2 flex items-center gap-1 sm:ml-0">
      <a
        href={`${RING}/redirect?nav=prev&id=${MEMBER_ID}`}
        aria-label="Previous site in UofT Webring"
        className={`${arrowClass} hover:-translate-x-0.5`}
      >
        <Icon name="arrowRight" size={15} className="rotate-180" />
      </a>
      <a
        href={RING}
        target="_blank"
        rel="noreferrer"
        title="UofT Webring"
        className="grid size-8 place-items-center rounded-full transition-[background-color,rotate] duration-500 ease-[var(--ease-out-expo)] hover:rotate-45 hover:bg-surface"
      >
        {/* External SVG: served as-is (the image optimizer doesn't take remote SVGs) */}
        <Image src={`${RING}/ring_logo.svg`} alt="UofT Webring" width={22} height={22} unoptimized />
      </a>
      <a
        href={`${RING}/redirect?nav=next&id=${MEMBER_ID}`}
        aria-label="Next site in UofT Webring"
        className={`${arrowClass} hover:translate-x-0.5`}
      >
        <Icon name="arrowRight" size={15} />
      </a>
    </nav>
  )
}
