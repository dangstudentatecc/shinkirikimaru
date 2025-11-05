let selectedCourse = null;
let selectedTime = null;
let selectedDrink = null;

// Chọn course
document.querySelectorAll('.course').forEach(course => {
  course.addEventListener('click', () => {
    document.querySelectorAll('.course').forEach(c => c.classList.remove('active'));
    course.classList.add('active');
    selectedCourse = course.dataset.course;
    highlightPrice();
  });
});

// Chọn thời gian (90 hoặc 120)
document.querySelectorAll('#priceTable th[data-time]').forEach(header => {
  header.addEventListener('click', () => {
    document.querySelectorAll('#priceTable th[data-time]').forEach(h => h.classList.remove('active'));
    header.classList.add('active');
    selectedTime = header.dataset.time;
    highlightPrice();
    highlightDrinkTime();
  });
});

// Chọn loại đồ uống
document.querySelectorAll('#drinkTable tr[data-drink]').forEach(row => {
  row.addEventListener('click', () => {
    document.querySelectorAll('#drinkTable tr[data-drink]').forEach(r => r.classList.remove('active'));
    row.classList.add('active');
    selectedDrink = row.dataset.drink;
    highlightDrinkTime();
  });
});

function highlightPrice() {
  // Xóa highlight cũ
  document.querySelectorAll('#priceTable td').forEach(td => td.classList.remove('active'));
  if (selectedCourse && selectedTime) {
    const rows = document.querySelectorAll('#priceTable tbody tr');
    rows.forEach(row => {
      const courseName = row.children[0].textContent.trim();
      if (courseName === selectedCourse) {
        const index = selectedTime === "90" ? 1 : 2;
        row.children[index].classList.add('active');
      }
    });
  }
}

function highlightDrinkTime() {
  // Xóa highlight cũ trong bảng đồ uống
  document.querySelectorAll('#drinkTable td').forEach(td => td.classList.remove('active'));
  if (selectedTime && selectedDrink) {
    const rows = document.querySelectorAll('#drinkTable tbody tr');
    rows.forEach(row => {
      if (row.dataset.drink === selectedDrink) {
        const index = selectedTime === "90" ? 1 : 2;
        row.children[index].classList.add('active');
      }
    });
  }
}
