// ===== Splash → Site reveal =====
const splash = document.getElementById('splash');
const site = document.getElementById('site');
const discoverBtn = document.getElementById('discoverBtn');

function revealSite() {
  site.classList.add('revealed');
  document.body.classList.add('site-active');
  site.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

discoverBtn.addEventListener('click', revealSite);

// If user scrolls past the splash manually, reveal too
window.addEventListener('wheel', (e) => {
  if (!site.classList.contains('revealed') && e.deltaY > 0) {
    revealSite();
  }
}, { passive: true });

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const headerNav = document.querySelector('.header-nav');

navToggle.addEventListener('click', () => {
  headerNav.classList.toggle('open');
});

headerNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => headerNav.classList.remove('open'));
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Reservation form =====
const form = document.getElementById('reservationForm');
const submitBtn = document.getElementById('submitBtn');
const statusEl = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = '';
  statusEl.className = 'form-status';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Envoi en cours…';

  const data = Object.fromEntries(new FormData(form).entries());

  try {
    const res = await fetch('/api/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Request failed');

    statusEl.textContent = 'Merci ! Votre demande de réservation a bien été envoyée. Nous vous recontactons rapidement.';
    statusEl.classList.add('success');
    form.reset();
  } catch (err) {
    statusEl.textContent = 'Une erreur est survenue. Merci de réessayer ou de nous contacter directement par mail.';
    statusEl.classList.add('error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Envoyer ma demande';
  }
});
