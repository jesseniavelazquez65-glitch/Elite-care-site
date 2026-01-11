const form = document.getElementById('care-form');
const successMessage = document.getElementById('form-success');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  successMessage.hidden = false;
  form.reset();
});
