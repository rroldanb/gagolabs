  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Form submit mock
  function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target;
    btn.textContent = '✓ Mensaje enviado';
    btn.style.background = 'var(--accent2)';
    setTimeout(() => {
      btn.textContent = 'Enviar consulta →';
      btn.style.background = 'var(--accent)';
    }, 3000);
  }

  // Nav smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });