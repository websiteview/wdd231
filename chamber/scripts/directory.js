const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");
const directory = document.querySelector("#directory");

function setActiveButton(activeBtn) {
  gridBtn.classList.remove("active");
  listBtn.classList.remove("active");
  activeBtn.classList.add("active");
}

gridBtn.addEventListener("click", () => {
  directory.classList.add("grid-view");
  directory.classList.remove("list-view");
  setActiveButton(gridBtn);
  getMembers(); // recarga para actualizar clases
});

listBtn.addEventListener("click", () => {
  directory.classList.add("list-view");
  directory.classList.remove("grid-view");
  setActiveButton(listBtn);
  getMembers(); // recarga para actualizar clases
});

async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  displayMembers(data.members);
}

function displayMembers(members) {
  directory.innerHTML = "";

  const isGrid = directory.classList.contains("grid-view");

  members.forEach((member) => {
    const div = document.createElement("div");
    div.classList.add(isGrid ? "card" : "list-item");

    const websiteLink = member.website
      ? `<a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a>`
      : "";

    div.innerHTML = `
      ${isGrid ? `<img src="images/${member.image}" alt="${member.name} logo" loading="lazy">` : ""}
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      ${websiteLink}
    `;

    directory.appendChild(div);
  });
}

// Footer update
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Inicial carga con grid-view activa y botón activo
setActiveButton(gridBtn);
getMembers();
