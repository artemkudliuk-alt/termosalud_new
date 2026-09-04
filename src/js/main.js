
// ==========================================================================
// CERTIFICATE FULLSCREEN LIGHTBOX HANDLERS (ZERO SCROLL JUMP)
// ==========================================================================
window._savedCertScrollTop = 0;

window.openCertLightbox = function(imgSrc, captionText) {
  const modal = document.getElementById('certLightboxModal');
  const img = document.getElementById('certLightboxImg');
  const caption = document.getElementById('certLightboxCaption');
  if (!modal || !img) return;

  // Save current scroll position
  window._savedCertScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  img.src = imgSrc;
  if (caption) caption.textContent = captionText || '';
  
  modal.classList.add('is-open');
};

window.closeCertLightbox = function(e) {
  if (e && e.target && e.target.closest('.cert-lightbox-dialog') && !e.target.classList.contains('cert-lightbox-close')) return;
  if (e) {
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
  }
  
  const modal = document.getElementById('certLightboxModal');
  if (!modal) return;
  
  modal.classList.remove('is-open');

  // Seamlessly restore scroll position without page jumping to top
  if (typeof window._savedCertScrollTop === 'number') {
    window.scrollTo({
      top: window._savedCertScrollTop,
      behavior: 'instant'
    });
  }
};

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('certLightboxModal');
    if (modal && modal.classList.contains('is-open')) {
      window.closeCertLightbox();
    }
  }
});

// SEO Article Toggle
window.toggleZionicSeoArticle = function() {
  const content = document.getElementById('seoExpandableContent');
  const btn = document.getElementById('seoToggleBtn');
  if (!content || !btn) return;
  
  const isExpanded = content.classList.contains('expanded');
  const label = btn.querySelector('.seo-btn-label');
  const arrow = btn.querySelector('.seo-btn-arrow');
  
  if (isExpanded) {
    content.classList.remove('expanded');
    if (label) label.textContent = 'Читати повністю';
    if (arrow) arrow.textContent = '∨';
  } else {
    content.classList.add('expanded');
    if (label) label.textContent = 'Приховати';
    if (arrow) arrow.textContent = '∧';
  }
};


// ==========================================================================
// ROBUST ZIONIC FAQ ACCORDION TOGGLE
// ==========================================================================
window.toggleZionicFaq = function(btn) {
  const card = btn.closest('.faq-accordion-card');
  if (!card) return;
  const isCurrentlyActive = card.classList.contains('active');
  const icon = card.querySelector('.faq-icon');

  if (isCurrentlyActive) {
    card.classList.remove('active');
    if (icon) icon.textContent = '+';
  } else {
    // Optionally close other cards in the same grid for accordion elegance
    const allCards = card.parentElement ? card.parentElement.querySelectorAll('.faq-accordion-card') : [];
    allCards.forEach(c => {
      if (c !== card) {
        c.classList.remove('active');
        const otherIcon = c.querySelector('.faq-icon');
        if (otherIcon) otherIcon.textContent = '+';
      }
    });

    card.classList.add('active');
    if (icon) icon.textContent = '−';
  }
};

/**
 * Termosalud Interactive JavaScript Modules
 */

