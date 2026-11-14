/**
 * Shapes for everything in /data. Edit the data files, not the components.
 *
 * Dates are written as "YYYY-MM" (or "YYYY-MM-DD") strings so they sort and
 * format consistently. Use "present" for ongoing things.
 */

export type MonthString = `${number}-${number}` | `${number}-${number}-${number}`

export interface ImageRef {
  /** Path under /public (e.g. "/images/me.jpg") or a full URL */
  src: string
  /** Describe what's in the picture for screen-reader users */
  alt: string
}

export interface Site {
  name: string
  firstName: string
  /** One line used in metadata and the OpenGraph image */
  tagline: string
  /** Full description used for search engines */
  description: string
  school: string
  program: string
  /** e.g. "third-year" — shows up in "I'm a ___ student" */
  year: string
  graduation: string
  photo: ImageRef & { caption: string }
  links: {
    email: string
    linkedin: string
    github: string
    letterboxd: string
    lastfm: string
    /** Path to the downloadable resume in /public */
    resume: string
  }
}

export interface Experience {
  company: string
  role: string
  start: MonthString
  end: MonthString | "present"
  /** 1–2 lines, first person, casual */
  summary: string
  url?: string
  /** Logo in /public/images/logos. Leave out and a monogram is drawn instead. */
  logo?: ImageRef
  /** Shown in the monogram when there's no logo. Defaults to initials. */
  monogram?: string
}

export type ProjectKind = "Hackathon" | "Personal" | "Course" | "Teaching"

export interface Project {
  slug: string
  title: string
  oneLiner: string
  date: MonthString
  kind: ProjectKind
  stack: string[]
  links: { github?: string; demo?: string; demoLabel?: string }
  /** Featured projects get the big card with cover and Show More. */
  featured?: boolean
  /** Cover image in /public/images/projects. Leave out for a typographic cover. */
  cover?: ImageRef
  details?: {
    project: string
    technical: string[]
    thoughts: string
  }
}

export interface FavoriteFilm {
  title: string
  year?: number
  /** Letterboxd poster URL (a.ltrbxd.com) or a file in /public */
  poster?: string
  url?: string
}

export interface Lift {
  name: "Squat" | "Bench" | "Deadlift"
  /** Best single, in pounds. Kilograms are calculated for you. */
  lb: number
  /** When you hit it, "YYYY-MM" */
  date?: MonthString
}

export interface TrainingDay {
  day: string
  focus: string
  note?: string
}
