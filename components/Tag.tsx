export function Tags({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Tech stack">
      {items.map((t) => (
        <li
          key={t}
          className="mono rounded-full border border-rule px-2.5 py-1 leading-none text-muted"
        >
          {t}
        </li>
      ))}
    </ul>
  )
}
