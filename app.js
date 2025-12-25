// ===== Video Data =====
const videos = [
  { id: "obA4O3NXWtU", title: "Gallery Video 01", thumbnail: "https://img.youtube.com/vi/obA4O3NXWtU/maxresdefault.jpg" },
  { id: "x_Ez9yjYYQY", title: "Gallery Video 02", thumbnail: "https://img.youtube.com/vi/x_Ez9yjYYQY/maxresdefault.jpg" },
  { id: "y5s1jU7H3SQ", title: "Gallery Video 03", thumbnail: "https://img.youtube.com/vi/y5s1jU7H3SQ/maxresdefault.jpg" },
  { id: "AcN_B_53qaQ", title: "Gallery Video 04", thumbnail: "https://img.youtube.com/vi/AcN_B_53qaQ/maxresdefault.jpg" },
  { id: "BYrj4GaBN4U", title: "Gallery Video 05", thumbnail: "https://img.youtube.com/vi/BYrj4GaBN4U/maxresdefault.jpg" },
  { id: "83ZuCOB7-84", title: "Gallery Video 06", thumbnail: "https://img.youtube.com/vi/83ZuCOB7-84/maxresdefault.jpg" },
  { id: "COFICaI27DU", title: "Gallery Video 07", thumbnail: "https://img.youtube.com/vi/COFICaI27DU/maxresdefault.jpg" },
  { id: "Ahk4LRE5dX4", title: "Gallery Video 08", thumbnail: "https://img.youtube.com/vi/Ahk4LRE5dX4/maxresdefault.jpg" },
  { id: "upN1PFXGbO4", title: "Gallery Video 09", thumbnail: "https://img.youtube.com/vi/upN1PFXGbO4/maxresdefault.jpg" },
  { id: "uRnvOLv-7Zw", title: "Gallery Video 10", thumbnail: "https://img.youtube.com/vi/uRnvOLv-7Zw/maxresdefault.jpg" },
  { id: "cmv1ebv33WU", title: "Gallery Video 11", thumbnail: "https://img.youtube.com/vi/cmv1ebv33WU/maxresdefault.jpg" },
  { id: "n-ldbe6Rk9I", title: "Gallery Video 12", thumbnail: "https://img.youtube.com/vi/n-ldbe6Rk9I/maxresdefault.jpg" },
  { id: "Rf3_DU3Ej2M", title: "Gallery Video 13", thumbnail: "https://img.youtube.com/vi/Rf3_DU3Ej2M/maxresdefault.jpg" },
  { id: "T_Z6BXn0tHs", title: "Gallery Video 14", thumbnail: "https://img.youtube.com/vi/T_Z6BXn0tHs/maxresdefault.jpg" },
  { id: "onHZnoZxtUs", title: "Gallery Video 15", thumbnail: "https://img.youtube.com/vi/onHZnoZxtUs/maxresdefault.jpg" },
  { id: "tuPgRlT4-G4", title: "Gallery Video 16", thumbnail: "https://img.youtube.com/vi/tuPgRlT4-G4/maxresdefault.jpg" },
  { id: "nhWKt3RY1Hc", title: "Gallery Video 17", thumbnail: "https://img.youtube.com/vi/nhWKt3RY1Hc/maxresdefault.jpg" },
  { id: "N3Jy7AvcVaQ", title: "Gallery Video 18", thumbnail: "https://img.youtube.com/vi/N3Jy7AvcVaQ/maxresdefault.jpg" },
  { id: "dg5z0XtIrC4", title: "Gallery Video 19", thumbnail: "https://img.youtube.com/vi/dg5z0XtIrC4/maxresdefault.jpg" }
];

const INITIAL_VISIBLE_COUNT = 12;
const LOAD_MORE_COUNT = 6;

// ===== State =====
let visibleCount = INITIAL_VISIBLE_COUNT;
let currentTriggerElement = null;
let isModalOpen = false;
let isClosing = false;
let focusableElements = [];
let firstFocusable = null;
let lastFocusable = null;

// ===== DOM Elements =====
const videoGrid = document.getElementById('video-grid');
const showMoreBtn = document.getElementById('show-more-btn');
const showMoreContainer = document.getElementById('show-more-container');
const remainingCount = document.getElementById('remaining-count');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const videoContainer = document.getElementById('video-container');
const closeBtn = document.getElementById('close-btn');

// ===== SVG Icons =====
const playIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
const chevronDownSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
const closeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

