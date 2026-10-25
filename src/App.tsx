import { useState, useEffect, useRef, useSyncExternalStore } from "react"
import { profile, skills, education, experience, projects } from "./data/resume"
import type { ProjectCategory } from "./data/resume"
import { companyLogos, projectLogos } from "./data/logos"
import img1 from "./imports/image-5.png"
import img2 from "./imports/image-1.png"
import img3 from "./imports/image-2.png"
import img4 from "./imports/image-3.webp"
import img5 from "./imports/image-4.png"

// ─── Token map ────────────────────────────────────────────────────────────────
const TC: Record<string, string> = {
  cyan: "#00f5d4",
  magenta: "#f72585",
  amber: "#ffb700",
  purple: "#a855f7",
  blue: "#4cc9f0",
}

// Readable text steps (mirrors --text-* in index.css)
const INK = "#b8cfe0"
const BODY = "#9bb5ce"
const MUTED = "#7f9cba"
const FAINT = "#6a8caa"

// ─── Hooks ────────────────────────────────────────────────────────────────────
const reducedMotionQuery = "(prefers-reduced-motion: reduce)"

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(reducedMotionQuery)
      mq.addEventListener("change", cb)
      return () => mq.removeEventListener("change", cb)
    },
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  )
}

// The last section (in document order) crossing the viewport's centre line
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const visible = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id),
        )
        const current = [...ids].reverse().find((id) => visible.has(id))
        setActive(current ?? null)
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
  return progress
}

function useEscape(onEscape: () => void, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onEscape, enabled])
}

// ─── Pixel icons ──────────────────────────────────────────────────────────────
function PixelIcon({ rows, size = 12 }: { rows: string[]; size?: number }) {
  const w = rows[0].length
  const h = rows.length
  return (
    <svg
      width={size}
      height={(size * h) / w}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className="shrink-0"
    >
      {rows.flatMap((row, y) =>
        [...row].map((ch, x) =>
          ch === "#" ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
          ) : null,
        ),
      )}
    </svg>
  )
}

const ICON_NOTE = [
  "...######",
  "...######",
  "...#....#",
  "...#....#",
  "...#....#",
  ".###..###",
  "####.####",
  "####.####",
  ".##...##.",
]

const ICON_MENU = [
  "#########",
  ".........",
  ".........",
  "#########",
  ".........",
  ".........",
  "#########",
]

const ICON_CLOSE = [
  "#.....#",
  ".#...#.",
  "..#.#..",
  "...#...",
  "..#.#..",
  ".#...#.",
  "#.....#",
]

const ICON_TROPHY = [
  "#########",
  "#.#####.#",
  "#.#####.#",
  ".#######.",
  "..#####..",
  "...###...",
  "....#....",
  "...###...",
  "..#####..",
]

// ─── Pixel frame ──────────────────────────────────────────────────────────────
function PixelFrame({
  children,
  color = "cyan",
  className = "",
  style,
}: {
  children: React.ReactNode
  color?: string
  className?: string
  style?: React.CSSProperties
}) {
  const c = TC[color] ?? color
  return (
    <div
      className={`relative bg-[#0c1220] ${className}`}
      style={{
        border: `2px solid ${c}`,
        boxShadow: `0 0 8px ${c}33, inset 0 0 8px rgba(0,0,0,0.5)`,
        ...style,
      }}
    >
      <span
        className="absolute top-[-2px] left-[-2px] w-3 h-3 pointer-events-none"
        style={{ borderTop: `4px solid ${c}`, borderLeft: `4px solid ${c}` }}
      />
      <span
        className="absolute top-[-2px] right-[-2px] w-3 h-3 pointer-events-none"
        style={{ borderTop: `4px solid ${c}`, borderRight: `4px solid ${c}` }}
      />
      <span
        className="absolute bottom-[-2px] left-[-2px] w-3 h-3 pointer-events-none"
        style={{ borderBottom: `4px solid ${c}`, borderLeft: `4px solid ${c}` }}
      />
      <span
        className="absolute bottom-[-2px] right-[-2px] w-3 h-3 pointer-events-none"
        style={{
          borderBottom: `4px solid ${c}`,
          borderRight: `4px solid ${c}`,
        }}
      />
      {children}
    </div>
  )
}

