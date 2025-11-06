// ==================== CARGAR FOOTER DINÁMICAMENTE ====================

(function () {
  "use strict";

  function cargarFooter() {
    // Detectar ubicación
    const currentPath = window.location.pathname;
    const isInSubfolder = currentPath.includes("/paginas/");

    // Ruta al footer
    const footerPath = isInSubfolder
      ? "../componentes/footer.html"
      : "./componentes/footer.html"; // ✅ Corregido para index.html

    // Buscar placeholder
    const footerPlaceholder = document.getElementById("footer-placeholder");

    if (!footerPlaceholder) {
      console.error("❌ No se encontró #footer-placeholder");
      return Promise.reject("No footer placeholder");
    }

    // Cargar el footer y retornar Promise
    return fetch(footerPath)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.text();
      })
      .then((html) => {
        // Insertar HTML
        footerPlaceholder.innerHTML = html;

        // Ejecutar scripts inline del footer
        const scripts = footerPlaceholder.querySelectorAll("script");
        scripts.forEach((oldScript) => {
          const newScript = document.createElement("script");
          newScript.textContent = oldScript.textContent;
          document.body.appendChild(newScript);
          oldScript.remove();
        });

        console.log("✅ Footer cargado exitosamente");

        // ✅ Notificar que el footer está listo
        window.footerCargado = true;
        document.dispatchEvent(new Event("footerLoaded"));

        return true;
      })
      .catch((error) => {
        console.error("❌ Error al cargar footer:", error);
        return false;
      });
  }

  // Exponer función globalmente para que traduccion.js pueda esperarla
  window.cargarFooter = cargarFooter;

  // Cargar cuando el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cargarFooter);
  } else {
    cargarFooter();
  }
})();
