const detailDialog = document.querySelector("#detail-dialog");
const actionDialog = document.querySelector("#action-dialog");
const actionForm = document.querySelector("#action-form");
const actionName = document.querySelector("#action-name");
const actionAmount = document.querySelector("#action-amount");
const actionSubmit = document.querySelector("#action-submit");
const actionResult = document.querySelector("#action-result");
const search = document.querySelector("#search");
let actionKind = "send";
const panelContent = {
  notifications: [
    "You’re all caught up.",
    "This sample workspace has no live notifications. Explore the example transactions or set a local budget.",
  ],
  profile: [
    "Alex Morgan",
    "A fictional profile for this reusable dashboard. There is no login, membership, or personal financial information behind this account.",
  ],
  insight: [
    "A little progress adds up.",
    "The overview uses an illustrative +12.4% comparison. Income, outcome and savings are calculated from the selected sample ledger period. The trend chart is a separate example series.",
  ],
  goals: [
    "Make room for what matters.",
    "Two example goals: $1,200 of $1,800 for a laptop, and $450 of $3,000 for travel. Progress bars show rounded percentages; no funds have been reserved.",
  ],
  laptop: [
    "Buy MacBook Air",
    "Your sample goal is 67% complete. There is $600 left to reach the $1,800 target. This is an illustrative savings goal, not a linked account.",
  ],
  trip: [
    "Travel to Japan",
    "Your sample goal is 15% complete. There is $2,550 left to reach the $3,000 target. No travel is booked and no funds move in this preview.",
  ],
  cards: [
    "Your cards, in one place.",
    "Cards are not connected in this template. No payment number or account credentials are collected. Connect your own approved service when adapting this dashboard.",
  ],
  settings: [
    "Your sample workspace",
    "Currency: USD. Sample date: March 22, 2025. Changes stay in this page until reload. The eye beside Total Balance hides that figure, and the search field filters descriptions and categories.",
  ],
};
const actionContent = {
  send: [
    "Preview a transfer",
    "Use a fictional name to see a local transfer summary. Nothing will be sent.",
    "Recipient name",
    "Preview transfer",
  ],
  request: [
    "Draft a request",
    "Create a local request preview. No message or payment request leaves this page.",
    "Requested from",
    "Preview request",
  ],
  income: [
    "Add sample income",
    "This changes the example ledger on this page until reload. No account is connected.",
    "Income description",
    "Add sample income",
  ],
  budget: [
    "Set a sample budget",
    "Save a spending target in this page. No money is reserved or moved.",
    "Budget name",
    "Save sample budget",
  ],
};
function showDetails(title, copy, entries = []) {
  document.querySelector("#detail-title").textContent = title;
  document.querySelector("#detail-copy").textContent = copy;
  const list = document.querySelector("#detail-data");
  list.replaceChildren();
  entries.forEach(([label, value]) => {
    const term = document.createElement("dt");
    const detail = document.createElement("dd");
    term.textContent = label;
    detail.textContent = value;
    list.append(term, detail);
  });
  detailDialog.showModal();
}
function showPanel(key) {
  const content = panelContent[key];
  if (!content) return;
  showDetails(...content);
}
function renderSummary() {
  const values = totals();
  document.querySelectorAll("[data-amount]").forEach((element) => {
    element.textContent = money(values[element.dataset.amount]);
  });
  if (balanceHidden)
    document.querySelector('[data-amount="balance"]').textContent = "••••••";
  document.querySelectorAll("[data-period]").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.period === selectedPeriod),
    );
  });
}
function rowMatches(row) {
  const text =
    `${row.description} ${row.category} ${row.type} ${row.date}`.toLowerCase();
  return text.includes(search.value.trim().toLowerCase());
}
function filteredTransactions() {
  let rows = periodTransactions().filter(rowMatches);
  if (transactionFilter)
    rows = rows.filter((row) => row.type === transactionFilter);
  return rows.toSorted((a, b) => b.date.localeCompare(a.date));
}
function createRow(row) {
  const fragment = document
    .querySelector("#transaction-template")
    .content.cloneNode(true);
  fragment.querySelector(".transaction-type").classList.add(row.type);
  fragment.querySelector(".type-label").textContent =
    row.type === "income" ? "Received" : "Sent";
  fragment.querySelector(".description").textContent = row.description;
  fragment.querySelector(".category").textContent = row.category;
  const amount = fragment.querySelector(".amount");
  amount.textContent = `${row.type === "income" ? "+" : "−"} ${money(row.cents)}`;
  amount.classList.add(row.type);
  fragment.querySelector(".date").textContent = dateLabel(row.date);
  const button = fragment.querySelector("button");
  button.dataset.row = String(row.id);
  button.disabled = false;
  button.setAttribute("aria-label", `Details for ${row.description}`);
  return fragment;
}
function transactionTitle() {
  return (
    { income: "Income transactions", expense: "Outcome transactions" }[
      transactionFilter
    ] || "Recent Transactions"
  );
}
function renderTransactions() {
  document.querySelector("#transactions-title").textContent =
    transactionTitle();
  const rows = filteredTransactions();
  const shown = expanded || search.value.trim() ? rows : rows.slice(0, 5);
  document
    .querySelector("#transaction-rows")
    .replaceChildren(...shown.map(createRow));
  document.querySelector("#empty").hidden = rows.length > 0;
  document.querySelector("#table-note").textContent =
    `Showing ${shown.length} of ${rows.length} sample transactions · ${selectedPeriod}`;
  document.querySelector("#view-all").textContent = expanded
    ? "Show recent"
    : "View all";
  document
    .querySelector("#view-all")
    .setAttribute("aria-expanded", String(expanded));
}
function refresh() {
  renderSummary();
  renderTransactions();
}
function resetActionFeedback() {
  actionName.setCustomValidity("");
  actionResult.textContent = "";
  actionSubmit.disabled = false;
}
function openAction(kind) {
  const content = actionContent[kind];
  if (!content) return;
  if (kind !== actionKind) {
    actionForm.reset();
    resetActionFeedback();
  }
  actionKind = kind;
  document.querySelector("#action-title").textContent = content[0];
  document.querySelector("#action-intro").textContent = content[1];
  document.querySelector("#action-name-label").textContent = content[2];
  actionSubmit.textContent = content[3];
  actionDialog.showModal();
}
function addIncome(name, cents) {
  transactions.unshift({
    id: transactions.length,
    type: "income",
    description: name,
    category: "Income",
    cents,
    date: sampleDate,
  });
  selectedPeriod = "1Y";
  transactionFilter = "";
  search.value = "";
  refresh();
  return `${money(cents)} added to the sample ledger for “${name}”. Total balance is now ${money(totals().balance)}. Reload restores the original sample.`;
}
const actionHandlers = {
  send: (name, cents) =>
    `Example transfer: ${money(cents)} to ${name}. Nothing was sent. Your balance is unchanged.`,
  request: (name, cents) =>
    `Example request: ${money(cents)} from ${name}. No request or message was sent.`,
  income: addIncome,
  budget: (name, cents) => {
    budget = { name, cents };
    return `Sample budget saved: ${name}, ${money(cents)}. Choose Budgets to review it. Reload restores the original sample.`;
  },
};
function submitAction(event) {
  event.preventDefault();
  actionName.setCustomValidity(
    actionName.value.trim() ? "" : "Enter a name or description.",
  );
  if (!actionForm.reportValidity()) return;
  const cents = Math.round(actionAmount.valueAsNumber * 100);
  actionResult.textContent = actionHandlers[actionKind](
    actionName.value.trim(),
    cents,
  );
  actionSubmit.disabled = true;
}
function showTransaction(event) {
  const button = event.target.closest("[data-row]");
  if (!button) return;
  const row = transactions.find(
    (item) => item.id === Number(button.dataset.row),
  );
  if (!row) return;
  showDetails(row.description, "An illustrative entry in the sample ledger.", [
    ["Amount", money(row.cents)],
    ["Type", row.type === "income" ? "Received" : "Sent"],
    ["Category", row.category],
    ["Date", dateLabel(row.date)],
  ]);
}
function showBudget() {
  showDetails(
    budget.name,
    "This spending target is stored only on this page. Use Set Budget to replace it.",
    [
      ["Target", money(budget.cents)],
      ["Sample spending", money(totals().expense)],
      ["Period", selectedPeriod],
    ],
  );
}
function navigate(event) {
  const link = event.currentTarget;
  const target = link.dataset.nav;
  document
    .querySelectorAll("[data-nav]")
    .forEach((item) => item.removeAttribute("aria-current"));
  link.setAttribute("aria-current", "page");
  if (target === "budget") {
    event.preventDefault();
    showBudget();
    return;
  }
  if (panelContent[target] && target !== "goals") {
    event.preventDefault();
    showPanel(target);
    return;
  }
  document.querySelector(`#${target}`).focus({ preventScroll: true });
}
function hideBalance() {
  balanceHidden = !balanceHidden;
  const button = document.querySelector("#hide-balance");
  button.setAttribute("aria-pressed", String(balanceHidden));
  button.setAttribute(
    "aria-label",
    balanceHidden ? "Show total balance" : "Hide total balance",
  );
  renderSummary();
}
function selectMetric(key) {
  if (key === "savings") {
    showDetails(
      "Savings for this period",
      "Savings is the difference between the sample income and outcome; it is not a separate account.",
      [
        ["Income", money(totals().income)],
        ["Outcome", money(totals().expense)],
        ["Net savings", money(totals().savings)],
        ["Period", selectedPeriod],
      ],
    );
    return;
  }
  transactionFilter = transactionFilter === key ? "" : key;
  renderTransactions();
  document.querySelector("#transactions").scrollIntoView({ block: "nearest" });
  document.querySelector("#transactions").focus({ preventScroll: true });
}
function shortcut(event) {
  if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k")
    return;
  event.preventDefault();
  search.focus();
}
document.documentElement.classList.add("js");
document.querySelectorAll("button, select, input").forEach((control) => {
  control.disabled = false;
});
document
  .querySelectorAll("dialog .close")
  .forEach((button) =>
    button.addEventListener("click", () => button.closest("dialog").close()),
  );
