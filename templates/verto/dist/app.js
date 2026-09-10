(() => {
  const services = [
    {
      description:
        "Distinctive identities that make a clear first impression — from a single mark to a complete visual language.",
      tags: "Strategy · Identity · Guidelines",
      images: ["portrait-red.png", "iris.png"],
      labels: ["Red and cyan editorial portrait", "Sculptural lavender iris"],
    },
    {
      description:
        "Thoughtful digital experiences that turn complexity into clarity. Built around people, their goals, and the details that matter.",
      tags: "Research · Interfaces · Prototypes",
      images: ["earbuds.png", "blocks.png"],
      labels: [
        "Warm editorial audio product portrait",
        "Tactile modular color study",
      ],
    },
    {
      description:
        "One clear idea, carried through every image and every touchpoint. A visual world with a character of its own.",
      tags: "Art Direction · Campaigns · Visual Language",
      images: ["coral.png", "iris.png"],
      labels: ["Iridescent glass coral sculpture", "Sculptural lavender iris"],
    },
    {
      description:
        "Fast, resilient sites that stay true to the design — accessible, carefully considered, and easy to maintain.",
      tags: "Frontend · Webflow · CMS",
      images: ["portrait-red.png", "synth-sky.png"],
      labels: [
        "Red and cyan editorial portrait",
        "Pale blue synthesizer concept",
      ],
    },
  ];
  const quotes = [
    [
      "From the very beginning, they understood our direction. The process was smooth, collaborative, and the final result feels truly lasting.",
      "— Sophia R.",
    ],
    [
      "They found the simple idea inside a complicated brief, then carried it through every detail. The whole experience finally feels like us.",
      "— Alex M.",
    ],
    [
      "Thoughtful questions, clear direction, and room to explore. We came away with a visual language we could keep building on.",
      "— Jamie L.",
    ],
  ];
  let quoteIndex = 0;
  const projectDialog = document.querySelector("#project-dialog");
  const briefDialog = document.querySelector("#brief-dialog");
  const brief = document.querySelector("#brief-form");

  function chooseService(event) {
    const selected = event.currentTarget;
    const data = services[Number(selected.dataset.service)];
    document
      .querySelectorAll("[data-service]")
      .forEach((button) =>
        button.setAttribute("aria-pressed", String(button === selected)),
      );
    document.querySelector("#service-description").textContent =
      data.description;
    document.querySelector("#service-tags").textContent = data.tags;
    document.querySelectorAll(".service-art img").forEach((image, index) => {
      image.hidden = false;
      image.src = `assets/${data.images[index]}`;
      image.alt = data.labels[index];
    });
    document.querySelector("#service-status").textContent =
      `${selected.textContent.trim()} selected. ${data.description}`;
  }

  function showDialog(dialog) {
    document.querySelectorAll("dialog[open]").forEach((open) => open.close());
    document.querySelector(".mobile-menu").open = false;
    dialog.showModal();
  }

  function openProject(event) {
    const key = event.currentTarget.dataset.project;
    if (key === "noxen") {
      fillProject(
        "Noxen House®",
        "assets/synth-sky.png",
        "Brand direction inspired by an open horizon, playful industrial forms, and the quiet precision of a well-made instrument. An illustrative portfolio concept with original generated artwork.",
      );
      return;
    }
    const card = document.getElementById(key);
    fillProject(
      card.querySelector("h3").textContent,
      card.querySelector("img").getAttribute("src"),
      card.querySelector(".case-detail").textContent,
    );
  }

  function fillProject(title, image, description) {
    document.querySelector("#project-title").textContent = title;
    const art = document.querySelector("#project-art");
    art.hidden = false;
    art.src = image;
    art.alt = `${title} concept artwork`;
    document.querySelector("#project-description").textContent = description;
    showDialog(projectDialog);
  }

  function changeQuote(direction) {
    quoteIndex = (quoteIndex + direction + quotes.length) % quotes.length;
    document.querySelector("#quote-text").textContent = quotes[quoteIndex][0];
    document.querySelector("#quote-name").textContent = quotes[quoteIndex][1];
    document.querySelector("#quote-status").textContent =
      `Example testimonial ${quoteIndex + 1} of ${quotes.length}.`;
  }

  function download(text) {
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "verto-project-brief.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function exportBrief(event) {
    event.preventDefault();
    const name = brief.elements.project.value.trim();
    const notes = brief.elements.notes.value.trim();
    const status = document.querySelector("#brief-status");
    if (!name || !notes) {
      status.textContent =
        "Add a project name and a few notes before downloading.";
      brief.elements.notes.focus();
      return;
    }
    const text = `PROJECT BRIEF\n\n${name}\n\nService\n${brief.elements.service.value}\n\nNotes\n${notes}\n\nLocal Verto template draft. No message has been sent.\n`;
    try {
      download(text);
      status.textContent =
        "Download requested. Your notes are still here. No message was sent.";
    } catch {
      status.textContent =
        "Download unavailable. Your notes are still here; select and copy them manually.";
      brief.elements.notes.focus();
      brief.elements.notes.select();
    }
  }

  function artFailed(event) {
    event.currentTarget.hidden = true;
    document.querySelector("#media-status").textContent =
      "Some artwork could not load. The text and local examples remain available.";
  }

  document.querySelectorAll("[data-service]").forEach((button) => {
    button.addEventListener("click", chooseService);
    button.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") chooseService(event);
    });
  });
  document
    .querySelectorAll("[data-project]")
    .forEach((button) => button.addEventListener("click", openProject));
  document
    .querySelectorAll("[data-dialog]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        showDialog(document.getElementById(button.dataset.dialog)),
      ),
    );
  document
    .querySelectorAll("[data-close]")
    .forEach((button) =>
      button.addEventListener("click", () => button.closest("dialog").close()),
    );
  document.querySelectorAll(".mobile-menu a").forEach((link) =>
    link.addEventListener("click", () => {
      document.querySelector(".mobile-menu").open = false;
    }),
  );
  document
    .querySelector("#quote-previous")
    .addEventListener("click", () => changeQuote(-1));
  document
    .querySelector("#quote-next")
    .addEventListener("click", () => changeQuote(1));
  brief.addEventListener("submit", exportBrief);
  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", artFailed);
    if (image.complete && !image.naturalWidth)
      artFailed({ currentTarget: image });
  });
  document.querySelectorAll("button:not(#motion)").forEach((button) => {
    button.disabled = false;
  });
})();
