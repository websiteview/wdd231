// thankyou.js

// Obtener parámetros del query string y mostrarlos
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const fields = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Mobile Phone' },
