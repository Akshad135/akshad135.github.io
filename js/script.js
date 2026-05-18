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

const animationScheduler = (() => {
  const callbacks = new Set();
  let frameId = null;

  function tick(timestamp) {
    frameId = null;
    callbacks.forEach((callback) => callback(timestamp));

    if (!document.hidden && callbacks.size > 0) {
      frameId = requestAnimationFrame(tick);
    }
  }

  function ensureRunning() {
    if (frameId === null && !document.hidden && callbacks.size > 0) {
      frameId = requestAnimationFrame(tick);
    }
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
      return;
    }

    ensureRunning();
  });

  return {
    add(callback) {
      callbacks.add(callback);
      ensureRunning();

      return () => {
        callbacks.delete(callback);
        if (callbacks.size === 0 && frameId !== null) {
          cancelAnimationFrame(frameId);
          frameId = null;
        }
      };
    },
  };
})();

const canvas = document.getElementById("vector-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let width, height;
  let mouseX = 0,
    mouseY = 0;
  let time = 0;
  const spacing = 30;
  const length = 10;
  const maxDist = 400;
  const maxDistSq = maxDist * maxDist;
  const points = [];

  function rebuildGrid() {
    points.length = 0;
    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        points.push({ x, y });
      }
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    rebuildGrid();
  }

  window.addEventListener("resize", resize);
  resize();

  const handlePointerMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };
  document.addEventListener("pointermove", handlePointerMove, { passive: true });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    if (window.innerWidth < 768) {
      time += 0.008;
      mouseX = width / 2 + Math.sin(time) * (width / 3);
      mouseY = height / 2 + Math.cos(time * 1.3) * (height / 4);
    }

    ctx.lineWidth = 1.5;
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const dx = mouseX - point.x;
      const dy = mouseY - point.y;
      const distanceSq = dx * dx + dy * dy;

      let dirX = 1;
      let dirY = 0;
      let lineLen = 2;
      let opacity = 0.1;

      if (distanceSq < maxDistSq) {
        const distance = Math.sqrt(distanceSq);
        const intensity = 1 - distance / maxDist;
        lineLen = length + intensity * 10;
        opacity = 0.1 + intensity * 0.4;

        if (distance > 0) {
          const invDistance = 1 / distance;
          dirX = dx * invDistance;
          dirY = dy * invDistance;
        }
      }

      const halfLen = lineLen / 2;
      ctx.beginPath();
      ctx.moveTo(point.x - dirX * halfLen, point.y - dirY * halfLen);
      ctx.lineTo(point.x + dirX * halfLen, point.y + dirY * halfLen);
      ctx.strokeStyle = `rgba(100, 149, 237, ${opacity})`;
      ctx.stroke();
    }
  }

  const stopVectorAnimation = animationScheduler.add(draw);
  window.addEventListener("beforeunload", () => {
    window.removeEventListener("resize", resize);
    document.removeEventListener("pointermove", handlePointerMove);
    stopVectorAnimation();
  });
}

