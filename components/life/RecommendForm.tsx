"use client"

import { useState, type FormEvent } from "react"
import { site } from "@/data/site"
import { Icon } from "../Icon"
import { primaryButton } from "../ui"

type Kind = "watch" | "listen"
type Status = { state: "idle" } | { state: "sending" } | { state: "sent"; kind: Kind } | { state: "error"; message: string }

const copy = {
  watch: { title: "Movie or show", titleHint: "e.g. Perfect Days", creator: "Director (optional)" },
  listen: { title: "Song or album", titleHint: "e.g. Blonde", creator: "Artist (optional)" },
}

const field =
  "w-full rounded-md border border-rule-strong bg-bg px-3.5 py-2.5 text-ink transition-colors placeholder:text-muted/70 hover:border-muted focus:border-accent focus:outline-none focus-visible:outline-none"

export function RecommendForm() {
  const [kind, setKind] = useState<Kind>("watch")
  const [status, setStatus] = useState<Status>({ state: "idle" })

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus({ state: "sending" })
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, kind }),
      })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(json.error || "Something went wrong. Mind trying again?")
      form.reset()
      setStatus({ state: "sent", kind })
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong." })
    }
  }

  if (status.state === "sent") {
    return (
      <div className="rounded-[10px] border border-rule px-6 py-8" role="status">
        <p className="flex items-center gap-2 text-[1.125rem] font-extrabold tracking-[-0.015em] text-ink">
          <Icon name="check" size={20} className="text-accent" />
          Got it, thank you!
        </p>
        <p className="mt-2 max-w-[32rem]">
          It&apos;s on my list. If I {status.kind === "watch" ? "watch it" : "listen to it"}, it&apos;ll probably show up
          on this page, along with an honest rating.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="link-quiet mono mt-5 text-muted"
        >
          Recommend something else
        </button>
      </div>
    )
  }

  const c = copy[kind]
  const sending = status.state === "sending"

  return (
    <form onSubmit={onSubmit} className="max-w-[40rem]" noValidate={false}>
      <fieldset>
        <legend className="mono text-muted">I think you should</legend>
        <div className="mt-2 inline-flex rounded-full border border-rule-strong p-1">
          {(["watch", "listen"] as const).map((k) => (
            <label
              key={k}
              className={`mono cursor-pointer rounded-full px-4 py-1.5 text-[0.8125rem] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                kind === k ? "bg-ink text-bg" : "text-muted hover:text-ink"
              }`}
            >
              <input
                type="radio"
                name="kind-choice"
                value={k}
                checked={kind === k}
                onChange={() => setKind(k)}
                className="sr-only"
              />
              {k === "watch" ? "watch" : "listen to"}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mono text-muted">{c.title}</span>
          <input name="title" required maxLength={160} placeholder={c.titleHint} className={`${field} mt-1.5`} />
        </label>
        <label className="block">
          <span className="mono text-muted">{c.creator}</span>
          <input name="creator" maxLength={160} className={`${field} mt-1.5`} />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mono text-muted">Why? Sell me on it (optional)</span>
        <textarea name="note" rows={3} maxLength={1500} className={`${field} mt-1.5 resize-y`} />
      </label>

      <label className="mt-4 block sm:max-w-[calc(50%-0.5rem)]">
        <span className="mono text-muted">Your name (optional)</span>
        <input name="name" maxLength={80} autoComplete="name" className={`${field} mt-1.5`} />
      </label>

      {/* Honeypot: hidden from people and screen readers, irresistible to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className={primaryButton}
        >
          {sending ? "Sending…" : "Send it"}
          {!sending && <Icon name="arrowRight" size={16} />}
        </button>
        <p aria-live="polite" className="text-[0.9375rem]">
          {status.state === "error" && (
            <span className="text-ink">
              {status.message}{" "}
              <a href={`mailto:${site.links.email}`} className="link whitespace-nowrap">
                Email me instead
              </a>
            </span>
          )}
        </p>
      </div>
    </form>
  )
}