function initAll() {
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
  initScreen4InteractiveStudio();
  initSplitHero();
  initMobileBrandSwitcher();
  initBentoAccordion();
  initScrollToTop();
  initPartnersDraggableCarousel();
  initZionicScrollManipula();
  initZionicCurtainSlide();
  initZionicVideoModal();
  initKnowledgeFilterSwipe();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

/**
 * 1. Popup Modals (Liquid Glass Lead capture / Presentation request)
 */
function initPopupModals() {
  const popup = document.getElementById('popup_request');
  if (!popup) return;

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('a, button, [data-target="#popup_request"], [data-bs-target="#popup_request"], .header-btn, .living-stage-glass-btn, .btn-presentation');
    if (!trigger) return;

    const href = trigger.getAttribute('href') || '';
    const target = trigger.getAttribute('data-target') || trigger.getAttribute('data-bs-target') || '';
    const text = (trigger.textContent || '').trim().toLowerCase();

    // STRICT EXCLUSION: Never open popup modal for in-page form CTA buttons, video buttons, or anchor links!
    if (
      href === '#application' ||
      href === '#test-drive' ||
      href === '#presentation' ||
      trigger.classList.contains('zionic-primary-btn') ||
      trigger.classList.contains('linfopress-primary-btn') ||
      trigger.classList.contains('zionic-secondary-btn') ||
      trigger.classList.contains('linfopress-secondary-btn') ||
      trigger.id === 'open_zionic_video_btn' ||
      trigger.id === 'open-linfopress-video-btn' ||
      trigger.closest('#application') ||
      trigger.closest('#test-drive')
    ) {
      return;
    }

    if (
      href === '#popup_request' ||
      target === '#popup_request' ||
      trigger.classList.contains('header-btn') ||
      trigger.classList.contains('living-stage-glass-btn') ||
      (text.includes('презентац') && !href.startsWith('#')) ||
      (text.includes('тест-драйв') && !href.startsWith('#')) ||
      (text.includes('заявка') && !href.startsWith('#'))
    ) {
      if (trigger.closest('#popup_request') && trigger.type === 'submit') return;

      e.preventDefault();
      openPopup(popup);
    }
  });

  // Multiple close buttons (backdrop, X button, etc.)
  const closeBtns = popup.querySelectorAll('.popup_close, .glass-modal-close, .close');
  closeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closePopup(popup);
    });
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup || e.target.classList.contains('glass-modal-backdrop')) {
      closePopup(popup);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (popup.classList.contains('is-active') || popup.classList.contains('show'))) {
      closePopup(popup);
    }
  });

  // Format Switcher inside Modal (Clinic vs Showroom)
  const formatBtns = popup.querySelectorAll('.format-tab-btn');
  formatBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      formatBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Device Selector Pills inside Modal
  const devicePills = popup.querySelectorAll('.device-pill');
  devicePills.forEach((pill) => {
    pill.addEventListener('click', () => {
      devicePills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      const radio = pill.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // Messenger Pills inside Modal
  const messengerPills = popup.querySelectorAll('.messenger-pill');
  messengerPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      messengerPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      const radio = pill.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });
}

function openPopup(popup) {
  if (!popup) return;
  popup.classList.add('is-active', 'show');
  popup.style.display = 'flex';
  document.documentElement.classList.add('modal-open-lock');
  document.body.classList.add('modal-open-lock');
}
window.openPopup = openPopup;

function closePopup(popup) {
  if (!popup) return;
  popup.classList.remove('is-active', 'show');
  popup.style.display = 'none';
  document.documentElement.classList.remove('modal-open-lock');
  document.body.classList.remove('modal-open-lock');
}
window.closePopup = closePopup;

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
    const header = e.target.closest('.faq_item_title, .faq-title, .accordion-header, .faq_header, .faq-item h3, .faq-item-title, .faq-question-btn');
    if (!header) return;

    const item = header.closest('.faq_item, .accordion-item, .faq-box, .faq-item');
    if (!item) return;

    const content = item.querySelector('.faq_item_content, .faq-answer, .accordion-collapse, .faq_content, .faq-text');
    if (!content) return;

    const isOpen = item.classList.contains('active') || item.classList.contains('open');

    if (isOpen) {
      item.classList.remove('active', 'open');
      header.setAttribute('aria-expanded', 'false');
      if (content) content.style.display = 'none';
    } else {
      item.classList.add('active', 'open');
      header.setAttribute('aria-expanded', 'true');
      if (content) content.style.display = 'block';
    }
  });

  // Video embed on click for .video-preview-wrapper
  document.addEventListener('click', (e) => {
    const videoWrap = e.target.closest('.video-preview-wrapper');
    if (!videoWrap) return;

    const videoId = videoWrap.getAttribute('data-video-id') || 'CYsDii-PZ7s';
    videoWrap.innerHTML = `
      <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:20px;background:#000;">
        <iframe 
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" 
          style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    `;
  });

  // Zionic Unified Knowledge Hub Accordion Toggle
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.knowledge-trigger');
    if (!trigger) return;
    const item = trigger.closest('.knowledge-item');
    if (!item) return;
    const isOpen = item.classList.contains('active');
    const body = item.querySelector('.knowledge-body');

    if (isOpen) {
      item.classList.remove('active');
      trigger.setAttribute('aria-expanded', 'false');
      if (body) body.style.display = 'none';
    } else {
      item.classList.add('active');
      trigger.setAttribute('aria-expanded', 'true');
      if (body) body.style.display = 'block';
    }
  });

  // Knowledge Hub Category Filter Tabs
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.knowledge-filter-btn');
    if (!btn) return;
    const bar = btn.closest('.knowledge-filter-bar');
    if (!bar) return;
    bar.querySelectorAll('.knowledge-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter') || 'all';
    const card = btn.closest('.zionic-unified-knowledge-card');
    if (!card) return;

    card.querySelectorAll('.knowledge-item').forEach((item) => {
      const cat = item.getAttribute('data-category');
      if (filter === 'all' || cat === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });

  // Global format switcher delegation
  document.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('.format-tab-btn');
    if (!tabBtn) return;
    const parent = tabBtn.closest('.format-switcher');
    if (parent) {
      parent.querySelectorAll('.format-tab-btn').forEach(b => b.classList.remove('active'));
      tabBtn.classList.add('active');
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
 * 5. Form Submission Handling (Real Email Dispatch to zionic.ua@gmail.com)
 */
window.submitTermosaludLead = async function(e, formTitle) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  
  let form = null;
  if (e && e.target && e.target.tagName === 'FORM') {
    form = e.target;
  } else if (e && e.currentTarget && e.currentTarget.tagName === 'FORM') {
    form = e.currentTarget;
  } else if (e && e.tagName === 'FORM') {
    form = e;
  } else if (e && e.target) {
    form = e.target.closest('form');
  }
  if (!form) return;

  if (form.getAttribute('data-submitting') === 'true') return;
  form.setAttribute('data-submitting', 'true');

  const btn = form.querySelector('button[type="submit"], input[type="submit"], .submit-presentation-btn, .lp-pres-submit-btn, .modal-submit-btn');
  const origBtnHtml = btn ? btn.innerHTML : '';
  const origBtnText = btn ? (btn.value || btn.textContent) : '';

  // Extract Name & Position
  const nameEl = form.querySelector('#partner_name, #z_partner_name, #l_partner_name, #modal_name, input[name="name"], input[placeholder*="ім\'я" i], input[placeholder*="Ім\'я" i]');
  const clientName = nameEl ? nameEl.value.trim() : '';

  // Extract Phone
  const phoneEl = form.querySelector('#partner_phone, #z_partner_phone, #l_partner_phone, #modal_phone, input[name="phone"], input[type="tel"], input[placeholder*="+380"]');
  const clientPhone = phoneEl ? phoneEl.value.trim() : '';

  // Extract Email
  const emailEl = form.querySelector('#partner_email, #z_partner_email, #l_partner_email, input[name="email"], input[type="email"]');
  const clientEmail = emailEl ? emailEl.value.trim() : '';

  // Extract City & Clinic
  const cityEl = form.querySelector('#partner_city, #z_partner_city, #l_partner_city, #modal_city, input[name="city"], input[placeholder*="Місто" i], input[placeholder*="місто" i]');
  const clientCity = cityEl ? cityEl.value.trim() : '';

  // Extract Messenger
  let selectedMessenger = '';
  const checkedRadio = form.querySelector('input[type="radio"][name*="messenger"]:checked');
  if (checkedRadio) {
    selectedMessenger = checkedRadio.value;
  } else {
    const checkedBoxes = Array.from(form.querySelectorAll('input[type="checkbox"][name*="messenger"]:checked'))
      .map(cb => cb.value || cb.name.replace('messenger_', ''));
    if (checkedBoxes.length > 0) {
      selectedMessenger = checkedBoxes.join(', ');
    }
  }
  if (!selectedMessenger) {
    selectedMessenger = 'WhatsApp (за замовчуванням)';
  }

  // Extract Format & Device (from modal or page context)
  let formatDetails = '';
  const popupWrap = form.closest('#popup_request') || document.getElementById('popup_request');
  if (form.closest('#popup_request') && popupWrap) {
    const activeFormat = popupWrap.querySelector('.format-tab-btn.active');
    if (activeFormat) {
      formatDetails = activeFormat.textContent.trim().replace(/\s+/g, ' ');
    }
    const checkedDevice = popupWrap.querySelector('input[name="modal_device"]:checked');
    if (checkedDevice) {
      const devLabel = checkedDevice.closest('.device-pill')?.textContent.trim() || checkedDevice.value;
      formatDetails += (formatDetails ? ' | Апарат: ' : 'Апарат: ') + devLabel;
    }
  }

  // Visual loading state
  if (btn) {
    btn.disabled = true;
    btn.classList.add('is-submitting');
    if (btn.tagName === 'INPUT') {
      btn.value = 'Надсилання...';
    } else {
      btn.innerHTML = `<span style="display:inline-flex;align-items:center;justify-content:center;gap:8px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 0.8s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"></path>
        </svg>
        <span>Надсилання...</span>
      </span>`;
    }
  }

  // Payload for FormSubmit (Exclusively for zionic.ua@gmail.com)
  const payload = {
    "_subject": `🔔 Нова заявка Termosalud: ${clientName || 'Клієнт'} (${clientPhone})`,
    "_template": "table",
    "_captcha": "false",
    "Форма / Джерело": formTitle || 'Форма на сайті',
    "Клієнт (Ім'я / Посада)": clientName || 'Не вказано',
    "Номер телефону": clientPhone || 'Не вказано',
    "Email": clientEmail || 'Не вказано',
    "Місто / Клініка": clientCity || 'Не вказано',
    "Зручний месенджер": selectedMessenger,
    "Формат тесту / Апарат": formatDetails || '—',
    "Сторінка сайту": window.location.href,
    "Дата та час": new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })
  };

  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));

    // Reset inputs
    form.reset();

    // Close any open popups
    const universalPopup = document.getElementById('popup_request');
    if (universalPopup && (universalPopup.classList.contains('is-active') || universalPopup.classList.contains('show'))) {
      if (typeof window.closePopup === 'function') {
        window.closePopup(universalPopup);
      } else {
        universalPopup.classList.remove('is-active', 'show');
        universalPopup.style.display = 'none';
      }
    }
    const linfopressModal = document.getElementById('linfopress-presentation-modal-overlay');
    if (linfopressModal && linfopressModal.classList.contains('active')) {
      linfopressModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    showToast('Дякуємо! Ваша заявка успішно прийнята. Ми зв\'яжемося з вами найближчим часом.');
  } catch (err) {
    console.error('Submission error:', err);
    showToast('Виникла помилка. Спробуйте ще раз або зателефонуйте нам.');
  } finally {
    form.removeAttribute('data-submitting');
    if (btn) {
      btn.disabled = false;
      btn.classList.remove('is-submitting');
      if (btn.tagName === 'INPUT') {
        btn.value = origBtnText;
      } else {
        btn.innerHTML = origBtnHtml;
      }
    }
  }
};

function initFormSubmissions() {
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (!form || form.tagName !== 'FORM') return;
    if (form.getAttribute('data-submitting') === 'true') return;

    e.preventDefault();
    const title = form.getAttribute('data-form-name') || 'Заявка з сайту Termosalud';
    window.submitTermosaludLead(e, title);
  });
}

function showToast(message) {
  let toast = document.querySelector('.form-success-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'form-success-toast';
    document.body.appendChild(toast);
  }

  const isWarning = message.includes('⚠️');
  toast.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${isWarning ? '#f59e0b' : '#10b981'}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
      ${isWarning 
        ? '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>' 
        : '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'}
    </svg>
    <span style="line-height:1.4;">${message}</span>
  `;

  toast.classList.add('show');
  if (window._toastTimeout) clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
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

  // Interactive YouTube Compact Facades
  document.addEventListener('click', (e) => {
    const wrapper = e.target.closest('.zionic-youtube-compact-wrapper');
    if (!wrapper || wrapper.classList.contains('is-active')) return;

    const videoId = wrapper.getAttribute('data-video-id') || (wrapper.innerHTML.includes('LINFOPRESS') ? 'K1v77enueJ8' : 'CYsDii-PZ7s');
    const videoTitle = wrapper.getAttribute('data-video-title') || 'Termosalud Presentation';

    wrapper.classList.add('is-active');
    wrapper.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1" title="${videoTitle}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="width: 100%; height: 100%; position: absolute; inset: 0; border: none;"></iframe>`;
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
      let targetElement = document.querySelector(targetId);
      if (targetId === '#test-drive' || targetId === '#application') {
        const formCard = targetElement ? (targetElement.querySelector('.presentation-form-card') || targetElement) : document.querySelector('.presentation-form-card');
        if (formCard) targetElement = formCard;
      }
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
 * 10. Transitions-Dev: Scroll-Driven Entrance & Progressive Reveal System
 */
function initBlurRevealOnScroll() {
  // Ensure all elements are immediately visible
  document.querySelectorAll('.t-reveal-header, .t-reveal-header-sub, .t-reveal-item, .t-reveal-from-left, .t-reveal-from-right, .t-reveal-scale, .blur-reveal').forEach((el) => {
    el.classList.add('is-revealed');
  });
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
 * 15. Mobile Device Vertical Video Playback (Sequential Autoplay on Scroll)
 */
function initMobileBrandSwitcher() {
  const showcase = document.getElementById('mobile-device-showcase');
  if (!showcase) return;

  const videos = showcase.querySelectorAll('.mobile-vertical-video');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const vid = entry.target;
        if (entry.isIntersecting) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      });
    }, { threshold: 0.2 });

    videos.forEach((vid) => observer.observe(vid));
  } else {
    videos.forEach((vid) => vid.play().catch(() => {}));
  }
}

