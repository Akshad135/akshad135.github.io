document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("tech-web-container");
  const canvas = document.getElementById("tech-web-canvas");
  if (!container || !canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;

  const techs = [
    "LangChain",
    "TensorFlow",
    "PyTorch",
    "Transformers",
    "LangGraph",
    "RAG",
    "FastAPI",
    "PostgreSQL",
    "Python",
    "SQLAlchemy",
    "Dagster",
    "MLflow",
    "DVC",
    "Streamlit",
    "React",
    "TailwindCSS"
  ];

  const nodes = [];
  const maxDistance = 260; // Increased for denser spider web
  let mouse = { x: -1000, y: -1000 };

  // Set canvas size
  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener("resize", resize);
  resize();

  // Create nodes
  techs.forEach((tech, i) => {
    const el = document.createElement("div");
    el.className =
      "absolute left-0 top-0 px-3 py-1.5 rounded-full bg-blue-900/10 border border-blue-500/30 text-blue-300 text-xs font-mono tracking-wider shadow-[0_0_10px_rgba(59,130,246,0.2)] backdrop-blur-sm whitespace-nowrap transition-colors hover:bg-blue-500/20 hover:border-blue-400 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] select-none cursor-pointer z-10";
    el.style.willChange = "transform";
    el.innerText = tech;
    container.appendChild(el);

    // Distribute evenly in a circle to ensure distance at start
    const anglePos = (i / techs.length) * Math.PI * 2 + (Math.random() * 0.2);
    const radiusPos = (Math.min(width, height) / 2.8) + (Math.random() * 40 - 20);
    const x = width / 2 + Math.cos(anglePos) * radiusPos;
    const y = height / 2 + Math.sin(anglePos) * radiusPos;
    
    // Random velocity
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 0.3 + 0.1;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    nodes.push({
      el,
      x,
      y,
      vx,
      vy,
      width: 0, // Will be set after render
      height: 0,
    });
  });

  let isVisible = true;
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    observer.observe(container);
  }

  // Track mouse
  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  container.addEventListener("mouseleave", () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // Pre-allocate flat arrays to eliminate GC lag
  const activePaths = Array.from({ length: 20 }, () => []);
  const mousePaths = Array.from({ length: 20 }, () => []);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);

    // Update node positions
    nodes.forEach((node) => {
      // Get dimensions if not set
      if (node.width === 0) {
        node.width = node.el.offsetWidth;
        node.height = node.el.offsetHeight;
      }

      // Mouse repulsion (stronger)
      const dxMouse = mouse.x - node.x;
      const dyMouse = mouse.y - node.y;
      const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;
      if (distMouseSq < 22500) { // 150 * 150
        const distMouse = Math.sqrt(distMouseSq);
        const force = (150 - distMouse) / 150;
        node.vx -= (dxMouse / distMouse) * force * 1.2;
        node.vy -= (dyMouse / distMouse) * force * 1.2;
      }

      // Node-to-node collision (Bounding Box Repulsion)
      for (let j = 0; j < nodes.length; j++) {
        if (node === nodes[j]) continue;
        const other = nodes[j];
        if (node.width === 0 || other.width === 0) continue;

        let dx = node.x - other.x;
        let dy = node.y - other.y;
        
        // Add 12px padding between nodes
        const minDx = (node.width + other.width) / 2 + 12;
        const minDy = (node.height + other.height) / 2 + 12;

        if (Math.abs(dx) < minDx && Math.abs(dy) < minDy) {
          if (dx === 0 && dy === 0) {
            dx = (Math.random() - 0.5) * 2;
            dy = (Math.random() - 0.5) * 2;
          }
          
          const overlapX = minDx - Math.abs(dx);
          const overlapY = minDy - Math.abs(dy);
          
          // Resolve on axis with smallest overlap to mimic realistic bouncing
          if (overlapX < overlapY) {
             const dir = dx > 0 ? 1 : -1;
             node.vx += dir * overlapX * 0.08;
          } else {
             const dir = dy > 0 ? 1 : -1;
             node.vy += dir * overlapY * 0.08;
          }
        }
      }

      // Apply friction/speed limit
      const currentSpeed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      if (currentSpeed > 1.2) {
        node.vx = (node.vx / currentSpeed) * 1.2;
        node.vy = (node.vy / currentSpeed) * 1.2;
      } else if (currentSpeed < 0.1) {
          node.vx *= 1.05;
          node.vy *= 1.05;
      }

      // Move
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off walls (accounting for element size)
      const padding = 10;
      if (node.x < node.width / 2 + padding) {
        node.x = node.width / 2 + padding;
        node.vx *= -1;
      } else if (node.x > width - node.width / 2 - padding) {
        node.x = width - node.width / 2 - padding;
        node.vx *= -1;
      }

      if (node.y < node.height / 2 + padding) {
        node.y = node.height / 2 + padding;
        node.vy *= -1;
      } else if (node.y > height - node.height / 2 - padding) {
        node.y = height - node.height / 2 - padding;
        node.vy *= -1;
      }

      // Update DOM element position (centered)
      node.el.style.transform = `translate3d(${node.x - node.width / 2}px, ${node.y - node.height / 2}px, 0)`;
    });

    // Draw lines
    ctx.lineWidth = 1.0;
    const maxDistSq = maxDistance * maxDistance;
    
    // Clear paths without memory allocation
    for (let b = 0; b < 20; b++) {
      activePaths[b].length = 0;
      mousePaths[b].length = 0;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const opacity = (1 - dist / maxDistance) * 0.45;
          let bucket = Math.floor(opacity * 20);
          if (bucket > 19) bucket = 19;
          activePaths[bucket].push(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
        }
      }

      // Draw lines to mouse in same loop
      const dxm = nodes[i].x - mouse.x;
      const dym = nodes[i].y - mouse.y;
      const distmSq = dxm * dxm + dym * dym;

      if (distmSq < maxDistSq) {
        const distm = Math.sqrt(distmSq);
        const opacity = (1 - distm / maxDistance) * 0.4;
        let bucket = Math.floor(opacity * 20);
        if (bucket > 19) bucket = 19;
        mousePaths[bucket].push(nodes[i].x, nodes[i].y, mouse.x, mouse.y);
      }
    }

    for (let b = 0; b < 20; b++) {
      const arr = activePaths[b];
      if (arr.length > 0) {
        ctx.beginPath();
        for (let k = 0; k < arr.length; k += 4) {
          ctx.moveTo(arr[k], arr[k+1]);
          ctx.lineTo(arr[k+2], arr[k+3]);
        }
        ctx.strokeStyle = `rgba(59, 130, 246, ${(b + 0.5) / 20 * 0.45})`;
        ctx.stroke();
      }
    }
    
    for (let b = 0; b < 20; b++) {
      const arr = mousePaths[b];
      if (arr.length > 0) {
        ctx.beginPath();
        for (let k = 0; k < arr.length; k += 4) {
          ctx.moveTo(arr[k], arr[k+1]);
          ctx.lineTo(arr[k+2], arr[k+3]);
        }
        ctx.strokeStyle = `rgba(147, 197, 253, ${(b + 0.5) / 20 * 0.4})`;
        ctx.stroke();
      }
    }
  }

  // Start animation
  requestAnimationFrame(animate);
});
