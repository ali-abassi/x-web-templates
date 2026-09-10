const scene = document.querySelector(".scene");
const character = document.querySelector("#character");
const eyes = [...document.querySelectorAll(".eye")];
const themes = [...document.querySelectorAll(".theme")];
const pause = document.querySelector("#pause");
const panel = document.querySelector("#panel");
const preset = document.querySelector("#preset");
const color = document.querySelector("#color");
const status = document.querySelector("#download-status");
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
let paused = false;
let pendingFrame = 0;
let position = null;

function trackingAllowed() {
  return !paused && !reduced.matches && !document.hidden && !panel.open;
}

function placePupil(eye, point) {
  const bounds = eye.getBoundingClientRect();
  const x = point.x - bounds.left - bounds.width / 2;
  const y = point.y - bounds.top - bounds.height / 2;
  const distance = Math.max(1, Math.hypot(x, y));
  const reach = Math.min(1, distance / 180);
  eye.style.setProperty(
    "--eye-x",
    `${(x / distance) * bounds.width * 0.14 * reach}px`,
  );
  eye.style.setProperty(
    "--eye-y",
    `${(y / distance) * bounds.height * 0.14 * reach}px`,
  );
}

function renderGaze() {
  pendingFrame = 0;
  if (!trackingAllowed() || !position) return;
  eyes.forEach((eye) => placePupil(eye, position));
  const bounds = scene.getBoundingClientRect();
  scene.style.setProperty("--pointer-x", `${position.x - bounds.left - 26}px`);
  scene.style.setProperty("--pointer-y", `${position.y - bounds.top - 26}px`);
}

function track(event) {
  if (!trackingAllowed()) return;
  position = { x: event.clientX, y: event.clientY };
  scene.classList.toggle("tracking", event.pointerType === "mouse");
  if (!pendingFrame) pendingFrame = requestAnimationFrame(renderGaze);
}

function resetGaze() {
  cancelAnimationFrame(pendingFrame);
  pendingFrame = 0;
  position = null;
  scene.classList.remove("tracking");
  eyes.forEach((eye) => {
    eye.style.setProperty("--eye-x", "0px");
    eye.style.setProperty("--eye-y", "0px");
  });
}

function syncMotion() {
  resetGaze();
  pause.disabled = reduced.matches;
  pause.textContent = reduced.matches ? "Reduced motion" : "Pause tracking Ⅱ";
  if (paused && !reduced.matches) pause.textContent = "Resume tracking ▷";
  pause.setAttribute("aria-pressed", String(paused));
}

function chooseTheme(value) {
  if (!themes.some((button) => button.dataset.color === value)) return;
  document.body.dataset.theme = value;
  color.value = value;
  themes.forEach((button) =>
    button.setAttribute("aria-pressed", String(button.dataset.color === value)),
  );
  document.querySelector("#announcement").textContent =
    `${color.selectedOptions[0].text} character selected.`;
  status.textContent = "";
}

function openPanel(name) {
  const titles = {
    features: "Curiosity, in motion.",
    pricing: "Just a little play.",
    about: "Meet AnimoraAI.",
    customize: "Make it yours.",
  };
  const content = document.getElementById(name);
  if (!titles[name] || !content) return;
  document.querySelector("#panel-title").textContent = titles[name];
  document
    .querySelector("#panel-copy")
    .replaceChildren(content.content.cloneNode(true));
  preset.hidden = name !== "customize";
  status.textContent = "";
  resetGaze();
  panel.showModal();
}

function downloadPreset(event) {
  event.preventDefault();
  const name = document.querySelector("#character-name").value.trim();
  if (!name) {
    status.textContent = "Give your character a name first.";
    document.querySelector("#character-name").focus();
    return;
  }
  const settings = {
    name,
    color: color.value,
    tracking: !paused,
    reducedMotion: reduced.matches,
  };
  try {
    saveFile(JSON.stringify(settings, null, 2));
    status.textContent =
      "Your preset download is ready. Nothing was sent or published.";
  } catch {
    status.textContent =
      "The download could not start. Your settings are still here; try again.";
  }
}

function saveFile(text) {
  const url = URL.createObjectURL(
    new Blob([text], { type: "application/json" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "animora-preset.json";
  document.body.append(link);
  try {
    link.click();
  } finally {
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

function keyboardGaze(event) {
  const directions = {
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    Home: [0, 0],
  };
  const direction = directions[event.key];
  if (!direction || !trackingAllowed()) return;
  event.preventDefault();
  if (event.key === "Home") return resetGaze();
  const bounds = character.getBoundingClientRect();
  position = {
    x: bounds.left + bounds.width / 2 + direction[0] * innerWidth,
    y: bounds.top + bounds.height / 4 + direction[1] * innerHeight,
  };
  renderGaze();
  scene.classList.remove("tracking");
}

function artworkFailed() {
  character.classList.add("art-unavailable");
  character.querySelector(".art-error").hidden = false;
  themes.forEach(
    (button) => (button.querySelector(".miniature").hidden = true),
  );
  themes.forEach(
    (button) => (button.querySelector(".theme-label").style.opacity = "1"),
  );
}

document
  .querySelectorAll("button[disabled]")
  .forEach((button) => (button.disabled = false));
document
  .querySelectorAll("[data-panel]")
  .forEach((button) =>
    button.addEventListener("click", () => openPanel(button.dataset.panel)),
  );
themes.forEach((button) =>
  button.addEventListener("click", () => chooseTheme(button.dataset.color)),
);
scene.addEventListener("pointermove", track, { passive: true });
scene.addEventListener("pointerdown", track, { passive: true });
scene.addEventListener("pointerleave", (event) => {
  if (event.pointerType !== "touch") resetGaze();
});
character.addEventListener("keydown", keyboardGaze);
window.addEventListener("blur", resetGaze);
window.addEventListener("resize", resetGaze);
document.addEventListener("visibilitychange", resetGaze);
reduced.addEventListener("change", syncMotion);
pause.addEventListener("click", () => {
  paused = !paused;
  syncMotion();
});
panel.querySelector(".close").addEventListener("click", () => panel.close());
color.addEventListener("change", () => chooseTheme(color.value));
preset.addEventListener("submit", downloadPreset);
document
  .querySelector("#showcase")
  .addEventListener("click", () =>
    themes
      .find((button) => button.getAttribute("aria-pressed") === "true")
      .focus(),
  );
const artwork = character.querySelector("img");
artwork.addEventListener("error", artworkFailed);
if (artwork.complete && !artwork.naturalWidth) artworkFailed();
syncMotion();
