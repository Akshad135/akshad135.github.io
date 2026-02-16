const projects = [
  {
    title: "Paste Bin",
    description:
      "A secure, modern pastebin with syntax highlighting, encryption, and self-destructing pastes. Built on Cloudflare Workers for edge performance.",
    category: "Web",
    tags: ["React", "Cloudflare Workers", "Hono"],
    links: {
      github: "https://github.com/Akshad135/paste-bin",
      demo: "https://demo-pastebin.vercel.app/",
    },
    visual: {
      type: "paste-bin",
      bgGradient: "from-slate-900/30 to-gray-900/30",
    },
  },
  {
    title: "Bookmarks",
    description:
      "A free, self-hostable bookmark manager to organize your web life. Features Supabase auth, OG metadata extraction, and PWA support.",
    category: "Web",
    tags: ["React", "Supabase", "Tailwind", "PWA"],
    links: {
      github: "https://github.com/Akshad135/bookmarks",
      demo: "https://demo-bookmarks.vercel.app",
    },
    visual: {
      type: "bookmark-dashboard",
      bgGradient: "from-orange-900/30 to-transparent",
    },
  },
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
      type: "agent-loop",
      icons: ["fa-pen-fancy", "fa-search"],
      colors: ["text-green-400", "text-red-400"],
      bgGradient: "from-emerald-900/30 to-red-900/30",
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
      type: "resume-scan",
      label: "92% Match",
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
      type: "mlops-pipeline",
      steps: ["Data", "Train", "Model"],
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
      liveLabel: "Live",
    },
    visual: {
      type: "anime-card",
      content: "鬼",
      color: "from-red-500 to-red-900",
      bgGradient: "from-gray-900 via-black to-black",
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
      bgGradient: "from-orange-900/30 to-transparent",
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
      liveLabel: "Live",
    },
    visual: {
      type: "document",
      bgGradient: "from-gray-700/30 to-transparent",
    },
  },
];

