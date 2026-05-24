// Active-topic highlight in /work/ case table of contents.
// Site navigation is rendered at build time through Jekyll's
// _includes/site-nav.html include, so no runtime nav replacement is needed.
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
    const tocObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const id = entry.target.id;
          if (!tocMap.has(id)) return;

          tocItems.forEach(a => a.classList.remove('active'));
          tocMap.get(id).classList.add('active');
        });
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    topicGroups.forEach(group => tocObserver.observe(group));
  }
}
