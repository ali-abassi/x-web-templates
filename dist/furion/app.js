const templateUI = (() => {
  function announce(element, message, isError = false) {
    element.textContent = message;
    element.dataset.error = String(isError);
  }

  function downloadText(text, filename) {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function validateField(field) {
    field.setCustomValidity('');
    if (field.required && !field.value.trim()) {
      field.setCustomValidity('Please enter more than spaces.');
    }
  }

  function bindDraftForm(form) {
    const status = form.querySelector('[role="status"]');
    const fields = [...form.querySelectorAll('[data-export-label]')];
    form.querySelector('fieldset').disabled = false;
    fields.forEach(field => field.addEventListener('input', () => validateField(field)));
    form.addEventListener('submit', event => {
      event.preventDefault();
      fields.forEach(validateField);
      if (!form.reportValidity()) return;
      const sections = fields.map(field => `${field.dataset.exportLabel}:\n${field.value.trim()}`);
      const content = `${form.dataset.title}\n\n${sections.join('\n\n')}\n`;
      downloadText(content, form.dataset.filename);
      announce(status, 'Your draft download is ready. Nothing was sent; your entries are still here.');
    });
  }

  function bindFilters(container) {
    const buttons = [...container.querySelectorAll('[data-filter]')];
    const cards = [...container.querySelectorAll('[data-category]')];
    const status = container.querySelector('[role="status"]');
    container.querySelector('fieldset').disabled = false;
    buttons.forEach(button => button.addEventListener('click', () => {
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      cards.forEach(card => {
        card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
      });
      const count = cards.filter(card => !card.hidden).length;
      announce(status, `${count} projects shown.`);
      container.querySelector('[data-empty]').hidden = count > 0;
    }));
  }

  document.querySelectorAll('[data-year]').forEach(element => {
    element.textContent = String(new Date().getFullYear());
  });

  return Object.freeze({ announce, downloadText, bindDraftForm, bindFilters });
})();

// Editorial chapters and the brand-note download use native HTML controls.
