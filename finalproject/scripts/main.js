// scripts/main.js
import { displayTrails } from './modules/trailModule.js';

// Load JSON data and display trails on appropriate pages
async function loadTrails() {
  try {
    const resp = await fetch('./data/trails.json'); // relative to current HTML page
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

    if (featuredSection)
      featuredSection.innerHTML = `<p class="error">Unable to load featured trails.</p>`;
    if (allTrailsSection)
      allTrailsSection.innerHTML = `<p class="error">Unable to load all trails.</p>`;
  }
}

// Responsive hamburger menu for all pages
function setupMenu() {
  const burger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav-links');

  if (burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('show'));

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove('show');
      }
    });
  }
}

// Highlight current page link
function highlightCurrentNav() {
  const links = document.querySelectorAll('.nav-links li a');
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });
}

// DOMContentLoaded: run all setup functions
document.addEventListener('DOMContentLoaded', () => {
  loadTrails();
  setupMenu();
  highlightCurrentNav();
});
