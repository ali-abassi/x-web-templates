const memorial = document.querySelector("#memorial");
const memorialForm = document.querySelector("#memorial-form");
const tributePreview = document.querySelector("#tribute-preview");
const personName = document.querySelector("#person-name");
const years = document.querySelector("#years");
const memory = document.querySelector("#memory");
const downloadStatus = document.querySelector("#download-status");

function openDetails(event) {
  const dialog = document.querySelector(event.currentTarget.hash);
  if (!(dialog instanceof HTMLDialogElement)) return;
  event.preventDefault();
  dialog.showModal();
}

function closeDetails(event) {
  event.preventDefault();
  event.currentTarget.closest("dialog").close();
}

function validateText(field, message) {
  field.setCustomValidity(field.value.trim() ? "" : message);
  return field.reportValidity();
}

function showPreview(event) {
  event.preventDefault();
  if (!validateText(personName, "Add a name to remember.")) return;
  if (!validateText(memory, "Write a memory before previewing.")) return;
  document.querySelector("#preview-name").textContent = personName.value.trim();
  document.querySelector("#preview-years").textContent = years.value.trim();
  document.querySelector("#preview-years").hidden = !years.value.trim();
  document.querySelector("#preview-memory").textContent = memory.value.trim();
  memorialForm.hidden = true;
  tributePreview.hidden = false;
  downloadStatus.textContent = "";
  document.querySelector("#preview-name").focus();
}

function editTribute() {
  tributePreview.hidden = true;
  memorialForm.hidden = false;
  personName.focus();
}

function reportDownload(message, error = false) {
  downloadStatus.textContent = message;
  downloadStatus.classList.toggle("error", error);
}

function downloadTribute() {
  let url;
  try {
    const text = [
      "IN LOVING MEMORY",
      personName.value.trim(),
      years.value.trim(),
      "",
      memory.value.trim(),
      "",
      "Local NeuroLink template draft. Nothing was uploaded or published.",
    ].join("\n");
    url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "memorial-tribute.txt";
    link.click();
    reportDownload(
      "Download requested. Your draft stays on this page until reload.",
    );
  } catch {
    reportDownload(
      "Download unavailable. Your tribute is still above; select and copy it, or try again.",
      true,
    );
  } finally {
    if (url) setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

document
  .querySelectorAll('.header a[href^="#"], #create')
  .forEach((link) => link.addEventListener("click", openDetails));
document
  .querySelectorAll("dialog .close")
  .forEach((link) => link.addEventListener("click", closeDetails));
document.querySelectorAll("dialog button").forEach((button) => {
  button.disabled = false;
});
[personName, memory].forEach((field) =>
  field.addEventListener("input", () => field.setCustomValidity("")),
);
memorialForm.addEventListener("submit", showPreview);
document.querySelector("#edit-tribute").addEventListener("click", editTribute);
document
  .querySelector("#download-tribute")
  .addEventListener("click", downloadTribute);
document.querySelector("#start-draft").addEventListener("click", () => {
  document.querySelector("#signin").close();
  document.querySelector("#create").focus();
  memorial.showModal();
});
function showArtFailure(image) {
  image.hidden = true;
  document.querySelector("#art-status").textContent =
    "Some artwork is unavailable. Your tribute draft still works.";
}
document.querySelectorAll(".scene img").forEach((image) => {
  image.addEventListener("error", () => showArtFailure(image));
  if (image.complete && !image.naturalWidth) showArtFailure(image);
});
