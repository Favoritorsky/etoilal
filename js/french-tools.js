// Разделы французской оболочки, собранные из уроков (8.11.2026): словарь всех слов курса, справочник (все таблицы уроков),
// карточки (повторение слов пройденных уроков, «коробки» Лейтнера) и тренировка (12 заданий из пройденных уроков, треть — на слух).
// Данные — те же data/french/NN.js; прогресс: Store.get().frcards = { слово: { box, due } }, .frtrain = { day, s } (занятий за день).
const FRT = (() => {
  const all = () => FR_I.lessons.filter((l) => !l.check);
  const loadAll = () => Promise.all(FR_I.lessons.map((l) => FR.load(l.n).catch(() => null)));
  const today = () => new Date().toISOString().slice(0, 10);
  const S0 = () => Store.get();
  const learned = () => all().filter((l) => FR.done(l.n));
  const wordsOf = (ls) => ls.flatMap((l) => ((window.FR_C && FR_C[l.n] && FR_C[l.n].words) || []).map(([w, m, r]) => ({ w, m, r, n: l.n })));
  const head = (ic, t, s) => `<div class="k">🇫🇷 Французский</div><h1 class="page">${ic} ${t}</h1><p class="lead">${s}</p>`;

  // ---------------------------------------------------------------- словарь (как у Etoilal, 9.11.2026): весь частый французский —
  // data/french/dict.js (tools/build_fr_dict.py), грузится только на этой странице. Строка: [слово, часть речи, перевод, чтение,
  // частотность, род, урок курса, родственные, синонимы, примеры [фр, рус, урок]]. «В карточки» — Store.get().frMy = { слово: [перевод, чтение] }.
  const POS = { n: "сущ.", v: "глагол", a: "прил.", adv: "нареч.", f: "служебное", num: "число", phr: "выражение" };
  const dn = (x) => String(x || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/ё/g, "е").replace(/[’`]/g, "'").trim();
  const DS = { q: "", pos: "", shown: 60, open: null };
  let dictP = null;
  const dictLoad = () => dictP || (dictP = new Promise((ok, bad) => { if (window.FR_DICT) return ok(FR_DICT);
    const sc = document.createElement("script"); sc.src = "data/french/dict.js?v=202611091824"; sc.onload = () => ok(window.FR_DICT); sc.onerror = () => { dictP = null; bad(new Error("нет словаря")); }; document.head.appendChild(sc); }));
  const my = () => { const S = S0(); S.frMy = S.frMy || {}; return S.frMy; };
  function dictSearch(q, pos) {
    const W = FR_DICT.words; q = dn(q);
    if (!q) return pos ? W.filter((w) => w[1] === pos) : W;
    const cyr = /[а-я]/.test(q), res = [];
    for (const w of W) {
      if (pos && w[1] !== pos) continue;
      let sc = -1;
      if (cyr) { const g = dn(w[2]), ms = g.split(/[,;()]/).map((x) => x.trim());
        if (ms.includes(q)) sc = 0; else if (ms.some((m) => m.startsWith(q))) sc = 1; else if (g.includes(q)) sc = 2; else if (w[3] && dn(w[3]).replace(/ /g, "").startsWith(q.replace(/ /g, ""))) sc = 3; }
      else { const lw = dn(w[0]); if (lw === q) sc = 0; else if (lw.startsWith(q)) sc = 1; else if (lw.includes(q)) sc = 2; }
      if (sc >= 0) res.push([sc, w[4], w]);
    }
    return res.sort((a, b) => a[0] - b[0] || a[1] - b[1]).map((x) => x[2]);
  }
  const posTxt = (w) => (POS[w[1]] || "") + (w[5] ? " · " + w[5] + " р." : "");
  const wlink = (x) => `<button class="tag frwl" data-ow="${esc(x)}"><span class="fr">${esc(x)}</span></button>`;
  function wordCard(w) {
    const [, , g, r, , , n, rel = [], syn = [], ex = []] = w, mine = !!my()[w[0]];
    return `<div class="card wd"><div class="row"><div><div class="big fr">${esc(w[0])}</div><div class="rd">${r ? `«${esc(r)}» · ` : ""}${posTxt(w)}</div></div>
      <div class="row">${playBtn(w[0])}<button class="btn sm" data-frmy="${esc(w[0])}">${mine ? "★ в карточках" : "☆ в карточки"}</button></div></div>
      <div style="font-size:19px;margin-top:10px">${esc(g)}</div>
      ${n ? `<div class="muted" style="margin-top:6px">Из курса: <a href="#/фр/${n}">урок ${FR.num(n)}${FR.done(n) ? " ✓" : ""}</a></div>` : ""}
      <div class="aud-note">🔊 Аудио синтезировано — возможны неточности</div>
      ${rel.length ? `<div style="margin-top:10px"><span class="muted">Родственные: </span>${rel.map(wlink).join("")}</div>` : ""}
      ${syn.length ? `<div style="margin-top:8px"><span class="muted">Синонимы: </span>${syn.map(wlink).join("")}</div>` : ""}
      ${ex.length ? `<div style="margin-top:12px"><div class="k">Примеры</div>${ex.map(([f, ru, k]) => `<div class="ex"><span class="fr">${esc(f)}</span> ${playBtn(f, 1)}<div class="muted">${esc(ru)}${k ? ` · <a href="#/фр/${k}">урок ${FR.num(k)}</a>` : ""}</div></div>`).join("")}</div>` : ""}</div>`;
  }
  const dict = () => `<div class="k">🇫🇷 Словарь</div><h1 class="page">Все слова <i>французского</i></h1>
    <p class="lead" id="frdlead">Частые слова французского языка с переводом, чтением русскими буквами и озвучкой. Ищи по-русски или по-французски — значки над буквами можно не ставить.</p>
    <div class="dhead"><input class="in" id="frdq" placeholder="Например: дом, или maison" value="${esc(DS.q)}" autocomplete="off" spellcheck="false">
    <div class="seg" id="frdpos">${[["", "все"], ["n", "сущ."], ["v", "глаголы"], ["a", "прил."], ["adv", "нареч."], ["f", "служебные"], ["num", "числа"], ["phr", "выражения"]].map(([p, t]) => `<button data-p="${p}" class="${p === DS.pos ? "on" : ""}">${t}</button>`).join("")}</div></div>
    <div id="frdres"><div class="card muted">Загружаю словарь…</div></div>
    <p class="muted" style="font-size:12.5px;margin-top:14px">Переводы и примеры — <a href="https://ru.wiktionary.org" target="_blank" rel="noopener">Викисловарь</a> (CC BY-SA 4.0), частотность — FrequencyWords (OpenSubtitles); чтение русскими буквами построено по транскрипции.</p>`;
  let FORMN = null;                                  // формы слов без значков: «etes» → être
  const formOf = (q) => { q = dn(q); if (!q || /[а-я]/.test(q) || !FR_DICT.forms) return null;
    if (!FORMN) { FORMN = {}; for (const [f, L] of Object.entries(FR_DICT.forms)) (FORMN[dn(f)] = FORMN[dn(f)] || []).push([f, L]); }
    return FORMN[q] || null; };
  function dictRender() {
    if (!$("#frdres")) return;
    let res = dictSearch(DS.q, DS.pos); const fm = formOf(DS.q);
    if (fm) { const lem = new Set(fm.flatMap(([, L]) => L)); res = res.filter((w) => !lem.has(w[0])); res.unshift(...FR_DICT.words.filter((w) => lem.has(w[0]) && (!DS.pos || w[1] === DS.pos))); }
    const list = res.slice(0, DS.shown);
    const open = DS.open && FR_DICT.words.find((w) => w[0] === DS.open);
    $("#frdres").innerHTML = (open ? wordCard(open) + "<div style='height:14px'></div>" : "") +
      (fm ? `<div class="card frform">${fm.map(([f, L]) => `<span class="fr">${esc(f)}</span> — форма слова ${L.map(wlink).join(" или ")}`).join("<br>")}</div>` : "") +
      (res.length ? `<div class="muted" style="margin-bottom:8px">Найдено: ${res.length.toLocaleString("ru")}</div>` : `<div class="card muted">Ничего не нашлось. Попробуй другое слово или начальную форму (глагол — как в словаре: <span class="fr">aller</span>, а не <span class="fr">vais</span>).</div>`) +
      `<div class="dlist">${list.map((w) => `<div class="card wrow" data-w="${esc(w[0])}"><div class="txt"><div class="w fr">${esc(w[0])}${w[6] ? ` <small class="frdc" title="слово из курса">урок ${FR.num(w[6])}</small>` : ""}</div>
        <div class="m">${esc(w[2])}</div><div class="r">${w[3] ? `«${esc(w[3])}» · ` : ""}${posTxt(w)}</div></div>${playBtn(w[0], 1)}</div>`).join("")}</div>` +
      (res.length > list.length ? `<div class="more"><button class="btn" id="frdmore">Показать ещё</button></div>` : "");
  }
  async function bindDict() {
    try { await dictLoad(); } catch (e) { if ($("#frdres")) $("#frdres").innerHTML = `<div class="card muted">Не удалось загрузить словарь — проверь интернет и обнови страницу.</div>`; return; }
    if (!$("#frdres")) return;
    $("#frdlead").textContent = `${FR_DICT.words.length.toLocaleString("ru")} слов и выражений: частые слова французского с переводом, чтением русскими буквами и озвучкой. Ищи по-русски или по-французски — значки над буквами можно не ставить.`;
    dictRender();
    let t; $("#frdq").addEventListener("input", (e) => { clearTimeout(t); t = setTimeout(() => { DS.q = e.target.value; DS.shown = 60; DS.open = null; dictRender(); }, 120); });
    $("#frdpos").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; DS.pos = b.dataset.p; DS.shown = 60; $("#frdpos").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b)); dictRender(); });
    $("#frdres").addEventListener("click", (e) => {
      if (e.target.closest(".play, [data-say], .lsn-play")) return;
      const m = e.target.closest("[data-frmy]"); if (m) { const w = FR_DICT.words.find((x) => x[0] === m.dataset.frmy), M = my();
        if (M[w[0]]) { delete M[w[0]]; toast("Убрал из карточек"); } else { M[w[0]] = [w[2], w[3]]; toast("Добавил в карточки"); } Store.save(); dictRender(); return; }
      if (e.target.id === "frdmore") { DS.shown += 60; dictRender(); return; }
      const o = e.target.closest("[data-ow]"); if (o) { DS.open = o.dataset.ow; dictRender(); window.scrollTo({ top: $("#frdres").offsetTop - 90, behavior: "smooth" }); return; }
      const r = e.target.closest(".wrow"); if (r && !e.target.closest("a")) { DS.open = r.dataset.w; dictRender(); window.scrollTo({ top: $("#frdres").offsetTop - 90, behavior: "smooth" }); }
    });
  }

  // ---------------------------------------------------------------- справочник: все таблицы уроков по разделам
  const ref = () => `${head("📐", "Справочник", "Все главные таблицы курса в одном месте. Любую можно закрепить на доске шпаргалок — она будет видна сбоку во всех уроках.")}<div id="frref" class="card muted">Загружаю…</div>`;
  async function bindRef() {
    await loadAll(); if (!$("#frref")) return;
    Board.bind(); Board.setLesson({ title: "Справочник", pins: all().flatMap((l) => (FR_C[l.n] || {}).pins || []) });
    $("#frref").outerHTML = FR_I.sections.map((sec, k) => `<div class="lsec"><h2><span class="gn">${k + 1}</span>${esc(sec)}</h2>
      ${all().filter((l) => l.sec === k).map((l) => ((FR_C[l.n] || {}).pins || []).map((P) => `<div class="card c2pin"><div class="row"><b>📌 ${esc(P.t)}</b><span><a class="muted" href="#/фр/${l.n}">урок ${FR.num(l.n)}</a> ${Board.pinButton(P.id)}</span></div>${FR.rich(P.html, FR_C[l.n])}</div>`).join("")).join("")}</div>`).join("");
    Board.render();
  }

  // ---------------------------------------------------------------- карточки (Лейтнер: 5 коробок, интервалы 0, 1, 3, 7, 16 дней)
  const DAYS = [0, 1, 3, 7, 16];
  const deck = () => { const S = S0(); S.frcards = S.frcards || {}; return S.frcards; };
  const due = (W) => W.filter((x) => { const c = deck()[x.w]; return !c || c.due <= today(); });
  const cards = () => `${head("🃏", "Карточки", "Слова пройденных уроков. Посмотри на слово, вспомни перевод и открой карточку. Что помнишь хорошо — вернётся реже, что забыл — завтра.")}<div id="frc" class="card muted">Загружаю…</div>`;
  async function bindCards() {
    await loadAll(); if (!$("#frc")) return;
    const W = wordsOf(learned()), have = new Set(W.map((x) => x.w));
    Object.entries(S0().frMy || {}).forEach(([w, [m, r]]) => { if (!have.has(w)) W.push({ w, m, r, n: 0 }); });
    if (!W.length) { $("#frc").innerHTML = `Карточки появятся, когда пройдёшь первый урок или добавишь слово из словаря (☆ в карточки). <a class="btn gold sm" href="#/фр/1">Урок 1 ▶</a>`; return; }
    const queue = AltT.shuffle(due(W)).slice(0, 20); let i = 0, good = 0;
    const show = () => {
      if (i >= queue.length) { $("#frc").className = "card c2res"; $("#frc").innerHTML = queue.length
        ? `<h2>Готово!</h2><p>Повторено слов: <b>${queue.length}</b>, помнил сразу: <b>${good}</b>. ${good ? `+${good} очков ✦` : ""}</p><a class="btn gold" href="#/французский">К урокам</a>`
        : `<h2>На сегодня всё повторено ✓</h2><p class="muted">Всего слов в карточках: ${W.length}. Следующие вернутся в свой день.</p><a class="btn gold" href="#/французский">К урокам</a>`;
        if (good) Store.addPoints(good); return; }
      const x = queue[i];
      $("#frc").className = "card frcard"; $("#frc").innerHTML = `<div class="muted">${i + 1} из ${queue.length} · ${x.n ? `урок ${FR.num(x.n)}` : "из словаря"}</div><div class="frcw">${playBtn(x.w)}<b class="fr">${esc(x.w)}</b></div>
        <div id="frcb"><button class="btn gold" id="frco">Показать перевод</button></div>`;
      speak(x.w);
      $("#frco").onclick = () => { $("#frcb").innerHTML = `<div class="frcm">${x.r ? `<span class="muted">«${esc(x.r)}»</span>` : ""}<b>${esc(x.m)}</b></div>
        <div class="row" style="justify-content:center;gap:10px"><button class="btn" data-k="0">✗ Не помню</button><button class="btn gold" data-k="1">✓ Помню</button></div>`;
        $("#frcb").querySelectorAll("[data-k]").forEach((b) => b.onclick = () => {
          const c = deck()[x.w] || { box: 0 }, ok = b.dataset.k === "1"; if (ok) good++;
          c.box = ok ? Math.min(4, c.box + 1) : 0; const d = new Date(); d.setDate(d.getDate() + (ok ? DAYS[c.box] : 1)); c.due = d.toISOString().slice(0, 10);
          deck()[x.w] = c; Store.save(); i++; show(); }); };
    };
    show();
  }

  // ---------------------------------------------------------------- тренировка: 12 заданий из пройденных уроков, по одному
  const train = () => `${head("🔥", "Тренировка", "12 заданий из уроков, которые ты уже прошёл: треть — на слух. Ошибся — увидишь разбор, и задание вернётся в конце.")}<div id="frt" class="card muted">Загружаю…</div>`;
  async function bindTrain() {
    await loadAll(); if (!$("#frt")) return;
    const ls = learned();
    if (!ls.length) { $("#frt").innerHTML = `Тренировка откроется после первого урока. <a class="btn gold sm" href="#/фр/1">Урок 1 ▶</a>`; return; }
    const S = S0(); S.frtrain = S.frtrain && S.frtrain.day === today() ? S.frtrain : { day: today(), s: 0 };
    const fix = (t) => Object.assign({ rq: t.why }, t, { lang: t.lang || (t.opts ? "x" : "fr") });
    const pool = AltT.shuffle(ls.flatMap((l) => ((FR_C[l.n] || {}).tasks || []).map(fix)));
    const lsn = AltT.shuffle(ls).slice(0, 4).flatMap((l) => FR.listenItems(FR_C[l.n], FR.info(l.n)).slice(0, 1));
    const items = AltT.shuffle(pool.slice(0, 12 - lsn.length).concat(lsn));
    let i = 0, first = 0; const again = [];
    const step = () => {
      const it = items[i]; if (!it) return end();
      window.__frtCur = it;
      $("#frt").className = "frtq"; $("#frt").innerHTML = `<div class="c2prog"><i style="width:${Math.round(i / items.length * 100)}%"></i></div><div class="muted">Задание ${i + 1} из ${items.length}</div><div class="alt-qs" id="frtq"></div><div id="frtn"></div>`;
      AltT.mount($("#frtq"), [it], { base: i, onAnswer: (item, f, ok) => {
        if (f && ok && !it.again) first++; if (!ok && !it.again) items.push(Object.assign({}, it, { again: true }));
        $("#frtn").innerHTML = `<button class="btn gold" id="frtgo">Дальше ▶</button>`; $("#frtgo").onclick = () => { i++; step(); }; } });
      const pl = $("#frt .lsn-play"); if (pl) setTimeout(() => pl.isConnected && pl.click(), 300);
    };
    const end = () => { S0().frtrain.s++; const pts = first + 5; Store.addPoints(pts);
      $("#frt").className = "card c2res"; $("#frt").innerHTML = `<h2>Тренировка закончена!</h2><p>С первой попытки: <b>${first} из ${items.filter((x) => !x.again).length}</b>. +${pts} очков ✦</p>
        <p class="muted">Сегодня тренировок: ${S0().frtrain.s}.</p><div class="row" style="justify-content:center;gap:10px"><button class="btn gold" onclick="route()">Ещё одна ↻</button><a class="btn" href="#/французский">К урокам</a></div>`; };
    step();
  }
  // ---------------------------------------------------------------- полезное: фразы по ситуациям (data/french/useful.js)
  const useful = () => `${head("💬", "Полезное", "Готовые фразы для поездки во Францию: нажми ▶, послушай и повтори вслух.")}
    ${(window.FR_USEFUL || []).map((g) => `<details class="card c2sec" open><summary>${g.ic} ${esc(g.t)}</summary><div class="alt-exs">${g.p.map(([f, r, rd]) => `<div class="alt-ex">${playBtn(f, 1)}<div><span class="fr">${esc(f)}</span> <span class="alt-ru">— ${esc(r)}</span><div class="rd">«${esc(rd)}»</div></div></div>`).join("")}</div></details>`).join("")}${C2_AUD_NOTE}`;
  return { dict, bindDict, ref, bindRef, cards, bindCards, train, bindTrain, useful };
})();
