/** Shared control styles, so every button on the site behaves the same way. */

/** Filled ink pill: the one main action in a section. */
export const primaryButton =
  "inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-[0.9375rem] font-medium text-bg transition-[translate,background-color,opacity] duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-accent-ink active:translate-y-0 disabled:pointer-events-none disabled:opacity-60"

/** Outlined mono pill: secondary links such as GitHub and Demo. */
export const outlineButton =
  "mono inline-flex w-fit items-center gap-1.5 rounded-full border border-rule-strong px-3.5 py-1.5 text-ink transition-[translate,border-color,color] duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
