import { lifts, philosophy, split } from "@/data/lifting"
import { kg } from "@/lib/format"

export const totalLb = lifts.reduce((sum, l) => sum + l.lb, 0)

function PR({ label, lb, emphasis = false }: { label: string; lb: number; emphasis?: boolean }) {
  return (
    <li
      tabIndex={0}
      aria-label={`${label}: ${kg(lb)} kilograms, ${lb} pounds`}
      className={`group relative border-t py-5 outline-offset-4 sm:py-6 ${emphasis ? "border-ink" : "border-rule"}`}
    >
      <p className="flex items-baseline gap-1.5" aria-hidden="true">
        <span className="text-[clamp(2.25rem,1.7rem+2.2vw,3.25rem)] leading-none font-extrabold tracking-[-0.045em] text-ink tabular-nums">
          {kg(lb)}
        </span>
        <span className="mono text-muted">kg</span>
      </p>
      <p className="mt-3 flex items-baseline justify-between gap-3" aria-hidden="true">
        <span className={emphasis ? "font-medium text-ink" : "text-ink"}>{label}</span>
        {/* lbs: revealed on hover/focus, always visible on touch screens */}
        <span className="mono text-accent transition-[opacity,translate] duration-300 [@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100">
          {lb} lb
        </span>
      </p>
    </li>
  )
}

export function Lifting() {
  return (
    <>
      <ul className="mt-12 grid grid-cols-2 gap-x-6 sm:grid-cols-4" aria-label="Current personal records">
        {lifts.map((l) => (
          <PR key={l.name} label={l.name} lb={l.lb} />
        ))}
        <PR label="Total" lb={totalLb} emphasis />
      </ul>
      <p className="mono mt-3 text-muted">
        Best singles. <span className="[@media(hover:none)]:hidden">Hover for pounds.</span>
      </p>

      <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <h3 className="text-[1.125rem] tracking-[-0.015em]">Current split</h3>
          <ol className="mt-5 border-b border-rule">
            {split.map((d) => (
              <li key={d.day} className="ledger-row group grid grid-cols-[3.5rem_1fr] gap-x-4 py-3">
                <span className="mono pt-[3px] text-muted transition-colors group-hover:text-accent">{d.day}</span>
                <span>
                  <span className={d.focus === "Rest" ? "text-muted" : "font-medium text-ink"}>{d.focus}</span>
                  {d.note && <span className="text-muted">, {d.note}</span>}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="text-[1.125rem] tracking-[-0.015em]">How I train</h3>
          <div className="mt-5 space-y-4">
            {philosophy.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
