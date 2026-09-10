const sampleDate = "2025-03-22";
const openingBalance = 210300;
const transactions = [
  {
    id: 0,
    type: "income",
    description: "Freelance Payment",
    category: "Income",
    cents: 150000,
    date: "2025-03-22",
  },
  {
    id: 1,
    type: "expense",
    description: "Spotify Premium",
    category: "Entertainment",
    cents: 999,
    date: "2025-03-22",
  },
  {
    id: 2,
    type: "expense",
    description: "Wire Transfer",
    category: "Transfer",
    cents: 20000,
    date: "2025-03-21",
  },
  {
    id: 3,
    type: "income",
    description: "Client Payment",
    category: "Income",
    cents: 85000,
    date: "2025-03-20",
  },
  {
    id: 4,
    type: "expense",
    description: "PayPal",
    category: "Transfer",
    cents: 12000,
    date: "2025-03-19",
  },
  {
    id: 5,
    type: "income",
    description: "Design Retainer",
    category: "Income",
    cents: 154800,
    date: "2025-02-20",
  },
  {
    id: 6,
    type: "expense",
    description: "Studio Rent",
    category: "Workspace",
    cents: 80000,
    date: "2025-03-01",
  },
  {
    id: 7,
    type: "expense",
    description: "Equipment",
    category: "Workspace",
    cents: 96301,
    date: "2025-01-10",
  },
];
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const periodDays = { "7D": 7, "30D": 30, "3M": 90, "6M": 180, "1Y": 365 };
let selectedPeriod = "1Y";
let transactionFilter = "";
let expanded = false;
let balanceHidden = false;
let budget = { name: "Monthly spending", cents: 250000 };
function money(cents) {
  return currency.format(cents / 100);
}
function dateLabel(date) {
  return dayFormat.format(new Date(date + "T12:00:00Z"));
}
function periodTransactions() {
  const cutoff =
    Date.parse(sampleDate) - (periodDays[selectedPeriod] - 1) * 86400000;
  return transactions.filter((row) => Date.parse(row.date) >= cutoff);
}
function sumType(rows, type) {
  return rows
    .filter((row) => row.type === type)
    .reduce((total, row) => total + row.cents, 0);
}
function totals() {
  const rows = periodTransactions();
  const income = sumType(rows, "income");
  const expense = sumType(rows, "expense");
  const current =
    openingBalance +
    sumType(transactions, "income") -
    sumType(transactions, "expense");
  return { balance: current, income, expense, savings: income - expense };
}
