document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);

  if (params.get("success") === "true") {
    alert("Thank you. Your submission has been received. A member of Elite Care will contact you shortly.");
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  console.log("Elite Care website loaded successfully.");
});
