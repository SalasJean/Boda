/* ============================================================
   REVEAL.JS — Animación de aparición al hacer scroll
   Usa el atributo data-reveal en cualquier elemento HTML
   para que aparezca suavemente cuando entre en pantalla.
   ============================================================ */

const revealElements = document.querySelectorAll('[data-reveal]');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        /* Pequeño delay escalonado por índice para efecto cascada */
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 120);
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  }
);

revealElements.forEach(el => observer.observe(el));