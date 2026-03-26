// Custom Cursor
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
if (dot && ring) {
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
  });
  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12; ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();
  document.querySelectorAll('a, button, .skill-card, .hobby-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.transform = 'translate(-50%,-50%) scale(1.6)'; ring.style.opacity = '0.4'; ring.style.borderColor = 'var(--accent2)'; });
    el.addEventListener('mouseleave', () => { ring.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.opacity = '0.6'; ring.style.borderColor = 'var(--accent)'; });
  });
}

// Scroll Reveal + Skill Bars
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const fill = entry.target.querySelector('.skill-fill');
      if (fill) setTimeout(() => { fill.style.width = entry.target.dataset.fill + '%'; }, 200);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Active nav
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
  navLinks.forEach(a => { a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : ''; });
});
