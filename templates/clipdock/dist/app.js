const tabs = [...document.querySelectorAll('[role="tab"]')];
const editor = document.querySelector("#clip-text");
const panel = document.querySelector("#clip-panel");
const status = document.querySelector("#status");
const samples = new Map([
  ["History", "A thought worth keeping."],
  ["Prompts", "Turn these notes into three clear next steps."],
  ["Colors", "#008FFF"],
  ["Assets", "project-cover.png — add your own asset library"],
  ["Inspirations", "Make room for good ideas."],
]);
let current = "History";
function selectTab(tab) {
  samples.set(current, editor.value);
  current = tab.dataset.category;
  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  editor.value = samples.get(current);
  panel.setAttribute("aria-labelledby", tab.id);
  document.querySelector("#card-title").textContent = editor.value;
  status.textContent = `${current} selected. Edit the sample, then copy it.`;
  replayCards();
}
function replayCards() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelector(".clip-cards").animate(
    [
      { opacity: 0.4, transform: "translateY(8px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    { duration: 300 },
  );
}
function tabKey(event) {
  const offset = {
    ArrowLeft: -1,
    ArrowRight: 1,
    Home: -tabs.length,
    End: tabs.length,
  }[event.key];
  if (!offset) return;
  event.preventDefault();
  const index = tabs.indexOf(event.currentTarget);
  const target = keyIndex(event.key, index, offset);
  tabs[target].focus();
  selectTab(tabs[target]);
}
function keyIndex(key, index, offset) {
  if (key === "Home") return 0;
  if (key === "End") return tabs.length - 1;
  return (index + offset + tabs.length) % tabs.length;
}
async function copyClip() {
  if (!editor.value.trim()) {
    status.textContent = "Write something in the clip before copying.";
    editor.focus();
    return;
  }
  try {
    await navigator.clipboard.writeText(editor.value);
    status.textContent = "Clip copied. Nothing was sent or saved online.";
  } catch {
    status.textContent =
      "Copy unavailable. Your text is still here; select it and copy manually.";
    editor.focus();
    editor.select();
  }
}
tabs.forEach((tab) => {
  tab.disabled = false;
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", tabKey);
});
const copy = document.querySelector("#copy");
copy.disabled = false;
copy.addEventListener("click", copyClip);
document.querySelectorAll(".mobile-menu a").forEach((link) =>
  link.addEventListener("click", () => {
    document.querySelector(".mobile-menu").open = false;
  }),
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("entered");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);
observer.observe(document.querySelector(".desktop"));
document.body.classList.add("motion-ready");
