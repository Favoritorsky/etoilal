// Доска шпаргалок (уроки самоучителя): карточки по бокам урока — шпаргалка текущего урока, закреплённые таблицы
// (урок предлагает «📌 Закрепить на доске») и свои записи (набираются с клавиатуры). Карточки можно перетаскивать
// (за заголовок) между левой и правой доской, сворачивать, убирать; на телефоне — кнопка 📌 и панель снизу.
// Хранится в Store.get().board = { cards: [{ id, type: "pin"|"note"|"lesson", side: "L"|"R", coll, title, html, text }] } — уходит в облако вместе с прогрессом.
const Board = (() => {
  // 4 шпаргалки урока (меняются вместе с уроком): правило, слова, примеры, частые ошибки — по одной на каждую колонку
  const LCARDS = [["lesson", "R", "📖 Правило урока"], ["lesson-w", "L", "🆕 Слова урока"], ["lesson-ex", "L2", "💡 Примеры"], ["lesson-err", "R2", "⚠ Частые ошибки"]];
  const st = () => { const S = Store.get(); if (!S.board) S.board = { cards: [] };
    LCARDS.forEach(([id, side], k) => { if (!S.board.cards.some((c) => c.id === id)) S.board.cards.splice(k, 0, { id, type: "lesson", side, coll: false }); });
    return S.board; };
  let cur = null;                                     // { title, html } — шпаргалка открытого урока
  const save = () => Store.save();
  function cardHTML(c) {
    const lesson = c.type === "lesson", title = lesson ? LCARDS.find((x) => x[0] === c.id)[2] : c.type === "note" ? "✍ " + (c.title || "Моя шпаргалка") : "📌 " + c.title;
    const lpart = { lesson: "html", "lesson-w": "words", "lesson-ex": "ex", "lesson-err": "err" }[c.id];
    const body = lesson ? (cur && cur[lpart] ? cur[lpart] : `<span class="muted">${cur ? "В этом уроке — нет." : "Откроется вместе с уроком."}</span>`) : c.type === "note"
      ? `<textarea class="bnote" data-note="${c.id}" placeholder="Пиши что угодно: правило своими словами, слова, примеры…">${esc(c.text || "")}</textarea>`
      : c.html;
    return `<div class="bcard${c.coll ? " coll" : ""}${lesson ? " blesson" : ""}" data-id="${c.id}">
      <div class="bhead" draggable="true" title="Перетащи за заголовок"><span class="bgrip">⋮⋮</span><b>${esc(title)}</b>
        <span class="bbtns">${c.type === "note" ? `<button data-ren="${c.id}" title="Переименовать">✎</button>` : ""}${col(c.side) > 0 ? `<button data-mvl="${c.id}" title="Левее">←</button>` : ""}${col(c.side) < 3 ? `<button data-mvr="${c.id}" title="Правее">→</button>` : ""}
        <button data-coll="${c.id}" title="${c.coll ? "Развернуть" : "Свернуть"}">${c.coll ? "▸" : "▾"}</button>${lesson ? "" : `<button data-del="${c.id}" title="Убрать с доски">✕</button>`}</span></div>
      <div class="bbody">${body}</div></div>`;
  }
  // четыре колонки: L2 · L · (урок) · R · R2; на узком экране внешние колонки сливаются с внутренними
  const SIDES = ["L2", "L", "R", "R2"], col = (s) => Math.max(0, SIDES.indexOf(s)), wide = () => innerWidth >= 1880;
  const shown = (s) => (wide() ? s : s === "L2" ? "L" : s === "R2" ? "R" : s);
  function render() {
    const B = st();
    for (const side of SIDES) for (const el of document.querySelectorAll(`.board[data-board="${side}"]`))
      el.innerHTML = B.cards.filter((c) => shown(c.side) === side).map(cardHTML).join("") + (shown(side) === side ? `<button class="btn sm badd" data-add="${side}">＋ Своя шпаргалка</button>` : "");
    const sh = document.querySelector(".bsheet .bsbody");
    if (sh) sh.innerHTML = B.cards.map(cardHTML).join("") + `<button class="btn sm badd" data-add="R">＋ Своя шпаргалка</button>`;
    document.querySelectorAll("[data-pin]").forEach((b) => { const on = B.cards.some((c) => c.id === b.dataset.pin); b.textContent = on ? "✓ На доске" : "📌 Закрепить на доске"; b.classList.toggle("gold", !on); });
  }
  const find = (id) => st().cards.find((c) => c.id === id);
  function pin(id, title, html) { const B = st(); if (B.cards.some((c) => c.id === id)) { B.cards = B.cards.filter((c) => c.id !== id); toast("Убрал с доски"); }
    else { const cnt = (s) => B.cards.filter((c) => shown(c.side) === s).length, opts = wide() ? ["L", "R", "L2", "R2"] : ["L", "R"];
      const side = opts.reduce((a, s) => (cnt(s) < cnt(a) ? s : a), opts[0]); B.cards.push({ id, type: "pin", side, coll: false, title, html }); toast("Закрепил на доске 📌"); }
    save(); render(); }
  let dragId = null;
  function bind(root = document) {
    if (bind.done) return; bind.done = true;
    document.addEventListener("click", (e) => {
      const t = e.target;
      if (t.closest("[data-coll]")) { const c = find(t.closest("[data-coll]").dataset.coll); c.coll = !c.coll; save(); render(); }
      else if (t.closest("[data-mvl]") || t.closest("[data-mvr]")) { const b = t.closest("[data-mvl]") || t.closest("[data-mvr]"), c = find(b.dataset.mvl || b.dataset.mvr);
        const d = b.dataset.mvl ? -1 : 1; let k = col(c.side) + d;
        if (!wide() && (SIDES[k] === "L2" || SIDES[k] === "R2")) k += d;      // на узком экране внешних колонок не видно — перескакиваем
        if (k >= 0 && k < 4) { c.side = SIDES[k]; save(); render(); } }
      else if (t.closest("[data-del]")) { const id = t.closest("[data-del]").dataset.del, c = find(id);
        if (c.type === "note" && c.text && !confirm("Удалить свою шпаргалку?")) return; st().cards = st().cards.filter((x) => x.id !== id); save(); render(); }
      else if (t.closest("[data-add]")) { const id = "n" + Date.now().toString(36); st().cards.push({ id, type: "note", side: t.closest("[data-add]").dataset.add, coll: false, title: "Моя шпаргалка", text: "" }); save(); render();
        setTimeout(() => { const ta = document.querySelector(`[data-note="${id}"]`); if (ta) ta.focus(); }, 30); }
      else if (t.closest("[data-ren]")) { const c = find(t.closest("[data-ren]").dataset.ren), n = prompt("Название шпаргалки:", c.title || ""); if (n !== null) { c.title = n.trim() || "Моя шпаргалка"; save(); render(); } }
      else if (t.closest("[data-pin]")) { const b = t.closest("[data-pin]"), P = (cur && cur.pins || []).find((p) => p.id === b.dataset.pin); if (P) pin(P.id, P.t, P.html); }
      else if (t.closest(".bfab")) document.body.classList.add("bopen");
      else if (t.closest("[data-bclose]") || t.classList.contains("bsheetbg")) document.body.classList.remove("bopen");
    });
    let tmr; document.addEventListener("input", (e) => { const ta = e.target.closest("[data-note]"); if (!ta) return; const c = find(ta.dataset.note); c.text = ta.value; clearTimeout(tmr); tmr = setTimeout(save, 400); });
    // записать сразу, если вкладку закрывают / уходят со страницы / поле теряет фокус — текст не пропадёт
    const flush = () => { if (tmr) { clearTimeout(tmr); tmr = null; save(); } };
    document.addEventListener("focusout", (e) => { if (e.target.closest && e.target.closest("[data-note]")) flush(); });
    window.addEventListener("pagehide", flush); window.addEventListener("beforeunload", flush);
    document.addEventListener("visibilitychange", () => { if (document.hidden) flush(); });
    document.addEventListener("dragstart", (e) => { const h = e.target.closest && e.target.closest(".bhead"); if (!h) return; dragId = h.closest(".bcard").dataset.id; e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", dragId); h.closest(".bcard").classList.add("drag"); });
    document.addEventListener("dragend", () => { document.querySelectorAll(".bcard.drag").forEach((x) => x.classList.remove("drag")); document.querySelectorAll(".board.over").forEach((x) => x.classList.remove("over")); dragId = null; });
    let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { if (document.querySelector(".board")) render(); }, 200); });
    document.addEventListener("dragover", (e) => { const b = e.target.closest && e.target.closest(".board"); if (!b || !dragId) return; e.preventDefault(); document.querySelectorAll(".board.over").forEach((x) => x !== b && x.classList.remove("over")); b.classList.add("over"); });
    document.addEventListener("drop", (e) => { const b = e.target.closest && e.target.closest(".board"); if (!b || !dragId) return; e.preventDefault();
      const B = st(), c = find(dragId), side = b.dataset.board;
      const others = [...b.querySelectorAll(".bcard")].filter((x) => x.dataset.id !== dragId);
      const before = others.find((x) => { const r = x.getBoundingClientRect(); return e.clientY < r.top + r.height / 2; });
      B.cards = B.cards.filter((x) => x !== c); c.side = side;
      const idx = before ? B.cards.findIndex((x) => x.id === before.dataset.id) : (() => { const last = others[others.length - 1]; return last ? B.cards.findIndex((x) => x.id === last.dataset.id) + 1 : B.cards.length; })();
      B.cards.splice(idx, 0, c); save(); render(); });
  }
  // разметка вокруг урока: доски слева и справа + кнопка и панель для телефона
  const wrap = (mainHTML) => `<div class="c2lay"><aside class="board bL2" data-board="L2"></aside><aside class="board bL" data-board="L"></aside><main class="c2main">${mainHTML}</main><aside class="board bR" data-board="R"></aside><aside class="board bR2" data-board="R2"></aside></div>
    <button class="btn gold bfab" title="Доска шпаргалок">📌</button><div class="bsheetbg"></div><div class="bsheet"><div class="row"><b>📌 Доска шпаргалок</b><button class="btn sm" data-bclose>✕</button></div><div class="bsbody"></div></div>`;
  // кнопка «закрепить» рядом с важной таблицей урока
  const pinButton = (id) => `<button class="btn sm" data-pin="${id}">📌 Закрепить на доске</button>`;
  return { wrap, render, bind, pinButton, setLesson(l) { cur = l; }, current: () => cur, pin };
})();
