
const galleries = window.KOTLOVSKY_GALLERIES || {};
const lightbox = document.getElementById('lightbox');
const image = lightbox.querySelector('.lightbox-image');
const closeBtn = lightbox.querySelector('.lightbox-close');
const prevBtn = lightbox.querySelector('.prev');
const nextBtn = lightbox.querySelector('.next');
let currentGallery = [];
let currentIndex = 0;

function showImage(index) {
  if (!currentGallery.length) return;
  currentIndex = (index + currentGallery.length) % currentGallery.length;
  image.src = currentGallery[currentIndex];
}
function openGallery(name, index) {
  currentGallery = galleries[name] || [];
  showImage(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}
function closeGallery() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  image.src = '';
}
document.querySelectorAll('[data-gallery]').forEach(btn => {
  btn.addEventListener('click', () => openGallery(btn.dataset.gallery, Number(btn.dataset.index || 0)));
});
closeBtn.addEventListener('click', closeGallery);
prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeGallery(); });
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeGallery();
  if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
  if (e.key === 'ArrowRight') showImage(currentIndex + 1);
});
