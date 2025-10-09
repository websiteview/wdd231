// scripts/trails.js

document.addEventListener("DOMContentLoaded", () => {
  const trailContainer = document.querySelector("#all-trails");
  const filterInput = document.querySelector("#trail-filter");
  const sortSelect = document.querySelector("#trail-sort");

  async function loadTrails() {
    try {
      const response = await fetch("data/trails.json"); // adjust path if needed
      if (!response.ok) throw new Error("Failed to load trail data");

      const trails = await response.json();

      // Ensure image paths and add placeholder description if missing
      const processedTrails = trails.map(trail => ({
        ...trail,
        image: trail.image ? trail.image : "images/placeholder.jpg",
        description: trail.description ? trail.description : "No description available."
      }));

      displayTrails(processedTrails);

      // FILTER functionality
      filterInput?.addEventListener("input", () => {
        const search = filterInput.value.toLowerCase();
        const filtered = processedTrails.filter(trail =>
          trail.name.toLowerCase().includes(search) ||
          trail.location.toLowerCase().includes(search) ||
          trail.description.toLowerCase().includes(search)
        );
        displayTrails(filtered);
      });

      // SORT functionality
      sortSelect?.addEventListener("change", () => {
        const sortValue = sortSelect.value;
        let sortedTrails = [...processedTrails];

        if (sortValue === "name") {
          sortedTrails.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === "difficulty") {
          const order = ["Easy", "Moderate", "Hard", "Strenuous", "Very Strenuous"];
          sortedTrails.sort((a, b) => order.indexOf(a.difficulty) - order.indexOf(b.difficulty));
        } else if (sortValue === "length") {
          // Convert length from string like "5.4 mi" to number
          sortedTrails.sort((a, b) => parseFloat(a.length) - parseFloat(b.length));
        }

        displayTrails(sortedTrails);
      });

    } catch (err) {
      console.error(err);
      trailContainer.innerHTML = `<p class="error">Unable to load trails. Please try again later.</p>`;
    }
  }

  loadTrails();

  function displayTrails(list) {
    if (!trailContainer) return;
    trailContainer.innerHTML = "";

    if (list.length === 0) {
      trailContainer.innerHTML = `<p>No trails found.</p>`;
      return;
    }

    list.forEach(trail => {
      const card = document.createElement("article");
      card.classList.add("trail-card");

      card.innerHTML = `
        <img src="${trail.image}" alt="Trail: ${trail.name}" loading="lazy" class="trail-image">
        <div class="trail-info">
          <h3>${trail.name}</h3>
          <p><strong>Location:</strong> ${trail.location}</p>
          <p><strong>Difficulty:</strong> ${trail.difficulty}</p>
          <p><strong>Length:</strong> ${trail.length}</p>
          <p class="trail-description">${trail.description}</p>
        </div>
      `;
      trailContainer.appendChild(card);
    });
  }
});
