/* ============================================================
   RSVP.JS — Envío a Google Sheets via Apps Script
   ============================================================ */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxCqNOI3lCZARRF1IRlyx42oFQG1hT_qEKnD1D_huGQHZfRH47oT2Ldn4DeiDikDJX8lQ/exec';

const btnRsvp       = document.getElementById('btnRsvp');
const rsvpSuccess   = document.getElementById('rsvpSuccess');
 
btnRsvp.addEventListener('click', async () => {
 
  const nombre        = document.getElementById('nombre').value.trim();
  const asistencia    = document.getElementById('asistencia').value;
  const acompanante   = document.getElementById('acompanante').value;
  const restricciones = document.getElementById('restricciones').value.trim();
 
  /* --- Validación básica --- */
  if (!nombre) {
    alert('Por favor ingresa tu nombre y apellido.');
    return;
  }
 
  /* --- Estado de carga --- */
  btnRsvp.textContent = 'Enviando...';
  btnRsvp.disabled    = true;
 
  /* PONER: */
try {
    console.log('Enviando datos...', { nombre, asistencia, acompanante, restricciones });
    const res = await fetch(APPS_SCRIPT_URL, {
      method : 'POST',
      mode   : 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ nombre, asistencia, acompanante, restricciones })
    });
    console.log('Respuesta:', res);
 
    /* --- Éxito: ocultar form y mostrar mensaje --- */
    document.querySelector('.rsvp-form').style.display = 'none';
    rsvpSuccess.classList.add('show');
 
  } catch (error) {
    /* --- Error de red --- */
    alert('Hubo un error al enviar. Por favor intenta nuevamente.');
    btnRsvp.textContent = 'Enviar confirmación';
    btnRsvp.disabled    = false;
  }
 
});