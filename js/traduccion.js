// ==================== SISTEMA DE TRADUCCIÓN YOGAMARTE ====================

(function () {
  "use strict";

  // ==================== CONFIGURACIÓN ====================
  const CONFIG = {
    idiomasPorDefecto: "es",
    rutaJSON: {
      es: "./data/es.json",
      de: "./data/de.json",
    },
  };

  // Variable global para almacenar las traducciones cargadas
  window.traducciones = {
    es: null,
    de: null,
  };

  // Idioma actual
  window.idiomaActual =
    localStorage.getItem("idioma") || CONFIG.idiomasPorDefecto;

  // ==================== CARGAR TRADUCCIONES ====================
  async function cargarTraducciones() {
    try {
      // Determinar la ruta correcta según si estamos en subcarpeta o no
      const currentPath = window.location.pathname;
      const isInSubfolder = currentPath.includes("/paginas/");
      const prefijo = isInSubfolder ? "../" : "./";

      const [resES, resDE] = await Promise.all([
        fetch(prefijo + "data/es.json"),
        fetch(prefijo + "data/de.json"),
      ]);

      if (!resES.ok || !resDE.ok) {
        throw new Error("Error al cargar archivos JSON");
      }

      window.traducciones.es = await resES.json();
      window.traducciones.de = await resDE.json();

      console.log("✅ Traducciones cargadas exitosamente");
      return true;
    } catch (error) {
      console.error("❌ Error al cargar traducciones:", error);
      return false;
    }
  }

  // ==================== APLICAR TRADUCCIONES ====================
  function aplicarTraducciones(idioma) {
    const traducciones = window.traducciones[idioma];
    if (!traducciones) {
      console.error(`❌ No se encontraron traducciones para ${idioma}`);
      return;
    }

    // Detectar qué página estamos
    const pagina = document.body.getAttribute("data-page") || "index";
    console.log(`🌐 Aplicando traducciones: ${idioma} | Página: ${pagina}`);

    // ✅ Aplicar traducciones del navbar (SIEMPRE)
    aplicarNav(traducciones.Nav);

    // ✅ Aplicar traducciones del footer (SIEMPRE)
    aplicarFooter(traducciones.Footer);

    // Aplicar traducciones según la página
    switch (pagina) {
      case "index":
        aplicarIndex(traducciones.Index);
        break;
      case "sobremi":
        aplicarSobreMi(traducciones.Sobremi);
        break;
      case "testimonio":
        aplicarTestimonio(traducciones.Testimonio);
        break;
      case "contacto":
        aplicarContacto(traducciones.Contacto);
        break;
      case "reserva":
        aplicarReserva(traducciones.Reserva);
        break;
    }

    // Actualizar el atributo lang del HTML
    document.documentElement.lang = idioma;
  }

  // ==================== TRADUCCIONES DEL NAVBAR ====================
  function aplicarNav(nav) {
    if (!nav) return;

    // Traducir links del navbar
    const navLinks = document.querySelectorAll(".nav-links a");
    if (navLinks.length > 0) {
      navLinks[0].textContent = nav.inicio;
      navLinks[1].textContent = nav.sobre_mi;
      navLinks[2].textContent = nav.testimonios;
      navLinks[3].textContent = nav.contacto;
    }

    // Traducir botón de reservar
    const btnReservar = document.querySelector(".btn-reservar");
    if (btnReservar) {
      btnReservar.textContent = nav.reservar;
    }
  }

  // ==================== TRADUCCIONES DEL FOOTER ====================
  function aplicarFooter(footer) {
    if (!footer) {
      console.warn("⚠️ No se encontraron traducciones para el footer");
      return;
    }

    console.log("🔄 Aplicando traducciones del footer...");

    // Nombre de la marca
    const nombreMarca = document.querySelector(".footer-brand-name");
    if (nombreMarca) {
      nombreMarca.textContent = footer.marca.nombre;
      console.log("✅ Nombre marca traducido");
    }

    // Copyright
    const copyright = document.querySelector(".footer-copyright");
    if (copyright) {
      copyright.textContent = footer.marca.copyright;
      console.log("✅ Copyright traducido");
    }

    // Hecho por A2Digital
    const hechoPor = document.querySelector(".footer-hecho-por");
    if (hechoPor) {
      const partes = footer.marca.hecho_por.split(" ");
      hechoPor.innerHTML = `${partes[0]} ${partes[1]} <strong>${partes[2]}</strong>`;
      console.log("✅ Hecho por traducido");
    }

    // Links legales
    const footerLinks = document.querySelectorAll(".footer-link");
    if (footerLinks.length >= 3) {
      footerLinks[0].textContent = footer.links_legales.terminos;
      footerLinks[1].textContent = footer.links_legales.privacidad;
      footerLinks[2].textContent = footer.links_legales.cookies;
      console.log("✅ Links legales traducidos");
    }

    // Título redes sociales
    const tituloRedes = document.querySelector(".social-title");
    if (tituloRedes) {
      tituloRedes.textContent = footer.redes_sociales.titulo;
      console.log("✅ Título redes sociales traducido");
    }
  }

  // ==================== TRADUCCIONES DEL INDEX ====================
  function aplicarIndex(index) {
    if (!index) return;

    // Banner
    const titulo = document.querySelector(".banner-title");
    const subtitulo = document.querySelector(".banner-subtitle");
    if (titulo) titulo.textContent = index.banner.titulo;
    if (subtitulo) subtitulo.textContent = index.banner.subtitulo;

    // Servicios
    const serviciosTitulo = document.querySelector(".servicios-titulo");
    const serviciosSubtitulo = document.querySelector(".servicios-subtitulo");
    if (serviciosTitulo) serviciosTitulo.textContent = index.servicios.titulo;
    if (serviciosSubtitulo)
      serviciosSubtitulo.textContent = index.servicios.subtitulo;

    // Tarjetas de servicios
    index.servicios.items.forEach((servicio, idx) => {
      const card = document.getElementById(servicio.id);
      if (card) {
        const h3 = card.querySelector("h3");
        const p = card.querySelector("p");
        const btn = card.querySelector(".learn-more-btn");
        if (h3) h3.innerHTML = servicio.titulo;
        if (p) p.textContent = servicio.descripcion;
        if (btn) btn.textContent = servicio.textoBoton;
      }
    });

    // Filosofía
    const filosofiaTitulo = document.querySelector(".filosofia-titulo");
    if (filosofiaTitulo) filosofiaTitulo.textContent = index.filosofia.titulo;

    const filosofiaBloques = document.querySelectorAll(".filosofia-bloque p");
    index.filosofia.bloques.forEach((bloque, idx) => {
      if (filosofiaBloques[idx]) {
        filosofiaBloques[
          idx
        ].innerHTML = `${bloque.icono} <b>${bloque.titulo}</b> ${bloque.texto}`;
      }
    });

    // Modales
    index.modales.forEach((modal) => {
      const modalEl = document.getElementById(modal.id);
      if (modalEl) {
        const h2 = modalEl.querySelector("h2");
        const modalBody = modalEl.querySelector(".modal-body");

        if (h2) h2.textContent = modal.titulo;

        // Limpiar y recrear los párrafos dinámicamente
        if (modalBody) {
          // Encontrar todos los <p> que contienen descripción (antes del .modal-info)
          const modalInfo = modalEl.querySelector(".modal-info");

          // Eliminar solo los párrafos de descripción existentes
          const parrafosExistentes =
            modalBody.querySelectorAll("p:not(.angelical)");
          parrafosExistentes.forEach((p) => {
            // No eliminar si es parte de modal-info
            if (!p.closest(".modal-info")) {
              p.remove();
            }
          });

          // Crear nuevos párrafos con todas las descripciones
          modal.descripcion.forEach((texto) => {
            const p = document.createElement("p");

            // Si el texto empieza con **, hacerlo subtítulo
            if (texto.startsWith("**") && texto.endsWith("**")) {
              p.innerHTML = `<strong style="font-size: 1.1em; color: #bf8d50; display: block; margin-top: 1rem;">
              ${texto.slice(2, -2)}</strong>`;
            } else {
              p.textContent = texto;
            }

            // Insertar antes de modal-info si existe, sino al final
            if (modalInfo) {
              modalBody.insertBefore(p, modalInfo);
            } else {
              modalBody.appendChild(p);
            }
          });
        }

        // Información del modal (este código ya está bien)
        const modalInfo = modalEl.querySelector(".modal-info");
        if (modalInfo && modal.info) {
          const infoParagraphs = modalInfo.querySelectorAll("p");

          const infoTexts = [
            `📅 ${window.idiomaActual === "de" ? "Dauer" : "Duración"}: ${
              modal.info.duracion
            }`,
            modal.info.ubicacion
              ? `📍 ${window.idiomaActual === "de" ? "Ort" : "Ubicación"}: ${
                  modal.info.ubicacion
                }`
              : `📍 ${window.idiomaActual === "de" ? "Format" : "Modalidad"}: ${
                  modal.info.modalidad
                }`,
            modal.info.grupo
              ? `👥 ${
                  window.idiomaActual === "de" ? "Gruppengröße" : "Grupo"
                }: ${modal.info.grupo}`
              : null,
            `💰 ${window.idiomaActual === "de" ? "Kosten" : "Precio"}: ${
              modal.info.inversion
            }`,
            `📨 ${window.idiomaActual === "de" ? "E-Mail" : "Correo"}: ${
              modal.info.correo
            }`,
          ].filter(Boolean);

          infoTexts.forEach((texto, idx) => {
            if (infoParagraphs[idx]) {
              infoParagraphs[idx].innerHTML = `<strong>${
                texto.split(":")[0]
              }:</strong> ${texto.split(":").slice(1).join(":")}`;
            }
          });
        }
      }
    });
  }

  // ==================== TRADUCCIONES DE SOBRE MÍ (CORREGIDO) ====================
  function aplicarSobreMi(sobremi) {
    if (!sobremi) return;

    // Header
    const headerTitulo = document.querySelector(".about-title");
    const headerSubtitulo = document.querySelector(".about-subtitle");
    if (headerTitulo) headerTitulo.textContent = sobremi.Header.titulo;
    if (headerSubtitulo) headerSubtitulo.textContent = sobremi.Header.frase;

    // Timeline
    const timelineTitulo = document.querySelector(
      ".timeline-section .section-title"
    );
    if (timelineTitulo) timelineTitulo.textContent = sobremi.timeline.titulo;

    const timelineItems = document.querySelectorAll(".timeline-item");
    sobremi.timeline.items.forEach((item, idx) => {
      if (timelineItems[idx]) {
        const h3 = timelineItems[idx].querySelector("h3");
        const parrafos = timelineItems[idx].querySelectorAll(
          "p:not(.highlight-text)"
        ); // ✅ EXCLUYE highlight-text

        if (h3) h3.textContent = item.titulo;

        // Combinar todos los párrafos en uno solo (excepto highlight-text)
        const textoCompleto = item.parrafos.join(" ");
        if (parrafos[0]) {
          parrafos[0].textContent = textoCompleto;

          // ✅ ARREGLADO: Solo oculta párrafos normales, NO los highlight-text
          for (let i = 1; i < parrafos.length; i++) {
            if (!parrafos[i].classList.contains("highlight-text")) {
              parrafos[i].style.display = "none";
            }
          }
        }
      }
    });

    // Formación
    const formacionTitulo = document.querySelector(
      ".certifications-section .section-title"
    );
    if (formacionTitulo) formacionTitulo.textContent = sobremi.formacion.titulo;

    const certCards = document.querySelectorAll(".cert-card");
    sobremi.formacion.items.forEach((cert, idx) => {
      if (certCards[idx]) {
        const h3 = certCards[idx].querySelector("h3");
        const p = certCards[idx].querySelector("p");
        if (h3) h3.textContent = cert.titulo;
        if (p) p.textContent = cert.texto;
      }
    });

    // Mensaje personal
    const quoteText = document.querySelector(".quote-text");
    const quoteAuthor = document.querySelector(".quote-author");
    const ctaTitulo = document.querySelector(".message-cta h3");
    const ctaTexto = document.querySelector(".message-cta p");
    const ctaBoton = document.querySelector(".btn-contacto");

    if (quoteText) quoteText.textContent = sobremi.mensaje.frase;
    if (quoteAuthor) quoteAuthor.textContent = `— ${sobremi.mensaje.autor}`;
    if (ctaTitulo) ctaTitulo.textContent = sobremi.mensaje.cta_titulo;
    if (ctaTexto) ctaTexto.textContent = sobremi.mensaje.cta_texto;
    if (ctaBoton) ctaBoton.textContent = sobremi.mensaje.cta_boton;

    // Valores
    const valoresTitulo = document.querySelector(
      ".values-section .section-title"
    );
    if (valoresTitulo) valoresTitulo.textContent = sobremi.valores.titulo;

    const valueCards = document.querySelectorAll(".value-card");
    sobremi.valores.items.forEach((valor, idx) => {
      if (valueCards[idx]) {
        const h3 = valueCards[idx].querySelector("h3");
        const p = valueCards[idx].querySelector("p");
        if (h3) h3.textContent = valor.titulo;
        if (p) p.textContent = valor.texto;
      }
    });
  }

  // ==================== TRADUCCIONES DE TESTIMONIO ====================
  function aplicarTestimonio(testimonio) {
    if (!testimonio) return;

    // Header
    const headerTitulo = document.querySelector(".testimonios-header h1");
    const headerSubtitulo = document.querySelector(".testimonios-header p");
    if (headerTitulo) headerTitulo.textContent = testimonio.header.titulo;
    if (headerSubtitulo)
      headerSubtitulo.textContent = testimonio.header.subtitulo;

    // Cards de testimonios
    const testimonioCards = document.querySelectorAll(".card-content");
    testimonio.cards.forEach((card, idx) => {
      if (testimonioCards[idx]) {
        const nombre = testimonioCards[idx].querySelector(".card-name");
        const ubicacion = testimonioCards[idx].querySelector(
          ".testimonio-ubicacion"
        );
        const texto = testimonioCards[idx].querySelector(".card-text");

        if (nombre) nombre.textContent = card.nombre;
        if (ubicacion) ubicacion.textContent = card.ubicacion;
        if (texto) texto.textContent = card.texto;
      }
    });
  }

  // ==================== TRADUCCIONES DE CONTACTO ====================
  function aplicarContacto(contacto) {
    if (!contacto) return;

    // Título principal
    const titulo = document.querySelector(
      ".contacto-container h1, .contacto-section h2"
    );
    if (titulo) titulo.textContent = contacto.titulo;

    // Placeholders del formulario
    const inputNombre = document.querySelector('input[name="from_name"]');
    const inputCorreo = document.querySelector('input[name="from_email"]');
    const inputTelefono = document.querySelector('input[name="phone"]');
    const textareaMensaje = document.querySelector('textarea[name="message"]');

    if (inputNombre) inputNombre.placeholder = contacto.formulario.nombre;
    if (inputCorreo) inputCorreo.placeholder = contacto.formulario.correo;
    if (inputTelefono) inputTelefono.placeholder = contacto.formulario.telefono;
    if (textareaMensaje)
      textareaMensaje.placeholder = contacto.formulario.mensaje;

    // Botón de enviar
    const btnEnviar = document.querySelector(".btn-enviar");
    if (btnEnviar) {
      const icono = btnEnviar.querySelector("i");
      if (icono) {
        btnEnviar.innerHTML = "";
        btnEnviar.appendChild(icono);
        btnEnviar.appendChild(
          document.createTextNode(" " + contacto.formulario.boton)
        );
      } else {
        btnEnviar.textContent = contacto.formulario.boton;
      }
    }

    // Info del formulario
    const formInfo = document.querySelector(".form-info");
    if (formInfo) {
      const icono = formInfo.querySelector("i");
      if (icono) {
        formInfo.innerHTML = "";
        formInfo.appendChild(icono);
        formInfo.appendChild(
          document.createTextNode(" " + contacto.formulario.info)
        );
      } else {
        formInfo.textContent = contacto.formulario.info;
      }
    }

    // WhatsApp
    const whatsappLink = document.querySelector('.info-item a[href*="wa.me"]');
    if (whatsappLink) {
      whatsappLink.textContent = contacto.informacion.whatsapp.texto;
    }
  }

  // ==================== TRADUCCIONES DE RESERVA ====================
  function aplicarReserva(reserva) {
    if (!reserva) return;

    // Título principal y subtítulo
    const titulo = document.querySelector(".reserva-title");
    const subtitulo = document.querySelector(".reserva-subtitle");
    if (titulo) titulo.textContent = reserva.titulo;
    if (subtitulo) subtitulo.textContent = reserva.subtitulo;

    // Paso 1: Título
    const pasos = document.querySelectorAll(".reserva-pasos");
    if (pasos[0] && reserva.pasos[0]) {
      pasos[0].textContent = reserva.pasos[0].paso;
    }

    // Tarjetas de tipos de clase
    const classCards = document.querySelectorAll(".class-type-card");
    if (reserva.pasos[0] && reserva.pasos[0].clases) {
      reserva.pasos[0].clases.forEach((clase, idx) => {
        if (classCards[idx]) {
          const nombre = classCards[idx].querySelector("h3");
          const descripcion = classCards[idx].querySelector("p");
          const duracion = classCards[idx].querySelector(".duration");

          if (nombre) nombre.textContent = clase.nombre;
          if (descripcion) descripcion.textContent = clase.descripcion;
          if (duracion) duracion.textContent = clase.duracion;
        }
      });
    }

    // Paso 2: Título
    if (pasos[1] && reserva.pasos[1]) {
      pasos[1].textContent = reserva.pasos[1].paso;
    }

    // Descripción del calendario
    const descripcion = document.querySelector(
      ".calendar-section .descripcion"
    );
    if (descripcion && reserva.pasos[1]) {
      descripcion.textContent = reserva.pasos[1].descripcion;
    }

    // Placeholder del calendario
    const placeholderText = document.querySelector(".calendly-placeholder p");
    if (placeholderText && reserva.pasos[1]) {
      placeholderText.textContent = reserva.pasos[1].sugerencia;
    }

    // Mensaje de confirmación
    const confirmTitle = document.querySelector(".confirmation-message h3");
    const confirmText = document.querySelector(".confirmation-message p");
    if (
      confirmTitle &&
      reserva.pasos[1] &&
      reserva.pasos[1].mensaje_confirmacion
    ) {
      confirmTitle.textContent = reserva.pasos[1].mensaje_confirmacion.titulo;
    }
    if (
      confirmText &&
      reserva.pasos[1] &&
      reserva.pasos[1].mensaje_confirmacion
    ) {
      confirmText.textContent = reserva.pasos[1].mensaje_confirmacion.texto;
    }
  }

  // ==================== CAMBIAR IDIOMA ====================
  window.cambiarIdioma = function (nuevoIdioma) {
    if (nuevoIdioma === window.idiomaActual) return;

    window.idiomaActual = nuevoIdioma;
    localStorage.setItem("idioma", nuevoIdioma);
    aplicarTraducciones(nuevoIdioma);

    // Actualizar el toggle visual del idioma
    const langToggle = document.getElementById("langToggle");
    if (langToggle) {
      langToggle.className = `lang-toggle ${nuevoIdioma}`;
    }

    console.log(`✅ Idioma cambiado a: ${nuevoIdioma}`);
  };

  // ==================== TOGGLE DE IDIOMA ====================
  window.toggleIdioma = function () {
    const nuevoIdioma = window.idiomaActual === "es" ? "de" : "es";
    window.cambiarIdioma(nuevoIdioma);
  };

  // ==================== INICIALIZACIÓN ====================
  async function inicializar() {
    console.log("🚀 Inicializando sistema de traducción...");

    const cargado = await cargarTraducciones();
    if (cargado) {
      aplicarTraducciones(window.idiomaActual);

      // Actualizar el toggle visual
      const langToggle = document.getElementById("langToggle");
      if (langToggle) {
        langToggle.className = `lang-toggle ${window.idiomaActual}`;
      }
    }
  }

  // Esperar a que navbar Y footer estén cargados
  function esperarComponentes() {
    return new Promise((resolve) => {
      const maxIntentos = 50; // 5 segundos
      let intentos = 0;

      const verificar = setInterval(() => {
        intentos++;

        const navbar = document.querySelector(".navbar");
        const footer = document.querySelector(".footer");

        console.log(
          `Intento ${intentos}: Navbar=${!!navbar}, Footer=${!!footer}`
        );

        // Si ambos existen, continuar
        if (navbar && footer) {
          clearInterval(verificar);
          console.log("✅ Navbar y Footer detectados");
          resolve();
        }

        // Timeout de seguridad
        if (intentos >= maxIntentos) {
          clearInterval(verificar);
          console.warn("⚠️ Timeout esperando componentes");
          resolve();
        }
      }, 100);
    });
  }

  // Inicializar cuando todo esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", async () => {
      await esperarComponentes();
      await inicializar();
    });
  } else {
    esperarComponentes().then(inicializar);
  }
})();
