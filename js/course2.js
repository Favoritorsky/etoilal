// Самоучитель v3 «Слоёный пирог» (#/учиться, #/урок/N). Данные: data/course2-index.js (ET_C2I — разделы и уроки, его же
// превращает в ET_TOC/ET_CWORDS tools/build_course2.mjs) и data/course2/NN.js (ET_C2[N]) — грузятся по требованию.
// Урок: ⚡ суть за 30 секунд → 📖 простыми словами (с «📌 закрепить таблицу») → 🔭 для любопытных → 🆕 новые слова и «Запомни» →
// ✍ задания (движок js/alt-tasks.js: «?», подсказка, разбор) → 🔁 повторение слов прошлых уроков → итог (звёзды, слова — в карточки).
// По бокам — доска шпаргалок (js/board.js). Правило курса: урок использует только пройденное (проверяет tools/test_course2.cjs).
const C2_AUD_NOTE = `<div class="aud-note">🔊 Аудио синтезировано — возможны неточности</div>`;
function c2Load(n) {
  window.ET_C2 = window.ET_C2 || {};
  if (ET_C2[n]) return Promise.resolve(ET_C2[n]);
  return new Promise((ok, bad) => { const s = document.createElement("script"); s.src = `data/course2/${String(n).padStart(2, "0")}.js?v=202611080121`;
    s.onload = () => (ET_C2[n] ? ok(ET_C2[n]) : bad(new Error("нет урока"))); s.onerror = () => bad(new Error("нет файла урока")); document.head.appendChild(s); });
}
const c2Done = (n) => { const l = Store.get().lessons[n]; return !!(l && l.stars > 0); };
const c2Next = () => (ET_C2I.lessons.find((l) => !c2Done(l.n)) || ET_C2I.lessons[0]);

