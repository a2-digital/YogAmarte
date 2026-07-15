// ==================== CUADRÍCULA DE TESTIMONIOS (BORDE ONDULADO) ====================
// Genera automáticamente:
//  - Los botones de idioma (según los idiomas presentes en testimonios-data.js)
//  - Las tarjetas con borde ondulado, cada una con una leve rotación distinta
//
// Para agregar un testimonio nuevo: edita únicamente js/testimonios-data.js

(function () {
  "use strict";

  const NOMBRES_IDIOMA = {
    es: "Español",
    de: "Deutsch",
    en: "English",
    fr: "Français",
    it: "Italiano",
    pt: "Português",
  };

  // Rotaciones fijas que se van repitiendo (para que sea variado pero estable,
  // no cambie de ángulo cada vez que se re-dibuja la cuadrícula)
  const ROTACIONES = [-4, 2, -2, 3, -3, 4];

  function nombreIdioma(codigo) {
    return (
      NOMBRES_IDIOMA[codigo] || codigo.charAt(0).toUpperCase() + codigo.slice(1)
    );
  }

  let idiomaActivo = null;
  let datos = [];

  function idiomasDisponibles() {
    const vistos = [];
    datos.forEach((t) => {
      if (!vistos.includes(t.idioma)) vistos.push(t.idioma);
    });
    const prioridad = ["de", "es"];
    return [
      ...prioridad.filter((p) => vistos.includes(p)),
      ...vistos.filter((v) => !prioridad.includes(v)),
    ];
  }

  function filtrarPorIdioma(idioma) {
    return datos.filter((t) => t.idioma === idioma);
  }

  function renderTabsIdioma() {
    const cont = document.getElementById("langTabsTestimonio");
    if (!cont) return;

    const idiomas = idiomasDisponibles();
    cont.innerHTML = "";

    idiomas.forEach((idioma) => {
      const btn = document.createElement("button");
      btn.className =
        "lang-tab-btn" + (idioma === idiomaActivo ? " active" : "");
      btn.textContent = nombreIdioma(idioma);
      btn.addEventListener("click", () => cambiarIdiomaTestimonios(idioma));
      cont.appendChild(btn);
    });
  }

  function crearTarjeta(testimonio, indice) {
    const card = document.createElement("div");
    card.className = "testimonio-card-wave";
    card.style.setProperty(
      "--rot",
      ROTACIONES[indice % ROTACIONES.length] + "deg",
    );

    const img = document.createElement("img");
    img.className = "testimonio-img-wave";
    img.src = testimonio.imagen;
    img.alt = "Testimonio de " + testimonio.nombre;
    img.addEventListener("error", () => {
      const letra = document.createElement("div");
      letra.className = "avatar-letter";
      letra.textContent = testimonio.nombre.charAt(0);
      img.replaceWith(letra);
    });

    card.appendChild(img);

    // Animación de entrada escalonada
    setTimeout(() => card.classList.add("visible"), 40 + indice * 90);

    return card;
  }

  function renderGrid() {
    const cont = document.getElementById("testimoniosGrid");
    if (!cont) return;

    const lista = filtrarPorIdioma(idiomaActivo);
    cont.innerHTML = "";
    lista.forEach((testimonio, i) => {
      cont.appendChild(crearTarjeta(testimonio, i));
    });
  }

  function cambiarIdiomaTestimonios(idioma) {
    if (idioma === idiomaActivo) return;
    idiomaActivo = idioma;
    renderTabsIdioma();
    renderGrid();
  }

  function init() {
    datos = window.TESTIMONIOS_DATA || [];
    if (!datos.length) return;

    const idiomas = idiomasDisponibles();
    idiomaActivo = idiomas[0];

    renderTabsIdioma();
    renderGrid();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
