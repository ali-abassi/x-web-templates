const email = document.querySelector("#email");
const trialForm = document.querySelector("#trial-form");
const brief = document.querySelector("#brief");
const briefStatus = document.querySelector("#brief-status");

function showDialog(id) {
  document.querySelector(`#${id}`).showModal();
}

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

function previewTrial(event) {
  event.preventDefault();
  document.querySelector("#trial-message").textContent =
    `Your preview is ready for ${email.value}. Here is a simple starting checklist:`;
  showDialog("trial");
}

function reportBrief(message, error = false) {
  briefStatus.textContent = message;
  briefStatus.classList.toggle("error", error);
}

function saveBrief() {
  const text = brief.value.trim();
  if (!text) {
    reportBrief("Describe a task first, then download your brief.", true);
    brief.focus();
    return;
  }
  let url;
  try {
    const file = new Blob(
      [
        `SWIFT AI — LOCAL PROJECT BRIEF\n\n${text}\n\nNothing has been submitted.\n`,
      ],
      { type: "text/plain;charset=utf-8" },
    );
    url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "swift-ai-project-brief.txt";
    link.click();
    reportBrief("Download requested. Your draft stays here until reload.");
  } catch {
    reportBrief(
      "Download unavailable. Your draft is still above; select and copy it.",
      true,
    );
  } finally {
    if (url) setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

document
  .querySelectorAll('.header a[href^="#"], .utility a')
  .forEach((link) => link.addEventListener("click", openDetails));
document
  .querySelectorAll("dialog .close")
  .forEach((link) => link.addEventListener("click", closeDetails));
trialForm.addEventListener("submit", previewTrial);
document.querySelectorAll("button").forEach((button) => {
  button.disabled = false;
});
document.querySelector("#download-brief").addEventListener("click", saveBrief);
document.querySelector("#focus-email").addEventListener("click", () => {
  document.querySelector("#login").close();
  email.focus();
});
document.querySelector("#start-brief").addEventListener("click", () => {
  document.querySelector("#trial").close();
  showDialog("quote");
});
const forest = document.querySelector(".forest");
function showArtFailure() {
  forest.hidden = true;
  document.querySelector(".art-error").hidden = false;
}
forest.addEventListener("error", showArtFailure);
if (forest.complete && !forest.naturalWidth) showArtFailure();
