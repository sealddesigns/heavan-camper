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

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-visible')) return;

    if (event.key === 'Escape') closeLightbox();
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
   TESTIMONIALS SLIDER (FIXED VERSION)
----------------------------------------- */

const testimonialsSlider = document.querySelector('.testimonials-slider');
const testimonialsToggle = document.querySelector('.testimonials-toggle');

if (testimonialsSlider) {
  let isPaused = false;

  const togglePause = () => {
    isPaused = !isPaused;

    testimonialsSlider.classList.toggle('is-paused', isPaused);

    if (testimonialsToggle) {
      testimonialsToggle.textContent = isPaused
        ? 'Slideshow fortsetzen'
        : 'Slideshow pausieren';

      testimonialsToggle.setAttribute('aria-pressed', isPaused);
    }
  };

  // 👉 Button (beste UX)
  if (testimonialsToggle) {
    testimonialsToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePause();
    });
  }

  // 👉 Mobile Tap fallback
  testimonialsSlider.addEventListener('click', () => {
    if (!testimonialsToggle) togglePause();
  });

  // 👉 Desktop Hover Pause
  testimonialsSlider.addEventListener('mouseenter', () => {
    testimonialsSlider.classList.add('is-paused');
  });

  testimonialsSlider.addEventListener('mouseleave', () => {
    if (!isPaused) {
      testimonialsSlider.classList.remove('is-paused');
    }
  });

  testimonialsSlider.style.cursor = 'pointer';
}