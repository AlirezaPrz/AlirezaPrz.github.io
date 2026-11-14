import Image from "next/image"
import { site } from "@/data/site"

/** The About-page photo in its soft frame (a small radius plus an offset hairline mat). */
export function Portrait() {
  const { photo } = site
  return (
    <figure className="group isolate w-full max-w-[24rem] md:ml-auto">
      <div
        data-settle
        className="soft-frame aspect-[4/5] w-[calc(100%-10px)] group-hover:after:translate-x-[6px] group-hover:after:translate-y-[6px]"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="(min-width: 768px) 24rem, 90vw"
          className="rounded-[10px] object-cover object-[50%_30%]"
        />
      </div>
      <figcaption className="mono mt-6 text-muted">{photo.caption}</figcaption>
    </figure>
  )
}
