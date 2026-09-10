const forms = [...document.querySelectorAll("[data-trip-form]")];
const itinerary = document.querySelector("#itinerary");
const draft = document.querySelector("#draft");
let lastForm = forms[0];
let paused = false;
const motion = document.querySelector("#motion");
const stays = document.querySelector("#journey-view").innerHTML;
const views = {
  stays,
  days: '<ol class="day-list"><li>Day 1 · Find your bearings<small>A neighborhood walk and a favorite café.</small></li><li>Day 2 · Follow the water<small>A slower morning and room to explore.</small></li><li>Day 3 · Make it yours<small>Return to a place you loved. Leave time for a detour.</small></li></ol>',
  saved:
    '<div class="saved-empty"><span aria-hidden="true">♡</span><h4>A little room for inspiration.</h4><p>No places saved in this example. Your own favorite places belong here.</p></div>',
};
function createDraft(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const notes = form.elements.notes.value.trim();
  if (!notes) {
    form.querySelector(".form-status").textContent =
      "Add a destination or a few trip ideas first.";
    form.elements.notes.focus();
    return;
  }
  lastForm = form;
  draft.value = `MY TRIP — EDITABLE EXAMPLE

My notes
${notes}

DAY 1 — ARRIVE AND SETTLE IN
Choose a neighborhood walk, a relaxed meal, and time to rest.

DAY 2 — FOLLOW YOUR CURIOSITY
Add one place you would love to explore. Leave the afternoon open.

DAY 3 — MAKE ROOM FOR A DETOUR
Find a local café, revisit a favorite spot, or take a slow walk.

Before you go
Replace these example days with your actual plans. Verify transport, opening times, accessibility, entry requirements and bookings yourself. This is a local editable example, not an AI-generated or verified travel plan.`;
  itinerary.hidden = false;
  form.querySelector(".form-status").textContent =
    "Your editable example is ready below.";
  document.querySelector("#export-status").textContent = "";
  itinerary.focus();
  itinerary.scrollIntoView({ block: "start" });
}
function exportDraft() {
  const status = document.querySelector("#export-status");
  if (!draft.value.trim()) {
    status.textContent = "Add something to your itinerary before downloading.";
    draft.focus();
    return;
  }
  try {
    const url = URL.createObjectURL(
      new Blob([draft.value], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "wandor-itinerary.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = "Download requested. Your editable text stays here.";
  } catch {
    status.textContent =
      "Download unavailable. Your itinerary is still here; select and copy it manually.";
    draft.focus();
    draft.select();
  }
}
function selectView(event) {
  const selected = event.currentTarget;
  document
    .querySelectorAll("[data-view]")
    .forEach((button) =>
      button.setAttribute("aria-pressed", String(button === selected)),
    );
  document.querySelector("#journey-view").innerHTML =
    views[selected.dataset.view];
  document.querySelector("#view-status").textContent =
    `${selected.textContent} selected. Example content only.`;
}
function syncMotion() {
  document.body.dataset.paused = String(paused);
  document.body.dataset.hidden = String(document.hidden);
  motion.setAttribute("aria-pressed", String(paused));
  motion.textContent = paused ? "Resume motion" : "Pause motion";
}
function artFailed(event) {
  event.currentTarget.hidden = true;
  document.querySelector("#art-status").textContent =
    "Some artwork could not load. The planner and all text remain available.";
}
function reveal(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("entered");
      observer.unobserve(entry.target);
    }
  });
}
const observer = new IntersectionObserver(reveal, { threshold: 0.1 });
document
  .querySelectorAll(".feature-row,.journey")
  .forEach((section) => observer.observe(section));
forms.forEach((form) => form.addEventListener("submit", createDraft));
document
  .querySelectorAll("[data-view]")
  .forEach((button) => button.addEventListener("click", selectView));
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", artFailed);
  if (img.complete && !img.naturalWidth) artFailed({ currentTarget: img });
});
document.querySelector("#export").addEventListener("click", exportDraft);
document
  .querySelector("#back")
  .addEventListener("click", () => lastForm.elements.notes.focus());
motion.addEventListener("click", () => {
  paused = !paused;
  syncMotion();
});
document.addEventListener("visibilitychange", syncMotion);
document.querySelectorAll("button").forEach((button) => {
  button.disabled = false;
});
syncMotion();

document.body.classList.add("motion-ready");
