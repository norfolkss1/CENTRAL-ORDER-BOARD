/* global firebase, FIREBASE_CONFIG, CATEGORIES, SEED_RECIPES, COSTING_DATA, COSTING_TARGET_PCT, COSTING_MULTIPLIER, ESTIMATED_COSTING_DATA */

/* ============================== Firebase ============================== */
firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.firestore();
const ALLERGEN_LABELS = { D: "Dairy", G: "Gluten", S: "Seafood", Sh: "Shellfish", N: "Nuts", V: "Vegetarian", Vg: "Vegan", P: "Pork", Soy: "Soy" };

/* ============================== State ============================== */
const state = {
  role: null,      // 'user' | 'admin'
  name: "",
  categories: [],
  recipes: [],
  requests: [],
  pins: { user: "4671", admin: "2580" },
  query: "",
  activeCat: "all",
  showFavoritesOnly: false,
  viewMode: "dishes", // 'dishes' | 'components'
  selectedRecipeId: null,
  selectedComponentKey: null,
  activeDetailTab: 0,
  favorites: JSON.parse(localStorage.getItem("me-recipe-favs") || "[]"),
  adminOpen: false,
  adminTab: "requests",
  pendingImageDataUrl: null,
  costingRecipeId: null,
  editFormOpen: false,
  newRecipeFormOpen: false,
};

/* ============================== Status banner ============================== */
function showStatus(msg, type) {
  const el = document.getElementById("status-banner");
  el.innerHTML = msg;
  el.className = type === "info" ? "info" : "";
  el.classList.remove("hidden");
}
function hideStatus() {
  document.getElementById("status-banner").classList.add("hidden");
}
function connectionErrorMsg(err) {
  return `Couldn't reach the recipe database (${escapeHtml(err && err.message ? err.message : String(err))}).
    This usually means Firestore Database hasn't been created yet for this Firebase project, or its rules
    don't allow access. See the README "Deployment" steps.`;
}

/* ============================== Boot ============================== */
document.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("me-recipe-session") || "null");
  showStatus("Connecting to the recipe database…", "info");
  ensureConfigDoc().then(() => {
    hideStatus();
    listenPins();
    if (saved && saved.role) {
      state.role = saved.role;
      state.name = saved.name;
      enterApp();
    } else {
      showGate();
    }
  }).catch((err) => {
    showStatus(connectionErrorMsg(err));
    showGate();
  });

  document.getElementById("gate-unlock-btn").addEventListener("click", handleUnlock);
  document.getElementById("gate-pin").addEventListener("keydown", (e) => { if (e.key === "Enter") handleUnlock(); });
  document.getElementById("search-input").addEventListener("input", (e) => { state.query = e.target.value; renderBody(); });
  document.getElementById("lock-btn").addEventListener("click", lockApp);
  document.getElementById("admin-open-btn").addEventListener("click", () => openAdmin("requests"));
  document.getElementById("my-requests-btn").addEventListener("click", () => openAdmin("mine"));
  document.getElementById("modal-backdrop").addEventListener("click", (e) => {
    if (e.target.id === "modal-backdrop") closeModal();
  });
  document.getElementById("drawer-backdrop").addEventListener("click", (e) => {
    if (e.target.id === "drawer-backdrop") closeAdmin();
  });
});

async function ensureConfigDoc() {
  const ref = db.collection("config").doc("access");
  const snap = await ref.get();
  if (!snap.exists) await ref.set({ userPin: "4671", adminPin: "2580" });
}
function listenPins() {
  db.collection("config").doc("access").onSnapshot(
    (snap) => {
      if (snap.exists) state.pins = { user: snap.data().userPin, admin: snap.data().adminPin };
    },
    (err) => showStatus(connectionErrorMsg(err))
  );
}

/* ============================== Gate ============================== */
function showGate() {
  document.getElementById("gate-screen").classList.remove("hidden");
  document.getElementById("app-shell").classList.add("hidden");
}
function handleUnlock() {
  const name = document.getElementById("gate-name").value.trim();
  const pin = document.getElementById("gate-pin").value.trim();
  const errEl = document.getElementById("gate-error");
  if (!name) { errEl.textContent = "Please enter your name."; return; }
  let role = null;
  if (pin === state.pins.admin) role = "admin";
  else if (pin === state.pins.user) role = "user";
  if (!role) { errEl.textContent = "That code isn't recognized — check with your manager."; return; }
  errEl.textContent = "";
  state.role = role;
  state.name = name;
  localStorage.setItem("me-recipe-session", JSON.stringify({ role, name }));
  enterApp();
}
function lockApp() {
  localStorage.removeItem("me-recipe-session");
  state.role = null;
  location.reload();
}

/* ============================== Enter app ============================== */
function enterApp() {
  document.getElementById("gate-screen").classList.add("hidden");
  document.getElementById("app-shell").classList.remove("hidden");
  document.getElementById("who-am-i").textContent = `${state.name} · ${state.role === "admin" ? "Admin" : "Kitchen staff"}`;
  document.getElementById("admin-open-btn").classList.toggle("hidden", state.role !== "admin");

  listenCategories();
  listenRecipes();
  listenRequests();
}

function listenCategories() {
  db.collection("categories").get().then(async (snap) => {
    const existingIds = new Set(snap.docs.map((d) => d.id));
    const missing = CATEGORIES.filter((c) => !existingIds.has(c.id));
    if (missing.length) {
      const batch = db.batch();
      missing.forEach((c) => batch.set(db.collection("categories").doc(c.id), c));
      await batch.commit();
    }
    db.collection("categories").orderBy("order").onSnapshot(
      (s) => {
        state.categories = s.docs.map((d) => d.data());
        renderSidebarNav();
        renderBody();
      },
      (err) => showStatus(connectionErrorMsg(err))
    );
  }).catch((err) => showStatus(connectionErrorMsg(err)));
}

function listenRecipes() {
  db.collection("recipes").get().then(async (snap) => {
    const existingIds = new Set(snap.docs.map((d) => d.id));
    const missing = SEED_RECIPES.filter((r) => !existingIds.has(r.id));
    if (missing.length) {
      const batch = db.batch();
      missing.forEach((r) => {
        batch.set(db.collection("recipes").doc(r.id), {
          ...r,
          version: 1,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedBy: "seed",
        });
      });
      await batch.commit();
    }
    db.collection("recipes").onSnapshot(
      (s) => {
        state.recipes = s.docs.map((d) => ({ ...d.data(), id: d.id }));
        renderBody();
        if (state.selectedRecipeId && !state.editFormOpen) renderModal();
        if (state.adminOpen && !state.newRecipeFormOpen) renderAdmin();
      },
      (err) => showStatus(connectionErrorMsg(err))
    );
  }).catch((err) => showStatus(connectionErrorMsg(err)));
}

function listenRequests() {
  db.collection("requests").orderBy("createdAt", "desc").onSnapshot(
    (s) => {
      state.requests = s.docs.map((d) => ({ ...d.data(), id: d.id }));
      const pendingCount = state.requests.filter((r) => r.status === "pending").length;
      const badge = document.getElementById("req-badge");
      if (pendingCount > 0 && state.role === "admin") {
        badge.textContent = pendingCount;
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
      if (state.adminOpen && !state.newRecipeFormOpen) renderAdmin();
    },
    (err) => showStatus(connectionErrorMsg(err))
  );
}

/* ============================== View mode / navigation ============================== */
function setViewMode(mode) {
  state.viewMode = mode;
  document.getElementById("search-input").placeholder = mode === "dishes"
    ? "Search dishes, ingredients, method…"
    : "Search sauces, dressings, sub-recipes…";
}

function goToAllDishes() {
  state.viewMode = "dishes"; state.activeCat = "all"; state.showFavoritesOnly = false;
  setViewMode("dishes"); renderSidebarNav(); renderBody(); closeMobileSidebar();
}
function goToCategory(catId) {
  state.viewMode = "dishes"; state.activeCat = catId; state.showFavoritesOnly = false;
  setViewMode("dishes"); renderSidebarNav(); renderBody(); closeMobileSidebar();
}
function goToFavorites() {
  state.viewMode = "dishes"; state.activeCat = "all"; state.showFavoritesOnly = true;
  setViewMode("dishes"); renderSidebarNav(); renderBody(); closeMobileSidebar();
}
function goToAllRecipes() {
  state.viewMode = "components"; state.showFavoritesOnly = false;
  setViewMode("components"); renderSidebarNav(); renderBody(); closeMobileSidebar();
}
function closeMobileSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebar-scrim").classList.remove("open");
}

/* ============================== Sidebar nav ============================== */
function renderSidebarNav() {
  const wrap = document.getElementById("sidebar-nav");
  const counts = {};
  state.recipes.filter((r) => !r.archived).forEach((r) => { counts[r.category] = (counts[r.category] || 0) + 1; });
  const totalDishes = state.recipes.filter((r) => !r.archived).length;
  const isDishesAll = state.viewMode === "dishes" && state.activeCat === "all" && !state.showFavoritesOnly;
  const isFavs = state.viewMode === "dishes" && state.showFavoritesOnly;
  const isAllRecipes = state.viewMode === "components";

  wrap.innerHTML = "";
  wrap.appendChild(navItem({ icon: "🍽", label: "All Dishes", count: totalDishes, active: isDishesAll, onClick: goToAllDishes }));

  const label = document.createElement("div");
  label.className = "nav-section-label";
  label.textContent = "Categories";
  wrap.appendChild(label);
  state.categories.forEach((c) => {
    const active = state.viewMode === "dishes" && state.activeCat === c.id && !state.showFavoritesOnly;
    wrap.appendChild(navItem({ dot: true, label: c.label, count: counts[c.id] || 0, active, onClick: () => goToCategory(c.id) }));
  });

  const label2 = document.createElement("div");
  label2.className = "nav-section-label";
  label2.textContent = "Browse";
  wrap.appendChild(label2);
  wrap.appendChild(navItem({ icon: "★", label: "Favorites", count: state.favorites.length, active: isFavs, onClick: goToFavorites }));
  wrap.appendChild(navItem({ icon: "🧾", label: "All Recipes (flat list)", active: isAllRecipes, onClick: goToAllRecipes }));
}

