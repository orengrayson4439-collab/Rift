// ⚡ RIFT — Fictional Account System

const accounts = [
  { nation: "Aledonia", leader: "Fedorov Anatoly", balance: 3083.82, code: "RIFT-ALED-3083" },
  { nation: "Akrius", leader: "Dricko", balance: 1103.77, code: "RIFT-AKRI-1103" },
  { nation: "Argentine Republic", leader: "Mosquito", balance: 769.00, code: "RIFT-ARGN-0769" },
  { nation: "Bearland", leader: "Bearie Bearson", balance: 3127.00, code: "RIFT-BEAR-3127" },
  { nation: "Brimloth", leader: "Ace", balance: 1588.00, code: "RIFT-BRIM-1588" },
  { nation: "France Antique", leader: "Antoine I", balance: 1587.91, code: "RIFT-FRAN-1587" },
  { nation: "Gloriana", leader: "Gentle", balance: 1726.66, code: "RIFT-GLOR-1726" },
  { nation: "Koloria", leader: "King Astro", balance: 519.44, code: "RIFT-KOLO-0519" },
  { nation: "Nekromanci", leader: "v558", balance: 3488.50, code: "RIFT-NEKR-3488" },
  { nation: "Riedeland", leader: "Franzz", balance: 3187.83, code: "RIFT-RIED-3187" },
  { nation: "Royal Kingdom", leader: "Enzo", balance: 1879.87, code: "RIFT-ROYA-1879" },
  { nation: "Sprunki", leader: "Cristo", balance: 638.66, code: "RIFT-SPRU-0638" }
];


// 🔤 Sort A → Z
accounts.sort((a, b) =>
  a.nation.localeCompare(b.nation)
);


// 🔎 Search accounts
function searchAccounts() {

  const search = document
    .getElementById("searchBar")
    .value
    .toLowerCase();

  const results = accounts.filter(account =>
    account.nation.toLowerCase().includes(search) ||
    account.leader.toLowerCase().includes(search)
  );

  showAccounts(results);
}


// 📋 Display accounts
function showAccounts(list = accounts) {

  const accountList =
    document.getElementById("accountList");

  accountList.innerHTML = "";

  list.forEach(account => {

    const card = document.createElement("div");

    card.className = "account";

    card.innerHTML = `
      <h3>🏳️ ${account.nation}</h3>
      <p>👤 ${account.leader}</p>

      <button onclick="login('${account.nation}')">
        ⚡ Login
      </button>
    `;

    accountList.appendChild(card);
  });
}


// 🔐 Login with RIFT code
function login(nation) {

  const account = accounts.find(
    a => a.nation === nation
  );

  if (!account) return;

  const enteredCode = prompt(
    "🔐 Enter your RIFT code for " + account.nation
  );

  if (enteredCode !== account.code) {

    alert("❌ Wrong RIFT code!");

    return;
  }

  localStorage.setItem(
    "riftAccount",
    account.nation
  );

  alert(
    "⚡ LOGIN SUCCESSFUL!\n\n" +
    account.nation
  );

  openDashboard(account);
}


// 🏦 Open account
function openDashboard(account) {

  document.getElementById("loginScreen").style.display =
    "none";

  document.getElementById("dashboard").style.display =
    "block";

  document.getElementById("accountName").textContent =
    account.nation;

  document.getElementById("leaderName").textContent =
    "👤 " + account.leader;

  document.getElementById("money").textContent =
    "$" + account.balance.toFixed(2);
}


// 🚪 Logout
function logout() {

  localStorage.removeItem("riftAccount");

  document.getElementById("dashboard").style.display =
    "none";

  document.getElementById("loginScreen").style.display =
    "block";

  alert("🚪 Logged out of RIFT!");

  showAccounts();
}


// 🚀 Start RIFT
showAccounts();<script src="script.js"></script>
