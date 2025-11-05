const boxes = document.querySelectorAll('#attentionSection .attention-box'); 
const pressableBtn = document.getElementById('attentionStartBtn'); 
const agreeAllCheckbox = document.getElementById('attentionCheckbox');

// Khi click từng box
boxes.forEach(box => {
  box.addEventListener('click', () => {
    box.classList.toggle('checked');
    updateState();
  });
});

// Khi click vào checkbox "すべて同意します"
agreeAllCheckbox.addEventListener('change', () => {
  const checkAll = agreeAllCheckbox.checked;
  boxes.forEach(box => {
    if (checkAll) {
      box.classList.add('checked');
    } else {
      box.classList.remove('checked');
    }
  });
  updateState();
});

// Cập nhật trạng thái nút và checkbox tổng
function updateState() {
  const allChecked = Array.from(boxes).every(b => b.classList.contains('checked'));

  // Cập nhật trạng thái checkbox tổng
  agreeAllCheckbox.checked = allChecked;

  // Cập nhật trạng thái nút
  if (allChecked) {
    pressableBtn.classList.add('active');
    pressableBtn.disabled = false;
  } else {
    pressableBtn.classList.remove('active');
    pressableBtn.disabled = true;
  }
}
