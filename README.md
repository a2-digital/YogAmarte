# 🌸 YogAmarte — Sitio Web de Yoga y Terapias Holísticas

**YogAmarte** es una página web informativa y de contacto dedicada a la práctica del **yoga**, las **terapias holísticas** y la **sanación espiritual**, creada para **Paola Bergmann**.
Permite a los usuarios **agendar clases personalizadas**, conocer los **servicios disponibles** y descubrir la **trayectoria y filosofía** de la instructora.

---

## 🌿 Descripción

El sitio web de **YogAmarte** fue desarrollado con el propósito de ofrecer un espacio digital sereno y accesible donde los visitantes puedan:

* Informarse sobre **servicios de yoga** (individuales y grupales).
* Explorar **terapias chamánicas, angelicales y energéticas**.
* **Agendar sesiones** o comunicarse directamente con Paola.
* Conocer su **biografía y enfoque espiritual** hacia el bienestar integral.

El diseño combina estética suave, navegación intuitiva y estructura clara para transmitir equilibrio y conexión.

---

## ✨ Características principales

* 🌐 **Sitio estático** en HTML, CSS y JavaScript.
* 🧘‍♀️ **Sección de servicios** con modales informativos.
* 💬 **Carrusel automático** con testimonios reales.
* 🧭 **Navbar y footer dinámicos**, cargados mediante JavaScript.
* ♿ **Accesibilidad mejorada** (uso de `aria-*`, foco, Escape, tabulación).
* 📱 **Diseño responsive**, adaptado a dispositivos móviles.
* 📷 **Imágenes optimizadas** con carga diferida (`loading="lazy"`).

---

## 🗂️ Estructura del proyecto

```
YogAmarte/
│
├── index.html                  # Página principal
│
├── css/
│   └── index.css               # Estilos principales
│
├── js/
│   ├── funciones.js            # Lógica de modales, carrusel y animaciones
│   ├── nav.js                  # Control del menú de navegación
│   ├── load-navbar.js          # Inserta el navbar dinámicamente
│   ├── load-footer.js          # Inserta el footer dinámicamente
│   └── traduccion.js           # Utilidades de traducción (opcional)
│
├── images/                     # Recursos gráficos e iconos
│
└── README.md                   # Este archivo
```

---

## ⚙️ Requisitos

* Navegador moderno (Chrome, Edge, Firefox).
* No requiere servidor (se puede abrir localmente).
* **Live Server** en VS Code recomendado para pruebas.
* Git opcional para control de versiones.

---

## 🚀 Instalación y ejecución (Windows)

1. Abrir el proyecto en VS Code:

   ```powershell
   cd "C:\Users\andri\OneDrive\Desktop\Yogamarte"
   code .
   ```

2. Visualizar el sitio:

   * Doble clic en `index.html`, o

   * Desde PowerShell:

     ```powershell
     start .\index.html
     ```

   * Con Live Server (recomendado): clic derecho → *Open with Live Server*.

---

## ✅ Verificaciones rápidas

* Revisar la consola (F12) para detectar errores JS o rutas 404.
* Confirmar:

  * Apertura/cierre correcto de los modales.
  * Restauración del foco.
  * Navegación fluida con teclado.
* Verificar que las imágenes cargan y el sitio se ve bien en móviles.

---

## 📸 Capturas de pantalla

Crea una carpeta `screenshots/` y agrega imágenes como:

```markdown
### 🧘 Página principal
![Banner](screenshots/banner.png)

### 🌼 Modal de servicio
![Modal](screenshots/modal.png)

### 💬 Carrusel de testimonios
![Testimonios](screenshots/testimonios.png)
```

---

## 🧭 Comandos Git básicos

```powershell
git status
git add -A
git commit -m "Versión inicial de YogAmarte"
git push -u origin main
```

---

## 👩‍🦰 Créditos

* **Proyecto:** YogAmarte — Espacio de Yoga y Terapias Holísticas
* **Creadora:** Paola Bergmann
* **Desarrollo web:** Andrés Aranguren (A2 Digital)

---

## 📄 Licencia

Distribuido bajo la **licencia MIT**.
Consulta el archivo `LICENSE` para más información.
