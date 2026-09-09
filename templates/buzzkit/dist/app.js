document.body.classList.add("motion-ready");
const tabs = [...document.querySelectorAll("[data-screen]")];
const screens = [...document.querySelectorAll(".screen")];
const pauseButton = document.querySelector("#pause");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const showcase = document.querySelector(".showcase");
let activeIndex = 0;
let paused = reducedMotion.matches;
let tick = 0;

function showScreen(index) {
  activeIndex = index;
  tabs.forEach((tab, position) => {
    const selected = position === index;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    screens[position].hidden = !selected;
  });
  document.querySelectorAll("[data-side]").forEach((item) => {
    item.classList.toggle(
      "selected",
      item.dataset.side === tabs[index].dataset.screen,
    );
  });
}
function setPaused(value) {
  paused = value;
  document.body.classList.toggle("paused", value);
  pauseButton.setAttribute("aria-pressed", String(value));
  pauseButton.textContent = value ? "Play preview" : "Pause preview";
}
function pickScreen(index) {
  setPaused(true);
  showScreen(index);
}
tabs.forEach((tab, index) => {
  tab.disabled = false;
  tab.addEventListener("click", () => pickScreen(index));
});
document.querySelector(".tablist").addEventListener("keydown", (event) => {
  const offsets = {
    ArrowRight: 1,
    ArrowLeft: -1,
    Home: -activeIndex,
    End: tabs.length - 1 - activeIndex,
  };
  if (!(event.key in offsets)) return;
  event.preventDefault();
  const next = (activeIndex + offsets[event.key] + tabs.length) % tabs.length;
  pickScreen(next);
  tabs[next].focus();
});
pauseButton.hidden = false;
pauseButton.addEventListener("click", () => setPaused(!paused));
reducedMotion.addEventListener("change", () =>
  setPaused(reducedMotion.matches),
);
const notificationCopy = [
  ["Leg day", "Let’s go. 6:00 with Maya."],
  ["Rest day is over", "Your next workout is ready."],
  ["Your order shipped", "Arrives Thursday by 6 pm."],
  ["Invoice paid", "Acme Studio paid $1,240.00."],
  ["Storm near your route", "Heavy rain expected after 3 pm."],
  ["DL 214 boarding", "Gate B12 · departs 18:40"],
];
function canAdvance() {
  if (paused || document.hidden) return false;
  return showcase.getBoundingClientRect().bottom > 0;
}
function advancePreview() {
  if (!canAdvance()) return;
  const cards = [...document.querySelectorAll(".notification")];
  const card = cards[tick % cards.length];
  const copy = notificationCopy[(tick + 1) % notificationCopy.length];
  card.querySelector("strong").textContent = copy[0];
  card.querySelector("p").textContent = copy[1];
  tick += 1;
  if (tick % 2 === 0) showScreen((activeIndex + 1) % tabs.length);
}
window.setInterval(advancePreview, 3000);
setPaused(paused);

document.querySelectorAll(".preferences input").forEach((input) => {
  input.addEventListener("change", () => {
    document.querySelector('.preferences [role="status"]').textContent =
      "Preview updated. No account settings changed.";
  });
});
const setupPrompt =
  "Read https://docs.buzzkit.dev and explain how to connect notifications to my app. Ask me before changing infrastructure or sending messages.";
document.querySelector("#copy-prompt").disabled = false;
document.querySelector("#copy-prompt").addEventListener("click", async () => {
  const status = document.querySelector("#copy-status");
  try {
    await navigator.clipboard.writeText(setupPrompt);
    status.textContent = "Setup prompt copied.";
  } catch {
    status.textContent = setupPrompt;
  }
});
