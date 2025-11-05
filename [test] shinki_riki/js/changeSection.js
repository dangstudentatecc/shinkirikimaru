// --- Hiển thị duy nhất section được chọn ---
const sections = document.querySelectorAll("main section");

// Ẩn tất cả section trừ cái đầu tiên khi mới vào trang
sections.forEach((sec, idx) => {
  if (idx !== 0) sec.style.display = "none";
});

document.querySelectorAll(".navbar a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    // Ẩn tất cả section
    sections.forEach(sec => sec.style.display = "none");

    // Hiện section được chọn
    if (target) {
      target.style.display = "block";
      window.scrollTo({
        top: target.offsetTop - 120,
        behavior: "smooth"
      });
    }
  });
});