// ─── Section background ───────────────────────────────────────────────────────
function SectionBg({
  src,
  opacity = 0.38,
  eager = false,
}: {
  src: string
  opacity?: number
  eager?: boolean
}) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <img
        src={src}
        alt=""
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="w-full h-full object-cover"
        style={{
          imageRendering: "pixelated",
          opacity,
          filter: "saturate(1.5) brightness(0.95)",
        }}
      />
      {/* Left-right vignette: sides visible, center darkened for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(7,9,15,0.05) 0%, rgba(7,9,15,0.22) 20%, rgba(7,9,15,0.5) 38%, rgba(7,9,15,0.78) 50%, rgba(7,9,15,0.5) 62%, rgba(7,9,15,0.22) 80%, rgba(7,9,15,0.05) 100%)",
        }}
      />
      {/* Top-bottom section blending */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #07090f 0%, transparent 9%, transparent 91%, #07090f 100%)",
        }}
      />
      {/* Scanline texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)",
        }}
      />
    </div>
  )
}

// ─── Section header ────────────────────────────────────────────────────────────
function SectionHeader({
  label,
  sub,
  color = "cyan",
  action,
}: {
  label: string
  sub?: string
  color?: string
  action?: React.ReactNode
}) {
  const c = TC[color] ?? color
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4">
        <h2
          className="font-pixel text-sm md:text-base whitespace-nowrap"
          style={{ color: c, textShadow: `0 0 8px ${c}` }}
        >
          &gt;&gt; {label}
        </h2>
        <div
          className="flex-1 h-px"
          style={{ background: `linear-gradient(90deg, ${c}, transparent)` }}
        />
        {action}
      </div>
      {sub && (
        <p
          className="font-mono text-xs mt-2 ml-7"
          style={{ color: MUTED, letterSpacing: "0.12em" }}
        >
          {sub}
        </p>
      )}
    </div>
  )
}

// ─── Terminal (typewriter with skip + reserved height) ─────────────────────────
function Terminal({ lines }: { lines: string[] }) {
  const full = lines.join("\n")
  const reduceMotion = usePrefersReducedMotion()
  const [count, setCount] = useState(0)
  const [skipped, setSkipped] = useState(false)
  const done = skipped || reduceMotion || count >= full.length

  useEffect(() => {
    if (done) return
    const t = setTimeout(
      () => setCount((c) => c + 1),
      full[count] === "\n" ? 220 : 22,
    )
    return () => clearTimeout(t)
  }, [count, done, full])

  const preClass = "font-mono text-[13px] leading-6 sm:text-sm sm:leading-7 md:text-[15px] whitespace-pre-wrap"

  return (
    <PixelFrame color="cyan" className="p-5">
      <div
        className="flex items-center gap-2 pb-3 mb-3"
        style={{ borderBottom: "1px solid rgba(0,245,212,0.2)" }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#f72585]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffb700]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#00f5d4]" />
        <span className="font-mono text-xs ml-2 truncate" style={{ color: MUTED }}>
          <span className="hidden sm:inline">terminal — </span>alireza@portfolio
        </span>
        {!done && (
          <button
            type="button"
            onClick={() => setSkipped(true)}
            className="ml-auto shrink-0 whitespace-nowrap font-mono text-xs px-2 py-0.5 transition-colors hover:text-[#00f5d4]"
            style={{ color: MUTED, border: "1px solid #2a4060" }}
          >
            skip ▸▸
          </button>
        )}
      </div>

      {/* Full text for assistive tech; the typed copy is decorative */}
      <p className="sr-only">{lines.map((l) => l.replace(/^> /, "")).join(". ")}</p>

      {/* The invisible copy reserves the final height so nothing below jumps */}
      <div className="grid" aria-hidden="true">
        <pre className={`${preClass} invisible [grid-area:1/1]`}>{full}</pre>
        <pre className={`${preClass} [grid-area:1/1]`} style={{ color: INK }}>
          {done ? full : full.slice(0, count)}
          {!done && (
            <span className="blink" style={{ color: "#00f5d4" }}>
              ▋
            </span>
          )}
        </pre>
      </div>
    </PixelFrame>
  )
}

// ─── Music widget (Spotify embed) ─────────────────────────────────────────────
const SPOTIFY_PLAYLIST_ID = import.meta.env.VITE_SPOTIFY_PLAYLIST_ID

