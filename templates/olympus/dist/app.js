const motion = document.querySelector("#motion");
let paused = false;
function syncMotion() {
  document.body.dataset.paused = String(paused);
  document.body.dataset.hidden = String(document.hidden);
  motion.textContent = paused ? "Resume motion" : "Pause motion";
  motion.setAttribute("aria-pressed", String(paused));
}
function toggleMotion() {
  paused = !paused;
  syncMotion();
}
function assignTask(event) {
  const button = event.currentTarget;
  const selected = button.getAttribute("aria-pressed") !== "true";
  button.setAttribute("aria-pressed", String(selected));
  button.textContent = selected ? "Assigned ✓" : "Assign";
  button.setAttribute(
    "aria-label",
    `${selected ? "Unassign" : "Assign"} ${button.dataset.agent} task`,
  );
  document.querySelector("#agent-status").textContent =
    `${button.dataset.agent} task ${selected ? "assigned" : "unassigned"} locally. No agent was started.`;
}
function selectModel(event) {
  const selected = event.currentTarget;
  document
    .querySelectorAll(".model")
    .forEach((button) =>
      button.setAttribute("aria-pressed", String(button === selected)),
    );
  document.querySelector("#model-status").textContent =
    `${selected.dataset.model} selected in this local example. No model request was made.`;
}
function runWorkflow() {
  const complete =
    document.querySelector("#workflow").dataset.complete !== "true";
  const values = complete ? [100, 100, 100] : [26, 70, 42];
  document.querySelectorAll("progress").forEach((bar, index) => {
    bar.value = values[index];
    bar.textContent = `${values[index]}%`;
    bar.previousElementSibling.textContent = `${values[index]}%`;
  });
  document.querySelector("#workflow").dataset.complete = String(complete);
  document.querySelector("#workflow").textContent = complete
    ? "Reset example ↺"
    : "Run example ↗";
  document.querySelector("#workflow-status").textContent = complete
    ? "Example completed. No integrations were contacted."
    : "Example reset. No integrations connected.";
}
function artFailed(event) {
  event.currentTarget.hidden = true;
  document.querySelector("#art-status").textContent =
    "Some artwork could not load. All content and examples remain available.";
}
function reveal(entries) {
  entries.forEach((entry) =>
    entry.target.classList.toggle("entered", entry.isIntersecting),
  );
}
const observer = new IntersectionObserver(reveal, { threshold: 0.1 });
document
  .querySelectorAll(".feature,.integrations")
  .forEach((element) => observer.observe(element));
document
  .querySelectorAll("[data-agent]")
  .forEach((button) => button.addEventListener("click", assignTask));
document
  .querySelectorAll(".model")
  .forEach((button) => button.addEventListener("click", selectModel));
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", artFailed);
  if (img.complete && !img.naturalWidth) artFailed({ currentTarget: img });
});
document.querySelector("#start").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("[data-agent]").focus();
});
document.querySelector("#workflow").addEventListener("click", runWorkflow);
motion.addEventListener("click", toggleMotion);
document.addEventListener("visibilitychange", syncMotion);
document.querySelectorAll("button").forEach((button) => {
  button.disabled = false;
});
syncMotion();
