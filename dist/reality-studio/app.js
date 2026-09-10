const field = document.querySelector("#studio");
const trailRoot = document.querySelector("#trails");
const pause = document.querySelector("#pause");
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const pool = Array.from({ length: 24 }, () => {
  const node = document.createElement("i");
  node.className = "trace";
  trailRoot.append(node);
  return node;
});
let cursor = 0;
let lastPoint = { x: -100, y: -100 };
let stopped = false;
function leaveTrace(event) {
  if (stopped || reduced.matches) return;
  const distance = Math.hypot(
    event.clientX - lastPoint.x,
    event.clientY - lastPoint.y,
  );
  if (distance < 45) return;
  lastPoint = { x: event.clientX, y: event.clientY };
  const bounds = field.getBoundingClientRect();
  const node = pool[cursor++ % pool.length];
  node.getAnimations().forEach((animation) => animation.cancel());
  node.style.left = `${event.clientX - bounds.left}px`;
  node.style.top = `${event.clientY - bounds.top}px`;
  node.animate(
    [
      { opacity: 0.8, scale: 0.8 },
      { opacity: 0, scale: 1.2 },
    ],
    { duration: 1700, easing: "ease-out" },
  );
}
function syncMotion() {
  const freeze = stopped || reduced.matches || document.hidden;
  document.body.classList.toggle("paused", freeze);
  pause.textContent = stopped ? "Resume motion" : "Pause motion";
  pause.setAttribute("aria-pressed", String(stopped));
  pause.disabled = reduced.matches;
  trailRoot
    .getAnimations({ subtree: true })
    .forEach((animation) => animation.cancel());
}
async function copyContact() {
  const status = document.querySelector("#status");
  try {
    await navigator.clipboard.writeText("hello@reality.example");
    status.textContent = "Email copied. Nothing was sent.";
  } catch {
    status.textContent =
      "Copy unavailable. Select hello@reality.example to copy manually.";
  }
}
function openSection(event) {
  const target = document.querySelector(event.currentTarget.hash);
  target.open = true;
}
field.addEventListener("pointermove", leaveTrace);
pause.addEventListener("click", () => {
  stopped = !stopped;
  syncMotion();
});
reduced.addEventListener("change", syncMotion);
document.addEventListener("visibilitychange", syncMotion);
document.querySelector("#copy").addEventListener("click", copyContact);
document
  .querySelectorAll('a[href="#services"], a[href="#projects"]')
  .forEach((link) => link.addEventListener("click", openSection));
document.body.classList.add("motion-ready");
syncMotion();

document.querySelector("#copy").disabled = false;
