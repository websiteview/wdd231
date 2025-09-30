// Load JSON data and build cards
async function loadCards() {
  try {
    const response = await fetch('data/items.json');
    const items = await response.json();

    const container = document.querySelector('.cards-container');
    container.innerHTML = ''; // clear existing cards

    items.forEach(item => {
      const card = document.createElement('article');
      card.className = 'card';
      card.setAttribute('role', 'listitem');

      card.innerHTML = `
        <h2>${item.title}</h2>
        <figure>
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button type="button" aria-label="Learn more about ${item.title}">Learn More</button>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading JSON data:', error);
  }
}

// localStorage message logic
function showVisitMessage() {
  const visitContainer = document.getElementById('visitMessage');
  const now = Date.now();
  const lastVisit = localStorage.getItem('lastVisit');

  if (!lastVisit) {
    visitContainer.textContent = 'Welcome! Let us know if you have any questions.';
  } else {
    const diffMs = now - Number(lastVisit);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      visitContainer.textContent = 'Back so soon! Awesome!';
    } else {
      visitContainer.textContent = `You last visited ${diffDays} day${diffDays === 1 ? '' : 's'} ago.`;
    }
  }

  // Update lastVisit to now
  localStorage.setItem('lastVisit', now.toString());
}

// Run on page load
window.addEventListener('DOMContentLoaded', () => {
  loadCards();
  showVisitMessage();
});
