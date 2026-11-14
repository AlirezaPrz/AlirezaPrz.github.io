"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { site } from "@/data/site"
import { Icon } from "./Icon"
import { SocialLinks } from "./SocialLinks"
import { ThemeToggle } from "./ThemeToggle"

const nav = [
  { href: "/", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/life", label: "Life Outside" },
]

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href)
}

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close the menu on navigation and on Escape
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className="pt-6 pb-4 sm:pt-8">
      <div className="flex items-center justify-between gap-6">
        <Link
          href="/"
          className="text-[1.0625rem] font-extrabold tracking-[-0.02em] text-ink transition-colors hover:text-accent"
        >
          {site.name}
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-7 md:flex">
          <nav aria-label="Main">
            <ul className="mono flex items-center gap-6 text-[0.8125rem]">
              {nav.map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`link-quiet py-1 ${active ? "text-ink [background-size:100%_1px]" : "text-muted"}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
              <li>
                <a
                  href={site.links.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="link-quiet inline-flex items-center gap-1 py-1 text-muted"
                >
                  Resume
                  <Icon name="arrowUpRight" size={13} />
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-1 border-l border-rule pl-4">
            <SocialLinks />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full text-ink transition-colors hover:bg-surface"
          >
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="unfold md:hidden" data-open={open} inert={!open}>
        <div>
          <nav aria-label="Mobile" className="mt-6 border-t border-rule pt-2">
            <ul>
              {nav.map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <li key={item.href} className="border-b border-rule">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between py-4 text-[1.625rem] font-extrabold tracking-[-0.03em] ${active ? "text-ink" : "text-muted"}`}
                    >
                      {item.label}
                      <Icon name="arrowRight" size={20} className={active ? "text-accent" : "opacity-40"} />
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="flex items-center justify-between py-4">
              <a
                href={site.links.resume}
                target="_blank"
                rel="noreferrer"
                className="mono inline-flex items-center gap-1.5 text-ink"
              >
                <Icon name="download" size={15} />
                Resume (PDF)
              </a>
              <SocialLinks className="-mr-2" />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
