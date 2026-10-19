const STORAGE_KEY = "semicolon-stamps-v1";

const stampCatalog = {
  sgn: { id: "sign", name: "수화 인식 장갑" },
  zom: { id: "zombie", name: "좀비 서바이벌" },
  fly: { id: "flight", name: "핸드트래킹 비행" },
  alg: { id: "defense", name: "알고리즘 디펜스" },
  led: { id: "moodlight", name: "무드등" }
};

const gameIds = ["zombie", "flight", "defense"];

function loadStamps() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return new Set(Array.isArray(value) ? value : []);
  } catch {
    return new Set();
  }
}

function saveStamps(stamps) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...stamps]));
}

function render(stamps, newestId = null) {
  document.querySelectorAll("[data-stamp]").forEach((card) => {
    const complete = stamps.has(card.dataset.stamp);
    card.classList.toggle("is-complete", complete);
    card.classList.toggle("just-completed", card.dataset.stamp === newestId);
    const status = card.querySelector(".status");
    if (status) status.textContent = complete ? "완료" : "미완료";
  });

  const completedGames = gameIds.filter((id) => stamps.has(id)).length;
  document.querySelector(".game-progress").textContent = `${Math.min(completedGames, 2)}/2 완료`;

  const requiredComplete = stamps.has("sign") && stamps.has("moodlight");
  const allComplete = requiredComplete && completedGames >= 2;
  document.querySelector(".completion").hidden = !allComplete;
}

function showToast(name) {
  const toast = document.querySelector(".toast");
  toast.querySelector(".toast-title").textContent = name;
  toast.hidden = false;
  window.setTimeout(() => { toast.hidden = true; }, 2800);
}

const stamps = loadStamps();
const params = new URLSearchParams(window.location.search);
const scanned = stampCatalog[params.get("stamp")];
let newestId = null;

if (scanned && !stamps.has(scanned.id)) {
  stamps.add(scanned.id);
  saveStamps(stamps);
  newestId = scanned.id;
  window.setTimeout(() => showToast(scanned.name), 250);
}

render(stamps, newestId);

if (params.has("stamp")) {
  history.replaceState({}, "", `${location.pathname}${location.hash}`);
}

