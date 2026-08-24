/**
 * Termosalud Interactive JavaScript Modules
 */

document.addEventListener('DOMContentLoaded', () => {
  initPopupModals();
  initTechVideoModals();
  initFaqAccordions();
  initMobileMenu();
  initFormSubmissions();
  initVideoPreviews();
  initSmoothScroll();
  initHeroProductSlider();
  initMessengerPills();
  initBlurRevealOnScroll();
  initBentoSpotlights();
  initScreen3BlurTransition();
  initScreen4InteractiveStudio();
  initSplitHero();
  initMobileBrandSwitcher();
  initBentoAccordion();
});

/**
 * 1. Popup Modals (Lead capture / Presentation request)
 */
function initPopupModals() {
  const popup = document.getElementById('popup_request');
  if (!popup) return;

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('a, button, [data-target="#popup_request"], [data-bs-target="#popup_request"], .header-btn, .btn-presentation');
    if (!trigger) return;

    const href = trigger.getAttribute('href') || '';
    const target = trigger.getAttribute('data-target') || trigger.getAttribute('data-bs-target') || '';
    const text = (trigger.textContent || '').trim().toLowerCase();

    if (
      href === '#popup_request' ||
      target === '#popup_request' ||
      trigger.classList.contains('header-btn') ||
      text.includes('презентац') ||
      text.includes('заявка')
    ) {
      if (trigger.closest('#popup_request') && trigger.type === 'submit') return;

      e.preventDefault();
      openPopup(popup);
    }
  });

  const closeBtn = popup.querySelector('.popup_close, .close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closePopup(popup));
  }

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      closePopup(popup);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (popup.classList.contains('is-active') || popup.classList.contains('show'))) {
      closePopup(popup);
    }
  });
}

function openPopup(popup) {
  popup.classList.add('is-active', 'show');
  popup.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closePopup(popup) {
  popup.classList.remove('is-active', 'show');
  popup.style.display = 'none';
  document.body.style.overflow = '';
}

/**
 * 2. Video & Tech Modals
 */
function initTechVideoModals() {
  const modals = document.querySelectorAll('.modal.tech-modal, [id^="techModal"]');

  modals.forEach((modal) => {
    if (!modal.querySelector('.modal-close-btn')) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'modal-close-btn';
      closeBtn.innerHTML = '&times;';
      closeBtn.setAttribute('aria-label', 'Close');
      closeBtn.addEventListener('click', () => closeTechModal(modal));
      const content = modal.querySelector('.modal-content, .modal-dialog') || modal;
      content.appendChild(closeBtn);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeTechModal(modal);
      }
    });
  });

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-target*="techModal"], [data-bs-target*="techModal"], [data-modal*="techModal"], .technologies-item');
    if (!trigger) return;

    const targetId = trigger.getAttribute('data-target') || trigger.getAttribute('data-bs-target') || trigger.getAttribute('data-modal');
    if (targetId && targetId.startsWith('#')) {
      const modal = document.querySelector(targetId);
      if (modal) {
        e.preventDefault();
        openTechModal(modal);
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach((m) => {
        if (m.classList.contains('show')) closeTechModal(m);
      });
    }
  });
}

function openTechModal(modal) {
  modal.classList.add('show');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  const video = modal.querySelector('video');
  if (video) {
    video.currentTime = 0;
    video.play().catch(() => {});
  }
}

function closeTechModal(modal) {
  modal.classList.remove('show');
  modal.style.display = 'none';
  document.body.style.overflow = '';
  const video = modal.querySelector('video');
  if (video) {
    video.pause();
  }
}

/**
 * 3. FAQ Accordions
 */
function initFaqAccordions() {
  document.addEventListener('click', (e) => {
    const header = e.target.closest('.faq_item_title, .faq-title, .accordion-header, .faq_header, .faq-item h3, .faq-item-title');
    if (!header) return;

    const item = header.closest('.faq_item, .accordion-item, .faq-box, .faq-item');
    if (!item) return;

    const content = item.querySelector('.faq_item_content, .faq-answer, .accordion-collapse, .faq_content, .faq-text, p');
    if (!content) return;

    const isOpen = item.classList.contains('active') || item.classList.contains('open');

    if (isOpen) {
      item.classList.remove('active', 'open');
      if (content) content.style.maxHeight = null;
    } else {
      item.classList.add('active', 'open');
      if (content) content.style.maxHeight = (content.scrollHeight + 50) + 'px';
    }
  });
}

/**
 * 4. Mobile Navigation Drawer
 */
