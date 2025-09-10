// navbar toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('show');
    });
  }

  // set current nav item by URL
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a').forEach(a => {
    if (
      a.getAttribute('href') === path ||
      (path === '' && a.getAttribute('href') === 'index.html')
    ) {
      a.setAttribute('aria-current', 'page');
    } else {
      a.removeAttribute('aria-current');
    }
  });

  // footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// gallery lightbox
document.addEventListener('click', function (e) {
  const a = e.target.closest('a.lightbox');
  if (!a) return;
  e.preventDefault();
  const src = a.getAttribute('href');
  const caption = a.dataset.caption || '';
  // tạo modal
  const modal = document.createElement('div');
  modal.className = 'lb-modal';
  modal.innerHTML = `
    <div class="lb-inner" role="dialog" aria-modal="true">
      <button class="lb-close" aria-label="Đóng">✕</button>
      <img src="${src}" alt="${caption}" />
      <p class="lb-caption">${caption}</p>
    </div>`;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  // đóng lightbox
  modal.querySelector('.lb-close').addEventListener('click', () => {
    modal.remove();
    document.body.style.overflow = '';
  });
  modal.addEventListener('click', ev => {
    if (ev.target === modal) {
      modal.remove();
      document.body.style.overflow = '';
    }
  });
});

