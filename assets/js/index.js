  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


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


  const form = document.getElementById('contactForm');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      formData.append("access_key", "928bd8c9-f881-4aed-b1a1-5d4c2c232f2e");
      // formData.append("access_key", "0a6e2866-bd45-41a6-aa2a-8679d1c6fb2f");

      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Enviando mensaje...";
      submitBtn.style.background = 'var(--accent2)';
      submitBtn.disabled = true;


      try {
          const response = await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              body: formData
          });

          const data = await response.json();

          if (response.ok) {
              form.reset();
              mostrarToast("✓ Mensaje enviado con éxito. ¡Gracias por contactarnos!", "success-color");
          } else {
              alert("Error: " + data.message);
          }

      } catch (error) {
          mostrarToast("Algo salió mal. Por favor, inténtalo de nuevo.", "fail-color");
      } finally {
          submitBtn.textContent = originalText;
          submitBtn.style.background = 'var(--accent)';
          submitBtn.disabled = false;
      }
  });

  function mostrarToast(texto, clase) {
    const contenedor = document.getElementById('contenedor-toast');
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = texto;
    toast.classList.add(clase);
    contenedor.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('ocultar');
        setTimeout(() => {
            toast.remove();
        }, 1000); // Tiempo de la animación de salida
    }, 2300); // Tiempo que el toast permanece visible
}