function initMobileMenu() {
  const burger = document.querySelector('#custom-burger-btn, .custom-burger-btn, .burger, .header_burger, .menu-toggle, .navbar-toggler, .header-burger');
  const nav = document.querySelector('#mobile-nav-panel, .header-center, .header-nav, .mobile_menu, .navbar-collapse, .header-menu, .header-ul');

  if (burger && nav) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = burger.classList.toggle('active');
      nav.classList.toggle('active', isActive);
      burger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !burger.contains(e.target)) {
        burger.classList.remove('active');
        nav.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
      }
    });

    nav.querySelectorAll('a, button').forEach((link) => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/**
 * 5. Form Submission Handling
 */
function initFormSubmissions() {
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (!form || form.tagName !== 'FORM') return;

    e.preventDefault();

    const btn = form.querySelector('button[type="submit"], input[type="submit"]');
    const origText = btn ? (btn.value || btn.textContent) : '';

    if (btn) {
      if (btn.tagName === 'INPUT') btn.value = 'Надсилаємо...';
      else btn.textContent = 'Надсилаємо...';
      btn.disabled = true;
    }

    setTimeout(() => {
      form.reset();
      if (btn) {
        if (btn.tagName === 'INPUT') btn.value = origText;
        else btn.textContent = origText;
        btn.disabled = false;
      }

      const popup = document.getElementById('popup_request');
      if (popup) closePopup(popup);

      showToast('Дякуємо! Ваша заявка прийнята. Ми зв\'яжемося з вами найближчим часом.');
    }, 600);
  });
}

