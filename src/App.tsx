import { useState, useRef, useEffect } from "react"
import { profile, skills, education, experience, projects } from "./data/resume"
import { companyLogos, projectLogos } from "./data/logos"
import img1 from "./imports/image-5.png"
import img2 from "./imports/image-1.png"
import img3 from "./imports/image-2.png"
import img4 from "./imports/image-3.png"
import img5 from "./imports/image-4.png"

// ─── Token map ────────────────────────────────────────────────────────────────
const TC: Record<string, string> = {
  cyan: "#00f5d4",
  magenta: "#f72585",
  amber: "#ffb700",
  purple: "#a855f7",
  blue: "#4cc9f0",
}

// ─── Pixel frame ──────────────────────────────────────────────────────────────
function PixelFrame({
  children,
  color = "cyan",
  className = "",
  onClick,
  onKeyDown,
  role,
  tabIndex,
  style,
  "aria-expanded": ariaExpanded,
}: {
  children: React.ReactNode
  color?: string
  className?: string
  onClick?: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
  role?: string
  tabIndex?: number
  style?: React.CSSProperties
  "aria-expanded"?: boolean
}) {
  const c = TC[color] ?? color
  return (
    <div
      className={`relative bg-[#0c1220] ${className}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      tabIndex={tabIndex}
      aria-expanded={ariaExpanded}
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
  alt,
  opacity = 0.38,
  eager = false,
}: {
  src: string
  alt: string
  opacity?: number
  eager?: boolean
}) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
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
}: {
  label: string
  sub?: string
  color?: string
}) {
  const c = TC[color] ?? color
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4">
        <span
          className="font-pixel text-xs whitespace-nowrap"
          style={{ color: c, textShadow: `0 0 8px ${c}` }}
        >
          &gt;&gt; {label}
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: `linear-gradient(90deg, ${c}, transparent)` }}
        />
      </div>
      {sub && (
        <div
          className="font-mono text-[10px] mt-1 ml-5"
          style={{ color: `${c}77`, letterSpacing: "0.15em" }}
        >
          {sub}
        </div>
      )}
    </div>
  )
}

// ─── Typewriter ────────────────────────────────────────────────────────────────
function Typewriter({ lines }: { lines: string[] }) {
  const [displayed, setDisplayed] = useState("")
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return
    const current = lines[lineIdx]
    if (charIdx < current.length) {
      const t = setTimeout(() => {
        setDisplayed((p) => p + current[charIdx])
        setCharIdx((c) => c + 1)
      }, 36)
      return () => clearTimeout(t)
    } else if (lineIdx < lines.length - 1) {
      const t = setTimeout(() => {
        setDisplayed((p) => p + "\n")
        setLineIdx((l) => l + 1)
        setCharIdx(0)
      }, 250)
      return () => clearTimeout(t)
    } else {
      setDone(true)
    }
  }, [charIdx, lineIdx, lines, done])

  return (
    <pre
      className="font-mono text-sm leading-7 whitespace-pre-wrap"
      style={{ color: "#b8cfe0" }}
    >
      {displayed}
      {!done && (
        <span className="blink" style={{ color: "#00f5d4" }}>
          ▋
        </span>
      )}
    </pre>
  )
}

// ─── Music widget (Spotify embed) ─────────────────────────────────────────────
const SPOTIFY_PLAYLIST_ID = import.meta.env.VITE_SPOTIFY_PLAYLIST_ID

function MusicWidget() {
  const [open, setOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)

  return (
    <div
      style={{
        position: "fixed",
        top: 68,
        left: 16,
        zIndex: 60,
      }}
    >
      {/* Circular FAB */}
      <button
        onClick={() => {
          setOpen((o) => !o)
          setHasOpened(true)
        }}
        title={open ? "Hide player" : "Open music player"}
        style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          border: "2px solid #00f5d4",
          background: "rgba(0,245,212,0.15)",
          color: "#00f5d4",
          fontSize: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow:
            "0 0 14px rgba(0,245,212,0.5), 0 0 30px rgba(0,245,212,0.2)",
          transition: "all 0.2s",
          backdropFilter: "blur(8px)",
          animation: "pulse-glow 2s ease-in-out infinite",
        }}
      >
        ♪
      </button>

      {/* Spotify player panel — slides out to the right of the button */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 50,
          width: 300,
          border: "2px solid rgba(0,245,212,0.4)",
          boxShadow: "0 0 20px rgba(0,245,212,0.25)",
          background: "#0c1220",
          overflow: "hidden",
          visibility: open ? "visible" : "hidden",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.2s ease, visibility 0.2s ease",
        }}
      >
        {/* Pixel-frame top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "6px 10px",
            borderBottom: "1px solid rgba(0,245,212,0.2)",
          }}
        >
          <span
            className="font-pixel"
            style={{
              fontSize: 7,
              color: "#00f5d4",
              textShadow: "0 0 6px #00f5d4",
            }}
          >
            ◈ NOW PLAYING
          </span>
          <button
            onClick={() => setOpen(false)}
            style={{
              color: "#4a6a8a",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            ✕
          </button>
        </div>
        {hasOpened && (
          <iframe
            title="Spotify music player"
            src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`}
            width="300"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            style={{ display: "block" }}
          />
        )}
      </div>
    </div>
  )
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: "#skills", label: "SKILLS" },
    { href: "#experience", label: "EXPERIENCE" },
    { href: "#projects", label: "PROJECTS" },
    { href: "#contact", label: "CONTACT" },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-3"
      style={{
        background: "rgba(7,9,15,0.92)",
        borderBottom: "1px solid rgba(0,245,212,0.2)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex items-center justify-between">
        <a
          href="#hero"
          className="font-pixel text-[10px] flicker"
          style={{ color: "#00f5d4", textShadow: "0 0 8px #00f5d4" }}
        >
          AP.EXE
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="nav-link font-mono text-[11px] tracking-widest text-[#4a6a8a] hover:text-[#00f5d4] transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden font-pixel text-[10px] px-2 py-1"
          style={{ color: "#00f5d4", border: "1px solid rgba(0,245,212,0.4)" }}
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden flex flex-col gap-4 mt-4 pt-4"
          style={{ borderTop: "1px solid rgba(0,245,212,0.2)" }}
        >
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="font-mono text-xs tracking-widest text-[#4a6a8a] hover:text-[#00f5d4] transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const lines = [
    "> Welcome to my portfolio.",
    "> Name: Alireza Pourreza",
    "> Role: Software Developer · Ontario Public Service",
    "> Education: University of Toronto · CS Specialist",
    "> GPA: 3.98 / 4.00 · Expected Graduation: June 2028",
    "> Focus: Full-stack development, AI/ML, DevOps, and cloud solutions.",
    "> Thanks for visiting.",
  ]

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center grid-bg px-4 py-24 overflow-hidden"
    >
      <SectionBg src={img4} alt="Pixel city" opacity={0.3} />

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
        <div className="text-center space-y-2">
          <div className="font-pixel text-[10px] glow-amber mb-2 tracking-widest">
            ◈ WELCOME · ALIREZA'S PORTFOLIO ◈
          </div>
          <h1
            className="font-pixel leading-tight flicker"
            style={{
              fontSize: "clamp(1.1rem, 4vw, 2.2rem)",
              color: "#00f5d4",
              textShadow:
                "0 0 8px #00f5d4, 0 0 20px #00f5d4, 0 0 50px rgba(0,245,212,0.5)",
            }}
          >
            ALIREZA POURREZA
          </h1>
          <div className="font-mono text-sm tracking-[0.3em] text-[#4a6a8a] uppercase">
            Software Engineer · AI Engineer · DevOps Engineer
          </div>
        </div>

        <PixelFrame color="cyan" className="p-5">
          <div
            className="flex items-center gap-2 pb-3 mb-3"
            style={{ borderBottom: "1px solid rgba(0,245,212,0.2)" }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#f72585]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffb700]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f5d4]" />
            <span className="font-mono text-[10px] text-[#4a6a8a] ml-2">
              terminal — alireza@portfolio
            </span>
          </div>
          <Typewriter lines={lines} />
        </PixelFrame>

        <div className="flex flex-wrap justify-center gap-4">
          {[
            { label: "[ GITHUB ]", href: profile.github, color: "cyan" },
            { label: "[ LINKEDIN ]", href: profile.linkedin, color: "magenta" },
            {
              label: "[ EMAIL ]",
              href: `mailto:${profile.email}`,
              color: "amber",
            },
          ].map(({ label, href, color }) => {
            const tc = TC[color]
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="social-btn font-pixel text-[9px] px-4 py-2 tracking-widest"
                style={{
                  '--tc': tc,
                  border: `1px solid ${tc}`,
                  color: tc,
                  textShadow: `0 0 6px ${tc}`,
                } as React.CSSProperties}
              >
                {label}
              </a>
            )
          })}
        </div>

        <div className="text-center">
          <span className="font-mono text-[10px] text-[#2a4a6a] tracking-widest animate-bounce inline-block">
            ▼ SCROLL TO EXPLORE ▼
          </span>
        </div>
      </div>
    </section>
  )
}

