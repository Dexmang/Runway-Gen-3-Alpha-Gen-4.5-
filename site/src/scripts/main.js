/* ============================================================
   ASTON MARTIN VANTAGE — LISTING SITE
   main.js — Navigation, Lightbox, Video Modal, Gallery Filters
   ============================================================ */

/* --- Navigation --- */
(function () {
  const nav    = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (links.classList.contains('open') && !nav.contains(e.target)) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Mark active page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* --- Scroll Animations (IntersectionObserver) --- */
(function () {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

/* --- Gallery Photo Filters --- */
(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  const allPhotos  = Array.from(document.querySelectorAll('.photo-item'));
  const emptyMsg   = document.querySelector('.gallery-empty');

  // Populate filter counts
  filterBtns.forEach(btn => {
    const f = btn.dataset.filter;
    const count = f === 'all'
      ? allPhotos.length
      : allPhotos.filter(p => p.dataset.category === f).length;
    const span = btn.querySelector('.filter-count');
    if (span) span.textContent = `(${count})`;
  });

  function applyFilter(filter) {
    let visible = 0;
    allPhotos.forEach(p => {
      const show = filter === 'all' || p.dataset.category === filter;
      p.classList.toggle('photo-hidden', !show);
      if (show) visible++;
    });
    if (emptyMsg) emptyMsg.style.display = visible === 0 ? 'block' : 'none';

    filterBtns.forEach(btn => {
      const active = btn.dataset.filter === filter;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', active);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });
})();

/* --- Photo Lightbox (filter-aware) --- */
(function () {
  const lightbox  = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbImg     = lightbox.querySelector('.lightbox-img');
  const lbClose   = lightbox.querySelector('.lightbox-close');
  const lbPrev    = lightbox.querySelector('.lightbox-prev');
  const lbNext    = lightbox.querySelector('.lightbox-next');
  const lbCounter = lightbox.querySelector('.lightbox-counter');
  const allPhotos = Array.from(document.querySelectorAll('.photo-item'));
  let currentEl   = null;

  function visiblePhotos() {
    return allPhotos.filter(p => !p.classList.contains('photo-hidden'));
  }

  function openLightbox(el) {
    currentEl = el;
    const img = el.querySelector('img');
    lbImg.src = img.dataset.full || img.src;
    lbImg.alt = img.alt;
    const vis = visiblePhotos();
    const idx = vis.indexOf(el);
    lbCounter.textContent = `${idx + 1} / ${vis.length}`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
    if (currentEl) currentEl.focus();
    currentEl = null;
  }

  function navigate(dir) {
    const vis = visiblePhotos();
    const idx = vis.indexOf(currentEl);
    const next = (idx + dir + vis.length) % vis.length;
    openLightbox(vis[next]);
  }

  allPhotos.forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('click', () => openLightbox(item));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(item); }
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click',  () => navigate(-1));
  lbNext.addEventListener('click',  () => navigate(1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navigate(-1);
    if (e.key === 'ArrowRight')  navigate(1);
  });
})();

/* --- Video Modal --- */
(function () {
  const modal      = document.getElementById('videoModal');
  if (!modal) return;

  const modalVideo = modal.querySelector('video');
  const modalClose = modal.querySelector('.video-modal-close');
  const thumbs     = document.querySelectorAll('.video-thumb[data-src]');

  function openModal(src) {
    modalVideo.innerHTML = `<source src="${src}" type="video/mp4">`;
    modalVideo.load();
    modalVideo.play().catch(() => {});
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modalVideo.pause();
    modalVideo.innerHTML = '';
    document.body.style.overflow = '';
  }

  thumbs.forEach(thumb => {
    thumb.setAttribute('tabindex', '0');
    thumb.setAttribute('role', 'button');
    thumb.addEventListener('click', () => openModal(thumb.dataset.src));
    thumb.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(thumb.dataset.src); }
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
})();

/* --- Specs Sidebar Scrollspy --- */
(function () {
  const sections = document.querySelectorAll('.spec-section[id]');
  const navLinks = document.querySelectorAll('.specs-nav a');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`.specs-nav a[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* --- Contact Form --- */
(function () {
  const form = document.getElementById('inquiryForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const btn  = form.querySelector('[type="submit"]');
    btn.textContent = 'Message Sent';
    btn.disabled    = true;
    btn.style.opacity = '0.7';

    const msg = document.createElement('p');
    msg.style.cssText = 'margin-top:1.2rem;font-size:.82rem;color:var(--lime);letter-spacing:.1em;';
    msg.textContent = `Thank you${name ? ', ' + name : ''}. We'll be in touch shortly.`;
    form.appendChild(msg);
  });
})();

/* --- Back to Top --- */
(function () {
  const btn = document.createElement('button');
  btn.className   = 'back-to-top';
  btn.innerHTML   = '&#8593;';
  btn.setAttribute('aria-label', 'Back to top');
  btn.setAttribute('title', 'Back to top');
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
