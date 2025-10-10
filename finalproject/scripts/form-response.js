// scripts/form-response.js
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name') || 'Guest';
  const email = params.get('email') || '';
  const trail = params.get('trail') || 'any trail';
  const result = document.getElementById('result');
  if (result) {
    result.textContent = `Thank you, ${name}! You subscribed with ${email}. Your favorite trail: ${trail}.`;
  }
});
