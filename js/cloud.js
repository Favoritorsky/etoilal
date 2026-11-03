// Облако (Supabase, только публичный publishable key): аккаунты (ник + почта + пароль), прогресс на всех устройствах,
// топ недели, профиль игрока по нику. Без входа всё работает локально. Без библиотек: Auth и REST — обычным fetch.
// Таблицы и политики RLS — сайт/supabase.sql (выполняет владелец проекта в SQL Editor). Нет таблиц → топы скрыты.
const Cloud = (() => {
  const API = "https://pjxexspaiirdesnjquhi.supabase.co", KEY = "sb_publishable_Dv4H7zUc9ZL9CT8d7rvgjg_2gv95r3F";
  const SK = "etoilal-session";
  let sess = null; try { sess = JSON.parse(localStorage.getItem(SK) || "null"); } catch (e) {}
  const st = { tables: null, last: null, busy: false, err: "" };
  const keepSess = () => { try { sess ? localStorage.setItem(SK, JSON.stringify(sess)) : localStorage.removeItem(SK); } catch (e) {} };

  const MSG = [[/invalid login credentials/i, "Неверная почта или пароль."], [/already (registered|been registered)|user_already_exists/i, "Эта почта уже зарегистрирована — войди."],
    [/email not confirmed|email_not_confirmed/i, "Почта ещё не подтверждена: открой письмо и нажми ссылку, потом войди."],
    [/password.*(at least|short|characters)|weak_password/i, "Пароль слишком простой: нужно не меньше 6 знаков."], [/valid email|email_address_invalid|invalid.*email/i, "Похоже, почта написана с ошибкой."],
    [/rate limit|too many|over_email_send_rate_limit/i, "Слишком много попыток — подожди пару минут."], [/database error saving new user|duplicate key|23505/i, "Этот ник уже занят — выбери другой."]];
  function niceErr(j, status) {
    const raw = j ? [j.msg, j.message, j.error_description, j.error, j.code, j.error_code].filter(Boolean).join(" ") : "";
    const m = MSG.find(([re]) => re.test(raw)); if (m) return m[1];
    if (status === 429) return MSG[5][1];
    return `Сервер ответил ошибкой (${status}${raw ? ": " + raw.slice(0, 80) : ""}).`;
  }
  async function call(path, { method = "GET", body, auth = true, prefer } = {}) {
    const h = { apikey: KEY, "Content-Type": "application/json" };
    if (auth && sess) { await fresh(); if (sess) h.Authorization = "Bearer " + sess.access_token; }
    if (prefer) h.Prefer = prefer;
    let r;
    try { r = await fetch(API + path, { method, headers: h, body: body === undefined ? undefined : JSON.stringify(body) }); }
    catch (e) { const er = new Error("Нет связи с сервером — проверь интернет."); er.status = 0; throw er; }
    const t = await r.text(); let j = null; try { j = t ? JSON.parse(t) : null; } catch (e) {}
    if (!r.ok) {
      if (r.status === 404 && path.startsWith("/rest/") && !path.startsWith("/rest/v1/rpc/")) {   // таблиц ещё нет (не выполнен supabase.sql) — не спрашивать час
        st.tables = false; try { localStorage.setItem("etoilal-cloud-missing", String(Date.now() + 3600e3)); } catch (e) {}
      }
      const er = new Error(niceErr(j, r.status)); er.status = r.status; throw er;
    }
    if (path.startsWith("/rest/")) { st.tables = true; try { localStorage.removeItem("etoilal-cloud-missing"); } catch (e) {} }
    return j;
  }
  function setSess(j) {
    const u = j.user || {};
    sess = { access_token: j.access_token, refresh_token: j.refresh_token, expires_at: j.expires_at || Math.floor(Date.now() / 1000) + (j.expires_in || 3600),
      id: u.id, email: u.email, nick: (u.user_metadata && u.user_metadata.nick) || (sess && sess.nick) || "" };
    keepSess();
  }
  async function fresh() {                                   // продлить вход, если токен скоро истечёт
    if (!sess || sess.expires_at * 1000 > Date.now() + 60000) return;
    try {
      const r = await fetch(API + "/auth/v1/token?grant_type=refresh_token", { method: "POST", headers: { apikey: KEY, "Content-Type": "application/json" }, body: JSON.stringify({ refresh_token: sess.refresh_token }) });
      if (r.ok) setSess(await r.json()); else if (r.status >= 400 && r.status < 500) { sess = null; keepSess(); }
    } catch (e) {}                                           // нет сети — попробуем позже
  }

  // ---------------------------------------------------------- слияние прогресса двух устройств: большее / новейшее
  const DATE = /^\d{4}-\d{2}-\d{2}/;
  const isObj = (x) => x && typeof x === "object" && !Array.isArray(x);
  function mergeAny(a, b, bNewer) {
    if (a === undefined || a === null) return b; if (b === undefined || b === null) return a;
    if (Array.isArray(a) && Array.isArray(b)) { const seen = new Set(a.map((x) => JSON.stringify(x))); return a.concat(b.filter((x) => !seen.has(JSON.stringify(x)))); }
    if (isObj(a) && isObj(b)) { const o = { ...a }; for (const k in b) o[k] = mergeAny(a[k], b[k], bNewer); return o; }
    if (typeof a === "number" && typeof b === "number") return Math.max(a, b);
    if (typeof a === "boolean" && typeof b === "boolean") return a || b;
    if (typeof a === "string" && typeof b === "string" && DATE.test(a) && DATE.test(b)) return a > b ? a : b;
    return bNewer ? b : a;
  }
  function merge(a, b) {
    a = a || {}; b = b || {};
    const bNewer = (b.updated || "") > (a.updated || "");
    const o = mergeAny(a, b, bNewer);
    const spent = Math.max(a.spent || 0, b.spent || 0);                       // очки: заработанное — максимум, потраченное не возвращается
    o.points = Math.max((a.points || 0) + (a.spent || 0), (b.points || 0) + (b.spent || 0)) - spent; o.spent = spent;
    const opened = Math.max(a.chestsOpened || 0, b.chestsOpened || 0);       // сундуки: открытый не появляется снова
    o.chests = Math.max(0, Math.max((a.chests || 0) + (a.chestsOpened || 0), (b.chests || 0) + (b.chestsOpened || 0)) - opened); o.chestsOpened = opened;
    o.days = [...new Set([...(a.days || []), ...(b.days || [])])].sort().slice(-400);
    o.cards = { ...(a.cards || {}) };                                         // карточка — целиком с того устройства, где её повторяли позже
    for (const [w, c] of Object.entries(b.cards || {})) { const x = o.cards[w]; if (!x || (c.last || "") > (x.last || "") || ((c.last || "") === (x.last || "") && (c.reps || 0) > (x.reps || 0))) o.cards[w] = c; }
    if (a.daily && b.daily && a.daily.date !== b.daily.date) o.daily = a.daily.date > b.daily.date ? a.daily : b.daily;
    if (a.week && b.week) o.week = a.week.w !== b.week.w ? (a.week.w > b.week.w ? a.week : b.week) : { w: a.week.w, base: Math.min(a.week.base, b.week.base), last: o.points };
    if (a.created && b.created) o.created = a.created < b.created ? a.created : b.created;
    o.senses = bNewer ? { ...(a.senses || {}), ...(b.senses || {}) } : { ...(b.senses || {}), ...(a.senses || {}) };
    o.myWords = [...new Set([...(a.myWords || []), ...(b.myWords || [])])];
    // новый самоучитель (3.11.2026): уроки берём только у копий нового курса, старые — в lessonsOld
    const nl = (x) => (x.courseV === 2 ? x.lessons || {} : {}), ol = (x) => (x.courseV === 2 ? x.lessonsOld || {} : { ...(x.lessonsOld || {}), ...(x.lessons || {}) });
    o.lessons = mergeAny(nl(a), nl(b), bNewer); o.lessonsOld = mergeAny(ol(a), ol(b), bNewer); o.courseV = 2;
    o.board = bNewer ? (b.board || a.board) : (a.board || b.board);
    o.c2ans = { ...(a.c2ans || {}) };                                          // ответы уроков: урок целиком — где отвечали позже
    for (const [k, v] of Object.entries(b.c2ans || {})) { const x = o.c2ans[k]; if (!x || (v.at || "") > (x.at || "")) o.c2ans[k] = v; }                 // доска шпаргалок — целиком с более нового устройства
    return o;
  }

  // ---------------------------------------------------------- синхронизация
  let timer = null;
  // отправка всегда через sync (забрать → объединить → записать): иначе устройство со старым прогрессом затёрло бы новый
  function schedule() { if (!sess) return; clearTimeout(timer); timer = setTimeout(() => { timer = null; sync(); }, 4000); }
  async function push() {
    if (!sess) return;
    clearTimeout(timer);
    const S = Store.get(), id = sess.id;
    const stars = Object.values(S.lessons || {}).reduce((x, l) => x + (l.stars || 0), 0);
    try {
      await call("/rest/v1/progress?on_conflict=user_id", { method: "POST", prefer: "resolution=merge-duplicates,return=minimal", body: { user_id: id, data: S, updated_at: new Date().toISOString() } });
      await call("/rest/v1/profiles?on_conflict=id", { method: "POST", prefer: "resolution=merge-duplicates,return=minimal",
        body: { id, nick: sess.nick, points: S.points, lessons: Object.values(S.lessons || {}).filter((l) => l.stars > 0).length, stars, streak: Store.streak(), updated_at: new Date().toISOString() } });
      await call("/rest/v1/weekly?on_conflict=user_id,week", { method: "POST", prefer: "resolution=merge-duplicates,return=minimal", body: { user_id: id, week: Store.monday(), points: Store.weekPoints() } });
      st.last = new Date(); st.err = "";
    } catch (e) { st.err = e.message; }
  }
  async function sync() {                                    // забрать с сервера → объединить → сохранить у себя и отправить обратно
    if (!sess) return false;
    if (st.busy) { schedule(); return false; }             // уже идёт — повторим чуть позже, чтобы не потерять изменения
    st.busy = true; let changed = false;
    try {
      const rows = await call(`/rest/v1/progress?select=data,updated_at&user_id=eq.${sess.id}`);
      if (rows && rows[0] && rows[0].data) {
        const before = JSON.stringify(Store.get()), m = merge(Store.get(), rows[0].data);
        Store.load(m); changed = JSON.stringify(m) !== before;
      }
      await push();
    } catch (e) { st.err = e.message; }
    st.busy = false;
    return changed;
  }
  window.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && timer) { clearTimeout(timer); timer = null; sync(); } });

  // ---------------------------------------------------------- вход и регистрация
  const NICK = /^[A-Za-zА-Яа-яЁё0-9_\-]{2,24}$/;
  const likeEsc = (s) => encodeURIComponent(s.replace(/[\\%_*]/g, (c) => "\\" + c));
  async function nickFree(nick) {
    try { const r = await call(`/rest/v1/profiles?select=id&nick=ilike.${likeEsc(nick)}`, { auth: false }); return !r.length; }
    catch (e) { return true; }                               // таблиц нет — проверит уникальный индекс при регистрации
  }
  async function signUp(nick, email, pass) {
    nick = nick.trim(); email = email.trim();
    if (!NICK.test(nick)) throw new Error("Ник — от 2 до 24 букв, цифр, «_» или «-», без пробелов.");
    if (pass.length < 6) throw new Error(MSG[3][1]);
    if (!(await nickFree(nick))) throw new Error(MSG[6][1]);
    const j = await call("/auth/v1/signup", { method: "POST", auth: false, body: { email, password: pass, data: { nick } } });
    if (j && j.access_token) { setSess(j); sess.nick = nick; keepSess(); await sync(); return "in"; }
    if (j && j.identities && !j.identities.length) throw new Error(MSG[1][1]);   // так Supabase отвечает на уже занятую почту
    return "confirm";
  }
  // вход по нику: серверная функция etoilal_login_email (supabase_2_вход_по_нику.sql) отдаёт почту ТОЛЬКО при верном пароле
  async function nickEmail(nick, pass) {
    if (!NICK.test(nick)) throw new Error("Неверный ник или пароль.");
    let e;
    try { e = await call("/rest/v1/rpc/etoilal_login_email", { method: "POST", auth: false, body: { nick, password: pass } }); }
    catch (er) {
      if (er.status === 404) throw new Error("Вход по нику на сервере ещё не настроен — войди по почте.");
      throw er;
    }
    if (typeof e !== "string" || !e.includes("@")) throw new Error("Неверный ник или пароль. После 5 ошибок подряд вход по нику закрывается на 15 минут (по почте — можно).");
    return e;
  }
  async function signIn(login, pass) {
    login = login.trim();
    const email = login.includes("@") ? login : await nickEmail(login, pass);
    const j = await call("/auth/v1/token?grant_type=password", { method: "POST", auth: false, body: { email, password: pass } });
    setSess(j);
    if (!sess.nick) {                                        // ник из профиля (если вход без метаданных)
      try { const p = await call(`/rest/v1/profiles?select=nick&id=eq.${sess.id}`); if (p[0]) { sess.nick = p[0].nick; keepSess(); } } catch (e) {}
    }
    if (!sess.nick) { sess.nick = sess.email.split("@")[0].slice(0, 24); keepSess(); }
    await sync();
  }
  async function signOut() {
    if (timer) { clearTimeout(timer); timer = null; await sync(); }
    try { await call("/auth/v1/logout", { method: "POST" }); } catch (e) {}
    sess = null; keepSess(); st.last = null;
  }

  // ---------------------------------------------------------- топ недели и игроки
  async function top(n = 10) {
    if (+localStorage.getItem("etoilal-cloud-missing") > Date.now()) throw new Error("нет таблиц");
    const r = await call(`/rest/v1/weekly?select=points,user_id,profiles(nick)&week=eq.${Store.monday()}&points=gt.0&order=points.desc&limit=${n}`, { auth: false });
    return r.map((x) => ({ nick: x.profiles ? x.profiles.nick : "?", points: x.points, me: sess && x.user_id === sess.id }));
  }
  async function player(nick) {
    const r = await call(`/rest/v1/profiles?select=nick,points,lessons,stars,streak,updated_at,created_at&nick=ilike.${likeEsc(nick)}`, { auth: false });
    return r[0] || null;
  }

  Store.setHook(schedule);
  return { user: () => sess, state: st, signUp, signIn, signOut, sync, push, top, player, merge, schedule };
})();

