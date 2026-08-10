export const profile = {
  name: "Alireza Pourreza",
  title: "CS @ University of Toronto",
  subtitle: "Software Developer | AI & Systems Engineer",
  email: "alireza.pourreza@mail.utoronto.ca",
  linkedin: "https://www.linkedin.com/in/alireza-pourrezaaa/",
  github: "https://github.com/AlirezaPrz",
  portfolio: "https://alirezaprz.github.io/",
  gpa: "3.98 / 4.00",
  graduation: "June 2029",
}

export const skills = [
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
      "MongoDB",
      "Supabase",
      "Firebase",
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
      "React.js",
      "Tailwind",
      "Figma",
      "SharePoint",
      "ALM",
      "Power BI",
      "BitBucket",
      "MS Teams",
      "MS Copilot",
      "Nginx",
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
    ],
  },
]

export const education = {
  school: "University of Toronto",
  degree: "Honours B.Sc. in Computer Science (Co-op)",
  specialization: "Computer Science Specialist",
  concentrations: ["Artificial Intelligence and Modelling", "Simulations"],
  gpa: "3.98 / 4.00",
  deansList: "2025 Dean's List",
  graduation: "Expected June 2028",
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

export const experience = [
  {
    company: "Ontario Public Service (OPS)",
    role: "Software Developer Intern",
    period: "Jan 2026 – Present",
    color: "cyan",
    bullets: [
      "Developed enterprise web applications using Java, Spring Boot, JSP, JavaScript, HTML, Tomcat, Azure VMs, Azure DevOps, Bitbucket, and Nginx in an Agile Scrum environment.",
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
      "Co-led an Agent AI codelab on Vertex AI for 40+ attendees, presenting a live demo of my Expense Tracker Agent and providing 1:1 support on agent setup and tool integration, tasked with ensuring everyone left with a working agent.",
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

export const projects = [
  {
    name: "Personal Portfolio",
    type: "Personal Project",
    period: "Oct 2025 – Jan 2026",
    github: "https://github.com/AlirezaPrz/AlirezaPrz.github.io",
    tags: ["React", "Vite", "Tailwind", "GCP Vertex AI"],
    description:
      "Shipped a production-ready personal site on GitHub Pages using React + Vite and utility-first Tailwind CSS, optimizing for fast loads and clean component structure. Designed mobile-first responsive layouts with semantic HTML and created a GCP Vertex AI chatbot that greets the user and answers questions based on my resume.",
  },
  {
    name: "Smart Air",
    type: "Software Design Group Project",
    period: "Nov 2025 – Dec 2025",
    github: "https://github.com/AlirezaPrz/Smart-Air-Group67",
    tags: ["Android", "Java", "Firebase", "MVP Architecture", "JUnit", "Mockito", "Jira"],
    description:
      "Built SmartAir, a multi-screen asthma-management Android app in Java for parents and clinicians, backed by Firebase. Implemented medication schedules, daily symptom check-ins, adherence summaries, and 7-day/30-day trends; refactored the login flow into Model–View–Presenter architecture and wrote Mockito-based JUnit tests while collaborating through Scrum sprints, Jira, Git feature branches, and pull requests.",
  },
  {
    name: "Expense Tracker Agent",
    type: "Personal Project",
    period: "Nov 2025",
    github: "https://github.com/AlirezaPrz/expenses-agent",
    tags: ["Vertex AI", "FastAPI", "GCP", "Gemini", "Firestore"],
    description:
      "Built a chat-style Expense Tracker Agent using Vertex AI Agent Builder that turns natural-language messages and receipt text into structured expense records and spending summaries. Designed a FastAPI ingest service on Google Cloud Run using Gemini JSON-schema parsing to extract merchants, totals, categories, and timestamps, then persists normalized transactions to Cloud Firestore. Authored agent tools and orchestration logic for backend API calls.",
  },
  {
    name: "Shark Finder Telegram Bot",
    type: "Personal Project",
    period: "Nov 2025",
    github: "https://github.com/AlirezaPrz/SharkFinder-n8n-TelegramBot",
    tags: ["n8n", "JavaScript", "Google Sheets", "AI Agents"],
    description:
      "Built an end-to-end Telegram intake → parse → store → match pipeline in n8n, onboarding businesses and investors and persisting structured profiles to Google Sheets. Engineered a JavaScript ranking engine scoring sector, stage, capital, and location (0–100) and returning top matches with succinct rationales.",
  },
  {
    name: "Shark Finder",
    type: "Hackathon Project",
    period: "Oct 2025",
    github: "https://github.com/AlirezaPrz/shark-finder",
    tags: ["FastAPI", "Supabase", "PostgreSQL", "Whisper", "Gemini"],
    description:
      "Built a FastAPI backend with Supabase/Postgres and normalized investor/startup schemas, enabling SQL-based filtering and matching across sector, stage, and ticket size. Implemented an end-to-end pipeline that ingests pitch audio, runs Whisper + Gemini to produce structured features, and generates ranked, explainable matches.",
  },
  {
    name: "Battleship Server",
    type: "Systems Programming Project",
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
    period: "Jul 2025 – Aug 2025",
    github: "https://github.com/AlirezaPrz/ChessAI",
    tags: ["Python", "Alpha-Beta Pruning", "TensorFlow", "OpenAI Gym"],
    description:
      "Developed ~1500 ELO Hard mode with sub-10s response using alpha-beta-pruned minimax, phase-aware evaluation, and strategic move ordering. Built Easy mode with an OpenAI Gym environment and TensorFlow/Keras DQN, plus a Pygame UI with animations, move highlighting, and undo/restart.",
  },
  {
    name: "Chess & Tic-Tac-Toe Bot",
    type: "UofT Code Clash Competition",
    period: "Jul 2025",
    github: "https://github.com/AlirezaPrz/Code-Clash-2025-Chess-bot",
    tags: ["C++", "Minimax", "Competitive Programming"],
    description:
      "Won 1st-place Best Chess Bot & sub-5s moves by engineering ability-aware minimax chess and Tic-Tac-Toe bots in C++.",
  },
  {
    name: "Fitness Tracker",
    type: "Personal Project",
    period: "Mar 2025 – Apr 2025",
    github: "https://github.com/AlirezaPrz/Fitness-Tracker",
    tags: ["Python", "KNN", "PCA", "Peak Detection"],
    description:
      "Built a real-time lift-identification pipeline using low-pass filtering and PCA features with KNN, random forest, and neural-network classifiers. Designed a peak-detection algorithm with temporal thresholds and multi-axis fusion for consistent rep counts.",
  },
]