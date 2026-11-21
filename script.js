/* =========================================================
   Rony Hércules · Portfolio — interactivity
   1. Translations (EN / ES)      5. Active link on scroll
   2. Language switch             6. Scroll reveal + counters
   3. Dark / light theme          7. Project filters
   4. Mobile menu                 8. Copy email + footer year
   ========================================================= */

// ---------- 1. Translations ----------
// English text is written in the HTML; Spanish lives here.
// Every element with data-i18n="key" gets its text swapped.
const translations = {
  es: {
    "nav.about": "Sobre mí",
    "nav.projects": "Proyectos",
    "nav.skills": "Habilidades",
    "nav.experience": "Experiencia",
    "nav.contact": "Contacto",
    "hero.hello": "Hola, mi nombre es",
    "hero.iam": "Soy",
    "hero.text": "Estudiante de Desarrollo de Aplicaciones en la Universidad de San Pedro Sula, creando proyectos en Python y aprendiendo desarrollo web. Bilingüe (inglés/español), con experiencia profesional atendiendo a clientes de EE. UU.",
    "hero.cta1": "Ver mis proyectos",
    "hero.cta2": "Contáctame",
    "about.title": "Sobre mí",
    "about.p1": "Soy estudiante de primer año de Desarrollo de Aplicaciones en San Pedro Sula, Honduras. Me gusta convertir problemas cotidianos en programas pequeños y confiables, y me importa escribir código claro, probado y fácil de mantener.",
    "about.p2": "Antes de programar, aprendí a resolver problemas por teléfono: he atendido a clientes de EE. UU. en cuentas de seguros médicos y financiamiento de autos. Eso me enseñó a escuchar, a diagnosticar paso a paso y a explicar cosas técnicas con palabras sencillas.",
    "about.p3": "Busco prácticas remotas o un puesto de entrada en desarrollo de software, QA testing o soporte técnico.",
    "about.f1": "pruebas automáticas escritas",
    "about.f2": "idiomas, inglés / español",
    "about.f3": "contactos con clientes al día",
    "projects.title": "Proyectos",
    "projects.all": "Todos",
    "p1.title": "Gestor de tareas (CLI)",
    "p1.text": "Aplicación de línea de comandos para crear, listar, completar y eliminar tareas con almacenamiento persistente en JSON. Guarda de forma atómica y respalda archivos dañados para no perder datos nunca.",
    "p1.h1": "24 pruebas automáticas con pytest",
    "p1.h2": "Validación de entradas y manejo de errores",
    "p2.title": "Portafolio personal",
    "p2.text": "Este sitio web. Diseño responsive hecho desde cero, con modo oscuro, cambio de idioma inglés/español, filtros de proyectos y animaciones al hacer scroll, sin ningún framework.",
    "p2.h1": "Contenido bilingüe con un clic",
    "p2.h2": "Recuerda tu tema e idioma",    "p3.title": "Próximamente",
    "p3.text": "Estoy trabajando en mi siguiente proyecto. Visita mi GitHub para seguir mi progreso.",
    "skills.title": "Habilidades",
    "skills.g1": "Lenguajes y web",
    "skills.g2": "Pruebas y herramientas",
    "skills.g3": "Profesionales",
    "skills.s1": "Resolución de problemas",
    "skills.s2": "Comunicación clara",
    "skills.s3": "Documentación",
    "skills.s4": "Privacidad de datos (HIPAA)",
    "skills.s5": "Orientación al cliente",
    "exp.title": "Experiencia y educación",
    "exp.d1": "Ago 2026 – Actualidad",
    "exp.r1": "· Agente de Servicio al Cliente",
    "exp.t1": "Cuenta de Hyundai Motor Finance. Resuelvo consultas de cuentas, pagos y contratos de clientes de EE. UU., atendiendo hasta 60 contactos al día y documentando cada caso en sistemas CRM.",
    "exp.d2": "2026 – 2031 (previsto)",
    "exp.r2": "· Desarrollo de Aplicaciones",
    "exp.t2": "Licenciatura en curso, enfocada en programación y desarrollo de software.",
    "exp.d3": "Oct 2025 – Abr 2026",
    "exp.r3": "· Agente Bilingüe de Servicio al Cliente",
    "exp.t3": "UnitedHealthcare Individual Plans. Atendí de 30 a 45 llamadas al día sobre facturación, coberturas y reclamaciones, gestionando datos de afiliados conforme a HIPAA.",
    "exp.r4": "· Bachillerato",
    "contact.title": "Hablemos",
    "contact.text": "Estoy disponible para prácticas remotas y oportunidades de nivel inicial. Si crees que puedo encajar en tu equipo, me encantará saber de ti.",
    "contact.copy": "Copiar correo",
    "footer.made": "Hecho con HTML, CSS y JavaScript",
  },
};

