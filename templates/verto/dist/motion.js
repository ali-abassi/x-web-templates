(() => {
  const video = document.querySelector("#scene-video");
  const button = document.querySelector("#motion");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let paused = false;
  let sourceRequested = false;
  let frame = 0;

  function allowed() {
    return !paused && !reduced.matches && !document.hidden && !video.hidden;
  }

  function targetTime() {
    if (!Number.isFinite(video.duration) || !video.seekable.length) return 0;
    const range = Math.max(
      1,
      document.documentElement.scrollHeight - innerHeight,
    );
    const progress = Math.max(0, Math.min(1, scrollY / range));
    const end = video.seekable.end(video.seekable.length - 1);
    return Math.min(end, progress * Math.max(0, video.duration - 0.05));
  }

  function seek() {
    frame = 0;
    if (!allowed() || video.seeking) return;
    const target = targetTime();
    if (Math.abs(video.currentTime - target) < 0.04) return;
    video.currentTime = target;
  }

  function requestSeek() {
    if (frame) return;
    frame = requestAnimationFrame(seek);
  }

  function useSource(source) {
    video.src = source;
    video.preload = "auto";
    video.load();
  }

  async function fetchVideo() {
    const response = await fetch(video.dataset.src);
    if (!response.ok) throw new Error(`Video request failed: ${response.status}`);
    // Pages lacks byte ranges; a local Blob keeps this small clip seekable.
    useSource(URL.createObjectURL(await response.blob()));
  }

  function loadVideo() {
    if (!allowed() || sourceRequested) return;
    sourceRequested = true;
    if (location.protocol === "file:") {
      useSource(video.dataset.src);
      return;
    }
    fetchVideo().catch(failed);
  }

  function sync() {
    document.body.dataset.paused = String(!allowed());
    document.body.dataset.reduced = String(reduced.matches);
    button.textContent = paused ? "Resume motion" : "Pause motion";
    button.setAttribute("aria-pressed", String(paused));
    cancelAnimationFrame(frame);
    frame = 0;
    loadVideo();
    requestSeek();
  }

  function toggle() {
    paused = !paused;
    sync();
  }

  function failed() {
    video.hidden = true;
    document.querySelector("#media-status").textContent =
      "Motion could not load. The still portrait and all page features remain available.";
    sync();
  }

  video.addEventListener("loadeddata", () => {
    video.classList.add("ready");
    requestSeek();
  });
  video.addEventListener("seeked", requestSeek);
  video.addEventListener("progress", requestSeek);
  video.addEventListener("error", failed);
  addEventListener("scroll", requestSeek, { passive: true });
  addEventListener("resize", requestSeek);
  document.addEventListener("visibilitychange", sync);
  reduced.addEventListener("change", sync);
  button.addEventListener("click", toggle);
  button.disabled = false;
  document.body.classList.add("motion-ready");
  sync();
})();
