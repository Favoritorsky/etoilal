// Карточки с интервальным повторением (#/карточки[/колода]): упрощённый SM-2 (Store.review), колоды — «Мои слова», по урокам
// (ET_CWORDS), по темам (частые слова, глаголы, прилагательные — из словаря по частоте), «всё на повторение»; статистика.
// Задание дня (на главной) — тоже здесь: DAILY и dailyCard().

const NEW_PER_SESSION = 10;
let DMAP = null;
const dictInfo = (w) => { if (!DMAP) { DMAP = new Map(); for (const x of ET_DICT.words) if (!DMAP.has(x[0])) DMAP.set(x[0], x); } return DMAP.get(w); };
function deckList() {
  const S = Store.get(), byFreq = (pos) => ET_DICT.words.filter((w) => w[4] && (!pos || w[1] === pos)).sort((a, b) => a[4] - b[4]);
  const fromDict = (arr) => arr.map((w) => [w[0], w[3] || rd(w[0]), w[2], null]);
  const D = [];
  D.push({ id: "мои", name: "Мои слова", icon: "★", sub: "добавленные из словаря и уроков", cards: S.myWords.map((w) => { const x = dictInfo(w); return [w, x ? x[3] || rd(w) : rd(w), x ? x[2] : "", null]; }) });
  const all = new Map(); for (const ws of Object.values(ET_CWORDS)) for (const w of ws) all.set(w[0], w);
  D.push({ id: "повтор", name: "Всё на повторение", icon: "⟳", sub: "все карточки, которым пора", cards: Object.keys(S.cards).map((w) => all.get(w) || (() => { const x = dictInfo(w); return [w, x ? x[3] || rd(w) : rd(w), x ? x[2] : "", null]; })()), dueOnly: true });
  D.push({ id: "частые-100", name: "100 самых частых слов", icon: "🔥", sub: "основа любого разговора", cards: fromDict(byFreq().slice(0, 100)) });
  D.push({ id: "частые-500", name: "Частые слова 101–500", icon: "📈", sub: "следующий шаг", cards: fromDict(byFreq().slice(100, 500)) });
  D.push({ id: "глаголы", name: "100 частых глаголов", icon: "🎵", sub: "делать, идти, видеть…", cards: fromDict(byFreq("v").slice(0, 100)) });
  D.push({ id: "прилагательные", name: "100 частых прилагательных", icon: "🎨", sub: "большой, красивый, новый…", cards: fromDict(byFreq("a").slice(0, 100)) });
  for (const l of ET_TOC) if (ET_CWORDS[l[0]]) D.push({ id: "урок-" + l[0], name: `Урок ${l[0]}: ${l[1]}`, icon: l[0], sub: "", cards: ET_CWORDS[l[0]], lesson: true });
  return D;
}
function deckStat(d) {
  const S = Store.get(), t = Store.today();
  let nw = 0, due = 0, learned = 0, strong = 0;
  for (const c of d.cards) { const r = S.cards[c[0]]; if (!r) nw++; else { if (r.due <= t) due++; if (r.reps > 0) learned++; if (r.iv >= 21) strong++; } }
  return { nw: d.dueOnly ? 0 : nw, due, learned, strong, total: d.cards.length };
}
function pageCards() {
  const S = Store.get(), t = Store.today(), D = deckList();
  const cards = Object.values(S.cards), log = S.cardLog || {};
  const week = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - i); return log[d.toISOString().slice(0, 10)] || 0; }).reduce((a, b) => a + b, 0);
  const dueAll = cards.filter((c) => c.due <= t).length;
  const deckCard = (d) => { const s = deckStat(d); const pct = s.total ? Math.round(s.learned / s.total * 100) : 0;
    return `<a class="card deck${d.lesson ? " sm" : ""}" href="#/карточки/${encodeURIComponent(d.id)}"><div class="row"><span class="dic">${d.icon}</span><span class="dn"><b>${esc(d.name)}</b>${d.sub ? `<small>${esc(d.sub)}</small>` : ""}</span></div>
      <div class="q"><i style="width:${pct}%"></i></div><div class="row muted dstat"><span>${s.learned} / ${s.total} выучено</span><span>${s.due ? `<b class="due">${s.due} пора</b>` : ""}${s.nw ? ` · ${s.nw} новых` : ""}</span></div></a>`; };
  return `<div class="k">Карточки</div><h1 class="page">Слова, которые <i>не забываются</i></h1>
  <p class="lead">Интервальное повторение: слово возвращается, когда ты вот-вот его забудешь — через день, три, неделю, месяц. Честно отвечай «помню / не помню» — остальное посчитаю я.</p>
  <div class="stats cstats"><div class="st">⟳ ${dueAll}<small>пора повторить</small></div><div class="st">📚 ${cards.filter((c) => c.reps > 0).length}<small>выучено</small></div>
    <div class="st">💪 ${cards.filter((c) => c.iv >= 21).length}<small>крепко (21+ дн.)</small></div><div class="st">✓ ${log[t] || 0}<small>сегодня</small></div><div class="st">📅 ${week}<small>за 7 дней</small></div></div>
  <h2 style="margin-top:22px">Колоды</h2><div class="decks">${D.filter((d) => !d.lesson).map(deckCard).join("")}</div>
  <h2 style="margin-top:22px">По урокам</h2><div class="decks">${D.filter((d) => d.lesson).map(deckCard).join("")}</div>`;
}