function navItem({ icon, dot, label, count, active, onClick }) {
  const b = document.createElement("button");
  b.className = "nav-item" + (active ? " active" : "");
  b.innerHTML = `
    ${icon ? `<span>${icon}</span>` : dot ? `<span class="nav-dot"></span>` : ""}
    <span>${escapeHtml(label)}</span>
    ${count !== undefined ? `<span class="nav-count">${count}</span>` : ""}
  `;
  b.addEventListener("click", onClick);
  return b;
}

function updateContentTitle() {
  const el = document.getElementById("content-title");
  if (state.viewMode === "components") { el.textContent = "All Recipes"; return; }
  if (state.showFavoritesOnly) { el.textContent = "Favorites"; return; }
  if (state.activeCat === "all") { el.textContent = "All Dishes"; return; }
  const cat = state.categories.find((c) => c.id === state.activeCat);
  el.textContent = cat ? cat.label : "Dishes";
}

/* ============================== Body / grid ============================== */

function matchesSearch(r, q) {
  if (!q) return true;
  const hay = [
    r.nameEn, r.nameAr, r.chefNotes, r.platingNotes,
    ...(r.components || []).flatMap((c) => [c.title, ...(c.ingredients || []), ...(c.method || [])]),
  ].filter(Boolean).join(" ").toLowerCase();
  return hay.includes(q.toLowerCase());
}

function visibleRecipes() {
  const q = state.query.trim();
  let list = state.recipes.filter((r) => !r.archived);
  if (state.showFavoritesOnly) list = list.filter((r) => state.favorites.includes(r.id));
  if (q) list = list.filter((r) => matchesSearch(r, q));
  else if (state.activeCat !== "all") list = list.filter((r) => r.category === state.activeCat);
  return list;
}

function recipeStatus(r) {
  const draft = (r.components || []).some((c) => c.draft);
  return draft ? "draft" : "verified";
}

function renderBody() {
  updateContentTitle();
  if (state.viewMode === "components") renderComponentsBody();
  else renderDishesBody();
}

function renderDishesBody() {
  const body = document.getElementById("app-body-content");
  const list = visibleRecipes();
  const q = state.query.trim();

  document.getElementById("result-count").textContent = `${list.length} dish${list.length === 1 ? "" : "es"}${q ? ` for "${q}"` : ""}`;
  document.getElementById("result-count").classList.remove("hidden");

  body.innerHTML = "";

  if (list.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    if (state.showFavoritesOnly) {
      empty.textContent = "No favorites saved on this device yet — tap the star on a recipe to add one.";
    } else if (state.recipes.length === 0 && !q) {
      empty.innerHTML = "No recipes have loaded yet.<br>If this doesn't change in a few seconds, check the banner at the top of the page — it usually means Firestore Database hasn't been created for this project yet, or its rules are blocking access. See the README's step-by-step setup.";
    } else {
      empty.textContent = "Nothing matches yet. Try another dish, ingredient, or category.";
    }
    body.appendChild(empty);
    return;
  }

  const byCat = {};
  list.forEach((r) => { (byCat[r.category] = byCat[r.category] || []).push(r); });
  Object.values(byCat).forEach((arr) => arr.sort((a, b) => a.nameEn.localeCompare(b.nameEn)));

  const catsToShow = (q || state.activeCat === "all" || state.showFavoritesOnly)
    ? state.categories
    : state.categories.filter((c) => c.id === state.activeCat);
  const showHeaders = catsToShow.length > 1 || q || state.showFavoritesOnly;

  catsToShow.forEach((cat) => {
    const items = byCat[cat.id];
    if (!items || items.length === 0) return;
    const section = document.createElement("div");
    section.className = "section-block";
    section.innerHTML = showHeaders ? `
      <div class="section-head">
        <span class="section-title">${cat.label}</span>
        <span class="section-count">${items.length} dish${items.length === 1 ? "" : "es"}</span>
      </div>
      <div class="list-box"></div>
    ` : `<div class="list-box"></div>`;
    const box = section.querySelector(".list-box");
    items.forEach((r) => box.appendChild(dishListRowEl(r)));
    body.appendChild(section);
  });
}

function dishListRowEl(r) {
  const row = document.createElement("div");
  row.className = "list-row";
  const status = recipeStatus(r);
  const isFav = state.favorites.includes(r.id);
  row.innerHTML = `
    <span class="list-row-dot ${status === "draft" ? "draft" : ""}" title="${status === "draft" ? "Draft — needs review" : "Verified"}"></span>
    ${r.image ? `<img class="list-row-thumb" src="${r.image}" alt="">` : `<div class="list-row-thumb-fallback">${initials(r.nameEn)}</div>`}
    <span class="list-row-name">${escapeHtml(r.nameEn)}</span>
    <span class="list-row-sub">${allergenPillsHtml(r.allergens, r.allergensSource) || ""}</span>
    ${r.price != null ? `<span class="list-row-price">AED ${r.price}</span>` : ""}
    <button class="list-row-star${isFav ? " active" : ""}" data-fav="${r.id}" title="Favorite">★</button>
    <span class="list-chevron">›</span>
  `;
  row.querySelector("[data-fav]").addEventListener("click", (e) => { e.stopPropagation(); toggleFavorite(r.id); });
  row.addEventListener("click", () => openModal(r.id));
  return row;
}

/* ---- Recipes & components (flat sub-recipe catalog) ---- */
function computeComponentCatalog() {
  const map = new Map();
  state.recipes.filter((r) => !r.archived).forEach((r) => {
    (r.components || []).forEach((c, idx) => {
      const key = (c.title || "").trim().toLowerCase() + "|" + (c.ingredients || []).join("~") + "|" + (c.method || []).join("~");
      if (!map.has(key)) {
        map.set(key, {
          key,
          title: c.title || "Untitled",
          draft: !!c.draft,
          ingredients: c.ingredients || [],
          method: c.method || [],
          category: r.category,
          usedIn: [],
        });
      }
      const entry = map.get(key);
      entry.draft = entry.draft || !!c.draft;
      entry.usedIn.push({ recipeId: r.id, recipeName: r.nameEn, componentIndex: idx });
    });
  });
  return Array.from(map.values());
}

function matchesComponentSearch(entry, q) {
  if (!q) return true;
  const hay = [
    entry.title, ...entry.ingredients, ...entry.method,
    ...entry.usedIn.map((u) => u.recipeName),
  ].join(" ").toLowerCase();
  return hay.includes(q.toLowerCase());
}

function renderComponentsBody() {
  const body = document.getElementById("app-body-content");
  const q = state.query.trim();
  let list = computeComponentCatalog();
  if (q) list = list.filter((e) => matchesComponentSearch(e, q));
  else if (state.activeCat !== "all") list = list.filter((e) => e.category === state.activeCat);
  list.sort((a, b) => a.title.localeCompare(b.title));

  document.getElementById("result-count").textContent = `${list.length} item${list.length === 1 ? "" : "s"}${q ? ` for "${q}"` : ""}`;
  document.getElementById("result-count").classList.remove("hidden");

  body.innerHTML = "";

  if (list.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No sub-recipes match yet. Try another ingredient, sauce name, or dish it's used in.";
    body.appendChild(empty);
    return;
  }

  const section = document.createElement("div");
  section.className = "section-block";
  section.innerHTML = `<div class="list-box"></div>`;
  const box = section.querySelector(".list-box");
  list.forEach((e) => box.appendChild(componentListRowEl(e)));
  body.appendChild(section);
}

function componentListRowEl(entry) {
  const row = document.createElement("div");
  row.className = "list-row";
  const dishNames = [...new Set(entry.usedIn.map((u) => u.recipeName))];
  const parent = state.recipes.find((x) => x.id === entry.usedIn[0].recipeId);
  const img = parent && parent.image;
  row.innerHTML = `
    <span class="list-row-dot ${entry.draft ? "draft" : ""}" title="${entry.draft ? "Draft — needs review" : "Verified"}"></span>
    ${img ? `<img class="list-row-thumb" src="${img}" alt="">` : `<div class="list-row-thumb-fallback">${initials(entry.title)}</div>`}
    <span class="list-row-name">${escapeHtml(entry.title)}</span>
    <span class="list-row-sub">${escapeHtml(dishNames.join(", "))}</span>
    <span class="list-chevron">›</span>
  `;
  row.addEventListener("click", () => openComponentModal(entry.key));
  return row;
}

function initials(text) {
  return (text || "?").split(" ").filter((w) => w.length).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}


function allergenPillsHtml(codes, source) {
  if (!codes || codes.length === 0) return "";
  return codes.map((c) => `<span class="allergen-pill" title="${source === "unverified-menu" ? "Unverified — from guest menu" : ""}">${ALLERGEN_LABELS[c] || c}</span>`).join("");
}

function ingredientListHtml(items, keyPrefix) {
  if (!items || items.length === 0) return `<div class="hint-text" style="margin-top:0;">No ingredients listed.</div>`;
  return `<ul class="ingredient-list">${items.map((i, idx) => `
    <li class="ingredient-row" data-check-row="${keyPrefix}-${idx}">
      <input type="checkbox" id="chk-${keyPrefix}-${idx}">
      <label for="chk-${keyPrefix}-${idx}">${escapeHtml(i)}</label>
    </li>
  `).join("")}</ul>`;
}
function wireIngredientChecks() {
  document.querySelectorAll("[data-check-row]").forEach((row) => {
    const cb = row.querySelector("input[type=checkbox]");
    if (!cb) return;
    cb.addEventListener("change", () => row.classList.toggle("checked", cb.checked));
  });
}

