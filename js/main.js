/* ============================================================
   VANESSA SCHILL — main.js
   ============================================================ */

// ── Mobile nav ───────────────────────────────────────────────
const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.querySelector('.nav__mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      mobileMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      hamburger.focus();
    }
  });
}

// ── Formspree contact form (AJAX) ────────────────────────────
const form = document.getElementById('contact-form');

if (form) {
  const submitBtn = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');
  const errorMsg = document.getElementById('form-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Hide any previous messages
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';

    // Basic client-side validation
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      errorMsg.textContent = 'Please fill in your name, email, and message.';
      errorMsg.style.display = 'block';
      return;
    }

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        submitBtn.textContent = 'Sent!';
      } else {
        const data = await response.json();
        const msg = data.errors
          ? data.errors.map(err => err.message).join(', ')
          : 'Something went wrong. Please try again.';
        errorMsg.textContent = msg;
        errorMsg.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
      }
    } catch {
      errorMsg.textContent = 'Network error. Please check your connection and try again.';
      errorMsg.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    }
  });
}
