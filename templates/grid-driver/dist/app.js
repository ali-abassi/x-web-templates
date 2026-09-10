const canvas = document.querySelector("#helmet");
const context = canvas.getContext("2d");
const portrait = document.querySelector("#portrait");
const toggle = document.querySelector("#toggle-helmet");
const pause = document.querySelector("#pause");
const replay = document.querySelector("#replay-lap");
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const helmet = new Image();
const track = document.querySelector("#track-line");
const trackLength = track.getTotalLength();
let ready = false;
let lockedHelmet = false;
let paused = false;
let frame = null;
let previousTime = null;
let revealTime = 0;
let lapTime = 4000;
let trails = [];
function drawTrail(point) {
  const radius = 110;
  const gradient = context.createRadialGradient(
    point.x,
    point.y,
    10,
    point.x,
    point.y,
    radius,
  );
  gradient.addColorStop(0, `rgba(255,255,255,${1 - point.age / 1200})`);
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(point.x - radius, point.y - radius, radius * 2, radius * 2);
}
function drawReveal() {
  if (revealTime >= 2200) return;
  context.fillStyle = "#fff";
  context.fillRect(0, 0, 1254, 1254);
  const radius = Math.max(1, ((revealTime - 350) / 1850) * 700);
  const gradient = context.createRadialGradient(
    630,
    210,
    Math.max(0, radius - 45),
    630,
    210,
    radius,
  );
  gradient.addColorStop(0, "#fff");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.globalCompositeOperation = "destination-out";
  context.fillStyle = gradient;
  context.fillRect(0, 0, 1254, 1254);
  context.globalCompositeOperation = "source-over";
}
function drawHelmet() {
  context.clearRect(0, 0, 1254, 1254);
  if (lockedHelmet) {
    context.drawImage(helmet, 0, 0, 1254, 1254);
    return;
  }
  drawReveal();
  trails.forEach(drawTrail);
  context.globalCompositeOperation = "source-in";
  context.drawImage(helmet, 0, 0, 1254, 1254);
  context.globalCompositeOperation = "source-over";
}
function updateLap() {
  const point = track.getPointAtLength(
    Math.min(1, lapTime / 4000) * trackLength,
  );
  document.querySelector("#lap-dot").setAttribute("cx", String(point.x));
  document.querySelector("#lap-dot").setAttribute("cy", String(point.y));
  if (lapTime >= 4000)
    document.querySelector("#lap-status").textContent =
      "Lap complete. Ready for another run.";
}
function tick(time) {
  frame = null;
  const delta = Math.min(50, time - (previousTime ?? time));
  previousTime = time;
  revealTime += delta;
  lapTime += delta;
  trails.forEach((point) => {
    point.age += delta;
  });
  trails = trails.filter((point) => point.age < 1200);
  drawHelmet();
  updateLap();
  const active = revealTime < 2200 || lapTime < 4000 || trails.length > 0;
  if (active) frame = requestAnimationFrame(tick);
}
function motionBlocked() {
  return paused || reduced.matches || document.hidden;
}
function start() {
  if (!ready || motionBlocked() || frame !== null) return;
  previousTime = null;
  frame = requestAnimationFrame(tick);
}
function stop() {
  cancelAnimationFrame(frame);
  frame = null;
  previousTime = null;
}
function syncMotion() {
  stop();
  pause.textContent = paused ? "Resume motion" : "Pause motion";
  pause.setAttribute("aria-pressed", String(paused));
  if (reduced.matches) {
    revealTime = 2200;
    lapTime = 4000;
    trails = [];
  }
  if (ready) drawHelmet();
  start();
}
function pointerMove(event) {
  if (motionBlocked() || lockedHelmet || !ready) return;
  const bounds = portrait.getBoundingClientRect();
  trails.push({
    x: ((event.clientX - bounds.left) / bounds.width) * 1254,
    y: ((event.clientY - bounds.top) / bounds.height) * 1254,
    age: 0,
  });
  trails = trails.slice(-30);
  start();
}
function toggleHelmet() {
  lockedHelmet = !lockedHelmet;
  revealTime = 2200;
  trails = [];
  toggle.setAttribute("aria-pressed", String(lockedHelmet));
  toggle.textContent = lockedHelmet ? "Show portrait" : "Show helmet";
  document.querySelector("#portrait-status").textContent = lockedHelmet
    ? "Helmet view."
    : "Portrait view. Move your pointer to reveal the helmet.";
  drawHelmet();
}
function startLap() {
  lapTime = reduced.matches ? 4000 : 0;
  document.querySelector("#lap-status").textContent = reduced.matches
    ? "Reduced motion: circuit shown without animation."
    : "Lap in progress.";
  start();
}
function imageReady() {
  ready = true;
  toggle.disabled = portrait.dataset.failed === "true";
  pause.disabled = false;
  replay.disabled = false;
  if (reduced.matches) revealTime = 2200;
  drawHelmet();
  start();
}
helmet.addEventListener("load", imageReady);
helmet.addEventListener("error", () => {
  document.querySelector("#portrait-status").textContent =
    "Helmet image unavailable. Portrait view remains available.";
});
helmet.src = "assets/helmet.png";
portrait.addEventListener("pointermove", pointerMove);
toggle.addEventListener("click", toggleHelmet);
pause.addEventListener("click", () => {
  paused = !paused;
  syncMotion();
});
replay.addEventListener("click", startLap);
reduced.addEventListener("change", syncMotion);
document.addEventListener("visibilitychange", syncMotion);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      startLap();
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.4 },
);
observer.observe(document.querySelector("#circuit"));

function portraitFailed() {
  portrait.dataset.failed = "true";
  portrait.hidden = true;
  toggle.disabled = true;
  document.querySelector("#portrait-status").textContent =
    "Portrait image unavailable. Driver details and the circuit remain available.";
}
const driverImage = portrait.querySelector("img");
driverImage.addEventListener("error", portraitFailed);
if (driverImage.complete && driverImage.naturalWidth === 0) portraitFailed();
