// assets/site.js
(function () {
  const burger = document.querySelector('[data-burger]');
  const nav = document.querySelector('[data-nav]');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
    });
  }

  // highlight active nav link
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('a[data-navlink]').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path) a.classList.add('active');
  });
})();
