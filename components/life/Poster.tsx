import Image from "next/image"

/** A 2:3 poster in the site's frame. Falls back to a typographic poster. */
export function Poster({
  src,
  title,
  sizes = "(min-width: 1024px) 10rem, 30vw",
}: {
  src?: string
  title: string
  sizes?: string
}) {
  return (
    <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-surface transition-[translate,box-shadow] duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:shadow-[0_14px_28px_-16px_rgb(0_0_0/0.45)]">
      {src ? (
        <Image src={src} alt={`Poster for ${title}`} fill sizes={sizes} className="object-cover" />
      ) : (
        <div aria-hidden="true" className="flex h-full items-end p-3">
          <span className="text-[1.125rem] leading-[1] font-extrabold tracking-[-0.03em] text-muted">{title}</span>
        </div>
      )}
    </div>
  )
}
