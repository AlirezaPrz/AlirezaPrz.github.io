import { site } from "@/data/site"
import { Icon } from "./Icon"
import { WebRing } from "./WebRing"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mono mt-32 flex flex-col gap-3 border-t border-rule py-8 text-muted sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {year} {site.name}
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <WebRing />
        <a href="#main" className="link-quiet inline-flex w-fit items-center gap-1.5">
          Back to top
          <Icon name="arrowUp" size={13} />
        </a>
      </div>
    </footer>
  )
}
