import type { MonthString } from "@/data/types"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** "2026-10" → "Oct 2026" */
export function formatMonth(value: MonthString | string): string {
  const [y, m] = value.split("-").map(Number)
  if (!y || !m) return value
  return `${MONTHS[m - 1]} ${y}`
}

/** "2026-10", "present" → "Oct 2026 – now" */
export function formatRange(start: MonthString, end: MonthString | "present"): string {
  const from = formatMonth(start)
  if (end === "present") return `${from} – now`
  const to = formatMonth(end)
  // Same year: "Jan – Aug 2026"
  const [sy] = start.split("-")
  const [ey] = end.split("-")
  if (sy === ey) return `${from.split(" ")[0]} – ${to}`
  return `${from} – ${to}`
}

/** "2026-11-02" → "Nov 2" (adds the year if it isn't this year) */
export function formatDay(iso: string, now = new Date()): string {
  const [y, m, d] = iso.split("-").map(Number)
  if (!y || !m || !d) return iso
  const base = `${MONTHS[m - 1]} ${d}`
  return y === now.getFullYear() ? base : `${base}, ${y}`
}

/** 4.5 → "★★★★½" */
export function stars(rating: number): string {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  return "★".repeat(full) + (half ? "½" : "")
}

export const lbToKg = (lb: number) => lb * 0.45359237

/** 174.63 → "174.6" (drops a trailing .0) */
export function kg(lb: number): string {
  const v = Math.round(lbToKg(lb) * 10) / 10
  return Number.isInteger(v) ? String(v) : v.toFixed(1)
}

/** Unix seconds → "3 min ago" / "2 h ago" / "Nov 12" */
export function timeAgo(unixSeconds: number, now = Date.now()): string {
  const diff = Math.max(0, now / 1000 - unixSeconds)
  if (diff < 60) return "just now"
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} h ago`
  if (diff < 86400 * 2) return "yesterday"
  const d = new Date(unixSeconds * 1000)
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`
}
