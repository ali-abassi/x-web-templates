const pause = document.querySelector("#pause");
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
let userPaused = false;
function syncMotion() {
  const stopped = userPaused || reduced.matches || document.hidden;
  document.body.classList.toggle("paused", stopped);
  pause.textContent = userPaused ? "Resume motion" : "Pause motion";
  pause.disabled = reduced.matches;
  pause.setAttribute("aria-pressed", String(userPaused));
}
pause.addEventListener("click", () => {
  userPaused = !userPaused;
  syncMotion();
});
reduced.addEventListener("change", syncMotion);
document.addEventListener("visibilitychange", syncMotion);
document.body.classList.add("motion-ready");
syncMotion();
