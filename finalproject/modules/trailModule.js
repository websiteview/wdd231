export function displayTrails(trails, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = ''; // clear old content

  trails.forEach(trail => {
    const card = document.createElement('div');
    card.classList.add('trail-card');

    card.innerHTML = `
      <img src="${trail.image}" alt="${trail.name}" loading="lazy" />
      <div class="trail-info">
        <h3>${trail.name}</h3>
        <p><strong>Location:</strong> ${trail.location}</p>
        <p><strong>Length:</strong> ${trail.length}</p>
        <p><strong>Difficulty:</strong> ${trail.difficulty}</p>
        <button class="view-btn">View Image</button>
      </div>
    `;

    container.appendChild(card);

    // Modal behavior for rubric compliance
    const button = card.querySelector('.view-btn');
    button.addEventListener('click', () => showModal(trail));
  });
}

// Modal logic
function showModal(trail) {
  let modal = document.querySelector('.modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <img src="" alt="">
        <h3></h3>
        <p></p>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close').addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', e => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  modal.querySelector('img').src = trail.image;
  modal.querySelector('img').alt = trail.name;
  modal.querySelector('h3').textContent = trail.name;
  modal.querySelector('p').textContent = `${trail.location} | ${trail.length} | ${trail.difficulty}`;

  modal.style.display = 'flex';
}