/**
 * 16. Screen 3 Interactive 6-Row Benefits Dropdown Accordion (Desktop & Mobile)
 */
function initBentoAccordion() {
  const bentoGrid = document.querySelector('.swiss-bento-grid');
  if (!bentoGrid) return;

  const cards = bentoGrid.querySelectorAll('.bento-card');
  if (cards.length === 0) return;

  // Guarantee first card (01 / Фінансова вигода) is open by default on page load
  const hasOpenCard = Array.from(cards).some((c) => c.classList.contains('is-open'));
  if (!hasOpenCard && cards[0]) {
    cards[0].classList.add('is-open');
  }

  cards.forEach((card) => {
    const toggle = card.querySelector('.bento-accordion-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isCurrentlyOpen = card.classList.contains('is-open');

      // Close all other cards for a sleek single-expanded accordion view
      cards.forEach((c) => {
        if (c !== card) c.classList.remove('is-open');
      });

      card.classList.toggle('is-open', !isCurrentlyOpen);
    });
  });
}

/**
 * 17. Scroll to Top Button
 */
function initScrollToTop() {
  const btn = document.getElementById('scrollToTopBtn') || document.querySelector('.scroll-to-top');
  if (!btn) return;

  const handleScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
    if (scrollY > 250) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  document.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 18. Interactive Partners Draggable & Swipeable Carousel
 */
function initPartnersDraggableCarousel() {
  const wrap = document.querySelector('.modern-partners-carousel-wrap');
  if (!wrap) return;
  const track = wrap.querySelector('.partners-marquee-track');
  if (!track) return;

  // Turn off static CSS animation so JS has silky smooth 60fps physics control
  track.style.animation = 'none';

  let currentX = 0;
  let autoSpeed = -0.7; // default gentle drift
  let velocity = 0;
  let isHovered = false;
  let isDragging = false;
  let startX = 0;
  let lastX = 0;
  let dragDistance = 0;
  let animationFrameId = null;

  // Measure half-width of the track for seamless wrap-around loop
  const getHalfWidth = () => {
    return track.scrollWidth / 2 || 1200;
  };

  const tick = () => {
    const halfWidth = getHalfWidth();

    if (!isDragging) {
      // Smooth momentum / flick deceleration
      if (Math.abs(velocity) > 0.05) {
        velocity *= 0.93;
      } else {
        velocity = 0;
      }

      const speed = velocity !== 0 ? velocity : (isHovered ? 0 : autoSpeed);
      currentX += speed;

      // Wrap around seamlessly
      while (currentX <= -halfWidth) {
        currentX += halfWidth;
      }
      while (currentX > 0) {
        currentX -= halfWidth;
      }

      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
    }

    animationFrameId = requestAnimationFrame(tick);
  };

  animationFrameId = requestAnimationFrame(tick);

  // Mouse & Touch Drag Handlers
  const onStart = (clientX) => {
    isDragging = true;
    startX = clientX;
    lastX = clientX;
    dragDistance = 0;
    velocity = 0;
    wrap.classList.add('is-dragging');
  };

  const onMove = (clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - lastX;
    lastX = clientX;
    dragDistance += Math.abs(deltaX);

    currentX += deltaX;
    velocity = deltaX * 0.75; // Capture swipe velocity for flick release

    const halfWidth = getHalfWidth();
    while (currentX <= -halfWidth) {
      currentX += halfWidth;
    }
    while (currentX > 0) {
      currentX -= halfWidth;
    }

    track.style.transform = `translate3d(${currentX}px, 0, 0)`;
  };

  const onEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    wrap.classList.remove('is-dragging');
  };

  // Mouse drag listeners
  wrap.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    onStart(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      onMove(e.clientX);
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      onEnd();
    }
  });

  // Touch swipe listeners for mobile
  wrap.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length === 1) {
      onStart(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches && e.touches.length === 1) {
      onMove(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (isDragging) {
      onEnd();
    }
  });

  window.addEventListener('touchcancel', () => {
    if (isDragging) {
      onEnd();
    }
  });

  // Hover detection (pauses auto-scroll on desktop)
  wrap.addEventListener('mouseenter', () => {
    isHovered = true;
  });

  wrap.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  // Prevent link click when dragging/swiping
  wrap.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (dragDistance > 8) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  });
}

/**
 * 12. Zionic 3D Manipula Scroll Zoom Animation
 */
function initZionicScrollManipula() {
  const scrollManipula = document.getElementById('zionic-scroll-manipula');
  const pillarsSection = document.querySelector('.zionic-pillars-section');

  if (!scrollManipula || !pillarsSection) return;

  let ticking = false;
  const updateZoom = () => {
    const rect = pillarsSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      // Progress from 0 (entered from bottom) to 1 (passed top)
      const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);
      // Smooth scale from 0.94 to 1.18 with subtle rotation
      const scale = 0.94 + progress * 0.22;
      const translateY = (progress - 0.5) * -35;
      const rotate = (progress - 0.5) * -8;
      scrollManipula.style.transform = `scale(${scale.toFixed(3)}) translateY(${translateY.toFixed(1)}px) rotate(${rotate.toFixed(1)}deg)`;
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateZoom);
      ticking = true;
    }
  }, { passive: true });

  // Initial update
  updateZoom();
}

/**
 * 18. Zionic Multi-Stage Curtain Slide Snap Transitions
 * - Stage 1: Infographic (#technologies) -> Manipula (#manipula)
 * - Stage 2: Accuracy & Video (#zionic-accuracy) -> Treatments (#treatment-areas)
 */
