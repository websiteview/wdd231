// scripts/storage.js

document.addEventListener('DOMContentLoaded', () => {
  // Obtener visitas actuales del localStorage
  let visits = parseInt(localStorage.getItem('visits'), 10);

  // Si no existe o es inválido, iniciar en 0
  if (isNaN(visits)) visits = 0;

  // Incrementar visitas
  visits += 1;

  // Guardar nuevamente en localStorage
  localStorage.setItem('visits', visits);

  // Mostrar en consola
  console.log(`You have visited this site ${visits} time${visits > 1 ? 's' : ''}.`);

  // Opcional: mostrar en la página si hay un contenedor con id "visit-count"
  const visitElement = document.getElementById('visit-count');
  if (visitElement) {
    visitElement.textContent = `You have visited this site ${visits} time${visits > 1 ? 's' : ''}.`;
  }
});