// ─── Skills ────────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-20">
      <SectionBg src={img5} alt="Rainy neon city" opacity={0.4} />
      <div className="relative max-w-5xl mx-auto px-6" style={{ zIndex: 1 }}>
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
                <div
                  className="font-pixel text-[9px] mb-4 pb-2"
                  style={{
                    color: tc,
                    textShadow: `0 0 6px ${tc}`,
                    borderBottom: `1px solid ${tc}33`,
                  }}
                >
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="tag-hover font-mono text-[11px] px-2 py-1 cursor-default"
                      style={{ '--tc': tc } as React.CSSProperties}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </PixelFrame>
            )
          })}
        </div>

        {/* Education */}
        <div className="mt-6">
          <PixelFrame color="amber" className="p-5">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="font-pixel text-[9px] glow-amber mb-3">
                  ◈ EDUCATION · UNIVERSITY OF TORONTO
                </div>
                <div className="font-mono text-sm text-[#b8cfe0] font-bold">
                  {education.school}
                </div>
                <div className="font-mono text-xs text-[#4a6a8a] mt-1">
                  {education.degree}
                </div>
                <div className="font-mono text-xs text-[#4a6a8a]">
                  {education.specialization}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {education.scholarships.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] px-2 py-0.5"
                      style={{
                        border: "1px solid #ffb70055",
                        color: "#ffb700",
                        background: "rgba(255,183,0,0.05)",
                      }}
                    >
                      🏆 {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-pixel text-[9px] glow-amber">
                  {education.gpa}
                </div>
                <div className="font-mono text-xs text-[#4a6a8a] mt-1">
                  {education.deansList}
                </div>
                <div className="font-mono text-xs text-[#4a6a8a] mt-1">
                  {education.graduation}
                </div>
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
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="experience" className="relative overflow-hidden py-20">
      <SectionBg src={img2} alt="Cyberpunk street" opacity={0.36} />
      <div className="relative max-w-5xl mx-auto px-6" style={{ zIndex: 1 }}>
        <SectionHeader
          label="EXPERIENCE"
          sub="PROFESSIONAL EXPERIENCE · SELECT A ROLE TO VIEW DETAILS"
          color="magenta"
        />

        <div className="relative">
          <div
            className="absolute left-4 top-0 bottom-0 w-px hidden md:block"
            style={{
              background:
                "linear-gradient(180deg, #00f5d4, #f72585, #ffb700, #a855f7)",
            }}
          />

          <div className="space-y-4 md:pl-12">
            {experience.map((job, i) => {
              const tc = TC[job.color] ?? "#00f5d4"
              const isOpen = open === i
              const LogoComp = companyLogos[job.company]

              return (
                <div key={job.company} className="relative">
                  <div
                    className="absolute left-[-2.75rem] top-6 w-3 h-3 hidden md:block"
                    style={{
                      background: tc,
                      boxShadow: `0 0 8px ${tc}`,
                      transform: "rotate(45deg)",
                    }}
                  />
                  <PixelFrame
                    color={job.color}
                    className="p-5 cursor-pointer interactive-card"
                    onClick={() => setOpen(isOpen ? null : i)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        setOpen(isOpen ? null : i)
                      }
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div className="flex items-center gap-4">
                        {LogoComp && (
                          <div
                            className="shrink-0 flex items-center justify-center w-11 h-11"
                            style={{
                              background: "rgba(0,0,0,0.4)",
                              border: `1px solid ${tc}33`,
                            }}
                          >
                            <LogoComp />
                          </div>
                        )}
                        <div>
                          <div
                            className="font-pixel text-[9px] mb-1"
                            style={{ color: tc, textShadow: `0 0 6px ${tc}` }}
                          >
                            {job.company}
                          </div>
                          <div className="font-mono text-xs text-[#b8cfe0]">
                            {job.role}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className="font-mono text-[10px] px-2 py-0.5"
                          style={{ border: `1px solid ${tc}55`, color: tc }}
                        >
                          {job.period}
                        </span>

                        <span
                          className="font-mono text-[10px] tracking-wider px-3 py-1.5 transition-all duration-200"
                          style={{
                            color: tc,
                            border: `1px solid ${tc}66`,
                            background: `${tc}0d`,
                            boxShadow: isOpen ? `0 0 8px ${tc}22` : "none",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {isOpen ? "▾ HIDE DETAILS" : "▸ VIEW DETAILS"}
                        </span>
                      </div>
                    </div>

                    {isOpen && (
                      <div
                        className="mt-4 pt-4 space-y-2"
                        style={{ borderTop: `1px solid ${tc}33` }}
                      >
                        {job.bullets.map((b, bi) => (
                          <div key={bi} className="flex gap-3">
                            <span
                              className="font-mono text-xs shrink-0"
                              style={{ color: tc }}
                            >
                              ▸
                            </span>
                            <p className="font-mono text-xs text-[#8aaccc] leading-5">
                              {b}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </PixelFrame>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  const [filter, setFilter] =
    useState<"all" | "hackathon" | "personal" | "academic">("all")

  const categorize = (type: string) => {
    if (type.toLowerCase().includes("hackathon")) return "hackathon"

    if (
      type.toLowerCase().includes("group") ||
      type.toLowerCase().includes("competition") ||
      type.toLowerCase().includes("clash")
    )
      return "academic"

    return "personal"
  }

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => categorize(p.type) === filter)

  const cycleColors = ["cyan", "magenta", "amber", "purple"]

  const filterLabels: Array<{ key: typeof filter; label: string }> = [
    { key: "all", label: "ALL" },
    { key: "personal", label: "PERSONAL" },
    { key: "hackathon", label: "HACKATHONS" },
    { key: "academic", label: "ACADEMIC" },
  ]

  return (
    <section id="projects" className="relative overflow-hidden py-20">
      <SectionBg src={img3} alt="Neon city night" opacity={0.36} />

      <div className="relative max-w-5xl mx-auto px-6" style={{ zIndex: 1 }}>
        <SectionHeader
          label="PROJECTS"
          sub="SELECTED WORK · PROJECTS & TECHNICAL EXPLORATIONS"
          color="amber"
        />

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filterLabels.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className="font-pixel text-[8px] px-3 py-2 tracking-widest transition-all"
              style={{
                border: `1px solid ${filter === key ? "#ffb700" : "#1a2d45"}`,
                color: filter === key ? "#ffb700" : "#4a6a8a",
                background:
                  filter === key ? "rgba(255,183,0,0.1)" : "transparent",
                boxShadow:
                  filter === key ? "0 0 8px rgba(255,183,0,0.3)" : "none",
              }}
            >
              {label}
            </button>
          ))}

          <span className="font-mono text-xs text-[#2a4a6a] self-center ml-2">
            {filtered.length} projects
          </span>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((proj, i) => {
            const color = cycleColors[i % cycleColors.length]
            const tc = TC[color]
            const LogoComp = projectLogos[proj.name]

            return (
              <a
                key={proj.name}
                href={proj.github}
                target="_blank"
                rel="noreferrer"
                className="block group"
                aria-label={`View ${proj.name} on GitHub`}
              >
                <PixelFrame
                  color={color}
                  className="p-4 interactive-card flex flex-col"
                >
                  {/* Project header */}
                  <div className="flex items-center gap-3 mb-2">
                    {LogoComp && (
                      <div
                        className="shrink-0 flex items-center justify-center w-10 h-10"
                        style={{
                          background: "rgba(0,0,0,0.4)",
                          border: `1px solid ${tc}33`,
                        }}
                      >
                        <LogoComp />
                      </div>
                    )}

                    <div>
                      <div
                        className="font-pixel text-[8px]"
                        style={{
                          color: tc,
                          textShadow: `0 0 6px ${tc}`,
                        }}
                      >
                        {proj.name}
                      </div>

                      <div
                        className="font-mono text-[10px] mt-0.5"
                        style={{ color: `${tc}88` }}
                      >
                        {proj.type}
                      </div>
                    </div>
                  </div>

                  {/* Period */}
                  <div
                    className="font-mono text-[10px] mb-3"
                    style={{ color: "#2a4a6a" }}
                  >
                    {proj.period}
                  </div>

                  {/* Description */}
                  <p className="font-mono text-[11px] text-[#6a8caa] leading-5 flex-1 mb-3">
                    {proj.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] px-1.5 py-0.5"
                        style={{
                          border: `1px solid ${tc}33`,
                          color: tc,
                          background: `${tc}08`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* GitHub link */}
                  <div
                    className="mt-4 pt-3"
                    style={{
                      borderTop: `1px solid ${tc}22`,
                    }}
                  >
                    <div
                      className="inline-flex items-center gap-2 font-mono text-[10px] px-3 py-2 transition-all duration-200 group-hover:translate-x-1"
                      style={{
                        border: `1px solid ${tc}66`,
                        color: tc,
                        background: `${tc}08`,
                        textShadow: `0 0 5px ${tc}`,
                      }}
                    >
                      <span>↗</span>
                      <span>VIEW PROJECT ON GITHUB</span>
                    </div>
                  </div>
                </PixelFrame>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID

function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  )
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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

  const focusStyle = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = "#a855f7"
      e.currentTarget.style.boxShadow = "0 0 10px rgba(168,85,247,0.35)"
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = "#1a2d45"
      e.currentTarget.style.boxShadow = "none"
    },
  }

  const baseInput: React.CSSProperties = {
    width: "100%",
    background: "rgba(0,0,0,0.55)",
    border: "1px solid #1a2d45",
    color: "#b8cfe0",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.8rem",
    padding: "12px 14px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  }

  return (
    <section id="contact" className="relative overflow-hidden py-20 pb-32">
      <SectionBg src={img1} alt="Dungeon pixel scene" opacity={0.44} />

      <div className="relative max-w-2xl mx-auto px-6" style={{ zIndex: 1 }}>
        <SectionHeader
          label="CONTACT"
          sub="GET IN TOUCH · OPEN TO OPPORTUNITIES & COLLABORATION"
          color="purple"
        />

        <PixelFrame color="purple" className="p-7">
          <div
            className="font-pixel text-[9px] mb-1"
            style={{ color: "#a855f7", textShadow: "0 0 8px #a855f7" }}
          >
            ◈ SEND A MESSAGE
          </div>
          <p className="font-mono text-xs text-[#4a6a8a] mb-7">
            I'm always happy to connect about internships, co-ops, software
            development opportunities, or interesting technical projects.
          </p>

          {status === "sent" ? (
            <div className="text-center py-12 space-y-4">
              <div className="font-pixel text-[10px] glow-cyan">
                [ MESSAGE SENT ✓ ]
              </div>
              <p className="font-mono text-xs text-[#4a6a8a]">
                Thanks for reaching out. I'll get back to you soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="font-pixel text-[8px] px-4 py-2 mt-4 transition-all"
                style={{
                  border: "1px solid #00f5d4",
                  color: "#00f5d4",
                  background: "transparent",
                }}
              >
                [ SEND ANOTHER MESSAGE ]
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="font-pixel text-[8px] block mb-2"
                  style={{ color: "#a855f7" }}
                >
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
                  style={baseInput}
                  {...focusStyle}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="font-pixel text-[8px] block mb-2"
                  style={{ color: "#a855f7" }}
                >
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
                  placeholder="What's your email address?"
                  style={baseInput}
                  {...focusStyle}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="font-pixel text-[8px] block mb-2"
                  style={{ color: "#a855f7" }}
                >
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
                  style={{ ...baseInput, resize: "vertical", minHeight: 130 }}
                  {...focusStyle}
                />
              </div>

              {status === "error" && (
                <p className="font-mono text-xs text-[#f72585]">
                  ▸ Something went wrong while sending your message. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="font-pixel text-[9px] px-6 py-3 w-full tracking-widest transition-all"
                style={{
                  border: "1px solid #a855f7",
                  color: "#a855f7",
                  background:
                    status === "sending"
                      ? "rgba(168,85,247,0.18)"
                      : "rgba(168,85,247,0.08)",
                  boxShadow: "0 0 10px rgba(168,85,247,0.2)",
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => {
                  if (status !== "sending")
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(168,85,247,0.22)"
                }}
                onMouseLeave={(e) => {
                  ; (e.currentTarget as HTMLButtonElement).style.background =
                    status === "sending"
                      ? "rgba(168,85,247,0.18)"
                      : "rgba(168,85,247,0.08)"
                }}
              >
                {status === "sending"
                  ? "[ SENDING... ]"
                  : "[ SEND MESSAGE → ]"}
              </button>
            </form>
          )}
        </PixelFrame>

        <div className="text-center mt-12">
          <div
            className="font-pixel text-[8px] inline-block px-4 py-2"
            style={{ color: "#2a4a6a", border: "1px solid #1a2d45" }}
          >
            © 2026 ALIREZA POURREZA · BUILT WITH REACT + VITE
          </div>
        </div>
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
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full"
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
        <MusicWidget />
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </div>
  )
}
