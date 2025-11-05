const selector = document.getElementById("headerLangSelector");
const menu = document.getElementById("headerLangMenu");
const currentLang = document.getElementById("headerCurrentLang");
const options = document.querySelectorAll(".lang-option");

// --- Mở / đóng menu ngôn ngữ ---
currentLang.addEventListener("click", () => {
  menu.classList.toggle("lang-hidden");
});

// --- Đổi ngôn ngữ (chỉ đổi flag hiển thị) ---
options.forEach(option => {
  option.addEventListener("click", () => {
    const flagSrc = option.getAttribute("data-flag");
    currentLang.querySelector("img").src = flagSrc;
    menu.classList.add("lang-hidden");
  });
});

// --- Click ngoài menu để đóng ---
document.addEventListener("click", (e) => {
  if (!selector.contains(e.target)) {
    menu.classList.add("lang-hidden");
  }
});

// --- Scroll xuống phần 写真 ---
document.querySelectorAll('.navbar a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 120, // trừ chiều cao header nếu cố định
        behavior: "smooth"
      });
    }
  });
});
