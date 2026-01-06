const projects = [
    {
        title: "Anime Wrapped",
        description: "A cinematic year-in-review application that turns viewing history into a visual journey. Features dynamic reports and an AI-powered 'Roast' system.",
        category: "Web",
        tags: ["GSAP", "Flask", "AniList API", "Groq LLM"],
        links: {
            github: "https://github.com/akshad135",
            demo: "https://anime-wrap.vercel.app"
        },
        visual: "anime" // Marker for custom visual logic if needed
    },
    {
        title: "Agentic Auditor",
        description: "An AI-driven contract reviewer using a Drafter–Critic agent loop. Minimizes hallucinations by iteratively refining analysis against company policies.",
        category: "AI/ML",
        tags: ["LangGraph", "Groq", "Qdrant", "Streamlit"],
        links: {
            github: "https://github.com/Akshad135/agentic-auditor",
            demo: null
        },
        visual: "agentic"
    },
    {
        title: "Dilbert-o-Matic",
        description: "End-to-end MLOps pipeline for T5 translation models. Handles data versioning, training orchestration, and experiment tracking.",
        category: "MLOps",
        tags: ["Dagster", "DVC", "MLflow", "PyTorch"],
        links: {
            github: "https://github.com/akshad135/dilbert-o-matic",
            demo: null
        },
        visual: "mlops"
    },
    {
        title: "Smart Resume Screener",
        description: "High-throughput recruitment tool with a 5-stage async LLM pipeline. Parses PDFs and matches skills using evidence-based reasoning.",
        category: "AI/ML",
        tags: ["FastAPI", "React", "PostgreSQL", "Groq"],
        links: {
            github: "https://github.com/akshad135/resume-screener",
            demo: null
        },
        visual: "screener"
    },
    {
        title: "Live Resume Builder",
        description: "Overleaf-inspired browser-based resume editor. Zero latency, local storage persistence, and real-time preview without backend dependencies.",
        category: "Web",
        tags: ["Vanilla JS", "HTML5", "CSS Variables", "LocalStorage"],
        links: {
            github: "https://github.com/akshad135/resume_builder",
            demo: "https://akshad135.github.io/resume_builder/"
        },
        visual: "builder"
    }
];
