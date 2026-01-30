document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("care-form");
  const successMessage = document.getElementById("form-success");

  // If the page does NOT have a form, stop here (about.html)
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    form.classList.add("loading");

    emailjs
      .sendForm(
        "service_mylgysg",
        "template_gej60bl",
        form
      )
      .then(() => {
        form.classList.remove("loading");
        form.reset();

        successMessage.classList.remove("hidden");
        successMessage.classList.add("show");

        setTimeout(() => {
          successMessage.classList.remove("show");
          successMessage.classList.add("hidden");
        }, 5000);
      })
      .catch((error) => {
        form.classList.remove("loading");
        alert("Email failed to send: " + error.text);
      });
  });
});