function initZionicCurtainSlide() {
  // Disabled wheel and touch hijacking to ensure buttery-smooth unrestricted scrolling across all sections
  return;
}

/**
 * 19. Apparatus Video Lightbox Modal & Smooth Scroll to Application Form
 */
window.openZionicVideoLightbox = function(videoId) {
  const vid = videoId || 'cqskAxvFlxY';
  const modal = document.getElementById('zionic_video_modal');
  const container = document.getElementById('zionic_modal_video_container');
  if (!modal || !container) return;
  container.innerHTML = `
    <iframe 
      src="https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&rel=0&modestbranding=1" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen style="width:100%; height:100%; border:none;">
    </iframe>
  `;
  modal.style.display = 'flex';
  modal.classList.add('is-active', 'show');
  // Intentionally NO modal-open-lock: keep page scroll position 100% frozen in place without snapping!
};

window.closeZionicVideoLightbox = function() {
  const modal = document.getElementById('zionic_video_modal');
  const container = document.getElementById('zionic_modal_video_container');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('is-active', 'show');
  }
  if (container) container.innerHTML = '';
};

window.openLinfopressVideoLightbox = function(videoId) {
  const vid = videoId || 'K1v77enueJ8';
  const modal = document.getElementById('linfopress_video_modal');
  const container = document.getElementById('linfopress_modal_video_container');
  if (!modal || !container) return;
  container.innerHTML = `
    <iframe 
      src="https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&rel=0&modestbranding=1" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen style="width:100%; height:100%; border:none;">
    </iframe>
  `;
  modal.style.display = 'flex';
  modal.classList.add('is-active', 'show');
};

window.closeLinfopressVideoLightbox = function() {
  const modal = document.getElementById('linfopress_video_modal');
  const container = document.getElementById('linfopress_modal_video_container');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('is-active', 'show');
  }
  if (container) container.innerHTML = '';
};

function initZionicVideoModal() {
  // Global click delegator for Video Buttons and CTA Scroll
  document.addEventListener('click', (e) => {
    // 1. Primary CTA Buttons (Scroll smoothly to in-page application form)
    const ctaBtn = e.target.closest('.zionic-primary-btn, .linfopress-primary-btn, a[href="#test-drive"], a[href="#application"]');
    if (ctaBtn) {
      const href = ctaBtn.getAttribute('href') || (ctaBtn.classList.contains('zionic-primary-btn') ? '#test-drive' : '#application');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        e.stopPropagation();

        // Release any modal locks so scrolling is 100% free
        document.body.classList.remove('modal-open-lock');
        document.documentElement.classList.remove('modal-open-lock');

        const section = document.querySelector(href) || document.querySelector('.application-presentation');
        const formCard = section ? (section.querySelector('.presentation-form-card') || section) : document.querySelector('.presentation-form-card');
        if (formCard) {
          formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }
    }

    // 2. Video Demonstration Buttons
    const openTrigger = e.target.closest('#open_zionic_video_btn, #open-linfopress-video-btn, .zionic-secondary-btn, .linfopress-secondary-btn, .lux-play-pure-circle-btn, [data-open-zionic-video], .js-open-video-lightbox');
    if (openTrigger) {
      e.preventDefault();
      e.stopPropagation();
      const videoId = openTrigger.getAttribute('data-video-id');
      const isLinfopress = document.body.classList.contains('template-linfopress') || !!document.getElementById('linfopress_video_modal');

      if (isLinfopress) {
        window.openLinfopressVideoLightbox(videoId || 'K1v77enueJ8');
      } else {
        window.openZionicVideoLightbox(videoId || 'cqskAxvFlxY');
      }
      return;
    }

    // 3. Video Modal Close Triggers
    if (e.target.closest('[data-close-video-modal]') || e.target.classList.contains('zionic-video-lightbox')) {
      window.closeZionicVideoLightbox();
      window.closeLinfopressVideoLightbox();
      return;
    }
  }, true);

  // Close video on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeZionicVideoLightbox();
      window.closeLinfopressVideoLightbox();
    }
  });
}

/**
 * 20. FAQ / Knowledge Hub Horizontal Touch & Drag Swiper
 */
function initKnowledgeFilterSwipe() {
  const bar = document.querySelector('.knowledge-filter-bar');
  if (!bar) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let hasMoved = false;

  bar.addEventListener('mousedown', (e) => {
    isDown = true;
    hasMoved = false;
    startX = e.pageX - bar.offsetLeft;
    scrollLeft = bar.scrollLeft;
    bar.style.cursor = 'grabbing';
  });

  window.addEventListener('mouseup', () => {
    if (isDown) {
      isDown = false;
      bar.style.cursor = 'grab';
    }
  });

  bar.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - bar.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) hasMoved = true;
    bar.scrollLeft = scrollLeft - walk;
  });

  bar.querySelectorAll('.knowledge-filter-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (hasMoved) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  });
}




// 21. Zionic Custom Sharp Sliders (Before & After, Experience)
document.addEventListener('DOMContentLoaded', () => {
  const initZionicSlider = (containerSelector) => {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const wrapper = container.querySelector('.swiper-wrapper');
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');

    if (wrapper && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        const slideWidth = wrapper.querySelector('.swiper-slide')?.offsetWidth || 340;
        wrapper.scrollBy({ left: -(slideWidth + 24), behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        const slideWidth = wrapper.querySelector('.swiper-slide')?.offsetWidth || 340;
        wrapper.scrollBy({ left: slideWidth + 24, behavior: 'smooth' });
      });
    }
  };

  initZionicSlider('.zionic-ba-swiper');
  initZionicSlider('.zionic-exp-swiper');
});


