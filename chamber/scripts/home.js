// =========================
// Weather API (3-Day Forecast)
// =========================
const apiKey = "YOUR_API_KEY"; // 🔁 Replace with your actual OpenWeatherMap API key
const lat = 14.85;             // Latitude for Quetzaltenango
const lon = -91.52;            // Longitude for Quetzaltenango

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather data fetch failed");
    const data = await response.json();

    // Current weather (first item)
    const current = data.list[0];
    document.querySelector("#temp").textContent = `${current.main.temp.toFixed(1)} °C`;
    document.querySelector("#desc").textContent = current.weather[0].description;

    // Forecast for the next 3 days (each 8 items = 24 hours)
    const forecastEls = document.querySelectorAll(".forecast-day");
    for (let i = 0; i < 3; i++) {
      const item = data.list[i * 8]; // 0, 8, 16
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
    const { members } = await response.json();

    // Filter for Gold and Silver members
    const goldSilver = members.filter(m =>
      m.membership === "Gold" || m.membership === "Silver"
    );

    // Randomly pick 2–3 members
    const selected = [];
    while (selected.length < 3 && goldSilver.length > 0) {
      const rand = goldSilver[Math.floor(Math.random() * goldSilver.length)];
      if (!selected.includes(rand)) selected.push(rand);
    }

    // Insert into DOM
    const container = document.querySelector(".spotlight-container");
    if (!container) {
      console.error("Spotlight container not found.");
      return;
    }

    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight");
      card.innerHTML = `
        <img src="${member.logo}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p class="level">${member.membership}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Spotlight error:", error);
  }
}
loadSpotlights();
