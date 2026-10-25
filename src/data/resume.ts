export type Accent = "cyan" | "magenta" | "amber" | "purple" | "blue"

export const profile = {
  name: "Alireza Pourreza",
  title: "CS @ University of Toronto",
  subtitle: "Software Developer | AI & Systems Engineer",
  email: "alireza.pourreza@mail.utoronto.ca",
  linkedin: "https://www.linkedin.com/in/alireza-pourrezaaa/",
  github: "https://github.com/AlirezaPrz",
  portfolio: "https://alirezaprz.github.io/",
  resume: `${import.meta.env.BASE_URL}Alireza-Pourreza-Resume.pdf`,
  gpa: "3.98 / 4.00",
  graduation: "June 2029",
}

export const skills: Array<{ category: string; color: Accent; items: string[] }> = [
  {
    category: "Programming",
    color: "cyan",
    items: [
      "Python",
      "C",
      "C++",
      "Java",
      "JavaScript",
      "TypeScript",
      "SQL",
      "Bash",
      "Shell",
      "HTML/CSS",
    ],
  },
  {
    category: "Systems & Backend",
    color: "magenta",
    items: [
      "Spring Framework",
      "Spring Boot",
      "REST APIs",
      "FastAPI",
      "Apache Tomcat",
      "Microsoft Entra ID (Azure AD)",
      "JWT Authentication",
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "MongoDB",
      "Supabase",
      "Firebase",
      "Raspberry Pi",
      "Linux",
      "Pydantic",
      "Caddy",
      "Nginx",
    ],
  },
  {
    category: "Tools & Platforms",
    color: "amber",
    items: [
      "Git / GitHub",
      "CI/CD",
      "AWS",
      "Azure",
      "GCP",
      "Azure DevOps",
      "Vertex AI",
      "Jira",
      "OpenAI & Gemini APIs",
      "React.js",
      "Tailwind",
      "n8n",
      "Figma",
      "SharePoint",
      "ALM",
      "Power BI",
      "Bitbucket",
      "MS Teams",
      "MS Copilot",
      "pytest",
    ],
  },
  {
    category: "Data & ML",
    color: "purple",
    items: [
      "NumPy",
      "Pandas",
      "scikit-learn",
      "TensorFlow",
      "PyTorch",
      "Keras",
      "Deep Neural Networks",
      "Jupyter Notebooks",
      "Ollama (local LLMs)",
      "Whisper / whisper.cpp",
    ],
  },
]

export const education = {
  school: "University of Toronto",
  degree: "Honours B.Sc. in Computer Science (Co-op)",
  specialization: "Computer Science Specialist",
  concentrations: ["Artificial Intelligence", "Modelling/Simulations"],
  gpa: "3.98 / 4.00",
  deansList: "2025 Dean's List",
  graduation: "Expected June 2029",
  scholarships: [
    "President's Scholar Award of Excellence",
    "International Scholar Award",
    "Michael H Lawee Award",
  ],
  coursework: [
    "Data Structures & Algorithms",
    "Software Design",
    "Computer Organization & Programming",
    "Combinatorics",
    "Machine Learning",
    "Artificial Intelligence",
    "Object-Oriented Programming",
    "Statistics & Applications",
  ],
}

