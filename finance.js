// ========================================
// RIFT FINANCE JAVASCRIPT
// ========================================

// Check login
const leaderName = localStorage.getItem("riftLoggedIn");

if (!leaderName) {
  window.location.href = "index.html";
}


// ========================================
// LOAD RIFT FINANCIAL DATA
// ========================================

let balance = Number(localStorage.getItem("riftBalance")) || 0;
let depositTotal = Number(localStorage.getItem("riftDeposits")) || 0;
let withdrawTotal = Number(localStorage.getItem("riftWithdrawals")) || 0;
let spentTotal = Number(localStorage.getItem("riftSpent")) || 0;

let transactions =
  JSON.parse(localStorage.getItem("riftTransactions")) || [];


// ========================================
// SAVE DATA
// ========================================

function saveData() {

  localStorage.setItem("riftBalance", balance);

  localStorage.setItem(
    "riftDeposits",
    depositTotal
  );

  localStorage.setItem(
    "riftWithdrawals",
    withdrawTotal
  );

  localStorage.setItem(
    "riftSpent",
    spentTotal
  );

  localStorage.setItem(
    "riftTransactions",
    JSON.stringify(transactions)
  );
}


// ========================================
// MONEY FORMAT
// ========================================

function money(amount) {

  return "$" + amount.toLocaleString();

}


// ========================================
// UPDATE FINANCE PAGE
// ========================================

function updateFinance() {

  const balanceElement =
    document.getElementById("financeBalance");

  const depositsElement =
    document.getElementById("financeDeposits");

  const withdrawalsElement =
    document.getElementById("financeWithdrawals");

  const spentElement =
    document.getElementById("financeSpent");


  if (balanceElement) {
    balanceElement.textContent = money(balance);
  }

  if (depositsElement) {
    depositsElement.textContent = money(depositTotal);
  }

  if (withdrawalsElement) {
    withdrawalsElement.textContent = money(withdrawTotal);
  }

  if (spentElement) {
    spentElement.textContent = money(spentTotal);
  }


  displayFinanceTransactions();

}


// ========================================
// ADD TRANSACTION
// ========================================

function addTransaction(type, amount, reason) {

  transactions.unshift({

    type: type,

    amount: amount,

    reason: reason,

    time: new Date().toLocaleString()

  });


  // Keep last 20 transactions

  transactions =
    transactions.slice(0, 20);

}


// ========================================
// SPEND MONEY
// ========================================

function spendMoney() {

  const amountInput =
    document.getElementById("spendAmount");

  const reasonInput =
    document.getElementById("spendReason");

  const message =
    document.getElementById("spendMessage");


  const amount =
    Number(amountInput.value);

  const reason =
    reasonInput.value.trim();


  if (!amount || amount <= 0) {

    message.textContent =
      "⚠️ Enter a valid spending amount.";

    message.style.color = "#dc2626";

    return;
  }


  if (amount > balance) {

    message.textContent =
      "❌ Not enough RIFT funds.";

    message.style.color = "#dc2626";

    return;
  }


  if (!reason) {

    message.textContent =
      "⚠️ Enter what the money was spent on.";

    message.style.color = "#d97706";

    return;
  }


  // Remove money

  balance -= amount;

  spentTotal += amount;


  // Record transaction

  addTransaction(
    "spend",
    amount,
    reason
  );


  saveData();

  updateFinance();


  message.textContent =
    "✅ Spending recorded: " +
    money(amount);

  message.style.color = "#16a34a";


  amountInput.value = "";

  reasonInput.value = "";

}


// ========================================
// TRANSFER MONEY
// ========================================

function transferMoney() {

  const nationInput =
    document.getElementById("transferNation");

  const amountInput =
    document.getElementById("transferAmount");

  const message =
    document.get
