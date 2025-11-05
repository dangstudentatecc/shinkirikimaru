document.addEventListener("DOMContentLoaded", () => {
  const tanpinBtn = document.getElementById("drinkTanpinBtn"); 
  const nomihodaiBtn = document.getElementById("drinkNomihodaiBtn"); 
  const tanpinArea = document.getElementById("drinkTanpinArea"); 
  const nomihodaiArea = document.getElementById("drinkNomihodaiArea");
  const mainButtons = [tanpinBtn, nomihodaiBtn];

  const drinkCards = document.querySelectorAll("#drinkSection .drinkCard"); 
  const btnSoft = document.getElementById("drinkSoft"); 
  const btnAlcohol = document.getElementById("drinkAlcohol");
  const subButtons = [btnSoft, btnAlcohol];

  // --- helper ---
  const hideAllMain = () => {
    tanpinArea.classList.add("drink-hidden");
    nomihodaiArea.classList.add("drink-hidden");
  };

  const hideAllCards = () => {
    drinkCards.forEach(drinkCard => drinkCard.classList.add("drink-hidden"));
  };

  // --- show drink area ---
  const toggleMainSection = (clickedBtn, areaToShow) => {
    const isActive = clickedBtn.classList.contains("active");
    mainButtons.forEach(b => b.classList.remove("active"));
    hideAllMain();
    hideAllCards();
    subButtons.forEach(b => b.classList.remove("active"));

    if (!isActive) {
      clickedBtn.classList.add("active");
      areaToShow.classList.remove("drink-hidden");
    }
  };

  tanpinBtn.addEventListener("click", () =>
    toggleMainSection(tanpinBtn, tanpinArea)
  );
  nomihodaiBtn.addEventListener("click", () =>
    toggleMainSection(nomihodaiBtn, nomihodaiArea)
  );

  // --- 飲み放題ボタン制御 ---
  const showByGroup = (group) => {
    hideAllCards();
    drinkCards.forEach(drinkCard => {
      const flag = drinkCard.dataset.flag;
      if (group === "soft" && flag === "soft") drinkCard.classList.remove("drink-hidden");
      if (group === "alcohol") drinkCard.classList.remove("drink-hidden");
    });
  };

  const toggleSubButton = (clickedBtn) => {
    const isActive = clickedBtn.classList.contains("active");
    subButtons.forEach(b => b.classList.remove("active"));

    if (isActive) {
      hideAllCards();
      return;
    }

    clickedBtn.classList.add("active");
    if (clickedBtn === btnSoft) showByGroup("soft");
    else if (clickedBtn === btnAlcohol) showByGroup("alcohol");
  };

  btnSoft.addEventListener("click", () => toggleSubButton(btnSoft));
  btnAlcohol.addEventListener("click", () => toggleSubButton(btnAlcohol));

  // 初期状態
  hideAllMain();
  hideAllCards();
});