function normalizeStep(s) {
  if (typeof s === "string") return { text: s, image: "", video: "" };
  return { text: s.text || "", image: s.image || "", video: s.video || "" };
}

function embedVideoHtml(url) {
  if (!url) return "";
  url = url.trim();
  try {
    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{6,})/);
    if (yt) {
      return `<div class="step-video"><div class="step-video-frame"><iframe src="https://www.youtube.com/embed/${yt[1]}" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div>`;
    }
    const vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm) {
      return `<div class="step-video"><div class="step-video-frame"><iframe src="https://player.vimeo.com/video/${vm[1]}" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div>`;
    }
    // Google Drive share links (e.g. .../file/d/FILEID/view) aren't playable video
    // files — they need Drive's own embeddable preview URL, not a <video> tag.
    const gd = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (gd) {
      return `<div class="step-video"><div class="step-video-frame"><iframe src="https://drive.google.com/file/d/${gd[1]}/preview" loading="lazy" allow="autoplay"></iframe></div></div>`;
    }
    // Only render a native <video> tag for links that actually look like a direct
    // video file — otherwise fall back to a plain link so it can never show a
    // blank/broken player (a common cause of a recipe looking like it "won't open").
    if (/\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(url)) {
      return `<div class="step-video"><video controls playsinline preload="metadata" src="${escapeHtml(url)}"></video></div>`;
    }
    return `<div class="step-video-link"><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">🎥 Watch video ↗</a></div>`;
  } catch (err) {
    return `<div class="step-video-link"><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">🎥 Watch video ↗</a></div>`;
  }
}

function methodListHtml(steps) {
  if (!steps || steps.length === 0) return `<div class="hint-text" style="margin-top:0;">No method listed.</div>`;
  return `<ol class="method-steps">${steps.map((raw) => {
    const s = normalizeStep(raw);
    return `
    <li class="method-step">
      <span class="method-step-num"></span>
      <div class="method-step-body">
        <span>${escapeHtml(s.text)}</span>
        ${s.image ? `<img class="step-photo" src="${s.image}" alt="" data-lightbox-src="${s.image}">` : ""}
        ${embedVideoHtml(s.video)}
      </div>
    </li>`;
  }).join("")}</ol>`;
}
function wireStepMedia() {
  document.querySelectorAll("[data-lightbox-src]").forEach((el) => {
    el.addEventListener("click", () => openLightbox(el.dataset.lightboxSrc));
  });
}

function toggleFavorite(id) {
  const i = state.favorites.indexOf(id);
  if (i >= 0) state.favorites.splice(i, 1); else state.favorites.push(id);
  localStorage.setItem("me-recipe-favs", JSON.stringify(state.favorites));
  renderSidebarNav();
  renderBody();
  if (state.selectedRecipeId === id) renderModal();
}

function escapeHtml(s) {
  return (s || "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}

/* ============================== Recipe modal ============================== */
function openModal(id) {
  state.selectedRecipeId = id;
  state.selectedComponentKey = null;
  state.activeDetailTab = 0;
  state.editFormOpen = false;
  renderModal();
  document.getElementById("modal-backdrop").classList.remove("hidden");
}
function openComponentModal(key) {
  state.selectedComponentKey = key;
  state.selectedRecipeId = null;
  renderModal();
  document.getElementById("modal-backdrop").classList.remove("hidden");
}
function closeModal() {
  state.selectedRecipeId = null;
  state.selectedComponentKey = null;
  state.editFormOpen = false;
  document.getElementById("modal-backdrop").classList.add("hidden");
}

function renderModal() {
  if (state.selectedComponentKey) renderComponentModal();
  else renderRecipeModal();
}

function renderComponentModal() {
  const entry = computeComponentCatalog().find((e) => e.key === state.selectedComponentKey);
  const wrap = document.getElementById("modal-card");
  if (!entry) { wrap.innerHTML = ""; return; }
  const dishNames = [...new Set(entry.usedIn.map((u) => u.recipeName))];
  const primary = entry.usedIn[0];

  wrap.innerHTML = `
    <button class="modal-close" id="modal-close-btn">✕</button>
    <div class="modal-img-fallback">${initials(entry.title)}</div>
    <div class="modal-body">
      <div class="modal-title-row">
        <div>
          <div class="modal-title">${escapeHtml(entry.title)}</div>
        </div>
      </div>
      <div class="modal-badges">
        <span class="badge ${entry.draft ? "badge-draft" : "badge-verified"}">${entry.draft ? "Draft — needs chef review" : "Verified from source"}</span>
      </div>

      <div class="note-box">
        <b>Used in:</b>
        ${dishNames.map((n) => `<a href="#" class="used-in-link" data-recipe-name="${escapeHtml(n)}">${escapeHtml(n)}</a>`).join(", ")}
        ${dishNames.length > 1 ? "<br><span style='color:var(--muted);'>This is a shared sub-recipe — if you request a change here, remember it may need updating in the other dishes too.</span>" : ""}
      </div>

      <div class="part-panel-grid" style="margin-top:20px;">
        <div>
          <div class="panel-heading">Ingredients</div>
          ${ingredientListHtml(entry.ingredients, "comp")}
        </div>
        <div>
          <div class="panel-heading">Method</div>
          ${methodListHtml(entry.method)}
        </div>
      </div>

      <div class="modal-actions">
        <button class="btn btn-outline btn-sm" id="req-edit-btn">✎ Edit this part</button>
        <button class="btn btn-ghost btn-sm" id="open-parent-btn">📖 Open full dish recipe</button>
      </div>
      <div id="modal-extra"></div>
    </div>
  `;

  document.getElementById("modal-close-btn").addEventListener("click", closeModal);
  document.getElementById("open-parent-btn").addEventListener("click", () => openModal(primary.recipeId));
  wireIngredientChecks();
  wireStepMedia();
  document.querySelectorAll(".used-in-link").forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    const u = entry.usedIn.find((x) => x.recipeName === a.dataset.recipeName);
    if (u) openModal(u.recipeId);
  }));
  document.getElementById("req-edit-btn").addEventListener("click", () => {
    const parentRecipe = state.recipes.find((r) => r.id === primary.recipeId);
    if (parentRecipe) { openModal(parentRecipe.id); showRecipeEditForm(parentRecipe); }
  });
}

function renderRecipeModal() {
  const r = state.recipes.find((x) => x.id === state.selectedRecipeId);
  const wrap = document.getElementById("modal-card");
  if (!r) { wrap.innerHTML = ""; return; }

  const status = recipeStatus(r);
  const isFav = state.favorites.includes(r.id);
  const parts = r.components || [];
  if (state.activeDetailTab === undefined || state.activeDetailTab === null || state.activeDetailTab >= parts.length) {
    state.activeDetailTab = 0;
  }
  const activePart = parts[state.activeDetailTab] || { title: "", ingredients: [], method: [] };
  const isAdmin = state.role === "admin";

  wrap.innerHTML = `
    <button class="modal-close" id="modal-close-btn">✕</button>
    ${r.image ? `<img class="modal-img" id="modal-img" src="${r.image}" alt="${escapeHtml(r.nameEn)}" title="Click to view full size">` : `<div class="modal-img-fallback">${initials(r.nameEn)}</div>`}
    <div class="modal-body">
      <div class="modal-title-row">
        <div>
          <div class="modal-title">${escapeHtml(r.nameEn)}</div>
        </div>
        <button class="fav-star${isFav ? " active" : ""}" id="modal-fav-btn">★</button>
      </div>
      <div class="modal-badges">
        <span class="badge ${status === "draft" ? "badge-draft" : "badge-verified"}">${status === "draft" ? "⚠ Draft — needs chef review" : "✓ Verified from source"}</span>
        <span class="badge">Version ${r.version || 1}</span>
        ${r.archived ? '<span class="badge badge-archived">Archived</span>' : ""}
      </div>

      <div style="margin-top:10px; display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
        <span class="form-label" style="margin:0;">Category:</span>
        ${isAdmin ? `
          <select class="field" id="quick-category-select" style="width:auto; margin-bottom:0; padding:6px 10px; font-size:13px;">
            ${state.categories.map((c) => `<option value="${c.id}" ${c.id === r.category ? "selected" : ""}>${escapeHtml(c.label)}</option>`).join("")}
          </select>
        ` : `<span class="badge">${escapeHtml(categoryLabel(r.category))}</span>`}
      </div>

      <div class="stat-strip">
        <div class="stat-box"><div class="stat-box-label">Prep</div><div class="stat-box-value">${escapeHtml(r.prepTime) || "—"}</div></div>
        <div class="stat-box"><div class="stat-box-label">Cook</div><div class="stat-box-value">${escapeHtml(r.cookTime) || "—"}</div></div>
        <div class="stat-box"><div class="stat-box-label">Yield</div><div class="stat-box-value">${escapeHtml(r.yield) || "—"}</div></div>
        <div class="stat-box"><div class="stat-box-label">Price</div><div class="stat-box-value">${r.price != null ? "AED " + r.price : "—"}</div></div>
        ${isAdmin ? `<div class="stat-box"><div class="stat-box-label">Cost</div><div class="stat-box-value">AED ${costingTotalFor(r).toFixed(2)}</div></div>` : ""}
      </div>

      ${(r.allergens && r.allergens.length) ? `
        <div class="form-label">Allergens ${r.allergensSource === "unverified-menu" ? "(unverified — from guest menu)" : ""}</div>
        <div class="allergen-row">${allergenPillsHtml(r.allergens, r.allergensSource)}</div>` : ""}

      ${r.dishExplanation ? `<div class="note-box">${escapeHtml(r.dishExplanation)}</div>` : ""}
      ${r.chefNotes ? `<div class="note-box"><b>Chef notes:</b> ${escapeHtml(r.chefNotes)}</div>` : ""}

      ${parts.length > 1 ? `
        <div class="part-tabs">
          ${parts.map((c, i) => `
            <button class="part-tab${i === state.activeDetailTab ? " active" : ""}" data-tab="${i}">
              ${c.draft ? '<span class="dot"></span>' : ""}${escapeHtml(c.title)}
            </button>
          `).join("")}
        </div>
      ` : `<div class="panel-heading" style="margin-top:22px;">${escapeHtml(activePart.title)}</div>`}

      ${isAdmin ? `<button class="badge badge-btn ${activePart.draft ? "badge-draft" : "badge-verified"}" id="toggle-draft-btn" style="margin-top:10px;">${activePart.draft ? "⚠ Draft — tap to mark verified" : "✓ Verified — tap to mark draft"}</button>` : ""}

      <div class="part-panel">
        <div class="part-panel-grid">
          <div>
            <div class="panel-heading">Ingredients</div>
            ${ingredientListHtml(activePart.ingredients, "dish" + state.activeDetailTab)}
          </div>
          <div>
            <div class="panel-heading">Method</div>
            ${methodListHtml(activePart.method)}
          </div>
        </div>
      </div>

      ${r.platingNotes ? `<div class="note-box"><b>Plating:</b> ${escapeHtml(r.platingNotes)}</div>` : `<div class="form-label" style="margin-top:16px;">Plating notes: not set yet</div>`}

      <div class="modal-actions">
        <button class="btn btn-outline btn-sm" id="req-edit-btn">${isAdmin ? "🛠 Edit recipe" : "✎ Propose changes"}</button>
        ${isAdmin ? `<button class="btn btn-outline btn-sm" id="costing-btn">💰 Costing</button>` : ""}
        <button class="btn btn-ghost btn-sm" id="history-btn">🕘 Version history</button>
        <button class="btn btn-ghost btn-sm" id="print-btn">🖨 Print</button>
        ${isAdmin ? `<button class="btn btn-danger btn-sm" id="archive-btn">${r.archived ? "Restore" : "Archive"}</button>` : ""}
      </div>

      <div id="modal-extra"></div>
    </div>
  `;

  document.getElementById("modal-close-btn").addEventListener("click", closeModal);
  document.getElementById("modal-fav-btn").addEventListener("click", () => toggleFavorite(r.id));
  document.getElementById("req-edit-btn").addEventListener("click", () => showRecipeEditForm(r));
  document.getElementById("history-btn").addEventListener("click", () => showHistory(r));
  document.getElementById("print-btn").addEventListener("click", () => printRecipe(r));
  const img = document.getElementById("modal-img");
  if (img) img.addEventListener("click", () => openLightbox(r.image));
  wireIngredientChecks();
  wireStepMedia();
  document.querySelectorAll("[data-tab]").forEach((el) => el.addEventListener("click", () => {
    state.activeDetailTab = Number(el.dataset.tab);
    document.getElementById("modal-extra").innerHTML = "";
    state.editFormOpen = false;
    renderModal();
  }));
  const draftBtn = document.getElementById("toggle-draft-btn");
  if (draftBtn) draftBtn.addEventListener("click", () => toggleTabDraft(r));
  if (isAdmin) {
    document.getElementById("costing-btn").addEventListener("click", () => openCosting(r.id));
    document.getElementById("archive-btn").addEventListener("click", () => toggleArchive(r));
    const catSelect = document.getElementById("quick-category-select");
    if (catSelect) {
      catSelect.addEventListener("change", async (e) => {
        const newCat = e.target.value;
        await applyRecipeChange(r, { category: newCat }, `Moved to "${categoryLabel(newCat)}" by ${state.name}`, state.name, state.name);
      });
    }
  }
}

function categoryLabel(catId) {
  const c = state.categories.find((x) => x.id === catId);
  return c ? c.label : catId;
}

function costingTotalFor(r) {
  const costing = costingFor(r);
  return (costing.ingredients || []).reduce((sum, i) => sum + (parseFloat(i.qty) || 0) * (parseFloat(i.unitCost) || 0), 0);
}

async function toggleTabDraft(r) {
  const idx = state.activeDetailTab;
  const components = (r.components || []).map((c, i) => (i === idx ? { ...c, draft: !c.draft } : c));
  await applyRecipeChange(r, { components }, `Draft status toggled by ${state.name}`, state.name, state.name);
}

/* ---- Lightbox ---- */
function openLightbox(src) {
  if (!src) return;
  const img = document.getElementById("lightbox-img");
  img.classList.remove("zoomed");
  img.src = src;
  document.getElementById("lightbox-backdrop").classList.remove("hidden");
}

/* ---- Unified recipe editor (used by admin for direct edits and by kitchen staff to propose changes) ---- */

function fileToResizedDataUrl(file, maxW, quality) {
  maxW = maxW || 900; quality = quality || 0.72;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * scale) || 1;
        const h = Math.round(img.height * scale) || 1;
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ---- Recipe-parts editor (shared by the recipe editor and the new-dish form) ---- */
function renderPartsEditor(containerId, components) {
  const wrap = document.getElementById(containerId);
  wrap.innerHTML = "";
  const list = components && components.length ? components : [{ title: "", ingredients: [], method: [], draft: true }];
  list.forEach((c) => wrap.appendChild(partBlockEl(containerId, c)));
}
function partBlockEl(containerId, c) {
  const div = document.createElement("div");
  div.className = "editor-part";
  div.innerHTML = `
    <div class="editor-part-head">
      <input class="field" placeholder="Part name (e.g. Sauce, Assembly)" value="${escapeHtml(c.title || "")}" data-role="title">
      <button type="button" class="editor-remove-part" data-role="remove">✕ Remove</button>
    </div>
    <label class="form-label">Ingredients (one per line)</label>
    <textarea class="field" rows="4" data-role="ingredients">${escapeHtml((c.ingredients || []).join("\n"))}</textarea>
    <label class="form-label">Method — add a photo or video to any step</label>
    <div class="step-editor" data-role="method-editor"></div>
    <button type="button" class="btn btn-ghost btn-sm" data-role="add-step">+ Add step</button>
    <label class="editor-draft-toggle" style="margin-top:10px;"><input type="checkbox" data-role="draft" ${c.draft ? "checked" : ""}> Still a draft — needs chef confirmation</label>
  `;
  const stepWrap = div.querySelector('[data-role="method-editor"]');
  const steps = (c.method && c.method.length) ? c.method.map(normalizeStep) : [{ text: "", image: "", video: "" }];
  steps.forEach((s) => stepWrap.appendChild(stepRowEl(s)));
  renumberSteps(stepWrap);

  div.querySelector('[data-role="add-step"]').addEventListener("click", () => {
    stepWrap.appendChild(stepRowEl({ text: "", image: "", video: "" }));
    renumberSteps(stepWrap);
  });
  div.querySelector('[data-role="remove"]').addEventListener("click", () => {
    const wrap = document.getElementById(containerId);
    if (wrap.children.length <= 1) { alert("A recipe needs at least one part."); return; }
    div.remove();
  });
  return div;
}

function stepRowEl(step) {
  const row = document.createElement("div");
  row.className = "step-editor-row";
  row.innerHTML = `
    <div class="step-editor-row-top">
      <span class="step-num-badge"></span>
      <textarea class="field" rows="2" placeholder="Describe this step…" data-role="step-text">${escapeHtml(step.text || "")}</textarea>
      <div class="step-editor-row-actions">
        <button type="button" class="step-icon-btn${step.image ? " active" : ""}" data-role="toggle-photo" title="Add photo">📷</button>
        <button type="button" class="step-icon-btn${step.video ? " active" : ""}" data-role="toggle-video" title="Add video link">🎥</button>
        <button type="button" class="step-icon-btn" data-role="move-up" title="Move up">↑</button>
        <button type="button" class="step-icon-btn" data-role="move-down" title="Move down">↓</button>
        <button type="button" class="step-icon-btn" data-role="remove-step" title="Remove step">✕</button>
      </div>
    </div>
    <input type="hidden" data-role="step-image" value="${escapeHtml(step.image || "")}">
    <div class="step-editor-media-row hidden" data-role="photo-row">
      ${step.image ? `<img class="step-editor-thumb" data-role="thumb" src="${step.image}">` : `<div class="step-editor-thumb" data-role="thumb" style="background:var(--panel-2);"></div>`}
      <input type="file" accept="image/*" data-role="step-photo-file">
      <button type="button" class="step-editor-remove-media" data-role="remove-photo">Remove photo</button>
    </div>
    <div class="step-editor-media-row hidden" data-role="video-row">
      <div class="step-editor-video-input">
        <input class="field" placeholder="YouTube link, Vimeo link, or Google Drive share link" data-role="step-video" value="${escapeHtml(step.video || "")}">
        <div class="hint-text" style="margin:2px 0 0;">A Google Drive link works if it's the normal "share" link — don't use a direct .mp4 download link from Drive, it won't play.</div>
      </div>
      <button type="button" class="step-editor-remove-media" data-role="remove-video">Remove video</button>
    </div>
  `;
  const photoRow = row.querySelector('[data-role="photo-row"]');
  const videoRow = row.querySelector('[data-role="video-row"]');
  if (step.image) photoRow.classList.remove("hidden");
  if (step.video) videoRow.classList.remove("hidden");

  row.querySelector('[data-role="toggle-photo"]').addEventListener("click", () => photoRow.classList.toggle("hidden"));
  row.querySelector('[data-role="toggle-video"]').addEventListener("click", () => videoRow.classList.toggle("hidden"));
  row.querySelector('[data-role="step-photo-file"]').addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const dataUrl = await fileToResizedDataUrl(file, 640, 0.65);
      row.querySelector('[data-role="step-image"]').value = dataUrl;
      row.querySelector('[data-role="thumb"]').outerHTML = `<img class="step-editor-thumb" data-role="thumb" src="${dataUrl}">`;
      row.querySelector('[data-role="toggle-photo"]').classList.add("active");
    } catch (err) {
      alert("Couldn't read that image file.");
    }
  });
  row.querySelector('[data-role="remove-photo"]').addEventListener("click", () => {
    row.querySelector('[data-role="step-image"]').value = "";
    row.querySelector('[data-role="thumb"]').outerHTML = `<div class="step-editor-thumb" data-role="thumb" style="background:var(--panel-2);"></div>`;
    row.querySelector('[data-role="toggle-photo"]').classList.remove("active");
  });
  row.querySelector('[data-role="step-video"]').addEventListener("input", (e) => {
    row.querySelector('[data-role="toggle-video"]').classList.toggle("active", !!e.target.value.trim());
  });
  row.querySelector('[data-role="remove-video"]').addEventListener("click", () => {
    row.querySelector('[data-role="step-video"]').value = "";
    row.querySelector('[data-role="toggle-video"]').classList.remove("active");
    videoRow.classList.add("hidden");
  });
  row.querySelector('[data-role="move-up"]').addEventListener("click", () => {
    const prev = row.previousElementSibling;
    if (prev) row.parentElement.insertBefore(row, prev);
    renumberSteps(row.parentElement);
  });
  row.querySelector('[data-role="move-down"]').addEventListener("click", () => {
    const next = row.nextElementSibling;
    if (next) row.parentElement.insertBefore(next, row);
    renumberSteps(row.parentElement);
  });
  row.querySelector('[data-role="remove-step"]').addEventListener("click", () => {
    const wrap = row.parentElement;
    if (wrap.children.length <= 1) { alert("A recipe part needs at least one step."); return; }
    row.remove();
    renumberSteps(wrap);
  });
  return row;
}
function renumberSteps(stepWrap) {
  [...stepWrap.children].forEach((row, i) => {
    const badge = row.querySelector(".step-num-badge");
    if (badge) badge.textContent = i + 1;
  });
}

