export function displayTrails(trails, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.innerHTML = trails.map(trail => `
    <div class="trail-card">
      <img src="${trail.image}" alt="${trail.name}" loading="lazy">
      <div class="trail-card-content">
        <h3>${trail.name}</h3>
        <p><strong>Location:</strong> ${trail.location}</p>
        <p><strong>Difficulty:</strong> ${trail.difficulty}</p>
        <p><strong>Length:</strong> ${trail.length}</p>
        <button onclick="openModal(${trail.id})">Learn More</button>
      </div>
    </div>
  `).join('');
}