// ---------------------------------------------------------------- список уроков
function c2PageLearn() {
  const S = Store.get(), L = ET_C2I.lessons, next = c2Next(), total = L.filter((l) => c2Done(l.n)).length;
  const stars = L.reduce((a, l) => a + ((S.lessons[l.n] || {}).stars || 0), 0);
  const lv = Lv.level(S);
  const ladder = `<div class="card lvlad"><div class="row"><div><div class="k">Твой уровень</div><b class="lvnow">${lv ? `${LEVELS[lv - 1].ic} <span class="et">${LEVELS[lv - 1].w}</span> · ${LEVELS[lv - 1].ru}` : "пока без уровня — пройди уроки 1–3"}</b></div></div>
    <div class="lvsteps">${LEVELS.map((L, k) => `<div class="lvs${k < lv ? " d" : k === lv ? " c" : ""}"><i>${k + 1}</i><b class="et">${L.w}</b><small>${L.ru}</small></div>`).join("")}</div>
    <div class="muted">Уровень раздела даёт контрольная (нужно ≥ ${Lv.PASS} %). Уроки открываются строго по порядку.</div></div>`;
  return `<div class="k">Самоучитель</div><h1 class="page">Etoilal <i>по порядку</i></h1>
  <p class="lead">${L.length} уроков, каждый — как слоёный пирог: суть за 30 секунд, объяснение простыми словами и «для любопытных». Каждый урок опирается только на пройденное, новые слова сразу закрепляются, а важные таблицы можно закрепить на доске шпаргалок сбоку.</p>
  <div class="learnhead card"><div class="stats"><div class="st">📖 ${total}<small>из ${L.length} уроков</small></div><div class="st">★ ${stars}<small>звёзд</small></div><div class="st">✦ ${S.points}<small>очков</small></div></div>
    <a class="btn gold" href="#/урок/${next.n}">${total ? "Продолжить" : "Начать"}: урок ${next.n} ▶</a>${Lv.dayNote()}</div>
  ${ladder}
  <a class="card xban" href="#/альтернатива"><span class="xic">🧠</span><span><b>Альтернативное обучение: весь язык сразу</b><small>шпаргалка по всему языку, тексты с подсказками, загадки, практика</small></span><span class="lst">▶</span></a>
  ${FR.banner()}
  <a class="card xban dtban" href="#/тренировка"><span class="xic">🔥</span><span><b>Ежедневная тренировка · ${Daily.streak()} ${Daily.streak() % 10 === 1 && Daily.streak() % 100 !== 11 ? "день" : "дн."} подряд</b><small>3–5 минут в день: повторение того, где ошибаешься, задания на слух, новые слова, комбо и задания дня</small></span><span class="lst">▶</span></a>
  <a class="card xban trban" href="#/тренировки"><span class="xic">🎯</span><span><b>Тренировки</b><small>задания пройденных уроков вперемешку, «успей перевести», аудирование, произношение</small></span><span class="lst">▶</span></a>
  ${ET_C2I.sections.map((sec, k) => `<div class="lsec"><h2><span class="gn">${k + 1}</span>${esc(sec)}<span class="lvtag${Lv.secPassed(k, S) ? " d" : ""}">${LEVELS[k].ic} <span class="et">${LEVELS[k].w}</span></span></h2><div class="llist">
    ${L.filter((l) => l.sec === k).map((l) => { const st = (S.lessons[l.n] || {}).stars || 0, open = Lv.isOpen(l.n, S), old = l.check && (S.checksOld || {})[l.n] && !st;
      return `<${open ? "a" : "div"} class="card lrow${l.n === next.n ? " cur" : ""}${l.check ? " chk" : ""}${open ? "" : " lockd"}"${open ? ` href="#/урок/${l.n}"` : ""}><span class="ln">${open ? (l.check ? "✓" : l.n) : "🔒"}</span>
        <span class="lt"><b>${esc(l.t)}</b><small>${l.check ? `контрольная · уровень ${esc(LEVELS[l.sec].w)}${old ? " · пересдай по новым правилам" : ""}` : esc(l.s)}</small></span>
        <span class="lst">${st ? "★".repeat(st) + "☆".repeat(3 - st) : l.n === next.n ? "▶" : ""}</span></${open ? "a" : "div"}>`; }).join("")}</div></div>`).join("")}`;
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
  if (!Lv.isOpen(n)) { const f = Lv.firstOpen();
    return `<div class="card soon nokeep"><div class="ic">🔒</div><h2>${I.check ? "Контрольная" : "Урок"} ${n} пока ${I.check ? "закрыта" : "закрыт"}</h2>
      <p class="muted">Уроки и контрольные открываются строго по порядку. Сначала пройди ${f.check ? "контрольную" : "урок"} ${f.n} «${esc(f.t)}».</p>
      <a class="btn gold" href="#/урок/${f.n}">К ${f.check ? "контрольной" : "уроку"} ${f.n} ▶</a></div>`; }
  if (Lv.dayBlocked(n)) return Lv.dayPage(n);
  if (I.check) return Board.wrap(`<div id="c2l"><div class="card muted">Загружаю контрольную ${n}…</div></div>`);
  return Board.wrap(`<div id="c2l"><div class="card muted">Загружаю урок ${n}…</div></div>`);
}
async function c2BindLesson(args) {
  const n = +args[0] || 1; if (!$("#c2l")) return;
  const I0 = ET_C2I.lessons.find((l) => l.n === n); if (I0 && I0.check) return examBind(n);
  Board.bind();
  let L; try { L = await c2Load(n); } catch (e) { $("#c2l").innerHTML = `<div class="card">Не удалось загрузить урок.</div>`; return; }
  await trReady(); await c2LoadPrev(n);
  const I = ET_C2I.lessons.find((l) => l.n === n), sec = ET_C2I.sections[I.sec];
  // 4 шпаргалки урока для доски: правило, слова, примеры (первые 5 из «Простыми словами»), частые ошибки (тот же раздел)
  const exL = String(L.prosto || "").split("\n").filter((x) => /^>\s*.+::/.test(x) && !/\w-\w/.test(x.split("::")[0])).slice(0, 5).join("\n");
  const errM = String(L.prosto || "").match(/<h3>Частые ошибки<\/h3>([\s\S]*?)(?=<h3>|$)/);
  const sec2 = ET_C2I.lessons.filter((l) => l.sec === ET_C2I.lessons.find((x) => x.n === L.n).sec && l.n < L.n).flatMap((l) => l.words);
  const wl = (W) => W.map(([w, m]) => `<div class="bw">${playBtn(w, 1)}<b class="et">${esc(w)}</b> <span class="muted">${esc(m)}</span></div>`).join("");
  Board.setLesson({ title: L.t, pins: L.pins || [],
    html: `<div class="brule"><b class="btitle">${esc(L.t)}</b>${altRich(L.rule || L.sut)}</div>`,
    words: (L.words || []).length ? wl(L.words) : sec2.length ? `<div class="muted">Новых слов нет — слова раздела:</div>${wl(sec2.slice(-12))}` : "",
    ex: exL ? altRich(exL) : "",
    err: errM ? altRich(errM[1]) : "" });
  const groups = [];
  const wordsHTML = L.words && L.words.length ? `<h2 class="c2h">🆕 Новые слова <small class="muted">${L.words.length}</small></h2>
    <div class="card c2words">${L.words.map(([w, m]) => `<div class="c2w">${playBtn(w, 1)}<div><b class="et">${esc(w)}</b> <span class="muted">«${esc(rd(w))}»</span><div>${esc(m)}</div></div></div>`).join("")}${C2_AUD_NOTE}
    <div class="muted" style="margin-top:8px">Нажми ▶ у каждого слова и повтори вслух. Потом — быстрая проверка, чтобы слова запомнились.</div></div>
    <h3 class="c2h3">🧠 Запомни</h3><div class="alt-qs" id="c2mem"></div>` : "";
  $("#c2l").innerHTML = `<div class="row c2crumbs"><a class="muted" href="#/учиться">← Все уроки</a><span class="muted">Раздел ${I.sec + 1}: ${esc(sec)} · урок ${n} из ${ET_C2I.lessons.length}</span></div>
    <div class="k">Урок ${n}${L.check ? " · контрольная" : ""}</div><h1 class="page">${esc(L.t)}</h1><p class="lead">${esc(L.s || "")}</p>
    <div class="c2prog"><i id="c2bar"></i></div>
    ${L.sut ? `<div class="card c2sut"><div class="k">⚡ Суть за 30 секунд</div><div class="c2big">${c2Rich(L.sut, L)}</div></div>` : ""}
    ${c2PinOffer(L)}
    ${L.prosto ? `<details class="card c2sec" open><summary>📖 Простыми словами</summary>${c2Rich(L.prosto, L)}${C2_AUD_NOTE}</details>` : ""}
    ${L.lub ? `<details class="card c2sec"><summary>🔭 Для любопытных</summary>${c2Rich(L.lub, L)}</details>` : ""}
    ${wordsHTML}
    ${L.tasks && L.tasks.length ? `<h2 class="c2h">✍ Задания <small class="muted">${L.tasks.length}</small></h2><div class="alt-qs" id="c2tasks"></div>` : ""}
    <h2 class="c2h" id="c2revh">🔁 Повторение слов прошлых уроков</h2><div class="alt-qs" id="c2rev"></div>
    <div id="c2end"></div>`;
  Board.render();
  // группы заданий: запоминание слов, задания урока, повторение
  // ответы урока хранятся вместе с прогрессом: Store.c2ans[N] = { at, items: {mem, rev} (случайные задания — те же), a: {mem, tasks, rev}: {номер: [попытки]}, res }
  const Sx = Store.get(); Sx.c2ans = Sx.c2ans || {};
  const saved = Sx.c2ans[n] && Sx.c2ans[n].items ? Sx.c2ans[n] : null;
  ARate.sec = I.sec;
  const mem = saved ? saved.items.mem : c2MemItems(L), rev = saved ? saved.items.rev : c2ReviewItems(n), tasks = c2LessonTasks(n, L);
  const rec = saved || { at: "", items: { mem, rev }, a: { mem: {}, tasks: {}, rev: {} } };
  // старые ответы подставляем по «отпечатку» задания, а не по номеру: задание поправили — ответ не подставится,
  // добавили новые задания (7.11.2026: задания на слух) — ответы на прежние останутся при своих заданиях
  const sigs = tasks.map(c2Sig), was = rec.sigs || (window.ET_C2_OLDSIG || {})[n] || sigs, bySig = {};
  for (const [k, v] of Object.entries(rec.a.tasks)) if (was[k] && !bySig[was[k]]) bySig[was[k]] = v;
  rec.a.tasks = {}; sigs.forEach((sg, k) => { if (bySig[sg]) rec.a.tasks[k] = bySig[sg]; });
  rec.sigs = sigs;
  const onTry = (g) => (k, v) => { (rec.a[g][k] = rec.a[g][k] || []).push(v); rec.at = new Date().toISOString(); Store.get().c2ans = Store.get().c2ans || {}; Store.get().c2ans[n] = rec; Store.save(); };
  if (!rev.length) { $("#c2revh").remove(); $("#c2rev").remove(); }
  const S2 = C2 = { n, L, rec, total: mem.length + tasks.length + rev.length, done: 0, first: 0, finished: false };
  const each = (item, first, ok, frac) => { S2.done++; if (item.k === "trtext") { if (first) S2.first += frac || 0; } else if (first && ok) S2.first++; $("#c2bar").style.width = Math.round(S2.done / S2.total * 100) + "%"; if (S2.done >= S2.total) c2Finish(S2); };
  const bInfo = Board.current();                         // при возвращении к уроку — вернуть его шпаргалки на доску
  PageHook.onShow = () => { C2 = S2; Board.setLesson(bInfo); Board.render(); };
  if (mem.length) AltT.mount($("#c2mem"), mem, { onAnswer: each, onTry: onTry("mem"), restore: rec.a.mem, bonus: true });
  if (tasks.length) AltT.mount($("#c2tasks"), tasks, { onAnswer: each, onTry: onTry("tasks"), restore: rec.a.tasks, bonus: true });
  if (rev.length) AltT.mount($("#c2rev"), rev, { onAnswer: each, onTry: onTry("rev"), restore: rec.a.rev, bonus: true });
  if (saved && S2.done && !S2.finished) toast("Продолжаешь с того места, где остановился ✦");
}
// задания урока: задания урока + «Переведи текст» + новые виды + задания на слух (data/course2-listen.js), вперемешку
function c2Mix(base, add) {
  const out = base.slice(); add.forEach((t, i) => out.splice(Math.min(out.length, Math.round((i + 1) * base.length / (add.length + 1)) + i), 0, t)); return out;
}
function c2LessonTasks(n, L) {
  return c2Mix([...(L.tasks || []), ...(L.extra || []), ...c2TextTask(n), ...c2NewTasks(n)], ((window.ET_C2L || {})[n] || [])).map((t) => ({ rq: t.why, ...t }));
}
function c2Sig(t) { const s = (t.q + "|" + JSON.stringify(t.a)).replace(/q/g, "k").replace(/Q/g, "K"); let h = 5381; for (const c of s) h = ((h * 33) ^ c.charCodeAt(0)) >>> 0; return h.toString(36); }
function c2Again(n) { const S = Store.get(); if (S.c2ans) delete S.c2ans[n]; Store.save(); route(); window.scrollTo(0, 0); }
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
// предложение закрепить важные таблицы урока на доске насовсем (они остаются и в следующих уроках, пока сам не уберёшь)
function c2PinOffer(L, end) {
  const P = (L.pins || []).filter((p) => !(Store.get().board || { cards: [] }).cards.some((c) => c.id === p.id));
  if (!P.length) return "";
  return `<div class="card c2offer"><div><b>📌 ${end ? "Не забудь закрепить" : "В этом уроке важная таблица"}${P.length > 1 ? "ы" : ""}</b>
    <div class="muted">${end ? "Закреплённая таблица останется на доске шпаргалок во всех следующих уроках — не придётся листать назад." : "Закрепи её на доске шпаргалок — она останется сбоку во всех следующих уроках, пока сам не уберёшь."}</div></div>
    <div class="c2offb">${P.map((p) => `<span class="c2offi"><span>${esc(p.t)}</span>${Board.pinButton(p.id)}</span>`).join("")}</div></div>`;
}
function c2Finish(st = C2) {
  if (st.finished) return; st.finished = true; const C2 = st; C2.first = Math.round(C2.first);
  const { n, L } = C2, pct = Math.round(C2.first / C2.total * 100), stars = pct >= 90 ? 3 : pct >= 70 ? 2 : 1;
  let r = { pts: 0 }, added = 0; const again = !!(C2.rec && C2.rec.res);
  if (C2.rec && C2.rec.res) { r = C2.rec.res.r; added = C2.rec.res.added; }      // урок уже был закончен — просто показываем итог (очки второй раз не даём)
  else { r = Store.finishLesson(n, stars, pct, C2.first);
    for (const [w] of L.words || []) if (!Store.hasWord(w)) { Store.toggleWord(w); added++; }
    if (C2.rec) { C2.rec.res = { r, added }; C2.rec.at = new Date().toISOString(); Store.get().c2ans[n] = C2.rec; Store.save(); } }
  renderNav("учиться");
  const next = ET_C2I.lessons.find((l) => l.n === n + 1);
  $("#c2end").innerHTML = `<div class="card c2res"><div class="bigstars">${"★".repeat(stars)}${"☆".repeat(3 - stars)}</div>
    <h2>Урок ${n} пройден!</h2><p>С первой попытки: <b>${C2.first} из ${C2.total}</b> (${pct}%). ${r.pts ? `+${r.pts} очков ✦` : ""}${r.chest ? " · 💎 сундук!" : ""}</p>
    ${added ? `<p class="muted">Новые слова (${added}) добавлены в «Карточки» — повторяй их там, и они не забудутся.</p>` : ""}
    ${c2PinOffer(L, true)}
    ${stars < 3 ? `<p class="muted">Хочешь три звезды? Пройди урок ещё раз — засчитается лучший результат.</p>` : ""}
    <div class="row" style="justify-content:center;gap:10px;flex-wrap:wrap">${next ? `<a class="btn gold" href="#/урок/${next.n}">Урок ${next.n}: ${esc(next.t)} ▶</a>` : `<a class="btn gold" href="#/учиться">Курс пройден! 🎓</a>`}
    <a class="btn" href="#/карточки">🃏 Повторить слова</a><button class="btn" onclick="c2Again(${n})">↻ Пройти снова</button></div></div>`;
  if (!again) $("#c2end").scrollIntoView({ behavior: "smooth", block: "center" });
}

