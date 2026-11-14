import type { Lift, TrainingDay } from "./types"

/** Best singles in pounds. The site shows kilograms, with pounds on hover. */
export const lifts: Lift[] = [
  { name: "Squat", lb: 385 },
  { name: "Bench", lb: 255 },
  { name: "Deadlift", lb: 485 },
]

/** Weekly split, Monday first. Use "Rest" as the focus for rest days. */
export const split: TrainingDay[] = [
  { day: "Mon", focus: "Upper" },
  { day: "Tue", focus: "Lower", note: "quad focus" },
  { day: "Wed", focus: "Rest" },
  { day: "Thu", focus: "Push" },
  { day: "Fri", focus: "Pull" },
  { day: "Sat", focus: "Legs", note: "hamstring focus" },
  { day: "Sun", focus: "Rest" },
]

/** TODO(you): these two paragraphs are drafts. Make them yours. */
export const philosophy: string[] = [
  "Somewhere between powerlifting and bodybuilding: heavy work on the big three, then enough volume that I don't look like I only do the big three.",
  "Progressive overload, sleep, and protein. The boring stuff works, which is unfortunate for someone who likes optimizing things.",
]
