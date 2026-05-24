// Primary nav normalisation
// Most pages are static HTML, and several page families carry copied nav
// blocks. Keep the rendered primary nav consistent without needing a build step
// or shared template include.
const primaryNav = document.getElementById('primary-nav');

if (primaryNav) {
  const linkSpecs = [
    { key: 'home', label: 'home' },
    { key: 'work', label: 'work' },
    { key: 'thoughts', label: 'current meditations' },
    { key: 'about', label: 'about' },
    { key: 'recruiters', label: 'recruiters' },
    { key: 'credentials', label: 'credentials' },
    { key: 'contact', label: 'contact' },
  ];

  const links = Array.from(primaryNav.querySelectorAll('a'));
  const hrefs = links.map(link => link.getAttribute('href') || '');
  const firstHref = hrefs[0] || '';
  const usesRootRelative = firstHref.startsWith('/');
  const usesParentRelative = hrefs.some(href => href.startsWith('../'));
  const hrefPrefix = usesRootRelative ? '/' : usesParentRelative ? '../' : '';

  const makeHref = key => {
    if (key === 'home') return usesRootRelative ? '/' : hrefPrefix || './';
    return `${hrefPrefix}${key}/`;
  };

  const hasCredentials = links.some(link =>
    (link.getAttribute('href') || '').includes('credentials')
  );

  if (!hasCredentials) {
    const contactItem = Array.from(primaryNav.querySelectorAll('li')).find(item => {
      const link = item.querySelector('a');
      return link && (link.getAttribute('href') || '').includes('contact');
    });
    const credentialsItem = document.createElement('li');
    const credentialsLink = document.createElement('a');
    credentialsLink.href = makeHref('credentials');
    credentialsLink.textContent = '/ credentials';
    credentialsItem.appendChild(credentialsLink);

    if (contactItem) {
      primaryNav.insertBefore(credentialsItem, contactItem);
    } else {
      primaryNav.appendChild(credentialsItem);
    }
  }

  Array.from(primaryNav.querySelectorAll('a')).forEach(link => {
    const href = link.getAttribute('href') || '';
    const spec = linkSpecs.find(item => {
      if (item.key === 'home') return href === '/' || href === '../' || href === './' || href === '';
      return href.includes(item.key);
    });
    if (!spec) return;

    const isCurrent = link.getAttribute('aria-current') === 'page';
    link.textContent = `${isCurrent ? '//' : '/'} ${spec.label}`;
  });
}

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  const closeNav = () => {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Escape dismisses the open menu — standard a11y for any modal-like overlay.
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) {
      closeNav();
      toggle.focus();
    }
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
