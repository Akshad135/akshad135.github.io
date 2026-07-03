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
  techs.forEach((tech) => {
    // Create HTML element
    const el = document.createElement("div");
    el.className =
      "absolute left-0 top-0 px-3 py-1.5 rounded-full bg-blue-900/10 border border-blue-500/30 text-blue-300 text-xs font-mono tracking-wider shadow-[0_0_10px_rgba(59,130,246,0.2)] backdrop-blur-sm whitespace-nowrap transition-colors hover:bg-blue-500/20 hover:border-blue-400 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] select-none cursor-pointer z-10";
    el.innerText = tech;
    container.appendChild(el);

    // Initial random position (concentrated slightly towards center)
    const anglePos = Math.random() * Math.PI * 2;
    const radiusPos = Math.random() * (Math.min(width, height) / 3) + 20;
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

  // Animation loop
  function animate() {
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
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      if (distMouse < 150) {
        const force = (150 - distMouse) / 150;
        node.vx -= (dxMouse / distMouse) * force * 1.2;
        node.vy -= (dyMouse / distMouse) * force * 1.2;
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
      node.el.style.transform = `translate(${node.x - node.width / 2}px, ${node.y - node.height / 2}px)`;
    });

    // Draw lines
    ctx.lineWidth = 1.0;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          
          // Fades out as they get further apart
          const opacity = (1 - dist / maxDistance) * 0.45;
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`; // Tailwind blue-500
          ctx.stroke();
        }
      }
    }

    // Draw lines to mouse
    for (let i = 0; i < nodes.length; i++) {
      const dx = nodes[i].x - mouse.x;
      const dy = nodes[i].y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDistance) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        
        const opacity = (1 - dist / maxDistance) * 0.4;
        ctx.strokeStyle = `rgba(147, 197, 253, ${opacity})`; // Tailwind blue-300
        ctx.stroke();
      }
    }

    requestAnimationFrame(animate);
  }

  // Start animation
  requestAnimationFrame(animate);
});
