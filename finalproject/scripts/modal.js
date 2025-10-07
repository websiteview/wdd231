// Basic modal system
window.openModal = function(trailId) {
  // fetch the specific trail from data
  fetch('../data/trails.json')
    .then(resp => resp.json())
    .then(trails => {
      const trail = trails.find(t => t.id === trailId);
      if (!trail) return;
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
      modal.querySelector('.close').onclick = () => modal.remove();
      modal.querySelector('.close-btn').onclick = () => modal.remove();
    })
    .catch(err => console.error('Modal fetch error:', err));
};
