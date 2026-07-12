const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const bookingForm = document.querySelector("#booking-form");
const formNote = document.querySelector("#form-note");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

siteNav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(bookingForm);
  const name = data.get("name").trim();
  const phone = data.get("phone").trim();
  const date = data.get("date");
  const service = data.get("service");
  const message = data.get("message").trim();

  const lines = [
    "Hello Artistic Stain, I would like to enquire about a hand henna booking.",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Event date: ${date}`,
    `Service: ${service}`,
    message ? `Notes: ${message}` : ""
  ].filter(Boolean);

  const encodedMessage = encodeURIComponent(lines.join("\n"));
  const whatsappNumber = "919382875004";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  formNote.textContent = "Your enquiry message is ready. Opening WhatsApp now.";
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});
