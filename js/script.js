const forms = document.querySelectorAll("form");

forms.forEach(form => {
  form.addEventListener("submit", function () {
    const success = this.nextElementSibling;
    if (success && success.classList.contains("success-message")) {
      setTimeout(() => {
        success.style.display = "block";
      }, 500);
    }
  });
});
