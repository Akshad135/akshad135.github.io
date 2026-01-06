function toggleMenu() {
    const menu = document.getElementById("mobile-menu-overlay");
    const btn = document.getElementById("menu-btn");
    menu.classList.toggle("open");
    btn.classList.toggle("nav-open");
}

document.getElementById("menu-btn").addEventListener("click", toggleMenu);

const terminalLines = [
    {
        text: "> initializing neural_interface v2.0...",
        color: "text-gray-400",
    },
    { text: "> load_module [LangChain, PyTorch]", color: "text-blue-400" },
    { text: "  [SUCCESS] Modules Loaded.", color: "text-green-400" },
    { text: "> establishing_uplink...", color: "text-gray-300" },
    { text: "> access_granted.", color: "text-white" },
];

const loaderContent = document.getElementById("loader-content");
const loaderOverlay = document.getElementById("loader-overlay");

async function runLoader() {
    for (let i = 0; i < terminalLines.length; i++) {
        const lineData = terminalLines[i];
        const lineDiv = document.createElement("div");
        lineDiv.className = `typing-line ${lineData.color} mb-1`;
        loaderContent.appendChild(lineDiv);

        const text = lineData.text;
        lineDiv.classList.add("cursor");

        for (let j = 0; j < text.length; j += 3) {
            lineDiv.textContent = text.substring(0, j + 3);
            await new Promise((r) => setTimeout(r, 1));
        }

        lineDiv.textContent = text;
        lineDiv.classList.remove("cursor");
        await new Promise((r) => setTimeout(r, 20));
    }
    await new Promise((r) => setTimeout(r, 100));
    loaderOverlay.style.opacity = "0";
    loaderOverlay.style.visibility = "hidden";
}

window.addEventListener("load", runLoader);

const canvas = document.getElementById("vector-canvas");
const ctx = canvas.getContext("2d");
let width, height;
let mouseX = 0,
    mouseY = 0;
let time = 0;

const spacing = 30;
const length = 10;

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener("resize", resize);
resize();

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

document.addEventListener(
    "touchmove",
    (e) => {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }
    },
    { passive: true }
);

