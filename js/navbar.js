/* ============================================================
   NAVBAR.JS — Efecto scroll y menú móvil
   ============================================================ */

const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

/* --- Cambiar estilo del navbar al hacer scroll --- */
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* --- Menú hamburguesa (móvil) --- */
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* Cerrar menú al hacer click en un link */
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});