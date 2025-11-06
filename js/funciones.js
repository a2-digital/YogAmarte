// ==================== FUNCIONES GLOBALES YOGAMARTE ====================

(function () {
  "use strict";

  // ==================== MODALES ====================

  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.active").forEach((modal) => {
        modal.classList.remove("active");
      });
      document.body.style.overflow = "auto";
    }
  });

  // Cerrar modal al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal(e.target.id);
    }
  });

  // ==================== NAVEGACIÓN ====================

  function scrollToContacto() {
    const currentPath = window.location.pathname;
    const isInSubfolder = currentPath.includes("/paginas/");
    const contactoPath = isInSubfolder
      ? "./contacto.html"
      : "./paginas/contacto.html";
    window.location.href = contactoPath;
  }

  function scrollToReserva() {
    const currentPath = window.location.pathname;
    const isInSubfolder = currentPath.includes("/paginas/");
    const reservaPath = isInSubfolder
      ? "./reserva.html"
      : "./paginas/reserva.html";
    window.location.href = reservaPath;
  }

  // Scroll suave para anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ==================== ANIMACIONES (SOBRE MÍ) ====================

  function initAnimaciones() {
    const elementos = document.querySelectorAll(
      ".timeline-item, .cert-card, .value-card"
    );
    if (!elementos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    elementos.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s ease";
      observer.observe(el);
    });
  }

  // ==================== TESTIMONIOS (CARRUSEL) ====================

  function initTestimonios() {
    const testimonios = document.querySelectorAll(".testimonio-card");
    const avatars = document.querySelectorAll(".avatar-nav");
    const dotsContainer = document.getElementById("carouselDots");

    if (!testimonios.length || !avatars.length || !dotsContainer) return;

    let currentIndex = 0;
    const total = testimonios.length;
    let autoPlayInterval;

    // Crear dots dinámicamente
    dotsContainer.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const dot = document.createElement("div");
      dot.className = i === 0 ? "dot active" : "dot";
      dot.addEventListener("click", () => irATestimonio(i));
      dotsContainer.appendChild(dot);
    }

    function actualizarUI() {
      // Actualizar cards
      testimonios.forEach((card, i) => {
        card.classList.toggle("active", i === currentIndex);
      });

      // Actualizar avatares
      avatars.forEach((avatar, i) => {
        avatar.classList.toggle("active", i === currentIndex);
      });

      // Actualizar dots
      const dots = dotsContainer.querySelectorAll(".dot");
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }

    function cambiarTestimonio(dir) {
      currentIndex = (currentIndex + dir + total) % total;
      actualizarUI();
      reiniciarAutoPlay();
    }

    function irATestimonio(index) {
      currentIndex = index;
      actualizarUI();
      reiniciarAutoPlay();
    }

    function reiniciarAutoPlay() {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(() => cambiarTestimonio(1), 7000);
    }

    // Exponer funciones globalmente (para onclick en HTML)
    window.cambiarTestimonio = cambiarTestimonio;
    window.irATestimonio = irATestimonio;

    // Iniciar autoplay
    reiniciarAutoPlay();
  }

  // ==================== INICIALIZACIÓN ====================

  function init() {
    initAnimaciones();
    initTestimonios();
    console.log("✅ Funciones globales inicializadas");
  }

  // Exponer funciones necesarias globalmente
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.scrollToContacto = scrollToContacto;
  window.scrollToReserva = scrollToReserva;

  // Inicializar cuando el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
