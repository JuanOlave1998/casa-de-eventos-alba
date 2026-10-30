// IMPORTANTE: cambia este número por el WhatsApp comercial de Casa de Eventos Alba.
// Formato: indicativo del país + número, sin +, espacios ni guiones. Ejemplo ficticio: 573001234567
const WHATSAPP_NUMBER = "57AQUIELNUMERO";

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
const siteHeader = document.querySelector(".site-header");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
    });
  });

  document.addEventListener("click", (event) => {
    if (!mainNav.classList.contains("open")) return;
    if (mainNav.contains(event.target) || menuToggle.contains(event.target)) return;
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainNav.classList.contains("open")) {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      menuToggle.focus();
    }
  });
}

// Sombra del encabezado al hacer scroll
if (siteHeader) {
  const onScroll = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// Resalta la sección visible en el menú
const navLinks = Array.from(document.querySelectorAll(".main-nav a:not(.nav-cta)"));
const sections = navLinks
  .map((link) => {
    const id = link.getAttribute("href");
    if (!id || !id.startsWith("#")) return null;
    const section = document.querySelector(id);
    return section ? { link, section } : null;
  })
  .filter(Boolean);

if (sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const match = sections.find((item) => item.section === entry.target);
        if (!match) return;
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("is-active"));
          match.link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((item) => observer.observe(item.section));
}

function whatsappUrl(message) {
  const numberIsConfigured = /^\d{10,15}$/.test(WHATSAPP_NUMBER);
  if (!numberIsConfigured) {
    alert("Antes de usar WhatsApp, abre script.js y reemplaza 57AQUIELNUMERO por el número comercial de Casa de Eventos Alba, con indicativo y sin espacios.");
    return null;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const url = whatsappUrl(link.dataset.message || "Hola, Casa de Eventos Alba. Quiero cotizar un evento.");
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  });
});

document.querySelectorAll("[data-service]").forEach((card) => {
  card.addEventListener("click", (event) => {
    event.preventDefault();
    const service = card.dataset.service;
    const message = `Hola, Casa de Eventos Alba. Quiero cotizar un evento de ${service}. ¿Me pueden brindar información?`;
    const url = whatsappUrl(message);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  });
});

document.querySelectorAll("[data-service-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const message = "Hola, Casa de Eventos Alba. Me interesa cotizar comida para un evento. ¿Qué opciones y condiciones de entrega manejan?";
    const url = whatsappUrl(message);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  });
});

const yearElement = document.querySelector("#year");
if (yearElement) yearElement.textContent = new Date().getFullYear();
