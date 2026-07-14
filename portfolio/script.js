// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');
const rippleContainer = document.getElementById('ripple-container');
let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

// Trail animation
function animateTrail() {
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Hover effect on interactive elements
document.querySelectorAll('a, button, .btn, .skill-bubble, .tilt-card, .glass-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Ripple on click
document.addEventListener('click', e => {
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.left = e.clientX + 'px';
  ripple.style.top = e.clientY + 'px';
  rippleContainer.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
});

// ===== PARTICLES =====
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20;
    this.size = Math.random() * 3 + 1;
    this.speedY = Math.random() * 1.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.6 + 0.2;
    this.hue = Math.random() * 30 + 185;
  }
  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    this.opacity -= 0.003;
    if (this.y < -20 || this.opacity <= 0) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, 1)`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = `hsla(${this.hue}, 100%, 70%, 0.8)`;
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 80; i++) {
  const p = new Particle();
  p.y = Math.random() * canvas.height;
  particles.push(p);
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== STARS =====
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 120; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  const size = Math.random() * 2.5 + 0.5;
  star.style.cssText = `
    width: ${size}px; height: ${size}px;
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 80}%;
    animation-delay: ${Math.random() * 4}s;
    animation-duration: ${Math.random() * 3 + 2}s;
  `;
  starsContainer.appendChild(star);
}

// ===== FLOATING ROCKS =====
const rocksContainer = document.getElementById('rocks');
const rockData = [
  { w: 120, h: 80, left: '10%', top: '40%', dur: '6s', delay: '0s' },
  { w: 80, h: 60, left: '80%', top: '30%', dur: '8s', delay: '1s' },
  { w: 60, h: 45, left: '60%', top: '60%', dur: '7s', delay: '2s' },
  { w: 90, h: 55, left: '25%', top: '70%', dur: '9s', delay: '0.5s' },
  { w: 50, h: 35, left: '90%', top: '55%', dur: '5s', delay: '3s' },
];
rockData.forEach(r => {
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.cssText = `width:${r.w}px;height:${r.h}px;left:${r.left};top:${r.top};animation-duration:${r.dur};animation-delay:${r.delay};`;
  rocksContainer.appendChild(rock);
});

// ===== CLOUDS =====
const cloudsContainer = document.getElementById('clouds');
for (let i = 0; i < 4; i++) {
  const cloud = document.createElement('div');
  cloud.className = 'cloud';
  cloud.style.cssText = `
    width: ${Math.random() * 300 + 200}px;
    height: ${Math.random() * 100 + 80}px;
    left: ${Math.random() * 60 - 10}%;
    top: ${Math.random() * 50 + 10}%;
    animation-duration: ${Math.random() * 20 + 30}s;
    animation-delay: ${Math.random() * -20}s;
  `;
  cloudsContainer.appendChild(cloud);
}

// ===== TYPED EFFECT =====
const roles = [
  'Computer Engineering Student',
  'AI Developer',
  'Full Stack Developer',
  'Startup Enthusiast',
  'Blockchain Innovator'
];
let roleIdx = 0, charIdx = 0, typing = true;
const typedEl = document.getElementById('typed-role');

function typeRole() {
  const role = roles[roleIdx];
  if (typing) {
    typedEl.textContent = role.substring(0, ++charIdx);
    if (charIdx === role.length) { typing = false; setTimeout(typeRole, 1800); return; }
  } else {
    typedEl.textContent = role.substring(0, --charIdx);
    if (charIdx === 0) { typing = true; roleIdx = (roleIdx + 1) % roles.length; }
  }
  setTimeout(typeRole, typing ? 80 : 40);
}
typeRole();

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Nav toggle for mobile
document.getElementById('nav-toggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => document.querySelector('.nav-links').classList.remove('open'));
});

// ===== TILT CARDS =====
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / rect.height) * 12;
    const rotY = (x / rect.width) * 12;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== STATS COUNTER =====
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current = Math.min(current + increment, target);
        el.textContent = Math.floor(current);
        if (current >= target) clearInterval(timer);
      }, 25);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number').forEach(el => statsObserver.observe(el));

// ===== SECTION REVEAL (glass cards) =====
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.glass-card, .exp-card, .project-card, .achievement-content').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, box-shadow 0.3s, background 0.3s';
  cardObserver.observe(el);
});

// ===== MOUSE FOLLOW LIGHT =====
let lightX = 0, lightY = 0;
document.addEventListener('mousemove', e => {
  lightX = e.clientX; lightY = e.clientY;
});

// ===== SKILL BUBBLE INTERACTIVE =====
document.querySelectorAll('.skill-bubble').forEach(b => {
  b.addEventListener('click', () => {
    b.style.transform = 'scale(1.2)';
    setTimeout(() => b.style.transform = '', 300);
  });
});

// ===== DOWNLOAD RESUME =====
document.getElementById('download-btn').addEventListener('click', e => {
  e.preventDefault();
  alert('Resume download will be available soon! 🚀');
});

// ===== OCEAN WAVE ANIMATION =====
// Animate the hero wave path
const wavePath = document.querySelector('.hero-ocean-wave path');
if (wavePath) {
  let t = 0;
  function animateWave() {
    t += 0.02;
    const d = `M0,${60 + Math.sin(t) * 15} C360,${120 + Math.sin(t + 1) * 10} 1080,${Math.sin(t + 2) * 10} 1440,${60 + Math.sin(t) * 15} L1440,120 L0,120 Z`;
    wavePath.setAttribute('d', d);
    requestAnimationFrame(animateWave);
  }
  animateWave();
}

// ===== SCROLL PROGRESS LIGHT =====
window.addEventListener('scroll', () => {
  const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  document.body.style.setProperty('--scroll', progress);
});

console.log('%c🌊 MJ Manoj Portfolio | Anti-Gravity Universe', 'color: #00D9FF; font-size: 16px; font-weight: bold;');