export const experience: Array<{
  company: string
  role: string
  period: string
  color: Accent
  bullets: string[]
}> = [
  {
    company: "CREATE UofT",
    role: "Associate of Technology",
    period: "Oct 2026 – Present",
    color: "cyan",
    bullets: ["Working on making the CREATE Code Clash competition."],
  },
  {
    company: "University of Toronto",
    role: "Teaching Assistant",
    period: "Sep 2026 – Present",
    color: "blue",
    bullets: [
      "Currently TAing Calculus I (MATA30) and Intro to Theory of Computation (CSCB36).",
    ],
  },
  {
    company: "The Association of Mathematical and Computer Science Students (AMACSS)",
    role: "Director of Special Events",
    period: "Sep 2026 – Present",
    color: "amber",
    bullets: ["Currently working on cool events for the UTSC CMS community."],
  },
  {
    company: "Ontario Public Service (OPS)",
    role: "Software Developer Intern",
    period: "Jan 2026 – Aug 2026",
    color: "cyan",
    bullets: [
      "Built enterprise web applications with Java, Spring Boot, JSP, and JavaScript, deployed on Azure VMs with Tomcat and Nginx in an Agile Scrum environment.",
      "Designed and implemented an ad-hoc report generator with dynamic filtering and PDF/Excel export, collaborating with managers and architects from Figma prototype through production deployment.",
      "Built core features of a Fit-Gap Assessment Platform, including an admin portal, dashboards, database design, and session management, replacing a manual Excel-based workflow.",
      "Implemented Microsoft Entra ID authentication, designed CI/CD pipelines in Azure DevOps, and configured Tomcat 10, Azure VMs, and Nginx to automate deployments across DEV, UAT, and PROD environments.",
      "Delivered numerous production enhancements and bug fixes while collaborating with project owners, architects, managers, and directors to develop scalable enterprise solutions.",
      "Contributed to a digital transformation initiative that the director estimated would save approximately $250,000 and one year of implementation effort, while mentoring and onboarding new software developer co-op students.",
    ],
  },
  {
    company: "Google Developer Group (GDG)",
    role: "Academics Director",
    period: "Jun 2025 – Present",
    color: "magenta",
    bullets: [
      "Co-led an Agent AI codelab on Vertex AI for 30+ attendees, presenting a live demo of my Expense Tracker Agent and providing 1:1 support on agent setup and tool integration; ensured everyone left with a working agent.",
      "Engaged 20+ students by co-presenting LeetCode strategy, time complexity, data-structure selection, and problem-pattern taxonomy, tasked with delivering the technical segment in GDG's Resume & Interview Workshop.",
      "Projected 300+ attendees by coordinating speakers, venue, and registration workflows, tasked with operations for the campus-wide Build with AI event.",
    ],
  },
  {
    company: "OutlierAI",
    role: "Prompt Engineer, Reviewer",
    period: "Sep 2024 – Feb 2025",
    color: "amber",
    bullets: [
      "Created undergrad/grad-level math prompts across specified topics and difficulty bands, including adversarial challenges to stress-test reasoning and surface systematic failure modes for evaluation.",
      "Promoted to Reviewer; peer-reviewed colleagues' tasks and partnered with the dev team to refine reasoning prompts and rubrics, raising the quality bar and accelerating iteration cycles.",
    ],
  },
  {
    company: "Sampad (National Organization for Development of Exceptional Talents)",
    role: "Math Tutor, Organizer & Manager of Competitive Programming Contests",
    period: "Nov 2021 – Mar 2023",
    color: "purple",
    bullets: [
      "Delivered 1 Olympiad Gold (Top 12) & 2 Silvers (Top 24) by designing individualized lesson plans and high-yield drills, tasked with elevating top performers in High School cohorts.",
      "Grew participation 257% by organizing and promoting contests and implementing sign-up funnels + automated standings, tasked with rebuilding engagement in the program.",
    ],
  },
]

export type ProjectCategory = "personal" | "hackathon" | "coursework"

