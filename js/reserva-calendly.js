// ==================== INTEGRACIÓN CALENDLY - YOGAMARTE ====================

(function () {
  "use strict";

  // ==================== VARIABLES GLOBALES ====================
  let selectedClassType = null;
  const calendlyContainer = document.getElementById("calendlyContainer");
  const confirmationMessage = document.getElementById("confirmationMessage");

  const WHATSAPP_NUMBER = "573115750453";

  // ==================== VARIABLES MODAL ====================
  let countdownTimer = null;
  let segundosRestantes = 10;
  let idiomaModal = "es"; // Idioma del modal independiente

  // ==================== INICIALIZACIÓN ====================

  function init() {
    // Inicializar modal de aviso
    initModal();

    // Inicializar sistema de reservas
    if (!calendlyContainer) {
      console.warn("⚠️ Contenedor de Calendly no encontrado");
      return;
    }

    initializeClassSelection();
    listenToCalendlyEvents();
    console.log("✅ Sistema de reservas Calendly inicializado");
  }

  // ==================== INICIALIZAR MODAL ====================

  function initModal() {
    if (document.body.getAttribute("data-page") !== "reserva") {
      return;
    }

    const modal = document.getElementById("modalAvisoReserva");
    if (!modal) return;

    // Detectar idioma guardado
    idiomaModal = localStorage.getItem("idioma") || "es";

    // Actualizar botones activos
    actualizarBotonesIdioma();

    // Actualizar textos del modal
    actualizarTextosModal();

    // Mostrar modal
    mostrarModal();

    // Iniciar countdown
    iniciarCountdown();

    // Cerrar al hacer clic en el overlay
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        cerrarModalAviso();
      }
    });

    console.log("✅ Modal de aviso inicializado");
  }

  // ==================== MOSTRAR MODAL ====================

  function mostrarModal() {
    const modal = document.getElementById("modalAvisoReserva");
    if (modal) {
      modal.classList.remove("hidden");
      modal.style.display = "flex";
    }
  }

  // ==================== INICIAR COUNTDOWN ====================

  function iniciarCountdown() {
    const countdownElement = document.getElementById("countdown");
    if (!countdownElement) return;

    // Limpiar timer anterior si existe
    if (countdownTimer) {
      clearInterval(countdownTimer);
    }

    countdownTimer = setInterval(() => {
      segundosRestantes--;
      countdownElement.textContent = segundosRestantes;

      if (segundosRestantes <= 0) {
        cerrarModalAviso();
      }
    }, 1000);
  }

  // ==================== CERRAR MODAL ====================

  window.cerrarModalAviso = function () {
    const modal = document.getElementById("modalAvisoReserva");
    if (!modal) return;

    if (countdownTimer) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }

    modal.classList.add("hidden");

    setTimeout(() => {
      modal.style.display = "none";
    }, 300);

    console.log("✅ Modal cerrado");
  };

  // ==================== CAMBIAR IDIOMA DEL MODAL ====================

  window.cambiarIdiomaModal = function (nuevoIdioma) {
    console.log("🔄 Cambiando idioma del modal a:", nuevoIdioma);

    // No hacer nada si es el mismo idioma
    if (idiomaModal === nuevoIdioma) return;

    idiomaModal = nuevoIdioma;

    // Actualizar botones activos
    actualizarBotonesIdioma();

    // Actualizar textos
    actualizarTextosModal();

    // ✅ IMPORTANTE: Detener el timer anterior antes de crear uno nuevo
    if (countdownTimer) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }

    iniciarCountdown();
  };

  // ==================== ACTUALIZAR BOTONES DE IDIOMA ====================

  function actualizarBotonesIdioma() {
    const botones = document.querySelectorAll(".modal-lang-btn");
    botones.forEach((btn) => {
      if (btn.getAttribute("data-lang") === idiomaModal) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  // ==================== ACTUALIZAR TEXTOS DEL MODAL ====================

  function actualizarTextosModal() {
    // Definir textos en ambos idiomas
    const textos = {
      es: {
        titulo: "Información Importante",
        texto:
          "La idea en esta sección es <strong>conocernos en una llamada gratuita</strong> para saber si mis terapias te pueden ayudar. En esta sesión miraremos juntos lo que más te conviene y te informaré sobre el <strong>costo de las siguientes sesiones</strong>.",
        contador: "Se cerrará en",
        boton: "¡Entendido!",
      },
      de: {
        titulo: "Wichtige Information",
        texto:
          "Die Idee in diesem Abschnitt ist, <strong>uns in einem kostenlosen Gespräch kennenzulernen</strong>, um herauszufinden, ob meine Therapien Ihnen helfen können. In dieser Sitzung werden wir gemeinsam schauen, was am besten für Sie geeignet ist, und ich werde Sie über die <strong>Kosten der folgenden Sitzungen</strong> informieren.",
        contador: "Schließt in",
        boton: "Verstanden!",
      },
    };

    const t = textos[idiomaModal] || textos.es;

    const titulo = document.getElementById("modalTitulo");
    const texto = document.getElementById("modalTexto");
    const contador = document.getElementById("modalContador");
    const boton = document.querySelector(".modal-btn-entendido");

    if (titulo) titulo.textContent = t.titulo;
    if (texto) texto.innerHTML = t.texto;
    if (boton) boton.textContent = t.boton;
    if (contador) {
      contador.innerHTML = `${t.contador} <span id="countdown">${segundosRestantes}</span>s`;
    }

    console.log(`✅ Textos del modal actualizados a: ${idiomaModal}`);
  }

  // ==================== SELECCIÓN DE TIPO DE CLASE ====================

  function initializeClassSelection() {
    const classCards = document.querySelectorAll(".class-type-card");

    if (!classCards.length) return;

    classCards.forEach((card) => {
      card.addEventListener("click", function () {
        classCards.forEach((c) => c.classList.remove("selected"));
        this.classList.add("selected");

        const calendlyUrl = this.getAttribute("data-calendly-url");
        const classType = this.querySelector("h3").textContent;

        selectedClassType = classType;

        const esGrupal =
          classType.toLowerCase().includes("grupal") ||
          classType.toLowerCase().includes("gruppe");
        const esRetiro =
          classType.toLowerCase().includes("retiro") ||
          classType.toLowerCase().includes("retreat");

        if (esGrupal || esRetiro) {
          mostrarMensajeEspecial(classType);
        } else {
          loadCalendlyWidget(calendlyUrl);
        }

        setTimeout(() => {
          calendlyContainer.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 100);
      });
    });
  }

  // ==================== MOSTRAR MENSAJE ESPECIAL ====================

  function mostrarMensajeEspecial(tipoClase) {
    const idioma = window.idiomaActual || "es";

    const textos = window.traducciones?.[idioma]?.Reserva?.mensaje_especial || {
      titulo: "Información Importante",
      texto1:
        "La realización de esta clase está sujeta a un <strong>cupo mínimo de participantes</strong>.",
      texto2:
        "Esta experiencia es <strong>exclusiva</strong> y tiene <strong>fechas definidas</strong>. ¡Reserva tu lugar antes de que se agoten!",
      contacto: "No dudes en llamarme:",
      boton: "Contactar por WhatsApp",
      whatsapp_mensaje:
        "Hola! Estoy interesado/a en {tipoClase}. Me gustaría conocer las fechas disponibles y más información.",
    };

    const mensajeWhatsApp = textos.whatsapp_mensaje.replace(
      "{tipoClase}",
      tipoClase
    );

    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      mensajeWhatsApp
    )}`;

    calendlyContainer.innerHTML = `
      <div class="mensaje-especial">
        <div class="mensaje-icono">📢</div>
        <h3>${textos.titulo}</h3>
        <p class="mensaje-texto">${textos.texto1}</p>
        <p class="mensaje-texto">${textos.texto2}</p>
        <div class="mensaje-acciones">
          <p class="mensaje-contacto">${textos.contacto}</p>
          <a href="${whatsappLink}" target="_blank" class="btn-whatsapp">
            <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            ${textos.boton}
          </a>
        </div>
      </div>
    `;

    calendlyContainer.classList.add("calendly-loaded");
  }

  // ==================== CARGAR WIDGET DE CALENDLY ====================

  function loadCalendlyWidget(url) {
    calendlyContainer.innerHTML = "";
    calendlyContainer.classList.remove("calendly-loaded");

    if (!url || url.includes("TU_URL")) {
      mostrarError();
      return;
    }

    if (typeof Calendly === "undefined") {
      console.error("❌ Calendly no está cargado");
      mostrarError("Calendly no está disponible. Por favor recarga la página.");
      return;
    }

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
      if (!e.data.event || e.data.event.indexOf("calendly") !== 0) {
        return;
      }

      console.log("📅 Evento Calendly:", e.data.event);

      if (e.data.event === "calendly.event_scheduled") {
        handleReservationSuccess(e.data.payload);
      }
    });
  }

  // ==================== MANEJAR RESERVA EXITOSA ====================

  function handleReservationSuccess(payload) {
    console.log("✅ ¡Reserva exitosa!", payload);

    if (confirmationMessage) {
      confirmationMessage.style.display = "block";

      setTimeout(() => {
        confirmationMessage.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);

      setTimeout(() => {
        confirmationMessage.style.display = "none";
      }, 10000);
    }

    if (typeof gtag !== "undefined") {
      gtag("event", "reservation_completed", {
        event_category: "Reservations",
        event_label: selectedClassType,
        value: 1,
      });
    }

    if (typeof fbq !== "undefined") {
      fbq("track", "Schedule", {
        content_name: selectedClassType,
      });
    }
  }

  // ==================== ESCUCHAR CAMBIOS DE IDIOMA ====================

  window.addEventListener("idiomaActualizado", function (e) {
    console.log("🔄 Idioma actualizado en reservas");

    if (
      calendlyContainer.querySelector(".mensaje-especial") &&
      selectedClassType
    ) {
      mostrarMensajeEspecial(selectedClassType);
    }
  });

  // ==================== INICIAR ====================

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
