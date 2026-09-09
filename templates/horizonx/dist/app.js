document.body.classList.add("motion-ready");
const motionButton = document.querySelector(".motion");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
function reflectMotionPreference() {
  motionButton.hidden = reducedMotion.matches;
  document.body.classList.toggle("paused", reducedMotion.matches);
  motionButton.setAttribute("aria-pressed", String(reducedMotion.matches));
  motionButton.textContent = reducedMotion.matches
    ? "Resume motion"
    : "Pause motion";
}
motionButton.addEventListener("click", () => {
  const paused = document.body.classList.toggle("paused");
  motionButton.setAttribute("aria-pressed", String(paused));
  motionButton.textContent = paused ? "Resume motion" : "Pause motion";
});
function revealDestination() {
  const destination = document.getElementById(location.hash.slice(1));
  if (destination instanceof HTMLDetailsElement) destination.open = true;
}
window.addEventListener("hashchange", revealDestination);
reducedMotion.addEventListener("change", reflectMotionPreference);
reflectMotionPreference();
revealDestination();
