const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const bookingForm = document.querySelector("#booking-form");
const formNote = document.querySelector("#form-note");
const revealItems = document.querySelectorAll(
  ".section-heading, .intro-grid, .service-card, .gallery-grid figure, .timeline article, .testimonial-inner, .faq-list details, .booking-copy, .booking-form"
);

document.documentElement.classList.add("js");

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

if ("IntersectionObserver" in window) {
  revealItems.forEach((item, index) => {
    item.classList.add("reveal-float");
    item.style.setProperty("--reveal-delay", `${Math.min(index % 8, 7) * 70}ms`);
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.12
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

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
  const whatsappNumber = "916382875004";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  formNote.textContent = "Your enquiry message is ready. Opening WhatsApp now.";
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});
