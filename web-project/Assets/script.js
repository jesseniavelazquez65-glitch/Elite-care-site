// ===== DOM READY =====
document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded successfully");

  const form = document.getElementById("care-form");
  const successMessage = document.getElementById("form-success");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Block submission if invalid
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Show success message if it exists
    if (successMessage) {
      successMessage.hidden = false;
      successMessage.focus?.();
    }

    // Reset form
    form.reset();
  });
});