// 22. Zionic Sharp Carousel Click Handler
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.zionic-gallery-carousel').forEach(carousel => {
    const track = carousel.querySelector('.zionic-carousel-track');
    const prev = carousel.querySelector('.prev-btn');
    const next = carousel.querySelector('.next-btn');
    if (track && prev && next) {
      prev.addEventListener('click', () => {
        const itemWidth = track.querySelector('.zionic-carousel-item')?.offsetWidth || 340;
        track.scrollBy({ left: -(itemWidth + 20), behavior: 'smooth' });
      });
      next.addEventListener('click', () => {
        const itemWidth = track.querySelector('.zionic-carousel-item')?.offsetWidth || 340;
        track.scrollBy({ left: itemWidth + 20, behavior: 'smooth' });
      });
    }
  });
});


// 23. Zionic Modern Gallery Carousel Controller
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.zionic-modern-gallery-slider');
  if (!slider) return;
  const track = slider.querySelector('.zionic-gallery-track');
  const prev = slider.querySelector('.prev-btn');
  const next = slider.querySelector('.next-btn');
  const currentEl = slider.querySelector('.current-slide');
  const totalEl = slider.querySelector('.total-slides');
  const items = slider.querySelectorAll('.zionic-slide-item');

  if (totalEl) totalEl.textContent = String(items.length).padStart(2, '0');

  if (track && prev && next) {
    const updateCounter = () => {
      const itemWidth = items[0]?.offsetWidth || 340;
      const index = Math.round(track.scrollLeft / (itemWidth + 24)) + 1;
      if (currentEl) currentEl.textContent = String(Math.min(Math.max(1, index), items.length)).padStart(2, '0');
    };

    track.addEventListener('scroll', updateCounter);

    prev.addEventListener('click', () => {
      const itemWidth = items[0]?.offsetWidth || 340;
      track.scrollBy({ left: -(itemWidth + 24), behavior: 'smooth' });
    });

    next.addEventListener('click', () => {
      const itemWidth = items[0]?.offsetWidth || 340;
      track.scrollBy({ left: itemWidth + 24, behavior: 'smooth' });
    });
  }

  // FAQ Accordion click - Precision Toggle
  document.querySelectorAll('.faq-toggle-header').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.faq-accordion-card');
      if (!card) return;
      const isCurrentlyActive = card.classList.contains('active');
      const icon = card.querySelector('.faq-icon');

      if (isCurrentlyActive) {
        card.classList.remove('active');
        if (icon) icon.textContent = '+';
      } else {
        card.classList.add('active');
        if (icon) icon.textContent = '−';
      }
    });
  });
});


  // ==========================================================================
  // ZIONIC INTERACTIVE BEFORE/AFTER SLIDER & CASE SWITCHER
  // ==========================================================================
  const compareRange = document.getElementById('compareRangeInput');
  const layerBefore = document.getElementById('compareLayerBefore');
  const dividerHandle = document.getElementById('compareDividerHandle');
  const compareViewport = document.getElementById('zionicCompareViewport');

  if (compareRange && layerBefore && dividerHandle) {
    function updateCompare(val) {
      const clamped = Math.max(0, Math.min(100, val));
      layerBefore.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
      dividerHandle.style.left = `${clamped}%`;
    }

    compareRange.addEventListener('input', (e) => {
      updateCompare(e.target.value);
    });

    // Touch & Mouse direct move
    if (compareViewport) {
      let isDown = false;
      function handleMove(clientX) {
        const rect = compareViewport.getBoundingClientRect();
        const pos = ((clientX - rect.left) / rect.width) * 100;
        compareRange.value = pos;
        updateCompare(pos);
      }

      compareViewport.addEventListener('mousedown', (e) => {
        isDown = true;
        handleMove(e.clientX);
      });
      window.addEventListener('mousemove', (e) => {
        if (isDown) handleMove(e.clientX);
      });
      window.addEventListener('mouseup', () => { isDown = false; });

      compareViewport.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) handleMove(e.touches[0].clientX);
      }, { passive: true });
      compareViewport.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) handleMove(e.touches[0].clientX);
      }, { passive: true });
    }
  }

  // Case Switcher Buttons
  const caseButtons = document.querySelectorAll('.case-switcher-btn');
  const imgBefore = document.getElementById('compareImgBefore');
  const imgAfter = document.getElementById('compareImgAfter');
  const metaNum = document.getElementById('caseMetaNum');
  const metaTitle = document.getElementById('caseMetaTitle');
  const metaSessions = document.getElementById('caseMetaSessions');
  const metaDesc = document.getElementById('caseMetaDesc');

  caseButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      caseButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const bSrc = btn.getAttribute('data-before');
      const aSrc = btn.getAttribute('data-after');
      const title = btn.getAttribute('data-title');
      const num = btn.getAttribute('data-num');
      const sessions = btn.getAttribute('data-sessions');
      const desc = btn.getAttribute('data-desc');

      if (imgBefore) imgBefore.src = bSrc;
      if (imgAfter) imgAfter.src = aSrc;
      if (metaNum) metaNum.textContent = num;
      if (metaTitle) metaTitle.textContent = title;
      if (metaSessions) metaSessions.textContent = sessions;
      if (metaDesc) metaDesc.textContent = desc;

      // Reset slider to center 50%
      if (compareRange) {
        compareRange.value = 50;
        if (layerBefore) layerBefore.style.clipPath = 'inset(0 50% 0 0)';
        if (dividerHandle) dividerHandle.style.left = '50%';
      }
    });
  });



  // ==========================================================================
  // UNIFIED BEFORE/AFTER COMPARISON SLIDER ENGINE (DESKTOP & MOBILE)
  // ==========================================================================
  function initCompareSlider(viewport) {
    if (!viewport || viewport._sliderInitialized) return;
    viewport._sliderInitialized = true;

    const layerBefore = viewport.querySelector('.layer-before');
    const dividerHandle = viewport.querySelector('.horizontal-divider-handle');
    if (!layerBefore || !dividerHandle) return;

    function setPosition(percent) {
      const clamped = Math.max(0, Math.min(100, percent));
      layerBefore.style.setProperty('clip-path', `inset(0 ${100 - clamped}% 0 0)`, 'important');
      dividerHandle.style.setProperty('left', `${clamped}%`, 'important');
    }

    // Set initial position 50%
    setPosition(50);

    let isPointerDown = false;

    function handleMove(clientX) {
      const rect = viewport.getBoundingClientRect();
      if (rect.width <= 0) return;
      const pos = ((clientX - rect.left) / rect.width) * 100;
      setPosition(pos);
    }

    // Modern Pointer Events API (works for touch, mouse, stylus across all browsers)
    viewport.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      isPointerDown = true;
      try {
        viewport.setPointerCapture(e.pointerId);
      } catch (_) {}
      handleMove(e.clientX);
      e.preventDefault();
      e.stopPropagation();
    });

    viewport.addEventListener('pointermove', (e) => {
      if (!isPointerDown) return;
      handleMove(e.clientX);
      e.preventDefault();
    });

    function endPointer(e) {
      if (isPointerDown) {
        isPointerDown = false;
        try {
          viewport.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }
    }

    viewport.addEventListener('pointerup', endPointer);
    viewport.addEventListener('pointercancel', endPointer);

    // Touch events fallback with active preventDefault to prevent browser ghost image drag
    viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    }, { passive: false });

    viewport.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
        e.preventDefault();
      }
    }, { passive: false });
  }

  // Initialize master desktop viewport
  const hMasterViewport = document.getElementById('zionicHorizontalCompareViewport');
  if (hMasterViewport) {
    initCompareSlider(hMasterViewport);
  }

  // Initialize all mobile inline viewports
  document.querySelectorAll('.mobile-tile-ba-viewport').forEach((vp) => {
    initCompareSlider(vp);
  });

  // Result Tile & Mobile Accordion Handlers
  const resultTiles = document.querySelectorAll('.result-tile-card');
  const vImgBefore = document.getElementById('compareImgBefore');
  const vImgAfter = document.getElementById('compareImgAfter');
  const vLiveNum = document.getElementById('liveCaseNum');
  const vLiveTitle = document.getElementById('liveCaseTitle');
  const vLiveBadge = document.getElementById('liveCaseBadge');

  resultTiles.forEach((tile) => {
    tile.addEventListener('click', (e) => {
      // If clicking inside the mobile slider interactive elements, don't toggle accordion
      if (e.target.closest('.mobile-tile-ba-viewport')) {
        return;
      }

      const isMobile = window.innerWidth <= 991;

      if (isMobile) {
        const isCurrentlyExpanded = tile.classList.contains('is-expanded');

        // Close all tiles
        resultTiles.forEach((t) => {
          t.classList.remove('is-expanded');
          t.classList.remove('is-active');
        });

        // Toggle: if it wasn't expanded, expand it
        if (!isCurrentlyExpanded) {
          tile.classList.add('is-expanded');
          tile.classList.add('is-active');

          // Ensure the slider inside this newly opened tile is initialized & positioned at 50%
          const innerViewport = tile.querySelector('.mobile-tile-ba-viewport');
          if (innerViewport) {
            initCompareSlider(innerViewport);
            const layerBefore = innerViewport.querySelector('.layer-before');
            const dividerHandle = innerViewport.querySelector('.horizontal-divider-handle');
            if (layerBefore && dividerHandle) {
              layerBefore.style.clipPath = 'inset(0 50% 0 0)';
              dividerHandle.style.left = '50%';
            }
          }
        }
      } else {
        // Desktop behavior
        resultTiles.forEach((t) => t.classList.remove('is-active'));
        tile.classList.add('is-active');

        const bSrc = tile.getAttribute('data-before');
        const aSrc = tile.getAttribute('data-after');
        const title = tile.getAttribute('data-title');
        const num = tile.getAttribute('data-num');
        const sessions = tile.getAttribute('data-sessions');

        if (vImgBefore) vImgBefore.src = bSrc;
        if (vImgAfter) vImgAfter.src = aSrc;
        if (vLiveNum) vLiveNum.textContent = num;
        if (vLiveTitle) vLiveTitle.textContent = title;
        if (vLiveBadge) vLiveBadge.textContent = sessions;

        // Reset master slider to 50%
        if (hMasterViewport) {
          const mLayerBefore = hMasterViewport.querySelector('.layer-before');
          const mDividerHandle = hMasterViewport.querySelector('.horizontal-divider-handle');
          if (mLayerBefore && mDividerHandle) {
            mLayerBefore.style.clipPath = 'inset(0 50% 0 0)';
            mDividerHandle.style.left = '50%';
          }
        }
      }
    });
  });


