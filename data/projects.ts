import type { Project } from "./types"

/**
 * Projects page, newest first.
 *
 * featured: true → big entry with cover image, Show More, and buttons.
 * Everything else → compact rows under "Also built".
 *
 * Covers: drop a 16:9 image in /public/images/projects and add
 *   cover: { src: "/images/projects/airsoap.jpg", alt: "..." }
 * Without one, a typographic cover is drawn from the title.
 *
 * TODO(you): the "thoughts" paragraphs are drafts in your voice. Rewrite them.
 */
export const projects: Project[] = [
  {
    slug: "airsoap",
    title: "AirSOAP",
    oneLiner: "An offline AI scribe that turns doctor–patient conversations into SOAP notes on a 4 GB Raspberry Pi.",
    date: "2026-10",
    kind: "Hackathon",
    featured: true,
    stack: ["Raspberry Pi 5", "whisper.cpp", "Ollama", "Qwen 2.5 3B", "FastAPI", "React", "TypeScript", "Caddy"],
    links: { github: "https://github.com/AlirezaPrz/AirSOAP" },
    details: {
      project:
        "Clinicians spend a ridiculous amount of time writing notes. AirSOAP listens to a consultation, transcribes it live, and drafts a reviewable SOAP note. There's no cloud and no internet, so patient audio never leaves the room.",
      technical: [
        "whisper.cpp speech-to-text, a Qwen 2.5 3B model through Ollama, a FastAPI backend, and a React/TypeScript/Tailwind UI, all on one 4 GB Pi 5.",
        "Swapped a sliding window for pause-based audio segmentation. Transcript lag dropped from 20+ seconds to about 4 seconds after each pause, at an 8% word error rate.",
        "Fit speech recognition and LLM inference in 4 GB by making each task take turns and unloading whichever model was idle.",
        "Guarded against hallucination: strict output validation, server-verified transcript quotes for every suggested condition, and \"Not documented\" for anything the clinician never said.",
        "Transcripts live in memory only, audio is deleted once transcribed, identifiers never reach the LLM, and access is behind Argon2-hashed accounts and HTTPS via Caddy.",
      ],
      thoughts:
        "Everything about this project was a negotiation with 4 GB of RAM. I learned more from benchmarking on the actual Pi than from any amount of reasoning about it on my laptop.",
    },
  },
  {
    slug: "regular-language-checker",
    title: "Regular Language Checker",
    oneLiner: "A free study tool for U of T's CSCB36 that checks regex, DFA, and NFA answers against any regular language.",
    date: "2026-10",
    kind: "Teaching",
    stack: ["TypeScript", "Automata theory", "Parsers", "Zero dependencies"],
    links: { github: "https://github.com/AlirezaPrz/RegLab" },
    details: {
      project:
        "As a TA, I kept seeing students wait until office hours to find out their DFA was wrong. So I built a checker that tells them how it's wrong. It shows the shortest string their answer gets wrong, and hints only give away the full solution once you ask for it.",
      technical: [
        "An automata engine from scratch, with no runtime dependencies: Thompson's construction, subset construction, product construction, Moore partition refinement, and DFA-to-regex by state elimination.",
        "Finds the shortest counterexample with a BFS over state pairs, and explains wrong DFAs using Myhill–Nerode equivalence classes.",
        "Recursive-descent parsers for the course's regex notation and a language-description syntax (e.g. #_ab(w) = 1, ends in aa). Errors point to the exact character.",
        "Generates solution regexes by state elimination with algebraic simplification, checked for correctness on 300 random languages.",
      ],
      thoughts:
        "It turns out the hardest part of a teaching tool isn't the algorithm. It's deciding how much to tell someone so they still get to have the 'oh!' moment themselves.",
    },
  },
  {
    slug: "code-clash-bot",
    title: "Code Clash Chess Bot",
    oneLiner: "The bot that won UofT's Code Clash against 20 teams: fog-of-war chess with one-time abilities.",
    date: "2025-07",
    kind: "Hackathon",
    stack: ["C++", "Minimax", "Alpha-beta", "Game AI"],
    links: { github: "https://github.com/AlirezaPrz/Code-Clash-2025-Chess-bot" },
    details: {
      project:
        "Code Clash is a bot competition: everyone gets the same strange game and writes a bot to play it. In 2025 it was a chess variant with fog of war and one-time abilities (Fog, Shield, Pawn Reset), plus a 10×10 five-in-a-row side game.",
      technical: [
        "Minimax lookahead that weighs using an ability against regular moves, not as an afterthought.",
        "A five-in-a-row bot with iterative-deepening alpha-beta search and pattern-based evaluation.",
        "Moves in under 5 seconds under competition time limits.",
      ],
      thoughts:
        "Winning it is how I ended up building next year's game at CREATE UofT, which is a very funny way for a hobby to escalate.",
    },
  },
  {
    slug: "expense-tracker-agent",
    title: "Expense Tracker Agent",
    oneLiner: "A chat agent that turns \"spent $14 on ramen\" and receipt text into structured expenses and summaries.",
    date: "2025-11",
    kind: "Personal",
    featured: true,
    stack: ["Vertex AI", "Gemini", "FastAPI", "Cloud Run", "Firestore"],
    links: { github: "https://github.com/AlirezaPrz/expenses-agent" },
    details: {
      project:
        "I wanted to track spending without opening a spreadsheet. So I built an agent you just talk to, and it files everything for you. I later demoed it live at a GDG codelab for 30+ people.",
      technical: [
        "Built on Vertex AI Agent Builder, with tools the agent decides when to call.",
        "A FastAPI ingest service on Cloud Run uses Gemini JSON-schema parsing to pull out merchant, total, category, and timestamp.",
        "Normalized transactions are persisted to Cloud Firestore for summaries.",
      ],
      thoughts:
        "Demoing an LLM agent live in front of 30 people is a great way to find out which of your edge cases you didn't handle.",
    },
  },
  {
    slug: "shark-finder",
    title: "Shark Finder",
    oneLiner: "Pitch audio in, ranked and explainable investor matches out. Basically Dragons' Den matchmaking.",
    date: "2025-10",
    kind: "Hackathon",
    featured: true,
    stack: ["FastAPI", "Supabase", "Postgres", "Whisper", "Gemini"],
    links: { github: "https://github.com/AlirezaPrz/shark-finder" },
    details: {
      project:
        "Founders record their pitch, and Shark Finder tells them which investors actually fit by sector, stage, and ticket size, with a reason for every match. It's a hackathon build, so the goal was a working end-to-end pipeline in a weekend.",
      technical: [
        "A FastAPI backend on Supabase/Postgres with normalized investor and startup schemas, so matching is plain SQL filtering on sector, stage, and ticket size.",
        "An end-to-end pipeline: pitch audio goes through Whisper for transcription, then Gemini pulls out structured features.",
        "Ranked, explainable matches, with validation on noisy speech-to-text input before anything hits the database.",
      ],
      thoughts:
        "Speech-to-text output is messy in ways you don't expect until you test with real pitches. Most of the work was making the pipeline tolerant of that mess.",
    },
  },
  {
    slug: "shark-finder-bot",
    title: "Shark Finder Telegram Bot",
    oneLiner: "The same matchmaking idea as a Telegram intake → parse → match pipeline in n8n.",
    date: "2025-11",
    kind: "Personal",
    stack: ["n8n", "JavaScript", "Google Sheets"],
    links: { github: "https://github.com/AlirezaPrz/SharkFinder-n8n-TelegramBot" },
  },
  {
    slug: "smart-air",
    title: "Smart Air",
    oneLiner: "An Android app that helps parents and clinicians track a child's asthma symptoms, medications, and trends.",
    date: "2025-11",
    kind: "Course",
    featured: true,
    stack: ["Android", "Java", "Firebase", "MVP", "JUnit", "Mockito", "Jira"],
    links: { github: "https://github.com/AlirezaPrz/Smart-Air-Group67" },
    details: {
      project:
        "A team project for Software Design: a multi-screen Android app for managing pediatric asthma. Parents log daily symptoms and doses, and clinicians see whether the child is actually sticking to the plan.",
      technical: [
        "Java on Android with Firebase storing profiles, controller/rescue medication schedules, daily symptom check-ins, and logs.",
        "Logic that compares scheduled and logged controller doses, computes adherence percentages, and generates 7-day and 30-day symptom and rescue-use trends.",
        "Refactored the login flow into Model–View–Presenter and wrote Mockito-based JUnit tests for the presenters.",
        "Ran 2–3 Scrum sprints with Jira backlogs, stand-ups, Git feature branches, and pull requests.",
      ],
      thoughts:
        "The MVP refactor was the moment testing clicked for me. Once the logic stopped living inside Android views, writing tests for it went from painful to almost easy.",
    },
  },
  {
    slug: "battleship-server",
    title: "Battleship Server",
    oneLiner: "A multiplayer Battleship server in C with TCP sockets and epoll.",
    date: "2025-07",
    kind: "Course",
    stack: ["C", "TCP", "epoll"],
    links: { github: "https://github.com/AlirezaPrz/Multiplayer-Online-Asynchronous-Battleship" },
  },
  {
    slug: "chess-bot",
    title: "Chess Bot",
    oneLiner: "A ~1500 Elo chess engine with a hard mode that searches and an easy mode that learned to play.",
    date: "2025-07",
    kind: "Personal",
    featured: true,
    stack: ["Python", "Minimax", "Alpha-beta", "TensorFlow", "OpenAI Gym", "Pygame"],
    links: { github: "https://github.com/AlirezaPrz/ChessAI" },
    details: {
      project:
        "A self-contained chess engine with two personalities. Hard mode plays around 1500 Elo and answers in under 10 seconds. Easy mode is a reinforcement-learning agent that's beatable on purpose.",
      technical: [
        "Hard mode: alpha-beta-pruned minimax with phase-aware evaluation (openings, middlegames, and endgames are scored differently) and strategic move ordering to prune more of the tree.",
        "Easy mode: an OpenAI Gym environment with a DQN trained in TensorFlow/Keras.",
        "A Pygame UI with animations, move highlighting, and undo/restart, which also made playtesting and debugging much faster.",
      ],
      thoughts:
        "This is the project that got me into game-playing search, and it's a straight line from here to winning Code Clash.",
    },
  },
  {
    slug: "fitness-tracker",
    title: "Fitness Tracker",
    oneLiner: "Identifies lifts and counts reps from accelerometer data. Yes, the gym leaks into my code too.",
    date: "2025-03",
    kind: "Personal",
    stack: ["Python", "scikit-learn", "Signal processing"],
    links: { github: "https://github.com/AlirezaPrz/Fitness-Tracker" },
  },
]