// ---------------------------------------------------------------- «Переведи текст» в уроке (5.11.2026)
// 3 предложения из заданий прошлых уроков (n-1 … n-4) — только пройденные слова; направление чередуется: чётные уроки —
// на Etoilal, нечётные — на русский. Выбор одинаковый при каждом открытии (зависит только от номера урока).
function c2Rand(seed) { let a = seed * 9301 + 49297; return () => ((a = (a * 9301 + 49297) % 233280) / 233280); }
function c2Sentences(from, to) {
  const out = [];
  for (let k = from; k <= to; k++) { const L = (window.ET_C2 || {})[k]; if (!L) continue;
    for (const t of L.tasks || []) { const a = [].concat(t.a)[0];
      if (t.k === "input" && (t.lang || "et") === "et" && /[.?!]$/.test(a) && a.split(" ").length >= 3 && /[а-я]/i.test(t.q) && !/[a-z]{3}/i.test(t.q.replace(/«[^»]*»/g, "")))
        out.push([a, t.q.replace(/\s*\(.*?\)\s*/g, " ").trim()]); } }
  return out;
}
function c2TextTask(n) {
  if (n < 5) return [];
  const pool = c2Sentences(Math.max(4, n - 4), n - 1); if (pool.length < 3) return [];
  const r = c2Rand(n), pick = pool.map((x) => [r(), x]).sort((a, b) => a[0] - b[0]).slice(0, 3).map((x) => x[1]);
  return [{ k: "trtext", dir: n % 2 ? "ru" : "et", parts: pick, why: "Повторение прошлых уроков: переводи по смыслу, засчитывается каждое верное предложение." }];
}
// уроки до n загружены? (для «Переведи текст» нужны задания прошлых уроков)
async function c2LoadPrev(n) { for (let k = Math.max(1, n - 4); k < n; k++) try { await c2Load(k); } catch (e) {} }

