(async function testFeaturedTrails() {
  try {
    // Try fetching the trails JSON
    const resp = await fetch('./data/trails.json');
    if (!resp.ok) throw new Error('Failed to fetch trails.json');

    const trails = await resp.json();
    console.log('Trails fetched:', trails);

    // Take the first 4 trails as "featured"
    const featured = trails.slice(0, 4);

    // Verify that displayTrails works
    const container = document.querySelector('#featured-trails');
    if (!container) throw new Error('#featured-trails container not found');

    container.innerHTML = ''; // Clear old content
    featured.forEach(trail => {
      const card = document.createElement('div');
      card.classList.add('trail-card');
      card.innerHTML = `
        <img src="${trail.image}" alt="${trail.name}" loading="lazy">
        <div class="trail-info">
          <h3>${trail.name}</h3>
          <p><strong>Location:</strong> ${trail.location}</p>
          <p><strong>Length:</strong> ${trail.length}</p>
          <p><strong>Difficulty:</strong> ${trail.difficulty}</p>
        </div>
      `;
      container.appendChild(card);
    });

    console.log('Featured trails injected successfully!');
  } catch (err) {
    console.error('Test failed:', err);
  }
})();
