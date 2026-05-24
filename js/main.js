// Universal site navigation bridge
// Jekyll pages should use _includes/site-nav.html at build time. Older static
// pages still keep copied nav blocks as fallbacks; this bridge replaces those
// legacy navs with the same shared nav definition until every page is migrated.
const SITE_NAV = {
  brand: 'fredericlabadie.com',
  links: [
    { key: 'home', label: 'home', href: '/' },
    { key: 'work', label: 'work', href: '/work/' },
    { key: 'thoughts', label: 'current meditations', href: '/thoughts/' },
    { key: 'about', label: 'about', href: '/about/' },
    { key: 'recruiters', label: 'recruiters', href: '/recruiters/' },
    { key: 'credentials', label: 'credentials', href: '/credentials/' },
    { key: 'contact', label: 'contact', href: '/contact/' },
  ],
};

function getCurrentNavKey(pathname) {
  const path = pathname.replace(/\/index\.html$/, '/');
  if (path === '/' || path === '') return 'home';
  if (path.startsWith('/work/')) return 'work';

  const firstSegment = path.split('/').filter(Boolean)[0];
  return SITE_NAV.links.some(link => link.key === firstSegment)
    ? firstSegment
    : 'home';
}

function injectSiteNavStyles() {
  if (document.getElementById('site-nav-styles')) return;

  const style = document.createElement('style');
  style.id = 'site-nav-styles';
  style.textContent = `
    .bp-site-nav {
      position: sticky;
      top: 0;
      z-index: 100;
      min-height: 48px;
      padding: 12px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      background: #16263a;
      color: #ffffff;
      border-bottom: 1px solid #16263a;
      font-family: var(--font-mono, 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .bp-site-nav a {
      color: inherit;
      text-decoration: none;
    }

    .bp-site-nav a:hover {
      color: #ffffff;
      text-decoration: none;
    }

    .bp-site-nav-brand,
    .bp-site-nav-links {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .bp-site-nav-brand {
      white-space: nowrap;
    }

    .bp-site-nav-links {
      margin: 0;
      padding: 0;
      list-style: none;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .bp-site-nav-links a[aria-current='page'] {
      color: #b9412a;
    }

    .bp-site-nav-muted {
      color: #a3b4c7;
    }

    .bp-site-dot {
      width: 8px;
      height: 8px;
      display: inline-block;
      border-radius: 999px;
      background: #3e7f5b;
      box-shadow: 0 0 0 2px rgba(62, 127, 91, 0.25);
    }

    @media (max-width: 860px) {
      .bp-site-nav {
        position: static;
        align-items: flex-start;
        flex-direction: column;
        padding: 14px 20px;
      }

      .bp-site-nav-brand,
      .bp-site-nav-links {
        width: 100%;
      }

      .bp-site-nav-links {
        justify-content: flex-start;
        row-gap: 10px;
      }
    }
  `;
  document.head.appendChild(style);
}

function renderSiteNavBridge() {
  const fallbackNavList = document.getElementById('primary-nav');
  if (!fallbackNavList) return;

  const fallbackNav = fallbackNavList.closest('nav');
  if (!fallbackNav || fallbackNav.classList.contains('bp-site-nav')) return;

  injectSiteNavStyles();

  const currentKey = getCurrentNavKey(window.location.pathname);
  const currentLabel =
    SITE_NAV.links.find(link => link.key === currentKey)?.label || 'home';

  const nav = document.createElement('nav');
  nav.className = 'bp-site-nav';
  nav.setAttribute('aria-label', 'Primary');

  const brand = document.createElement('a');
  brand.className = 'bp-site-nav-brand';
  brand.href = '/';
  brand.innerHTML = `
    <span class="bp-site-dot" aria-hidden="true"></span>
    <span>${SITE_NAV.brand}</span>
    <span class="bp-site-nav-muted">/ ${currentLabel}</span>
  `;

  const list = document.createElement('ul');
  list.className = 'bp-site-nav-links';
  list.id = 'primary-nav';

  SITE_NAV.links.forEach(link => {
    const item = document.createElement('li');
    const anchor = document.createElement('a');
    const isCurrent = link.key === currentKey;

    anchor.href = link.href;
    anchor.textContent = `${isCurrent ? '//' : '/'} ${link.label}`;
    if (isCurrent) anchor.setAttribute('aria-current', 'page');

    item.appendChild(anchor);
    list.appendChild(item);
  });

  nav.appendChild(brand);
  nav.appendChild(list);
  fallbackNav.replaceWith(nav);
}

renderSiteNavBridge();

// Mobile nav toggle for older fallback navs only.
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
