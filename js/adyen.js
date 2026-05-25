const adyenToggle = document.querySelector('.adyen-microsite .nav-toggle');
const adyenNav = document.querySelector('.adyen-microsite #primary-nav');

if (adyenToggle && adyenNav) {
  const closeAdyenNav = () => {
    adyenNav.classList.remove('open');
    adyenToggle.setAttribute('aria-expanded', 'false');
  };

  adyenToggle.addEventListener('click', () => {
    const open = adyenNav.classList.toggle('open');
    adyenToggle.setAttribute('aria-expanded', String(open));
  });

  adyenNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeAdyenNav);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeAdyenNav();
    }
  });
}