const typedWords = {
  en: ["a Python developer.", "an Application Development student.", "a QA & testing enthusiast.", "a bilingual problem solver."],
  es: ["desarrollador Python.", "estudiante de Desarrollo de Aplicaciones.", "entusiasta de QA y pruebas.", "solucionador de problemas bilingüe."],
};

const ui = {
  en: { copied: "Email copied to the clipboard ✓", copyFail: "Could not copy, please select it manually.", toEs: "Cambiar a español", menuOpen: "Open menu", menuClose: "Close menu" },
  es: { copied: "Correo copiado al portapapeles ✓", copyFail: "No se pudo copiar, selecciónalo manualmente.", toEn: "Switch to English", menuOpen: "Abrir menú", menuClose: "Cerrar menú" },
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// Small wrapper: localStorage can throw in private mode or sandboxed editors
const store = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* ignore */ } },
};

// ---------- 2. Language switch ----------
const i18nElements = $$("[data-i18n]");
// Remember the original English text so we can switch back
i18nElements.forEach((el) => { el.dataset.en = el.textContent.trim().replace(/\s+/g, " "); });

let lang = store.get("lang") || (navigator.language.startsWith("es") ? "es" : "en");

function applyLanguage(newLang) {
  lang = newLang;
  document.documentElement.lang = lang;
  i18nElements.forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = lang === "es" ? translations.es[key] ?? el.dataset.en : el.dataset.en;
  });
  const btn = $("#lang-toggle");
  btn.textContent = lang === "es" ? "EN" : "ES";
  btn.setAttribute("aria-label", lang === "es" ? ui.es.toEn : ui.en.toEs);
  store.set("lang", lang);
  restartTyping();
}

$("#lang-toggle").addEventListener("click", () => applyLanguage(lang === "es" ? "en" : "es"));

// ---------- Typing effect in the hero ----------
let typingTimer;
function restartTyping() {
  clearTimeout(typingTimer);
  const target = $("#typed");
  const words = typedWords[lang];
  let word = 0;
  let chars = 0;
  let deleting = false;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    target.textContent = words[0];
    return;
  }

  (function tick() {
    const current = words[word];
    chars += deleting ? -1 : 1;
    target.textContent = current.slice(0, chars);

    let delay = deleting ? 40 : 85;
    if (!deleting && chars === current.length) { deleting = true; delay = 1800; }
    else if (deleting && chars === 0) { deleting = false; word = (word + 1) % words.length; delay = 350; }
    typingTimer = setTimeout(tick, delay);
  })();
}

// ---------- 3. Dark / light theme ----------
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
let theme = store.get("theme") || (prefersDark ? "dark" : "light");

function applyTheme(newTheme) {
  theme = newTheme;
  document.documentElement.dataset.theme = theme;
  $(".theme-icon").textContent = theme === "dark" ? "☀" : "☾";
  store.set("theme", theme);
}

$("#theme-toggle").addEventListener("click", () => applyTheme(theme === "dark" ? "light" : "dark"));

// ---------- 4. Mobile menu ----------
const burger = $("#nav-burger");
const menu = $("#nav-menu");

function setMenu(open) {
  menu.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? ui[lang].menuClose : ui[lang].menuOpen);
}

burger.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
$$(".nav__link").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// ---------- 5. Nav border + active link on scroll ----------
const nav = $("#nav");
window.addEventListener("scroll", () => nav.classList.toggle("is-scrolled", window.scrollY > 10), { passive: true });

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    $$(".nav__link").forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id]").forEach((section) => sectionObserver.observe(section));

// ---------- 6. Reveal on scroll + animated counters ----------
function animateCounter(el) {
  const end = Number(el.dataset.count);
  const duration = 1200;
  const start = performance.now();
  (function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(end * (1 - Math.pow(1 - progress, 3))); // ease-out
    if (progress < 1) requestAnimationFrame(frame);
  })(start);
}

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    $$("[data-count]", entry.target).forEach(animateCounter);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

$$(".section__title, .about, .card, .skills__group, .timeline__item, .contact__inner").forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

// ---------- 7. Project filters ----------
$$(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".filter").forEach((b) => b.classList.toggle("is-active", b === button));
    const filter = button.dataset.filter;
    $$(".card").forEach((card) => {
      const tags = card.dataset.tags.split(" ");
      card.classList.toggle("is-hidden", filter !== "all" && !tags.includes(filter));
    });
  });
});

// ---------- 8. Copy email + footer year ----------
const toast = $("#toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.textContent = ""; }, 2500);
}

$("#copy-email").addEventListener("click", async (e) => {
  try {
    await navigator.clipboard.writeText(e.currentTarget.dataset.email);
    showToast(ui[lang].copied);
  } catch {
    showToast(ui[lang].copyFail);
  }
});

$("#year").textContent = new Date().getFullYear();

// ---------- Start ----------
applyTheme(theme);
applyLanguage(lang);
