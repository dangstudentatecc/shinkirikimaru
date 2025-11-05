import { changeLanguage } from './language_switcher.js';

document.querySelectorAll('.lang-option').forEach(btn => {
  btn.addEventListener('click', () => {
    const selectedLang = btn.dataset.lang;
    changeLanguage(selectedLang);
  });
});