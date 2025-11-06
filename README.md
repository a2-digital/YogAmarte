# 🌿 YogAmarte — Sitio web de Yoga y Terapias Holísticas

Sitio web estático desarrollado para **YogAmarte**, un espacio de bienestar dirigido por **Paola Bergmann**, enfocado en la **prestación de servicios de yoga, terapias chamánicas, angelicales y retiros holísticos**.
La página permite a los visitantes **agendar clases**, **contactarse directamente** y conocer más sobre los **servicios ofrecidos** y la **biografía de la instructora**.

---

## 🪷 Descripción general

El sitio tiene como propósito principal **promocionar los servicios de YogAmarte** y facilitar el contacto con los clientes interesados.
Incluye:

* Página principal con banner y secciones de servicios.
* Páginas dedicadas a contacto, reserva, testimonios y sobre mí.
* Sistema de traducción (multiidioma).
* Navbar y footer cargados dinámicamente desde componentes HTML.
* Diseño limpio, responsive y con accesibilidad básica.

---

## 📂 Estructura del proyecto

```
YogAmarte/
│
├── componentes/              # Estructura modular (navbar/footer)
│   ├── footer.html
│   └── navbar.html
│
├── css/                      # Estilos del sitio
│   ├── contacto.css
│   ├── footer.css
│   ├── index.css
│   ├── nav.css
│   ├── reserva.css
│   ├── sobremi.css
│   ├── testimonio.css
│   └── variables.css
│
├── data/                     # Archivos de traducción
│   ├── es.json
│   └── de.json
│
├── images/                   # Imágenes y recursos gráficos
│   └── (archivos varios)
│
├── js/                       # Lógica del sitio
│   ├── contacto.js
│   ├── funciones.js
│   ├── load-footer.js
│   ├── load-navbar.js
│   ├── nav.js
│   ├── reserva-calendly.js
│   └── traduccion.js
│
├── paginas/                  # Subpáginas del sitio
│   ├── contacto.html
│   ├── reserva.html
│   ├── sobre_mi.html
│   └── testimonio.html
│
├── index.html                # Página principal
├── LICENSE                   # Licencia MIT
└── README.md                 # Este archivo
```

---

## ⚙️ Tecnologías utilizadas

* **HTML5**, **CSS3**, **JavaScript**
* **Estructura modular:** carga dinámica de navbar y footer.
* **Traducción:** soporte multilenguaje con archivos `.json`.
* **Responsive Design:** adaptable a móviles, tablets y escritorio.
* **Integración Calendly:** para agendar clases o sesiones.

---

## 🚀 Cómo ejecutar el proyecto

1. Clona el repositorio o descarga los archivos:

   ```bash
   git clone https://github.com/a2-digital/YogAmarte.git
   cd YogAmarte
   ```

2. Abre el proyecto en **VS Code** o tu editor preferido.

3. Ejecuta la página:

   * Doble clic en `index.html`
   * O con **Live Server (extension VS Code)**:
     clic derecho → *Open with Live Server*

---

## 🧭 Páginas principales

| Página                      | Descripción                                    |
| --------------------------- | ---------------------------------------------- |
| **index.html**              | Página principal con presentación de servicios |
| **paginas/sobre_mi.html**   | Biografía y trayectoria de Paola Bergmann      |
| **paginas/contacto.html**   | Formulario y medios de contacto                |
| **paginas/reserva.html**    | Enlace a Calendly para agendar clases          |
| **paginas/testimonio.html** | Carrusel con experiencias de clientes          |

---

## 🪶 Autoría y créditos

* Desarrollado por **Andrés Aranguren (A2 Digital)**
* Proyecto para **Paola Bergmann — YogAmarte**

---

## 📄 Licencia

Distribuido bajo **Licencia MIT**, permitiendo uso y modificación con fines personales o profesionales.
Consulta el archivo `LICENSE` para más detalles.
