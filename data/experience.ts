import type { Experience } from "./types"

/**
 * "Past and Present" on the About page, newest first.
 *
 * To add a logo: drop a square PNG/SVG in /public/images/logos and add
 *   logo: { src: "/images/logos/create.png", alt: "CREATE UofT logo" }
 * Without one, a small monogram square is drawn instead.
 */
export const experience: Experience[] = [
  {
    company: "CREATE UofT",
    role: "Software Engineer",
    start: "2026-10",
    end: "present",
    monogram: "CR",
    summary:
      "Building a LeetCode-style arena where Code Clash players submit bots and watch them fight, plus the game for Winter 2027's Code Clash. I won it in 2025, so no pressure.",
  },
  {
    company: "University of Toronto",
    role: "Teaching Assistant",
    start: "2026-09",
    end: "present",
    monogram: "UT",
    summary:
      "Running MATA30 calculus tutorials for 30 students and grading CSCB36 (theory of computation). I also built a regex/DFA checker so students get feedback before office hours.",
  },
  {
    company: "AMACSS",
    role: "Director of Special Events",
    start: "2026-09",
    end: "present",
    monogram: "AM",
    summary: "Planning events for the UTSC math and CS community. The fun kind, I promise.",
  },
  {
    company: "Ontario Public Service",
    role: "Software Developer Intern",
    start: "2026-01",
    end: "2026-08",
    monogram: "OPS",
    summary:
      "Shipped Java and Spring Boot apps on Azure: a report generator, a fit-gap assessment platform, Entra ID sign-in, and the CI/CD that deployed it all.",
  },
  {
    company: "Google Developer Group",
    role: "Academics Director",
    start: "2025-06",
    end: "present",
    monogram: "GDG",
    summary:
      "Co-led a Vertex AI agents codelab for 30+ people and taught the technical half of our resume and interview workshop.",
  },
  {
    company: "OutlierAI",
    role: "Prompt Engineer, then Reviewer",
    start: "2024-09",
    end: "2025-02",
    monogram: "OA",
    summary:
      "Wrote adversarial math prompts to break LLM reasoning, then got promoted to reviewing everyone else's.",
  },
  {
    company: "Sampad",
    role: "Organizer, Competitive Programming Contests",
    start: "2021-11",
    end: "2023-01",
    monogram: "SP",
    summary:
      "Ran programming contests for high-school students and grew participation 257% with better sign-ups and automated standings.",
  },
]
