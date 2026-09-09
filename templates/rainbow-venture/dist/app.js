templateUI.bindDraftForm(document.querySelector('#application-form'));
document.querySelectorAll('a[href="#apply"]').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('#apply').open = true;
  });
});
