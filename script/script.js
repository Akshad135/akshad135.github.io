document.querySelectorAll('nav.sticky-notes a').forEach(note => {
    note.addEventListener('mouseenter', () => {
        note.animate([
            {
                transform: 'rotate(-2deg)'
            },
            {
                transform: 'rotate(2deg)'
            },
            {
                transform: 'rotate(-2deg)'
            }
    ], {
            duration: 300,
            iterations: 1
        });
    });
});


const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

sections.forEach(section => {
    section.classList.add('pre-slide');
    observer.observe(section);
});


const paper = document.getElementById('paper-wrapper');
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    paper.style.transform = `rotateX(${y * 10}deg) rotateY(${x * 10}deg)`;
});


const btn = document.querySelector('.paper-button');
btn.addEventListener('mouseover', () => {
    btn.style.transition = 'transform 0.3s';
    btn.style.transform += ' scale(1.05) rotateX(15deg)';
});
btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1) rotateX(0deg)';
});


document.querySelectorAll('.drag-item').forEach(item => {
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    const startDrag = (e) => {
        isDragging = true;
        item.setPointerCapture(e.pointerId);
        offsetX = e.clientX - item.offsetLeft;
        offsetY = e.clientY - item.offsetTop;
        item.style.zIndex = 10000;
        item.style.transition = 'none';
    };

    const moveDrag = (e) => {
        if (!isDragging) return;
        item.style.left = `${e.clientX - offsetX}px`;
        item.style.top = `${e.clientY - offsetY}px`;
    };

    const endDrag = () => {
        isDragging = false;
        item.style.zIndex = 1000;
        item.style.transition = 'transform 0.2s, background 0.3s';
    };

    item.addEventListener('pointerdown', startDrag);
    item.addEventListener('pointermove', moveDrag);
    item.addEventListener('pointerup', endDrag);
    item.addEventListener('pointercancel', endDrag);
});

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('doodle-canvas');
    const toggleBtn = document.getElementById('toggle-draw');
    const doodleZone = document.getElementById('doodle-zone');

    if (!canvas || !toggleBtn || !doodleZone) return;

    const ctx = canvas.getContext('2d');
    let drawing = false;
    let doodleActive = false;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    toggleBtn.addEventListener('click', () => {
        doodleActive = !doodleActive;
        toggleBtn.classList.toggle('active', doodleActive);
        toggleBtn.textContent = doodleActive ? '❌ Stop Doodle' : '🎨 Doodle';

        canvas.style.pointerEvents = doodleActive ? 'auto' : 'none';

        if (!doodleActive) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    });

    canvas.addEventListener('mousedown', (e) => {
        if (!doodleActive) return;
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    });

    canvas.addEventListener('mouseup', () => {
        drawing = false;
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!drawing || !doodleActive) return;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#333';
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    });

    canvas.addEventListener('touchstart', (e) => {
        if (!doodleActive) return;
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.touches[0].clientX, e.touches[0].clientY);
        e.preventDefault();
    });

    canvas.addEventListener('touchmove', (e) => {
        if (!drawing || !doodleActive) return;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#333';
        ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.touches[0].clientX, e.touches[0].clientY);
        e.preventDefault();
    });
    
    canvas.addEventListener('touchend', () => {
        drawing = false;
    });

});

document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.animate([
            {
                transform: 'rotate(-1deg)'
            },
            {
                transform: 'rotate(1deg)'
            },
            {
                transform: 'rotate(-1deg)'
            }
    ], {
            duration: 300,
            iterations: 1
        });
    });
});

const scrollBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('load', () => {
    const loader = document.getElementById('paper-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hide');
            setTimeout(() => loader.remove(), 700);
        }, 1200);
    }
});

const facts = [
  "I built my first website at 14!",
  "Currently diving into AI/ML models 🚀",
  "I love combining design & tech into fun projects",
  "Ask me about paper-themed UI ideas 😉",
  "Draggable doodles were a weekend experiment!",
  "This site is pure HTML, CSS, and JS — no frameworks!",
  "Resume page has its own paper theme too 📄"
];

function showRandomFact() {
  const scrap = document.getElementById('paper-scrap');
  if (!scrap) return;

  scrap.textContent = facts[Math.floor(Math.random() * facts.length)];

  const maxX = window.innerWidth - scrap.offsetWidth - 50;
  const maxY = window.innerHeight - scrap.offsetHeight - 50;


  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  scrap.style.left = `${randomX}px`;
  scrap.style.top = `${randomY}px`;

  scrap.classList.add('show');
  setTimeout(() => scrap.classList.remove('show'), 2000);
}

setInterval(showRandomFact, 15000);
setTimeout(showRandomFact, 3500);
