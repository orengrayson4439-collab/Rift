// ========================================
// RIFT PROFILE JAVASCRIPT
// ========================================

// Check login
const leaderName = localStorage.getItem("riftLoggedIn");

if (!leaderName) {
  window.location.href = "index.html";
}


// ========================================
// RIFT ACCOUNT CODES
// ========================================

const riftCodes = {
  "Aledonia": "RIFT-ALED-3083",
  "Akrius": "RIFT-AKRI-1103",
  "Argentine Republic": "RIFT-ARGN-0769",
  "Babadare empire": "RIFT-BABA-0645",
  "Bearland": "RIFT-BEAR-3127",
  "Berylux": "RIFT-BERY-3669",
  "Big Shot Autos": "RIFT-BIGS-1150",
  "Brimloth": "RIFT-BRIM-1588",
  "Caldeff": "RIFT-CALD-1445",
  "Damesk": "RIFT-DAME-3907",
  "Dennys": "RIFT-DENN-3849",
  "Destinyah": "RIFT-DEST-3768",
  "Ecclesia Christi": "RIFT-ECCL-0769",
  "Egypt2": "RIFT-EGY2-1592",
  "Forges": "RIFT-FORG-3732",
  "France Antique": "RIFT-FRAN-1587",
  "freeport": "RIFT-FREE-0897",
  "Galleron": "RIFT-GALL-0972",
  "Gloriana": "RIFT-GLOR-1726",
  "Hehasajust": "RIFT-HEHA-3888",
  "Hollow Legion": "RIFT-HOLL-2563",
  "Islandia": "RIFT-ISLA-1013",
  "Isle of Nukututaha": "RIFT-ISLE-1227",
  "Khazak Republic": "RIFT-KHAZ-2233",
  "Koloria": "RIFT-KOLO-0519",
  "Korovia": "RIFT-KORO-3151",
  "Kukulcantis": "RIFT-KUKU-3922",
  "Kurfuerstentum Trier": "RIFT-KURF-0789",
  "Maghreb Kingdom": "RIFT-MAGH-0833",
  "Maxopolis": "RIFT-MAXO-0000",
  "Moldavian Republic": "RIFT-MOLD-3870",
  "Mushahada": "RIFT-MUSH-2955",
  "National Federation": "RIFT-NATI-3851",
  "Nekromanci": "RIFT-NEKR-3488",
  "Noderianien": "RIFT-NODE-3143",
  "Noxara": "RIFT-NOXA-3870",
  "Ostlands": "RIFT-OSTL-3773",
  "Pax Union": "RIFT-PAXU-3157",
  "Phokeng": "RIFT-PHOK-0748",
  "Riedeland": "RIFT-RIED-3187",
  "Rising lions": "RIFT-RISI-1083",
  "Rodenius": "RIFT-RODE-2640",
  "Royal Kingdom": "RIFT-ROYA-1879",
  "Schizophrenia State": "RIFT-SCHI-2762",
  "Seraphid Empire": "RIFT-SERA-0666",
  "Sgnaccola": "RIFT-SGNA-2867",
  "Shadow land": "RIFT-SHAD-1843",
  "South Pacific Island": "RIFT-SOUT-0759",
  "Sprunki": "RIFT-SPRU-0638",
  "Svea Imperie": "RIFT-SVEA-0674",
  "The Democratic Kampuchea": "RIFT-THEK-3920",
  "The Last Covenant": "RIFT-THEC-2892",
  "The Ministry of Overthinking": "RIFT-THEM-2287",
  "The Peoples Dominion Of Nova": "RIFT-THEP-3424",
  "The Republic of Ossetia": "RIFT-THER-0632",
  "The United States of Swag": "RIFT-THEU-1140",
  "TianZhao": "RIFT-TIAN-1042",
  "United Ecclesia Commonwealth": "RIFT-UNIT-1015",
  "United States of Liberty": "RIFT-UNIS-0745",
  "Valem VideriusValtoria": "RIFT-VALE-2574",
  "Velin collinland": "RIFT-VELI-3923",
  "Vocktollis": "RIFT-VOCK-0646",
  "Winnington Empire": "RIFT-WINN-2274",
  "zezapur": "RIFT-ZEZA-1213"
};


// ========================================
// FIND NATION
// ========================================

const nation = leaderName;


// ========================================
// LOAD FINANCIAL DATA
// ========================================

const balance =
  Number(localStorage.getItem("riftBalance")) || 0;

const deposits =
  Number(localStorage.getItem("riftDeposits")) || 0;

const withdrawals =
  Number(localStorage.getItem("riftWithdrawals")) || 0;

const spent =
  Number(localStorage.getItem("riftSpent")) || 0;


// ========================================
// MONEY FORMAT
// ========================================

function money(amount) {
  return "$" + amount.toLocaleString();
}


// ========================================
// DISPLAY PROFILE
// ========================================

function loadProfile() {

  const profileName =
    document.getElementById("profileName");

  const leaderElement =
    document.getElementById("leaderName");

  const nationElement =
    document.getElementById("nationName");

  const codeElement =
    document.getElementById("riftCode");


  if (profileName) {
    profileName.textContent = nation;
  }

  if (leaderElement) {
    leaderElement.textContent = leaderName;
  }

  if (nationElement) {
    nationElement.textContent = nation;
  }


  if (codeElement) {

    codeElement.textContent =
      riftCodes[nation] || "RIFT CODE NOT FOUND";

  }


  document.getElementById(
    "profileBalance"
  ).textContent = money(balance);

  document.getElementById(
    "profileDeposits"
  ).textContent = money(deposits);

  document.getElementById(
    "profileWithdrawals"
  ).textContent = money(withdrawals);

  document.getElementById(
    "profileSpent"
  ).textContent = money(spent);

}


// ========================================
// NAVIGATION
// ========================================

function openPage(page) {
  window.location.href = page;
}


// ========================================
// LOG OUT
// ========================================

function logout() {

  localStorage.removeItem(
    "riftLoggedIn"
  );

  window.location.href =
    "index.html";

}


// ========================================
// START
// ========================================

loadProfile();
