"use client"

import { useEffect } from "react"
import { Icon } from "./Icon"

type Theme = "light" | "dark"

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme
}

/**
 * The icon swap is pure CSS (dark: variant), so server and client markup
 * always match and there's no flash. JS only handles the click and keeps
 * following the system setting until the visitor makes a choice.
 */
export function ThemeToggle() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = (e: MediaQueryListEvent) => {
      let saved: string | null = null
      try {
        saved = localStorage.getItem("theme")
      } catch {}
      if (!saved) apply(e.matches ? "dark" : "light")
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  function toggle() {
    const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark"
    apply(next)
    try {
      localStorage.setItem("theme", next)
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="grid size-9 place-items-center rounded-full text-muted transition-colors duration-200 hover:bg-surface hover:text-ink"
    >
      <Icon name="moon" className="dark:hidden" />
      <Icon name="sun" className="hidden dark:block" />
    </button>
  )
}
