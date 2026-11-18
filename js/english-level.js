// Тест на уровень по разделам английского курса (13.11.2026, просьба пользователя: «грамматику первого урока знаю почти идеально — скучно»).
// • #/уровень — обзор: 6 разделов, у каждого свой короткий тест (по 2 задания из каждого урока раздела: выбор + перевод/исправление,
//   без заданий на слух; режим контрольной — без второй попытки, сразу разбор). Можно проходить по одному разделу.
// • ≥ 85 % — «знаю»: раздел засчитан (S.enSkip[k], как ручной пропуск), уроки следующего раздела открываются; дальше — проверка слов раздела.
//   50–84 % — «средне», < 50 % — «слабо»: раздел остаётся в курсе.
// • Проверка слов (#/уровень/слова/N): слово звучит → выбрать перевод из 3 или «Не знаю». Незнакомые слова — в S.enUnk,
//   и они «переезжают» в ещё не пройденные уроки разделов, которые не засчитаны (S.enExtra[N] = [[англ, рус, чтение, урок-источник]]),
//   поровну, по порядку. Там они идут в «Новые слова», «Запомни», доску, повторение и тренировки (EN.wordsOf).
// Результаты: S.enLv[k] = {pct, v: know|mid|weak, date, bad: [уроки с ошибками], words: {total, unk}, phr: {total, unk}, manual}.
// 18.11.2026 (просьба пользователя: «основу знаю, хочу во 2 раздел, но слова и фразы 1 раздела, которых не знаю, — пусть будут там»):
// • «Пропустить без теста» (manual: true) — раздел засчитан сразу, дальше проверка слов, потом проверка фраз (#/уровень/фразы/N).
// • Фразы — примеры уроков (строки «> англ :: рус» в sut/prosto). Незнакомые → S.enUnkP → S.enExtraP[N] (как слова).
// • Незнакомое переезжает в БЛИЖАЙШИЙ незасчитанный раздел (его непройденные уроки), а не размазывается по всему курсу.
const ENL = (() => {
  const KNOW = 85, MID = 50;
  const S0 = () => { const S = Store.get(); S.enLv = S.enLv || {}; S.enUnk = S.enUnk || []; S.enExtra = S.enExtra || {}; S.enSkip = S.enSkip || {};
    S.enUnkP = S.enUnkP || []; S.enExtraP = S.enExtraP || {}; return S; };
  const secs = () => EN_I.sections;
  const secLessons = (k) => EN.lessons().filter((l) => l.sec === k && !l.check);
  const VERD = { know: ["✅", "знаю", "раздел засчитан"], mid: ["🟡", "средне", "раздел остаётся — уроки закроют пробелы"], weak: ["🔴", "слабо", "раздел остаётся — с него и начнём"] };
  const loadSec = (k) => Promise.all(secLessons(k).map((l) => EN.load(l.n).catch(() => null)));
  const wordsSec = (k) => secLessons(k).flatMap((l) => ((EN_C[l.n] || {}).words || []).map((w) => [...w.slice(0, 3), l.n]));
  const fixT = (t) => Object.assign({ rq: t.why }, t, { lang: t.lang || (t.opts ? "x" : "en") });
  // фразы раздела: [англ, рус, пояснение, урок-источник]
  const phrasesSec = (k) => { const seen = new Set();
    return secLessons(k).flatMap((l) => { const L = EN_C[l.n] || {};
      return ["sut", "prosto"].flatMap((f) => String(L[f] || "").split("\n").map(EN.exParse).filter(Boolean))
        .filter((e) => !/[«»…]/.test(e.fr) && !seen.has(e.fr) && seen.add(e.fr)).map((e) => [e.fr, e.ru, e.note || "", l.n]); }); };

  // -------------------------------------------------------------- раскладка незнакомых слов и фраз по урокам ближайшего незасчитанного раздела
  function spread(unkKey, exKey) {
    const S = S0(), old = S[exKey], keep = {};
    for (const [n, W] of Object.entries(old)) if (EN.done(+n) && W.length) keep[n] = W;     // в пройденных уроках всё остаётся
    const kept = new Set(Object.values(keep).flat().map((x) => x[0]));
    const pool = S[unkKey].filter((x) => !kept.has(x[0])).sort((a, b) => a[3] - b[3]);
    const rest = EN.lessons().filter((l) => !l.check && !EN.skipped(l.sec) && !EN.done(l.n));
    const targets = rest.length ? rest.filter((l) => l.sec === rest[0].sec) : [];          // только ближайший раздел
    const out = Object.assign({}, keep);
    if (targets.length) pool.forEach((w, i) => { const n = targets[Math.floor(i * targets.length / pool.length)].n; (out[n] = out[n] || []).push(w); });   // поровну и по порядку
    S[exKey] = out; Store.save();
    return { moved: targets.length ? pool.length : 0, left: targets.length ? 0 : pool.length, lessons: [...new Set(Object.keys(out).filter((n) => !keep[n]).map(Number))] };
  }
  function redistribute() { const r = spread("enUnk", "enExtra"); spread("enUnkP", "enExtraP"); return r; }
  function setVerdict(k, v) {
    const S = S0(), notK = (x) => (EN.info(x[3]) || {}).sec !== k;
    if (v === "know") S.enSkip[k] = true;
    else { delete S.enSkip[k]; S.enUnk = S.enUnk.filter(notK); S.enUnkP = S.enUnkP.filter(notK); }   // раздел снова в курсе — его слова и фразы учатся в своих уроках
    Store.save(); redistribute();
  }
  // пропустить раздел без теста: засчитан сразу, дальше — проверка слов и фраз
  function skipSec(k) {
    if (!confirm(`Пропустить раздел ${k + 1} «${secs()[k]}» без теста?\n\nДальше будет быстрая проверка его слов и фраз: всё, чего не знаешь, переедет в уроки следующего раздела.`)) return;
    const S = S0(); S.enLv[k] = { pct: null, v: "know", manual: true, date: new Date().toISOString().slice(0, 10), bad: [], words: null, phr: null };
    setVerdict(k, "know"); location.hash = "#/уровень/слова/" + (k + 1);
  }
  window.__enlSkip = skipSec;

  // -------------------------------------------------------------- витрина на странице курса
  function banner() {
    const S = S0(), R = S.enLv, n = Object.keys(R).length;
    if (!n) return `<a class="card enlvb" href="#/уровень"><span class="enic">🎯</span><span><b>Тест на уровень</b><span class="muted">Знаешь часть грамматики? Проверь каждый раздел за 3–5 минут. Что знаешь — засчитается, а незнакомые слова оттуда переедут в уроки, которые тебе нужны.</span></span><span class="btn gold">Пройти ▶</span></a>`;
    const kn = secs().map((_, k) => k).filter((k) => EN.skipped(k)), ex = Object.values(S.enExtra).flat().length, exP = Object.values(S.enExtraP).flat().length;
    return `<a class="card enlvb sm" href="#/уровень"><span class="enic">🎯</span><span><b>Тест на уровень: проверено разделов ${n} из ${secs().length}</b><span class="muted">${kn.length ? `засчитаны: ${kn.map((k) => k + 1).join(", ")}` : "пока ни один раздел не засчитан"}${ex || exP ? ` · ♻ в уроки переехали ${ex} слов и ${exP} фраз` : ""}</span></span><span class="btn">Открыть</span></a>`;
  }

  // -------------------------------------------------------------- страницы
  function page(a) {
    if (a[0] === "слова" || a[0] === "фразы") return Board.wrap(`<div id="enlv"><div class="card muted">Загружаю ${a[0]}…</div></div>`);
    if (a[0]) return Board.wrap(`<div id="enlv"><div class="card muted">Собираю тест…</div></div>`);
    const S = S0(), R = S.enLv;
    const rows = secs().map((name, k) => { const r = R[k], L = secLessons(k), v = r && VERD[r.v];
      const wNeed = r && r.v === "know" && !r.words, pNeed = r && r.v === "know" && r.words && !r.phr;
      const res = r ? (r.manual ? `⏭ пропущен без теста` : `${v[0]} ${r.pct}% — ${v[1]}: ${v[2]}`) : "";
      return `<div class="card enlvr${r ? " " + r.v : ""}"><span class="gn">${k + 1}</span><span class="lt"><b>${esc(name)}</b><small>${L.map((l) => esc(l.t.split(":")[0])).join(" · ")}</small>
        ${r ? `<small class="enlvres">${res}${r.words ? ` · слова: знаешь ${r.words.total - r.words.unk} из ${r.words.total}` : ""}${r.phr ? ` · фразы: ${r.phr.total - r.phr.unk} из ${r.phr.total}` : ""}</small>` : ""}</span>
        <span class="enlvbtn">${wNeed ? `<a class="btn gold sm" href="#/уровень/слова/${k + 1}">Проверить слова ▶</a>` : ""}${pNeed ? `<a class="btn gold sm" href="#/уровень/фразы/${k + 1}">Проверить фразы ▶</a>` : ""}<a class="btn${r ? "" : " gold"} sm" href="#/уровень/${k + 1}">${r ? "Тест ещё раз" : "Проверить"}</a>${r && r.v === "know" ? "" : `<button class="btn sm" onclick="__enlSkip(${k})" title="Засчитать раздел без теста — незнакомые слова и фразы переедут в следующий раздел">⏭ Пропустить</button>`}</span></div>`; }).join("");
    const ex = Object.entries(S.enExtra).filter(([, W]) => W.length), exP = Object.entries(S.enExtraP).filter(([, W]) => W.length);
    return `<div class="row c2crumbs"><a class="muted" href="#/английский">← Все уроки</a></div>
      <div class="k">🇬🇧 Тест на уровень</div><h1 class="page">Что ты <i>уже знаешь</i></h1>
      <p class="lead">У каждого раздела курса — свой короткий тест: по два задания из каждого урока, 8–10 заданий, 3–5 минут. Вторых попыток нет, разбор — сразу.</p>
      <div class="card enlvhow"><div>✅ <b>${KNOW}% и выше</b> — раздел засчитан: уроки откроются со следующего раздела. Потом быстрая проверка слов раздела.</div>
        <div>🟡 <b>${MID}–${KNOW - 1}%</b> и 🔴 <b>ниже ${MID}%</b> — раздел остаётся: там есть что подтянуть.</div>
        <div>⏭ <b>Пропустить</b> — раздел засчитывается без теста, сразу к проверке его слов и фраз.</div>
        <div>♻ Слова и фразы, которых ты не знал в засчитанных разделах, <b>переезжают в уроки ближайшего раздела</b>, который остался.</div>
        <div class="muted">Не обязательно проверять всё за раз: по одному разделу — тоже нормально. Тест можно пересдать.</div></div>
      <div class="enlvl">${rows}</div>
      ${ex.length ? `<div class="card"><b>♻ Куда переехали слова</b><div class="enlvmv">${ex.map(([n, W]) => `<a href="#/ан/${n}"><b>урок ${EN.num(n)}</b> <span class="muted">+${W.length}: ${W.map((w) => esc(w[0])).join(", ")}</span></a>`).join("")}</div></div>` : ""}
      ${exP.length ? `<div class="card"><b>💬 Куда переехали фразы</b><div class="enlvmv">${exP.map(([n, W]) => `<a href="#/ан/${n}"><b>урок ${EN.num(n)}</b> <span class="muted">+${W.length}: ${W.map((w) => esc(w[0])).join(" · ")}</span></a>`).join("")}</div></div>` : ""}`;
  }

  async function bind(a) {
    if (!$("#enlv")) return; Board.bind();
    if (a[0] === "слова") return wordsBind(+a[1] - 1);
    if (a[0] === "фразы") return phrBind(+a[1] - 1);
    const k = +a[0] - 1; if (!(k >= 0 && k < secs().length)) { $("#enlv").innerHTML = `<div class="card">Такого раздела нет. <a href="#/уровень">К тесту</a></div>`; return; }
    await loadSec(k);
    const sh = AltT.shuffle, items = [];
    for (const l of secLessons(k)) { const T = ((EN_C[l.n] || {}).tasks || []).filter((t) => t.k !== "listen" && !t.say);
      const c = sh(T.filter((t) => t.k === "choice"))[0], w = sh(T.filter((t) => t.k === "input" || t.k === "fix"))[0];
      [c, w].filter(Boolean).forEach((t) => items.push(Object.assign(fixT(t), { lsnN: l.n }))); }
    const its = sh(items);
    $("#enlv").innerHTML = `<div class="row c2crumbs"><a class="muted" href="#/уровень">← Все разделы</a><span class="muted">раздел ${k + 1} из ${secs().length}</span></div>
      <div class="k">🎯 Тест на уровень · раздел ${k + 1}</div><h1 class="page">${esc(secs()[k])}</h1>
      <p class="lead">${its.length} заданий. Отвечай как знаешь — без подсказок и вторых попыток. Если не знаешь — напиши как думаешь, это тоже результат.</p>
      <div class="c2prog"><i id="enlvbar"></i></div><div class="alt-qs" id="enlvq"></div><div id="enlvend"></div>`;
    window.__enCur = { items: its };
    let done = 0, first = 0; const bad = new Set();
    AltT.mount($("#enlvq"), its, { exam: true, onAnswer: (it, f, ok) => { done++; if (f && ok) first++; else bad.add(it.lsnN);
      $("#enlvbar").style.width = Math.round(done / its.length * 100) + "%";
      if (done < its.length) return;
      const pct = Math.round(first / its.length * 100), v = pct >= KNOW ? "know" : pct >= MID ? "mid" : "weak", S = S0(), was = S.enLv[k];
      S.enLv[k] = { pct, v, date: new Date().toISOString().slice(0, 10), bad: [...bad], words: was && was.v === "know" && v === "know" ? was.words : null };
      setVerdict(k, v); showResult(k); } });
  }
  function showResult(k) {
    const r = S0().enLv[k], V = VERD[r.v], nx = k + 1 < secs().length ? k + 1 : null, prev = k > 0 ? S0().enLv[k - 1] : null;
    const badL = r.bad.map((n) => `<a href="#/ан/${n}">урок ${EN.num(n)} «${esc(EN.info(n).t.split(":")[0])}»</a>`).join(", ");
    const tired = r.v === "weak" && prev && prev.v !== "know";
    $("#enlvend").innerHTML = `<div class="card c2res"><div class="bigstars">${V[0]}</div><h2>${r.pct}% — ${V[1]}</h2>
      <p>${r.v === "know" ? `Раздел «${esc(secs()[k])}» <b>засчитан</b> — его уроки больше не стоят на пути.` : `Раздел «${esc(secs()[k])}» остаётся в курсе${r.v === "mid" ? ": основа есть, но есть и пробелы." : "."}`}</p>
      ${badL ? `<p class="muted">Ошибки были в темах: ${badL}.</p>` : ""}
      ${r.v === "know" ? `<p>Теперь — быстрая проверка <b>${wordsSec(k).length} слов</b> этого раздела: незнакомые переедут в уроки, которые тебе нужны.</p>` : ""}
      ${tired ? `<p class="muted">Дальше разделы сложнее. Если этот дался тяжело, можно остановиться здесь — уроки откроются как раз отсюда.</p>` : ""}
      <div class="row" style="justify-content:center;gap:10px;flex-wrap:wrap">
        ${r.v === "know" ? `<a class="btn gold" href="#/уровень/слова/${k + 1}">Проверить слова ▶</a>` : nx !== null && !tired ? `<a class="btn gold" href="#/уровень/${nx + 1}">Раздел ${nx + 1}: ${esc(secs()[nx])} ▶</a>` : `<a class="btn gold" href="#/английский">К урокам ▶</a>`}
        ${r.v !== "know" && nx !== null && tired ? `<a class="btn" href="#/уровень/${nx + 1}">Всё равно проверить раздел ${nx + 1}</a>` : ""}
        <a class="btn" href="#/уровень">Все разделы</a></div></div>`;
    $("#enlvend").scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // -------------------------------------------------------------- проверка слов / фраз раздела: перевод из 3 или «Не знаю»
  const KIND = {
    w: { name: "слова", one: "слово", rec: "words", unk: "enUnk", ex: "enExtra", ic: "📚", list: wordsSec,
         h: `Какие слова <i>знаешь</i>?`, all: () => [...new Set(EN.lessons().flatMap((l) => EN.wordsOf(l.n).map((w) => w[1])))] },
    p: { name: "фразы", one: "фразу", rec: "phr", unk: "enUnkP", ex: "enExtraP", ic: "💬", list: phrasesSec,
         h: `Какие фразы <i>понимаешь</i>?`, all: () => [...new Set(EN.lessons().flatMap((l) => phrasesSec(l.sec)).map((x) => x[1]))] },
  };
  const wordsBind = (k) => checkBind(k, "w"), phrBind = (k) => checkBind(k, "p");
  async function checkBind(k, kd) {
    if (!(k >= 0 && k < secs().length)) return;
    const K = KIND[kd]; await loadSec(k);
    if (kd === "p") await Promise.all(EN.lessons().filter((l) => !l.check && l.sec <= k + 1).map((l) => EN.load(l.n).catch(() => null)));
    const S = S0(), r = S.enLv[k];
    if (!r || r.v !== "know") { $("#enlv").innerHTML = `<div class="card soon"><h2>Сначала тест раздела</h2><p class="muted">Проверка — для разделов, которые засчитаны или пропущены.</p><a class="btn gold" href="#/уровень/${k + 1}">Пройти тест раздела ${k + 1}</a></div>`; return; }
    const W = AltT.shuffle(K.list(k)), allM = K.all();
    const unk = []; let i = 0, lock = false;
    $("#enlv").innerHTML = `<div class="row c2crumbs"><a class="muted" href="#/уровень">← Все разделы</a><span class="muted">раздел ${k + 1}: ${K.name}</span></div>
      <div class="k">🎯 Тест на уровень · ${K.name} раздела ${k + 1}</div><h1 class="page">${K.h}</h1>
      <p class="lead">${kd === "w" ? "Слово" : "Фраза"} звучит — выбери перевод. Не знаешь — жми «Не знаю», не угадывай: такие ${K.name} переедут в уроки следующего раздела и выучатся там. Клавиши 1–4.</p>
      <div class="c2prog"><i id="enlvbar"></i></div><div id="enlww"></div>`;
    window.__enLw = { W, unk, kind: kd };
    const show = () => {
      const box = $("#enlww"); if (!box) return;
      if (i >= W.length) return checkDone(k, kd, W, unk);
      const [w, m, rd] = W[i], opts = AltT.shuffle([m, ...AltT.shuffle(allM.filter((x) => x !== m)).slice(0, 2)]);
      $("#enlvbar").style.width = Math.round(i / W.length * 100) + "%";
      box.innerHTML = `<div class="card enlw"><div class="muted">${i + 1} из ${W.length}</div>
        <div class="enlww">${playBtn(w, 1)}<b class="fr">${esc(w)}</b></div>${kd === "w" ? `<div class="muted">«${esc(rd)}»</div>` : ""}
        <div class="enlwo">${opts.map((o, j) => `<button class="btn" data-o="${esc(o)}"><i>${j + 1}</i>${esc(o)}</button>`).join("")}<button class="btn enlwn" data-o=""><i>4</i>Не знаю</button></div>
        <div class="enlwf"></div></div>`;
      try { speak(w); } catch (e) {}
    };
    const pick = (b) => {
      if (lock || !b) return; lock = true;
      const [w, m, note] = W[i], ok = b.dataset.o === m, box = $("#enlww");
      box.querySelectorAll("[data-o]").forEach((x) => { x.disabled = true; if (x.dataset.o === m) x.classList.add("good"); });
      if (!ok) { b.classList.add("bad"); unk.push(W[i]); box.querySelector(".enlwf").innerHTML = `<b class="fr">${esc(w)}</b> — ${esc(m)}${kd === "p" && note ? ` <span class="muted">(${esc(note)})</span>` : ""}`; }
      setTimeout(() => { i++; lock = false; show(); }, ok ? 450 : kd === "p" ? 2200 : 1500);
    };
    $("#enlww").addEventListener("click", (e) => pick(e.target.closest("[data-o]")));
    const key = (e) => { if (!$("#enlww")) return document.removeEventListener("keydown", key);
      if (/^[1-4]$/.test(e.key) && !/INPUT|TEXTAREA/.test((document.activeElement || {}).tagName)) pick($("#enlww").querySelectorAll("[data-o]")[+e.key - 1]); };
    document.addEventListener("keydown", key);
    show();
  }
  function checkDone(k, kd, W, unk) {
    const K = KIND[kd], S = S0(); S[K.unk] = S[K.unk].filter((x) => (EN.info(x[3]) || {}).sec !== k).concat(unk);
    S.enLv[k][K.rec] = { total: W.length, unk: unk.length }; Store.save();
    const res = kd === "w" ? redistribute() : spread("enUnkP", "enExtraP"), nx = k + 1 < secs().length ? k + 1 : null;
    const mine = Object.entries(S0()[K.ex]).filter(([, X]) => X.some((x) => (EN.info(x[3]) || {}).sec === k)).map(([n]) => +n).sort((a, b) => a - b);
    const sep = kd === "w" ? ", " : "<br>";
    const next = kd === "w" ? `<a class="btn gold" href="#/уровень/фразы/${k + 1}">Дальше: фразы раздела ▶</a>`
      : nx !== null ? `<a class="btn gold" href="#/английский">К урокам ▶</a><a class="btn" href="#/уровень/${nx + 1}">Тест раздела ${nx + 1}</a>` : `<a class="btn gold" href="#/английский">К урокам ▶</a>`;
    $("#enlvbar").style.width = "100%";
    $("#enlww").innerHTML = `<div class="card c2res"><div class="bigstars">${K.ic}</div><h2>Знаешь ${W.length - unk.length} из ${W.length}</h2>
      ${unk.length ? `<p>Незнакомые:<br>${unk.map((x) => `<b class="fr">${esc(x[0])}</b> — ${esc(x[1])}`).join(sep)}</p>
        ${res.left ? `<p class="muted">Все остальные разделы засчитаны, так что урокам их передать некуда — повтори по списку выше.</p>` : `<p>♻ Они переехали в уроки: ${mine.map((n) => `<a href="#/ан/${n}">${EN.num(n)}</a>`).join(", ")} — там будут вместе с материалом урока, с озвучкой и заданиями.</p>`}`
      : `<p>Все ${K.name} раздела знакомы — отлично!</p>`}
      <div class="row" style="justify-content:center;gap:10px;flex-wrap:wrap">${next}<a class="btn" href="#/уровень">Все разделы</a></div></div>`;
  }
  return { page, bind, banner, redistribute, phrasesSec };
})();
