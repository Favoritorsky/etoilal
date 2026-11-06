// Подготовка к контрольным (6.11.2026). Всё собирается из уже проверенных заданий уроков (только пройденные слова):
//  1) prepGen*: задания «Закончи фразу», «Ответь по тексту», «Составь по смыслу» — их по 2 в каждом уроке (c2NewTasks);
//  2) #/подготовка/N/пробная — пробная контрольная: тот же формат, другие задания, таймер по желанию, разбор сразу, без паузы;
//  3) #/подготовка/N/разминка — 10 заданий раздела, сначала те, где ошибался в уроках;
//  4) #/подготовка/N/ошибки — работа над ошибками последней контрольной + похожие задания;
//  5) готовность к контрольной (звёзды уроков, разминка, пробная) и слабые уроки — на странице правил контрольной;
//  6) шпаргалка раздела: правила и слова всех уроков раздела, можно закрепить на доске.
// Результаты: Store.get().prep[N] = { warm, prac, miss: [задания] }. N — номер урока-контрольной.

// ---------------------------------------------------------------- генераторы заданий
const PREP_SUBJ = { je: "m", tu: "s", il: "t", el: "t", on: "t", nou: "n", vou: "z", ilz: "l", elz: "l" };
const prepClean = (w) => w.toLowerCase().replace(/[.,!?«»:;]/g, "");
// подлежащее в начале фразы → лицо глагола (m s t n z l) или null
function prepPerson(words) {
  for (const w of words) { const c = prepClean(w); if (PREP_SUBJ[c]) return PREP_SUBJ[c]; }
  const arts = words.map(prepClean);
  if (arts.some((a) => /^(lez|unz|maz|taz|saz|notaz|votaz|leuraz)$/.test(a))) return "l";
  if (arts.some((a) => /^(le|un|ma|ta|sa|nota|vota|leura)$/.test(a) || /^l'/.test(a))) return "t";
  return null;
}
// «Закончи фразу»: фраза обрывается перед глаголом; неверные варианты — тот же глагол с другим «кто» (окончанием)
function prepGenFinish([et, ru], r) {
  const w = et.split(" ");
  for (let i = 1; i < w.length; i++) {
    const raw = w[i], c = prepClean(raw); if (/'/.test(c)) continue;
    const vp = AltT.verbParts(c); if (!vp) continue;
    const p = prepPerson(w.slice(0, i)); if (!p || p !== vp.p) continue;
    const other = ["m", "s", "t", "n", "z", "l"].filter((x) => x !== p).map((x) => [r(), x]).sort((a, b) => a[0] - b[0]).slice(0, 2).map((x) => x[1]);
    const end = w.slice(i).join(" "), mk = (q) => [raw.replace(new RegExp(c.slice(-1) + "(?=[.,!?]*$)"), q), ...w.slice(i + 1)].join(" ");
    return { k: "finish", start: w.slice(0, i).join(" "), opts: [end, ...other.map(mk)], a: end, lang: "x",
      why: `«${ru}» — глагол отвечает на «кто»: окончание -${p}`, rq: "окончание глагола = кто делает (m s t n z l)" };
  }
  return null;
}
// «Ответь по тексту»: три фразы подряд — что сказано во второй?
function prepGenRead(three) {
  if (three.length < 3 || new Set(three.map((x) => x[1])).size < 3) return null;
  return { k: "read", text: three.map((x) => x[0]).join(" "), q: "Что сказано во втором предложении?", opts: three.map((x) => x[1]), a: three[1][1], lang: "x",
    why: `второе предложение: «${three[1][0]}»`, rq: "читай по смыслу, не по одному слову" };
}
// «Составь по смыслу»: ситуация по-русски → фраза из плиток (+ 2 лишних слова)
function prepGenSense([et, ru], pool, r) {
  const mine = new Set(et.replace(/[.!?]$/, "").split(" ").map(prepClean));
  const extra = [...new Set(pool.flatMap(([e]) => e.replace(/[.!?]$/, "").split(" ")).filter((x) => !mine.has(prepClean(x)) && !/[,«»]/.test(x)))].map((x) => [r(), x]).sort((a, b) => a[0] - b[0]).slice(0, 2).map((x) => x[1]);
  return { k: "sense", q: `Скажи на Etoilal: «${ru}»`, a: et, d: extra, why: `${et} — ${ru}`, rq: "собери фразу по смыслу" };
}
const prepShuffle = (a, r) => a.map((x) => [r(), x]).sort((p, q) => p[0] - q[0]).map((x) => x[1]);
// 2 новых задания для урока n (из заданий уроков n-4…n-1, кроме фраз «Переведи текст»)
function c2NewTasks(n) {
  if (n < 6) return [];
  const used = new Set(((c2TextTask(n)[0] || {}).parts || []).map((x) => x[0]));
  const r = c2Rand(n * 7 + 3), pool = prepShuffle(c2Sentences(Math.max(4, n - 4), n - 1).filter((x) => !used.has(x[0])), r);
  const out = [], f = pool.map((x) => prepGenFinish(x, r)).find(Boolean); if (f) out.push(f);
  const rest = pool.filter((x) => !f || !f.why.includes(x[1]));
  const second = n % 2 ? prepGenRead(rest.slice(0, 3)) : rest[0] && prepGenSense(rest[0], rest, r);
  if (second) out.push(second);
  return out;
}

// ---------------------------------------------------------------- данные раздела
const prepSec = (n) => ET_C2I.lessons.find((l) => l.n === n).sec;
const prepLessons = (n) => Lv.secLessons(prepSec(n)).filter((l) => !l.check);
async function prepLoad(n) { for (const l of ET_C2I.lessons.filter((x) => x.n <= n)) try { await c2Load(l.n); } catch (e) {} await trReady(); }
const prepPool = (n) => { const ls = prepLessons(n); return c2Sentences(ls[0].n, ls[ls.length - 1].n); };
const prepTasks = (n) => prepLessons(n).flatMap((l) => ((window.ET_C2 || {})[l.n] || {}).tasks || []).map((t) => ({ rq: t.why, ...t }));
const prepState = (n) => { const S = Store.get(); S.prep = S.prep || {}; return (S.prep[n] = S.prep[n] || {}); };
// пробная: 15 заданий уроков раздела + 2×«Закончи фразу», 2×«Ответь по тексту», 2×«Составь по смыслу», 1×«Переведи текст» (5 фраз)
function prepPractice(n) {
  const r = Math.random, pool = prepShuffle(prepPool(n), r), out = prepShuffle(prepTasks(n), r).slice(0, 15);
  const fin = pool.map((x) => prepGenFinish(x, r)).filter(Boolean).slice(0, 2); out.push(...fin);
  for (let k = 0; k < 2 && pool.length >= 3 * (k + 1); k++) { const x = prepGenRead(pool.slice(3 * k, 3 * k + 3)); if (x) out.push(x); }
  pool.slice(6, 8).forEach((x) => out.push(prepGenSense(x, pool, r)));
  const tr = pool.slice(8, 13); if (tr.length === 5) out.push({ k: "trtext", dir: r() < 0.5 ? "ru" : "et", parts: tr, why: "переводи по смыслу, засчитывается каждое предложение" });
  return out;
}
// где ошибался в уроках раздела: задания уроков, где первый ответ был неверным
function prepMistakes(n) {
  const S = Store.get(), out = [];
  for (const l of prepLessons(n)) { const L = (window.ET_C2 || {})[l.n], rec = (S.c2ans || {})[l.n]; if (!L || !rec) continue;
    for (const [k, tries] of Object.entries(rec.a.tasks || {})) { const t = (L.tasks || [])[+k]; if (!t || !tries.length) continue;
      if (tries.length > 1 || !AltT.judge(t, tries[0]).ok) out.push({ rq: t.why, ...t, from: l.n }); } }
  return out;
}
// готовность: 40 % — звёзды уроков раздела, 20 % — разминка, 40 % — пробная
function prepReady(n) {
  const S = Store.get(), P = prepState(n), ls = prepLessons(n);
  const stars = ls.reduce((a, l) => a + ((S.lessons[l.n] || {}).stars || 0), 0) / (ls.length * 3);
  const pct = Math.round(40 * stars + 0.2 * (P.warm || 0) + 0.4 * (P.prac || 0));
  const miss = {}; for (const m of prepMistakes(n)) miss[m.from] = (miss[m.from] || 0) + 1;
  const weak = ls.map((l) => ({ l, s: (S.lessons[l.n] || {}).stars || 0, m: miss[l.n] || 0 })).filter((x) => x.s < 3 || x.m)
    .sort((a, b) => a.s - b.s || b.m - a.m).slice(0, 3);
  return { pct, stars: Math.round(stars * 100), warm: P.warm, prac: P.prac, weak };
}
// шпаргалка раздела: правило каждого урока + слова
function prepCheat(n) {
  const ls = prepLessons(n).map((l) => (window.ET_C2 || {})[l.n]).filter(Boolean);
  return `<div class="pcheat">${ls.map((L) => `<div class="pch"><b>${L.n}. ${esc(L.t)}</b>${altRich(L.rule || L.sut || "")}${(L.words || []).length ? `<div class="pchw">${L.words.map(([w, m]) => `<span class="et">${esc(w)}</span> — ${esc(m)}`).join(" · ")}</div>` : ""}</div>`).join("")}</div>`;
}
// блок «Подготовка» на странице правил контрольной
function prepBlock(n) {
  const R = prepReady(n), P = prepState(n), sec = prepSec(n), col = R.pct >= 75 ? "ok" : R.pct >= 45 ? "mid" : "low";
  return `<div class="card prepc"><div class="row" style="flex-wrap:wrap;gap:14px"><div class="prring ${col}" style="--p:${R.pct}"><b>${R.pct}%</b><small>готовность</small></div>
    <div style="flex:1 1 260px;min-width:0"><h3 style="margin:0 0 4px">Подготовка к контрольной</h3>
      <div class="muted">Звёзды уроков раздела: ${R.stars}% · разминка: ${R.warm != null ? R.warm + "%" : "ещё не было"} · пробная: ${R.prac != null ? R.prac + "%" : "ещё не было"}</div>
      ${R.weak.length ? `<div class="prweak">Подтяни: ${R.weak.map((x) => `<a href="#/урок/${x.l.n}">урок ${x.l.n} «${esc(x.l.t)}»</a>${x.m ? ` <small class="muted">(ошибок: ${x.m})</small>` : ""}`).join(", ")}</div>` : `<div class="prweak">Все уроки раздела на три звезды — отлично!</div>`}</div></div>
    <div class="prbtns"><a class="btn" href="#/подготовка/${n}/разминка">Разминка · 10 заданий</a><a class="btn gold" href="#/подготовка/${n}/пробная">Пробная контрольная</a>
      ${(P.miss || []).length ? `<a class="btn" href="#/подготовка/${n}/ошибки">Работа над ошибками · ${P.miss.length}</a>` : ""}</div>
    <details class="prch"><summary>Шпаргалка раздела «${esc(ET_C2I.sections[sec])}»</summary>${prepCheat(n)}
      <div style="margin-top:10px">${Board.pinButton("sec-" + sec)}</div></details></div>`;
}
// закрепить шпаргалку раздела на доске (Board.pinButton ищет таблицу по id — даём свой обработчик)
document.addEventListener("click", (e) => { const b = e.target.closest && e.target.closest('[data-pin^="sec-"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation(); const k = +b.dataset.pin.slice(4), n = Lv.secLessons(k).find((l) => l.check).n;
  Board.pin("sec-" + k, "Шпаргалка раздела «" + ET_C2I.sections[k] + "»", prepCheat(n)); }, true);

// ---------------------------------------------------------------- страницы
function pagePrep(a) { return Board.wrap(`<div id="prep"><div class="card muted">Загружаю…</div></div>`); }
async function bindPrep(a) {
  const n = +a[0], mode = a[1], I = ET_C2I.lessons.find((l) => l.n === n);
  if (!I || !I.check) { $("#prep").innerHTML = `<div class="card soon nokeep"><h2>Здесь нет контрольной</h2><a class="btn gold" href="#/учиться">К урокам</a></div>`; return; }
  await prepLoad(n); Board.bind(); Board.setLesson({ title: I.t, pins: [], html: prepCheat(n), words: "", ex: "", err: "" }); Board.render();
  const head = (t, s) => `<div class="row c2crumbs"><a class="muted" href="#/урок/${n}">← К контрольной ${n}</a><span class="muted">Раздел ${I.sec + 1}: ${esc(ET_C2I.sections[I.sec])}</span></div>
    <div class="k">Подготовка · без последствий</div><h1 class="page">${t}</h1><p class="lead">${s}</p>`;
  if (mode === "пробная") return prepPracticePage(n, head);
  let items, title, lead;
  if (mode === "ошибки") { const miss = prepState(n).miss || [];
    const like = miss.map((m) => prepShuffle(prepTasks(n).filter((t) => t.k === m.k && t.q !== m.q), Math.random)[0]).filter(Boolean);
    items = [...miss.map((t) => ({ rq: t.why, ...t })), ...like]; title = "Работа над ошибками";
    lead = `Задания, на которых ты ошибся в контрольной (${miss.length}), и похожие из уроков. Есть подсказки и вторая попытка.`; }
  else { const mis = prepShuffle(prepMistakes(n), Math.random), rest = prepShuffle(prepTasks(n), Math.random).filter((t) => !mis.some((m) => m.q === t.q));
    const gen = prepShuffle(prepPool(n), Math.random), extra = [prepGenFinish(gen[0] || ["", ""], Math.random), gen.length >= 4 ? prepGenRead(gen.slice(1, 4)) : null].filter(Boolean);
    items = [...mis.slice(0, 6), ...extra, ...rest].slice(0, 10); title = "Разминка раздела";
    lead = "10 заданий: сначала те, где ты ошибался в уроках, и новые виды заданий из контрольной. Есть подсказки «?» и вторая попытка."; }
  if (!items.length) { $("#prep").innerHTML = head(title, "Здесь пока пусто — ошибок нет!") ; return; }
  $("#prep").innerHTML = head(title, lead) + `<div class="c2prog"><i id="prbar"></i></div><div class="alt-qs" id="prq"></div><div id="prend"></div>`;
  let done = 0, first = 0;
  AltT.mount($("#prq"), items, { onAnswer: (it, f, ok, frac) => { done++; first += it.k === "trtext" ? (f ? frac : 0) : f && ok ? 1 : 0;
    $("#prbar").style.width = Math.round(done / items.length * 100) + "%"; if (done < items.length) return;
    const pct = Math.round(first / items.length * 100), P = prepState(n);
    if (mode === "ошибки") P.miss = []; else P.warm = Math.max(P.warm || 0, pct);
    Store.save();
    $("#prend").innerHTML = `<div class="card c2res"><h2>${mode === "ошибки" ? "Ошибки разобраны ✓" : "Разминка закончена"}</h2><p>С первой попытки: <b>${Math.round(first)} из ${items.length}</b> (${pct}%).</p>
      <div class="row" style="justify-content:center;gap:10px;flex-wrap:wrap"><a class="btn gold" href="#/подготовка/${n}/пробная">Пробная контрольная ▶</a><a class="btn" href="#/урок/${n}">К контрольной</a></div></div>`; } });
}
function prepPracticePage(n, head) {
  const items = prepPractice(n), mins = items.reduce((a, t) => a + (t.k === "trtext" ? t.parts.length : 1), 0);
  $("#prep").innerHTML = head("Пробная контрольная", `${items.length} заданий в том же формате, что и настоящая, но задания другие. Одна попытка, после ответа — сразу разбор. На прогресс не влияет, паузы нет — проходи сколько хочешь.`)
    + `<div class="card"><label class="adtog" style="margin:0 0 12px"><input type="checkbox" id="prtimer" checked> Таймер: ${EX_SEC} секунд на задание, как на настоящей (примерно ${mins} мин)</label>
      <button class="btn gold" id="prgo">Начать пробную ▶</button></div><div id="prbox"></div>`;
  $("#prgo").onclick = () => {
    const timer = $("#prtimer").checked; $("#prgo").closest(".card").remove();
    let i = 0, score = 0, t = null;
    const step = () => {
      const it = items[i], box = $("#prbox"); if (!box) return;
      box.innerHTML = `<div class="card exbar"><div class="row"><b>Задание ${i + 1} из ${items.length}</b><span class="extime" id="prtime">${timer ? "" : "без таймера"}</span></div><div class="c2prog"><i style="width:${Math.round(i / items.length * 100)}%"></i></div></div>
        <div class="alt-qs" id="prq1"></div><div id="prnext"></div>`;
      const qEl = $("#prq1"), tEl = $("#prtime"); let sec = EX_SEC * (it.k === "trtext" ? it.parts.length : 1);
      AltT.mount(qEl, [it], { exam: true, base: i, onAnswer: (x, f, ok, frac) => { clearInterval(t); score += x.k === "trtext" ? (frac || 0) : ok ? 1 : 0;
        const last = i === items.length - 1; box.querySelector("#prnext").innerHTML = `<button class="btn gold">${last ? "Узнать результат ▶" : "Дальше ▶"}</button>`;
        box.querySelector("#prnext button").onclick = () => { if (last) end(); else { i++; step(); } }; } });
      if (timer) { const tick = () => { tEl.textContent = `⏱ ${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`; tEl.classList.toggle("hot", sec <= 10); };
        tick(); t = setInterval(() => { sec--; tick(); if (sec <= 0) { clearInterval(t); if (qEl._timeout) qEl._timeout(); } }, 1000); }
    };
    const end = () => { const pct = Math.round(score / items.length * 100), P = prepState(n); P.prac = Math.max(P.prac || 0, pct); Store.save();
      $("#prbox").innerHTML = `<div class="card c2res"><div class="bigstars">${pct >= Lv.PASS ? "✓" : "…"}</div><h2>${pct >= Lv.PASS ? "Ты готов к контрольной!" : "Пока не готов"}</h2>
        <p>Результат пробной: <b>${pct}%</b> (нужно ${Lv.PASS}%).</p><p class="muted">${pct >= Lv.PASS ? "На настоящей будут другие задания, но того же вида." : "Пройди разминку и уроки, где мало звёзд, — потом попробуй ещё раз."}</p>
        <div class="row" style="justify-content:center;gap:10px;flex-wrap:wrap">${pct >= Lv.PASS ? `<a class="btn gold" href="#/урок/${n}">К настоящей контрольной ▶</a>` : `<a class="btn gold" href="#/подготовка/${n}/разминка">Разминка ▶</a>`}
        <button class="btn" onclick="route()">↻ Ещё одна пробная</button></div></div>`; };
    step();
  };
}
