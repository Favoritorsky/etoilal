// Общение (5.11.2026): #/чат — общий чат всех пользователей сайта; #/книги — книги, которые пишут и выпускают сами пользователи
// (писать можно с уровня 4 — artizan «Мастер»; читать — всем, даже без входа). Хранится в Supabase: таблицы chat и books
// (сайт/supabase_3_чат_книги.sql — выполняет владелец проекта). Нет таблиц — страницы говорят, что раздел ещё не настроен.
const BOOK_LEVEL = 4;
const socNoTables = (what) => `<div class="card soon nokeep"><div class="ic">🛠</div><h2>${what} ещё не настроен</h2>
  <p class="muted">Владельцу сайта нужно один раз выполнить файл <b>supabase_3_чат_книги.sql</b> в Supabase (SQL Editor).</p></div>`;
const socWhen = (t) => { const d = new Date(t), now = new Date();
  return d.toDateString() === now.toDateString() ? d.toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) : d.toLocaleDateString("ru", { day: "numeric", month: "short" }) + " " + d.toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }); };
const socErr = (e) => /flood/.test(e.message) ? "Слишком часто — подожди немного." : /row-level security|42501/.test(e.message) ? "Нет прав на это действие." : e.message;
// текст Etoilal → слова, на которые можно нажать (разбор — как в библиотеке)
const socWords = (t) => esc(t).split(/(\s+)/).map((w) => /[a-z]/i.test(w) && !/[а-яё]/i.test(w) ? `<span class="sw">${w}</span>` : w).join("");

// ---------------------------------------------------------------- чат
let CHAT = { last: 0, timer: null, rows: [] };
function pageChat() {
  return `<div class="k">Общение</div><h1 class="page">Чат</h1>
  <p class="lead">Общий чат всех, кто учит Etoilal. Пиши на Etoilal или по-русски. Нажми на слово Etoilal в сообщении — увидишь разбор.</p>
  <div class="card chatc"><div class="chatl" id="chatl"><div class="muted">Загружаю сообщения…</div></div>
    <div id="chatform"></div></div>`;
}
async function bindChat() {
  clearInterval(CHAT.timer); CHAT = { last: 0, timer: null, rows: [] };
  const u = Cloud.user();
  $("#chatform").innerHTML = u ? `<form class="chatf" id="chatf"><input class="in" id="chatin" maxlength="500" autocomplete="off" placeholder="Сообщение… (Enter — отправить)"><button class="btn gold">Отправить</button></form><div class="cmsg" id="chatmsg"></div>`
    : `<div class="chatf muted">Читать могут все. Чтобы писать — <a href="#/вход">войди</a> или <a href="#/вход/регистрация">зарегистрируйся</a>.</div>`;
  const load = async () => {
    if (!$("#chatl")) { clearInterval(CHAT.timer); return; }                         // ушли со страницы
    try {
      const r = await Cloud.api(`/rest/v1/chat?select=id,body,created_at,user_id,profiles(*)&id=gt.${CHAT.last}&order=id.desc&limit=80`, { auth: false });
      if (!$("#chatl")) return;
      if (r.length) { CHAT.rows = [...CHAT.rows, ...r.reverse()].slice(-200); CHAT.last = CHAT.rows[CHAT.rows.length - 1].id; chatRender(); }
      else if (!CHAT.rows.length) $("#chatl").innerHTML = `<div class="muted chate">Пока тихо. Напиши первым — например, <span class="et">Bonjour a tou!</span></div>`;
    } catch (e) { clearInterval(CHAT.timer); $("#chatl").closest(".card").outerHTML = e.status === 404 ? socNoTables("Чат") : `<div class="card soon nokeep"><h2>Чат недоступен</h2><p class="muted">${esc(e.message)}</p></div>`; }
  };
  await load(); CHAT.timer = setInterval(load, 4000);
  const f = $("#chatf"); if (!f) return;
  f.onsubmit = async (e) => { e.preventDefault();
    const inp = $("#chatin"), t = inp.value.trim(); if (!t) return; inp.disabled = true;
    try { await Cloud.api("/rest/v1/chat", { method: "POST", prefer: "return=minimal", body: { body: t } }); inp.value = ""; $("#chatmsg").textContent = ""; await load(); }
    catch (er) { $("#chatmsg").className = "cmsg bad"; $("#chatmsg").textContent = socErr(er); }
    inp.disabled = false; inp.focus(); };
  $("#chatl").addEventListener("click", async (e) => { const d = e.target.closest("[data-del]"); if (!d || !confirm("Удалить сообщение?")) return;
    try { await Cloud.api(`/rest/v1/chat?id=eq.${+d.dataset.del}`, { method: "DELETE", prefer: "return=minimal" }); CHAT.rows = CHAT.rows.filter((x) => x.id !== +d.dataset.del); chatRender(); } catch (er) { toast(socErr(er)); } });
  bindSongWords($("#chatl"));
}
function chatRender() {
  const el = $("#chatl"); if (!el) return; const me = Cloud.user(), stick = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  el.innerHTML = CHAT.rows.map((m) => { const p = m.profiles || {}, mine = me && m.user_id === me.id;
    return `<div class="chm${mine ? " me" : ""}"><div class="chh"><a href="#/игрок/${encodeURIComponent(p.nick || "")}">${esc(p.nick || "?")}</a>${Lv.badge(p.level || 0)}<span class="muted">${socWhen(m.created_at)}</span>${mine ? `<button class="chdel" data-del="${m.id}" title="Удалить">✕</button>` : ""}</div>
      <div class="chb">${socWords(m.body)}</div></div>`; }).join("");
  if (stick || !el.dataset.once) { el.scrollTop = el.scrollHeight; el.dataset.once = 1; }
}

