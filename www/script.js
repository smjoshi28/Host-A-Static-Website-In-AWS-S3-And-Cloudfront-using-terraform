/* ===== script.js ===== */

// ── Scroll-triggered section reveals ──────────────────────────────────────
const sections = document.querySelectorAll('.section');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

sections.forEach(section => revealObserver.observe(section));


// ── Nav active state on scroll ─────────────────────────────────────────────
const navLinks = document.querySelectorAll('.nav-links a');
const sectionTargets = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { threshold: 0.5 }
);

sectionTargets.forEach(s => navObserver.observe(s));


// ── Smooth scroll for nav links ────────────────────────────────────────────
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ── Skill card staggered entrance ─────────────────────────────────────────
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.skill-card');
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 80);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
  skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.25s, background 0.25s';
  });
  skillObserver.observe(skillsSection);
}


// ── Project card staggered entrance ───────────────────────────────────────
const projectCards = document.querySelectorAll('.project-card');

const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.project-card');
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 100);
        });
        projectObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

const projectsSection = document.querySelector('.projects');
if (projectsSection) {
  projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.25s, background 0.25s';
  });
  projectObserver.observe(projectsSection);
}


// ── Nav background on scroll ──────────────────────────────────────────────
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.borderBottomColor = 'rgba(30,30,30,0.9)';
  } else {
    nav.style.borderBottomColor = 'var(--border)';
  }
}, { passive: true });


// ── Cursor glow effect ─────────────────────────────────────────────────────
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(circle, rgba(232,197,71,0.05) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: left 0.08s ease, top 0.08s ease;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
}, { passive: true });


// ── Typing effect for hero subtitle ───────────────────────────────────────
const heroSub = document.querySelector('.hero-sub');
if (heroSub) {
  const originalText = heroSub.textContent;
  const words = originalText.split(' · ');
  heroSub.textContent = '';

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let currentWord = '';
  let displayText = '';

  // Simple sequential reveal — no loop deletion, just build up one time
  const revealSequential = () => {
    const full = words.join(' · ');
    if (charIndex <= full.length) {
      heroSub.textContent = full.slice(0, charIndex);
      charIndex++;
      setTimeout(revealSequential, 38);
    } else {
      heroSub.textContent = full;
    }
  };

  // Delay to let hero animation settle
  setTimeout(revealSequential, 900);
}


// ── Active nav link style injection ───────────────────────────────────────
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--accent) !important; }`;
document.head.appendChild(style);
