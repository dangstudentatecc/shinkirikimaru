// popup-image.js
// Namespaced classes to avoid conflicts: imgpop-*
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".menuCard .image img");

    // --- Create overlay structure ---
    const overlay = document.createElement("div");
    overlay.className = "imgpop-overlay";
    overlay.style.display = "none";

    const wrapper = document.createElement("div");
    wrapper.className = "imgpop-wrapper";

    const closeBtn = document.createElement("button");
    closeBtn.className = "imgpop-close";
    closeBtn.setAttribute("aria-label", "Close image");
    closeBtn.innerHTML = "&times;";

    const popupImg = document.createElement("img");
    popupImg.className = "imgpop-image";
    popupImg.alt = "";

    wrapper.appendChild(closeBtn);
    wrapper.appendChild(popupImg);
    overlay.appendChild(wrapper);
    document.body.appendChild(overlay);

    // --- Helpers ---
    function openPopup(src, altText) {
        popupImg.src = src;
        popupImg.alt = altText || "";
        overlay.style.display = "flex";
        document.body.classList.add("imgpop-active");
    }

    function closePopup() {
        overlay.style.display = "none";
        document.body.classList.remove("imgpop-active");
        popupImg.src = "";
    }

    // --- Bind click on each image ---
    images.forEach(img => {
        img.addEventListener("click", (e) => {
            openPopup(img.src, img.alt);
        });
    });

    // --- Close when clicking the X button ---
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closePopup();
    });

    // --- Close when clicking outside the image (on overlay) ---
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            closePopup();
        }
    });

    // --- Prevent overlay close when clicking inside wrapper ---
    wrapper.addEventListener("click", (e) => e.stopPropagation());

    // --- (Optional) ESC key to close ---
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.style.display === "flex") {
            closePopup();
        }
    });
});
