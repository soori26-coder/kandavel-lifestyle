document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const fields = form.querySelector('.contact-form-fields');
  const submitBtn = form.querySelector('.contact-form-submit');
  const btnLabel = submitBtn?.querySelector('.btn-label');
  const btnLoading = submitBtn?.querySelector('.btn-loading');
  const successStatus = form.querySelector('.form-status--success');
  const errorStatus = form.querySelector('.form-status--error');
  const errorMessage = form.querySelector('.form-status-message');
  const endpoint = form.getAttribute('action');

  const setLoading = (loading) => {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    submitBtn.setAttribute('aria-busy', loading ? 'true' : 'false');
    if (btnLabel) btnLabel.hidden = loading;
    if (btnLoading) btnLoading.hidden = !loading;
  };

  const showStatus = (type, message) => {
    const banner = type === 'success' ? successStatus : errorStatus;
    if (successStatus) successStatus.hidden = type !== 'success';
    if (errorStatus) errorStatus.hidden = type !== 'error';
    if (fields) fields.hidden = type === 'success';
    if (type === 'error' && errorMessage && message) {
      errorMessage.textContent = message;
    }
    if (banner) {
      banner.hidden = false;
      banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!endpoint) {
      showStatus('error', 'The contact form is not configured yet. Please email us at suresh.d@kandavel.lifestyle.');
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    if (data.get('_gotcha')) return;

    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const company = String(data.get('company') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = `Inquiry from ${name}${company ? ` — ${company}` : ''}`;

    setLoading(true);
    if (successStatus) successStatus.hidden = true;
    if (errorStatus) errorStatus.hidden = true;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          _subject: subject,
          _replyto: email,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        form.reset();
        showStatus('success');
      } else {
        const detail = result.errors?.map((err) => err.message).filter(Boolean).join(' ');
        showStatus('error', detail || 'Please try again or email us directly at suresh.d@kandavel.lifestyle.');
      }
    } catch {
      form.removeEventListener('submit', handleSubmit);
      form.submit();
      return;
    } finally {
      setLoading(false);
    }
  }

  form.addEventListener('submit', handleSubmit);
});
