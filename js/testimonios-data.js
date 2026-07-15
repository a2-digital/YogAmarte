// ==================== DATOS DE TESTIMONIOS ====================
// Cada testimonio es UNA IMAGEN (captura de chat, foto editada, etc.)
// El texto ya viene dentro de la imagen, por eso aquí no se escribe.
//
// Para agregar un testimonio nuevo, solo agrega un objeto al array.
// No es necesario tocar HTML ni CSS.
//
// Campos:
//   idioma  -> idioma en que está escrita la imagen ('es', 'de', 'en', etc.)
//              Esto decide en qué botón (Español / Deutsch / ...) aparece.
//   imagen  -> ruta de la imagen. Ej: "../images/testimonios/javier.jpg"
//              (NOTA: las rutas de abajo son de ejemplo, todavía no existen
//              esos archivos. Reemplázalas por las imágenes reales cuando
//              las subas a la carpeta images/testimonios/. Mientras tanto,
//              si la imagen no carga, se muestra automáticamente la
//              inicial del nombre como respaldo.)
//   nombre  -> nombre de la persona (texto alternativo para accesibilidad,
//              y respaldo si la imagen no carga)

window.TESTIMONIOS_DATA = [
  // Alemán - Deutsch
  {
    id: "tanja",
    idioma: "de",
    nombre: "Tanja",
    imagen: "../images/testimonios/de/tanja.png",
  },
  {
    id: "renate",
    idioma: "de",
    nombre: "Renate",
    imagen: "../images/testimonios/de/renate.png",
  },
  {
    id: "esther",
    idioma: "de",
    nombre: "Esther",
    imagen: "../images/testimonios/de/esther.png",
  },
  {
    id: "martina",
    idioma: "de",
    nombre: "Martina",
    imagen: "../images/testimonios/de/martina.png",
  },
  {
    id: "brigitte",
    idioma: "de",
    nombre: "Brigitte",
    imagen: "../images/testimonios/de/brigitte.png",
  },
  {
    id: "ursula",
    idioma: "de",
    nombre: "Ursula",
    imagen: "../images/testimonios/de/ursula.png",
  },
  {
    id: "silvia",
    idioma: "de",
    nombre: "Silvia",
    imagen: "../images/testimonios/de/silvia.png",
  },
  //Español - Spanish
  {
    id: "gabi",
    idioma: "es",
    nombre: "Gabi",
    imagen: "../images/testimonios/es/gabi.png",
  },
  {
    id: "hanna",
    idioma: "es",
    nombre: "Hanna",
    imagen: "../images/testimonios/es/hanna.png",
  },
];
