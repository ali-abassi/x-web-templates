const slides = [...document.querySelectorAll(".dashboard-scene")];
const dots = [...document.querySelectorAll(".indicators i")];
const showcase = document.querySelector(".showcase");
const pause = document.querySelector("#pause");
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
let index = 0;
let userPaused = false;
let timer = null;
function showScene(nextIndex, announce = false) {
  index = (nextIndex + slides.length) % slides.length;
  slides.forEach((slide, position) => {
    slide.hidden = position !== index;
  });
  dots.forEach((dot, position) =>
    dot.classList.toggle("active", position === index),
  );
  document.querySelector("#scene-label").textContent =
    slides[index].getAttribute("aria-label");
  if (announce)
    document.querySelector("#scene-status").textContent =
      `Dashboard ${index + 1} of ${slides.length}: ${slides[index].getAttribute("aria-label")}`;
  animateScene();
}
function animateScene() {
  if (reduced.matches) return;
  slides[index].getAnimations().forEach((animation) => animation.cancel());
  slides[index].animate(
    [
      { opacity: 0.1, transform: "translateX(15px)" },
      { opacity: 1, transform: "translateX(0)" },
    ],
    { duration: 550, easing: "ease-out" },
  );
}
function syncAutoplay() {
  clearInterval(timer);
  const stopped = userPaused || reduced.matches || document.hidden;
  document.body.classList.toggle("paused", stopped);
  pause.textContent = userPaused ? "Play" : "Pause";
  pause.setAttribute("aria-pressed", String(userPaused));
  if (stopped) return;
  timer = setInterval(() => showScene(index + 1), 6000);
}
function move(direction) {
  userPaused = true;
  showScene(index + direction, true);
  syncAutoplay();
}
function handleKey(event) {
  const direction = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
  if (!direction) return;
  event.preventDefault();
  move(direction);
}
function openDemo(event) {
  event.preventDefault();
  userPaused = true;
  syncAutoplay();
  document.querySelector("#form-status").textContent =
    "Preview opened. No account created and no email sent.";
  showcase.focus();
  showcase.scrollIntoView({
    behavior: reduced.matches ? "instant" : "smooth",
    block: "center",
  });
}
document.querySelector("#previous").addEventListener("click", () => move(-1));
document.querySelector("#next").addEventListener("click", () => move(1));
pause.addEventListener("click", () => {
  userPaused = !userPaused;
  syncAutoplay();
});
showcase.addEventListener("keydown", handleKey);
showcase.addEventListener("focus", () => {
  userPaused = true;
  syncAutoplay();
});
document.querySelector("#demo-form").addEventListener("submit", openDemo);
document.querySelectorAll(".carousel-controls button").forEach((button) => {
  button.disabled = false;
});
reduced.addEventListener("change", syncAutoplay);
document.addEventListener("visibilitychange", syncAutoplay);
document.body.classList.add("motion-ready");
syncAutoplay();

document.querySelector("#demo-form button").disabled = false;
