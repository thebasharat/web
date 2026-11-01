document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor');
  const fontSizeSelect = document.getElementById('fontSizeSelect');
  const fontColorSelect = document.getElementById('fontColorSelect');
  const boldBtn = document.getElementById('boldBtn');
  const italicBtn = document.getElementById('italicBtn');
  const resetBtn = document.getElementById('resetBtn');

  const DEFAULTS = {
    fontSize: '12px',
    color: 'black',
    fontWeight: 'normal',
    fontStyle: 'normal'
  };

  function applyDefaults() {
    editor.style.fontSize = DEFAULTS.fontSize;
    editor.style.color = DEFAULTS.color;
    editor.style.fontWeight = DEFAULTS.fontWeight;
    editor.style.fontStyle = DEFAULTS.fontStyle;
    fontSizeSelect.value = DEFAULTS.fontSize;
    fontColorSelect.value = DEFAULTS.color;
    boldBtn.classList.remove('active');
    italicBtn.classList.remove('active');
  }

  // Set the editor's initial state explicitly on load.
  applyDefaults();

  fontSizeSelect.addEventListener('change', () => {
    editor.style.fontSize = fontSizeSelect.value;
  });

  fontColorSelect.addEventListener('change', () => {
    editor.style.color = fontColorSelect.value;
  });

  boldBtn.addEventListener('click', () => {
    boldBtn.classList.toggle('active');
    editor.style.fontWeight = boldBtn.classList.contains('active') ? 'bold' : 'normal';
  });

  italicBtn.addEventListener('click', () => {
    italicBtn.classList.toggle('active');
    editor.style.fontStyle = italicBtn.classList.contains('active') ? 'italic' : 'normal';
  });

  resetBtn.addEventListener('click', () => {
    applyDefaults();
  });
});