// Scroll-triggered zoom animation for sections

// Intersection Observer scroll animation for sections (WoT-style)
function animateSectionsObserver() {
  const sections = document.querySelectorAll('section');
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, {
    threshold: 0.45 // Trigger when ~45% of section is visible
  });
  sections.forEach(section => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('section-animate');
  });
  animateSectionsObserver();

  // Highlight nav link for section in view
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(document.querySelectorAll('section'));
  function highlightNav() {
    let currentSection = sections[0].id;
    const scrollPos = window.scrollY + window.innerHeight / 3;
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      if (scrollPos >= top) {
        currentSection = section.id;
      }
    }
    navLinks.forEach(link => {
      if (link.dataset.section === currentSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', highlightNav);
  window.addEventListener('resize', highlightNav);
  highlightNav();
});
