/* ========= Theme toggle ========= */
const toggle = document.getElementById('modeToggle');
const modal = document.getElementById('videoModal');
const frameBox = modal.querySelector('.video-frame');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

/* ========= Video modal logic ========= */
document.querySelectorAll('.video-wrapper').forEach(wrapper => {
  wrapper.addEventListener('click', () => {
    const rawUrl = wrapper.dataset.video.trim();
    let embedHTML = '';

    // 1️⃣ If it's an MP4 file
    if (rawUrl.endsWith('.mp4')) {
      embedHTML = `
        <video src="${rawUrl}" 
               autoplay 
               muted 
               controls 
               playsinline
               style="width:100%;height:100%;border-radius:12px;">
        </video>`;
    } else {
      // 2️⃣ Otherwise, treat it as a YouTube link
      const ytId = extractYouTubeID(rawUrl);
      const src = `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1`;

      embedHTML = `
        <iframe src="${src}"
                allow="autoplay; encrypted-media"
                allowfullscreen
                style="width:100%;height:100%;border-radius:12px;">
        </iframe>`;
    }

    frameBox.innerHTML = embedHTML;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

// Close video modal
modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('open');
    frameBox.innerHTML = '';
    document.body.style.overflow = '';
  }
});

/* ===== Helper: extract YouTube video ID ===== */
function extractYouTubeID(url) {
  const regex = /(?:youtu\.be\/|v=)([^?&/]+)/i;
  const match = url.match(regex);
  return match ? match[1] : url;
}

/* ========= IMAGE GALLERY POP-UP ========= */
const imgModal = document.getElementById('imageModal');
const galleryImg = imgModal.querySelector('.gallery-img');
const prevBtn = imgModal.querySelector('.prev');
const nextBtn = imgModal.querySelector('.next');

let currentGallery = [];
let currentIndex = 0;

document.querySelectorAll('.gallery-thumb').forEach(btn => {
  btn.addEventListener('click', () => {
    currentGallery = btn.dataset.images.split(',').map(s => s.trim());
    currentIndex = 0;
    showGalleryImage();
    imgModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

prevBtn.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  showGalleryImage();
});

nextBtn.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % currentGallery.length;
  showGalleryImage();
});

imgModal.addEventListener('click', e => {
  if (e.target === imgModal) closeGallery();
});

function showGalleryImage() {
  galleryImg.src = currentGallery[currentIndex];
}

function closeGallery() {
  imgModal.classList.remove('open');
  galleryImg.src = '';
  document.body.style.overflow = '';
}
