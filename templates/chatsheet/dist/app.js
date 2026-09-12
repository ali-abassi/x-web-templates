const motion = document.querySelector("#motion");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let paused = false;

function syncMotion() {
  const stopped = paused || reducedMotion.matches || document.hidden;
  document.body.classList.toggle("moving", !stopped);
  motion.textContent = paused ? "Resume motion" : "Pause motion";
  motion.setAttribute("aria-pressed", String(paused));
  motion.hidden = reducedMotion.matches;
}

function revealSection(event) {
  const section = document.querySelector(event.currentTarget.hash);
  if (!(section instanceof HTMLDetailsElement)) return;
  event.preventDefault();
  section.open = true;
  history.pushState(null, "", event.currentTarget.hash);
  section.scrollIntoView({ block: "start" });
  section.querySelector("summary").focus({ preventScroll: true });
}

function revealHash() {
  const section = document.getElementById(location.hash.slice(1));
  if (section instanceof HTMLDetailsElement) section.open = true;
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", revealSection);
});
motion.addEventListener("click", () => {
  paused = !paused;
  syncMotion();
});
reducedMotion.addEventListener("change", syncMotion);
document.addEventListener("visibilitychange", syncMotion);
window.addEventListener("hashchange", revealHash);
revealHash();
syncMotion();
