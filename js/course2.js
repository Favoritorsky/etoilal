// Самоучитель v3 «Слоёный пирог» (#/учиться, #/урок/N). Данные: data/course2-index.js (ET_C2I — разделы и уроки, его же
// превращает в ET_TOC/ET_CWORDS tools/build_course2.mjs) и data/course2/NN.js (ET_C2[N]) — грузятся по требованию.
// Урок: ⚡ суть за 30 секунд → 📖 простыми словами (с «📌 закрепить таблицу») → 🔭 для любопытных → 🆕 новые слова и «Запомни» →
// ✍ задания (движок js/alt-tasks.js: «?», подсказка, разбор) → 🔁 повторение слов прошлых уроков → итог (звёзды, слова — в карточки).
// По бокам — доска шпаргалок (js/board.js). Правило курса: урок использует только пройденное (проверяет tools/test_course2.cjs).
const C2_AUD_NOTE = `<div class="aud-note">🔊 Аудио синтезировано — возможны неточности</div>`;
function c2Load(n) {
  window.ET_C2 = window.ET_C2 || {};
  if (ET_C2[n]) return Promise.resolve(ET_C2[n]);
  return new Promise((ok, bad) => { const s = document.createElement("script"); s.src = `data/course2/${String(n).padStart(2, "0")}.js`;
    s.onload = () => (ET_C2[n] ? ok(ET_C2[n]) : bad(new Error("нет урока"))); s.onerror = () => bad(new Error("нет файла урока")); document.head.appendChild(s); });
}
const c2Done = (n) => { const l = Store.get().lessons[n]; return !!(l && l.stars > 0); };
const c2Next = () => (ET_C2I.lessons.find((l) => !c2Done(l.n)) || ET_C2I.lessons[0]);

// ---------------------------------------------------------------- список уроков
function c2PageLearn() {
  const S = Store.get(), L = ET_C2I.lessons, next = c2Next(), total = L.filter((l) => c2Done(l.n)).length;
  const stars = L.reduce((a, l) => a + ((S.lessons[l.n] || {}).stars || 0), 0);
  return `<div class="k">Самоучитель</div><h1 class="page">Etoilal <i>по порядку</i></h1>
  <p class="lead">${L.length} уроков, каждый — как слоёный пирог: суть за 30 секунд, объяснение простыми словами и «для любопытных». Каждый урок опирается только на пройденное, новые слова сразу закрепляются, а важные таблицы можно закрепить на доске шпаргалок сбоку.</p>
  <div class="learnhead card"><div class="stats"><div class="st">📖 ${total}<small>из ${L.length} уроков</small></div><div class="st">★ ${stars}<small>звёзд</small></div><div class="st">✦ ${S.points}<small>очков</small></div></div>
    <a class="btn gold" href="#/урок/${next.n}">${total ? "Продолжить" : "Начать"}: урок ${next.n} ▶</a></div>
  <a class="card xban" href="#/альтернатива"><span class="xic">🧠</span><span><b>Альтернативное обучение: весь язык сразу</b><small>шпаргалка по всему языку, тексты с подсказками, загадки, практика</small></span><span class="lst">▶</span></a>
  <a class="card xban trban" href="#/тренировки"><span class="xic">🎯</span><span><b>Тренировки</b><small>задания пройденных уроков вперемешку, «успей перевести», аудирование, произношение</small></span><span class="lst">▶</span></a>
  ${ET_C2I.sections.map((sec, k) => `<div class="lsec"><h2><span class="gn">${k + 1}</span>${esc(sec)}</h2><div class="llist">
    ${L.filter((l) => l.sec === k).map((l) => { const st = (S.lessons[l.n] || {}).stars || 0;
      return `<a class="card lrow${l.n === next.n ? " cur" : ""}${l.check ? " chk" : ""}" href="#/урок/${l.n}"><span class="ln">${l.check ? "✓" : l.n}</span>
        <span class="lt"><b>${esc(l.t)}</b><small>${l.check ? "контрольная" : esc(l.s)}</small></span>
        <span class="lst">${st ? "★".repeat(st) + "☆".repeat(3 - st) : l.n === next.n ? "▶" : ""}</span></a>`; }).join("")}</div></div>`).join("")}`;
}

