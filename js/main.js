document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.nav-mobile');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const form = document.querySelector('#contact-form');
  if (!form || typeof window.formspree !== 'function') return;

  const fields = form.querySelector('.contact-form-fields');
  const submitBtn = form.querySelector('.contact-form-submit');
  const btnLabel = submitBtn?.querySelector('.btn-label');
  const btnLoading = submitBtn?.querySelector('.btn-loading');
  const errorMessage = form.querySelector('.form-status-message');
  const formId = window.KANDAVEL_CONFIG?.formspreeFormId;

  if (!formId) return;

  const inquirySubject = () => {
    const name = form.querySelector('[name="name"]')?.value.trim() || '';
    const company = form.querySelector('[name="company"]')?.value.trim() || '';
    return `Inquiry from ${name}${company ? ` — ${company}` : ''}`;
  };

  window.formspree('initForm', {
    formElement: '#contact-form',
    formId,

    data: {
      _subject: inquirySubject,
      _replyto: () => form.querySelector('[name="email"]')?.value.trim() || '',
    },

    disable: () => {
      if (!submitBtn) return;
      submitBtn.disabled = true;
      if (btnLabel) btnLabel.hidden = true;
      if (btnLoading) btnLoading.hidden = false;
    },

    enable: () => {
      if (!submitBtn) return;
      submitBtn.disabled = false;
      if (btnLabel) btnLabel.hidden = false;
      if (btnLoading) btnLoading.hidden = true;
    },

    onSuccess: () => {
      if (fields) fields.hidden = true;
    },

    renderFormError: (_context, message) => {
      if (errorMessage) {
        errorMessage.textContent = message || 'Please try again or email us directly at suresh.d@kandavel.lifestyle.';
      }
    },
  });
});
