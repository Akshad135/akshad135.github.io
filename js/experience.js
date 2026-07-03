const experience = [
  {
    company: "Ernst & Young LLP",
    role: "GenAI Technical Consultant",
    type: "Intern",
    duration: "Jan 2026 — Present",
    description: "• Built multi-agent AI pipelines using Google ADK, implementing hierarchical agent architectures with dynamic LLM-driven task routing to automate complex enterprise workflows.<br><br>• Equipped agents with custom capabilities using ADK's FunctionTool and AgentTool ecosystem, integrating external APIs and data sources for production-grade agentic solutions.",
    tags: ["Generative AI", "Technical Consulting"],
    links: {
      website: "https://www.ey.com",
    },
    current: true,
  },
];

function renderExperience() {
  const container = document.getElementById("experience-grid");
  if (!container) return;

  // Clear container
  container.innerHTML = "";

  // 1. Create the Main Timeline Wrapper (The "Tree Trunk")
  const timelineWrapper = document.createElement("div");
  // border-l is the main vertical line
  // ADDED: max-w-3xl to limit width, preventing stretch across the 7xl container
  timelineWrapper.className =
    "relative border-l border-gray-800/60 ml-3 md:ml-6 space-y-14 pb-12 max-w-3xl";

  // 2. Add a "Start" node at the very top (Decorational)
  const startNode = document.createElement("div");
  startNode.className =
    "absolute -left-[5px] -top-2 w-2.5 h-2.5 rounded-full bg-gray-700 ring-4 ring-[#0a0a0a]";
  timelineWrapper.appendChild(startNode);

  // 3. Loop through experiences
  experience.forEach((exp, index) => {
    // Wrapper for a single timeline item
    const itemWrapper = document.createElement("div");
    itemWrapper.className = "relative pl-8 md:pl-12 group reveal-text";

    // --- A. The Node on the Timeline ---
    const node = document.createElement("div");
    // If it's current, make it glow green/blue. Else gray.
    const nodeColor = exp.current
      ? "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)] animate-pulse"
      : "bg-gray-600 group-hover:bg-blue-400 transition-colors";

    node.className = `absolute -left-[6px] top-7 w-3 h-3 rounded-full ${nodeColor} ring-4 ring-[#0a0a0a] z-10`;
    itemWrapper.appendChild(node);

    // --- B. The Connector Line (Branch) ---
    // This is the horizontal line connecting the vertical timeline to the card
    const connector = document.createElement("div");
    connector.className =
      "absolute left-0 top-[34px] w-8 md:w-12 h-px bg-gray-800 group-hover:bg-blue-500/50 transition-colors duration-300";
    itemWrapper.appendChild(connector);

    // --- C. The Content Card ---
    const card = document.createElement("div");
    card.className =
      "relative border border-gray-800 bg-gray-900/20 rounded p-6 md:p-8 hover:bg-gray-900/40 transition group-hover:border-blue-500/30";

    // Header section of the card
    const headerHtml = `
            <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                    <h3 class="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                        ${exp.company}
                    </h3>
                    <div class="flex flex-wrap items-center gap-2 text-sm">
                         <span class="text-blue-300 font-medium">${exp.role
      }</span>
                         <span class="text-gray-600">•</span>
                         <span class="text-xs uppercase tracking-wider text-gray-500 border border-gray-800 px-2 py-0.5 rounded">${exp.type
      }</span>
                    </div>
                </div>
                
                <div class="flex items-center gap-3">
                    <div class="text-gray-400 font-mono text-xs bg-black/30 px-3 py-1.5 rounded border border-gray-800 flex items-center gap-2">
                        <i class="far fa-calendar text-gray-600"></i>
                        ${exp.duration}
                    </div>
                </div>
            </div>
        `;

    // Description (if exists)
    const descHtml = exp.description
      ? `<p class="text-gray-400 leading-relaxed mb-6 text-sm md:text-base border-l-2 border-gray-800 pl-4">
              ${exp.description}
           </p>`
      : "";

    // Tags
    const tagsHtml =
      exp.tags && exp.tags.length > 0
        ? `
            <div class="flex flex-wrap gap-2 pt-4 border-t border-gray-800/50">
                ${exp.tags
          .map(
            (tag) =>
              `<span class="px-2.5 py-1 text-xs bg-gray-800/40 text-gray-400 rounded hover:text-white transition-colors"># ${tag}</span>`,
          )
          .join("")}
            </div>
        `
        : "";

    card.innerHTML = headerHtml + descHtml + tagsHtml;
    itemWrapper.appendChild(card);
    timelineWrapper.appendChild(itemWrapper);
  });

  // 4. Add "End" fade at the bottom
  const endFade = document.createElement("div");
  endFade.className =
    "absolute bottom-0 left-[-1px] w-0.5 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent z-20";
  timelineWrapper.appendChild(endFade);

  container.appendChild(timelineWrapper);

  // Re-trigger animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll("#experience-grid .reveal-text")
    .forEach((el) => observer.observe(el));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderExperience);
} else {
  renderExperience();
}
