// Ежедневная тренировка (#/тренировка, 7.11.2026, ТЗ_слух_и_тренировка.md) — «как Duolingo, но прокачанная».
// Занятие 3–5 минут: 12 заданий по одному из пройденных уроков (треть — на слух) + 1–2 новых бытовых слова (data/daily-words.js).
// Подстройка: у каждого задания своя «сила» (Store.dt.items[отпечаток] = {s 0..5, w ошибок, d дата}) — чаще попадается то,
// где ошибаешься, и то, что давно не повторял. Ошибся — разбор «почему» и задание вернётся в конце занятия.
// Режимы: спокойный (без жизней) и хардкор (3 жизни, очки ×2). Комбо: верно подряд — больше очков, звуки (WebAudio).
// Серия дней — дни, когда выполнена дневная цель (1–4 занятия ≈ 5–20 минут); заморозка спасает пропущенный день.
// Задания дня (3 в день) дают бонусы: 💡 подсказка и 🛡 «ошибка не считается» — тратятся в уроках (js/alt-tasks.js), ❄ заморозка, 💎 сундук.
// Тренировка открывает: следующий урок (3 занятия подряд ≥ 80 % по материалу этого урока; контрольные — только сдать)
// и пересдачу контрольной без часа ожидания (занятие по её ошибкам ≥ 80 %).
const Daily = (() => {
  const PASS = 80, SIZE = 12, HEARTS = 3, RUN = 3;
  const st = () => { const S = Store.get(); const d = (S.dt = S.dt || {});
    d.mode = d.mode || "calm"; d.goal = d.goal || 2; d.log = d.log || {}; d.items = d.items || {}; d.newW = d.newW || [];
    d.bonus = Object.assign({ hint: 0, retry: 0, freeze: 0 }, d.bonus || {}); d.frozen = d.frozen || []; return d; };
  const day = (off = 0) => { const x = new Date(); x.setDate(x.getDate() + off); return x.toISOString().slice(0, 10); };
  const dlog = (k = Store.today()) => { const d = st(); return (d.log[k] = d.log[k] || { s: 0, xp: 0, lsn: 0, perfect: 0, combo: 0, newW: 0, hard: 0 }); };
  const met = (k) => { const d = st(); return ((d.log[k] || {}).s || 0) >= d.goal || d.frozen.includes(k); };
  function streak() { let n = 0, off = met(day()) ? 0 : -1; while (met(day(off))) { n++; off--; } return n; }
  // вчера цель не выполнена, но позавчера — да: тратится заморозка, серия не рвётся
  function autoFreeze() { const d = st(), y = day(-1);
    if (!met(y) && met(day(-2)) && d.bonus.freeze > 0) { d.bonus.freeze--; d.frozen = [...d.frozen, y].slice(-90); Store.save(); return true; } return false; }

  // ---------------------------------------------------------------- задания дня
  const QUESTS = { lsn: ["Реши 5 заданий на слух", 5, (L) => L.lsn], perfect: ["Пройди занятие без ошибок", 1, (L) => L.perfect],
    combo: ["Набери комбо 8", 8, (L) => L.combo], goal: ["Выполни дневную цель", 1, (L) => (L.s >= st().goal ? 1 : 0)],
    neww: ["Выучи 2 новых слова", 2, (L) => L.newW], two: ["Пройди 2 занятия", 2, (L) => L.s], hard: ["Пройди занятие в хардкоре", 1, (L) => L.hard] };
  const REWARD = [{ hint: 2 }, { retry: 1 }, null];               // третье — по чётности дня: 💎 сундук или ❄ заморозка
  const RNAME = { hint: "💡 подсказки", retry: "🛡 «ошибка не считается»", freeze: "❄ заморозка серии", chest: "💎 сундук" };
  function quests() {
    const d = st(), k = Store.today();
    if (!d.q || d.q.date !== k) { let h = 0; for (const c of k) h = (h * 31 + c.charCodeAt(0)) >>> 0;
      const ids = Object.keys(QUESTS).filter((x) => x !== "goal"), pick = ["goal"];
      while (pick.length < 3) { h = (h * 1103515245 + 12345) >>> 0; const id = ids[h % ids.length]; if (!pick.includes(id)) pick.push(id); }
      d.q = { date: k, ids: [pick[1], pick[2], pick[0]], claimed: [false, false, false] }; }
    const L = dlog(), odd = +k.slice(-1) % 2;
    return d.q.ids.map((id, i) => { const [t, need, f] = QUESTS[id], got = Math.min(need, f(L)), rw = REWARD[i] || (odd ? { chest: 1 } : { freeze: 1 });
      return { i, id, t, need, got, done: got >= need, claimed: d.q.claimed[i], rw }; });
  }
  function claim(i) { const q = quests()[i], d = st(); if (!q || !q.done || q.claimed) return;
    for (const [k, v] of Object.entries(q.rw)) { if (k === "chest") Store.get().chests += v; else d.bonus[k] += v; }
    d.q.claimed[i] = true; Store.save(); sound("combo", 5); toast("Награда: " + Object.entries(q.rw).map(([k, v]) => `${RNAME[k]} ×${v}`).join(", ")); }
  // бонусы в уроках (js/alt-tasks.js)
  function useBonus(k) { const d = st(); if (d.bonus[k] > 0) { d.bonus[k]--; Store.save(); return true; } return false; }

  // ---------------------------------------------------------------- звуки (WebAudio, без файлов)
  let AC = null;
  function sound(kind, combo = 0) {
    const S = Store.get(); if (S.opts && S.opts.mute) return;
    try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
    const t0 = AC.currentTime, notes = kind === "ok" ? [660, 990] : kind === "bad" ? [220, 165] : kind === "end" ? [523, 659, 784, 1047]
      : [523, 659, 784].map((f) => f * (1 + Math.min(combo, 12) * 0.03));
    notes.forEach((f, i) => { const o = AC.createOscillator(), g = AC.createGain(); o.type = kind === "bad" ? "triangle" : "sine"; o.frequency.value = f;
      const a = t0 + i * (kind === "end" ? 0.11 : 0.07); g.gain.setValueAtTime(0, a); g.gain.linearRampToValueAtTime(kind === "bad" ? 0.12 : 0.09, a + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, a + 0.35); o.connect(g).connect(AC.destination); o.start(a); o.stop(a + 0.4); });
  }

  // ---------------------------------------------------------------- материал и подстройка
  const sigOf = (t) => c2Sig(t) + (t.say ? "|s" : "") + (t.lsn || "");
  const learnedW = () => ET_C2I.lessons.filter((l) => Lv.done(l.n)).flatMap((l) => l.words || []);
  async function material() {
    const done = ET_C2I.lessons.filter((l) => Lv.done(l.n) && !l.check);
    for (const l of ET_C2I.lessons.filter((x) => x.n <= Math.max(0, ...done.map((y) => y.n)))) await c2Load(l.n).catch(() => null);
    await trReady();
    const tasks = done.flatMap((l) => (ET_C2[l.n] ? c2LessonTasks(l.n, ET_C2[l.n]) : []).filter((t) => t.k !== "trtext").map((t) => ({ ...t, from: l.n })));
    const W = [...learnedW(), ...st().newW.map(([w, m]) => [w, m])];
    W.forEach(([w, m], i) => { const o = AltT.shuffle(W.filter((x) => x[0] !== w && x[1] !== m)).slice(0, 2); if (o.length < 2) return;
      tasks.push(i % 3 === 0 ? { k: "listen", lsn: "pick", say: w, q: "Послушай: что значит это слово?", opts: [m, ...o.map((x) => x[1])], a: m, lang: "x", why: `${w} — ${m}`, rq: `${w} — ${m}` }
        : i % 3 === 1 ? { k: "choice", q: `Как будет «${m}»?`, opts: [w, ...o.map((x) => x[0])], a: w, lang: "et", why: `${w} — ${m}`, rq: `${w} — ${m}` }
        : { k: "choice", q: `Что значит ${w}?`, opts: [m, ...o.map((x) => x[1])], a: m, lang: "x", why: `${w} — ${m}`, rq: `${w} — ${m}` }); });
    return tasks;
  }
  // выбор с весами: слабые, давние и новые задания — чаще
  function weighted(pool, k) {
    const d = st(), now = Date.now(), items = pool.map((t) => { const r = d.items[sigOf(t)];
      const age = r && r.d ? (now - Date.parse(r.d)) / 864e5 : 7, w = 1 + (5 - (r ? r.s : 0)) * 1.2 + (r ? r.w : 0) * 1.5 + Math.min(age, 14) / 3;
      return { t, w: w * (0.6 + Math.random() * 0.8) }; });
    return items.sort((a, b) => b.w - a.w).slice(0, k).map((x) => x.t);
  }
  function compose(pool, size) {
    const lis = pool.filter((t) => t.lsn || t.k === "listen"), other = pool.filter((t) => !(t.lsn || t.k === "listen"));
    const nl = Math.min(lis.length, Math.ceil(size / 3)), out = [...weighted(lis, nl), ...weighted(other, size - nl)];
    return AltT.shuffle(out).slice(0, size);
  }
  function newWords() {
    const known = new Set([...learnedW().map((x) => x[0]), ...st().newW.map((x) => x[0])]);
    return (window.ET_DW || []).filter((x) => !known.has(x[0])).slice(0, Math.random() < 0.5 ? 1 : 2);
  }
  // режимы занятия: обычное, «открыть урок N», «пересдать контрольную N без ожидания»
  function unlockTarget() { const f = Lv.firstOpen(); return f && !f.check ? f : null; }
  function examTargets() { return ET_C2I.lessons.filter((l) => l.check && Lv.retryLeft(l.n) > 0 && ((Store.get().prep || {})[l.n] || {}).miss && Store.get().prep[l.n].miss.length); }
  async function session(kind, n) {
    if (kind === "урок") { const L = await c2Load(n); await c2LoadPrev(n); await trReady();
      return { kind, n, items: AltT.shuffle([...c2MemItems(L), ...c2LessonTasks(n, L).filter((t) => t.k !== "trtext")]).slice(0, 10), title: `Урок ${n} через тренировку` }; }
    if (kind === "контрольная") { await prepLoad(n); const miss = prepState(n).miss || [];
      const like = miss.map((m) => AltT.shuffle(prepTasks(n).filter((t) => t.k === m.k && t.q !== m.q))[0]).filter(Boolean);
      return { kind, n, items: AltT.shuffle([...miss, ...like].filter((t) => t.k !== "trtext")).slice(0, 10).map((t) => ({ rq: t.why, ...t })), title: `Ошибки контрольной ${n}` }; }
    const pool = await material(); if (!pool.length) return null;
    const items = compose(pool, SIZE - 2), nw = newWords(), all = [...learnedW(), ...(window.ET_DW || []).map(([w, m]) => [w, m])];
    nw.forEach(([w, m, em], i) => { const o = AltT.shuffle(all.filter((x) => x[0] !== w && x[1] !== m)).slice(0, 2);
      items.splice(2 + i * 4, 0, { intro: true, w, m, em }, { k: "choice", q: `${em} Как будет «${m}»?`, opts: [w, ...o.map((x) => x[0])], a: w, lang: "et", why: `${w} — ${m}`, neww: [w, m] }); });
    return { kind: "обычное", items, title: "Занятие" };
  }

  // ---------------------------------------------------------------- страница
  function page(args) { return args[0] ? `<div id="dtrun"><div class="card muted">Готовлю занятие…</div></div>` : `<div id="dt"></div>`; }
  function bind(args) { ARate.sec = null; if (args[0]) return run(args[0], +args[1] || 0); autoFreeze(); home(); }
  function home() {
    const d = st(), L = dlog(), sk = streak(), Q = quests(), U = unlockTarget(), E = examTargets(), any = ET_C2I.lessons.some((l) => Lv.done(l.n));
    const ur = d.unlock && U && d.unlock.n === U.n ? d.unlock.run : 0, pct = Math.min(100, Math.round(L.s / d.goal * 100));
    $("#dt").innerHTML = `<div class="k">Каждый день · 3–5 минут</div><h1 class="page">Ежедневная <i>тренировка</i></h1>
    <p class="lead">Короткие занятия по пройденному: чаще попадается то, где ты ошибаешься. Треть заданий — на слух, в каждом занятии 1–2 новых бытовых слова.</p>
    <div class="dtgrid">
      <div class="card dthero"><div class="dtfire${sk ? " on" : ""}"><b>${sk}</b><small>${plural(sk, "день", "дня", "дней")} подряд</small></div>
        <div class="dtgoal"><div class="prring ${pct >= 100 ? "ok" : "mid"}" style="--p:${pct}"><b>${L.s}/${d.goal}</b><small>цель дня</small></div></div>
        <div class="dtstart">${any ? `<a class="btn gold big" href="#/тренировка/занятие">Начать занятие ▶</a><span class="muted">≈ 4 минуты · ${SIZE} заданий</span>`
          : `<p class="muted">Тренировка повторяет пройденное — сначала пройди урок 1. Или открой его тренировкой ниже.</p>`}</div></div>
      <div class="card dtset"><h3>Режим</h3><div class="dtseg" data-mode>${[["calm", "Спокойный", "без жизней"], ["hard", "Хардкор", `❤ ×${HEARTS}, очки ×2`]].map(([k, t, s]) =>
          `<button class="${d.mode === k ? "on" : ""}" data-m="${k}"><b>${t}</b><small>${s}</small></button>`).join("")}</div>
        <h3>Цель дня</h3><div class="dtseg" data-goal>${[1, 2, 3, 4].map((g) => `<button class="${d.goal === g ? "on" : ""}" data-g="${g}"><b>${g}</b><small>≈ ${g * 5} мин</small></button>`).join("")}</div>
        <label class="adtog"><input type="checkbox" id="dtmute" ${(Store.get().opts || {}).mute ? "" : "checked"}> Звуки</label></div>
    </div>
    <h2 class="c2h">Задания дня</h2><div class="dtq">${Q.map((q) => `<div class="card dtqi${q.done ? " done" : ""}"><div><b>${q.t}</b><div class="bar"><i style="width:${Math.round(q.got / q.need * 100)}%"></i></div>
      <small class="muted">${q.got}/${q.need} · награда: ${Object.entries(q.rw).map(([k, v]) => RNAME[k] + (v > 1 ? " ×" + v : "")).join(", ")}</small></div>
      ${q.claimed ? `<span class="dtok">✓</span>` : q.done ? `<button class="btn gold sm" data-claim="${q.i}">Забрать</button>` : ""}</div>`).join("")}</div>
    <h2 class="c2h">Бонусы</h2><div class="card dtbon"><span>💡 <b>${d.bonus.hint}</b> подсказок</span><span>🛡 <b>${d.bonus.retry}</b> «ошибка не считается»</span><span>❄ <b>${d.bonus.freeze}</b> заморозок</span><span>💎 <b>${Store.get().chests}</b> сундуков</span>
      <div class="muted">💡 и 🛡 тратятся в уроках самоучителя: подсказка убирает неверный вариант или подставляет начало ответа, 🛡 — первая ошибка в задании не снимает звезду. ❄ сама спасёт серию, если пропустишь день.</div></div>
    ${U || E.length ? `<h2 class="c2h">Открыть тренировкой</h2>` : ""}
    ${U ? `<div class="card dtun"><div><b>Урок ${U.n} «${esc(U.t)}»</b><div class="muted">Пройди ${RUN} занятия подряд по материалу урока на ${PASS} %+ — урок засчитается, откроется следующий. Сейчас: ${ur} из ${RUN}.</div>
      <div class="dtdots">${Array.from({ length: RUN }, (_, i) => `<i class="${i < ur ? "on" : ""}"></i>`).join("")}</div></div><a class="btn" href="#/тренировка/урок/${U.n}">Занятие ▶</a></div>` : ""}
    ${E.map((l) => `<div class="card dtun"><div><b>Контрольная ${l.n}: пересдать без ожидания</b><div class="muted">Пройди занятие по её ошибкам на ${PASS} %+ — и пересдавай сразу, не дожидаясь часа (осталось ${Lv.retryLeft(l.n)} мин).</div></div><a class="btn" href="#/тренировка/контрольная/${l.n}">Занятие ▶</a></div>`).join("")}`;
    $("#dt").onclick = (e) => { const m = e.target.closest("[data-m]"), g = e.target.closest("[data-g]"), c = e.target.closest("[data-claim]");
      if (m) { d.mode = m.dataset.m; Store.save(); home(); } if (g) { d.goal = +g.dataset.g; Store.save(); home(); } if (c) { claim(+c.dataset.claim); home(); } };
    $("#dtmute").onchange = (e) => { const S = Store.get(); S.opts = S.opts || {}; S.opts.mute = !e.target.checked; Store.save(); };
  }
  const plural = (n, a, b, c) => (n % 10 === 1 && n % 100 !== 11 ? a : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? b : c);

  // ---------------------------------------------------------------- занятие
  async function run(kind, n) {
    const box = $("#dtrun"), d = st(), hard = d.mode === "hard";
    const S0 = await session(kind === "занятие" ? "обычное" : kind, n).catch((e) => { console.warn("тренировка:", e); return null; });
    if (!S0 || !S0.items.length) { box.innerHTML = `<div class="card soon"><h2>Пока нечего тренировать</h2><p class="muted">Пройди урок 1 — и тренировка будет повторять пройденное.</p><a class="btn gold" href="#/тренировка">Назад</a></div>`; return; }
    window.__dtItems = S0.items;                                        // для автотеста
    const Q = S0.items.slice(), base = Q.filter((x) => !x.intro).length;
    let i = 0, firstOk = 0, answered = 0, combo = 0, best = 0, pts = 0, hearts = hard ? HEARTS : 0, mistakes = 0, lsn = 0, neww = 0;
    const requeued = new Set();
    box.innerHTML = `<div class="dts"><div class="dttop"><a class="btn sm" href="#/тренировка" title="Выйти">✕</a><div class="dtbar"><i id="dtbar"></i></div>
      ${hard ? `<span class="dthp" id="dthp"></span>` : ""}</div><div class="dtcombo" id="dtcombo"></div><div class="aud-note" style="margin:0 0 8px">${esc(S0.title)} · 🔊 аудио синтезировано</div>
      <div id="dtq"></div><div id="dtnext"></div></div>`;
    const hp = () => { const e = $("#dthp"); if (e) e.innerHTML = "❤".repeat(hearts) + `<span class="muted">${"♡".repeat(HEARTS - hearts)}</span>`; };
    const bar = () => { $("#dtbar").style.width = Math.round(Math.min(answered, base) / base * 100) + "%"; };
    const showCombo = () => { const e = $("#dtcombo"); e.innerHTML = combo >= 3 ? `<span class="pop">комбо ×${combo} · ${mult()}x очки</span>` : ""; };
    const mult = () => (combo >= 10 ? 3 : combo >= 6 ? 2.5 : combo >= 3 ? 1.5 : 1);
    hp(); bar();
    const next = () => { i++; if (i >= Q.length) return finish(); step(); };
    const step = () => {
      const it = Q[i], q0 = $("#dtq"), nx = $("#dtnext"); if (!q0) return; nx.innerHTML = "";
      q0.innerHTML = `<div class="alt-qs"></div>`; const q = q0.firstChild; window.__dtCur = it;      // текущее задание — для автотеста              // новый блок на каждое задание: обработчики не копятся
      if (it.intro) {
        q.innerHTML = `<div class="card dtnew"><div class="k">Новое слово</div><div class="dtem">${it.em}</div><div class="dtw"><b class="et">${esc(it.w)}</b> ${playBtn(it.w)}</div><div class="muted">«${esc(rd(it.w))}»</div><div class="dtm">${esc(it.m)}</div></div>`;
        nx.innerHTML = `<button class="btn gold big" id="dtgo">Запомнил ▶</button>`; $("#dtgo").onclick = next; setTimeout(() => speak(it.w), 300); return; }
      AltT.mount(q, [it], { exam: true, base: Math.min(answered, base - 1), onAnswer: (x, f, ok, frac) => {
        const again = requeued.has(x); ok = x.k === "trtext" ? (frac || 0) >= 1 : ok;
        const d2 = st(), sg = sigOf(x), r = d2.items[sg] || { s: 0, w: 0 };
        if (!again) { answered++; r.s = ok ? Math.min(5, r.s + 1) : Math.max(0, r.s - 2); if (!ok) r.w++; r.d = new Date().toISOString(); d2.items[sg] = r; }
        if (ok) { if (!again) firstOk++; combo++; best = Math.max(best, combo); pts += Math.round(2 * mult()); if (x.lsn || x.k === "listen") lsn++; if (x.neww && !again) neww++;
          sound(combo >= 3 ? "combo" : "ok", combo); }
        else { mistakes++; combo = 0; sound("bad"); if (!again) { requeued.add(x); Q.push(x); } if (hard) { hearts--; hp(); } }
        if (x.neww && ok) { const nwl = st().newW; if (!nwl.some((y) => y[0] === x.neww[0])) nwl.push(x.neww); if (!Store.hasWord(x.neww[0])) Store.toggleWord(x.neww[0]); }
        showCombo(); bar(); Store.save();
        if (hard && hearts <= 0) return fail();
        nx.innerHTML = `<div class="dtfb ${ok ? "ok" : "bad"}"><b>${ok ? ["Отлично!", "Верно!", "Так держать!", "Супер!"][Math.floor(Math.random() * 4)] : again ? "Ещё не так — запомни разбор" : "Почти! Разбор выше, задание вернётся в конце"}</b>
          <button class="btn gold" id="dtgo">${i + 1 >= Q.length ? "Итог ▶" : "Дальше ▶"}</button></div>`;
        $("#dtgo").onclick = next; $("#dtgo").focus({ preventScroll: true }); } });
      const pl = q.querySelector(".lsn-play"); if (pl) setTimeout(() => pl.isConnected && pl.click(), 300);
      const inp = q.querySelector("input"); if (inp) inp.focus({ preventScroll: true });
    };
    const fail = () => { $("#dtrun").innerHTML = `<div class="card c2res"><div class="bigstars">💔</div><h2>Жизни закончились</h2><p class="muted">В хардкоре ошибки стоят дорого. Очки за это занятие не начислены, но сила заданий запомнилась — в следующий раз они попадутся снова.</p>
      <div class="row" style="justify-content:center;gap:10px;flex-wrap:wrap"><button class="btn gold" onclick="route()">Ещё раз</button><a class="btn" href="#/тренировка">К тренировке</a></div></div>`; };
    const finish = () => {
      const pct = Math.round(firstOk / base * 100), L = dlog(), d2 = st(); sound("end");
      const total = (pts + 5) * (hard ? 2 : 1);
      L.s++; L.xp += total; L.lsn += lsn; L.newW += neww; L.combo = Math.max(L.combo, best); if (!mistakes) L.perfect++; if (hard) L.hard++;
      d2.bonus.hint++; Store.addPoints(total);
      let extra = "";
      if (S0.kind === "урок") { d2.unlock = d2.unlock && d2.unlock.n === S0.n ? d2.unlock : { n: S0.n, run: 0 };
        d2.unlock.run = pct >= PASS ? d2.unlock.run + 1 : 0;
        if (d2.unlock.run >= RUN && !Lv.done(S0.n) && Lv.dayBlocked(S0.n)) extra = `<p>Серия для урока ${S0.n} готова, но на сегодня новых уроков хватит — засчитаю после 7:30 утра, если снова сдашь занятие.</p>`;
        else if (d2.unlock.run >= RUN && !Lv.done(S0.n)) { const L1 = ET_C2[S0.n]; Store.finishLesson(S0.n, 1, pct, firstOk); (L1.words || []).forEach(([w]) => Store.hasWord(w) || Store.toggleWord(w));
          d2.unlock = null; extra = `<div class="lvup"><small>Открыто тренировкой</small><b>Урок ${S0.n} засчитан ★</b><span>можно идти дальше — урок ${S0.n + 1}</span></div>`; }
        else extra = `<p>${pct >= PASS ? "Засчитано" : "Нужно " + PASS + " %+ — серия начата заново"}: <b>${d2.unlock ? d2.unlock.run : 0} из ${RUN}</b> занятий подряд для урока ${S0.n}.</p>`; }
      if (S0.kind === "контрольная") { if (pct >= PASS) { delete (Store.get().examLast || {})[S0.n]; prepState(S0.n).miss = [];
          extra = `<div class="lvup"><small>Ожидание снято</small><b>Контрольная ${S0.n}</b><span>можно пересдавать прямо сейчас</span></div>`; }
        else extra = `<p class="muted">Нужно ${PASS} %+, чтобы пересдать без ожидания. Попробуй ещё раз.</p>`; }
      Store.save(); renderNav("учиться");
      const done = L.s === d2.goal;
      $("#dtrun").innerHTML = `<div class="card c2res dtend"><div class="bigstars">${pct >= 90 ? "★★★" : pct >= 70 ? "★★☆" : "★☆☆"}</div><h2>${done ? "Цель дня выполнена! 🔥" : "Занятие пройдено"}</h2>
        <div class="dtres"><div><b>${pct}%</b><small>с первого раза</small></div><div><b>+${total}</b><small>очков${hard ? " (×2)" : ""}</small></div><div><b>${best}</b><small>лучшее комбо</small></div><div><b>${streak()}</b><small>дней подряд</small></div></div>
        ${extra}<p class="muted">+1 💡 подсказка в уроки. Задания дня — на странице тренировки.</p>
        <div class="row" style="justify-content:center;gap:10px;flex-wrap:wrap"><a class="btn gold" href="#/тренировка/${S0.kind === "урок" && !Lv.done(S0.n) ? "урок/" + S0.n : S0.kind === "контрольная" ? "контрольная/" + S0.n : "занятие"}" onclick="setTimeout(route)">${S0.kind === "урок" && Lv.done(S0.n) ? "Обычное занятие ▶" : "Ещё занятие ▶"}</a><a class="btn" href="#/тренировка">К тренировке</a></div></div>`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    step();
  }
  return { page, bind, streak, st, dlog, quests, useBonus, sound, autoFreeze };
})();
function pageDaily(a) { return Daily.page(a); }
function bindDaily(a) { return Daily.bind(a); }
