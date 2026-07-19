// Mobile menu toggle for the LandTrack navbar
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen);
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  // Close the menu automatically if the screen is resized back to desktop width
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && menu.classList.contains("is-open")) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  });

  // Close the menu after a link is clicked (mobile)
  menu.querySelectorAll(".navbar__link").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });
});