export const projects: Array<{
  name: string
  type: string
  category: ProjectCategory
  period: string
  github?: string
  featured?: boolean
  tags: string[]
  description: string
  highlights?: string[]
}> = [
  {
    name: "AirSOAP",
    type: "Hackathon Project",
    category: "hackathon",
    period: "Oct 2026",
    github: "https://github.com/AlirezaPrz/AirSOAP",
    featured: true,
    tags: ["Raspberry Pi 5", "whisper.cpp", "Ollama", "Qwen 2.5 3B", "FastAPI", "React", "TypeScript", "Tailwind", "Caddy"],
    description:
      "An offline AI documentation assistant that turns doctor–patient consultations into reviewable SOAP notes with no cloud or internet dependency. Whisper.cpp speech-to-text, a Qwen 2.5 3B LLM (Ollama), a FastAPI backend and a React/TypeScript/Tailwind web app run entirely on a 4 GB Raspberry Pi 5.",
    highlights: [
      "Cut live-transcript lag from 20+ seconds behind the speaker to ~4 seconds after each pause (8% word error rate vs 6% for a larger model) by replacing a sliding window with pause-based audio segmentation, benchmarked on the actual Pi.",
      "Fit speech recognition and LLM inference within 4 GB of RAM by scheduling recording, transcription and each AI task to take turns and unloading whichever model was idle.",
      "Reduced hallucination risk with strict format validation, server-verified transcript quotes for every suggested condition, \"Not documented\" for anything the clinician never stated, and flags on numbers absent from the transcript.",
      "Protected patient privacy by keeping transcripts and notes in memory only, deleting audio once transcribed, withholding identifiers from the LLM, and securing access with Argon2-hashed accounts, rate limiting and HTTPS via Caddy.",
    ],
  },
  {
    name: "New Personal Portfolio",
    type: "Personal Project",
    category: "personal",
    period: "Aug 2026",
    github: "https://github.com/AlirezaPrz/AlirezaPrz.github.io",
    tags: ["React", "Vite", "Tailwind", "GitHub Actions", "Formspree", "Spotify"],
    description:
      "This site. A retro-inspired developer interface built with React, Vite and Tailwind CSS: expandable experience cards, filterable project cards, organization- and project-specific SVG logos, an embedded Spotify player and a Formspree contact form, deployed to GitHub Pages by a GitHub Actions CI/CD pipeline.",
  },
  {
    name: "Personal Portfolio",
    type: "Personal Project",
    category: "personal",
    period: "Oct 2025 – Jan 2026",
    github: "https://github.com/AlirezaPrz/AlirezaPrz.github.io",
    tags: ["React", "Vite", "Tailwind", "GCP Vertex AI"],
    description:
      "Shipped a production-ready personal site on GitHub Pages using React + Vite and utility-first Tailwind CSS, optimizing for fast loads and clean component structure. Designed mobile-first responsive layouts with semantic HTML and created a GCP Vertex AI chatbot that greets the user and answers questions based on my resume.",
  },
  {
    name: "Smart Air",
    type: "Software Design Group Project",
    category: "coursework",
    period: "Nov 2025 – Dec 2025",
    github: "https://github.com/AlirezaPrz/Smart-Air-Group67",
    tags: ["Android", "Java", "Firebase", "MVP Architecture", "JUnit", "Mockito", "Jira"],
    description:
      "Built SmartAir, a multi-screen asthma-management Android app in Java for parents and clinicians, backed by Firebase. Implemented medication schedules, daily symptom check-ins, adherence summaries, and 7-day/30-day trends; refactored the login flow into Model–View–Presenter architecture and wrote Mockito-based JUnit tests while collaborating through Scrum sprints, Jira, Git feature branches, and pull requests.",
  },
  {
    name: "Expense Tracker Agent",
    type: "Personal Project",
    category: "personal",
    period: "Nov 2025",
    github: "https://github.com/AlirezaPrz/expenses-agent",
    tags: ["Vertex AI", "FastAPI", "GCP", "Gemini", "Firestore"],
    description:
      "Built a chat-style Expense Tracker Agent using Vertex AI Agent Builder that turns natural-language messages and receipt text into structured expense records and spending summaries. Designed a FastAPI ingest service on Google Cloud Run using Gemini JSON-schema parsing to extract merchants, totals, categories, and timestamps, then persists normalized transactions to Cloud Firestore. Authored agent tools and orchestration logic for backend API calls.",
  },
  {
    name: "Shark Finder Telegram Bot",
    type: "Personal Project",
    category: "personal",
    period: "Nov 2025",
    github: "https://github.com/AlirezaPrz/SharkFinder-n8n-TelegramBot",
    tags: ["n8n", "JavaScript", "Google Sheets", "AI Agents"],
    description:
      "Built an end-to-end Telegram intake → parse → store → match pipeline in n8n, onboarding businesses and investors and persisting structured profiles to Google Sheets. Engineered a JavaScript ranking engine scoring sector, stage, capital, and location (0–100) and returning top matches with succinct rationales.",
  },
  {
    name: "Shark Finder",
    type: "Hackathon Project",
    category: "hackathon",
    period: "Oct 2025",
    github: "https://github.com/AlirezaPrz/shark-finder",
    tags: ["FastAPI", "Supabase", "PostgreSQL", "Whisper", "Gemini"],
    description:
      "Built a FastAPI backend with Supabase/Postgres and normalized investor/startup schemas, enabling SQL-based filtering and matching across sector, stage, and ticket size. Implemented an end-to-end pipeline that ingests pitch audio, runs Whisper + Gemini to produce structured features, and generates ranked, explainable matches.",
  },
  {
    name: "Battleship Server",
    type: "Software Tools & Systems Programming Project",
    category: "coursework",
    period: "Jul 2025 – Aug 2025",
    github:
      "https://github.com/AlirezaPrz/Multiplayer-Online-Asynchronous-Battleship",
    tags: ["C", "TCP Sockets", "epoll", "Multiplayer"],
    description:
      "Designed and deployed a multiplayer Battleship server in C using TCP sockets and epoll-based I/O multiplexing to handle many concurrent clients without blocking. Implemented full game mechanics, robust client state tracking with linked lists, and edge-case testing for malformed requests and slow clients.",
  },
  {
    name: "Chess Bot",
    type: "Personal Project",
    category: "personal",
    period: "Jul 2025 – Aug 2025",
    github: "https://github.com/AlirezaPrz/ChessAI",
    tags: ["Python", "Alpha-Beta Pruning", "TensorFlow", "OpenAI Gym"],
    description:
      "Developed ~1500 ELO Hard mode with sub-10s response using alpha-beta-pruned minimax, phase-aware evaluation, and strategic move ordering. Built Easy mode with an OpenAI Gym environment and TensorFlow/Keras DQN, plus a Pygame UI with animations, move highlighting, and undo/restart.",
  },
  {
    name: "Chess & Tic-Tac-Toe Bot",
    type: "UofT Code Clash Competition",
    category: "hackathon",
    period: "Jul 2025",
    github: "https://github.com/AlirezaPrz/Code-Clash-2025-Chess-bot",
    tags: ["C++", "Minimax", "Competitive Programming"],
    description:
      "Won 1st-place Best Chess Bot & sub-5s moves by engineering ability-aware minimax chess and Tic-Tac-Toe bots in C++.",
  },
  {
    name: "Fitness Tracker",
    type: "Personal Project",
    category: "personal",
    period: "Mar 2025 – Apr 2025",
    github: "https://github.com/AlirezaPrz/Fitness-Tracker",
    tags: ["Python", "KNN", "PCA", "Peak Detection"],
    description:
      "Built a real-time lift-identification pipeline using low-pass filtering and PCA features with KNN, random forest, and neural-network classifiers. Designed a peak-detection algorithm with temporal thresholds and multi-axis fusion for consistent rep counts.",
  },
]
