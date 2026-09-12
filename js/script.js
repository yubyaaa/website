/* ==========================================================================
   PT TIGA JANGKAR UTAMA - INTERACTIVE JAVASCRIPT
   Features: Sticky Navbar, Smooth Scroll Spy, Mobile Drawer, Intersection Animations,
             Animated Stat Counters, Lightbox Photo Viewer, and Floating WA Routing.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- CONFIGURATION ---
  const COMPANY_WA_PHONE = '6282116313493'; // Business WhatsApp PT Tiga Jangkar Utama

  // --- WHATSAPP PRE-FILLED LINK MAPPER ---
  const waLinkConfig = {
    floating: 'Halo PT Tiga Jangkar Utama, saya ingin berkonsultasi mengenai layanan perusahaan.',
    security: 'Halo PT Tiga Jangkar Utama, saya ingin berkonsultasi mengenai layanan Security Service.',
    cleaning: 'Halo PT Tiga Jangkar Utama, saya ingin berkonsultasi mengenai layanan Cleaning Service.',
    parking: 'Halo PT Tiga Jangkar Utama, saya ingin berkonsultasi mengenai layanan Gate Parkir Otomatis.',
    it: 'Halo PT Tiga Jangkar Utama, saya ingin berkonsultasi mengenai layanan IT & Web Development.',
    ctaBanner: 'Halo PT Tiga Jangkar Utama, saya ingin berkonsultasi mengenai analisis kebutuhan operasional dan digital perusahaan kami.'
  };

  /**
   * Helper function to construct WhatsApp URL
   * @param {string} text - Message prompt text
   * @returns {string} wa.me URL
   */
  function buildWaUrl(text) {
    const encodedText = encodeURIComponent(text);
    return `https://wa.me/${COMPANY_WA_PHONE}?text=${encodedText}`;
  }

  // --- BIND WHATSAPP LINKS TO FLOATING BUTTONS ---
  document.querySelectorAll('[data-wa-type]').forEach(btn => {
    const waType = btn.getAttribute('data-wa-type');
    if (waLinkConfig[waType]) {
      btn.href = buildWaUrl(waLinkConfig[waType]);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    } else {
      btn.href = buildWaUrl(waLinkConfig.floating);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // --- STICKY NAVBAR & BACKDROP BLUR ---
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    function handleNavbarScroll() {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Initial check
  }

  // --- MOBILE NAVIGATION DRAWER ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-drawer-overlay');

  function toggleMobileMenu() {
    const isActive = mobileToggle.classList.toggle('active');
    if (navLinks) navLinks.classList.toggle('active', isActive);
    if (navOverlay) navOverlay.classList.toggle('active', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  }

  function closeMobileMenu() {
    if (mobileToggle) mobileToggle.classList.remove('active');
    if (navLinks) navLinks.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close menu on link click inside drawer
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // --- LIGHTBOX INTERACTIVE PHOTO VIEWER ---
  function initLightbox() {
    // Inject Lightbox container into DOM if not exists
    let lightboxModal = document.getElementById('lightbox-modal');
    if (!lightboxModal) {
      lightboxModal = document.createElement('div');
      lightboxModal.id = 'lightbox-modal';
      lightboxModal.className = 'lightbox-modal';
      lightboxModal.innerHTML = `
        <span class="lightbox-close" id="lightbox-close-btn">&times;</span>
        <img class="lightbox-content" id="lightbox-img" alt="Dokumentasi Full View">
        <div class="lightbox-caption" id="lightbox-caption"></div>
      `;
      document.body.appendChild(lightboxModal);
    }

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

    function openLightbox(imgSrc, captionText) {
      lightboxImg.src = imgSrc;
      lightboxCaption.innerHTML = captionText;
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Attach click event to all documentation cards & gallery items
    document.querySelectorAll('.doc-card').forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const titleEl = card.querySelector('.doc-title');
        const tagEl = card.querySelector('.doc-tag');

        if (img) {
          const caption = `${tagEl ? `<span style="color:var(--wa-green); text-transform:uppercase; font-size:0.85rem;">[${tagEl.innerText}]</span><br>` : ''}${titleEl ? titleEl.innerText : ''}`;
          openLightbox(img.src, caption);
        }
      });
    });

    if (lightboxCloseBtn) {
      lightboxCloseBtn.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target === lightboxCloseBtn) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  initLightbox();

  // --- SCROLL SPY ACTIVE NAV LINK ---
  const sections = document.querySelectorAll('section[id], header[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function scrollSpy() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}` || item.getAttribute('href') === `../index.html#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', scrollSpy);

  // --- INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ---
  const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => animationObserver.observe(el));

  // --- ANIMATED NUMERIC COUNTERS ---
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let animatedStats = false;

  function animateCounters() {
    statNumbers.forEach(stat => {
      const target = parseFloat(stat.getAttribute('data-target'));
      const prefix = stat.getAttribute('data-prefix') || '';
      const suffix = stat.getAttribute('data-suffix') || '';
      const decimals = stat.getAttribute('data-decimals') ? parseInt(stat.getAttribute('data-decimals')) : 0;
      
      let current = 0;
      const duration = 2000; // ms
      const increment = target / (duration / 16);

      const updateCount = () => {
        current += increment;
        if (current < target) {
          stat.innerHTML = `${prefix}${current.toFixed(decimals)}<span>${suffix}</span>`;
          requestAnimationFrame(updateCount);
        } else {
          stat.innerHTML = `${prefix}${target.toFixed(decimals)}<span>${suffix}</span>`;
        }
      };
      updateCount();
    });
  }

  const heroStatsSection = document.querySelector('.hero-stats');
  if (heroStatsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          animateCounters();
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(heroStatsSection);
  }
});
