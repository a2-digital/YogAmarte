(function () {
  "use strict";

  function cargarNavbar() {
    const currentPath = window.location.pathname;
    const isInSubfolder = currentPath.includes("/paginas/");
    const navbarPath = isInSubfolder
      ? "../componentes/navbar.html"
      : "./componentes/navbar.html";

    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    if (!navbarPlaceholder) {
      console.error("❌ No se encontró el elemento #navbar-placeholder");
      return;
    }

    fetch(navbarPath)
      .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
      .then((html) => {
        navbarPlaceholder.innerHTML = html;

        // ✅ Ejecutar scripts internos
        navbarPlaceholder.querySelectorAll("script").forEach((oldScript) => {
          const newScript = document.createElement("script");
          newScript.textContent = oldScript.textContent;
          document.body.appendChild(newScript);
          oldScript.remove();
        });

        // ✅ Inicializar funciones del navbar
        if (typeof initNavbar === "function") {
          initNavbar();
        } else {
          console.warn(
            "⚠️ initNavbar() no encontrada — asegúrate de que nav.js se cargue antes de loadNavbar.js"
          );
        }
      })
      .catch((err) => {
        console.error("❌ Error al cargar el navbar:", err);
        navbarPlaceholder.innerHTML = `<nav class="navbar" style="background: rgba(0,0,0,0.5); padding: 20px; text-align: center;">
            <p style="color: white;">Error al cargar el menú de navegación</p>
        </nav>`;
      });
  }

  // Cargar cuando el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cargarNavbar);
  } else {
    cargarNavbar();
  }
})();
