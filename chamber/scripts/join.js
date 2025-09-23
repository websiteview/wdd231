// join.js

// Insert current timestamp into hidden input on page load
window.addEventListener('DOMContentLoaded', () => {
  const timestampInput = document.getElementById('timestamp');
  const now = new Date().toISOString();
  timestampInput.value = now;
});

// Modal open/close functionality
document.querySelectorAll('.open-modal').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const modalId = link.getAttribute('data-modal');
    const dialog = document.getElementById(modalId);
    if (dialog) dialog.showModal();
  });
});

document.querySelectorAll('dialog button.close').forEach(button => {
  button.addEventListener('click', e => {
    e.target.closest('dialog').close();
  });
});

// Accessibility: close modal on ESC key press
window.addEventListener('keydown', e => {
  if (e.key === "Escape") {
    document.querySelectorAll('dialog').forEach(dialog => {
      if (dialog.open) dialog.close();
    });
  }
});