function draw() {
    ctx.clearRect(0, 0, width, height);

    if (window.innerWidth < 768) {
        time += 0.008;
        mouseX = width / 2 + Math.sin(time) * (width / 3);
        mouseY = height / 2 + Math.cos(time * 1.3) * (height / 4);
    }

    for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
            const dx = mouseX - x;
            const dy = mouseY - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 400;

            let angle = 0;
            let lineLen = 2;
            let opacity = 0.1;

            if (distance < maxDist) {
                angle = Math.atan2(dy, dx);
                const intensity = 1 - distance / maxDist;
                lineLen = length + intensity * 10;
                opacity = 0.1 + intensity * 0.4;
            }

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(-lineLen / 2, 0);
            ctx.lineTo(lineLen / 2, 0);
            ctx.strokeStyle = `rgba(100, 149, 237, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();
        }
    }
    requestAnimationFrame(draw);
}

draw();

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px",
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, observerOptions);
document.querySelectorAll(".reveal-text").forEach((el) => observer.observe(el));

// --- Projects Logic ---

function getVisualHTML(project) {
    const v = project.visual;

    switch (v.type) {
        case "emoji":
            return `
        <span class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b ${v.color} 
               filter drop-shadow-[0_0_15px_rgba(239,68,68,0.4)] select-none">
          ${v.content}
        </span>
      `;

        case "icon-pair":
            return `
        <div class="flex items-center gap-6">
          <div class="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
            <i class="fas ${v.icons[0]} ${v.colors[0]} text-xl"></i>
          </div>
          <i class="fas fa-arrows-alt-h text-gray-600 text-sm"></i>
          <div class="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
            <i class="fas ${v.icons[1]} ${v.colors[1]} text-xl"></i>
          </div>
        </div>
      `;

        case "pipeline":
            return `
        <div class="flex items-center gap-3">
          ${v.steps.map((step, i) => `
            <div class="px-3 py-2 rounded bg-gray-800/50 border border-gray-700 text-xs font-mono text-gray-400">
              ${step}
            </div>
            ${i < v.steps.length - 1 ? '<i class="fas fa-chevron-right text-gray-600 text-xs"></i>' : ''}
          `).join('')}
        </div>
      `;

        case "progress":
            return `
        <div class="w-40 space-y-2">
          <div class="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-blue-500 to-green-500 w-[92%]"></div>
          </div>
          <div class="text-xs font-mono text-green-400 text-center">${v.label}</div>
        </div>
      `;

        case "document":
            return `
        <div class="w-20 h-28 bg-white rounded shadow-lg relative transform -rotate-3">
          <div class="p-2 border-b border-gray-200">
            <div class="w-10 h-1.5 bg-gray-800 rounded mb-1"></div>
            <div class="w-14 h-1 bg-gray-400 rounded"></div>
          </div>
          <div class="p-2 space-y-1.5">
            <div class="w-full h-1 bg-gray-300 rounded"></div>
            <div class="w-full h-1 bg-gray-300 rounded"></div>
            <div class="w-3/4 h-1 bg-gray-300 rounded"></div>
            <div class="w-full h-1 bg-gray-300 rounded mt-2"></div>
            <div class="w-2/3 h-1 bg-gray-300 rounded"></div>
          </div>
        </div>
      `;

        default:
            return `<i class="fas fa-code text-4xl text-gray-500"></i>`;
    }
}

function createProjectCard(project) {
    const visualHTML = getVisualHTML(project);
    const bgGradient = project.visual.bgGradient || "from-gray-900/30 to-transparent";

    const githubLink = project.links.github
        ? `<a href="${project.links.github}" target="_blank" class="card-link-btn">
         <i class="fab fa-github"></i>
         <span>Code</span>
       </a>`
        : "";
    const demoLink = project.links.demo
        ? `<a href="${project.links.demo}" target="_blank" class="card-link-btn">
         <i class="fas fa-external-link-alt"></i>
         <span>Demo</span>
       </a>`
        : "";

    const tagsHTML = project.tags
        .map((tag) => `<span class="tag">${tag}</span>`)
        .join("");

    return `
    <div class="project-card-compact reveal-text">
        <div class="card-visual bg-gradient-to-br ${bgGradient}">
            <div class="card-visual-content">
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
    grid.innerHTML = "";

    const filtered =
        filter === "All"
            ? projects
            : projects.filter((p) => p.category === filter);

    filtered.forEach((p) => {
        grid.innerHTML += createProjectCard(p);
    });

    // Re-observe new elements for animation
    document.querySelectorAll(".reveal-text").forEach((el) => observer.observe(el));
}

function setupFilters() {
    const filtersContainer = document.getElementById("project-filters");
    const allBtn = filtersContainer.querySelector('[data-filter="All"]');
    const buttons = filtersContainer.querySelectorAll(".filter-btn");

    const isMobile = window.innerWidth < 768;

    // On mobile, hide "All" button and get first category
    if (isMobile && allBtn) {
        allBtn.style.display = "none";

        // Find first non-All button and activate it
        const firstCategoryBtn = filtersContainer.querySelector('.filter-btn:not([data-filter="All"])');
        if (firstCategoryBtn) {
            buttons.forEach((b) => b.classList.remove("active"));
            firstCategoryBtn.classList.add("active");
            renderProjects(firstCategoryBtn.getAttribute("data-filter"));
        }
    } else {
        // Desktop - show all and default to All
        if (allBtn) allBtn.style.display = "";
        renderProjects("All");
    }

    // Event Listeners for Filters
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            buttons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            renderProjects(btn.getAttribute("data-filter"));
        });
    });
}

// Initial Setup
if (typeof projects !== "undefined") {
    setupFilters();

    // Re-setup on resize (in case user rotates device)
    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const filtersContainer = document.getElementById("project-filters");
            const allBtn = filtersContainer.querySelector('[data-filter="All"]');
            const isMobile = window.innerWidth < 768;

            if (isMobile && allBtn) {
                allBtn.style.display = "none";
            } else if (allBtn) {
                allBtn.style.display = "";
            }
        }, 200);
    });
}
