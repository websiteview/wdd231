document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('subscribe-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    // you could add validation or custom behavior here
    // but letting default GET to form-response work
  });
});
