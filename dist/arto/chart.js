const chartSeries = [
  2400, 2390, 2400, 2590, 2690, 2650, 2600, 2810, 2870, 2820, 2780, 3050, 3270,
  3190, 3090, 3510, 3908, 3710, 3390, 3780, 3908,
];
const chartSvg = document.querySelector("#balance-chart");
const chartRange = document.querySelector("#chart-day");
const chartPeriod = document.querySelector("#chart-period");
let chartValues = chartSeries;
let chartOffset = 0;
function pointAt(index) {
  return {
    x: 42 + (index * 328) / (chartValues.length - 1),
    y: 240 - (chartValues[index] * 215) / 5000,
  };
}
function renderPoint() {
  const index = Number(chartRange.value);
  const point = pointAt(index);
  const label = dateLabel(
    `2025-03-${String(2 + chartOffset + index).padStart(2, "0")}`,
  );
  document
    .querySelector("#chart-crosshair")
    .setAttribute("d", `M${point.x} 25V240`);
  ["#chart-dot", "#chart-halo"].forEach((selector) => {
    document.querySelector(selector).setAttribute("cx", point.x);
    document.querySelector(selector).setAttribute("cy", point.y);
  });
  const tooltip = document.querySelector("#chart-tooltip");
  tooltip.style.left = `${Math.min(84, Math.max(19, (point.x / 380) * 100))}%`;
  tooltip.style.top = `${Math.max(0, (point.y / 270) * chartSvg.clientHeight - 47)}px`;
  tooltip.querySelector("strong").textContent = money(
    chartValues[index] * 100,
  ).replace(".00", "");
  tooltip.querySelector("small").textContent = label;
  document.querySelector("#chart-reading").textContent =
    `${label}: ${money(chartValues[index] * 100)}`;
  chartRange.setAttribute(
    "aria-valuetext",
    `${label}: ${money(chartValues[index] * 100)}`,
  );
}
function curveSegment(previous, current) {
  const middle = (previous.x + current.x) / 2;
  return `C${middle} ${previous.y} ${middle} ${current.y} ${current.x} ${current.y}`;
}
function renderChart() {
  const points = chartValues.map((value, index) => pointAt(index));
  const line = points
    .map((point, index) =>
      index ? curveSegment(points[index - 1], point) : `M${point.x} ${point.y}`,
    )
    .join("");
  document.querySelector("#chart-line").setAttribute("d", line);
  document.querySelector("#chart-area").setAttribute("d", `${line}V240H42Z`);
  document.querySelectorAll(".chart-dates text").forEach((label, index) => {
    label.textContent = `Mar ${2 + chartOffset + Math.round((index * (chartValues.length - 1)) / 4)}`;
  });
  document.querySelector("#chart-accessible-description").textContent =
    `Illustrative balance from ${money(chartValues[0] * 100)} to ${money(chartValues.at(-1) * 100)}. Use the day slider to inspect each value.`;
  chartRange.max = chartValues.length - 1;
  chartRange.value = 16 - chartOffset;
  renderPoint();
}
function changeChartPeriod() {
  chartOffset = (3 - Number(chartPeriod.value)) * 7;
  chartValues = chartSeries.slice(chartOffset);
  renderChart();
}
function inspectPoint(event) {
  const bounds = chartSvg.getBoundingClientRect();
  const x = ((event.clientX - bounds.left) / bounds.width) * 380;
  chartRange.value = Math.round(
    Math.max(0, Math.min(1, (x - 42) / 328)) * (chartValues.length - 1),
  );
  renderPoint();
}
chartPeriod.addEventListener("change", changeChartPeriod);
chartRange.addEventListener("input", renderPoint);
chartSvg.addEventListener("pointermove", inspectPoint);
chartSvg.addEventListener("click", inspectPoint);
window.addEventListener("resize", renderPoint);
renderChart();
