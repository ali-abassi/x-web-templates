const rail = document.querySelector("#rail");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const choices = [...document.querySelectorAll(".photo")];
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
function syncArrows() {
  previous.disabled = rail.scrollLeft < 2;
  next.disabled = rail.scrollLeft > rail.scrollWidth - rail.clientWidth - 2;
}
function move(direction) {
  const width =
    document.querySelector(".preset").getBoundingClientRect().width + 16;
  rail.scrollBy({
    left: direction * width,
    behavior: reduced.matches ? "instant" : "smooth",
  });
}
function choose(event) {
  const selected = event.currentTarget;
  choices.forEach((button) =>
    button.setAttribute("aria-pressed", String(button === selected)),
  );
  document.querySelector("#selection").textContent =
    `${selected.dataset.name} selected. Make this moment yours.`;
}
function handleKey(event) {
  const directions = { ArrowLeft: -1, ArrowRight: 1 };
  if (!directions[event.key]) return;
  event.preventDefault();
  move(directions[event.key]);
}
choices.forEach((button) => {
  button.disabled = false;
  button.addEventListener("click", choose);
});
previous.addEventListener("click", () => move(-1));
next.addEventListener("click", () => move(1));
rail.addEventListener("scroll", syncArrows, { passive: true });
rail.addEventListener("keydown", handleKey);
window.addEventListener("resize", syncArrows);
syncArrows();