// ---------------------------------------------------------------- страницы: #/вход, #/игрок/ник, карточка в профиле, топ на главной
function cloudPageLogin(a) {
  const u = Cloud.user(), reg = a[0] === "регистрация";
  if (u) return `<div class="card soon"><div class="ic">☁</div><h2>Ты уже вошёл как ${esc(u.nick)}</h2><p class="muted">${esc(u.email)}</p><a class="btn gold" href="#/профиль">В профиль</a></div>`;
  return `<div class="loginw"><div class="k">Аккаунт</div><h1 class="page">${reg ? "Регистрация" : "Вход"}</h1>
  <p class="lead">Без входа всё работает и хранится в этом браузере. Аккаунт нужен, чтобы прогресс был на всех твоих устройствах и чтобы попасть в топ недели.</p>
  <div class="card loginc"><div class="seg"><a class="${reg ? "" : "on"}" href="#/вход">Вход</a><a class="${reg ? "on" : ""}" href="#/вход/регистрация">Регистрация</a></div>
    <form id="cform" autocomplete="on">
      ${reg ? `<label><span>Ник <small class="muted">— его увидят в топе</small></span><input name="nick" required maxlength="24" autocomplete="username" placeholder="например, Lila"></label>` : ""}
      ${reg ? `<label>Почта<input name="email" type="email" required autocomplete="email" placeholder="ты@пример.ру"></label>`
        : `<label>Ник или почта<input name="email" type="text" required autocomplete="username" autocapitalize="none" spellcheck="false" placeholder="Lila или ты@пример.ру"></label>`}
      <label>Пароль<input name="pass" type="password" required autocomplete="${reg ? "new-password" : "current-password"}" placeholder="не меньше 6 знаков"></label>
      <div id="cmsg" class="cmsg"></div>
      <button class="btn gold" type="submit">${reg ? "Создать аккаунт" : "Войти"}</button>
    </form></div>
  <p class="muted" style="max-width:520px">Прогресс этого браузера не пропадёт: при входе он объединится с сохранённым (берётся лучшее — больше звёзд, очков, повторённых карточек).</p></div>`;
}
function cloudBindLogin(a) {
  const f = $("#cform"); if (!f) return;
  const reg = a[0] === "регистрация";
  f.onsubmit = async (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f)), msg = $("#cmsg"), btn = f.querySelector("button");
    msg.className = "cmsg"; msg.textContent = "Подожди…"; btn.disabled = true;
    try {
      if (reg) {
        const r = await Cloud.signUp(d.nick, d.email, d.pass);
        if (r === "confirm") { msg.className = "cmsg ok"; msg.textContent = "Готово! Мы отправили письмо на " + d.email + " — открой его, нажми ссылку и потом войди."; btn.disabled = false; return; }
      } else await Cloud.signIn(d.email, d.pass);
      toast("☁ Вход выполнен"); location.hash = "#/профиль";
    } catch (er) { msg.className = "cmsg bad"; msg.textContent = er.message; btn.disabled = false; }
  };
}
function cloudCard() {
  const u = Cloud.user(), s = Cloud.state;
  if (!u) return `<div class="card cloudc"><div class="rki">☁</div><div style="flex:1 1 220px;min-width:0"><b>Сохрани прогресс в облаке</b>
    <div class="muted">Войди — и уроки, очки, карточки и покупки будут на всех твоих устройствах. Без входа всё хранится только в этом браузере.</div></div>
    <div class="row" style="flex-wrap:wrap"><a class="btn gold" href="#/вход">Войти</a><a class="btn" href="#/вход/регистрация">Регистрация</a></div></div>`;
  const when = s.last ? "синхронизировано в " + s.last.toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) : "ещё не синхронизировано";
  return `<div class="card cloudc"><div class="rki">☁</div><div style="flex:1 1 220px;min-width:0"><b>${esc(u.nick)}</b> <span class="muted">· ${esc(u.email)}</span>
    <div class="muted" id="cstat">${s.err ? `<span class="bad">⚠ ${esc(s.err)}</span>` : "Прогресс сохраняется в облаке · " + when}</div></div>
    <div class="row" style="flex-wrap:wrap"><button class="btn" id="csync">⟳ Синхронизировать</button><a class="btn" href="#/игрок/${encodeURIComponent(u.nick)}">Моя страница</a><button class="btn" id="cout">Выйти</button></div></div>`;
}
function cloudBindCard() {
  const s = $("#csync"), o = $("#cout");
  if (s) s.onclick = async () => { s.disabled = true; s.textContent = "…"; await Cloud.sync(); applyTheme(); toast(Cloud.state.err ? "⚠ " + Cloud.state.err : "☁ Синхронизировано"); route(); };
  if (o) o.onclick = async () => { await Cloud.signOut(); toast("Ты вышел. Прогресс остался в этом браузере."); route(); };
}
async function cloudFillTop() {
  const el = $("#ctop"); if (!el) return;
  try {
    const r = await Cloud.top(8);
    if (!$("#ctop")) return;
    el.innerHTML = `<div class="card"><h3>🏆 Топ недели</h3>${r.length ? `<ol class="topw">${r.map((x) => `<li class="${x.me ? "me" : ""}"><a href="#/игрок/${encodeURIComponent(x.nick)}">${esc(x.nick)}</a><b>✦ ${x.points}</b></li>`).join("")}</ol>`
      : `<p class="muted">На этой неделе ещё никого — стань первым!</p>`}
      ${Cloud.user() ? "" : `<div class="muted" style="margin-top:8px"><a href="#/вход">Войди</a>, чтобы попасть в топ.</div>`}</div>`;
  } catch (e) { el.innerHTML = ""; }                         // нет таблиц или сети — топ просто не показываем
}
function cloudPagePlayer(a) { return `<div id="cplayer"><div class="card soon"><div class="ic">✦</div><h2>Загружаю ${esc(a[0] || "")}…</h2></div></div>`; }
async function cloudBindPlayer(a) {
  const el = $("#cplayer"); let p = null, err = "";
  try { p = a[0] ? await Cloud.player(a[0]) : null; } catch (e) { err = e.status === 404 ? "Облако ещё не настроено." : e.message; }
  if (!$("#cplayer")) return;
  if (!p) { el.innerHTML = `<div class="card soon"><div class="ic">🔭</div><h2>${err ? esc(err) : "Игрок «" + esc(a[0] || "") + "» не найден"}</h2><a class="btn gold" href="#/главная">На главную</a></div>`; return; }
  const k = typeof rankIdx === "function" ? rankIdx(p.points) : 0, R = typeof RANKS !== "undefined" ? RANKS[k] : ["", "✦", ""];
  el.innerHTML = `<div class="k">Игрок</div><h1 class="page">${esc(p.nick)}</h1>
    <div class="card rankc"><div class="rki">${R[1]}</div><div style="flex:1 1 200px;min-width:0"><div class="k">Звание</div><div class="rkn">${esc(R[2])}</div>
      <div class="muted">${p.updated_at ? "занимался " + new Date(p.updated_at).toLocaleDateString("ru") : ""}</div></div></div>
    <div class="pstats">${[["✦", p.points, "очков"], ["📖", p.lessons, "уроков"], ["⭐", p.stars, "звёзд"], ["🔥", p.streak, "дней подряд"]].map(([i, n, t]) => `<div class="st">${i} ${n || 0}<small>${t}</small></div>`).join("")}</div>`;
}
