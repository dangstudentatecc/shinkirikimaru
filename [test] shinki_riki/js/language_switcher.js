// js/language_switcher.js
let translations = {};
let currentLang = localStorage.getItem('lang') || 'JP';

// Tải dữ liệu JSON chứa bản dịch
async function loadTranslations() {
  try {
    const res = await fetch('./lang/langData.json');
    translations = await res.json();

    // Gắn key gốc (JP) cho các phần tử cần dịch nếu chưa có
    const targets = document.querySelectorAll(
      '.menuName, .drinkName, .note, .attention-box, .attentionTitle, .agree-area label, .pressable-btn .text, .btn-wrapper .menu-btn, .main-btn'
    );

    targets.forEach(el => {
      if (!el.dataset.i18nKey) {
        el.dataset.i18nKey = el.innerText.trim();
      }
    });

    applyTranslations(currentLang);
  } catch (err) {
    console.error('読み込みできません', err);
  }
}

// Hàm áp dụng dịch
function applyTranslations(lang) {
  const targets = document.querySelectorAll(
    '.menuName, .drinkName, .note, .attention-box, .attentionTitle, .agree-area label, .pressable-btn .text, .btn-wrapper .menu-btn, .main-btn'
  );

  targets.forEach(el => {
    const key = el.dataset.i18nKey;
    if (translations[key] && translations[key][lang]) {
      el.innerText = translations[key][lang]; // ✅ dùng innerText thay vì textContent
    } else if (lang === 'JP') {
      el.innerText = key;
    }
  });

  localStorage.setItem('lang', lang);
  currentLang = lang;
  console.log(`Language changed to: ${lang}`);
}

// Cho phép file khác gọi đổi ngôn ngữ
export function changeLanguage(lang) {
  applyTranslations(lang);
}

// Tự động khởi tạo khi trang load
loadTranslations();
