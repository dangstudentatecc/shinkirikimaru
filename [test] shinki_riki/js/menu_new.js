document.addEventListener("DOMContentLoaded", () => {
    const menuCards = document.querySelectorAll("#menuSection .menuCard");
    const btnWagyu = document.getElementById("btnWagyu");
    const btnPremium = document.getElementById("btnPremium");
    const btnStandard = document.getElementById("btnStandard");
    const buttons = [btnWagyu, btnPremium, btnStandard];
  
    // --- Reset toàn bộ card về sáng ---
    function resetGray() {
      menuCards.forEach(menuCard => menuCard.classList.remove("gray"));
    }
  
    // --- Làm xám tuỳ theo nhóm chọn ---
    function showByGroup(group) {
      resetGray();
  
      menuCards.forEach(menuCard => {
        const flag = menuCard.dataset.flag;
  
        if (group === "wagyu") {
          // wagyu → tất cả sáng
        } else if (group === "premium" && flag === "wagyu") {
          // premium → làm xám nhóm wagyu
          menuCard.classList.add("gray");
        } else if (group === "standard" && flag !== "standard") {
          // standard → làm xám mọi nhóm khác
          menuCard.classList.add("gray");
        }
      });
    }
  
    // --- Toggle trạng thái nút ---
    function toggleActiveButton(clickedBtn) {
      const isActive = clickedBtn.classList.contains("active");
  
      // Bỏ trạng thái active khỏi tất cả nút
      buttons.forEach(btn => btn.classList.remove("active"));
  
      if (isActive) {
        // Nếu đang active → bấm lại sẽ tắt
        resetGray();
        return;
      }
  
      // Nếu chưa active → bật và lọc nhóm
      clickedBtn.classList.add("active");
  
      if (clickedBtn === btnWagyu) showByGroup("wagyu");
      else if (clickedBtn === btnPremium) showByGroup("premium");
      else if (clickedBtn === btnStandard) showByGroup("standard");
    }
  
    // --- Gán sự kiện click ---
    btnWagyu.addEventListener("click", () => toggleActiveButton(btnWagyu));
    btnPremium.addEventListener("click", () => toggleActiveButton(btnPremium));
    btnStandard.addEventListener("click", () => toggleActiveButton(btnStandard));
  
    // --- Trạng thái ban đầu: tất cả sáng ---
    resetGray();
  });
  