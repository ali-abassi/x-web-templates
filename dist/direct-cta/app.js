const copy = document.querySelector("#copy");
const status = document.querySelector("#status");
async function copyEmail() {
  try {
    await navigator.clipboard.writeText("hello@direct.example");
    status.textContent = "Email copied. Nothing was sent.";
  } catch {
    status.textContent =
      "Copy unavailable. Select hello@direct.example and copy it manually.";
  }
}
function openWork() {
  document.querySelector("#work").open = true;
}
copy.addEventListener("click", copyEmail);
document
  .querySelectorAll('a[href="#work"]')
  .forEach((link) => link.addEventListener("click", openWork));
if (location.hash === "#work") openWork();

copy.disabled = false;
