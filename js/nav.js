// ==================== NAVBAR LÓGICA ====================

(function () {
  "use strict";

  function initNavbar() {
    console.log("✅ Navbar inicializado correctamente");

    const currentPath = window.location.pathname;
    const isInSubfolder = currentPath.includes("/paginas/");

    // Ajustar ruta del logo
    const logoImg = document.getElementById("logoImg");
    if (logoImg) {
      logoImg.src = isInSubfolder
        ? "../images/Logo_without.png"
        : "./images/Logo_without.png";
    }

    // Resaltar link activo
    highlightActiveLink();

    // Actualizar bandera de idioma
    actualizarBandera();

    // ✅ NUEVO: Inicializar menú hamburguesa
    initMenuToggle();
  }

  function highlightActiveLink() {
    const navLinks = document.querySelectorAll(".nav-links a");
    const currentPath = window.location.pathname;

    let currentFile = currentPath.split("/").pop() || "index.html";

    if (currentFile === "" || currentFile === "/") {
      currentFile = "index.html";
    }

    navLinks.forEach((link) => {
      const linkHref = link.getAttribute("href");
      const linkFile = linkHref.split("/").pop();

      if (linkFile === currentFile) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  function actualizarBandera() {
    const toggle = document.getElementById("langToggle");
    if (!toggle) return;

    const idioma =
      window.idiomaActual || localStorage.getItem("idioma") || "es";

    toggle.classList.remove("es", "de");
    toggle.classList.add(idioma);
  }

  // ✅ NUEVO: Función para menú hamburguesa
  function initMenuToggle() {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (!menuToggle || !navLinks) return;

    // Toggle del menú
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Cerrar menú al hacer clic en un enlace
    const links = navLinks.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", function () {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", function (e) {
      if (
        !menuToggle.contains(e.target) &&
        !navLinks.contains(e.target) &&
        navLinks.classList.contains("active")
      ) {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  }

  // ==================== FUNCIONES GLOBALES ====================

  window.initNavbar = initNavbar;

  window.toggleIdioma = function () {
    actualizarBandera();
  };

  // Auto-inicializar si el navbar ya está cargado
  if (document.querySelector(".navbar")) {
    initNavbar();
  }
})();
