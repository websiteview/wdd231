// =========================
// Weather API (3-Day Forecast)
// =========================
const apiKey = "21b91d9332a0e7cc9238c8edb791ea77"; // Tu API key
const lat = 14.85;             // Quetzaltenango
const lon = -91.52;

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather data fetch failed");
    const data = await response.json();

    // Clima actual (primer item)
    const current = data.list[0];
    document.querySelector("#temp").textContent = `${current.main.temp.toFixed(1)} °C`;
    document.querySelector("#desc").textContent = current.weather[0].description;

    // Pronóstico para los próximos 3 días (cada 8 items = 24 horas)
    const forecastEls = document.querySelectorAll(".forecast-day");
    for (let i = 0; i < 3; i++) {
      const item = data.list[i * 8];
      if (forecastEls[i]) {
        forecastEls[i].textContent = `${item.main.temp.toFixed(1)} °C`;
      }
    }
  } catch (error) {
    console.error("Weather error:", error);
  }
}
getWeather();

// =========================
// Company Spotlights
// =========================
async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Members data fetch failed");
    const data = await response.json();

    const members = Array.isArray(data) ? data : data.members;

    if (!Array.isArray(members)) {
      throw new Error("Members data is not an array");
    }

    // Filtra miembros con membership Gold (3) y Silver (2)
    const goldSilver = members.filter(m =>
      m.membership === 3 || m.membership === 2
    );

    // Selecciona aleatoriamente hasta 3 miembros sin repetir
    const selected = [];
    while (selected.length < 3 && goldSilver.length > 0) {
      const rand = goldSilver[Math.floor(Math.random() * goldSilver.length)];
      if (!selected.includes(rand)) selected.push(rand);
    }

    const container = document.querySelector(".spotlight-container");
    if (!container) {
      console.error("Spotlight container not found.");
      return;
    }

    container.innerHTML = "";  // Limpia contenido previo

    // Inserta tarjetas en el DOM
    selected.forEach(member => {
      const membershipText = member.membership === 3 ? "Gold" : "Silver";
      const imagePath = `images/${member.image}`; // Ajusta si tus imágenes están en otra carpeta

      const card = document.createElement("div");
      card.classList.add("spotlight");
      card.innerHTML = `
        <img src="${imagePath}" alt="${member.name} logo" />
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        <p class="level">${membershipText}</p>
      `;
      container.appendChild(card);
    });

  } catch (error) {
    console.error("Spotlight error:", error);
  }
}
loadSpotlights();

// =========================
// Mobile Menu Toggle
// =========================
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});
