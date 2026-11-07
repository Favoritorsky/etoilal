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

  // ---------------------------------------------------------------- словарь
  const dict = () => `${head("📚", "Словарь", "Все слова курса — с чтением русскими буквами и озвучкой. ✓ — слово из пройденного урока.")}
    <div class="card"><input class="in" id="frdq" placeholder="Поиск: по-французски или по-русски…" autocomplete="off" spellcheck="false"></div><div id="frdl" class="card muted">Загружаю слова…</div>`;
  async function bindDict() {
    await loadAll(); if (!$("#frdl")) return;
    const W = wordsOf(all()), done = new Set(learned().map((l) => l.n));
    const draw = (q) => { q = AltT.norm(q || "");
      const list = W.filter((x) => !q || AltT.norm(x.w).includes(q) || AltT.norm(x.m).includes(q));
      $("#frdl").className = "card frdict";
      $("#frdl").innerHTML = list.length ? list.map((x) => `<div class="frdw">${playBtn(x.w, 1)}<b class="fr">${esc(x.w)}</b><span class="muted">«${esc(x.r)}»</span><span>${esc(x.m)}</span><a class="muted" href="#/фр/${x.n}">${done.has(x.n) ? "✓ " : ""}урок ${x.n}</a></div>`).join("") : `<span class="muted">Ничего не нашлось.</span>`; };
    draw(""); $("#frdq").addEventListener("input", (e) => draw(e.target.value));
  }

  // ---------------------------------------------------------------- справочник: все таблицы уроков по разделам
  const ref = () => `${head("📐", "Справочник", "Все главные таблицы курса в одном месте. Любую можно закрепить на доске шпаргалок — она будет видна сбоку во всех уроках.")}<div id="frref" class="card muted">Загружаю…</div>`;
  async function bindRef() {
    await loadAll(); if (!$("#frref")) return;
    Board.bind(); Board.setLesson({ title: "Справочник", pins: all().flatMap((l) => (FR_C[l.n] || {}).pins || []) });
    $("#frref").outerHTML = FR_I.sections.map((sec, k) => `<div class="lsec"><h2><span class="gn">${k + 1}</span>${esc(sec)}</h2>
      ${all().filter((l) => l.sec === k).map((l) => ((FR_C[l.n] || {}).pins || []).map((P) => `<div class="card c2pin"><div class="row"><b>📌 ${esc(P.t)}</b><span><a class="muted" href="#/фр/${l.n}">урок ${l.n}</a> ${Board.pinButton(P.id)}</span></div>${FR.rich(P.html, FR_C[l.n])}</div>`).join("")).join("")}</div>`).join("");
    Board.render();
  }

  // ---------------------------------------------------------------- карточки (Лейтнер: 5 коробок, интервалы 0, 1, 3, 7, 16 дней)
  const DAYS = [0, 1, 3, 7, 16];
  const deck = () => { const S = S0(); S.frcards = S.frcards || {}; return S.frcards; };
  const due = (W) => W.filter((x) => { const c = deck()[x.w]; return !c || c.due <= today(); });
  const cards = () => `${head("🃏", "Карточки", "Слова пройденных уроков. Посмотри на слово, вспомни перевод и открой карточку. Что помнишь хорошо — вернётся реже, что забыл — завтра.")}<div id="frc" class="card muted">Загружаю…</div>`;
  async function bindCards() {
    await loadAll(); if (!$("#frc")) return;
    const W = wordsOf(learned());
    if (!W.length) { $("#frc").innerHTML = `Карточки появятся, когда пройдёшь первый урок. <a class="btn gold sm" href="#/фр/1">Урок 1 ▶</a>`; return; }
    const queue = AltT.shuffle(due(W)).slice(0, 20); let i = 0, good = 0;
    const show = () => {
      if (i >= queue.length) { $("#frc").className = "card c2res"; $("#frc").innerHTML = queue.length
        ? `<h2>Готово!</h2><p>Повторено слов: <b>${queue.length}</b>, помнил сразу: <b>${good}</b>. ${good ? `+${good} очков ✦` : ""}</p><a class="btn gold" href="#/французский">К урокам</a>`
        : `<h2>На сегодня всё повторено ✓</h2><p class="muted">Всего слов в карточках: ${W.length}. Следующие вернутся в свой день.</p><a class="btn gold" href="#/французский">К урокам</a>`;
        if (good) Store.addPoints(good); return; }
      const x = queue[i];
      $("#frc").className = "card frcard"; $("#frc").innerHTML = `<div class="muted">${i + 1} из ${queue.length} · урок ${x.n}</div><div class="frcw">${playBtn(x.w)}<b class="fr">${esc(x.w)}</b></div>
        <div id="frcb"><button class="btn gold" id="frco">Показать перевод</button></div>`;
      speak(x.w);
      $("#frco").onclick = () => { $("#frcb").innerHTML = `<div class="frcm"><span class="muted">«${esc(x.r)}»</span><b>${esc(x.m)}</b></div>
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
  return { dict, bindDict, ref, bindRef, cards, bindCards, train, bindTrain };
})();
