(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------ */
  /* Loader                                                              */
  /* ------------------------------------------------------------------ */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('is-hidden'), 500);
  });
  // Safety net in case 'load' already fired or is slow to trigger.
  setTimeout(() => loader && loader.classList.add('is-hidden'), 3000);

  /* ------------------------------------------------------------------ */
  /* Scroll progress bar                                                 */
  /* ------------------------------------------------------------------ */
  const progressBar = document.getElementById('scrollProgress');
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  }

  /* ------------------------------------------------------------------ */
  /* Header state + active nav link                                     */
  /* ------------------------------------------------------------------ */
  const header = document.getElementById('siteHeader');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  }

  function updateActiveNav() {
    let currentId = sections[0] ? sections[0].id : null;
    const offset = 140;
    for (const section of sections) {
      if (section.getBoundingClientRect().top - offset <= 0) {
        currentId = section.id;
      }
    }
    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + currentId);
    });
  }

  const toTopBtn = document.getElementById('toTop');
  function updateToTop() {
    if (toTopBtn) toTopBtn.classList.toggle('is-visible', window.scrollY > 500);
  }

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateProgress();
        updateHeader();
        updateActiveNav();
        updateToTop();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });
  updateProgress(); updateHeader(); updateActiveNav(); updateToTop();

  toTopBtn && toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ------------------------------------------------------------------ */
  /* Mobile nav toggle                                                   */
  /* ------------------------------------------------------------------ */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mainNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Fade-up reveal + tokenomics bar fill + percentage counters          */
  /* ------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));

    const tokenCards = document.querySelectorAll('.token-card');
    const tokenObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const bar = card.querySelector('.token-bar');
          const pctEl = card.querySelector('.token-pct');
          if (bar) bar.classList.add('in-view');
          if (pctEl) animateCount(pctEl, parseInt(pctEl.dataset.target, 10) || 0);
          tokenObserver.unobserve(card);
        }
      });
    }, { threshold: 0.3 });
    tokenCards.forEach(card => tokenObserver.observe(card));
  } else {
    // No IntersectionObserver support, or reduced motion: show everything immediately.
    revealEls.forEach(el => el.classList.add('is-visible'));
    document.querySelectorAll('.token-bar').forEach(bar => bar.classList.add('in-view'));
    document.querySelectorAll('.token-pct').forEach(pctEl => {
      pctEl.textContent = (pctEl.dataset.target || '0') + '%';
    });
  }

  function animateCount(el, target) {
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + '%';
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ------------------------------------------------------------------ */
  /* Floating particles (canvas)                                        */
  /* ------------------------------------------------------------------ */
  const canvas = document.getElementById('particles');
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;
    const COLORS = ['rgba(168,85,247,', 'rgba(231,182,76,', 'rgba(192,132,252,'];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function initParticles() {
      const count = Math.min(70, Math.floor((width * height) / 22000));
      particles = Array.from({ length: count }, () => spawnParticle());
    }

    function spawnParticle() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.6,
        speedY: Math.random() * 0.35 + 0.08,
        speedX: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.5 + 0.15,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        twinkle: Math.random() * Math.PI * 2
      };
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.twinkle += 0.02;
        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const flicker = (Math.sin(p.twinkle) + 1) / 2;
        const alpha = p.alpha * (0.6 + flicker * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + alpha.toFixed(3) + ')';
        ctx.shadowColor = p.color + '0.8)';
        ctx.shadowBlur = 6;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { resize(); initParticles(); }, 200);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Smooth-scroll offset correction for fixed header                    */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerHeight = document.getElementById('siteHeader')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

})();
