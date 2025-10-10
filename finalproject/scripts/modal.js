// scripts/modal.js

window.openModal = function(trailId) {
  // Determine JSON path dynamically (works in root pages and subpages)
  const path = window.location.pathname.includes('trails.html') || window.location.pathname.includes('index.html')
    ? './data/trails.json'
    : '../data/trails.json';

  fetch(path)
    .then(resp => {
      if (!resp.ok) throw new Error('Failed to fetch trails.json');
      return resp.json();
    })
    .then(trails => {
      const trail = trails.find(t => t.id === trailId);
      if (!trail) return;

      // Remove existing modal if present
      const existingModal = document.querySelector('.modal');
      if (existingModal) existingModal.remove();

      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>${trail.name}</h2>
          <img src="${trail.image}" alt="${trail.name}" loading="lazy">
          <p><strong>Location:</strong> ${trail.location}</p>
          <p><strong>Difficulty:</strong> ${trail.difficulty}</p>
          <p><strong>Length:</strong> ${trail.length}</p>
          <button class="close-btn">Close</button>
        </div>
      `;

      document.body.appendChild(modal);

      // Close events
      modal.querySelector('.close').onclick = () => modal.remove();
      modal.querySelector('.close-btn').onclick = () => modal.remove();
      modal.addEventListener('click', e => {
        if (e.target === modal) modal.remove();
      });

      // Close on Esc key
      document.addEventListener('keydown', function escClose(e) {
        if (e.key === 'Escape') {
          modal.remove();
          document.removeEventListener('keydown', escClose);
        }
      });
    })
    .catch(err => console.error('Modal fetch error:', err));
};
