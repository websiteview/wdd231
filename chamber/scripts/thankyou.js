// Obtener parámetros de la URL
const params = new URLSearchParams(window.location.search);

// Lista de campos esperados
const fields = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
  { name: 'email', label: 'Email Address' },
  { name: 'phone', label: 'Mobile Phone' },
  { name: 'orgName', label: 'Organization Name' },
  { name: 'orgTitle', label: 'Organizational Title' },
  { name: 'membershipLevel', label: 'Membership Level' },
  { name: 'description', label: 'Business Description' },
  { name: 'timestamp', label: 'Date Submitted' }
];

// Referencia al <dl> donde inyectaremos los datos
const submittedData = document.getElementById('submittedData');

// Agregar los datos si existen
fields.forEach(field => {
  const value = params.get(field.name);
  if (value) {
    const dt = document.createElement('dt');
    dt.textContent = field.label;

    const dd = document.createElement('dd');
    dd.textContent = value;

    submittedData.appendChild(dt);
    submittedData.appendChild(dd);
  }
});

// Mostrar el año actual en el footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Mostrar la última modificación del documento
const lastModifiedSpan = document.getElementById('lastModified');
if (lastModifiedSpan) {
  lastModifiedSpan.textContent = document.lastModified;
}
