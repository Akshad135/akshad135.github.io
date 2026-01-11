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

(function () {
  const canvas = document.getElementById("neuralCanvas");
  if (!canvas) return;
  const card = document.getElementById("simulationCard");
  const tensorCounter = document.getElementById("tensorCounter");
  const ctx = canvas.getContext("2d");
  let width, height;
  let tensorCount = 410294;

  function initSize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Re-initialize network on resize to fit new dimensions
    initNetwork();
  }

  const resizeObserver = new ResizeObserver(() => initSize());
  resizeObserver.observe(canvas.parentElement);

  // Initial size setup
  const rect = canvas.parentElement.getBoundingClientRect();
  width = rect.width;
  height = rect.height;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  // Dynamic structure based on screen width
  function getStructure() {
    if (window.innerWidth < 480) {
      return [4, 5, 5, 4, 2]; // Mobile: Less nodes
    } else if (window.innerWidth < 768) {
      return [5, 6, 6, 5, 3]; // Tablet: Medium nodes
    } else {
      return [6, 8, 8, 6, 4]; // Desktop: Full complexity
    }
  }

  let structure = getStructure();
  const nodes = [];
  const pulses = [];

  class Node {
    constructor(x, y, layerIndex) {
      this.x = x;
      this.y = y;
      this.baseY = y;
      this.layer = layerIndex;
      this.activation = 0;
      this.bias = Math.random() * Math.PI * 2;
    }

    draw(time) {
      // Only animate vertical movement on larger screens (desktop/tablet)
      if (window.innerWidth >= 768) {
        this.y = this.baseY + Math.sin(time + this.bias) * 3;
      } else {
        // Static position on mobile to prevent "dangling" look
        this.y = this.baseY;
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);

      // Clamp activation for safety
      const safeActivation = Math.max(0, Math.min(1, this.activation));

      const r = Math.floor(59 + (255 - 59) * safeActivation);
      const g = Math.floor(130 + (255 - 130) * safeActivation);
      const b = Math.floor(246 + (255 - 246) * safeActivation);

      const alpha = 0.6 + safeActivation * 0.4;

      ctx.fillStyle = `rgba(${Math.min(255, r)}, ${Math.min(
        255,
        g
      )}, ${Math.min(255, b)}, ${Math.min(1, alpha)})`;

      if (this.activation > 0.1) {
        ctx.shadowBlur = this.activation * 15;
        ctx.shadowColor = `rgba(96, 165, 250, ${this.activation})`;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.fill();
      ctx.shadowBlur = 0;
      this.activation *= 0.92;
    }
  }

  class Pulse {
    constructor(startNode, endNode, speedMultiplier = 1, isGradient = false) {
      this.start = startNode;
      this.end = endNode;
      this.progress = 0;
      this.speed = (Math.random() * 0.02 + 0.015) * speedMultiplier;
      this.done = false;
      this.isGradient = isGradient;
    }

    update() {
      this.progress += this.speed;
      if (this.progress >= 1) {
        this.progress = 1;
        this.done = true;
        this.end.activation = Math.min(this.end.activation + 0.8, 1.0);

        if (!this.isGradient) {
          tensorCount += Math.floor(Math.random() * 64) + 64;
        }
      }
    }

    draw() {
      const currX = this.start.x + (this.end.x - this.start.x) * this.progress;
      const currY = this.start.y + (this.end.y - this.start.y) * this.progress;

      ctx.beginPath();
      ctx.arc(currX, currY, 2, 0, Math.PI * 2);

      if (this.isGradient) {
        ctx.fillStyle = "#d8b4fe";
        ctx.shadowColor = "#a855f7";
      } else {
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#ffffff";
      }

      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;

      const tailLen = 0.1;
      if (this.progress > tailLen) {
        const tailX =
          this.start.x +
          (this.end.x - this.start.x) * (this.progress - tailLen);
        const tailY =
          this.start.y +
          (this.end.y - this.start.y) * (this.progress - tailLen);
        ctx.beginPath();
        ctx.moveTo(currX, currY);
        ctx.lineTo(tailX, tailY);

        if (this.isGradient) {
          ctx.strokeStyle = "rgba(216, 180, 254, 0.4)";
        } else {
          ctx.strokeStyle = "rgba(255,255,255,0.3)";
        }

        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }
  }

  function initNetwork() {
    structure = getStructure(); // Update structure based on current width
    nodes.length = 0;
    pulses.length = 0; // Fix: clear pulses on resize to prevent floating particles

    // Responsive padding
    const isMobile = window.innerWidth < 768;
    // UPDATED: Increased padding on mobile to visually shrink the net
    const paddingX = isMobile ? 60 : 60;
    const paddingY = isMobile ? 45 : 50;

    const usableWidth = width - paddingX * 2;
    const usableHeight = height - paddingY * 2;
    const layerSpacing = usableWidth / (structure.length - 1);

    structure.forEach((nodeCount, layerIdx) => {
      const x = paddingX + layerIdx * layerSpacing;
      const nodeSpacing = usableHeight / (nodeCount - 1 || 1);
      const columnHeight = (nodeCount - 1) * nodeSpacing;
      const startY = (height - columnHeight) / 2 - (isMobile ? 25 : 20); // Center vertically better on mobile

      for (let i = 0; i < nodeCount; i++) {
        // Just center single nodes, otherwise spread them out
        const y = nodeCount > 1 ? startY + i * nodeSpacing : height / 2;
        nodes.push(new Node(x, y, layerIdx));
      }
    });
  }

  setTimeout(initNetwork, 100);

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const time = Date.now() * 0.002;

    ctx.lineWidth = 1;
    nodes.forEach((nodeA) => {
      nodes.forEach((nodeB) => {
        if (nodeB.layer === nodeA.layer + 1) {
          const activeFactor = (nodeA.activation + nodeB.activation) / 2;
          const alpha = 0.05 + activeFactor * 0.2;

          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
          ctx.stroke();

          const spawnChance = 0.002 + nodeA.activation * 0.01;
          if (Math.random() < spawnChance) {
            pulses.push(new Pulse(nodeA, nodeB));
          }
        }
      });
    });

    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.update();
      p.draw();
      if (p.done) pulses.splice(i, 1);
    }

    nodes.forEach((node) => node.draw(time));

    if (tensorCounter) {
      tensorCounter.innerText = tensorCount.toLocaleString();
    }

    requestAnimationFrame(animate);
  }

  animate();

  if (card) {
    card.addEventListener("click", () => {
      card.classList.remove("flash-active");
      void card.offsetWidth;
      card.classList.add("flash-active");

      tensorCount = Math.max(0, tensorCount - 50000);

      const lastLayerIdx = structure.length - 1;

      for (let i = lastLayerIdx; i > 0; i--) {
        const currentLayerNodes = nodes.filter((n) => n.layer === i);
        const prevLayerNodes = nodes.filter((n) => n.layer === i - 1);

        const delay = (lastLayerIdx - i) * 120;

        setTimeout(() => {
          currentLayerNodes.forEach((sourceNode) => {
            sourceNode.activation = 1.0;

            prevLayerNodes.forEach((targetNode) => {
              pulses.push(new Pulse(sourceNode, targetNode, 2.0, true));
            });
          });
        }, delay);
      }
    });
  }
})();
