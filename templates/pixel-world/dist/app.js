const dialog = document.querySelector("#contact");
const form = dialog.querySelector("form");
const closeButton = dialog.querySelector(".close");
const motionButton = document.querySelector(".motion");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let opener = null;

dialog.close();
document.body.classList.add("enhanced", "motion-ready");
form.hidden = false;
closeButton.hidden = false;
function openContact(event) {
  event.preventDefault();
  opener = event.currentTarget;
  dialog.showModal();
}
document
  .querySelectorAll("[data-contact]")
  .forEach((link) => link.addEventListener("click", openContact));
closeButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => opener?.focus());
function setPaused(paused) {
  document.body.classList.toggle("paused", paused);
  motionButton.setAttribute("aria-pressed", String(paused));
  motionButton.textContent = paused ? "Resume scene" : "Pause scene";
}
motionButton.hidden = reducedMotion.matches;
motionButton.addEventListener("click", () =>
  setPaused(!document.body.classList.contains("paused")),
);
reducedMotion.addEventListener("change", () => {
  motionButton.hidden = reducedMotion.matches;
  setPaused(reducedMotion.matches);
});
setPaused(reducedMotion.matches);
const fields = [...form.querySelectorAll("input, textarea")];
function validateField(field) {
  field.setCustomValidity(
    field.value.trim() ? "" : "Please add more than spaces.",
  );
}
fields.forEach((field) =>
  field.addEventListener("input", () => field.setCustomValidity("")),
);
function downloadDraft(text) {
  const url = URL.createObjectURL(
    new Blob([text], { type: "text/plain;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "contact-draft.txt";
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  fields.forEach(validateField);
  if (!form.reportValidity()) return;
  const [name, email, message] = fields.map((field) => field.value.trim());
  const status = document.querySelector("#draft-status");
  try {
    downloadDraft(`From: ${name} <${email}>

${message}
`);
    status.textContent = "Draft downloaded. Nothing was sent.";
  } catch {
    status.textContent =
      "Could not create the download. Your text is still here to copy.";
  }
});

if (location.hash === '#contact') dialog.showModal();
