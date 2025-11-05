const buttons = document.querySelectorAll(".lang");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});
