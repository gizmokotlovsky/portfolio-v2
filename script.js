const galleries = {};
document.querySelectorAll('[data-gallery]').forEach((button) => {
  const name = button.dataset.gallery;
  if (!galleries[name]) galleries[name] = [];
  const img = button.querySelector('img');
  if (img && img.getAttribute('src')) {
    const item = { src: img.getAttribute('src'), button };
    galleries[name].push(item);
    button.dataset.index = String(galleries[name].length - 1);
  }
});

const lightbox = document.getElementById('lightbox');
const lbImage = lightbox.querySelector('.lb-image');
const closeBtn = lightbox.querySelector('.lb-close');
const prevBtn = lightbox.querySelector('.lb-prev');
const nextBtn = lightbox.querySelector('.lb-next');
let currentGallery = 'graphics';
let currentIndex = 0;

function showCurrent() {
  const list = galleries[currentGallery] || [];
  if (!list.length) return;
  if (currentIndex < 0) currentIndex = list.length - 1;
  if (currentIndex >= list.length) currentIndex = 0;
  lbImage.src = list[currentIndex].src;
}

function openLightbox(galleryName, index) {
  currentGallery = galleryName;
  currentIndex = Number(index) || 0;
  showCurrent();
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lbImage.removeAttribute('src');
}

function nextImage() { currentIndex += 1; showCurrent(); }
function prevImage() { currentIndex -= 1; showCurrent(); }

document.querySelectorAll('[data-gallery]').forEach(button => {
  button.addEventListener('click', () => openLightbox(button.dataset.gallery, button.dataset.index));
});

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});
