/* ============================================================
   ASTON MARTIN VANTAGE — LISTING SITE
   main.js — Navigation, Lightbox, Video Modal, Animations
   ============================================================ */

/* --- Navigation --- */
(function () {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  // Scroll: make nav solid
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });

    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
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

/* --- Photo Lightbox --- */
(function () {
  const lightbox     = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbImg        = lightbox.querySelector('.lightbox-img');
  const lbClose      = lightbox.querySelector('.lightbox-close');
  const lbPrev       = lightbox.querySelector('.lightbox-prev');
  const lbNext       = lightbox.querySelector('.lightbox-next');
  const lbCounter    = lightbox.querySelector('.lightbox-counter');
  const photos       = Array.from(document.querySelectorAll('.photo-item'));
  let current        = 0;

  function openLightbox(idx) {
    current = idx;
    const img = photos[idx].querySelector('img');
    lbImg.src = img.dataset.full || img.src.replace('/thumbs/', '/photos/');
    lbImg.alt = img.alt;
    lbCounter.textContent = `${idx + 1} / ${photos.length}`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function navigate(dir) {
    current = (current + dir + photos.length) % photos.length;
    openLightbox(current);
  }

  photos.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click',  () => navigate(-1));
  lbNext.addEventListener('click',  () => navigate(1));

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navigate(-1);
    if (e.key === 'ArrowRight')  navigate(1);
  });
})();

/* --- Video Modal --- */
(function () {
  const modal     = document.getElementById('videoModal');
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
  }

  function closeModal() {
    modal.classList.remove('open');
    modalVideo.pause();
    modalVideo.innerHTML = '';
    document.body.style.overflow = '';
  }

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => openModal(thumb.dataset.src));
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
})();

/* --- Specs sidebar active state on scroll --- */
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
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Message Sent';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    // Show confirmation
    const msg = document.createElement('p');
    msg.style.cssText = 'margin-top:1.2rem;font-size:.82rem;color:var(--lime);letter-spacing:.1em;';
    msg.textContent = `Thank you${name ? ', ' + name : ''}. We'll be in touch shortly.`;
    form.appendChild(msg);
  });
})();