// ---------------------------------------------------------------- книги
const bookCh = (b) => (Array.isArray(b.chapters) ? b.chapters : []);
const bookWords = (b) => bookCh(b).reduce((a, c) => a + String(c.text || "").split(/\s+/).filter(Boolean).length, 0);
function pageBooks(a) {
  if (a[0]) return `<div id="book"><div class="card muted">Загружаю…</div></div>`;
  return `<div class="k">Библиотека</div><h1 class="page">Книги читателей</h1>
  <p class="lead">Книги на Etoilal, которые написали сами ученики. Писать и выпускать книги могут те, кто дошёл до уровня ${Lv.badge(BOOK_LEVEL)} «${LEVELS[BOOK_LEVEL - 1].ru}».</p>
  <div class="row" style="flex-wrap:wrap;gap:10px;margin-bottom:14px"><a class="btn" href="#/библиотека">← Рассказы и сказки</a><span id="bwrite"></span></div>
  <div id="bmine"></div><h2 class="c2h">Выпущенные книги</h2><div class="songs" id="blist"><div class="muted">Загружаю…</div></div>`;
}
async function bindBooks(a) {
  if (a[0] === "новая" || a[0] === "правка") return bookEditor(a[0] === "правка" ? +a[1] : 0);
  if (a[0]) return bookRead(+a[0]);
  const u = Cloud.user(), lv = Lv.level();
  $("#bwrite").innerHTML = !u ? `<a class="btn gold" href="#/вход">Войти, чтобы писать</a>`
    : lv < BOOK_LEVEL ? `<span class="muted">✍ Писать книги можно с уровня <b class="et">${LEVELS[BOOK_LEVEL - 1].w}</b> — у тебя ${lv ? `<b class="et">${LEVELS[lv - 1].w}</b>` : "пока нет уровня"}. Сдавай контрольные!</span>`
    : `<a class="btn gold" href="#/книги/новая">✍ Написать книгу</a>`;
  try {
    const r = await Cloud.api(`/rest/v1/books?select=id,title,about,chapters,published_at,author,profiles(*)&status=eq.published&order=published_at.desc&limit=100`, { auth: false });
    if (!$("#blist")) return;
    $("#blist").innerHTML = r.length ? r.map((b) => `<a class="card songc" href="#/книги/${b.id}"><div class="sn">📕</div><div><b class="et">${esc(b.title)}</b>
      <div>${esc((b.profiles || {}).nick || "?")} ${Lv.badge((b.profiles || {}).level || 0)}</div><small class="muted">${bookCh(b).length} глав · ${bookWords(b)} слов · ${new Date(b.published_at).toLocaleDateString("ru")}</small></div></a>`).join("")
      : `<div class="card muted">Пока ни одной книги. Стань первым автором!</div>`;
    if (u) { const m = await Cloud.api(`/rest/v1/books?select=id,title,status,updated_at&author=eq.${u.id}&order=updated_at.desc`);
      if (m.length && $("#bmine")) $("#bmine").innerHTML = `<h2 class="c2h">Мои книги</h2><div class="llist">${m.map((b) => `<a class="card lrow" href="#/книги/правка/${b.id}"><span class="ln">${b.status === "published" ? "📕" : "📝"}</span>
        <span class="lt"><b class="et">${esc(b.title)}</b><small>${b.status === "published" ? "выпущена" : "черновик"} · изменена ${new Date(b.updated_at).toLocaleDateString("ru")}</small></span><span class="lst">✎</span></a>`).join("")}</div>`; }
  } catch (e) { if ($("#blist")) $("#blist").outerHTML = e.status === 404 ? socNoTables("Раздел книг") : `<div class="card muted">${esc(e.message)}</div>`; }
}
async function bookRead(id) {
  let b; try { b = (await Cloud.api(`/rest/v1/books?select=*,profiles(*)&id=eq.${id}`, { auth: !!Cloud.user() }))[0]; } catch (e) {}
  if (!$("#book")) return;
  if (!b) { $("#book").innerHTML = `<div class="card soon nokeep"><h2>Книга не найдена</h2><a class="btn gold" href="#/книги">Все книги</a></div>`; return; }
  await trReady(); const me = Cloud.user(), p = b.profiles || {};
  $("#book").innerHTML = `<a class="muted" href="#/книги">← Все книги</a><div class="k" style="margin-top:10px">${b.status === "published" ? "Книга" : "Черновик — видишь только ты"}</div>
    <h1 class="page"><span class="et" style="font-size:inherit">${esc(b.title)}</span></h1>
    <p class="muted">Автор: <a href="#/игрок/${encodeURIComponent(p.nick || "")}">${esc(p.nick || "?")}</a> ${Lv.badge(p.level || 0)}${me && me.id === b.author ? ` · <a href="#/книги/правка/${b.id}">✎ править</a>` : ""}</p>
    ${b.about ? `<p class="lead">${esc(b.about)}</p>` : ""}<p class="muted">Нажми на слово — разбор.</p>
    <div class="card libt bookt" id="bookt">${bookCh(b).map((c, i) => `<h2 class="c2h">${i + 1}. ${socWords(c.t || "")}</h2>${String(c.text || "").split(/\n{2,}/).map((par) => `<p>${socWords(par).replace(/\n/g, "<br>")}</p>`).join("")}`).join("") || `<p class="muted">Пока пусто.</p>`}</div>`;
  bindSongWords($("#bookt"));
}
async function bookEditor(id) {
  const u = Cloud.user(), lv = Lv.level();
  if (!u) { $("#book").innerHTML = `<div class="card soon nokeep"><h2>Сначала войди</h2><a class="btn gold" href="#/вход">Войти</a></div>`; return; }
  if (lv < BOOK_LEVEL) { $("#book").innerHTML = `<div class="card soon nokeep"><div class="ic">🔒</div><h2>Писать книги можно с уровня ${Lv.badge(BOOK_LEVEL)}</h2><p class="muted">Сдай контрольную раздела ${BOOK_LEVEL} «${esc(ET_C2I.sections[BOOK_LEVEL - 1])}».</p><a class="btn gold" href="#/учиться">К урокам</a></div>`; return; }
  let b = { title: "", about: "", chapters: [{ t: "", text: "" }], status: "draft" };
  if (id) { try { b = (await Cloud.api(`/rest/v1/books?select=*&id=eq.${id}&author=eq.${u.id}`))[0] || null; } catch (e) { b = null; }
    if (!b) { $("#book").innerHTML = `<div class="card soon nokeep"><h2>Книга не найдена</h2><a class="btn gold" href="#/книги">Все книги</a></div>`; return; } }
  await trReady();
  const ch = bookCh(b).length ? bookCh(b) : [{ t: "", text: "" }];
  const chHtml = (c, i) => `<div class="card bch" data-i="${i}"><div class="row"><b>Глава ${i + 1}</b><button class="btn sm" data-rm="${i}" type="button">✕ Убрать</button></div>
    <input class="in et-in" data-f="t" maxlength="120" placeholder="Название главы на Etoilal" value="${esc(c.t || "")}">
    <textarea class="in et-in" data-f="text" rows="10" placeholder="Текст главы на Etoilal. Пустая строка — новый абзац.">${esc(c.text || "")}</textarea>
    <div class="row" style="justify-content:flex-start;gap:8px"><button class="btn sm" data-chk="${i}" type="button">✅ Проверить ошибки</button><span class="muted" data-cnt></span></div><div class="bchk"></div></div>`;
  $("#book").innerHTML = `<a class="muted" href="#/книги">← Все книги</a><div class="k" style="margin-top:10px">${id ? (b.status === "published" ? "Правка выпущенной книги" : "Черновик") : "Новая книга"}</div>
    <h1 class="page">Редактор книги</h1>
    <div class="card bedit"><label>Название (на Etoilal)<input class="in et-in" id="btitle" maxlength="120" value="${esc(b.title)}" placeholder="Le Etoil Perdey"></label>
      <label>О чём книга (по-русски, коротко)<textarea class="in" id="babout" rows="2" maxlength="1000">${esc(b.about || "")}</textarea></label></div>
    <div id="bchs">${ch.map(chHtml).join("")}</div>
    <div class="row bbar" style="flex-wrap:wrap;gap:10px"><button class="btn" id="badd">＋ Глава</button><button class="btn" id="bsave">${b.status === "published" ? "💾 Сохранить" : "💾 Сохранить черновик"}</button>
      ${b.status === "published" ? "" : `<button class="btn gold" id="bpub">📕 Выпустить книгу</button>`}
      ${b.status === "published" ? `<button class="btn" id="bunpub">Снять с выпуска</button>` : ""}${id ? `<button class="btn" id="bdel">🗑 Удалить</button>` : ""}</div>
    <div class="cmsg" id="bmsg"></div>`;
  const collect = () => ({ title: $("#btitle").value.trim(), about: $("#babout").value.trim(),
    chapters: [...document.querySelectorAll(".bch")].map((x) => ({ t: x.querySelector('[data-f="t"]').value.trim(), text: x.querySelector('[data-f="text"]').value.trim() })).filter((c) => c.t || c.text) });
  const renum = () => document.querySelectorAll(".bch").forEach((x, i) => { x.dataset.i = i; x.querySelector("b").textContent = "Глава " + (i + 1); });
  $("#badd").onclick = () => { $("#bchs").insertAdjacentHTML("beforeend", chHtml({}, document.querySelectorAll(".bch").length)); };
  $("#bchs").addEventListener("click", (e) => {
    const rm = e.target.closest("[data-rm]"); if (rm) { const c = rm.closest(".bch"); if (!c.querySelector("textarea").value.trim() || confirm("Убрать главу вместе с текстом?")) { c.remove(); renum(); } return; }
    const ck = e.target.closest("[data-chk]"); if (!ck) return;
    const c = ck.closest(".bch"), text = c.querySelector("textarea").value, out = c.querySelector(".bchk"); let iss = [];
    for (const sent of text.split(/(?<=[.!?])\s+|\n+/).filter((x) => x.trim())) { try { for (const x of Checker.check(sent.trim())) if (!x.soft) iss.push([sent.trim(), x]); } catch (er) {} }
    c.querySelector("[data-cnt]").textContent = iss.length ? `найдено: ${iss.length}` : "ошибок не найдено ✓";
    out.innerHTML = iss.slice(0, 30).map(([s, x]) => `<div class="note unk"><span class="et">${esc(s.slice(0, x.a))}<b class="err">${esc(s.slice(x.a, x.b))}</b>${esc(s.slice(x.b))}</span><br>${esc(x.title)}: ${esc(x.why || "")}</div>`).join("");
  });
  const save = async (status) => {
    const d = collect(), msg = $("#bmsg");
    if (!d.title) { msg.className = "cmsg bad"; msg.textContent = "Напиши название книги."; return; }
    if (status === "published" && !d.chapters.some((c) => c.text.split(/\s+/).length >= 20)) { msg.className = "cmsg bad"; msg.textContent = "Чтобы выпустить книгу, нужна хотя бы одна глава от 20 слов."; return; }
    const body = { ...d, status, updated_at: new Date().toISOString(), ...(status === "published" && b.status !== "published" ? { published_at: new Date().toISOString() } : {}) };
    msg.className = "cmsg"; msg.textContent = "Сохраняю…";
    try {
      if (id) await Cloud.api(`/rest/v1/books?id=eq.${id}`, { method: "PATCH", prefer: "return=minimal", body });
      else { const r = await Cloud.api("/rest/v1/books", { method: "POST", prefer: "return=representation", body }); id = r[0].id; }
      b.status = status; toast(status === "published" ? "📕 Книга выпущена!" : "💾 Сохранено");
      location.hash = status === "published" ? `#/книги/${id}` : `#/книги/правка/${id}`;
    } catch (er) { msg.className = "cmsg bad"; msg.textContent = er.status === 404 ? "Раздел книг ещё не настроен на сервере." : socErr(er); }
  };
  $("#bsave").onclick = () => save(b.status === "published" ? "published" : "draft");
  if ($("#bpub")) $("#bpub").onclick = () => save("published");
  if ($("#bunpub")) $("#bunpub").onclick = () => save("draft");
  if ($("#bdel")) $("#bdel").onclick = async () => { if (!confirm("Удалить книгу навсегда?")) return;
    try { await Cloud.api(`/rest/v1/books?id=eq.${id}`, { method: "DELETE", prefer: "return=minimal" }); toast("Книга удалена"); location.hash = "#/книги"; } catch (er) { $("#bmsg").textContent = socErr(er); } };
}