// ---------------------------------------------------------------- сессия
let CS = null;
const ivText = (n) => n <= 0 ? "сегодня" : n === 1 ? "завтра" : n < 30 ? `через ${n} дн.` : `через ${Math.round(n / 30)} мес.`;
function previewIv(word, q) {                          // сколько дней даст ответ q (как Store.review, но без записи)
  const c = Object.assign({ ef: 2.5, iv: 0, reps: 0 }, Store.get().cards[word] || {});
  if (q < 3) return 0;
  const reps = c.reps + 1;
  return reps === 1 ? (q === 5 ? 3 : 1) : reps === 2 ? (q === 5 ? 6 : 3) : Math.round(c.iv * c.ef * (q === 5 ? 1.3 : q === 3 ? 0.8 : 1));
}
function pageCardSession(args) { return `<div id="cses"></div>`; }
function bindCardSession(args) {
  const d = deckList().find((x) => x.id === args[0]);
  if (!d) { $("#cses").innerHTML = `<div class="card soon"><h2>Такой колоды нет</h2><a class="btn gold" href="#/карточки">Все колоды</a></div>`; return; }
  const S = Store.get(), t = Store.today();
  const due = d.cards.filter((c) => S.cards[c[0]] && S.cards[c[0]].due <= t).sort((a, b) => S.cards[a[0]].due.localeCompare(S.cards[b[0]].due));
  const fresh = d.dueOnly ? [] : d.cards.filter((c) => !S.cards[c[0]]).slice(0, NEW_PER_SESSION);
  CS = { d, queue: [...due, ...fresh], i: 0, shown: false, done: 0, again: 0, rev: localStorage.getItem("etoilal-cards-rev") === "1", newSet: new Set(fresh.map((c) => c[0])) };
  if (!CS.queue.length) { $("#cses").innerHTML = `<div class="card tdone"><div class="bigstars">✓</div><h2>На сегодня всё!</h2>
    <p class="muted">В колоде «${esc(d.name)}» нет карточек, которым пора. ${d.dueOnly ? "" : "Новые слова закончились — или загляни завтра."}</p><a class="btn gold" href="#/карточки">Все колоды</a></div>`; return; }
  showCard();
  document.onkeydown = (e) => {
    if (!$("#cses") || !CS) { document.onkeydown = null; return; }
    if (e.target.tagName === "INPUT") return;
    if (e.code === "Space") { e.preventDefault(); if (!CS.shown) reveal(); }
    if (CS.shown && ["1", "2", "3", "4"].includes(e.key)) grade([0, 3, 4, 5][+e.key - 1]);
  };
}
function showCard() {
  const c = CS.queue[CS.i]; CS.shown = false;
  const left = CS.queue.length - CS.i, isNew = CS.newSet.has(c[0]) && !Store.get().cards[c[0]];
  const front = CS.rev ? `<div class="cru">${esc(c[2])}</div>` : `<div class="cet">${esc(c[0])}</div>`;
  $("#cses").innerHTML = `<div class="trun"><div class="trtop"><a class="btn sm" href="#/карточки">✕</a><div class="q tprog"><i style="width:${CS.i / CS.queue.length * 100}%"></i></div><span class="muted">${left}</span></div>
    <div class="row" style="margin-bottom:10px"><span class="muted">${esc(CS.d.name)}${isNew ? ' · <span class="tag">новое слово</span>' : ""}</span>
      <label class="gltog"><input type="checkbox" id="crev" ${CS.rev ? "checked" : ""}> с русского</label></div>
    <div class="card fcard" id="fcard">${front}<div class="cback" id="cback" hidden>
      ${CS.rev ? `<div class="cet">${esc(c[0])}</div>` : `<div class="cru">${esc(c[2])}</div>`}<div class="rd">«${esc(c[1])}»</div>${pbtn(c[3], c[0], 0)}</div>
      <button class="btn gold" id="cshow">Показать ответ <small class="kbd">пробел</small></button></div>
    <div class="cgr" id="cgr" hidden>${[[0, "Не помню", "no"], [3, "Трудно", "hard"], [4, "Помню", "ok"], [5, "Легко", "easy"]].map(([q, t, cl], i) =>
      `<button class="btn cg ${cl}" data-q="${q}"><b>${t}</b><small>${ivText(previewIv(c[0], q))}</small><span class="kbd">${i + 1}</span></button>`).join("")}</div></div>`;
  if (!CS.rev) playFile(c[3], c[0]);
  $("#cshow").onclick = reveal; $("#fcard").onclick = (e) => { if (!CS.shown && !e.target.closest("button,input")) reveal(); };
  $("#cgr").onclick = (e) => { const b = e.target.closest("[data-q]"); if (b) grade(+b.dataset.q); };
  $("#crev").onchange = (e) => { CS.rev = e.target.checked; localStorage.setItem("etoilal-cards-rev", CS.rev ? "1" : "0"); showCard(); };
}
function reveal() {
  const c = CS.queue[CS.i]; CS.shown = true;
  $("#cback").hidden = false; $("#cshow").hidden = true; $("#cgr").hidden = false;
  if (CS.rev) playFile(c[3], c[0]);
}
function grade(q) {
  const c = CS.queue[CS.i];
  Store.review(c[0], q); CS.done++;
  if (q < 3) { CS.again++; CS.queue.push(c); }        // «не помню» — ещё раз в этой же сессии
  CS.i++;
  if (CS.i < CS.queue.length) return showCard();
  const pts = Math.max(1, Math.round(CS.done / 2)); Store.addPoints(pts); renderNav("карточки");
  $("#cses").innerHTML = `<div class="card tdone"><div class="bigstars">✓</div><h2>Готово!</h2><p class="muted">Повторено карточек: ${CS.done}${CS.again ? `, из них ещё раз: ${CS.again}` : ""}.</p>
    <div class="tgain"><span>✦ +${pts} очков</span></div><div class="row" style="justify-content:center;flex-wrap:wrap"><a class="btn gold" href="#/карточки">Все колоды</a><a class="btn" href="#/главная">На главную</a></div></div>`;
  CS = null;
}

// ---------------------------------------------------------------- задание дня
const DAILY = [["cards", 20, "Повтори 20 карточек", "#/карточки"], ["lessons", 1, "Пройди один урок", "#/учиться"], ["words", 10, "Добавь 10 слов в свои карточки", "#/словарь"]];
function dailyCard() {
  const d = Store.daily(), [k, goal, title, href] = DAILY[dayIndex(DAILY.length)], got = Math.min(d[k], goal);
  const btn = d.claimed ? `<span class="muted">Получено ✓</span>` : got >= goal ? `<button class="btn sm gold" id="dclaim">Забрать +50 ✦</button>` : `<a class="btn sm" href="${href}">Начать</a>`;
  return `<div class="card"><h3>Задание дня</h3><div class="muted">${title}</div><div class="q"><i style="width:${got / goal * 100}%"></i></div>
    <div class="row muted"><span>${got} / ${goal}</span>${btn}</div></div>`;
}
document.addEventListener("click", (e) => {
  if (e.target.id !== "dclaim") return;
  const d = Store.daily(); if (d.claimed) return; d.claimed = true; Store.addPoints(50); toast("✦ +50 очков за задание дня"); route();
});
