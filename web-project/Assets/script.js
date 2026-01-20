const form = document.getElementById("care-form");
const successMessage = document.getElementById("form-success");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_mylgysg",
        "template_gej60bl",
        this
      )
      .then(
        () => {
          form.reset();
          successMessage.hidden = false;
        },
        (error) => {
          alert("Something went wrong. Please try again.");
          console.error(error);
        }
      );
  });
}