// ---------------------------------------------------------------- контрольная (5.11.2026)
// Режим контрольной: задания по одному, на каждое 60 секунд («Переведи текст» — 60 секунд на каждое предложение), без «?» и
// подсказок, одна попытка. Пока идёт контрольная — переводчик и «Проверь текст» закрыты, доски шпаргалок нет.
// Уйти со страницы = попытка закончена. Порог уровня — 80 %. Пересдача — не чаще раза в час.
const EX_SEC = 60;
let EX = null;
async function examBind(n) {
  let L; try { L = await c2Load(n); } catch (e) { $("#c2l").innerHTML = `<div class="card">Не удалось загрузить контрольную.</div>`; return; }
  await prepLoad(n);
  const I = ET_C2I.lessons.find((l) => l.n === n), S = Store.get(), best = S.lessons[n], left = Lv.retryLeft(n), lvNext = LEVELS[I.sec];
  // доска шпаргалок: закреплённые таблицы и свои записи из прошлых уроков + правило контрольной (6.11.2026)
  Board.bind(); const bInfo = { title: L.t, pins: [], html: `<div class="brule"><b class="btitle">${esc(L.t)}</b>${altRich(L.rule || "")}</div>`, words: "", ex: "", err: "" };
  Board.setLesson(bInfo); Board.render(); PageHook.onShow = () => { Board.setLesson(bInfo); Board.render(); };
  ARate.sec = I.sec;
  const items = c2Mix([...(L.tasks || []), ...(L.exam || [])], (window.ET_C2L || {})[n] || []);
  const mins = items.reduce((a, t) => a + (t.k === "trtext" ? t.parts.length : 1), 0);
  const old = (S.checksOld || {})[n];
  $("#c2l").innerHTML = `<div class="row c2crumbs"><a class="muted" href="#/учиться">← Все уроки</a><span class="muted">Раздел ${I.sec + 1}: ${esc(ET_C2I.sections[I.sec])}</span></div>
    <div class="k">Контрольная · урок ${n}</div><h1 class="page">${esc(L.t)}</h1><p class="lead">${esc(L.s || "")}</p>
    <div class="card exrules"><div class="exlv"><span class="k">Сдашь — получишь уровень</span><b>${lvNext.ic} <span class="et">${lvNext.w}</span> · ${lvNext.ru}</b></div>
      <ul><li><b>${items.length} заданий</b>, по одному. На каждое — <b>${EX_SEC} секунд</b> («Переведи текст» — ${EX_SEC} секунд на каждое предложение). Время вышло — задание не засчитано.</li>
      <li>Подсказок «?» нет, ответ даётся <b>один раз</b>.</li>
      <li>Задания <b>🎧 на слух</b>: запись звучит сама, слушать можно сколько угодно раз${I.sec >= 2 ? ", скорость — 0.5x / 0.75x / 1x" : " (медленно, 0.5x)"}.</li>
      <li>Пока идёт контрольная, <b>переводчик и «Проверь текст» закрыты</b>. <b>Словарь</b> и <b>доска шпаргалок</b> (твои закреплённые таблицы и записи) — можно.</li>
      <li>Нужно набрать <b>${Lv.PASS} %</b>. Не вышло — пересдать можно через час.</li>
      <li>В словарь можно уйти и вернуться — контрольная и таймер продолжатся. Уход в другие разделы закончит попытку (сайт спросит перед этим).</li></ul>
      ${best ? `<p class="note fixn">Контрольная сдана: ${best.best} %, ${"★".repeat(best.stars)}${"☆".repeat(3 - best.stars)}. Можно пересдать на лучший результат.</p>` : ""}
      ${!best && old ? `<p class="note">Раньше ты сдал её по старым правилам (${old.best || 0} %). Контрольные стали сложнее — пересдай, чтобы открыть дальнейшие уроки и получить уровень.</p>` : ""}
      ${left ? `<p class="note unk">Пересдача будет доступна через ${left} мин.</p>` : `<button class="btn gold" id="exgo">Начать контрольную ▶</button>`}
      <span class="muted"> · примерно ${Math.ceil(mins * 0.6)}–${mins} мин</span></div>
    ${prepBlock(n)}<div id="exbox"></div>`;
  const go = $("#exgo"); if (go) go.onclick = () => examRun(n, L, items);
}
function examRun(n, L, items) {
  const S = Store.get(); S.examLast = S.examLast || {}; S.examLast[n] = new Date().toISOString(); Store.save();
  const total = items.reduce((a, t) => a + (t.k === "trtext" ? t.parts.length : 1), 0);
  Lv.examStart(n, total + 5);
  EX = { n, L, items, i: 0, score: 0, timer: null, hash: location.hash, done: false, miss: [] };
  const pc = $(".prepc"); if (pc) pc.remove();
  $(".exrules").outerHTML = `<div class="card exbar"><div class="row"><b id="exnum"></b><span class="extime" id="extime"></span></div><div class="c2prog"><i id="exprog"></i></div></div>`;
  window.addEventListener("hashchange", examLeave);
  examStep();
}
// во время контрольной переводчик и «Проверь текст» не открываются: остаёшься на контрольной, попытка не прерывается (6.11.2026)
// словарь — можно (контрольная и таймер продолжаются); другие разделы — только после подтверждения (попытка закончится)
const EX_BLOCK = /^#\/(переводчик|проверка)(\/|$)/, EX_FREE = /^#\/словарь(\/|$)/;
const EX_LEAVE_MSG = "Если ты выйдешь из контрольной, все ответы сбросятся, и пересдать её можно будет только через час.\n\nВыйти?";
const exOn = () => !!(EX && !EX.done), exDec = (h) => { try { return decodeURIComponent(h || ""); } catch (e) { return h || ""; } };
function examBlocked(href) { return exOn() && EX_BLOCK.test(exDec(href)); }
function examFree(href) { return exOn() && EX_FREE.test(exDec(href)); }
// уход с контрольной (не в словарь): спросить; true — можно уходить
function examMayLeave(href) {
  if (!exOn() || EX.leaveOk || examFree(href) || exDec(href) === exDec(EX.hash)) return true;
  if (confirm(EX_LEAVE_MSG)) { EX.leaveOk = true; return true; }
  return false;
}
document.addEventListener("click", (e) => {
  const a = e.target.closest && e.target.closest("a[href]"); if (!a || !exOn()) return;
  const h = a.getAttribute("href"); if (!/^#/.test(h)) return;
  if (examBlocked(h)) { e.preventDefault(); e.stopPropagation(); toast("Недоступно во время контрольной"); return; }
  if (!examMayLeave(h)) { e.preventDefault(); e.stopPropagation(); }
}, true);
window.addEventListener("beforeunload", (e) => { if (exOn()) { e.preventDefault(); e.returnValue = ""; } });
function examLeave() {
  if (!EX || EX.done) return; if (location.hash === EX.hash || examFree(location.hash)) return;
  clearInterval(EX.timer); EX.done = true; Lv.examStop(); window.removeEventListener("hashchange", examLeave);
  toast("Контрольная прервана — попытка не засчитана");
}
function examStep() {
  const E = EX, it = E.items[E.i], box = $("#exbox"); if (!box) return;
  $("#exnum").textContent = `Задание ${E.i + 1} из ${E.items.length}`;
  $("#exprog").style.width = Math.round(E.i / E.items.length * 100) + "%";
  box.innerHTML = `<div class="alt-qs" id="exq"></div><div id="exnext"></div>`;
  // ссылки на элементы, а не поиск по странице: пока ты в словаре, страница контрольной отложена, а таймер идёт
  const tEl = $("#extime"), qEl = $("#exq");
  let sec = EX_SEC * (it.k === "trtext" ? it.parts.length : 1); const tick = () => { if (tEl) { tEl.textContent = `⏱ ${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`; tEl.classList.toggle("hot", sec <= 10); } };
  const after = (item, first, ok, frac) => {
    clearInterval(E.timer); E.score += item.k === "trtext" ? (frac || 0) : ok ? 1 : 0;
    if (item.k === "trtext" ? (frac || 0) < 1 : !ok) E.miss.push(JSON.parse(JSON.stringify(item)));
    const last = E.i === E.items.length - 1;
    const nx = qEl.parentNode.querySelector("#exnext"); nx.innerHTML = `<button class="btn gold" id="exn">${last ? "Узнать результат ▶" : "Дальше ▶"}</button>`;
    nx.querySelector("#exn").onclick = () => { if (last) examEnd(); else { E.i++; examStep(); window.scrollTo(0, $("#exbox").offsetTop - 120); } };
  };
  AltT.mount(qEl, [it], { exam: true, base: E.i, onAnswer: after });
  tick(); E.timer = setInterval(() => { sec--; tick(); if (sec <= 0) { clearInterval(E.timer); if (qEl._timeout) qEl._timeout(); } }, 1000);
  const inp = box.querySelector("input"); if (inp) inp.focus({ preventScroll: true });
  const pl = box.querySelector(".lsn-play"); if (pl) setTimeout(() => pl.isConnected && pl.click(), 350);     // задание на слух — запись звучит сама
}
function examEnd() {
  const E = EX; E.done = true; Lv.examStop(); window.removeEventListener("hashchange", examLeave);
  const n = E.n, pct = Math.round(E.score / E.items.length * 100), pass = pct >= Lv.PASS;
  const before = Lv.level(); let r = { pts: 0 };
  if (pass) { const stars = pct >= 95 ? 3 : pct >= 88 ? 2 : 1; r = Store.finishLesson(n, stars, pct, Math.round(E.score)); }
  const after = Lv.level(), up = after > before ? LEVELS[after - 1] : null;
  prepState(n).miss = E.miss; Store.save();
  const next = ET_C2I.lessons.find((l) => l.n === n + 1);
  renderNav("учиться");
  $(".exbar").remove();
  $("#exbox").innerHTML = `<div class="card c2res"><div class="bigstars">${pass ? "✓" : "✗"}</div>
    <h2>${pass ? "Контрольная сдана!" : "Пока не сдана"}</h2><p>Результат: <b>${pct} %</b> (${E.score.toFixed(1).replace(".0", "")} из ${E.items.length}). Нужно ${Lv.PASS} %. ${r.pts ? `+${r.pts} очков ✦` : ""}</p>
    ${up ? `<div class="lvup"><small>Новый уровень</small><b>${up.ic} <span class="et">${up.w}</span></b><span>${up.ru}</span></div>` : ""}
    ${pass ? "" : `<p class="muted">Повтори уроки раздела и попробуй снова через час. Переводчик и «Проверь текст» снова открыты.</p>`}
    <div class="row" style="justify-content:center;gap:10px;flex-wrap:wrap">${pass && next ? `<a class="btn gold" href="#/урок/${next.n}">Урок ${next.n}: ${esc(next.t)} ▶</a>` : ""}${E.miss.length ? `<a class="btn" href="#/подготовка/${n}/ошибки">Работа над ошибками · ${E.miss.length}</a>` : ""}<a class="btn" href="#/учиться">Ко всем урокам</a></div></div>`;
  EX = null;
}