// ---------------------------------------------------------------- урок
function c2Rich(s, L) {                               // разметка как в «Альтернативном обучении» + @@pin:id@@ — таблица с кнопкой «закрепить»
  return String(s || "").split("\n").map((line) => {
    const m = line.trim().match(/^@@pin:(\w+)@@$/); if (!m) return line;
    const P = (L.pins || []).find((p) => p.id === m[1]); if (!P) return "";
    return `@@PIN${m[1]}@@`;
  }).join("\n").replace(/^/, "").split(/@@PIN(\w+)@@/).map((part, i) => {
    if (i % 2 === 0) return altRich(part);
    const P = L.pins.find((p) => p.id === part);
    return `<div class="card c2pin"><div class="row"><b>📌 ${esc(P.t)}</b>${Board.pinButton(P.id)}</div>${altRich(P.html)}<div class="muted c2pinhint">Это важная таблица — закрепи её на доске шпаргалок, чтобы не листать назад.</div></div>`;
  }).join("");
}
let C2 = null;                                        // состояние открытого урока
function c2PageLesson(args) {
  const n = +args[0] || 1, I = ET_C2I.lessons.find((l) => l.n === n);
  if (!I) return `<div class="card soon"><h2>Такого урока нет</h2><a class="btn gold" href="#/учиться">К урокам</a></div>`;
  return Board.wrap(`<div id="c2l"><div class="card muted">Загружаю урок ${n}…</div></div>`);
}
async function c2BindLesson(args) {
  const n = +args[0] || 1; Board.bind();
  let L; try { L = await c2Load(n); } catch (e) { $("#c2l").innerHTML = `<div class="card">Не удалось загрузить урок.</div>`; return; }
  await trReady();
  const I = ET_C2I.lessons.find((l) => l.n === n), sec = ET_C2I.sections[I.sec];
  Board.setLesson({ title: L.t, html: `<div class="brule"><b class="btitle">${esc(L.t)}</b>${altRich(L.rule || L.sut)}</div>`, pins: L.pins || [] });
  const groups = [];
  const wordsHTML = L.words && L.words.length ? `<h2 class="c2h">🆕 Новые слова <small class="muted">${L.words.length}</small></h2>
    <div class="card c2words">${L.words.map(([w, m]) => `<div class="c2w">${playBtn(w, 1)}<div><b class="et">${esc(w)}</b> <span class="muted">«${esc(rd(w))}»</span><div>${esc(m)}</div></div></div>`).join("")}${C2_AUD_NOTE}
    <div class="muted" style="margin-top:8px">Нажми ▶ у каждого слова и повтори вслух. Потом — быстрая проверка, чтобы слова запомнились.</div></div>
    <h3 class="c2h3">🧠 Запомни</h3><div class="alt-qs" id="c2mem"></div>` : "";
  $("#c2l").innerHTML = `<div class="row c2crumbs"><a class="muted" href="#/учиться">← Все уроки</a><span class="muted">Раздел ${I.sec + 1}: ${esc(sec)} · урок ${n} из ${ET_C2I.lessons.length}</span></div>
    <div class="k">Урок ${n}${L.check ? " · контрольная" : ""}</div><h1 class="page">${esc(L.t)}</h1><p class="lead">${esc(L.s || "")}</p>
    <div class="c2prog"><i id="c2bar"></i></div>
    ${L.sut ? `<div class="card c2sut"><div class="k">⚡ Суть за 30 секунд</div><div class="c2big">${c2Rich(L.sut, L)}</div></div>` : ""}
    ${L.prosto ? `<details class="card c2sec" open><summary>📖 Простыми словами</summary>${c2Rich(L.prosto, L)}${C2_AUD_NOTE}</details>` : ""}
    ${L.lub ? `<details class="card c2sec"><summary>🔭 Для любопытных</summary>${c2Rich(L.lub, L)}</details>` : ""}
    ${wordsHTML}
    ${L.tasks && L.tasks.length ? `<h2 class="c2h">✍ Задания <small class="muted">${L.tasks.length}</small></h2><div class="alt-qs" id="c2tasks"></div>` : ""}
    <h2 class="c2h" id="c2revh">🔁 Повторение слов прошлых уроков</h2><div class="alt-qs" id="c2rev"></div>
    <div id="c2end"></div>`;
  Board.render();
  // группы заданий: запоминание слов, задания урока, повторение
  const mem = c2MemItems(L), rev = c2ReviewItems(n), tasks = (L.tasks || []).map((t) => ({ rq: t.why, ...t }));
  if (!rev.length) { $("#c2revh").remove(); $("#c2rev").remove(); }
  C2 = { n, L, total: mem.length + tasks.length + rev.length, done: 0, first: 0, finished: false };
  const each = (item, first, ok) => { C2.done++; if (first && ok) C2.first++; $("#c2bar").style.width = Math.round(C2.done / C2.total * 100) + "%"; if (C2.done >= C2.total) c2Finish(); };
  if (mem.length) AltT.mount($("#c2mem"), mem, { onAnswer: each });
  if (tasks.length) AltT.mount($("#c2tasks"), tasks, { onAnswer: each });
  if (rev.length) AltT.mount($("#c2rev"), rev, { onAnswer: each });
}
// «Запомни»: по одному заданию на каждое новое слово (то перевод → слово, то слово → перевод)
function c2MemItems(L) {
  const W = L.words || []; if (!W.length) return [];
  const pool = ET_C2I.lessons.filter((l) => l.n <= L.n).flatMap((l) => l.words);
  return W.map(([w, m], i) => {
    const others = AltT.shuffle(pool.filter((x) => x[0] !== w && x[1] !== m)).slice(0, 2);
    return i % 2 === 0
      ? { k: "choice", q: `Как будет «${m}»?`, opts: [w, ...others.map((x) => x[0])], a: w, lang: "et", why: `${w} — ${m}`, rq: `${w} — ${m}` }
      : { k: "choice", q: `Что значит ${w}?`, opts: [m, ...others.map((x) => x[1])], a: m, lang: "x", why: `${w} — ${m}`, rq: `${w} — ${m}` };
  });
}
// повторение: слова уроков n-1, n-3, n-7, n-15 (интервалы растут) — 4 задания, одно — написать слово
function c2ReviewItems(n) {
  const back = [1, 3, 7, 15].map((d) => n - d).filter((x) => x >= 1);
  const cand = back.flatMap((k) => ((ET_C2I.lessons.find((l) => l.n === k) || {}).words || []).map((w) => [...w, k]));
  const pick = AltT.shuffle(cand).slice(0, 4), pool = ET_C2I.lessons.filter((l) => l.n < n).flatMap((l) => l.words);
  return pick.map(([w, m, k], i) => {
    const others = AltT.shuffle(pool.filter((x) => x[0] !== w && x[1] !== m)).slice(0, 2);
    const why = `${w} — ${m} (урок ${k})`;
    if (i === 0) return { k: "input", q: `Напиши на Etoilal: «${m}»`, a: [w], why, rq: why };
    if (i === 1) return { k: "listen", say: w, q: "Что прозвучало?", opts: [w, ...others.map((x) => x[0])], a: w, why, rq: why };
    return i % 2 ? { k: "choice", q: `Что значит ${w}?`, opts: [m, ...others.map((x) => x[1])], a: m, lang: "x", why, rq: why }
      : { k: "choice", q: `Как будет «${m}»?`, opts: [w, ...others.map((x) => x[0])], a: w, lang: "et", why, rq: why };
  });
}
function c2Finish() {
  if (C2.finished) return; C2.finished = true;
  const { n, L } = C2, pct = Math.round(C2.first / C2.total * 100), stars = pct >= 90 ? 3 : pct >= 70 ? 2 : 1;
  const r = Store.finishLesson(n, stars, pct, C2.first);
  let added = 0; for (const [w] of L.words || []) if (!Store.hasWord(w)) { Store.toggleWord(w); added++; }
  renderNav("учиться");
  const next = ET_C2I.lessons.find((l) => l.n === n + 1);
  $("#c2end").innerHTML = `<div class="card c2res"><div class="bigstars">${"★".repeat(stars)}${"☆".repeat(3 - stars)}</div>
    <h2>Урок ${n} пройден!</h2><p>С первой попытки: <b>${C2.first} из ${C2.total}</b> (${pct}%). ${r.pts ? `+${r.pts} очков ✦` : ""}${r.chest ? " · 💎 сундук!" : ""}</p>
    ${added ? `<p class="muted">Новые слова (${added}) добавлены в «Карточки» — повторяй их там, и они не забудутся.</p>` : ""}
    ${stars < 3 ? `<p class="muted">Хочешь три звезды? Пройди урок ещё раз — засчитается лучший результат.</p>` : ""}
    <div class="row" style="justify-content:center;gap:10px;flex-wrap:wrap">${next ? `<a class="btn gold" href="#/урок/${next.n}">Урок ${next.n}: ${esc(next.t)} ▶</a>` : `<a class="btn gold" href="#/учиться">Курс пройден! 🎓</a>`}
    <a class="btn" href="#/карточки">🃏 Повторить слова</a><button class="btn" onclick="route()">↻ Пройти снова</button></div></div>`;
  $("#c2end").scrollIntoView({ behavior: "smooth", block: "center" });
}
