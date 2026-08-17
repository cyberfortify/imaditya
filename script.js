(function() {
  'use strict';

  /* ---- Nav scroll effect ---- */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  /* ---- Mobile menu ---- */
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });


  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = navLinks.querySelectorAll('a[href^="#"]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(a => {
          a.classList.toggle(
            'active',
            a.getAttribute('href') === '#' + id
          );
        });
      }
    });
  }

  window.addEventListener(
    'scroll',
    updateActiveNav,
    { passive: true }
  );


  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  var windowH = window.innerHeight;

  function checkReveal() {
    windowH = window.innerHeight;

    reveals.forEach(function(el) {
      if (el.classList.contains('visible')) return;

      var top = el.getBoundingClientRect().top;

      if (top < windowH - 80) {
        el.classList.add('visible');
      }
    });
  }


  /* Only reveal elements in the first screen on load */
  checkReveal();


  /* Reveal the rest on scroll */
  window.addEventListener(
    'scroll',
    checkReveal,
    { passive: true }
  );

  window.addEventListener(
    'resize',
    checkReveal,
    { passive: true }
  );

})();


/* ---- Contact Form / EmailJS ---- */

emailjs.init({
  publicKey: "oUEOArPMaQgXHsIF6"
});

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Prevent multiple submissions
    if (submitBtn.disabled) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    formStatus.textContent = "";
    formStatus.className = "form-status";

    const templateParams = {
      from_name: document.getElementById("name").value.trim(),
      from_email: document.getElementById("email").value.trim(),
      message: document.getElementById("message").value.trim()
    };

    try {
      await emailjs.send(
        "service_05a1eth",
        "template_lqxuf4r",
        templateParams
      );

      formStatus.textContent =
        "Message sent successfully. I'll get back to you soon.";

      formStatus.classList.add("success");

      contactForm.reset();

    } catch (error) {
      console.error("EmailJS Error:", error);

      formStatus.textContent =
        "Unable to send your message. Please try again.";

      formStatus.classList.add("error");

    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
}