function addEmptyPart(containerId) {
  document.getElementById(containerId).appendChild(partBlockEl(containerId, { title: "", ingredients: [], method: [], draft: true }));
}
function readPartsFromEditor(containerId) {
  return [...document.querySelectorAll(`#${containerId} .editor-part`)].map((div) => ({
    title: div.querySelector('[data-role="title"]').value.trim() || "Untitled part",
    ingredients: div.querySelector('[data-role="ingredients"]').value.split("\n").map((s) => s.trim()).filter(Boolean),
    method: [...div.querySelectorAll('[data-role="method-editor"] .step-editor-row')]
      .map((row) => ({
        text: row.querySelector('[data-role="step-text"]').value.trim(),
        image: row.querySelector('[data-role="step-image"]').value || "",
        video: row.querySelector('[data-role="step-video"]').value.trim(),
      }))
      .filter((s) => s.text || s.image || s.video),
    draft: div.querySelector('[data-role="draft"]').checked,
  }));
}

function showRecipeEditForm(r) {
  const extra = document.getElementById("modal-extra");
  const isAdmin = state.role === "admin";
  state.pendingImageDataUrl = null;
  state.editFormOpen = true;
  extra.innerHTML = `
    <div class="component-block">
      <div class="component-title">${isAdmin ? "Edit recipe" : "Propose changes to this recipe"}</div>
      ${!isAdmin ? `<div class="hint-text" style="margin-top:0;">Make your changes below, then send them to the admin for approval. Nothing goes live until it's approved.</div>` : ""}

      <label class="form-label">Dish name</label>
      <input class="field" id="ef-name" value="${escapeHtml(r.nameEn)}">

      <label class="form-label">Category</label>
      <select class="field" id="ef-category">
        ${state.categories.map((c) => `<option value="${c.id}" ${c.id === r.category ? "selected" : ""}>${escapeHtml(c.label)}</option>`).join("")}
      </select>

      <label class="form-label">Price (AED)</label>
      <input class="field" id="ef-price" type="number" step="0.01" value="${r.price != null ? r.price : ""}">

      <label class="form-label">Photo</label>
      <div class="img-upload-row">
        ${r.image ? `<img class="img-upload-preview" id="ef-image-preview" src="${r.image}">` : `<div class="img-upload-preview-fallback" id="ef-image-preview"></div>`}
        <input type="file" accept="image/*" id="ef-image-file">
      </div>
      <input class="field" id="ef-image-url" placeholder="or paste an image URL" value="${r.image && r.image.startsWith("data:") ? "" : escapeHtml(r.image || "")}">

      <div style="display:flex; gap:10px;">
        <div style="flex:1;">
          <label class="form-label">Prep time</label>
          <input class="field" id="ef-prep" value="${escapeHtml(r.prepTime)}">
        </div>
        <div style="flex:1;">
          <label class="form-label">Cook time</label>
          <input class="field" id="ef-cook" value="${escapeHtml(r.cookTime)}">
        </div>
        <div style="flex:1;">
          <label class="form-label">Yield</label>
          <input class="field" id="ef-yield" value="${escapeHtml(r.yield)}">
        </div>
      </div>

      <label class="form-label">Allergens (comma separated, e.g. D, G, N)</label>
      <input class="field" id="ef-allergens" value="${(r.allergens || []).join(", ")}">

      <label class="form-label">Chef notes</label>
      <textarea class="field" id="ef-notes" rows="2">${escapeHtml(r.chefNotes)}</textarea>

      <label class="form-label">Plating notes</label>
      <textarea class="field" id="ef-plating" rows="2">${escapeHtml(r.platingNotes)}</textarea>

      <label class="form-label" style="margin-top:14px;">Recipe parts</label>
      <div id="ef-parts"></div>
      <button class="btn btn-ghost btn-sm" id="ef-add-part" type="button">+ Add another part</button>

      <label class="form-label" style="margin-top:16px;">${isAdmin ? "Note (optional, kept in version history)" : "Why is this change needed?"}</label>
      <textarea class="field" id="ef-reason" rows="2"></textarea>

      <div style="display:flex; gap:8px; margin-top:6px; flex-wrap:wrap;">
        <button class="btn btn-ghost btn-sm" id="ef-cancel">Cancel</button>
        <button class="btn btn-gold btn-sm" id="ef-save">${isAdmin ? "Save changes" : "Send for approval"}</button>
        ${isAdmin ? `<button class="btn btn-danger btn-sm" id="ef-delete-dish" style="margin-left:auto;">🗑 Delete dish permanently</button>` : ""}
      </div>
      <div id="ef-confirm" class="hint-text hidden">Sent to the admin for approval.</div>
    </div>
  `;
  renderPartsEditor("ef-parts", r.components || []);
  document.getElementById("ef-add-part").addEventListener("click", () => addEmptyPart("ef-parts"));
  document.getElementById("ef-image-file").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const dataUrl = await fileToResizedDataUrl(file);
      state.pendingImageDataUrl = dataUrl;
      let preview = document.getElementById("ef-image-preview");
      if (preview.tagName !== "IMG") {
        const img = document.createElement("img");
        img.className = "img-upload-preview"; img.id = "ef-image-preview";
        preview.replaceWith(img); preview = img;
      }
      preview.src = dataUrl;
    } catch (err) {
      alert("Couldn't read that image file.");
    }
  });
  document.getElementById("ef-cancel").addEventListener("click", () => { extra.innerHTML = ""; state.editFormOpen = false; });
  document.getElementById("ef-save").addEventListener("click", () => saveRecipeEdit(r));
  if (isAdmin) document.getElementById("ef-delete-dish").addEventListener("click", () => deleteDish(r));
}

async function saveRecipeEdit(r) {
  const priceVal = document.getElementById("ef-price").value;
  const patch = {
    nameEn: document.getElementById("ef-name").value.trim() || r.nameEn,
    category: document.getElementById("ef-category").value,
    price: priceVal === "" ? null : parseFloat(priceVal),
    image: state.pendingImageDataUrl || document.getElementById("ef-image-url").value.trim() || r.image || "",
    prepTime: document.getElementById("ef-prep").value.trim(),
    cookTime: document.getElementById("ef-cook").value.trim(),
    yield: document.getElementById("ef-yield").value.trim(),
    allergens: document.getElementById("ef-allergens").value.split(",").map((s) => s.trim()).filter(Boolean),
    allergensSource: "kitchen-confirmed",
    chefNotes: document.getElementById("ef-notes").value.trim(),
    platingNotes: document.getElementById("ef-plating").value.trim(),
    components: readPartsFromEditor("ef-parts"),
  };
  const reason = document.getElementById("ef-reason").value.trim();

  if (state.role === "admin") {
    await applyRecipeChange(r, patch, reason || `Direct edit by admin ${state.name}`, state.name, state.name);
    state.pendingImageDataUrl = null;
    state.editFormOpen = false;
    document.getElementById("modal-extra").innerHTML = "";
  } else {
    await db.collection("requests").add({
      type: "full-edit",
      recipeId: r.id, recipeName: r.nameEn,
      requestedBy: state.name, patch, reason,
      status: "pending", adminNote: "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    state.pendingImageDataUrl = null;
    document.getElementById("ef-save").disabled = true;
    document.getElementById("ef-confirm").classList.remove("hidden");
  }
}

async function deleteDish(r) {
  if (!confirm(`Permanently delete "${r.nameEn}"? This cannot be undone — use Archive instead if you might want it back.`)) return;
  await db.collection("recipes").doc(r.id).delete();
  closeModal();
}

async function toggleArchive(r) {
  await applyRecipeChange(r, { archived: !r.archived }, r.archived ? "Restored by admin" : "Archived by admin", state.name, state.name);
}

/* ---- Apply a change to a recipe + push version history ---- */
async function applyRecipeChange(r, patch, summary, changedBy, approvedBy) {
  const ref = db.collection("recipes").doc(r.id);
  const prevSnapshot = { ...r };
  delete prevSnapshot.id;
  await ref.collection("versions").add({
    version: r.version || 1,
    snapshot: prevSnapshot,
    changedBy: changedBy || "",
    approvedBy: approvedBy || "",
    summary,
    changedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
  await ref.update({
    ...patch,
    version: (r.version || 1) + 1,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedBy: approvedBy || changedBy || "",
  });
}

/* ============================== Costing calculator ============================== */
function costingFor(r) {
  if (r.costing && r.costing.ingredients && r.costing.ingredients.length) return { ...r.costing, source: r.costing.source || "saved" };
  if (typeof COSTING_DATA !== "undefined" && COSTING_DATA[r.id]) {
    return { ingredients: COSTING_DATA[r.id], targetCostPct: COSTING_TARGET_PCT, multiplier: COSTING_MULTIPLIER, source: "invoice" };
  }
  if (typeof ESTIMATED_COSTING_DATA !== "undefined" && ESTIMATED_COSTING_DATA[r.id]) {
    return { ingredients: ESTIMATED_COSTING_DATA[r.id], targetCostPct: COSTING_TARGET_PCT, multiplier: COSTING_MULTIPLIER, source: "estimated" };
  }
  return { ingredients: [], targetCostPct: (typeof COSTING_TARGET_PCT !== "undefined" ? COSTING_TARGET_PCT : 0.28), multiplier: (typeof COSTING_MULTIPLIER !== "undefined" ? COSTING_MULTIPLIER : 1.1136), source: "none" };
}

function openCosting(recipeId) {
  state.costingRecipeId = recipeId;
  renderCostingModal();
  document.getElementById("costing-backdrop").classList.remove("hidden");
}
function closeCosting() {
  state.costingRecipeId = null;
  document.getElementById("costing-backdrop").classList.add("hidden");
}

function renderCostingModal() {
  const r = state.recipes.find((x) => x.id === state.costingRecipeId);
  const wrap = document.getElementById("costing-card");
  if (!r) { wrap.innerHTML = ""; return; }
  const costing = costingFor(r);

  wrap.innerHTML = `
    <button class="modal-close" id="costing-close-btn">✕</button>
    <div class="modal-body">
      <div class="modal-title">Costing — ${escapeHtml(r.nameEn)}</div>
      <div class="hint-text" style="margin-top:2px;">Ingredient cost, quantity and unit — totals and suggested pricing recalculate automatically as you type.</div>
      ${costing.source === "invoice" ? `<div class="badge badge-verified" style="margin-top:8px;">From supplier invoice data (costing.xlsx)</div>` : ""}
      ${costing.source === "estimated" ? `<div class="badge badge-draft" style="margin-top:8px;">⚠ Estimated weights — not yet confirmed against real invoices</div>` : ""}
      ${costing.source === "none" ? `<div class="badge" style="margin-top:8px;">No costing data yet — add ingredients below</div>` : ""}

      <table class="costing-table" style="margin-top:14px;">
        <thead><tr>
          <th class="col-desc">Ingredient</th><th class="col-num">Qty</th><th class="col-num">Unit</th>
          <th class="col-num">Cost / unit (AED)</th><th class="col-total">Line total</th><th></th>
        </tr></thead>
        <tbody id="costing-rows"></tbody>
      </table>
      <button class="btn btn-ghost btn-sm" id="costing-add-row" type="button" style="margin-top:10px;">+ Add ingredient</button>

      <div class="costing-summary">
        <div class="costing-summary-box">
          <div class="costing-summary-label">Total ingredient cost</div>
          <div class="costing-summary-value" id="costing-total">AED 0.00</div>
        </div>
        <div class="costing-summary-box">
          <div class="costing-summary-label">Current menu price</div>
          <div class="costing-summary-value">${r.price != null ? "AED " + r.price : "not set"}</div>
        </div>
        <div class="costing-summary-box">
          <div class="costing-summary-label">Target food cost %</div>
          <input class="field" id="costing-target-pct" style="margin-top:4px;" value="${(costing.targetCostPct * 100).toFixed(2)}">
        </div>
        <div class="costing-summary-box">
          <div class="costing-summary-label">Price multiplier (tax/service incl.)</div>
          <input class="field" id="costing-multiplier" style="margin-top:4px;" value="${costing.multiplier.toFixed(4)}">
        </div>
        <div class="costing-summary-box">
          <div class="costing-summary-label">Suggested net revenue</div>
          <div class="costing-summary-value" id="costing-net">—</div>
        </div>
        <div class="costing-summary-box">
          <div class="costing-summary-label">Suggested menu price</div>
          <div class="costing-summary-value" id="costing-suggested">—</div>
        </div>
      </div>

      <div class="modal-actions">
        <button class="btn btn-gold btn-sm" id="costing-save-btn">Save costing</button>
      </div>
      <div id="costing-confirm" class="hint-text hidden">Saved.</div>
    </div>
  `;
  const tbody = document.getElementById("costing-rows");
  (costing.ingredients.length ? costing.ingredients : [{ desc: "", qty: "", unit: "gm", unitCost: "" }]).forEach((ing) => tbody.appendChild(costingRowEl(ing)));
  document.getElementById("costing-close-btn").addEventListener("click", closeCosting);
  document.getElementById("costing-add-row").addEventListener("click", () => {
    tbody.appendChild(costingRowEl({ desc: "", qty: "", unit: "gm", unitCost: "" }));
    recalcCosting();
  });
  document.getElementById("costing-target-pct").addEventListener("input", recalcCosting);
  document.getElementById("costing-multiplier").addEventListener("input", recalcCosting);
  document.getElementById("costing-save-btn").addEventListener("click", () => saveCosting(r));
  recalcCosting();
}

function costingRowEl(ing) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input class="field" data-role="desc" value="${escapeHtml(ing.desc || "")}"></td>
    <td><input class="field" data-role="qty" type="number" step="any" value="${ing.qty !== "" && ing.qty != null ? ing.qty : ""}"></td>
    <td><input class="field" data-role="unit" value="${escapeHtml(ing.unit || "")}"></td>
    <td><input class="field" data-role="unitCost" type="number" step="any" value="${ing.unitCost !== "" && ing.unitCost != null ? ing.unitCost : ""}"></td>
    <td class="col-total" data-role="lineTotal">0.0000</td>
    <td><button class="costing-remove-ing" type="button" data-role="remove">✕</button></td>
  `;
  tr.querySelectorAll("input").forEach((inp) => inp.addEventListener("input", recalcCosting));
  tr.querySelector('[data-role="remove"]').addEventListener("click", () => { tr.remove(); recalcCosting(); });
  return tr;
}