// ==========================================================================
// LINFOPRESS INTERACTIVE CONTROLS
// ==========================================================================
window.openLinfopressTechModal = function(phaseNum) {
  const overlay = document.getElementById('linfopress-tech-modal-overlay');
  if (!overlay) return;
  
  for (let i = 1; i <= 4; i++) {
    const tab = document.getElementById('lp-modal-tab-' + i);
    if (tab) {
      tab.style.display = (i === phaseNum) ? 'block' : 'none';
      const video = tab.querySelector('video');
      if (video) {
        if (i === phaseNum) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    }
  }
  
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeLinfopressTechModal = function(e) {
  const overlay = document.getElementById('linfopress-tech-modal-overlay');
  if (!overlay) return;
  
  const allVideos = overlay.querySelectorAll('video');
  allVideos.forEach(v => v.pause());
  
  overlay.classList.remove('active');
  document.body.style.overflow = '';
};

// ==========================================================================
// LINFOPRESS PRESENTATION & FREE TRIAL MODAL (MATCHING USER SCREENSHOT)
// ==========================================================================
window.openLinfopressPresentationModal = function() {
  const overlay = document.getElementById('linfopress-presentation-modal-overlay');
  if (!overlay) return;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeLinfopressPresentationModal = function(e) {
  if (e && e.target && e.target.closest('.lp-pres-modal-dialog') && !e.target.classList.contains('lp-pres-modal-close-btn')) return;
  const overlay = document.getElementById('linfopress-presentation-modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
};

window.handleLinfopressPresentationSubmit = function(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  return window.submitTermosaludLead(e, 'Linfopress — Модальне вікно безкоштовної процедури');
};

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const techOverlay = document.getElementById('linfopress-tech-modal-overlay');
    if (techOverlay && techOverlay.classList.contains('active')) {
      window.closeLinfopressTechModal();
    }
    const presOverlay = document.getElementById('linfopress-presentation-modal-overlay');
    if (presOverlay && presOverlay.classList.contains('active')) {
      window.closeLinfopressPresentationModal();
    }
  }
});

window.toggleLinfopressFaq = function(cardEl) {
  const allCards = document.querySelectorAll('.linfopress-faq-accordion .faq-accordion-card');
  const body = cardEl.querySelector('.faq-card-body');
  const icon = cardEl.querySelector('.faq-toggle-icon');
  const isCurrentlyActive = cardEl.classList.contains('active');

  allCards.forEach(c => {
    c.classList.remove('active');
    const b = c.querySelector('.faq-card-body');
    const i = c.querySelector('.faq-toggle-icon');
    if (b) b.style.display = 'none';
    if (i) i.textContent = '+';
  });

  if (!isCurrentlyActive) {
    cardEl.classList.add('active');
    if (body) body.style.display = 'block';
    if (icon) icon.textContent = '−';
  }
};

window.toggleLinfopressSeoArticle = function() {
  const content = document.getElementById('linfopressSeoExpandableContent') || document.getElementById('linfopress-seo-expand-box');
  const btn = document.getElementById('linfopressSeoToggleBtn');
  if (!content) return;

  const isExpanded = content.classList.contains('expanded') || content.style.display === 'block';
  const label = btn ? btn.querySelector('.seo-btn-label') : null;
  const arrow = btn ? btn.querySelector('.seo-btn-arrow') : null;

  if (isExpanded) {
    content.classList.remove('expanded');
    content.style.display = 'none';
    if (label) label.textContent = 'Читати далі';
    if (arrow) arrow.textContent = '∨';
  } else {
    content.classList.add('expanded');
    content.style.display = 'block';
    if (label) label.textContent = 'Приховати';
    if (arrow) arrow.textContent = '∧';
  }
};


// ==========================================================================
// FULLWIDTH PROCEDURE VIDEO PLAYER & LIGHTBOX (YOUTUBE: K1v77enueJ8)
// ==========================================================================
window.playLinfopressProcedureVideo = function(triggerEl) {
  const holder = document.getElementById('procedure-iframe-holder');
  const overlay = document.getElementById('procedure-play-overlay');
  const previewVideo = document.getElementById('procedure-preview-video');
  if (!holder) return;

  if (previewVideo) previewVideo.pause();
  if (overlay) overlay.style.display = 'none';

  holder.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/K1v77enueJ8?autoplay=1&start=1&rel=0&modestbranding=1&controls=1" title="Процедура Linfopress Evolution PRO" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="position: absolute; inset: 0; width: 100%; height: 100%; border: none;"></iframe>';
  holder.style.display = 'block';
};

window.openLinfopressVideoLightbox = function() {
  const modal = document.getElementById('linfopress_video_modal');
  const container = document.getElementById('linfopress_modal_video_container');
  if (!modal || !container) return;
  container.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/K1v77enueJ8?autoplay=1&start=1&rel=0&modestbranding=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; height:100%; border:none;"></iframe>';
  modal.style.display = 'flex';
  modal.classList.add('is-active', 'show');
  document.body.style.overflow = 'hidden';
};

window.closeLinfopressVideoLightbox = function() {
  const modal = document.getElementById('linfopress_video_modal');
  const container = document.getElementById('linfopress_modal_video_container');
  if (container) container.innerHTML = '';
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('is-active', 'show');
  }
  document.body.style.overflow = '';
};


