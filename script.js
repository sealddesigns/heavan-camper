const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

/* -----------------------------------------
   ANGEBOTSÜBERBLICK-SLIDER
----------------------------------------- */

const overviewSliders = document.querySelectorAll('[data-overview-slider]');

overviewSliders.forEach((slider) => {
  const track = slider.querySelector('.models-overview-track');
  const prevBtn = slider.querySelector('.models-arrow-left');
  const nextBtn = slider.querySelector('.models-arrow-right');

  if (!track || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  const getVisibleCards = () => {
    if (window.innerWidth <= 860) return 1;
    if (window.innerWidth <= 1040) return 2;
    return 3;
  };

  const updateSlider = () => {
    const cards = track.children.length;
    const visible = getVisibleCards();
    const maxIndex = Math.max(0, cards - visible);

    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const firstCard = track.querySelector('.models-overview-card');
    if (!firstCard) return;

    const gapValue =
      window.getComputedStyle(track).columnGap ||
      window.getComputedStyle(track).gap;

    const gap = parseFloat(gapValue) || 0;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const offset = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  };

  prevBtn.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    const visible = getVisibleCards();
    const cards = track.children.length;
    const maxIndex = Math.max(0, cards - visible);

    currentIndex = Math.min(maxIndex, currentIndex + 1);
    updateSlider();
  });

  window.addEventListener('resize', updateSlider);
  updateSlider();
});

/* -----------------------------------------
   MODELLE-MODAL
----------------------------------------- */

const modal = document.getElementById('modelsModal');
const modalBackdrop = document.getElementById('modelsModalBackdrop');
const modalClose = document.getElementById('modelsModalClose');
const modalTitle = document.getElementById('modelsModalTitle');
const modalSubtitle = document.getElementById('modelsModalSubtitle');
const modalForm = document.getElementById('modelsModalForm');
const modalStatus = document.getElementById('modelsModalStatus');
const modalMessage = document.getElementById('modal-message');

const openFormButtons = document.querySelectorAll('.action-open-form');

const openModal = (type, model) => {
  if (!modal) return;

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  if (modalTitle) {
    modalTitle.textContent = `${type}-Anfrage`;
  }

  if (modalSubtitle) {
    modalSubtitle.textContent = `Du interessierst dich für ${model}. Bitte fülle das Formular aus.`;
  }

  if (modalMessage) {
    modalMessage.value = `Hallo Heavan,\n\nich interessiere mich für ${model} (${type}).\n\nBitte meldet euch bei mir zurück.\n`;
  }

  if (modalStatus) {
    modalStatus.textContent = '';
  }
};

const closeModal = () => {
  if (!modal) return;

  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (modalForm) {
    modalForm.reset();
  }

  if (modalStatus) {
    modalStatus.textContent = '';
  }
};

openFormButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const type = button.dataset.type || 'Anfrage';
    const model = button.dataset.model || 'Modell';
    openModal(type, model);
  });
});

if (modalBackdrop) {
  modalBackdrop.addEventListener('click', closeModal);
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal && modal.classList.contains('is-open')) {
    closeModal();
  }
});

if (modalForm && modalStatus) {
  modalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    modalStatus.textContent = 'Vielen Dank! Deine Anfrage wurde erfolgreich übermittelt.';
    modalForm.reset();
  });
}

/* -----------------------------------------
   AUSBAU-MODAL
----------------------------------------- */

const ausbauModal = document.getElementById('ausbauModal');
const ausbauModalBackdrop = document.getElementById('ausbauModalBackdrop');
const ausbauModalClose = document.getElementById('ausbauModalClose');
const ausbauModalTitle = document.getElementById('ausbauModalTitle');
const ausbauModalSubtitle = document.getElementById('ausbauModalSubtitle');
const ausbauModalForm = document.getElementById('ausbauModalForm');
const ausbauModalStatus = document.getElementById('ausbauModalStatus');
const ausbauModalMessage = document.getElementById('ausbau-message');

const openAusbauButtons = document.querySelectorAll('.action-open-ausbau-form');

const openAusbauModal = (pkg) => {
  if (!ausbauModal) return;

  ausbauModal.classList.add('is-open');
  ausbauModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  if (ausbauModalTitle) {
    ausbauModalTitle.textContent = 'Ausbau-Anfrage';
  }

  if (ausbauModalSubtitle) {
    ausbauModalSubtitle.textContent = `Du interessierst dich für ${pkg}. Bitte fülle das Formular aus.`;
  }

  if (ausbauModalMessage) {
    ausbauModalMessage.value = `Hallo Heavan,\n\nich interessiere mich für das Paket ${pkg}.\n\nBitte meldet euch bei mir zurück.\n`;
  }

  if (ausbauModalStatus) {
    ausbauModalStatus.textContent = '';
  }
};

const closeAusbauModal = () => {
  if (!ausbauModal) return;

  ausbauModal.classList.remove('is-open');
  ausbauModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (ausbauModalForm) {
    ausbauModalForm.reset();
  }

  if (ausbauModalStatus) {
    ausbauModalStatus.textContent = '';
  }
};

openAusbauButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const pkg = button.dataset.package || 'Ausbaupaket';
    openAusbauModal(pkg);
  });
});

if (ausbauModalBackdrop) {
  ausbauModalBackdrop.addEventListener('click', closeAusbauModal);
}

if (ausbauModalClose) {
  ausbauModalClose.addEventListener('click', closeAusbauModal);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && ausbauModal && ausbauModal.classList.contains('is-open')) {
    closeAusbauModal();
  }
});

if (ausbauModalForm && ausbauModalStatus) {
  ausbauModalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    ausbauModalStatus.textContent = 'Vielen Dank! Deine Anfrage wurde erfolgreich übermittelt.';
    ausbauModalForm.reset();
  });
}

/* -----------------------------------------
   NEWSLETTER-BESTÄTIGUNG
----------------------------------------- */

let newsletterToastTimeout;

const createNewsletterToast = () => {
  let toast = document.getElementById('newsletterToast');

  if (toast) return toast;

  toast = document.createElement('div');
  toast.id = 'newsletterToast';
  toast.className = 'newsletter-toast';
  toast.innerHTML = `
    <button class="newsletter-toast-close" type="button" aria-label="Schließen">&times;</button>
    <strong>Willkommen bei Heavan</strong>
    <p>Deine Anmeldung ist angekommen. Ab jetzt bekommst du frisches Fernweh direkt ins Postfach.</p>
  `;

  document.body.appendChild(toast);

  const closeBtn = toast.querySelector('.newsletter-toast-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      toast.classList.remove('is-visible');
    });
  }

  return toast;
};

const showNewsletterToast = () => {
  const toast = createNewsletterToast();

  clearTimeout(newsletterToastTimeout);
  toast.classList.add('is-visible');

  newsletterToastTimeout = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 4200);
};

document.querySelectorAll('.newsletter-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.reset();
    showNewsletterToast();
  });
});

/* -----------------------------------------
   KONTAKTFORMULAR-TOAST
----------------------------------------- */

const contactForm = document.querySelector('.contact-form');
const contactToast = document.getElementById('contactToast');
const contactToastClose = document.getElementById('contactToastClose');

let contactToastTimeout;

const showContactToast = () => {
  if (!contactToast) return;

  contactToast.classList.add('is-visible');
  contactToast.setAttribute('aria-hidden', 'false');

  clearTimeout(contactToastTimeout);
  contactToastTimeout = setTimeout(() => {
    hideContactToast();
  }, 4500);
};

const hideContactToast = () => {
  if (!contactToast) return;

  contactToast.classList.remove('is-visible');
  contactToast.setAttribute('aria-hidden', 'true');
};

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    contactForm.reset();
    showContactToast();
  });
}

if (contactToastClose) {
  contactToastClose.addEventListener('click', hideContactToast);
}

/* -----------------------------------------
   LIGHTBOX GALLERY + BESTSELLER
----------------------------------------- */

const lightboxImages = document.querySelectorAll('.gallery-masonry img, .lightbox-trigger');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

if (
  lightboxImages.length > 0 &&
  lightbox &&
  lightboxImage &&
  lightboxClose &&
  lightboxPrev &&
  lightboxNext
) {
  let currentIndex = 0;
  const images = Array.from(lightboxImages);

  const showImage = (index) => {
    currentIndex = index;
    const currentImage = images[currentIndex];

    lightboxImage.src = currentImage.src;
    lightboxImage.alt = currentImage.alt || 'Großansicht';

    if (lightboxCaption) {
      lightboxCaption.textContent =
        currentImage.dataset.caption || currentImage.alt || '';
    }
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-visible');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      showImage(index);
      lightbox.classList.add('is-visible');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightboxPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  lightboxNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-visible')) return;

    if (event.key === 'Escape') {
      closeLightbox();
    }

    if (event.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    }

    if (event.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }
  });
}

/* -----------------------------------------
   TESTIMONIALS: MANUELLER DRAG / SWIPE
----------------------------------------- */

const testimonialsSlider = document.querySelector('.testimonials-slider');

if (testimonialsSlider) {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  testimonialsSlider.addEventListener('mousedown', (event) => {
    isDown = true;
    testimonialsSlider.classList.add('is-dragging');
    startX = event.pageX - testimonialsSlider.offsetLeft;
    scrollLeft = testimonialsSlider.scrollLeft;
  });

  testimonialsSlider.addEventListener('mouseleave', () => {
    isDown = false;
    testimonialsSlider.classList.remove('is-dragging');
  });

  testimonialsSlider.addEventListener('mouseup', () => {
    isDown = false;
    testimonialsSlider.classList.remove('is-dragging');
  });

  testimonialsSlider.addEventListener('mousemove', (event) => {
    if (!isDown) return;
    event.preventDefault();
    const x = event.pageX - testimonialsSlider.offsetLeft;
    const walk = (x - startX) * 1.2;
    testimonialsSlider.scrollLeft = scrollLeft - walk;
  });
}