// ===== Check Reduced Motion =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ===== Lazy Load Observer =====
const lazyLoadObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target.querySelector('.thumbnail-img');
        if (img && img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        lazyLoadObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '50px' }
);

// ===== Create Thumbnail Card =====
function createThumbnailCard(video, index) {
  const card = document.createElement('div');
  card.className = 'stagger-item';
  card.style.animationDelay = `${index * 50}ms`;

  const button = document.createElement('button');
  button.className = 'thumbnail-card';
  button.setAttribute('aria-label', `Play video: ${video.title}`);
  button.dataset.videoId = video.id;
  button.dataset.videoTitle = video.title;

  // 3D Tilt effect (desktop only, respects reduced motion)
  if (supportsHover && !prefersReducedMotion) {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      button.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04) translateY(-4px)`;
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  }

  button.innerHTML = `
    <div class="thumbnail-inner">
      <img 
        class="thumbnail-img" 
        data-src="${video.thumbnail}" 
        alt="${video.title}"
        loading="lazy"
      />
      <div class="thumbnail-gradient"></div>
      <div class="play-icon">
        <div class="play-icon-inner glass">
          ${playIconSVG}
        </div>
      </div>
      <div class="thumbnail-title">
        <p>${video.title}</p>
      </div>
    </div>
  `;

  const img = button.querySelector('.thumbnail-img');
  img.addEventListener('load', () => img.classList.add('loaded'));
  img.addEventListener('error', () => {
    if (img.src.includes('maxresdefault')) img.src = img.src.replace('maxresdefault', 'hqdefault');
  });

  button.addEventListener('click', () => {
    currentTriggerElement = button;
    openModal(video);
  });

  card.appendChild(button);
  lazyLoadObserver.observe(card);

  return card;
}

// ===== Render Videos =====
function renderVideos() {
  videoGrid.innerHTML = '';
  const visibleVideos = videos.slice(0, visibleCount);
  visibleVideos.forEach((video, index) => {
    const card = createThumbnailCard(video, index);
    videoGrid.appendChild(card);
  });
  updateShowMoreButton();
}

// ===== Update Show More Button =====
function updateShowMoreButton() {
  const remaining = videos.length - visibleCount;
  if (remaining <= 0) showMoreContainer.classList.add('hidden');
  else {
    showMoreContainer.classList.remove('hidden');
    remainingCount.textContent = `(${remaining} remaining)`;
  }
}

// ===== Show More Handler =====
showMoreBtn.addEventListener('click', () => {
  visibleCount = Math.min(visibleCount + LOAD_MORE_COUNT, videos.length);
  renderVideos();
});

// ===== Modal Functions =====
function openModal(video) {
  isModalOpen = true;
  isClosing = false;
  
  modalTitle.textContent = video.title;

  // Create iframe with muted autoplay
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&mute=1`;
  iframe.title = video.title;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;

  // Handle embed errors
  iframe.onerror = () => {
    videoContainer.innerHTML = `
      <p style="text-align:center; color:#fff; font-size:1rem;">
        This video can't be played here. <a href="https://youtu.be/${video.id}" target="_blank" style="color:#00f;">Watch on YouTube</a>
      </p>
    `;
  };

  videoContainer.innerHTML = '';
  videoContainer.appendChild(iframe);

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  
  setupFocusTrap();
}

function closeModal() {
  if (isClosing) return;
  isClosing = true;
  
  modal.classList.add('closing');
  
  setTimeout(() => {
    modal.classList.remove('open', 'closing');
    videoContainer.innerHTML = '';
    document.body.style.overflow = '';
    isModalOpen = false;
    isClosing = false;
    if (currentTriggerElement) { currentTriggerElement.focus(); currentTriggerElement = null; }
  }, 250);
}

function setupFocusTrap() {
  focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  firstFocusable = focusableElements[0];
  lastFocusable = focusableElements[focusableElements.length - 1];
  if (firstFocusable) firstFocusable.focus();
}

function handleFocusTrap(e) {
  if (!isModalOpen || e.key !== 'Tab') return;
  if (e.shiftKey && document.activeElement === firstFocusable) { e.preventDefault(); lastFocusable.focus(); }
  else if (!e.shiftKey && document.activeElement === lastFocusable) { e.preventDefault(); firstFocusable.focus(); }
}

// ===== Event Listeners =====
closeBtn.innerHTML = closeSVG;
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isModalOpen) closeModal(); handleFocusTrap(e); });

const chevronSpan = showMoreBtn.querySelector('.chevron');
if (chevronSpan) chevronSpan.innerHTML = chevronDownSVG;

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', renderVideos);
