/* ============================================================
   HERO.JS — Countdown timer + Reproductor de audio
   ============================================================ */

/* -------------------------------------------------------
   COUNTDOWN TIMER
   Cambia la fecha objetivo por la real de la boda
------------------------------------------------------- */
const FECHA_BODA = new Date('2026-04-10T17:00:00'); // ← cambia aquí

function actualizarCountdown() {
  const ahora = new Date();
  const diff  = FECHA_BODA - ahora;

  if (diff <= 0) {
    // Ya pasó la boda
    document.getElementById('cd-dias').textContent  = '00';
    document.getElementById('cd-horas').textContent = '00';
    document.getElementById('cd-min').textContent   = '00';
    document.getElementById('cd-seg').textContent   = '00';
    return;
  }

  const dias  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const min   = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seg   = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-dias').textContent  = String(dias).padStart(2, '0');
  document.getElementById('cd-horas').textContent = String(horas).padStart(2, '0');
  document.getElementById('cd-min').textContent   = String(min).padStart(2, '0');
  document.getElementById('cd-seg').textContent   = String(seg).padStart(2, '0');
}

// Actualizar cada segundo
actualizarCountdown();
setInterval(actualizarCountdown, 1000);


/* -------------------------------------------------------
   REPRODUCTOR DE AUDIO FLOTANTE
------------------------------------------------------- */
const btnPlayHero    = document.getElementById('btnPlayHero');
const audioPlayer    = document.getElementById('audioPlayer');
const audioEl        = document.getElementById('audioEl');
const audioPlayPause = document.getElementById('audioPlayPause');
const audioClose     = document.getElementById('audioClose');
const iconPlay       = document.getElementById('iconPlay');
const iconPause      = document.getElementById('iconPause');
const audioFill      = document.getElementById('audioFill');

let reproduciendo = false;

/* Mostrar reproductor al hacer click en el botón hero */
btnPlayHero.addEventListener('click', () => {
  audioPlayer.classList.remove('hidden');
  togglePlay();
});

/* Play / Pause desde el reproductor */
audioPlayPause.addEventListener('click', togglePlay);

function togglePlay() {
  if (reproduciendo) {
    audioEl.pause();
    iconPlay.style.display  = 'block';
    iconPause.style.display = 'none';
    reproduciendo = false;
  } else {
    /* audioEl.play() puede fallar si no hay archivo de audio real aún */
    audioEl.play().catch(() => {
      console.warn('No se encontró el archivo de audio. Coloca tu canción en audio/cancion.mp3');
    });
    iconPlay.style.display  = 'none';
    iconPause.style.display = 'block';
    reproduciendo = true;
  }
}

/* Cerrar reproductor */
audioClose.addEventListener('click', () => {
  audioEl.pause();
  reproduciendo = false;
  iconPlay.style.display  = 'block';
  iconPause.style.display = 'none';
  audioPlayer.classList.add('hidden');
});

/* Barra de progreso */
audioEl.addEventListener('timeupdate', () => {
  if (audioEl.duration) {
    const pct = (audioEl.currentTime / audioEl.duration) * 100;
    audioFill.style.width = pct + '%';
  }
});