const positions = [
  { height: 400, z: 0, rotateY: 0, y: 0, clip: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
  { height: 400, z: 0, rotateY: 0, y: 0, clip: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
  { height: 400, z: 0, rotateY: 0, y: 0, clip: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
  { height: 400, z: 0, rotateY: 0, y: 0, clip: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
  { height: 400, z: 0, rotateY: 0, y: 0, clip: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
];


class CircularSlider {
  constructor() {
    this.container = document.getElementById("sliderContainer");
    this.track = document.getElementById("sliderTrack");
    this.cards = Array.from(document.querySelectorAll(".card"));
    this.totalCards = this.cards.length;
    this.isDragging = false;
    this.startX = 0;
    this.dragDistance = 0;
    this.threshold = 60;
    this.processedSteps = 0;
    this.expandedCard = null;
    this.cardInfo = document.getElementById("cardInfo");
    this.cardTitle = document.getElementById("cardTitle");
    this.cardDesc = document.getElementById("cardDesc");
    this.closeBtn = document.getElementById("closeBtn");

    this.init();
  }

  init() {
    this.applyPositions();
    this.attachEvents();
  }

  applyPositions() {
    this.cards.forEach((card, index) => {
      const pos = positions[index % positions.length];
      gsap.set(card, {
        height: pos.height,
        clipPath: pos.clip,
        transform: `translateZ(${pos.z}px) rotateY(${pos.rotateY}deg) translateY(${pos.y}px)`
      });
    });
  }

  expandCard(card) {
    if (this.expandedCard) return;

    this.expandedCard = card;
    const title = card.dataset.title;
    const desc = card.dataset.desc;

    this.cardTitle.textContent = title;
    this.cardDesc.textContent = desc;

    const rect = card.getBoundingClientRect();
    const clone = card.cloneNode(true);
    const overlay = clone.querySelector(".hover-overlay");
    if (overlay) overlay.remove();

    clone.style.position = "fixed";
    clone.style.left = rect.left + "px";
    clone.style.top = rect.top + "px";
    clone.style.width = rect.width + "px";
    clone.style.height = rect.height + "px";
    clone.style.margin = "0";
    clone.style.zIndex = "1000";
    clone.classList.add("clone");

    document.body.appendChild(clone);
    this.cardClone = clone;

    gsap.set(card, { opacity: 0 });
    this.track.classList.add("blurred");

    const maxHeight = window.innerHeight * 0.8;
    const finalWidth = 500;
    const finalHeight = Math.min(650, maxHeight);
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    gsap.to(clone, {
      width: finalWidth,
      height: finalHeight,
      left: centerX - finalWidth / 2,
      top: centerY - finalHeight / 2,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transform: "translateZ(0) rotateY(0deg)",
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        console.log("Animation complete -> show cardInfo");
        this.cardInfo.classList.add("visible");
        this.closeBtn.classList.add("visible");
      }
    });
  }

  closeCard() {
    if (!this.expandedCard) return;

    this.cardInfo.classList.remove("visible");
    this.closeBtn.classList.remove("visible");

    const card = this.expandedCard;
    const clone = this.cardClone;
    const rect = card.getBoundingClientRect();
    const index = this.cards.indexOf(card);
    const pos = positions[index % positions.length];

    gsap.to(clone, {
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top,
      clipPath: pos.clip,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        clone.remove();
        gsap.set(card, { opacity: 1 });
        this.track.classList.remove("blurred");
        this.expandedCard = null;
        this.cardClone = null;
      }
    });
  }

  rotate(direction) {
    if (this.expandedCard) return;

    this.cards.forEach((card, index) => {
      let newIndex;
      if (direction === "next") {
        newIndex = (index - 1 + this.totalCards) % this.totalCards;
      } else {
        newIndex = (index + 1) % this.totalCards;
      }
      const pos = positions[newIndex % positions.length];
      gsap.to(card, {
        height: pos.height,
        clipPath: pos.clip,
        transform: `translateZ(${pos.z}px) rotateY(${pos.rotateY}deg) translateY(${pos.y}px)`,
        duration: 0.5,
        ease: "power2.out"
      });
    });

    if (direction === "next") {
      const first = this.cards.shift();
      this.cards.push(first);
      this.track.appendChild(first);
    } else {
      const last = this.cards.pop();
      this.cards.unshift(last);
      this.track.prepend(last);
    }
  }

  attachEvents() {
    this.cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        if (Math.abs(this.dragDistance) < 10 && !this.expandedCard) {
          this.expandCard(card);
        }
      });
    });

    this.closeBtn.addEventListener("click", () => this.closeCard());

    this.container.addEventListener("mousedown", (e) => this.handleDragStart(e));
    this.container.addEventListener("touchstart", (e) => this.handleDragStart(e), { passive: false });

    document.addEventListener("mousemove", (e) => this.handleDragMove(e));
    document.addEventListener("touchmove", (e) => this.handleDragMove(e), { passive: false });

    document.addEventListener("mouseup", () => this.handleDragEnd());
    document.addEventListener("touchend", () => this.handleDragEnd());

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.expandedCard) {
        this.closeCard();
      } else if (e.key === "ArrowLeft" && !this.expandedCard) {
        this.rotate("prev");
      } else if (e.key === "ArrowRight" && !this.expandedCard) {
        this.rotate("next");
      }
    });
  }

  handleDragStart(e) {
    if (this.expandedCard) return;
    this.isDragging = true;
    this.container.classList.add("dragging");
    this.startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    this.dragDistance = 0;
    this.processedSteps = 0;
  }

  handleDragMove(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    const currentX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    this.dragDistance = currentX - this.startX;

    const steps = Math.floor(Math.abs(this.dragDistance) / this.threshold);
    if (steps > this.processedSteps) {
      const direction = this.dragDistance > 0 ? "prev" : "next";
      this.rotate(direction);
      this.processedSteps = steps;
    }
  }

  handleDragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.container.classList.remove("dragging");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CircularSlider();
});