# Portafolio personal · Rony Hércules

**Ver en vivo:** https://rara674.github.io/portafolio/

Sitio web personal para presentar mis proyectos, habilidades y experiencia.
Hecho desde cero con **HTML, CSS y JavaScript**, sin frameworks ni librerías.

## Características

- **Bilingüe (inglés / español)** con un botón: los textos en inglés están en el HTML
  y las traducciones en un diccionario de JavaScript (`data-i18n`).
- **Modo oscuro y claro**, que respeta la preferencia del sistema y recuerda la elección
  del visitante con `localStorage`.
- **Diseño responsive**: menú hamburguesa en móviles, rejillas con CSS Grid y tipografía
  fluida con `clamp()`.
- **Animaciones** al hacer scroll (`IntersectionObserver`), contadores animados y efecto
  de escritura en la portada.
- **Filtro de proyectos** por tecnología.
- **Botón para copiar el correo** con la API del portapapeles.
- **Accesible**: navegación por teclado, `aria-*` en los botones, foco visible y respeto
  a `prefers-reduced-motion`.

## Estructura

```
portafolio/
├── index.html   # Contenido y estructura
├── style.css    # Estilos, temas y diseño responsive (variables CSS)
└── script.js    # Idioma, tema, menú, animaciones y filtros
```

## Cómo verlo en local

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python -m http.server 5500
```

y entra en http://localhost:5500.

## Lo que aprendí

- Organizar estilos con **variables CSS** para cambiar de tema con un solo atributo.
- Usar `IntersectionObserver` en lugar de escuchar el scroll para animar de forma eficiente.
- Separar contenido y traducciones para mantener un sitio multilingüe sin duplicar páginas.
- Diseñar primero pensando en la accesibilidad y en pantallas pequeñas.
