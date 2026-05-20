// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Active-section highlight in nav
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const anchorMap = new Map();
navAnchors.forEach(a => anchorMap.set(a.getAttribute('href').slice(1), a));

if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      if (!anchorMap.has(id)) return;
      navAnchors.forEach(a => a.classList.remove('active'));
      anchorMap.get(id).classList.add('active');
    });
    // Threshold array catches short sections (e.g. Contact at page bottom)
    // that would otherwise pass through the 5%-tall detection band before
    // tripping the observer.
  }, { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.1, 0.25, 0.5] });

  sections.forEach(section => observer.observe(section));
}

// Active-topic highlight in /work/ case TOC
const tocItems = document.querySelectorAll('.case-toc .case-toc-item[href^="#"]');
if (tocItems.length && 'IntersectionObserver' in window) {
  const tocMap = new Map();
  const topicGroups = [];
  tocItems.forEach(item => {
    const id = item.getAttribute('href').slice(1);
    const group = document.getElementById(id);
    if (group) {
      tocMap.set(id, item);
      topicGroups.push(group);
    }
  });

  if (topicGroups.length) {
    const tocObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        if (!tocMap.has(id)) return;
        tocItems.forEach(a => a.classList.remove('active'));
        tocMap.get(id).classList.add('active');
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5] });

    topicGroups.forEach(g => tocObserver.observe(g));
  }
}