function recalcCosting() {
  let total = 0;
  document.querySelectorAll("#costing-rows tr").forEach((tr) => {
    const qty = parseFloat(tr.querySelector('[data-role="qty"]').value) || 0;
    const unitCost = parseFloat(tr.querySelector('[data-role="unitCost"]').value) || 0;
    const lineTotal = qty * unitCost;
    tr.querySelector('[data-role="lineTotal"]').textContent = lineTotal.toFixed(4);
    total += lineTotal;
  });
  document.getElementById("costing-total").textContent = "AED " + total.toFixed(2);
  const targetPct = (parseFloat(document.getElementById("costing-target-pct").value) || 28) / 100;
  const multiplier = parseFloat(document.getElementById("costing-multiplier").value) || 1;
  const net = targetPct > 0 ? total / targetPct : 0;
  const suggested = net * multiplier;
  document.getElementById("costing-net").textContent = "AED " + net.toFixed(2);
  document.getElementById("costing-suggested").textContent = "AED " + suggested.toFixed(2);
}

async function saveCosting(r) {
  const ingredients = [...document.querySelectorAll("#costing-rows tr")].map((tr) => ({
    desc: tr.querySelector('[data-role="desc"]').value.trim(),
    qty: parseFloat(tr.querySelector('[data-role="qty"]').value) || 0,
    unit: tr.querySelector('[data-role="unit"]').value.trim(),
    unitCost: parseFloat(tr.querySelector('[data-role="unitCost"]').value) || 0,
  })).filter((i) => i.desc);
  const targetCostPct = (parseFloat(document.getElementById("costing-target-pct").value) || 28) / 100;
  const multiplier = parseFloat(document.getElementById("costing-multiplier").value) || 1;
  await db.collection("recipes").doc(r.id).update({
    costing: { ingredients, targetCostPct, multiplier, source: "saved" },
  });
  document.getElementById("costing-confirm").classList.remove("hidden");
}

/* ---- Version history ---- */
async function showHistory(r) {
  const extra = document.getElementById("modal-extra");
  extra.innerHTML = `<div class="component-block"><div class="component-title">Version history</div><div class="hint-text">Loading…</div></div>`;
  const snap = await db.collection("recipes").doc(r.id).collection("versions").orderBy("changedAt", "desc").get();
  if (snap.empty) {
    extra.innerHTML = `<div class="component-block"><div class="component-title">Version history</div><div class="hint-text">No changes recorded yet — this is the original version.</div></div>`;
    return;
  }
  const rows = snap.docs.map((d) => {
    const v = d.data();
    const when = v.changedAt && v.changedAt.toDate ? v.changedAt.toDate().toLocaleString() : "";
    return `
      <div class="req-card">
        <div class="req-title">Version ${v.version}</div>
        <div class="req-meta">${escapeHtml(summaryLine(v))} · ${when}</div>
      </div>
    `;
  }).join("");
  extra.innerHTML = `<div class="component-block"><div class="component-title">Version history</div>${rows}</div>`;
}
function summaryLine(v) {
  const who = v.changedBy && v.approvedBy && v.changedBy !== v.approvedBy
    ? `requested by ${v.changedBy}, approved by ${v.approvedBy}`
    : (v.approvedBy ? `by ${v.approvedBy}` : "");
  return `${v.summary || "Updated"} — ${who}`;
}

