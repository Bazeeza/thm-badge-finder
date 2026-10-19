/* ======================================================================
   TryHackMe Badge Finder — app logic (no dependencies)
   ====================================================================== */
(function () {
  "use strict";

  const BADGES = window.BADGES || [];
  const OTHER = window.OTHER_BADGES || [];
  const CATS = window.CATEGORIES || {};
  const IMG_BASE = window.BADGE_IMG_BASE || "";
  const STORAGE_KEY = "thm-badge-finder:earned:v1";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ------------------------------ state ------------------------------ */
  const state = { query: "", category: "all", sort: "category", onlyUnearned: false, earned: loadEarned() };

  function loadEarned() {
    try { const raw = localStorage.getItem(STORAGE_KEY); return new Set(raw ? JSON.parse(raw) : []); }
    catch (e) { return new Set(); }
  }
  function saveEarned() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.earned])); } catch (e) { /* private mode */ }
  }

  /* ---------------------------- helpers ------------------------------ */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function initials(name) {
    const parts = name.replace(/[^A-Za-z0-9 ]/g, " ").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  function matches(b, q) {
    if (!q) return true;
    const hay = [b.name, b.slug, b.desc || "", b.note || "", ...(b.aliases || []), ...b.rooms.map(r => r.title + " " + r.url)].join(" ").toLowerCase();
    return q.split(/\s+/).every(t => hay.includes(t));
  }

  function earnable() { return BADGES.filter(b => b.category !== "discontinued"); }

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => el.classList.remove("show"), 1800);
  }

  /* Image fallback chain: TryHackMe CDN → local assets/badges/<slug>.png → initials */
  window.__badgeImgFail = function (img) {
    const step = Number(img.dataset.step || 0);
    if (step === 0 && img.dataset.local) {
      img.dataset.step = "1"; img.src = img.dataset.local; return;
    }
    const span = document.createElement("span");
    span.className = "fallback"; span.textContent = img.dataset.initials || "?";
    img.replaceWith(span);
  };

  /* ----------------------------- render ------------------------------ */
  function roomItem(r) {
    const label = r.kind === "module" ? "module" : r.kind === "path" ? "path" : r.kind === "feature" ? "feature" : "";
    return `<li class="${esc(r.kind)}"><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)}</a>${label ? `<span class="kind">${label}</span>` : ""}</li>`;
  }

  function card(b, i) {
    const earned = state.earned.has(b.slug);
    const cat = CATS[b.category] || { label: b.category };
    const disc = b.category === "discontinued";
    const local = `assets/badges/${b.slug}.png`;
    const first = b.img ? (b.img.startsWith("http") ? b.img : IMG_BASE + b.img) : local;
    const noRoomText = disc ? "No room — this badge can no longer be earned."
      : b.category === "streaks" ? "No room — answer at least one question a day."
      : "Not tied to a room.";
    return `<article class="badge-card${earned ? " earned" : ""}${disc ? " discontinued" : ""}" id="${esc(b.slug)}" style="--i:${i}">
      <div class="hex" aria-hidden="true"><div class="inner">
        <img src="${esc(first)}" alt="" loading="lazy" referrerpolicy="no-referrer"
             data-local="${b.img ? esc(local) : ""}" data-initials="${esc(initials(b.name))}" onerror="window.__badgeImgFail(this)">
      </div></div>
      <div class="head">
        <div>
          <h3><a href="#${esc(b.slug)}" title="Copy link to this badge">${esc(b.name)}</a></h3>
          <div class="meta"><span class="cat">${esc(cat.label)}</span>${b.verify ? `<span class="flag">Needs verification</span>` : ""}</div>
        </div>
        ${disc ? "" : `<label class="earn" title="Mark as earned (saved in this browser)">
          <input type="checkbox" data-slug="${esc(b.slug)}" ${earned ? "checked" : ""}>
          <span class="box"><svg viewBox="0 0 12 12" fill="none" stroke="#1A1406" stroke-width="2"><path d="M2 6.5l2.6 2.5L10 3.5"/></svg></span>
          <span class="earn-text">${earned ? "Earned" : "Earned?"}</span>
        </label>`}
      </div>
      ${b.desc ? `<p class="desc">“${esc(b.desc)}”</p>` : ""}
      <ul class="rooms">${b.rooms.length ? b.rooms.map(roomItem).join("") : `<li><span class="none">${noRoomText}</span></li>`}</ul>
      ${b.note ? `<p class="note${b.verify ? " verify" : ""}">${esc(b.note)}</p>` : ""}
    </article>`;
  }

  function visible() {
    const q = state.query.trim().toLowerCase();
    let list = BADGES.filter(b =>
      (state.category === "all" || b.category === state.category) &&
      (!state.onlyUnearned || (!state.earned.has(b.slug) && b.category !== "discontinued")) &&
      matches(b, q));
    const rank = Object.keys(CATS);
    if (state.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base", numeric: true }));
    if (state.sort === "category") list.sort((a, b) => (rank.indexOf(a.category) - rank.indexOf(b.category)) || a.name.localeCompare(b.name, "en", { sensitivity: "base", numeric: true }));
    if (state.sort === "rooms") list.sort((a, b) => b.rooms.length - a.rooms.length || a.name.localeCompare(b.name));
    return list;
  }

  let firstPaint = true;
  function renderGrid() {
    const grid = $("#grid");
    const list = visible();
    grid.classList.toggle("entering", firstPaint); firstPaint = false;
    grid.innerHTML = list.length ? list.map(card).join("")
      : `<div class="empty"><b>No badge matches.</b><br>Try the badge name, a room name, or part of the room URL.</div>`;
    $("#result-count").textContent = `${list.length} of ${BADGES.length}`;
  }

  function renderChips() {
    const counts = { all: BADGES.length };
    BADGES.forEach(b => { counts[b.category] = (counts[b.category] || 0) + 1; });
    const order = ["all", ...Object.keys(CATS)];
    $("#chips").innerHTML = order.map(k => {
      const label = k === "all" ? "All" : CATS[k].label;
      return `<button class="chip" type="button" data-cat="${k}" aria-pressed="${state.category === k}">${esc(label)}<span class="n">${counts[k] || 0}</span></button>`;
    }).join("");
  }

  function renderOther() {
    $("#other").innerHTML = OTHER.map(g => `<article><h3>${esc(g.group)}</h3><p>${esc(g.how)}</p><ul>${g.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul></article>`).join("");
  }

  function renderProgress() {
    const total = earnable().length;
    const n = [...state.earned].filter(s => BADGES.some(b => b.slug === s && b.category !== "discontinued")).length;
    $("#progress-text").textContent = `${n} / ${total} earned`;
    $("#progress-bar").style.width = total ? `${Math.round((n / total) * 100)}%` : "0%";
  }

  function renderFacts() {
    const rooms = new Set();
    BADGES.forEach(b => b.rooms.forEach(r => { if (r.kind === "room") rooms.add(r.url); }));
    $("#fact-badges").textContent = BADGES.length;
    $("#fact-rooms").textContent = rooms.size;
    $("#fact-updated").textContent = (window.SITE && window.SITE.updated) || "";
  }

  function injectJsonLd() {
    const base = location.origin + location.pathname.replace(/[^/]*$/, "");
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "ItemList",
      "name": "TryHackMe badges and the rooms that unlock them", "numberOfItems": BADGES.length,
      "itemListElement": BADGES.map((b, i) => ({ "@type": "ListItem", "position": i + 1, "name": b.name, "url": base + "#" + b.slug }))
    });
    document.head.appendChild(s);
  }

  /* ---------------------------- interactions ------------------------- */
  function bind() {
    const search = $("#search");
    const params = new URLSearchParams(location.search);
    if (params.get("q")) { search.value = params.get("q"); state.query = search.value; renderGrid(); }
    search.addEventListener("input", () => { state.query = search.value; renderGrid(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== search && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); search.focus(); }
      if (e.key === "Escape" && document.activeElement === search) { search.value = ""; state.query = ""; renderGrid(); search.blur(); }
    });
    $("#chips").addEventListener("click", (e) => {
      const btn = e.target.closest(".chip"); if (!btn) return;
      state.category = btn.dataset.cat;
      $$("#chips .chip").forEach(c => c.setAttribute("aria-pressed", c === btn));
      renderGrid();
    });
    $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; renderGrid(); });
    $("#only-unearned").addEventListener("change", (e) => { state.onlyUnearned = e.target.checked; renderGrid(); });
    $("#grid").addEventListener("change", (e) => {
      const cb = e.target.closest('input[type="checkbox"][data-slug]'); if (!cb) return;
      if (cb.checked) state.earned.add(cb.dataset.slug); else state.earned.delete(cb.dataset.slug);
      saveEarned();
      cb.closest(".badge-card").classList.toggle("earned", cb.checked);
      cb.parentElement.querySelector(".earn-text").textContent = cb.checked ? "Earned" : "Earned?";
      renderProgress();
    });
    $("#export").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify({ exported: new Date().toISOString(), earned: [...state.earned] }, null, 2)], { type: "application/json" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "thm-badges-progress.json"; a.click(); URL.revokeObjectURL(a.href);
      toast("Progress exported");
    });
    $("#import").addEventListener("change", (e) => {
      const f = e.target.files[0]; if (!f) return;
      f.text().then(t => {
        const data = JSON.parse(t); const list = Array.isArray(data) ? data : data.earned;
        if (!Array.isArray(list)) throw new Error("bad file");
        list.forEach(s => state.earned.add(s)); saveEarned(); renderGrid(); renderProgress();
        toast(`Imported ${list.length} badges`);
      }).catch(() => toast("That file is not a progress export"));
      e.target.value = "";
    });
    $("#share").addEventListener("click", () => {
      const n = [...state.earned].length, total = earnable().length;
      const text = `I've earned ${n}/${total} badges on TryHackMe. Find which room unlocks each badge: ${location.origin}${location.pathname}`;
      navigator.clipboard?.writeText(text).then(() => toast("Share text copied")).catch(() => prompt("Copy this:", text));
    });
    $("#reset").addEventListener("click", () => {
      if (!confirm("Clear every badge you marked as earned in this browser?")) return;
      state.earned.clear(); saveEarned(); renderGrid(); renderProgress(); toast("Progress cleared");
    });
    $("#grid").addEventListener("click", (e) => {
      const a = e.target.closest("h3 a"); if (!a) return;
      navigator.clipboard?.writeText(location.origin + location.pathname + a.getAttribute("href")).then(() => toast("Badge link copied"));
    });

    /* Import from a TryHackMe username: calls the public profile-badges API. */
    $("#thm-import-btn").addEventListener("click", async () => {
      const user = $("#thm-user").value.trim(); if (!user) return;
      const status = $("#thm-import-status"); status.textContent = "Fetching…";
      try {
        const res = await fetch(`https://tryhackme.com/api/v2/public-profile/badges?username=${encodeURIComponent(user)}&page=1&limit=200`, { mode: "cors" });
        if (!res.ok) throw new Error(res.status);
        const json = await res.json();
        const docs = (json.data && (json.data.docs || json.data)) || json.docs || [];
        const titles = new Set(docs.map(d => (d.title || "").toLowerCase()));
        let n = 0;
        BADGES.forEach(b => { if (titles.has(b.name.toLowerCase()) && !state.earned.has(b.slug)) { state.earned.add(b.slug); n++; } });
        saveEarned(); renderGrid(); renderProgress();
        status.textContent = `Imported ${docs.length} badges from ${user} (${n} new).`;
      } catch (err) {
        status.textContent = "Couldn't reach TryHackMe from the browser (CORS or private profile). Use Export/Import instead.";
      }
    });

    const report = $("#report-link");
    if (report && report.dataset.repo) report.href = `https://github.com/${report.dataset.repo}/issues/new?template=badge-fix.yml`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderChips(); renderGrid(); renderOther(); renderProgress(); renderFacts(); injectJsonLd(); bind();
    if (location.hash) { const el = document.getElementById(location.hash.slice(1)); if (el) setTimeout(() => el.scrollIntoView({ block: "center" }), 50); }
  });
})();