const backToTopBtn = document.getElementById("back-to-top");
const backToTopWrapper = document.getElementById("back-to-top-wrapper");
if (backToTopBtn && backToTopWrapper) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopWrapper.classList.add("visible");
    } else {
      backToTopWrapper.classList.remove("visible");
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
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let tensorCount = 410294;
  let isMobile = window.innerWidth < 768;
  let counterRenderTs = 0;
  let renderedTensorCount = tensorCount;
  let isCardVisible = true;

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
  const layers = [];
  const connections = [];
  const pulses = [];
  const MAX_PULSES = 320;

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
      if (!isMobile) {
        this.y = this.baseY + Math.sin(time + this.bias) * 3;
      } else {
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
    isMobile = window.innerWidth < 768;
    nodes.length = 0;
    layers.length = 0;
    connections.length = 0;
    pulses.length = 0;

    // Responsive padding
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

      const layerNodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const y = nodeCount > 1 ? startY + i * nodeSpacing : height / 2;
        const node = new Node(x, y, layerIdx);
        nodes.push(node);
        layerNodes.push(node);
      }
      layers.push(layerNodes);
    });

    for (let i = 0; i < layers.length - 1; i++) {
      const currentLayer = layers[i];
      const nextLayer = layers[i + 1];
      for (let j = 0; j < currentLayer.length; j++) {
        const fromNode = currentLayer[j];
        for (let k = 0; k < nextLayer.length; k++) {
          connections.push({ from: fromNode, to: nextLayer[k] });
        }
      }
    }
  }

  function initSize(force = false) {
    const parentElement = canvas.parentElement;
    if (!parentElement) return;

    const rect = parentElement.getBoundingClientRect();
    const nextWidth = Math.max(1, Math.round(rect.width));
    const nextHeight = Math.max(1, Math.round(rect.height));
    const nextPixelRatio = window.devicePixelRatio || 1;

    if (
      !force &&
      nextWidth === width &&
      nextHeight === height &&
      nextPixelRatio === pixelRatio
    ) {
      return;
    }

    width = nextWidth;
    height = nextHeight;
    pixelRatio = nextPixelRatio;

    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    initNetwork();
  }

  const resizeObserver = new ResizeObserver(() => initSize());
  if (canvas.parentElement) {
    resizeObserver.observe(canvas.parentElement);
  }

  const handleWindowResize = () => initSize();
  window.addEventListener("resize", handleWindowResize);

  let visibilityObserver = null;
  if (card) {
    visibilityObserver = new IntersectionObserver((entries) => {
      isCardVisible = entries.some((entry) => entry.isIntersecting);
    });
    visibilityObserver.observe(card);
  }

  initSize(true);
  if (tensorCounter) {
    tensorCounter.textContent = tensorCount.toLocaleString();
  }

  function animate(timestamp) {
    if (!isCardVisible) return;

    ctx.clearRect(0, 0, width, height);
    const time = Date.now() * 0.002;

    ctx.lineWidth = 1;
    for (let i = 0; i < connections.length; i++) {
      const connection = connections[i];
      const nodeA = connection.from;
      const nodeB = connection.to;
      const activeFactor = (nodeA.activation + nodeB.activation) / 2;
      const alpha = 0.05 + activeFactor * 0.2;

      ctx.beginPath();
      ctx.moveTo(nodeA.x, nodeA.y);
      ctx.lineTo(nodeB.x, nodeB.y);
      ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
      ctx.stroke();

      const spawnChance = 0.002 + nodeA.activation * 0.01;
      if (Math.random() < spawnChance && pulses.length < MAX_PULSES) {
        pulses.push(new Pulse(nodeA, nodeB));
      }
    }

    let writeIndex = 0;
    for (let i = 0; i < pulses.length; i++) {
      const p = pulses[i];
      p.update();
      p.draw();
      if (!p.done) {
        pulses[writeIndex++] = p;
      }
    }
    pulses.length = writeIndex;

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].draw(time);
    }

    if (
      tensorCounter &&
      tensorCount !== renderedTensorCount &&
      timestamp - counterRenderTs >= 120
    ) {
      renderedTensorCount = tensorCount;
      tensorCounter.textContent = tensorCount.toLocaleString();
      counterRenderTs = timestamp;
    }
  }

  const stopNeuralAnimation = animationScheduler.add(animate);

  if (card) {
    const triggerCardReset = () => {
      card.classList.remove("flash-active");
      void card.offsetWidth;
      card.classList.add("flash-active");

      tensorCount = Math.max(0, tensorCount - 50000);

      const lastLayerIdx = structure.length - 1;

      for (let i = lastLayerIdx; i > 0; i--) {
        const currentLayerNodes = layers[i];
        const prevLayerNodes = layers[i - 1];

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
    };

    card.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      triggerCardReset();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        triggerCardReset();
      }
    });

    if (!card.hasAttribute("tabindex")) {
      card.setAttribute("tabindex", "0");
    }
    if (!card.hasAttribute("role")) {
      card.setAttribute("role", "button");
    }
  }

  window.addEventListener("beforeunload", () => {
    window.removeEventListener("resize", handleWindowResize);
    resizeObserver.disconnect();
    if (visibilityObserver) {
      visibilityObserver.disconnect();
    }
    stopNeuralAnimation();
  });
})();

function fallbackCopyTextToClipboard(text, btn) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }
  document.body.removeChild(textArea);

  const iconDefault = btn.querySelector('.icon-default');
  const iconCopy = btn.querySelector('.icon-copy');
  const iconCheck = btn.querySelector('.icon-check');

  if (iconDefault && iconCopy && iconCheck) {
    // Resume page: 3-state opacity-based (envelope → checkmark)
    iconDefault.style.opacity = '0';
    iconCopy.style.opacity = '0';
    iconCheck.style.opacity = '1';

    setTimeout(() => {
      iconCheck.style.opacity = '0';
      iconDefault.style.opacity = '';
      iconCopy.style.opacity = '';
    }, 2000);
  } else if (iconCopy && iconCheck) {
    // Home page: block/hidden toggle
    iconCopy.classList.replace('block', 'hidden');
    iconCheck.classList.replace('hidden', 'block');

    setTimeout(() => {
      iconCheck.classList.replace('block', 'hidden');
      iconCopy.classList.replace('hidden', 'block');
    }, 2000);
  }
}