/* ---- Print ---- */
function printRecipe(r) {
  const area = document.getElementById("print-area");
  const status = recipeStatus(r);
  const partsHtml = (r.components || []).map((c) => `
    <div class="print-part">
      <h2>${escapeHtml(c.title)}${c.draft ? ' <span class="print-draft-tag">DRAFT — needs confirmation</span>' : ""}</h2>
      <div class="print-part-grid">
        <div>
          <div class="print-col-label">Ingredients</div>
          ${(c.ingredients || []).length ? `<ul>${c.ingredients.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>` : `<p class="print-muted">No ingredients listed.</p>`}
        </div>
        <div>
          <div class="print-col-label">Method</div>
          ${(c.method || []).length ? `<ol>${c.method.map((raw) => {
            const s = normalizeStep(raw);
            return `<li>${escapeHtml(s.text)}${s.image ? `<br><img class="print-step-photo" src="${s.image}">` : ""}${s.video ? ` <span class="print-video-note">(has a video step — view in the app)</span>` : ""}</li>`;
          }).join("")}</ol>` : `<p class="print-muted">No method listed.</p>`}
        </div>
      </div>
    </div>
  `).join("");

  area.innerHTML = `
    <div class="print-header">
      ${r.image ? `<img class="print-photo" src="${r.image}" alt="">` : ""}
      <div class="print-header-text">
        <h1>${escapeHtml(r.nameEn)}</h1>
        ${r.nameAr ? `<div class="print-ar">${escapeHtml(r.nameAr)}</div>` : ""}
        <div class="print-meta">
          <span class="print-tag ${status === "draft" ? "print-tag-draft" : "print-tag-verified"}">${status === "draft" ? "DRAFT — needs chef review" : "VERIFIED"}</span>
          <span>Version ${r.version || 1}</span>
        </div>
        <div class="print-stat-row">
          <div><b>Prep</b><br>${escapeHtml(r.prepTime) || "—"}</div>
          <div><b>Cook</b><br>${escapeHtml(r.cookTime) || "—"}</div>
          <div><b>Yield</b><br>${escapeHtml(r.yield) || "—"}</div>
          <div><b>Price</b><br>${r.price != null ? "AED " + r.price : "—"}</div>
        </div>
      </div>
    </div>

    ${(r.allergens && r.allergens.length) ? `<p class="print-meta"><b>Allergens:</b> ${r.allergens.map((a) => ALLERGEN_LABELS[a] || a).join(", ")}${r.allergensSource === "unverified-menu" ? " (unverified — from guest menu)" : ""}</p>` : ""}
    ${r.dishExplanation ? `<p>${escapeHtml(r.dishExplanation)}</p>` : ""}
    ${r.chefNotes ? `<p><b>Chef notes:</b> ${escapeHtml(r.chefNotes)}</p>` : ""}

    ${partsHtml}

    ${r.platingNotes ? `<h2>Plating</h2><p>${escapeHtml(r.platingNotes)}</p>` : ""}
  `;
  window.print();
}

/* ============================== Admin drawer ============================== */
function openAdmin(tab) {
  state.adminOpen = true;
  state.adminTab = tab === "mine" ? "mine" : "requests";
  state.newRecipeFormOpen = false;
  document.getElementById("drawer-backdrop").classList.remove("hidden");
  renderAdmin();
}
function closeAdmin() {
  state.adminOpen = false;
  state.newRecipeFormOpen = false;
  document.getElementById("drawer-backdrop").classList.add("hidden");
}

function renderAdmin() {
  const isAdmin = state.role === "admin";
  const tabs = isAdmin
    ? [["requests", "Pending requests"], ["mine", "My requests"], ["recipes", "Recipes"], ["categories", "Categories"], ["settings", "Settings"]]
    : [["mine", "My requests"]];
  if (!tabs.find((t) => t[0] === state.adminTab)) state.adminTab = tabs[0][0];

  const tabsHtml = tabs.map(([id, label]) =>
    `<button class="tab-btn${state.adminTab === id ? " active" : ""}" data-tab="${id}">${label}</button>`
  ).join("");

  let bodyHtml = "";
  if (state.adminTab === "requests") bodyHtml = renderPendingRequests();
  else if (state.adminTab === "mine") bodyHtml = renderMyRequests();
  else if (state.adminTab === "recipes") bodyHtml = renderRecipeAdmin();
  else if (state.adminTab === "categories") bodyHtml = renderCategoryAdmin();
  else if (state.adminTab === "settings") bodyHtml = renderSettingsAdmin();

  document.getElementById("drawer-content").innerHTML = `
    <div class="tabs">${tabsHtml}</div>
    <div id="admin-tab-body">${bodyHtml}</div>
  `;
  document.querySelectorAll("#drawer-content .tab-btn").forEach((b) =>
    b.addEventListener("click", () => { state.adminTab = b.dataset.tab; state.newRecipeFormOpen = false; renderAdmin(); })
  );
  wireAdminTabEvents();
}

function diffPatchHtml(r, patch) {
  const labels = { nameEn: "Name", category: "Category", price: "Price (AED)", image: "Photo", prepTime: "Prep time", cookTime: "Cook time", yield: "Yield", allergens: "Allergens", chefNotes: "Chef notes", platingNotes: "Plating notes", components: "Recipe parts" };
  let rows = "";
  Object.keys(patch).forEach((k) => {
    if (k === "allergensSource") return;
    let oldV, newV;
    if (k === "allergens") { oldV = (r.allergens || []).join(", "); newV = (patch.allergens || []).join(", "); }
    else if (k === "components") { oldV = `${(r.components || []).length} part(s)`; newV = `${(patch.components || []).length} part(s)`; }
    else if (k === "image") { oldV = r.image ? "has photo" : "no photo"; newV = patch.image ? "new photo" : "no photo"; }
    else { oldV = r[k] != null ? r[k] : ""; newV = patch[k] != null ? patch[k] : ""; }
    if (String(oldV) === String(newV)) return;
    rows += `<div class="diff-row"><b>${labels[k] || k}:</b><br><span class="diff-old">${escapeHtml(String(oldV)).slice(0, 150)}</span><br><span class="diff-new">${escapeHtml(String(newV)).slice(0, 150)}</span></div>`;
  });
  return rows || `<div class="hint-text">No summary-level differences detected (changes may be within ingredient/method text — open the dish to compare in full).</div>`;
}

function renderPendingRequests() {
  const pending = state.requests.filter((r) => r.status === "pending");
  if (pending.length === 0) return `<div class="hint-text">No pending requests right now.</div>`;
  return pending.map((req) => {
    if (req.type === "full-edit") {
      const r = state.recipes.find((x) => x.id === req.recipeId);
      return `
        <div class="req-card" data-req="${req.id}">
          <div class="req-title">${escapeHtml(req.recipeName)}</div>
          <div class="req-meta">Full recipe edit · requested by ${escapeHtml(req.requestedBy)}</div>
          ${r ? diffPatchHtml(r, req.patch) : `<div class="hint-text">This dish no longer exists.</div>`}
          ${req.reason ? `<div class="req-meta" style="margin-top:6px;">Reason: "${escapeHtml(req.reason)}"</div>` : ""}
          <div class="req-actions">
            ${r ? `<button class="btn btn-outline btn-sm" data-open-dish="${r.id}">Open dish to compare</button>` : ""}
            <button class="btn btn-gold btn-sm" data-approve-full="${req.id}">✓ Approve</button>
            <button class="btn btn-ghost btn-sm" data-clarify="${req.id}">? Ask for clarification</button>
            <button class="btn btn-danger btn-sm" data-reject="${req.id}">✕ Reject</button>
          </div>
        </div>
      `;
    }
    return `
      <div class="req-card" data-req="${req.id}">
        <div class="req-title">${escapeHtml(req.recipeName)}</div>
        <div class="req-meta">${escapeHtml(req.fieldLabel || req.field)} · requested by ${escapeHtml(req.requestedBy)}</div>
        <div class="diff-row"><span class="diff-old">${escapeHtml(String(req.oldValue).slice(0, 200))}</span></div>
        <div class="diff-row"><span class="diff-new">${escapeHtml(String(req.newValue).slice(0, 200))}</span></div>
        ${req.reason ? `<div class="req-meta" style="margin-top:6px;">Reason: "${escapeHtml(req.reason)}"</div>` : ""}
        <div class="req-actions">
          <button class="btn btn-gold btn-sm" data-approve="${req.id}">✓ Approve</button>
          <button class="btn btn-ghost btn-sm" data-clarify="${req.id}">? Ask for clarification</button>
          <button class="btn btn-danger btn-sm" data-reject="${req.id}">✕ Reject</button>
        </div>
      </div>
    `;
  }).join("");
}

function renderMyRequests() {
  const mine = state.requests.filter((r) => r.requestedBy === state.name);
  if (mine.length === 0) return `<div class="hint-text">You haven't submitted any change requests yet.</div>`;
  return mine.map((req) => `
    <div class="req-card">
      <div class="req-title">${escapeHtml(req.recipeName)}</div>
      <div class="req-meta">${escapeHtml(req.type === "full-edit" ? "Full recipe edit" : (req.fieldLabel || req.field))} — status: <b>${req.status.replace("_", " ")}</b></div>
      ${req.adminNote ? `<div class="req-meta" style="margin-top:6px;">Admin: "${escapeHtml(req.adminNote)}"</div>` : ""}
    </div>
  `).join("");
}

function renderRecipeAdmin() {
  const archived = state.recipes.filter((r) => r.archived);
  const active = state.recipes.filter((r) => !r.archived);
  return `
    <button class="btn btn-gold btn-sm btn-block" id="new-recipe-btn" style="margin-bottom:12px;">+ Add new recipe</button>
    <div id="new-recipe-form"></div>
    <div class="form-label">Active (${active.length})</div>
    ${active.map((r) => `
      <div class="list-card">
        <div class="req-title">${escapeHtml(r.nameEn)}</div>
        <div class="req-meta">${escapeHtml(r.category)} · v${r.version || 1}${r.price != null ? ` · AED ${r.price}` : ""}</div>
        <div class="req-actions">
          <button class="btn btn-outline btn-sm" data-open-dish="${r.id}">Open</button>
          <button class="btn btn-danger btn-sm" data-archive="${r.id}">Archive</button>
          <button class="btn btn-danger btn-sm" data-delete-recipe="${r.id}">🗑 Delete permanently</button>
        </div>
      </div>
    `).join("")}
    ${archived.length ? `<div class="form-label" style="margin-top:16px;">Archived (${archived.length})</div>` : ""}
    ${archived.map((r) => `
      <div class="list-card">
        <div class="req-title">${escapeHtml(r.nameEn)}</div>
        <div class="req-meta">${escapeHtml(r.category)}</div>
        <div class="req-actions">
          <button class="btn btn-outline btn-sm" data-restore="${r.id}">Restore</button>
          <button class="btn btn-danger btn-sm" data-delete-recipe="${r.id}">🗑 Delete permanently</button>
        </div>
      </div>
    `).join("")}
  `;
}

function renderCategoryAdmin() {
  return `
    <div class="settings-grid">
      <input class="field" id="new-cat-label" placeholder="New category name">
      <button class="btn btn-gold btn-sm" id="add-cat-btn">+ Add category</button>
    </div>
    <div class="form-label" style="margin-top:16px;">Existing</div>
    ${state.categories.map((c) => `<div class="list-card">${escapeHtml(c.label)}</div>`).join("")}
  `;
}

function renderSettingsAdmin() {
  return `
    <div class="form-label">User access code</div>
    <input class="field" id="set-user-pin" value="${escapeHtml(state.pins.user)}">
    <div class="form-label">Admin access code</div>
    <input class="field" id="set-admin-pin" value="${escapeHtml(state.pins.admin)}">
    <button class="btn btn-gold btn-sm" id="save-pins-btn">Save codes</button>
    <div class="hint-text">These are UI-level access codes, the same pattern as your live ordering board — not a full authentication system. Anyone with the code (and only the code) can get in at that role.</div>
  `;
}

function wireAdminTabEvents() {
  document.querySelectorAll("[data-approve]").forEach((b) => b.addEventListener("click", () => resolveRequest(b.dataset.approve, "approved")));
  document.querySelectorAll("[data-approve-full]").forEach((b) => b.addEventListener("click", () => resolveFullEditRequest(b.dataset.approveFull)));
  document.querySelectorAll("[data-reject]").forEach((b) => b.addEventListener("click", () => resolveRequest(b.dataset.reject, "rejected")));
  document.querySelectorAll("[data-clarify]").forEach((b) => b.addEventListener("click", () => resolveRequest(b.dataset.clarify, "clarification_requested")));
  document.querySelectorAll("[data-archive]").forEach((b) => b.addEventListener("click", () => {
    const r = state.recipes.find((x) => x.id === b.dataset.archive);
    if (r) applyRecipeChange(r, { archived: true }, "Archived by admin", state.name, state.name);
  }));
  document.querySelectorAll("[data-restore]").forEach((b) => b.addEventListener("click", () => {
    const r = state.recipes.find((x) => x.id === b.dataset.restore);
    if (r) applyRecipeChange(r, { archived: false }, "Restored by admin", state.name, state.name);
  }));
  document.querySelectorAll("[data-delete-recipe]").forEach((b) => b.addEventListener("click", async () => {
    const r = state.recipes.find((x) => x.id === b.dataset.deleteRecipe);
    if (!r) return;
    if (!confirm(`Permanently delete "${r.nameEn}"? This cannot be undone.`)) return;
    await db.collection("recipes").doc(r.id).delete();
  }));
  document.querySelectorAll("[data-open-dish]").forEach((b) => b.addEventListener("click", () => {
    closeAdmin();
    openModal(b.dataset.openDish);
  }));

  const newRecipeBtn = document.getElementById("new-recipe-btn");
  if (newRecipeBtn) newRecipeBtn.addEventListener("click", showNewRecipeForm);

  const addCatBtn = document.getElementById("add-cat-btn");
  if (addCatBtn) addCatBtn.addEventListener("click", async () => {
    const label = document.getElementById("new-cat-label").value.trim();
    if (!label) return;
    const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    await db.collection("categories").doc(id).set({ id, label, order: state.categories.length + 1 });
    document.getElementById("new-cat-label").value = "";
  });

  const savePinsBtn = document.getElementById("save-pins-btn");
  if (savePinsBtn) savePinsBtn.addEventListener("click", async () => {
    const userPin = document.getElementById("set-user-pin").value.trim();
    const adminPin = document.getElementById("set-admin-pin").value.trim();
    if (!userPin || !adminPin) return;
    await db.collection("config").doc("access").set({ userPin, adminPin });
    savePinsBtn.textContent = "Saved ✓";
  });
}

function showNewRecipeForm() {
  const wrap = document.getElementById("new-recipe-form");
  state.newRecipeFormOpen = true;
  wrap.innerHTML = `
    <div class="editor-part">
      <button type="button" class="modal-close" style="position:static; float:right;" id="nr-close">✕</button>
      <label class="form-label">Dish name</label>
      <input class="field" id="nr-name" placeholder="Dish name">
      <label class="form-label">Category</label>
      <select class="field" id="nr-cat">${state.categories.map((c) => `<option value="${c.id}">${escapeHtml(c.label)}</option>`).join("")}</select>
      <label class="form-label">Price (AED)</label>
      <input class="field" id="nr-price" type="number" step="0.01">
      <label class="form-label">Recipe parts</label>
      <div id="nr-parts"></div>
      <button class="btn btn-ghost btn-sm" id="nr-add-part" type="button">+ Add another part</button>
      <button class="btn btn-gold btn-sm" id="nr-save" style="margin-top:12px;">Create recipe</button>
    </div>
  `;
  renderPartsEditor("nr-parts", [{ title: "Recipe", ingredients: [], method: [], draft: true }]);
  document.getElementById("nr-close").addEventListener("click", () => { wrap.innerHTML = ""; state.newRecipeFormOpen = false; });
  document.getElementById("nr-add-part").addEventListener("click", () => addEmptyPart("nr-parts"));
  document.getElementById("nr-save").addEventListener("click", async () => {
    const name = document.getElementById("nr-name").value.trim();
    if (!name) return;
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now().toString(36);
    const priceVal = document.getElementById("nr-price").value;
    await db.collection("recipes").doc(id).set({
      id, category: document.getElementById("nr-cat").value, nameEn: name, nameAr: "",
      image: "", price: priceVal === "" ? null : parseFloat(priceVal),
      prepTime: "", cookTime: "", yield: "", chefNotes: "", platingNotes: "",
      allergens: [], allergensSource: "none", archived: false, version: 1, costing: null,
      components: readPartsFromEditor("nr-parts"),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(), updatedBy: state.name,
    });
    wrap.innerHTML = "";
    state.newRecipeFormOpen = false;
    renderAdmin();
  });
}

async function resolveFullEditRequest(reqId) {
  const req = state.requests.find((r) => r.id === reqId);
  if (!req) return;
  const r = state.recipes.find((x) => x.id === req.recipeId);
  if (r) {
    await applyRecipeChange(r, req.patch, `Full edit approved — requested by ${req.requestedBy}`, req.requestedBy, state.name);
  }
  await db.collection("requests").doc(reqId).update({
    status: "approved", resolvedBy: state.name, resolvedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

async function resolveRequest(reqId, status) {
  const req = state.requests.find((r) => r.id === reqId);
  if (!req) return;
  let adminNote = "";
  if (status === "rejected" || status === "clarification_requested") {
    adminNote = prompt(status === "rejected" ? "Reason for rejecting (optional):" : "What clarification do you need?") || "";
  }
  if (status === "approved" && req.type !== "full-edit") {
    const r = state.recipes.find((x) => x.id === req.recipeId);
    if (r) {
      const patch = buildPatchFromRequest(r, req);
      await applyRecipeChange(r, patch, `${req.fieldLabel || req.field} — requested by ${req.requestedBy}`, req.requestedBy, state.name);
    }
  }
  await db.collection("requests").doc(reqId).update({
    status, adminNote, resolvedBy: state.name, resolvedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

function buildPatchFromRequest(r, req) {
  if (req.field.startsWith("component:")) {
    const [, idx, sub] = req.field.split(":");
    const components = (r.components || []).map((c, i) => {
      if (i !== Number(idx)) return c;
      return { ...c, [sub]: req.newValue.split("\n").map((s) => s.trim()).filter(Boolean), draft: false };
    });
    return { components };
  }
  if (req.field === "allergens") {
    return { allergens: req.newValue.split(",").map((s) => s.trim()).filter(Boolean), allergensSource: "kitchen-confirmed" };
  }
  return { [req.field]: req.newValue };
}

