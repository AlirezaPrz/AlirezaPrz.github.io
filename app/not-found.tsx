import Link from "next/link"

export default function NotFound() {
  return (
    <section className="pt-16 md:pt-28">
      <p className="mono text-muted">404</p>
      <h1 className="display mt-3">Nothing logged here.</h1>
      <p className="mt-6 max-w-[32rem]">
        This page doesn&apos;t exist. Either I moved it or you typed it with the confidence of someone who&apos;s never
        mistyped a URL.
      </p>
      <Link href="/" className="link mt-8 inline-block">
        Back to the start
      </Link>
    </section>
  )
}