document
  .querySelectorAll("[data-panel]")
  .forEach((button) =>
    button.addEventListener("click", () => showPanel(button.dataset.panel)),
  );
document
  .querySelectorAll("[data-action]")
  .forEach((button) =>
    button.addEventListener("click", () => openAction(button.dataset.action)),
  );
document
  .querySelectorAll("[data-nav]")
  .forEach((link) => link.addEventListener("click", navigate));
document.querySelectorAll("[data-period]").forEach((button) =>
  button.addEventListener("click", () => {
    selectedPeriod = button.dataset.period;
    refresh();
  }),
);
document
  .querySelectorAll("[data-metric]")
  .forEach((button) =>
    button.addEventListener("click", () => selectMetric(button.dataset.metric)),
  );
search.addEventListener("input", renderTransactions);
document.querySelector("#view-all").addEventListener("click", () => {
  expanded = !expanded;
  renderTransactions();
});
document
  .querySelector("#transaction-rows")
  .addEventListener("click", showTransaction);
document.querySelector("#hide-balance").addEventListener("click", hideBalance);
actionForm.addEventListener("submit", submitAction);
actionForm.addEventListener("input", resetActionFeedback);
document.addEventListener("keydown", shortcut);
const mountains = document.querySelector(".mountains");
function showArtFailure() {
  mountains.hidden = true;
  document.querySelector("#art-status").textContent =
    "Mountain artwork unavailable. Your sample dashboard still works.";
}
mountains.addEventListener("error", showArtFailure);
if (mountains.complete && !mountains.naturalWidth) showArtFailure();
refresh();
