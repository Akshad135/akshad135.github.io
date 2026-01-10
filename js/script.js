function toggleMenu() {
  const menu = document.getElementById("mobile-menu-overlay");
  const btn = document.getElementById("menu-btn");
  menu.classList.toggle("open");
  btn.classList.toggle("nav-open");
}

const menuBtn = document.getElementById("menu-btn");
if (menuBtn) {
  menuBtn.addEventListener("click", toggleMenu);
}

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
  if (!loaderContent || !loaderOverlay) return;
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
if (canvas) {
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
}

const backToTopBtn = document.getElementById("back-to-top");
if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
