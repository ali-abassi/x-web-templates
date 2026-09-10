const motion = document.querySelector("#motion");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const note = document.querySelector("#project-note");
const noteForm = document.querySelector("#note-form");
const preview = document.querySelector("#note-preview");
const status = document.querySelector("#note-status");
let paused = false;

function motionLabel() {
  if (reducedMotion.matches) return "Reduced motion enabled";
  return paused ? "Resume motion" : "Pause motion";
}

function syncMotion() {
  const stopped = paused || reducedMotion.matches || document.hidden;
  document.documentElement.style.setProperty(
    "--motion",
    stopped ? "paused" : "running",
  );
  motion.disabled = reducedMotion.matches;
  motion.textContent = motionLabel();
  motion.setAttribute("aria-pressed", String(paused));
}

function openDialog(event) {
  const dialog = document.querySelector(event.currentTarget.hash);
  if (!(dialog instanceof HTMLDialogElement)) return;
  event.preventDefault();
  dialog.show();
}

function closeDialog(event) {
  event.preventDefault();
  event.currentTarget.closest("dialog").close();
}

function openLinkedDialog() {
  const dialog = document.getElementById(location.hash.slice(1));
  if (dialog instanceof HTMLDialogElement) dialog.show();
}

function showPreview(event) {
  event.preventDefault();
  if (!note.value.trim()) {
    status.textContent = "Add a little about your project first.";
    note.focus();
    return;
  }
  document.querySelector("#preview-text").textContent = note.value.trim();
  preview.hidden = false;
  noteForm.hidden = true;
  status.textContent = "Your note is ready. Nothing has been sent.";
  document.querySelector("#download").focus();
}

function editNote() {
  preview.hidden = true;
  noteForm.hidden = false;
  status.textContent = "";
  note.focus();
}

function downloadNote() {
  let url;
  try {
    const file = new Blob(
      [
        `VELOURA — PROJECT NOTE\n\n${note.value.trim()}\n\nLocal draft. Nothing has been sent.\n`,
      ],
      { type: "text/plain;charset=utf-8" },
    );
    url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "veloura-project-note.txt";
    link.click();
    status.textContent =
      "Download requested. Your note remains here until reload.";
  } catch {
    status.textContent =
      "Download unavailable. Your note is still above; select and copy it.";
  } finally {
    if (url) setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

function reportMissingArt() {
  document.querySelector(".art-error").hidden = false;
}

document
  .querySelectorAll("[data-dialog]")
  .forEach((link) => link.addEventListener("click", openDialog));
document
  .querySelectorAll("dialog .close")
  .forEach((link) => link.addEventListener("click", closeDialog));
document.querySelectorAll("button").forEach((button) => {
  button.disabled = false;
});
document.querySelectorAll(".garden img").forEach((image) => {
  image.addEventListener("error", reportMissingArt);
  if (image.complete && !image.naturalWidth) reportMissingArt();
});
motion.addEventListener("click", () => {
  paused = !paused;
  syncMotion();
});
reducedMotion.addEventListener("change", syncMotion);
document.addEventListener("visibilitychange", syncMotion);
noteForm.addEventListener("submit", showPreview);
document.querySelector("#download").addEventListener("click", downloadNote);
document.querySelector("#edit").addEventListener("click", editNote);
syncMotion();
document.documentElement.classList.add("enhanced");
window.addEventListener("hashchange", openLinkedDialog);
openLinkedDialog();