function showToast(message) {
  let toast = document.querySelector('.form-success-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'form-success-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/**
 * 6. Hover Video Previews
 */
function initVideoPreviews() {
  const previewVideos = document.querySelectorAll('video[muted], .js-preview-video');
  previewVideos.forEach((v) => {
    v.addEventListener('mouseenter', () => {
      v.play().catch(() => {});
    });
  });
}

/**
 * 7. Smooth Anchor Scrolling
 */
function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href');
    if (targetId && targetId !== '#' && targetId !== '#popup_request') {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
}

/**
 * 8. Hero Product Showcase Slider
 */
function initHeroProductSlider() {
  const slides = document.querySelectorAll('.hero-product-slide');
  const controls = document.querySelectorAll('.slider-arrow, .slider-dot');
  if (!slides.length || !controls.length) return;

  let current = 0;
  let timer = null;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    controls.forEach((c, i) => c.classList.toggle('active', i === index));
    current = index;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(nextSlide, 4500);
  }

  function stopTimer() {
    if (timer) clearInterval(timer);
  }

  controls.forEach((control, i) => {
    // Switch immediately on hover (mouseenter)
    control.addEventListener('mouseenter', () => {
      showSlide(i);
      stopTimer();
    });

    // Also support click
    control.addEventListener('click', () => {
      showSlide(i);
      startTimer();
    });
  });

  const slider = document.querySelector('.hero-product-slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopTimer);
    slider.addEventListener('mouseleave', startTimer);
  }

  startTimer();
}

/**
 * 9. Messenger Pill Toggle
 */
function initMessengerPills() {
  document.addEventListener('change', (e) => {
    if (e.target.classList.contains('messenger-radio')) {
      const row = e.target.closest('.messenger-pills-row');
      if (row) {
        row.querySelectorAll('.messenger-pill').forEach(pill => pill.classList.remove('active'));
        const label = e.target.closest('.messenger-pill');
        if (label) label.classList.add('active');
      }
    }
  });
}

/**
 * 10. Blur Reveal On Scroll Animation
 */
function initBlurRevealOnScroll() {
  const elements = document.querySelectorAll('.blur-reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  });

  elements.forEach((el) => observer.observe(el));
}

/**
 * 11. Bento Grid Interactive Cursor Spotlight Tracking
 */
function initBentoSpotlights() {
  const cards = document.querySelectorAll('.bento-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * 12. Screen 3 Clean Unclipped Flow & Screen 4 Smooth Curtain Slide-Over
 */
function initScreen3BlurTransition() {
  const s3 = document.getElementById('why-us');
  const s4 = document.querySelector('.application-presentation');
  if (!s3 || !s4) return;

  const container = s3.querySelector('.bento-container');
  if (!container) return;

  let ticking = false;

  function updateVisuals() {
    const s4Rect = s4.getBoundingClientRect();
    const winHeight = window.innerHeight;

    // Blur only activates when Screen 4 rises up to cover the bento section
    if (s4Rect.top < winHeight && s4Rect.top > 0) {
      const overlap = winHeight - s4Rect.top;
      // Start softening as Screen 4 glides over
      const progress = Math.min(1, Math.max(0, overlap / (winHeight * 0.75)));
      
      const blurPx = (progress * 12).toFixed(1);
      const scale = (1 - progress * 0.03).toFixed(3);
      const opacity = (1 - progress * 0.3).toFixed(2);

      if (progress > 0.02) {
        container.style.filter = `blur(${blurPx}px)`;
        container.style.transform = `scale(${scale})`;
        container.style.opacity = `${opacity}`;
      } else {
        container.style.filter = 'none';
        container.style.transform = 'none';
        container.style.opacity = '1';
      }
    } else if (s4Rect.top >= winHeight) {
      container.style.filter = 'none';
      container.style.transform = 'none';
      container.style.opacity = '1';
    } else {
      container.style.filter = 'blur(12px)';
      container.style.transform = 'scale(0.97)';
      container.style.opacity = '0.7';
    }
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateVisuals();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateVisuals();
}

/**
 * 13. Screen 4 Interactive Masterclass Studio (Format Switcher, Device Selector & Hotspots)
 */
function initScreen4InteractiveStudio() {
  const section = document.getElementById('presentation-section');
  if (!section) return;

  // 1. Format Switcher (Clinic vs Showroom)
  const formatButtons = section.querySelectorAll('.format-tab-btn');
  const cityInput = section.querySelector('#pres_city');

  formatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      formatButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const format = btn.getAttribute('data-format');
      if (cityInput) {
        if (format === 'showroom') {
          cityInput.value = 'м. Київ (Демо-центр)';
        } else if (cityInput.value === 'м. Київ (Демо-центр)') {
          cityInput.value = '';
        }
      }
    });
  });

  // 2. Device Selector Pills
  const devicePills = section.querySelectorAll('.device-pill');
  devicePills.forEach(pill => {
    pill.addEventListener('click', () => {
      devicePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const radio = pill.querySelector('.device-radio');
      if (radio) radio.checked = true;
    });
  });

  // 3. Interactive Clinical Hotspots
  const hotspots = section.querySelectorAll('.clinical-hotspot');
  hotspots.forEach(hotspot => {
    const trigger = hotspot.querySelector('.hotspot-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = hotspot.classList.contains('active');
      hotspots.forEach(h => h.classList.remove('active'));
      if (!isActive) hotspot.classList.add('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.clinical-hotspot')) {
      hotspots.forEach(h => h.classList.remove('active'));
    }
  });
}

/**
 * 14. Screen 2 Interactive Split Hero (70/30 Dynamic Hover/Tap Expand)
 */
function initSplitHero() {
  const container = document.getElementById('split-devices-hero');
  if (!container) return;

  const panels = container.querySelectorAll('.split-panel');
  if (!panels.length) return;

  function setActivePanel(activePanel) {
    panels.forEach(p => {
      const isAct = (p === activePanel);
      p.classList.toggle('is-expanded', isAct);
      p.classList.toggle('is-collapsed', !isAct);
      const video = p.querySelector('video');
      if (video) {
        if (isAct) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }

  panels.forEach(panel => {
    // Hover (Desktop)
    panel.addEventListener('mouseenter', () => {
      setActivePanel(panel);
    });

    // Click / Tap (Mobile & Desktop)
    panel.addEventListener('click', (e) => {
      // Allow button and anchor clicks to work naturally
      if (e.target.closest('a') || e.target.closest('button')) return;
      setActivePanel(panel);
    });
  });

  // Initial state check
  const initialActive = container.querySelector('.split-panel.is-expanded') || panels[0];
  if (initialActive) {
    const activeVideo = initialActive.querySelector('video');
    if (activeVideo) activeVideo.play().catch(() => {});
  }
}


/**
 * 15. Mobile Brand Switcher & Vertical Video Stage
 */
function initMobileBrandSwitcher() {
  const showcase = document.getElementById('mobile-device-showcase');
  if (!showcase) return;

  const tabs = showcase.querySelectorAll('.mobile-brand-tab');
  const panels = showcase.querySelectorAll('.mobile-device-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      tabs.forEach((t) => t.classList.toggle('active', t === tab));
      panels.forEach((p) => {
        const isMatch = p.getAttribute('data-panel') === target;
        p.classList.toggle('active', isMatch);
        const vid = p.querySelector('video');
        if (vid) {
          if (isMatch) {
            vid.currentTime = 0;
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        }
      });
    });
  });
}

/**
 * 16. Screen 3 Liquid Glass Mirror Accordion (Mobile & Tablet)
 */
function initBentoAccordion() {
  const bentoGrid = document.querySelector('.swiss-bento-grid');
  if (!bentoGrid) return;

  const cards = bentoGrid.querySelectorAll('.bento-card');
  cards.forEach((card) => {
    const toggle = card.querySelector('.bento-accordion-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', (e) => {
      if (window.innerWidth > 991) return;

      const isCurrentlyOpen = card.classList.contains('is-open');

      // Close other cards for sleek single-panel mirror view
      cards.forEach((c) => {
        if (c !== card) c.classList.remove('is-open');
      });

      card.classList.toggle('is-open', !isCurrentlyOpen);
    });
  });
}

