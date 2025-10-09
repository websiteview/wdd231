import { displayTrails } from './modules/trailModule.js';

async function loadTrails() {
  try {
    const resp = await fetch('./data/trails.json'); // relative to the HTML page
    if (!resp.ok) throw new Error('Failed to fetch trails.json');
    const trails = await resp.json();

    // Display featured trails on index.html
    const featuredSection = document.querySelector('#featured-trails');
    if (featuredSection) {
      const featured = trails.slice(0, 4);
      displayTrails(featured, '#featured-trails');
    }

    // Display all trails on trails.html
    const allTrailsSection = document.querySelector('#all-trails');
    if (allTrailsSection) {
      displayTrails(trails, '#all-trails');
    }
  } catch (err) {
    console.error('Error loading trails.json:', err);
    const featuredSection = document.querySelector('#featured-trails');
    const allTrailsSection = document.querySelector('#all-trails');

    if (featuredSection) featuredSection.innerHTML = `<p class="error">Unable to load featured trails.</p>`;
    if (allTrailsSection) allTrailsSection.innerHTML = `<p class="error">Unable to load all trails.</p>`;
  }
}

function setupMenu() {
  const burger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav-links');

  if (burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('show'));

    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !burger.contains(e.target)) nav.classList.remove('show');
    });
  }
}

// Highlight current nav link for wayfinding
function highlightCurrentNav() {
  const links = document.querySelectorAll('.nav-links li a');
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadTrails();
  setupMenu();
  highlightCurrentNav();
});
