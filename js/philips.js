const philipsToggle = document.querySelector('.philips-microsite .nav-toggle');
const philipsNav = document.querySelector('.philips-microsite #primary-nav');

if (philipsToggle && philipsNav) {
  const closePhilipsNav = () => {
    philipsNav.classList.remove('open');
    philipsToggle.setAttribute('aria-expanded', 'false');
  };

  philipsToggle.addEventListener('click', () => {
    const open = philipsNav.classList.toggle('open');
    philipsToggle.setAttribute('aria-expanded', String(open));
  });

  philipsNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closePhilipsNav);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closePhilipsNav();
    }
  });
}