function MusicWidget() {
  const [open, setOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  useEscape(() => setOpen(false), open)

  if (!SPOTIFY_PLAYLIST_ID) return null

  return (
    <>
      {/* Spotify player panel: drops below the nav bar */}
      <div
        id="music-panel"
        role="region"
        aria-label="Music player"
        className="fixed right-4 top-[72px] z-60"
        style={{
          width: "min(300px, calc(100vw - 32px))",
          border: "2px solid rgba(0,245,212,0.4)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5), 0 0 20px rgba(0,245,212,0.2)",
          background: "#0c1220",
          overflow: "hidden",
          visibility: open ? "visible" : "hidden",
          opacity: open ? 1 : 0,
          transform: open ? "none" : "translateY(-8px)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.2s ease, transform 0.2s ease, visibility 0.2s",
        }}
      >
        <div
          className="flex items-center justify-between px-3 py-2"
          style={{ borderBottom: "1px solid rgba(0,245,212,0.2)" }}
        >
          <span
            className="font-pixel text-[9px]"
            style={{ color: "#00f5d4", textShadow: "0 0 6px #00f5d4" }}
          >
            ◈ NOW PLAYING
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close music player"
            className="w-7 h-7 flex items-center justify-center hover:text-[#00f5d4]"
            style={{ color: MUTED }}
          >
            <PixelIcon rows={ICON_CLOSE} size={11} />
          </button>
        </div>
        {hasOpened && (
          <iframe
            title="Spotify music player"
            src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ display: "block" }}
          />
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o)
          setHasOpened(true)
        }}
        aria-label={open ? "Hide music player" : "Open music player"}
        aria-expanded={open}
        aria-controls="music-panel"
        className={`flex items-center justify-center w-10 h-10 transition-colors hover:bg-[#00f5d41a] ${hasOpened ? "" : "pulse-glow"}`}
        style={{
          border: `1px solid ${open ? "#00f5d4" : "rgba(0,245,212,0.4)"}`,
          background: open ? "rgba(0,245,212,0.12)" : "transparent",
          color: "#00f5d4",
        }}
      >
        <PixelIcon rows={ICON_NOTE} size={16} />
      </button>
    </>
  )
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "skills", label: "SKILLS" },
  { id: "education", label: "EDUCATION" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "contact", label: "CONTACT" },
]
const NAV_IDS = NAV_LINKS.map((l) => l.id)

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const active = useActiveSection(NAV_IDS)
  const progress = useScrollProgress()
  useEscape(() => setMobileOpen(false), mobileOpen)

  return (
    <nav
      aria-label="Main"
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3"
      style={{
        background: "rgba(7,9,15,0.92)",
        borderBottom: "1px solid rgba(0,245,212,0.2)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <a
          href="#hero"
          className="font-pixel text-[11px] flicker"
          style={{ color: "#00f5d4", textShadow: "0 0 8px #00f5d4" }}
        >
          AP.EXE
        </a>

        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className="nav-link font-mono text-xs tracking-widest hover:text-[#00f5d4] transition-colors"
              style={{ color: active === id ? undefined : MUTED }}
            >
              {label}
            </a>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="social-btn font-pixel text-[9px] px-3 py-2 tracking-widest"
            style={
              {
                "--tc": TC.amber,
                border: `1px solid ${TC.amber}`,
                color: TC.amber,
              } as React.CSSProperties
            }
          >
            RESUME
          </a>
        </div>

        <div className="flex items-center gap-3">
          <MusicWidget />

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden w-10 h-10 flex items-center justify-center"
            style={{ color: "#00f5d4", border: "1px solid rgba(0,245,212,0.4)" }}
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <PixelIcon rows={mobileOpen ? ICON_CLOSE : ICON_MENU} size={mobileOpen ? 13 : 16} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          className="lg:hidden flex flex-col mt-3 pt-2"
          style={{ borderTop: "1px solid rgba(0,245,212,0.2)" }}
        >
          {NAV_LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMobileOpen(false)}
              aria-current={active === id ? "true" : undefined}
              className="font-mono text-sm tracking-widest py-3 hover:text-[#00f5d4] transition-colors"
              style={{ color: active === id ? "#00f5d4" : MUTED }}
            >
              {active === id ? "▸ " : "  "}
              {label}
            </a>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileOpen(false)}
            className="font-mono text-sm tracking-widest py-3"
            style={{ color: TC.amber }}
          >
            {"  "}RESUME ↗
          </a>
        </div>
      )}

      {/* Scroll progress */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-[-1px] h-[2px] origin-left"
        style={{
          background: "#00f5d4",
          boxShadow: "0 0 6px #00f5d4",
          transform: `scaleX(${progress})`,
        }}
      />
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HERO_LINES = [
  "> Welcome to my portfolio.",
  "> Name: Alireza Pourreza",
  "> Now: Teaching Assistant · University of Toronto",
  "> Previously: Software Developer Intern · Ontario Public Service",
  "> Education: University of Toronto · CS Specialist",
  `> GPA: ${profile.gpa} · Expected Graduation: ${profile.graduation}`,
  "> Focus: Full-stack development, AI/ML, DevOps, and cloud solutions.",
  "> Thanks for visiting.",
]

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center grid-bg px-4 pt-24 pb-16 overflow-hidden"
    >
      <SectionBg src={img4} opacity={0.3} eager />

      {/* Extra glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,245,212,0.07) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(247,37,133,0.07) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />

      <div
        className="max-w-3xl w-full space-y-8 relative"
        style={{ zIndex: 2 }}
      >
        <div className="text-center space-y-4">
          <h1
            className="font-pixel leading-tight flicker"
            style={{
              fontSize: "clamp(1.25rem, 4.6vw, 2.6rem)",
              color: "#00f5d4",
              textShadow:
                "0 0 8px #00f5d4, 0 0 20px #00f5d4, 0 0 50px rgba(0,245,212,0.5)",
            }}
          >
            ALIREZA POURREZA
          </h1>
          <p
            className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase"
            style={{ color: BODY }}
          >
            Software Engineer · AI Engineer · DevOps Engineer
          </p>
        </div>

        <Terminal lines={HERO_LINES} />

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="pixel-btn-solid font-pixel text-[10px] px-5 py-3 tracking-widest"
          >
            [ RESUME ]
          </a>
          {[
            { label: "[ GITHUB ]", href: profile.github, color: "cyan", external: true },
            { label: "[ LINKEDIN ]", href: profile.linkedin, color: "magenta", external: true },
            { label: "[ EMAIL ]", href: `mailto:${profile.email}`, color: "amber", external: false },
          ].map(({ label, href, color, external }) => {
            const tc = TC[color]
            return (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="social-btn font-pixel text-[10px] px-4 py-3 tracking-widest"
                style={
                  {
                    "--tc": tc,
                    border: `1px solid ${tc}`,
                    color: tc,
                    textShadow: `0 0 6px ${tc}`,
                  } as React.CSSProperties
                }
              >
                {label}
              </a>
            )
          })}
        </div>

        <div className="text-center">
          <a
            href="#skills"
            className="font-mono text-xs tracking-widest animate-bounce inline-block px-3 py-2 hover:text-[#00f5d4] transition-colors"
            style={{ color: FAINT }}
          >
            ▼ SCROLL TO EXPLORE ▼
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Skills + Education ───────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-24">
      <SectionBg src={img5} opacity={0.4} />
      <div className="relative max-w-5xl mx-auto px-4 md:px-6" style={{ zIndex: 1 }}>
        <SectionHeader
          label="SKILLS"
          sub="TECHNICAL TOOLKIT · LANGUAGES, FRAMEWORKS & TECHNOLOGIES"
          color="cyan"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((group) => {
            const tc = TC[group.color] ?? "#00f5d4"
            return (
              <PixelFrame
                key={group.category}
                color={group.color}
                className="p-5"
              >
                <h3
                  className="font-pixel text-[10px] mb-4 pb-3 flex items-center justify-between"
                  style={{
                    color: tc,
                    textShadow: `0 0 6px ${tc}`,
                    borderBottom: `1px solid ${tc}33`,
                  }}
                >
                  <span>{group.category}</span>
                  <span className="font-mono text-xs" style={{ color: `${tc}aa`, textShadow: "none" }}>
                    {group.items.length}
                  </span>
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="tag-hover font-mono text-[13px] px-2 py-1 cursor-default"
                      style={{ "--tc": tc } as React.CSSProperties}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </PixelFrame>
            )
          })}
        </div>

        {/* Education */}
        <div id="education" className="mt-6">
          <PixelFrame color="amber" className="p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
              <div className="min-w-0">
                <h3 className="font-pixel text-[10px] glow-amber mb-4">
                  ◈ EDUCATION
                </h3>
                <div className="font-mono text-base font-bold" style={{ color: INK }}>
                  {education.school}
                </div>
                <div className="font-mono text-sm mt-1" style={{ color: BODY }}>
                  {education.degree} · {education.specialization}
                </div>
                <div className="font-mono text-sm mt-1" style={{ color: MUTED }}>
                  Concentrations: {education.concentrations.join(" · ")}
                </div>
              </div>
              <dl className="flex md:flex-col gap-x-6 gap-y-2 md:text-right shrink-0 flex-wrap">
                <div>
                  <dt className="sr-only">GPA</dt>
                  <dd className="font-pixel text-sm md:text-base glow-amber">
                    {education.gpa}
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Honours</dt>
                  <dd className="font-mono text-sm" style={{ color: BODY }}>
                    {education.deansList}
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Graduation</dt>
                  <dd className="font-mono text-sm" style={{ color: BODY }}>
                    {education.graduation}
                  </dd>
                </div>
              </dl>
            </div>

            <div
              className="grid md:grid-cols-2 gap-5 mt-5 pt-5"
              style={{ borderTop: "1px solid #ffb70033" }}
            >
              <div>
                <h4 className="font-mono text-xs tracking-widest mb-3" style={{ color: MUTED }}>
                  SCHOLARSHIPS
                </h4>
                <ul className="flex flex-col gap-2">
                  {education.scholarships.map((s) => (
                    <li
                      key={s}
                      className="font-mono text-[13px] px-2.5 py-1.5 flex items-center gap-2.5 self-start"
                      style={{
                        border: "1px solid #ffb70055",
                        color: "#ffb700",
                        background: "rgba(255,183,0,0.05)",
                      }}
                    >
                      <PixelIcon rows={ICON_TROPHY} size={11} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-xs tracking-widest mb-3" style={{ color: MUTED }}>
                  RELATED COURSEWORK
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {education.coursework.map((c) => (
                    <li
                      key={c}
                      className="tag-hover font-mono text-[13px] px-2 py-1 cursor-default"
                      style={{ "--tc": TC.amber } as React.CSSProperties}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </PixelFrame>
        </div>
      </div>
    </section>
  )
}

// ─── Experience ────────────────────────────────────────────────────────────────
function Experience() {
  const [open, setOpen] = useState<Set<number>>(() => new Set())
  const allOpen = open.size === experience.length

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <section id="experience" className="relative overflow-hidden py-24">
      <SectionBg src={img2} opacity={0.36} />
      <div className="relative max-w-5xl mx-auto px-4 md:px-6" style={{ zIndex: 1 }}>
        <SectionHeader
          label="EXPERIENCE"
          sub="PROFESSIONAL EXPERIENCE & LEADERSHIP · SELECT A ROLE TO VIEW DETAILS"
          color="magenta"
          action={
            <button
              type="button"
              onClick={() =>
                setOpen(allOpen ? new Set() : new Set(experience.map((_, i) => i)))
              }
              className="social-btn font-mono text-xs tracking-wider px-3 py-1.5 whitespace-nowrap"
              style={
                {
                  "--tc": TC.magenta,
                  color: TC.magenta,
                  border: `1px solid ${TC.magenta}66`,
                } as React.CSSProperties
              }
            >
              {allOpen ? "▾ COLLAPSE ALL" : "▸ EXPAND ALL"}
            </button>
          }
        />

        <div className="relative">
          <div
            className="absolute left-4 top-0 bottom-0 w-px hidden md:block"
            style={{
              background:
                "linear-gradient(180deg, #4cc9f0, #00f5d4, #ffb700, #00f5d4, #f72585, #ffb700, #a855f7)",
            }}
          />

          <ol className="space-y-4 md:pl-12">
            {experience.map((job, i) => {
              const tc = TC[job.color] ?? "#00f5d4"
              const isOpen = open.has(i)
              const isCurrent = job.period.includes("Present")
              const LogoComp = companyLogos[job.company]
              const panelId = `exp-panel-${i}`

              return (
                <li key={job.company} className="relative">
                  <div
                    className="absolute left-[-2.75rem] top-7 w-3 h-3 hidden md:block"
                    style={{
                      background: tc,
                      boxShadow: `0 0 8px ${tc}`,
                      transform: "rotate(45deg)",
                    }}
                  />
                  <PixelFrame color={job.color} className="interactive-card">
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="w-full text-left p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 cursor-pointer"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        {LogoComp && (
                          <div
                            className="shrink-0 flex items-center justify-center w-12 h-12"
                            style={{
                              background: "rgba(0,0,0,0.4)",
                              border: `1px solid ${tc}33`,
                              color: tc,
                            }}
                          >
                            <LogoComp />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h3
                            className="font-pixel text-[10px] md:text-[11px] leading-relaxed"
                            style={{ color: tc, textShadow: `0 0 6px ${tc}` }}
                          >
                            {job.company}
                          </h3>
                          <div className="font-mono text-sm mt-1" style={{ color: INK }}>
                            {job.role}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 shrink-0">
                        {isCurrent && (
                          <span
                            className="font-mono text-xs px-2 py-0.5 flex items-center gap-1.5"
                            style={{ color: "#07090f", background: tc }}
                          >
                            <span className="w-1.5 h-1.5" style={{ background: "#07090f" }} />
                            NOW
                          </span>
                        )}
                        <span
                          className="font-mono text-[13px] px-2 py-0.5"
                          style={{ border: `1px solid ${tc}55`, color: tc }}
                        >
                          {job.period}
                        </span>
                        <span
                          className="font-mono text-[13px] tracking-wider px-3 py-1.5 transition-colors duration-200"
                          style={{
                            color: tc,
                            border: `1px solid ${tc}66`,
                            background: isOpen ? `${tc}1f` : `${tc}0d`,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {isOpen
                            ? "▾ HIDE"
                            : `▸ ${job.bullets.length} ${job.bullets.length === 1 ? "DETAIL" : "DETAILS"}`}
                        </span>
                      </div>
                    </button>

                    <div
                      id={panelId}
                      className="accordion"
                      data-open={isOpen}
                      inert={!isOpen}
                    >
                      <div>
                        <ul
                          className="mx-4 md:mx-5 mb-5 pt-4 space-y-3"
                          style={{ borderTop: `1px solid ${tc}33` }}
                        >
                          {job.bullets.map((b, bi) => (
                            <li key={bi} className="flex gap-3">
                              <span
                                className="font-mono text-sm shrink-0"
                                style={{ color: tc }}
                                aria-hidden="true"
                              >
                                ▸
                              </span>
                              <p
                                className="font-mono text-sm leading-6 max-w-[75ch]"
                                style={{ color: BODY }}
                              >
                                {b}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </PixelFrame>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

// ─── Projects ─────────────────────────────────────────────────────────────────
type Project = (typeof projects)[number]

const CYCLE_COLORS = ["cyan", "magenta", "amber", "purple"]

function ProjectCard({ proj, color }: { proj: Project; color: string }) {
  const tc = TC[color]
  const LogoComp = projectLogos[proj.name]
  const featured = proj.featured

  const body = (
    <PixelFrame
      color={color}
      className={`p-5 interactive-card flex flex-col h-full ${featured ? "md:p-7" : ""}`}
    >
      <div className={featured ? "grid lg:grid-cols-[1fr_1.1fr] gap-x-10 gap-y-5" : "flex flex-col flex-1"}>
        <div className="flex flex-col">
          {/* Project header */}
          <div className="flex items-center gap-3 mb-3">
            {LogoComp && (
              <div
                className="shrink-0 flex items-center justify-center w-11 h-11"
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: `1px solid ${tc}33`,
                  color: tc,
                }}
              >
                <LogoComp />
              </div>
            )}

            <div className="min-w-0">
              <h3
                className={`font-pixel leading-relaxed ${featured ? "text-xs md:text-sm" : "text-[10px]"}`}
                style={{ color: tc, textShadow: `0 0 6px ${tc}` }}
              >
                {proj.name}
              </h3>
              <div className="font-mono text-[13px] mt-0.5" style={{ color: `${tc}bb` }}>
                {proj.type} · {proj.period}
              </div>
            </div>
          </div>

          {featured && (
            <span
              className="font-mono text-xs px-2 py-0.5 self-start mb-3 flex items-center gap-1.5"
              style={{ color: "#07090f", background: tc }}
            >
              <span className="w-1.5 h-1.5" style={{ background: "#07090f" }} />
              LATEST BUILD
            </span>
          )}

          {/* Description */}
          <p
            className={`font-mono text-sm leading-6 mb-4 ${featured ? "" : "flex-1"}`}
            style={{ color: BODY }}
          >
            {proj.description}
          </p>

          {/* Tags */}
          <ul className="flex flex-wrap gap-1.5 mt-auto" aria-label="Technologies">
            {proj.tags.map((tag) => (
              <li
                key={tag}
                className="font-mono text-xs px-1.5 py-0.5"
                style={{
                  border: `1px solid ${tc}44`,
                  color: tc,
                  background: `${tc}0a`,
                }}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {featured && proj.highlights && (
          <ul className="space-y-3 lg:pl-8 lg:border-l" style={{ borderColor: `${tc}33` }}>
            {proj.highlights.map((h, hi) => (
              <li key={hi} className="flex gap-3">
                <span className="font-mono text-sm shrink-0" style={{ color: tc }} aria-hidden="true">
                  ▸
                </span>
                <p className="font-mono text-sm leading-6" style={{ color: BODY }}>
                  {h}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* GitHub link */}
      {proj.github && (
        <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${tc}22` }}>
          <span
            className="inline-flex items-center gap-2 font-mono text-[13px] px-3 py-2 transition-transform duration-200 group-hover:translate-x-1"
            style={{
              border: `1px solid ${tc}66`,
              color: tc,
              background: `${tc}08`,
              textShadow: `0 0 5px ${tc}`,
            }}
          >
            <span aria-hidden="true">↗</span>
            <span>VIEW ON GITHUB</span>
          </span>
        </div>
      )}
    </PixelFrame>
  )

  const span = featured ? "md:col-span-2 lg:col-span-3" : ""

  return proj.github ? (
    <a
      href={proj.github}
      target="_blank"
      rel="noreferrer"
      className={`block group ${span}`}
      aria-label={`${proj.name}: view on GitHub`}
    >
      {body}
    </a>
  ) : (
    <div className={span}>{body}</div>
  )
}

function Projects() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all")

  const filterLabels: Array<{ key: typeof filter; label: string }> = [
    { key: "all", label: "ALL" },
    { key: "personal", label: "PERSONAL" },
    { key: "hackathon", label: "HACKATHONS" },
    { key: "coursework", label: "COURSEWORK" },
  ]

  const countFor = (key: typeof filter) =>
    key === "all" ? projects.length : projects.filter((p) => p.category === key).length

  // Colour stays tied to the project, not to its position in the filtered list
  const visible = projects
    .map((p, i) => ({ p, color: CYCLE_COLORS[i % CYCLE_COLORS.length] }))
    .filter(({ p }) => filter === "all" || p.category === filter)

  return (
    <section id="projects" className="relative overflow-hidden py-24">
      <SectionBg src={img3} opacity={0.36} />

      <div className="relative max-w-6xl mx-auto px-4 md:px-6" style={{ zIndex: 1 }}>
        <SectionHeader
          label="PROJECTS"
          sub="SELECTED WORK · PROJECTS & TECHNICAL EXPLORATIONS"
          color="amber"
        />

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter projects">
          {filterLabels.map(({ key, label }) => {
            const on = filter === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                aria-pressed={on}
                className="font-pixel text-[9px] px-3 py-2.5 tracking-widest transition-colors hover:text-[#ffb700]"
                style={{
                  border: `1px solid ${on ? "#ffb700" : "#2a4060"}`,
                  color: on ? "#ffb700" : MUTED,
                  background: on ? "rgba(255,183,0,0.1)" : "rgba(7,9,15,0.6)",
                  boxShadow: on ? "0 0 8px rgba(255,183,0,0.3)" : "none",
                }}
              >
                {label}
                <span className="font-mono text-xs ml-2" style={{ opacity: 0.8 }}>
                  {countFor(key)}
                </span>
              </button>
            )
          })}
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" aria-live="polite">
          {visible.map(({ p, color }) => (
            <ProjectCard key={p.name} proj={p} color={color} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  )
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => clearTimeout(copyTimer.current), [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!FORMSPREE_ID) {
      setStatus("error")
      return
    }
    setStatus("sending")
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("sent")
        setForm({ name: "", email: "", message: "" })
      } else setStatus("error")
    } catch {
      setStatus("error")
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      clearTimeout(copyTimer.current)
      copyTimer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const labelClass = "font-pixel text-[9px] block mb-2.5"

  return (
    <section id="contact" className="relative overflow-hidden py-24 pb-16">
      <SectionBg src={img1} opacity={0.44} />

      <div className="relative max-w-2xl mx-auto px-4 md:px-6" style={{ zIndex: 1 }}>
        <SectionHeader
          label="CONTACT"
          sub="GET IN TOUCH · OPEN TO OPPORTUNITIES & COLLABORATION"
          color="purple"
        />

        <PixelFrame color="purple" className="p-5 md:p-7">
          <h3
            className="font-pixel text-[10px] mb-2"
            style={{ color: "#a855f7", textShadow: "0 0 8px #a855f7" }}
          >
            ◈ SEND A MESSAGE
          </h3>
          <p className="font-mono text-sm leading-6 mb-5" style={{ color: BODY }}>
            I'm always happy to connect about internships, co-ops, software
            development opportunities, or interesting technical projects.
          </p>

          {/* Direct line */}
          <div
            className="flex flex-wrap items-center gap-2 mb-7 p-3"
            style={{ background: "rgba(168,85,247,0.06)", border: "1px solid #a855f733" }}
          >
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-sm break-all hover:underline underline-offset-4"
              style={{ color: INK }}
            >
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="social-btn font-mono text-xs px-2.5 py-1 ml-auto"
              style={
                {
                  "--tc": TC.purple,
                  color: copied ? TC.cyan : "#c79bff",
                  border: `1px solid ${copied ? TC.cyan : "#a855f777"}`,
                } as React.CSSProperties
              }
              aria-live="polite"
            >
              {copied ? "COPIED ✓" : "COPY"}
            </button>
          </div>

          {status === "sent" ? (
            <div className="text-center py-12 space-y-4" role="status">
              <div className="font-pixel text-[11px] glow-cyan">
                [ MESSAGE SENT ✓ ]
              </div>
              <p className="font-mono text-sm" style={{ color: BODY }}>
                Thanks for reaching out. I'll get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="social-btn font-pixel text-[9px] px-4 py-2.5 mt-4"
                style={
                  {
                    "--tc": TC.cyan,
                    border: "1px solid #00f5d4",
                    color: "#00f5d4",
                  } as React.CSSProperties
                }
              >
                [ SEND ANOTHER MESSAGE ]
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className={labelClass} style={{ color: "#c79bff" }}>
                    YOUR NAME
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="What's your name?"
                    className="field"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className={labelClass} style={{ color: "#c79bff" }}>
                    YOUR EMAIL
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="field"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className={labelClass} style={{ color: "#c79bff" }}>
                  YOUR MESSAGE
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  autoComplete="off"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell me a little about your project or opportunity."
                  className="field"
                  style={{ resize: "vertical", minHeight: 140 }}
                />
              </div>

              {status === "error" && (
                <p className="font-mono text-sm leading-6" style={{ color: "#ff4d9d" }} role="alert">
                  ▸ Your message couldn't be sent. Please try again, or email me
                  directly at{" "}
                  <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
                    {profile.email}
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="social-btn font-pixel text-[10px] px-6 py-3.5 w-full tracking-widest disabled:cursor-not-allowed disabled:opacity-70"
                style={
                  {
                    "--tc": TC.purple,
                    border: "1px solid #a855f7",
                    color: "#c79bff",
                    background:
                      status === "sending"
                        ? "rgba(168,85,247,0.18)"
                        : "rgba(168,85,247,0.08)",
                    boxShadow: "0 0 10px rgba(168,85,247,0.2)",
                  } as React.CSSProperties
                }
              >
                {status === "sending"
                  ? "[ SENDING... ]"
                  : "[ SEND MESSAGE → ]"}
              </button>
            </form>
          )}
        </PixelFrame>

        <footer className="flex flex-col items-center gap-4 mt-14">
          <a
            href="#hero"
            className="font-mono text-xs tracking-widest px-3 py-2 hover:text-[#00f5d4] transition-colors"
            style={{ color: MUTED }}
          >
            ▲ BACK TO TOP
          </a>
          <div
            className="font-pixel text-[9px] leading-relaxed text-center inline-block px-4 py-2"
            style={{ color: FAINT, border: "1px solid #1a2d45" }}
          >
            © {new Date().getFullYear()} ALIREZA POURREZA · BUILT WITH REACT + VITE
          </div>
        </footer>
      </div>
    </section>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [stars] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.35 + 0.08,
      dur: Math.random() * 4 + 2,
    })),
  )

  return (
    <div className="relative min-h-screen" style={{ background: "#07090f" }}>
      <a href="#main" className="skip-link font-mono text-sm">
        Skip to content
      </a>

      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        {stars.map((s) => (
          <div
            key={s.id}
            className="star absolute rounded-full"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              background: "#00f5d4",
              opacity: s.opacity,
              animation: `pulse-glow ${s.dur}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <main id="main">
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </div>
    </div>
  )
}
