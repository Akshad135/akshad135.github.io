const projects = [
  {
    title: "Agentic Auditor",
    description:
      "An AI-driven contract reviewer using a Drafter–Critic agent loop. Minimizes hallucinations by iteratively refining analysis against company policies.",
    category: "AI/ML",
    tags: ["LangGraph", "Groq", "Qdrant", "Streamlit"],
    links: {
      github: "https://github.com/Akshad135/agentic-auditor",
      demo: null,
    },
    visual: {
      type: "icon-pair",
      icons: ["fa-pen-fancy", "fa-search"],
      colors: ["text-green-400", "text-red-400"],
      bgGradient: "from-blue-900/30 to-transparent",
    },
  },
  {
    title: "Smart Resume Screener",
    description:
      "High-throughput recruitment tool with a 5-stage async LLM pipeline. Parses PDFs and matches skills using evidence-based reasoning.",
    category: "AI/ML",
    tags: ["FastAPI", "React", "PostgreSQL", "Groq"],
    links: {
      github: "https://github.com/akshad135/resume-screener",
      demo: null,
    },
    visual: {
      type: "progress",
      label: "Match: 92%",
      bgGradient: "from-blue-900/30 to-transparent",
    },
  },
  {
    title: "Dilbert-o-Matic",
    description:
      "End-to-end MLOps pipeline for T5 translation models. Handles data versioning, training orchestration, and experiment tracking.",
    category: "MLOps",
    tags: ["Dagster", "DVC", "MLflow", "PyTorch"],
    links: {
      github: "https://github.com/akshad135/dilbert-o-matic",
      demo: null,
    },
    visual: {
      type: "pipeline",
      steps: ["DVC", "Dagster", "MLflow"],
      bgGradient: "from-purple-900/30 to-transparent",
    },
  },
  {
    title: "TailSync",
    description:
      "Secure clipboard synchronization tool for Tailscale networks. Features end-to-end encryption, background sync services, and multi-device support.",
    category: "Android",
    tags: ["Kotlin", "FastAPI", "WebSockets", "Compose"],
    links: {
      github: "https://github.com/Akshad135/tailsync",
      demo: null,
    },
    visual: {
      type: "sync-network",
      center: { icon: "fa-shield-alt", color: "text-cyan-400" },
      nodes: [
        { icon: "fa-mobile-alt", color: "text-blue-400", label: "Android" },
        { icon: "fa-laptop", color: "text-purple-400", label: "Desktop" },
        { icon: "fa-server", color: "text-green-400", label: "Server" },
      ],
      bgGradient: "from-cyan-900/30 to-transparent",
    },
  },
  {
    title: "Anime Wrapped",
    description:
      "A cinematic year-in-review application that turns viewing history into a visual journey. Features dynamic reports and an AI-powered 'Roast' system.",
    category: "Web",
    tags: ["GSAP", "Flask", "AniList API", "Groq LLM"],
    links: {
      github: "https://github.com/akshad135",
      demo: "https://anime-wrap.vercel.app",
    },
    visual: {
      type: "emoji",
      content: "鬼",
      color: "from-red-500 to-red-900",
      bgGradient: "from-red-900/30 to-transparent",
    },
  },
  {
    title: "Bloom",
    description:
      "An aesthetic daily journal app where memories grow like a garden. Built for Android with a focus on mindfulness and nature-themed visuals.",
    category: "Android",
    tags: ["Kotlin", "Jetpack Compose", "Room DB", "Widgets"],
    links: {
      github: "https://github.com/akshad135/plantmemory",
      demo: "https://github.com/akshad135/plantmemory/releases",
    },
    visual: {
      type: "emoji",
      content: "🌻",
      color: "from-yellow-400 to-orange-500",
      bgGradient: "from-green-900/40 to-transparent",
    },
  },
  {
    title: "Live Resume Builder",
    description:
      "Overleaf-inspired browser-based resume editor. Zero latency, local storage persistence, and real-time preview without backend dependencies.",
    category: "Web",
    tags: ["Vanilla JS", "HTML5", "CSS Variables", "LocalStorage"],
    links: {
      github: "https://github.com/akshad135/resume_builder",
      demo: "https://akshad135.github.io/resume_builder/",
    },
    visual: {
      type: "document",
      bgGradient: "from-green-900/30 to-transparent",
    },
  },
];
