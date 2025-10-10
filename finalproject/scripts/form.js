// scripts/form.js
document.addEventListener("DOMContentLoaded", () => {
  // Display form data on the response page
  const result = document.getElementById("result");
  if (result) {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const email = params.get("email");
    const trail = params.get("trail");

    if (name && email) {
      result.innerHTML = `
        <strong>${name}</strong>, thank you for subscribing!<br>
        A confirmation email has been sent to <strong>${email}</strong>.<br>
        ${trail ? `We’ll send you updates about ${trail} trails.` : ""}
      `;
    }
  }
});
