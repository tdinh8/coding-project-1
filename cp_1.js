const $ = (sel, root = document) => root.querySelector(sel);
const form            = $('#feedback-form');
const feedbackDisplay = $('#feedback-display');
const tooltipBox      = $('#tooltip');
let   activeField     = null;               
form.addEventListener('input', e => {
  if (e.target.id === 'comments') {
    $('#char-count').textContent = `${e.target.value.length} / 500`;
  }
});
form.addEventListener('mouseover', e => {
  const field = e.target.closest('input, textarea');
  if (!field) return;
  activeField = field;
  const text  = field.dataset.tooltip;
  if (text) {
    tooltipBox.textContent = text;
    tooltipBox.hidden      = false;
    const rect = field.getBoundingClientRect();
    tooltipBox.style.top  = `${rect.top + window.scrollY}px`;
    tooltipBox.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`;
  }
});
form.addEventListener('mouseout', e => {
  if (e.target === activeField) {
    tooltipBox.hidden = true;
    activeField       = null;
  }
});
form.addEventListener('submit', e => {
  e.preventDefault();

  const name     = $('#name');
  const email    = $('#email');
  const comments = $('#comments');

  let isValid = true;

  [name, email, comments].forEach(field => {
    const errorSpan = $(`#${field.id}-error`);
    if (field.value.trim() === '') {
      isValid = false;
      errorSpan.textContent = 'Required';
      field.classList.add('invalid');
    } else {
      errorSpan.textContent = '';
      field.classList.remove('invalid');
    }
  });
  if (!isValid) return;
  const entry = document.createElement('div');
  entry.className = 'entry';
  entry.innerHTML = `
    <h3>${name.value.trim()}</h3>
    <p><strong>Email:</strong> ${email.value.trim()}</p>
    <p>${comments.value.trim()}</p>
  `;
  feedbackDisplay.prepend(entry);
  form.reset();
  $('#char-count').textContent = '0 / 500';
});
document.body.addEventListener('click', () => {
  console.log('Background clicked');
});
form.addEventListener('click', e => {
  e.stopPropagation();
});
