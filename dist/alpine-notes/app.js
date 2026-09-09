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

  document.querySelectorAll('[data-year]').forEach(element => {
    element.textContent = String(new Date().getFullYear());
  });

  return Object.freeze({ announce, downloadText, bindDraftForm });
})();

const note = document.querySelector('#note');
const noteStatus = document.querySelector('#note-status');
const saveButton = document.querySelector('#save-note');
const exportButton = document.querySelector('#export-note');
// Preserve notes saved by the original template.
const storageKey = 'scribblit-note';
let savedValue = note.value;

function updateCount() {
  document.querySelector('#note-count').textContent = `${note.value.length.toLocaleString()} / 50,000 characters`;
}

function loadNote() {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored !== null) note.value = stored;
    savedValue = note.value;
    templateUI.announce(noteStatus, 'Ready. Save your changes on this device when you’re finished.');
  } catch {
    templateUI.announce(noteStatus, 'Browser storage is unavailable. You can still write and download your note.', true);
  }
  updateCount();
}

function saveNote() {
  try {
    localStorage.setItem(storageKey, note.value);
    savedValue = note.value;
    templateUI.announce(noteStatus, 'Saved on this device. Your note will be here when you return.');
  } catch {
    templateUI.announce(noteStatus, 'Could not save in this browser. Download your note to keep a copy.', true);
  }
}

note.readOnly = false;
saveButton.disabled = false;
exportButton.disabled = false;
loadNote();
note.addEventListener('input', () => {
  updateCount();
  templateUI.announce(noteStatus, 'Unsaved changes. Save on this device or download a copy.');
});
saveButton.addEventListener('click', saveNote);
exportButton.addEventListener('click', () => {
  templateUI.downloadText(note.value, 'alpine-note.txt');
  templateUI.announce(noteStatus, 'Your text download is ready. Use Save to keep changes in this browser too.');
});
note.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
    event.preventDefault();
    saveNote();
  }
});
window.addEventListener('beforeunload', event => {
  if (note.value === savedValue) return;
  event.preventDefault();
  event.returnValue = '';
});
window.addEventListener('storage', event => {
  if (event.key !== storageKey) return;
  templateUI.announce(noteStatus, 'This note changed in another tab. Download this version before reloading to see the other one.', true);
});
const toneButtons = [...document.querySelectorAll('[data-tone]')].filter(element => element.tagName === 'BUTTON');
document.querySelector('.style-bar').disabled = false;
toneButtons.forEach(button => button.addEventListener('click', () => {
  toneButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('.notebook').dataset.tone = button.dataset.tone;
  templateUI.announce(noteStatus, `Paper color changed to ${button.dataset.tone}. Your note is unchanged.`);
}));