function getVisualHTML(project) {
  const v = project.visual;
  switch (v.type) {
    case "paste-bin":
      return `
        <div class="w-full h-full flex items-center justify-center relative overflow-hidden bg-[#0f1117] group/card">
             <!--Background Elements-->
             <div class="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent"></div>
             
             <!--Stack Card 3(Bottom)-->
             <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[85%] h-[60%] bg-[#1e293b] rounded-lg border border-white/5 shadow-2xl transition-transform duration-500 ease-out group-hover/card:rotate-12 group-hover/card:translate-x-4 rotate-6 opacity-30 scale-90"></div>

             <!--Stack Card 2(Middle)-->
             <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[48%] w-[85%] h-[60%] bg-[#1e293b] rounded-lg border border-white/10 shadow-2xl transition-transform duration-500 ease-out group-hover/card:-rotate-6 group-hover/card:-translate-x-4 -rotate-3 opacity-60 scale-95"></div>

             <!--Stack Card 1(Top / Main)-->
        <div class="relative w-[85%] h-[65%] bg-[#1e1e2e] rounded-lg border border-slate-700/50 shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ease-out group-hover/card:-translate-y-2 group-hover/card:scale-[1.02] group-hover/card:shadow-violet-500/20 group-hover/card:border-violet-500/30">
          <!-- Card Header -->
          <div class="h-10 bg-[#181825] border-b border-white/5 flex items-center justify-between px-3">
            <div class="flex items-center gap-2">
              <i class="fas fa-file-code text-indigo-400 text-xs"></i>
              <div class="w-16 h-1.5 bg-white/10 rounded-full"></div>
            </div>
            <div class="flex gap-1.5">
              <div class="px-1.5 py-0.5 rounded-[3px] text-[8px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">TS</div>
              <div class="px-1.5 py-0.5 rounded-[3px] text-[8px] bg-orange-500/10 text-orange-300 border border-orange-500/20 font-mono">Public</div>
            </div>
          </div>

          <!-- Code Area -->
          <div class="flex-1 p-3 space-y-2 relative font-mono opacity-80">
            <!-- Syntax Highlight Lines -->
            <div class="flex gap-2 items-center">
              <div class="w-4 text-slate-600 text-[8px] text-right">1</div>
              <div class="w-12 h-1.5 bg-pink-400/60 rounded-sm"></div>
              <div class="w-20 h-1.5 bg-blue-400/60 rounded-sm"></div>
            </div>
            <div class="flex gap-2 items-center">
              <div class="w-4 text-slate-600 text-[8px] text-right">2</div>
              <div class="w-16 h-1.5 bg-yellow-200/60 rounded-sm"></div>
              <div class="w-8 h-1.5 bg-white/20 rounded-sm"></div>
              <div class="w-14 h-1.5 bg-green-400/60 rounded-sm"></div>
            </div>
            <div class="flex gap-2 items-center">
              <div class="w-4 text-slate-600 text-[8px] text-right">3</div>
              <div class="w-24 h-1.5 bg-purple-400/60 rounded-sm"></div>
            </div>
            <div class="flex gap-2 items-center">
              <div class="w-4 text-slate-600 text-[8px] text-right">4</div>
              <div class="w-10 h-1.5 bg-white/20 rounded-sm"></div>
            </div>

            <!-- Floating "Cursor" animation -->
            <div class="absolute top-[4.5rem] left-10 w-1.5 h-3 bg-blue-400 animate-pulse"></div>
          </div>
        </div>
        </div>
        `;
    case "bookmark-dashboard":
      return `
        <div class="w-full h-full flex items-center justify-center">
            <!--Main dashboard container with glass tint and subtle float hover-->
        <div class="relative w-[90%] h-[75%] bg-black/40 backdrop-blur-md border border-orange-500/60 rounded-lg shadow-2xl flex flex-col overflow-hidden group transition-all duration-500 hover:border-orange-500/80">
          <!-- Browser Header -->
          <div class="h-4 bg-white/5 border-b border-white/5 flex items-center px-2 gap-1.5">
            <div class="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-green-500/50"></div>
            <div class="ml-2 flex-1 h-2 bg-white/10 rounded-full opacity-50"></div>
          </div>
          <!-- App Body -->
          <div class="flex-1 flex overflow-hidden">
            <!-- Sidebar -->
            <div class="w-12 bg-white/5 border-r border-white/5 flex flex-col items-center py-3 gap-2">
              <div class="w-6 h-6 rounded bg-orange-500/20 flex items-center justify-center text-orange-500 mb-1">
                <i class="fas fa-bookmark text-[10px]"></i>
              </div>
              <div class="w-6 h-1 bg-white/10 rounded-full"></div>
              <div class="w-4 h-1 bg-white/10 rounded-full opacity-50"></div>
              <div class="w-5 h-1 bg-white/10 rounded-full opacity-50"></div>
            </div>
            <!-- Main Content Grid -->
            <div class="flex-1 p-3 bg-transparent">
              <div class="flex items-center justify-between mb-2">
                <div class="w-16 h-1.5 bg-white/10 rounded-full"></div>
                <div class="flex gap-1">
                  <div class="w-3 h-3 rounded bg-white/10"></div>
                  <div class="w-3 h-3 rounded bg-orange-600/80"></div>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <!-- Grid items with subtle hover scale/glow -->
                <div class="aspect-video bg-white/5 rounded border border-orange-500/20 shadow-[0_0_8px_rgba(249,115,22,0.2)] transition-all duration-300 relative overflow-hidden animate-pulse">
                  <div class="absolute top-1 left-1 w-2 h-2 rounded-full bg-blue-500/30"></div>
                  <div class="mt-4 mx-2 h-1 bg-white/10 rounded-full"></div>
                </div>
                <div class="aspect-video bg-white/5 rounded border border-orange-500/20 shadow-[0_0_8px_rgba(249,115,22,0.2)] transition-all duration-300 relative overflow-hidden animate-pulse">
                  <div class="absolute top-1 left-1 w-2 h-2 rounded-full bg-purple-500/30"></div>
                  <div class="mt-4 mx-2 h-1 bg-white/10 rounded-full"></div>
                </div>
                <div class="aspect-video bg-white/5 rounded border border-orange-500/20 shadow-[0_0_8px_rgba(249,115,22,0.2)] transition-all duration-300 relative overflow-hidden animate-pulse">
                  <div class="absolute top-1 left-1 w-2 h-2 rounded-full bg-green-500/30"></div>
                  <div class="mt-4 mx-2 h-1 bg-white/10 rounded-full"></div>
                </div>
                <div class="aspect-video bg-white/5 rounded border border-orange-500/20 shadow-[0_0_8px_rgba(249,115,22,0.2)] transition-all duration-300 relative overflow-hidden animate-pulse">
                  <div class="absolute top-1 left-1 w-2 h-2 rounded-full bg-red-500/30"></div>
                  <div class="mt-4 mx-2 h-1 bg-white/10 rounded-full"></div>
                </div>
                <div class="aspect-video bg-white/5 rounded border border-orange-500/20 shadow-[0_0_8px_rgba(249,115,22,0.2)] transition-all duration-300 relative overflow-hidden animate-pulse">
                  <div class="absolute top-1 left-1 w-2 h-2 rounded-full bg-yellow-500/30"></div>
                  <div class="mt-4 mx-2 h-1 bg-white/10 rounded-full"></div>
                </div>
                <div class="aspect-video border border-dashed border-white/10 rounded flex items-center justify-center opacity-50 animate-pulse transition-all duration-300">
                  <div class="text-[8px] text-zinc-400">+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        `;
    case "emoji":
      return `
        <span class="text-6xl animate-sway font-black text-transparent bg-clip-text bg-gradient-to-b ${v.color} 
               filter drop - shadow - [0_0_15px_rgba(234, 179, 8, 0.3)] select - none">
          ${v.content}
        </span>
        `;
    case "agent-loop":
      return `
        <div class="relative w-full h-full flex items-center justify-center gap-8">
            <div class="absolute w-40 h-40 border-2 border-gray-700/50 rounded-full animate-spin-slow opacity-40" style="border-right-color: transparent; border-left-color: transparent;"></div>
            <div class="relative z-10 flex flex-col items-center gap-2 group">
                 <div class="w-14 h-14 rounded-full bg-green-900/20 border border-green-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.15)] group-hover:scale-110 transition-transform duration-300">
                    <i class="fas ${v.icons[0]} ${v.colors[0]} text-xl"></i>
                 </div>
                 <div class="absolute -bottom-6 text-[9px] font-mono text-green-500/60 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Drafter</div>
            </div>
            <div class="absolute z-0 text-gray-600 animate-pulse">
                <i class="fas fa-sync-alt text-sm opacity-50"></i>
            </div>
            <div class="relative z-10 flex flex-col items-center gap-2 group">
                 <div class="w-14 h-14 rounded-full bg-red-900/20 border border-red-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.15)] group-hover:scale-110 transition-transform duration-300">
                    <i class="fas ${v.icons[1]} ${v.colors[1]} text-xl"></i>
                 </div>
                 <div class="absolute -bottom-6 text-[9px] font-mono text-red-500/60 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Critic</div>
            </div>
        </div>
        `;
    case "resume-scan":
      return `
        <div class="relative w-24 h-32 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden flex flex-col items-center pt-4 shadow-xl group hover:border-blue-500/30 transition-colors duration-500">
             <div class="w-16 h-2 bg-gray-800 rounded-sm mb-3"></div>
            <div class="space-y-2 w-16 opacity-40">
                <div class="w-full h-1 bg-gray-500 rounded-full"></div>
                <div class="w-10 h-1 bg-gray-500 rounded-full"></div>
                <div class="w-14 h-1 bg-gray-500 rounded-full"></div>
                <div class="w-full h-1 bg-gray-500 rounded-full"></div>
                <div class="w-8 h-1 bg-gray-500 rounded-full"></div>
            </div>
            <div class="absolute top-0 w-full h-12 bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0 border-b border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-scan z-20 pointer-events-none"></div>
             <div class="absolute bottom-3 bg-blue-950/90 border border-blue-500/40 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono text-blue-300 shadow-lg z-30">
                ${v.label}
            </div>
        </div>
        `;
    case "mlops-pipeline":
      return `
        <div class="flex items-center gap-0.5 relative">
           <div class="flex flex-col items-center gap-1.5 z-10">
              <div class="w-10 h-10 rounded bg-gray-800 border border-purple-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                 <i class="fas fa-database text-purple-400 text-sm"></i>
              </div>
           </div>
           <div class="w-10 h-1 bg-gray-800 relative overflow-hidden">
               <div class="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent w-full h-full opacity-60 animate-flow-right"></div>
           </div>
           <div class="flex flex-col items-center gap-1.5 z-10">
              <div class="w-10 h-10 rounded bg-gray-800 border border-purple-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                 <i class="fas fa-cogs text-purple-300 text-sm animate-spin-slow" style="animation-duration: 4s;"></i>
              </div>
           </div>
           <div class="w-10 h-1 bg-gray-800 relative overflow-hidden">
               <div class="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent w-full h-full opacity-60 animate-flow-right" style="animation-delay: 0.5s;"></div>
           </div>
           <div class="flex flex-col items-center gap-1.5 z-10">
              <div class="w-10 h-10 rounded bg-gray-800 border border-purple-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                 <i class="fas fa-cube text-purple-200 text-sm"></i>
              </div>
           </div>
        </div>
        `;
    case "anime-card":
      return `
        <div class="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style = "background: radial-gradient(circle at center, rgba(20,0,0,0.5) 0%, rgba(0,0,0,0.95) 100%);">
             <div class="absolute top-4 right-4 flex items-center gap-1.5 opacity-80 z-20">
                 <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse-fast"></div>
                 <span class="text-[10px] font-mono text-red-500 font-bold tracking-widest">REC</span>
             </div>
             <div class="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                <div class="w-32 h-32 bg-red-600 rounded-full blur-[60px] opacity-20 animate-breathe-red"></div>
                <div class="absolute w-full h-full bg-red-900/10 blur-3xl mix-blend-overlay"></div>
             </div>
             <div class="relative z-10 transform hover:scale-105 transition-transform duration-500 group">
                <span class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-100 via-red-500 to-red-900 
                       filter drop-shadow-[0_0_25px_rgba(220,38,38,0.4)] select-none relative z-10">
                  ${v.content}
                </span>
             </div>
             <div class="absolute inset-0 opacity-20 pointer-events-none z-20" 
                  style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+');"></div>
          </div>
        `;
    case "sync-network":
      return `
        <div class="relative w-full h-full flex items-center justify-center pt-2">
          <div class="absolute w-24 h-24 border border-cyan-500/20 rounded-full animate-ping opacity-20"></div>
          <div class="absolute w-28 h-28 border border-dashed border-cyan-500/30 rounded-full" style="animation: spin 10s linear infinite;"></div>
          <div class="relative z-10 w-12 h-12 bg-gray-900 rounded-xl border border-cyan-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <i class="fas ${v.center.icon} ${v.center.color
        } text-xl drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]"></i>
          </div>
          ${v.nodes
          .map((node, i) => {
            const radius = 54;
            const angles = [-90, 30, 150];
            const rad = angles[i] * (Math.PI / 180);
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            return `
               <div class="absolute w-10 h-10 bg-gray-800/90 rounded-full border border-gray-600 flex items-center justify-center shadow-lg z-20 group hover:border-cyan-400 hover:scale-110 transition-all duration-300" 
                    style="transform: translate(${x}px, ${y}px);">
                 <i class="fas ${node.icon} ${node.color} text-sm group-hover:text-white transition-colors"></i>
               </div>
             `;
          })
          .join("")
        }
        </div>
        `;
    case "document":
      return `
        <div class="w-20 h-28 bg-white rounded shadow-lg relative animate-float-paper group hover:rotate-0 transition-transform duration-300 overflow-hidden">
          <div class="absolute top-2 right-2">
            <div class="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <div class="p-2 border-b border-gray-200">
            <div class="w-10 h-1.5 bg-gray-800 rounded mb-1"></div>
            <div class="w-14 h-1 bg-gray-400 rounded"></div>
          </div>
          <div class="p-2 space-y-1.5">
            <div class="w-full h-1 bg-gray-300 rounded"></div>
            <div class="w-full h-1 bg-gray-300 rounded"></div>
            <div class="h-1 bg-blue-400 rounded animate-type-line w-1/2"></div>
            <div class="w-full h-1 bg-gray-300 rounded mt-2"></div>
            <div class="w-2/3 h-1 bg-gray-300 rounded"></div>
          </div>
        </div>
        `;
    default:
      return `<i class="fas fa-code text-4xl text-gray-500"></i> `;
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

function createProjectCard(project) {
  const visualHTML = getVisualHTML(project);
  const bgGradient =
    project.visual.bgGradient || "from-gray-900/30 to-transparent";
  const githubLink = project.links.github
    ? `<a href="${project.links.github}" target="_blank" class="card-link-btn">
         <i class="fab fa-github"></i>
         <span>Code</span>
       </a> `
    : "";
  const demoLink = project.links.demo
    ? `<a href="${project.links.demo}" target="_blank" class="card-link-btn">
         <i class="fas fa-external-link-alt"></i>
         <span>${project.links.liveLabel || "Demo"}</span>
       </a> `
    : "";
  const tagsHTML = project.tags
    .map((tag) => `<span class="tag"> ${tag}</span> `)
    .join("");
  return `
        <div class="project-card-compact reveal-text">
        <div class="card-visual bg-gradient-to-br ${bgGradient}">
            <div class="card-visual-content w-full h-full flex items-center justify-center relative">
                ${visualHTML}
            </div>
        </div>
        <div class="card-content">
            <div class="card-category">${project.category}</div>
            <h3 class="card-title">${project.title}</h3>
            <p class="card-desc">${project.description}</p>
            <div class="card-tags">
                ${tagsHTML}
            </div>
            <div class="card-links">
                ${githubLink}
                ${demoLink}
            </div>
        </div>
    </div>
        `;
}

function renderProjects(filter = "All") {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);
  // Build HTML string first, then assign once (avoids multiple DOM reflows)
  grid.innerHTML = filtered.map((p) => createProjectCard(p)).join("");
  document
    .querySelectorAll(".reveal-text")
    .forEach((el) => observer.observe(el));
}

function setupFilters() {
  const filtersContainer = document.getElementById("project-filters");
  if (!filtersContainer) return;
  const allBtn = filtersContainer.querySelector('[data-filter="All"]');
  const buttons = filtersContainer.querySelectorAll(".filter-btn");
  if (allBtn) {
    allBtn.style.display = "";
  }
  renderProjects("All");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(btn.getAttribute("data-filter"));
    });
  });
}

if (typeof projects !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupFilters);
  } else {
    setupFilters();
  }
}