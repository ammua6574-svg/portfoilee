
document.addEventListener('DOMContentLoaded', () => {

  
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 800);
  });


  
  const canvas = document.getElementById('matrixCanvas');
  const ctx    = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const chars  = 'アイウエオカキクケコ01ABCDEF</>{}[]()';
  const fontSize = 12;
  let columns  = Math.floor(canvas.width / fontSize);
  let drops    = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(6,9,15,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#22C55E';
    ctx.font      = fontSize + 'px JetBrains Mono, monospace';

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 50);


  /* ── 3. TYPEWRITER — hero prompt ── */
  const promptEl = document.getElementById('typedPrompt');
  const promptText = '~/portfolio $';
  let pi = 0;

  function typePrompt() {
    if (pi < promptText.length) {
      promptEl.textContent += promptText[pi++];
      setTimeout(typePrompt, 80);
    }
  }
  setTimeout(typePrompt, 900);


  
  const roles = [
    'Full Stack Developer',
    'Data Analyst',
    'Backend Engineer',
    'Frontend Builder',
  ];
  const roleEl = document.getElementById('roleText');
  let ri = 0, ci = 0, deleting = false;

  function typeRole() {
    const current = roles[ri];

    if (!deleting) {
      roleEl.textContent = current.slice(0, ++ci);
      if (ci === current.length) {
        deleting = true;
        setTimeout(typeRole, 2000);
        return;
      }
    } else {
      roleEl.textContent = current.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
      }
    }
    setTimeout(typeRole, deleting ? 40 : 80);
  }
  setTimeout(typeRole, 1400);


  
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });


  
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });


  
  const revealEls = document.querySelectorAll('.reveal');
  const observer  = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // stagger siblings
          const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = (idx * 0.1) + 's';
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach(el => observer.observe(el));


  
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => a.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach(s => sectionObserver.observe(s));


  
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.06)';
    });
    tag.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });



  function animateCount(el, target, suffix = '') {
    let current = 0;
    const isFloat = target % 1 !== 0;
    const step    = target / 40;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = isFloat ? current.toFixed(1) + suffix : Math.round(current) + suffix;
    }, 30);
  }

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const nums = entry.target.querySelectorAll('.stat-num');
          nums.forEach(num => {
            const raw    = num.textContent.trim();
            const suffix = raw.replace(/[0-9.]/g, '');
            const value  = parseFloat(raw);
            if (!isNaN(value)) animateCount(num, value, suffix);
          });
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  const statsSection = document.querySelector('.about-stats');
  if (statsSection) statObserver.observe(statsSection);


  
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ── 12. PROJECT CARD TILT ── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 6;
      const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * -6;
      card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});