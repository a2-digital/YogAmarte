// ==================== INTEGRACIÓN CALENDLY - YOGAMARTE ====================

(function () {
  "use strict";

  // ==================== VARIABLES GLOBALES ====================
  let selectedClassType = null;
  const calendlyContainer = document.getElementById("calendlyContainer");
  const confirmationMessage = document.getElementById("confirmationMessage");

  // ==================== INICIALIZACIÓN ====================

  function init() {
    if (!calendlyContainer) {
      console.warn("⚠️ Contenedor de Calendly no encontrado");
      return;
    }

    initializeClassSelection();
    listenToCalendlyEvents();
    console.log("✅ Sistema de reservas Calendly inicializado");
  }

  // ==================== SELECCIÓN DE TIPO DE CLASE ====================

  function initializeClassSelection() {
    const classCards = document.querySelectorAll(".class-type-card");

    if (!classCards.length) return;

    classCards.forEach((card) => {
      card.addEventListener("click", function () {
        // Remover selección anterior
        classCards.forEach((c) => c.classList.remove("selected"));

        // Agregar selección actual
        this.classList.add("selected");

        // Obtener URL de Calendly
        const calendlyUrl = this.getAttribute("data-calendly-url");
        const classType = this.querySelector("h3").textContent;

        selectedClassType = classType;

        // Cargar widget
        loadCalendlyWidget(calendlyUrl);

        // Scroll suave al calendario
        setTimeout(() => {
          calendlyContainer.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 100);
      });
    });
  }

  // ==================== CARGAR WIDGET DE CALENDLY ====================

  function loadCalendlyWidget(url) {
    // Limpiar contenedor
    calendlyContainer.innerHTML = "";
    calendlyContainer.classList.remove("calendly-loaded");

    // Validar URL
    if (!url || url.includes("TU_URL")) {
      mostrarError();
      return;
    }

    // Verificar que Calendly esté disponible
    if (typeof Calendly === "undefined") {
      console.error("❌ Calendly no está cargado");
      mostrarError("Calendly no está disponible. Por favor recarga la página.");
      return;
    }

    // Cargar widget
    try {
      Calendly.initInlineWidget({
        url: url,
        parentElement: calendlyContainer,
        prefill: {},
        utm: {
          utmSource: "website",
          utmMedium: "reserva-page",
          utmCampaign: selectedClassType,
        },
      });

      calendlyContainer.classList.add("calendly-loaded");
    } catch (error) {
      console.error("Error al cargar Calendly:", error);
      mostrarError(
        "Error al cargar el calendario. Por favor intenta de nuevo."
      );
    }
  }

  // ==================== MOSTRAR ERROR ====================

  function mostrarError(mensaje = "Por favor, configura tu URL de Calendly") {
    calendlyContainer.innerHTML = `
      <div class="calendly-placeholder error">
        <div class="placeholder-icon">⚠️</div>
        <p><strong>Configuración pendiente</strong></p>
        <p>${mensaje}</p>
      </div>
    `;
  }

  // ==================== ESCUCHAR EVENTOS DE CALENDLY ====================

  function listenToCalendlyEvents() {
    window.addEventListener("message", function (e) {
      // Verificar que el mensaje venga de Calendly
      if (!e.data.event || e.data.event.indexOf("calendly") !== 0) {
        return;
      }

      console.log("📅 Evento Calendly:", e.data.event);

      // Manejar reserva exitosa
      if (e.data.event === "calendly.event_scheduled") {
        handleReservationSuccess(e.data.payload);
      }
    });
  }

  // ==================== MANEJAR RESERVA EXITOSA ====================

  function handleReservationSuccess(payload) {
    console.log("✅ ¡Reserva exitosa!", payload);

    // Mostrar mensaje de confirmación
    if (confirmationMessage) {
      confirmationMessage.style.display = "block";

      // Scroll al mensaje
      setTimeout(() => {
        confirmationMessage.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);

      // Ocultar después de 10 segundos
      setTimeout(() => {
        confirmationMessage.style.display = "none";
      }, 10000);
    }

    // Google Analytics (si está disponible)
    if (typeof gtag !== "undefined") {
      gtag("event", "reservation_completed", {
        event_category: "Reservations",
        event_label: selectedClassType,
        value: 1,
      });
    }

    // Facebook Pixel (si está disponible)
    if (typeof fbq !== "undefined") {
      fbq("track", "Schedule", {
        content_name: selectedClassType,
      });
    }
  }

  // ==================== INICIAR ====================

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
