// ==================== COPIAR AL PORTAPAPELES ====================

(function () {
  "use strict";

  // ==================== FUNCIÓN PRINCIPAL ====================
  window.copiarAlPortapapeles = function (texto, tipo) {
    // Copiar al portapapeles
    navigator.clipboard
      .writeText(texto)
      .then(() => {
        mostrarNotificacion(tipo);
        console.log(`✅ ${tipo} copiado: ${texto}`);
      })
      .catch((err) => {
        console.error("❌ Error al copiar:", err);
        // Fallback para navegadores antiguos
        copiarFallback(texto, tipo);
      });
  };

  // ==================== FALLBACK PARA NAVEGADORES ANTIGUOS ====================
  function copiarFallback(texto, tipo) {
    const textArea = document.createElement("textarea");
    textArea.value = texto;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      mostrarNotificacion(tipo);
      console.log(`✅ ${tipo} copiado (fallback): ${texto}`);
    } catch (err) {
      console.error("❌ Error al copiar (fallback):", err);
    }

    document.body.removeChild(textArea);
  }

  // ==================== MOSTRAR NOTIFICACIÓN ====================
  function mostrarNotificacion(tipo) {
    // Obtener idioma actual
    const idioma =
      window.idiomaActual || localStorage.getItem("idioma") || "es";

    // Textos según idioma
    const textos = {
      es: {
        email: "📧 Email copiado",
        whatsapp: "📱 WhatsApp copiado",
      },
      de: {
        email: "📧 E-Mail kopiert",
        whatsapp: "📱 WhatsApp kopiert",
      },
    };

    const mensaje = textos[idioma][tipo] || textos.es[tipo];

    // Crear notificación
    const notificacion = document.createElement("div");
    notificacion.className = "copy-notification";
    notificacion.innerHTML = `
      <div class="copy-notification-content">
        <i class="fas fa-check-circle"></i>
        <span>${mensaje}</span>
      </div>
    `;

    document.body.appendChild(notificacion);

    // Mostrar con animación
    setTimeout(() => {
      notificacion.classList.add("show");
    }, 10);

    // Ocultar después de 3 segundos
    setTimeout(() => {
      notificacion.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notificacion);
      }, 300);
    }, 3000);
  }

  console.log("✅ Sistema de copiado al portapapeles inicializado");
})();
