const positions = [
    { height: 400, z: 0, rotateY: 0, y: 0, clip: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
    { height: 400, z: 0, rotateY: 0, y: 0, clip: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
    { height: 400, z: 0, rotateY: 0, y: 0, clip: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
    { height: 400, z: 0, rotateY: 0, y: 0, clip: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
    { height: 400, z: 0, rotateY: 0, y: 0, clip: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
];

// === Danh sách hình ảnh ===
const imageList = [
    // { src: "./img/wagyu kakushu.png", title: "和牛各種", desc: "厳選和牛：和牛カルビ、和牛ロース、和牛モモロース、和牛オススメ" },
    // { src: "./img/thigh tongue.png", title: "厚切りタン", desc: "厚ければ厚いほどおいしい牛タン" },
    // { src: "./img/kaisen.png", title: "海鮮", desc: "海老、イカ、たこ、ホタテ" },
    // { src: "./img/parfei.png", title: "パフェ", desc: "フルーツとホイップがたっぷりのアイスパフェ" },
    // { src: "./img/4mori.png", title: "名物4種盛り合わせ", desc: "ボリューム満点！4種のステーキが味わえる名物プレートです" },
    // { src: "./img/tongue.png", title: "牛タン", desc: "さっぱり塩味の薄切り牛タンが絶品" },
    // { src: "./img/chisa.png", title: "巻き野菜", desc: "自家製野菜" },
    // { src: "./img/teiban.png", title: "定番3種盛り合わせ", desc: "甘みと旨みのバランスが絶妙な、人気の3種盛り合わせ" },
    // { src: "./img/horumon.png", title: "ホルモン盛り合わせ", desc: "新鮮さと旨みが自慢のホルモン3種盛り" },
    // { src: "./img/buta.png", title: "国産豚肉", desc: "柔らかく旨みのある国産豚肉を使用しています" },
    // { src: "./img/namul.png", title: "韓国ナムル", desc: "野菜の旨みとごま油の風味が楽しめる韓国ナムル" },
    // { src: "./img/cold noodle.png", title: "冷麵", desc: "つるつる食感がクセになる、本格冷麺" },
    // { src: "./img/fried mono.png", title: "揚げ物", desc: "サクサク食感が楽しめる人気の揚げ物盛り合わせです" },
    { src: "./img/pamphlet/drinkmenu1.png", title: "ドリンクページ", desc: "" },
    { src: "./img/pamphlet/drinkmenu2.png", title: "ドリンクページ", desc: "" },
    { src: "./img/pamphlet/meat1.png", title: "お肉ページ", desc: "" },
    { src: "./img/pamphlet/meat2.png", title: "お肉ページ", desc: "" },
    { src: "./img/pamphlet/veget1.png", title: "お野菜ページ", desc: "" },
    { src: "./img/pamphlet/veget2.png", title: "お野菜ページ", desc: "" },
    { src: "./img/pamphlet/veget3.png", title: "お野菜ページ", desc: "" }
];

// === Tạo danh sách card tự động ===
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("sliderTrack");

    for (let i = 0; i < imageList.length; i++) {
        const item = imageList[i];
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.title = item.title;
        card.dataset.desc = item.desc;

        card.innerHTML = `
        <img src="${item.src}" alt="${item.title}">
        <div class="hover-overlay"><span>詳しく情報</span></div>
      `;
        track.appendChild(card);
    }

    new CircularSlider(); // Khởi tạo slider sau khi tạo xong thẻ
});

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