window.toggleExactFaq = function(btn) {
  const item = btn.closest('.exact-faq-item');
  if (!item) return;
  const wasActive = item.classList.contains('active');
  const parent = item.parentElement;
  
  parent.querySelectorAll('.exact-faq-item').forEach(el => {
    el.classList.remove('active');
    const content = el.querySelector('.exact-faq-content');
    if (content) content.style.display = 'none';
    const chevron = el.querySelector('.exact-faq-chevron svg');
    if (chevron) chevron.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
  });

  if (!wasActive) {
    item.classList.add('active');
    const content = item.querySelector('.exact-faq-content');
    if (content) content.style.display = 'block';
    const chevron = item.querySelector('.exact-faq-chevron svg');
    if (chevron) chevron.innerHTML = '<polyline points="18 15 12 9 6 15"></polyline>';
  }
};

// ==========================================================================
// APPARATUS HEADER SELECT DROPDOWN (.custom-select-logo)
// ==========================================================================
document.addEventListener('click', (e) => {
  const display = e.target.closest('.select-display');
  const customSelect = e.target.closest('.custom-select-logo');

  if (display) {
    const parent = display.closest('.custom-select-logo');
    if (parent) {
      const options = parent.querySelector('.select-options');
      const arrow = parent.querySelector('.select-arrow');
      if (options) options.classList.toggle('open');
      if (arrow) arrow.classList.toggle('open');
    }
    return;
  }

  // Close when clicking outside
  if (!customSelect) {
    document.querySelectorAll('.select-options.open').forEach(opt => opt.classList.remove('open'));
    document.querySelectorAll('.select-arrow.open').forEach(arr => arr.classList.remove('open'));
  }
});

// Auto-close mobile drawer when an internal anchor link is clicked
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('.header-ul a');
  if (anchor) {
    const mobileNav = document.getElementById('mobile-nav-panel');
    const burger = document.getElementById('custom-burger-btn');
    if (mobileNav && mobileNav.classList.contains('active')) {
      mobileNav.classList.remove('active');
    }
    if (burger && burger.classList.contains('active')) {
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    }
  }
});

