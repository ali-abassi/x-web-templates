const dialog = document.querySelector("#trip-dialog");
const panel = document.querySelector("#trip");
const start = document.querySelector(".start");
const destination = document.querySelector("#destination");
const travelStyle = document.querySelector("#travel-style");
const result = document.querySelector("#result");
const resultHeading = document.querySelector("#result-heading");
const summaries = {
  slow: "Leave room for a slow morning, a local café, and a walk with no particular destination.",
  outdoors:
    "Make space for fresh air, a scenic trail, and a quiet spot to take in the view.",
  culture:
    "Start with a neighborhood to explore, a gallery or museum, and something local to taste.",
};

function openTrip(event) {
  event.preventDefault();
  dialog.showModal();
}

function closeTrip(event) {
  event.preventDefault();
  dialog.close();
}

function clearPreview() {
  destination.setCustomValidity("");
  result.hidden = true;
}

function previewTrip(event) {
  event.preventDefault();
  const place = destination.value.trim();
  if (!place) {
    destination.setCustomValidity("Add a destination to start your preview.");
    destination.reportValidity();
    return;
  }
  resultHeading.textContent = place;
  document.querySelector("#style-summary").textContent =
    summaries[travelStyle.value];
  result.hidden = false;
  resultHeading.focus();
}

dialog.append(panel);
start.addEventListener("click", openTrip);
document.querySelector(".close").addEventListener("click", closeTrip);
document.querySelector("#trip-form").addEventListener("submit", previewTrip);
destination.addEventListener("input", clearPreview);
travelStyle.addEventListener("change", clearPreview);
document.querySelector("#review").disabled = false;
document.querySelector("#script-note").hidden = true;
