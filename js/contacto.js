// ==================== FORMULARIO DE CONTACTO - EMAILJS ====================

(function () {
  "use strict";

  // ==================== CONFIGURACIÓN ====================
  const CONFIG = {
    publicKey: "xp1Mrn1VvHxnSUV99",
    serviceId: "service_yogamarte",
    templateId: "template_swzxni5",
  };

  // ==================== INICIALIZACIÓN ====================

  function init() {
    // Inicializar EmailJS
    if (typeof emailjs === "undefined") {
      console.error("❌ EmailJS no está cargado");
      return;
    }

    emailjs.init(CONFIG.publicKey);
    console.log("✅ EmailJS inicializado");

    // Configurar formulario
    const form = document.querySelector(".contacto-form");
    if (form) {
      setupForm(form);
    }
  }

  // ==================== CONFIGURAR FORMULARIO ====================

  function setupForm(form) {
    form.addEventListener("submit", handleSubmit);
  }

  // ==================== MANEJAR ENVÍO ====================

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const btn = form.querySelector(".btn-enviar");
    const originalBtnContent = btn.innerHTML;

    // Deshabilitar botón y mostrar loading
    btn.disabled = true;
    btn.innerHTML = `
      <span style="display: inline-flex; align-items: center; gap: 0.5rem;">
        <span class="spinner"></span>
        Enviando...
      </span>
    `;

    try {
      // Enviar mensaje principal
      const result = await emailjs.sendForm(
        CONFIG.serviceId,
        CONFIG.templateId,
        form,
      );

      console.log("✅ Mensaje enviado:", result);

      // Éxito
      handleSuccess(form, btn, originalBtnContent);
    } catch (error) {
      // Error
      console.error("❌ Error completo:", error);
      handleError(error, btn, originalBtnContent);
    }
  }

  // ==================== MANEJAR ÉXITO ====================

  function handleSuccess(form, btn, originalBtnContent) {
    // Mostrar notificación de éxito
    mostrarNotificacion(
      "¡Mensaje enviado exitosamente! Te responderemos pronto.",
      "success",
    );

    // Resetear formulario
    form.reset();

    // Restaurar botón con ícono de éxito temporal
    btn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
    btn.style.backgroundColor = "#27ae60";

    // Después de 3 segundos, restaurar botón original
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalBtnContent;
      btn.style.backgroundColor = "";
    }, 3000);

    // Google Analytics (si está instalado)
    if (typeof gtag !== "undefined") {
      gtag("event", "form_submit", {
        event_category: "Contact",
        event_label: "Contact Form",
      });
    }
  }

  // ==================== MANEJAR ERROR ====================

  function handleError(error, btn, originalBtnContent) {
    let errorMsg = "Hubo un problema al enviar el mensaje.";

    // Personalizar mensaje según el error
    if (error.text) {
      console.log("Detalles del error:", error.text);

      if (error.text.includes("400")) {
        errorMsg =
          "Error de configuración. Por favor contáctanos por WhatsApp.";
      } else if (error.text.includes("network")) {
        errorMsg =
          "Error de conexión. Verifica tu internet e intenta de nuevo.";
      }
    }

    mostrarNotificacion(errorMsg, "error");

    // Restaurar botón
    btn.disabled = false;
    btn.innerHTML = originalBtnContent;
  }

  // ==================== NOTIFICACIONES ====================

  function mostrarNotificacion(mensaje, tipo = "info") {
    // Remover notificación anterior si existe
    const notifAnterior = document.querySelector(".notification-toast");
    if (notifAnterior) {
      notifAnterior.remove();
    }

    // Crear notificación
    const notif = document.createElement("div");
    notif.className = `notification-toast ${tipo}`;

    const icono = tipo === "success" ? "✅" : tipo === "error" ? "❌" : "ℹ️";
    const bgColor =
      tipo === "success" ? "#27ae60" : tipo === "error" ? "#e74c3c" : "#3498db";

    notif.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span style="font-size: 1.5rem;">${icono}</span>
        <span>${mensaje}</span>
      </div>
    `;

    // Estilos
    Object.assign(notif.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "1rem 1.5rem",
      borderRadius: "8px",
      backgroundColor: bgColor,
      color: "white",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      zIndex: "9999",
      maxWidth: "400px",
      fontSize: "0.95rem",
      cursor: "pointer",
      animation: "slideInRight 0.3s ease",
    });

    document.body.appendChild(notif);

    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
      notif.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => notif.remove(), 300);
    }, 5000);

    // Cerrar al hacer clic
    notif.addEventListener("click", () => {
      notif.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => notif.remove(), 300);
    });
  }

  // ==================== ESTILOS ====================

  function addStyles() {
    if (document.getElementById("contacto-styles")) return;

    const style = document.createElement("style");
    style.id = "contacto-styles";
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
      }
      
      .spinner {
        width: 14px;
        height: 14px;
        border: 2px solid #ffffff;
        border-top: 2px solid transparent;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        display: inline-block;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;

    document.head.appendChild(style);
  }

  // ==================== INICIALIZAR ====================

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      addStyles();
      init();
    });
  } else {
    addStyles();
    init();
  }
})();
