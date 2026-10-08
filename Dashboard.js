// ========================================
// RIFT DASHBOARD JAVASCRIPT
// ========================================


// GET LOGGED-IN LEADER
const leaderName = localStorage.getItem("riftLoggedIn");


// IF NOT LOGGED IN → RETURN TO LOGIN
if (!leaderName) {
  window.location.href = "index.html";
}


// SHOW LEADER NAME
const leaderElement = document.getElementById("leaderName");

if (leaderElement) {
  leaderElement.textContent = leaderName;
}


// ========================================
// LOAD SAVED DATA
// ========================================

let balance =
  Number(localStorage.getItem("riftBalance")) || 0;

let depositTotal =
  Number(localStorage.getItem("riftDeposits")) || 0;

let withdrawTotal =
  Number(localStorage.getItem("riftWithdrawals")) || 0;

let spentTotal =
  Number(localStorage.getItem("riftSpent")) || 0;


// LOAD TRANSACTIONS
let transactions =
  JSON.parse(localStorage.getItem("riftTransactions")) || [];


// ========================================
// SAVE DATA
// ========================================

function saveData() {

  localStorage.setItem(
    "riftBalance",
    balance
  );

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
// UPDATE DASHBOARD
// ========================================

function updateDashboard() {

  const balanceElement =
    document.getElementById("balance");

  const depositElement =
    document.getElementById("depositTotal");

  const withdrawElement =
    document.getElementById("withdrawTotal");

  const spentElement =
    document.getElementById("spentTotal");


  if (balanceElement) {
    balanceElement.textContent =
      money(balance);
  }


  if (depositElement) {
    depositElement.textContent =
      money(depositTotal);
  }


  if (withdrawElement) {
    withdrawElement.textContent =
      money(withdrawTotal);
  }


  if (spentElement) {
    spentElement.textContent =
      money(spentTotal);
  }


  displayTransactions();

}


// ========================================
// ADD TRANSACTION
// ========================================

function addTransaction(
  type,
  amount
) {

  transactions.unshift({

    type: type,

    amount: amount,

    time: new Date().toLocaleString()

  });


  // Keep only latest 10
  transactions =
    transactions.slice(0, 10);

}


// ========================================
// DEPOSIT
// ========================================

function depositMoney() {

  const input =
    document.getElementById(
      "depositAmount"
    );

  const message =
    document.getElementById(
      "depositMessage"
    );


  const amount =
    Number(input.value);


  // CHECK AMOUNT
  if (!amount || amount <= 0) {

    message.textContent =
      "⚠️ Enter a valid amount.";

    message.style.color =
      "#d97706";

    return;
  }


  // ADD MONEY
  balance += amount;

  depositTotal += amount;


  // ADD TRANSACTION
  addTransaction(
    "deposit",
    amount
  );


  // SAVE
  saveData();


  // UPDATE
  updateDashboard();


  // MESSAGE
  message.textContent =
    "✅ Deposited " + money(amount);

  message.style.color =
    "#16a34a";


  // CLEAR INPUT
  input.value = "";

}


// ========================================
// WITHDRAW
// ========================================

function withdrawMoney() {

  const input =
    document.getElementById(
      "withdrawAmount"
    );

  const message =
    document.getElementById(
      "withdrawMessage"
    );


  const amount =
    Number(input.value);


  // CHECK AMOUNT
  if (!amount || amount <= 0) {

    message.textContent =
      "⚠️ Enter a valid amount.";

    message.style.color =
      "#d97706";

    return;
  }


  // CHECK BALANCE
  if (amount > balance) {

    message.textContent =
      "❌ Insufficient RIFT funds.";

    message.style.color =
      "#dc2626";

    return;
  }


  // REMOVE MONEY
  balance -= amount;

  withdrawTotal += amount;


  // ADD TRANSACTION
  addTransaction(
    "withdraw",
    amount
  );


  // SAVE
  saveData();


  // UPDATE
  updateDashboard();


  // MESSAGE
  message.textContent =
    "✅ Withdrawn " + money(amount);

  message.style.color =
    "#16a34a";


  // CLEAR INPUT
  input.value = "";

}


// ========================================
// DISPLAY TRANSACTIONS
// ========================================

function displayTransactions() {

  const list =
    document.getElementById(
      "transactionList"
    );


  if (!list) return;


  // NO TRANSACTIONS
  if (transactions.length === 0) {

    list.innerHTML = `
      <div class="transaction">

        <span class="transaction-icon">
          ⚡
        </span>

        <div>

          <strong>
            RIFT Account
          </strong>

          <small>
            No transactions yet
          </small>

        </div>

        <span>
          —
        </span>

      </div>
    `;

    return;
  }


  // CREATE TRANSACTIONS
  list.innerHTML =
    transactions.map(transaction => {

      let icon = "⚡";

      let sign = "";

      if (transaction.type === "deposit") {

        icon = "📥";

        sign = "+";

      }

      if (transaction.type === "withdraw") {

        icon = "📤";

        sign = "-";

      }


      return `

        <div class="transaction">

          <span class="transaction-icon">
            ${icon}
          </span>

          <div>

            <strong>
              ${transaction.type === "deposit"
                ? "Deposit"
                : "Withdrawal"}
            </strong>

            <small>
              ${transaction.time}
            </small>

          </div>

          <strong>
            ${sign}${money(transaction.amount)}
          </strong>

        </div>

      `;

    }).join("");

}


// ========================================
// NAVIGATION
// ========================================

function openPage(page) {

  window.location.href = page;

}


// ========================================
// LOGOUT
// ========================================

function logout() {

  localStorage.removeItem(
    "riftLoggedIn"
  );

  window.location.href =
    "index.html";

}


// ========================================
// START DASHBOARD
// ========================================

updateDashboard();
