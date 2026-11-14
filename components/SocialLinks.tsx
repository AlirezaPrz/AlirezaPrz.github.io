import { site } from "@/data/site"
import { Icon, type IconName } from "./Icon"

const items: { label: string; href: string; icon: IconName }[] = [
  { label: "Email", href: `mailto:${site.links.email}`, icon: "mail" },
  { label: "LinkedIn", href: site.links.linkedin, icon: "linkedin" },
  { label: "GitHub", href: site.links.github, icon: "github" },
]

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center ${className}`}>
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            aria-label={item.label}
            title={item.label}
            {...(item.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            className="grid size-9 place-items-center rounded-full text-muted transition-[color,background-color,translate] duration-200 hover:-translate-y-0.5 hover:bg-surface hover:text-ink"
          >
            <Icon name={item.icon} />
          </a>
        </li>
      ))}
    </ul>
  )
}
