const motionButton = document.querySelector("#motion-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let cloudsPaused = false;

function motionLabel() {
  if (reducedMotion.matches) return "Reduced motion on";
  return cloudsPaused ? "Resume clouds" : "Pause clouds";
}

function applyMotion() {
  const stopped = cloudsPaused || reducedMotion.matches || document.hidden;
  document.body.dataset.motion = stopped ? "paused" : "running";
  motionButton.disabled = reducedMotion.matches;
  motionButton.setAttribute("aria-pressed", String(cloudsPaused));
  motionButton.textContent = motionLabel();
}

motionButton.addEventListener("click", () => {
  cloudsPaused = !cloudsPaused;
  applyMotion();
});
reducedMotion.addEventListener("change", applyMotion);
document.addEventListener("visibilitychange", applyMotion);
applyMotion();
