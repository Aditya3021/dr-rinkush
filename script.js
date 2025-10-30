// Mobile Menu
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const menuIcon = document.getElementById('menuIcon');
  let isMenuOpen = false;

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function () {
      isMenuOpen = !isMenuOpen;

      if (isMenuOpen) {
        navLinks.classList.add('mobile', 'active');
        menuIcon.textContent = '✕';
        document.body.style.overflow = 'hidden';
      } else {
        navLinks.classList.remove('mobile', 'active');
        menuIcon.textContent = '☰';
        document.body.style.overflow = '';
      }
    });

    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('mobile', 'active');
        menuIcon.textContent = '☰';
        document.body.style.overflow = '';
        isMenuOpen = false;
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        navLinks.classList.remove('mobile', 'active');
        menuIcon.textContent = '☰';
        document.body.style.overflow = '';
        isMenuOpen = false;
      }
    });
  }
}

// Smooth Scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = 120;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Form Handling
function initFormHandling() {
  const form = document.querySelector('.appointment-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const requiredFields = this.querySelectorAll('input[required], select[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#dc2626';
      } else {
        field.style.borderColor = 'rgba(15, 45, 82, 0.1)';
      }
    });

    if (isValid) {
      const name = this.querySelector('#patientName').value.trim();
      const email = this.querySelector('#email').value.trim();
      const phone = this.querySelector('#phone').value.trim();
      const painTypeSel = this.querySelector('#painType');
      const painType = painTypeSel.options[painTypeSel.selectedIndex].text;
      const message = this.querySelector('#message').value.trim();

      const lines = [
        'New Consultation Request',
        '—',
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Primary Pain Condition: ${painType}`,
        message ? `Details: ${message}` : undefined
      ].filter(Boolean);

      const text = encodeURIComponent(lines.join('\n'));

      // Target WhatsApp number (clinic). Use full international format without + for wa.me
      const waNumber = '9198348 89938';
      const waUrl = `https://wa.me/${waNumber}?text=${text}`;

      window.location.href = waUrl;
    } else {
      alert('Please fill in all required fields.');
    }
  });
}

// Header Effects
function initHeaderEffects() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
      header.style.background = 'rgba(15, 45, 82, 0.97)';
      header.style.backdropFilter = 'blur(20px)';
    } else {
      header.style.background = 'linear-gradient(135deg, var(--primary-navy), var(--secondary-navy))';
      header.style.backdropFilter = 'none';
    }
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
  initMobileMenu();
  initSmoothScrolling();
  initFormHandling();
  initHeaderEffects();
});
