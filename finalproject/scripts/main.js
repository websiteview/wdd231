import { displayTrails } from '../modules/trailModule.js';

async function loadTrails() {
  try {
    const resp = await fetch('../data/trails.json');
    const trails = await resp.json();
    // On index page, show first 4
    const featured = trails.slice(0, 4);
    displayTrails(featured, '#featured-trails');
    // On trails.html, show all
    displayTrails(trails, '#all-trails');
  } catch (err) {
    console.error('Error loading trails.json:', err);
  }
}

// Initialize nav toggle
function setupMenu() {
  const burger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav-links');
  burger.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadTrails();
  setupMenu();
});
