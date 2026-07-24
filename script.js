const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
const year = document.querySelector("[data-year]");

year.textContent = new Date().getFullYear();

const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 24);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("open", !open);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
  });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduceMotion || !("IntersectionObserver" in window)) {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

const constraintCanvas = document.querySelector("[data-constraint-canvas]");
if (constraintCanvas && !reduceMotion) {
  const context = constraintCanvas.getContext("2d");
  const hero = constraintCanvas.closest(".hero");
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let animationFrame = 0;

  const resizeField = () => {
    const bounds = hero.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    constraintCanvas.width = Math.round(width * pixelRatio);
    constraintCanvas.height = Math.round(height * pixelRatio);
    constraintCanvas.style.width = `${width}px`;
    constraintCanvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    if (!pointer.active) {
      pointer.x = pointer.targetX = width * 0.76;
      pointer.y = pointer.targetY = height * 0.48;
    }
  };

  const updatePointer = (event) => {
    const bounds = hero.getBoundingClientRect();
    pointer.targetX = event.clientX - bounds.left;
    pointer.targetY = event.clientY - bounds.top;
    pointer.active = true;
  };

  const releasePointer = () => {
    pointer.active = false;
    pointer.targetX = width * 0.76;
    pointer.targetY = height * 0.48;
  };

  const influence = (x, y) => {
    const dx = pointer.x - x;
    const dy = pointer.y - y;
    const distance = Math.hypot(dx, dy);
    const radius = Math.min(width, height) * 0.32;
    if (distance >= radius || distance === 0) return 0;
    const normalized = 1 - distance / radius;
    return normalized * normalized;
  };

  const drawField = () => {
    pointer.x += (pointer.targetX - pointer.x) * 0.055;
    pointer.y += (pointer.targetY - pointer.y) * 0.055;
    context.clearRect(0, 0, width, height);

    const spacing = Math.max(58, Math.min(92, width / 15));
    const sample = 18;
    context.lineWidth = 0.65;
    context.strokeStyle = "rgba(241, 241, 238, 0.21)";

    for (let x = -spacing; x <= width + spacing; x += spacing) {
      context.beginPath();
      for (let y = 0; y <= height + sample; y += sample) {
        const pull = influence(x, y);
        const shiftedX = x + (pointer.x - x) * pull * 0.18;
        if (y === 0) context.moveTo(shiftedX, y);
        else context.lineTo(shiftedX, y);
      }
      context.stroke();
    }

    for (let y = -spacing; y <= height + spacing; y += spacing) {
      context.beginPath();
      for (let x = 0; x <= width + sample; x += sample) {
        const pull = influence(x, y);
        const shiftedY = y + (pointer.y - y) * pull * 0.18;
        if (x === 0) context.moveTo(x, shiftedY);
        else context.lineTo(x, shiftedY);
      }
      context.stroke();
    }

    context.beginPath();
    context.arc(pointer.x, pointer.y, 2.2, 0, Math.PI * 2);
    context.fillStyle = "rgba(241, 241, 238, 0.92)";
    context.fill();
    context.beginPath();
    context.arc(pointer.x, pointer.y, 9, 0, Math.PI * 2);
    context.strokeStyle = "rgba(241, 241, 238, 0.28)";
    context.stroke();

    animationFrame = requestAnimationFrame(drawField);
  };

  resizeField();
  hero.addEventListener("pointermove", updatePointer, { passive: true });
  hero.addEventListener("pointerleave", releasePointer);
  window.addEventListener("resize", resizeField, { passive: true });
  animationFrame = requestAnimationFrame(drawField);

  document.addEventListener("visibilitychange", () => {
    cancelAnimationFrame(animationFrame);
    if (!document.hidden) animationFrame = requestAnimationFrame(drawField);
  });
}
