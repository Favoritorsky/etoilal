// Самоучитель французского (8.11.2026, пробные уроки; курс отдельный от Etoilal — без сравнений с ним): #/французский — витрина и список, #/фр/N — урок.
// Те же правила, что у самоучителя Etoilal: слоёный пирог (⚡ суть → 📖 простыми словами → 🔭 для любопытных → 🆕 слова и «Запомни» →
// ✍ задания → итог), язык без терминов, только пройденное. Главное отличие — в каждом уроке мостик «как в Etoilal → как во французском».
// Данные: data/french/index.js (FR_I), data/french/NN.js (FR_C[N]) — грузятся по требованию. Озвучка: data/fr-audio.js (FR_AUDIO,
// tools/build_french_audio.py); speak() берёт её первой на страницах французского. Прогресс: Store.get().fr[N] = {stars, best, times}.
// Разметка текста: «> фраза :: перевод» — пример с ▶; {{слово}} — французское с ▶; [[слово]] — слово Etoilal (как в уроках Etoilal).
const FR = (() => {
  const load = (n) => { window.FR_C = window.FR_C || {};
    if (FR_C[n]) return Promise.resolve(FR_C[n]);
    return new Promise((ok, bad) => { const s = document.createElement("script"); s.src = `data/french/${String(n).padStart(2, "0")}.js?v=202611080121`;
      s.onload = () => (FR_C[n] ? ok(FR_C[n]) : bad(new Error("нет урока"))); s.onerror = () => bad(new Error("нет файла урока")); document.head.appendChild(s); }); };
  const prog = () => { const S = Store.get(); S.fr = S.fr || {}; return S.fr; };
  const fw = (w) => `<b class="fr say" data-say="${esc(w)}" title="Нажми, чтобы послушать">${esc(w)}</b>`;
  function rich(body, L) {
    const out = []; let buf = [];
    const flush = () => { if (buf.length) { out.push(`<div class="alt-exs">${buf.join("")}</div>`); buf = []; } };
    for (const line of String(body || "").split("\n")) {
      const m = line.match(/^>\s*(.+?)\s*::\s*(.+)$/);
      if (m) { buf.push(`<div class="alt-ex">${playBtn(m[1], 1)}<div><span class="fr">${esc(m[1])}</span> <span class="alt-ru">— ${esc(m[2])}</span></div></div>`); continue; }
      flush();
      const p = line.trim().match(/^@@pin:(\w+)@@$/);
      if (p) { const P = (L.pins || []).find((x) => x.id === p[1]); if (P) out.push(`<div class="card c2pin"><div class="row"><b>📌 ${esc(P.t)}</b></div>${P.html}</div>`); continue; }
      out.push(line.replace(/\{\{([^}]+)\}\}/g, (_, w) => fw(w)).replace(/\[\[([^\]]+)\]\]/g, (_, w) => altWord(w))
        .replace(/<table class="tbl">/g, '<div class="tblw"><table class="tbl">').replace(/<\/table>/g, "</table></div>"));
    }
    flush(); return out.join("\n");
  }

  // ---------------------------------------------------------------- витрина и список уроков
  function page() {
    const P = prog(), L = FR_I.lessons, done = L.filter((l) => (P[l.n] || {}).stars).length;
    return `<section class="frhero card"><div class="k">🇫🇷 Новое · пробные уроки</div>
      <h1 class="page">Французский <i>по порядку</i></h1>
      <p class="lead">Самоучитель для тех, кто начинает с нуля или немного знает: простыми словами, без терминов, с чтением русскими буквами и озвучкой. Каждый урок — как слоёный пирог: суть за 30 секунд, объяснение, «для любопытных», слова и задания.</p>
      <div class="frsteps"><div><b>1</b><span>Суть и простое объяснение</span></div><div><b>2</b><span>Слова с озвучкой и «Запомни»</span></div><div><b>3</b><span>Задания: подсказка, вторая попытка, разбор</span></div></div>
      <div class="muted">Пройдено: ${done} из ${L.length} уроков · цель курса — уровень B1</div></section>
    ${FR_I.sections.map((sec, k) => `<div class="lsec"><h2><span class="gn">${k + 1}</span>${esc(sec)}</h2><div class="llist">
      ${L.filter((l) => l.sec === k).map((l) => { const st = (P[l.n] || {}).stars || 0;
        return `<a class="lrow card" href="#/фр/${l.n}"><span class="ln">${l.n}</span><span class="lt"><b>${esc(l.t)}</b><small>${esc(l.kind)} · ${esc(l.s)}</small></span><span class="lst">${st ? "★".repeat(st) + "☆".repeat(3 - st) : "▶"}</span></a>`; }).join("")}
    </div></div>`).join("")}
    <p class="muted">Это пробные уроки — по ним решаем, каким будет весь курс. Озвучка синтезирована — возможны неточности.</p>`;
  }

  // ---------------------------------------------------------------- урок
  let CUR = null;
  function pageLesson(args) {
    const n = +args[0] || 1, I = FR_I.lessons.find((l) => l.n === n);
    if (!I) return `<div class="card soon"><h2>Такого урока нет</h2><a class="btn gold" href="#/французский">К урокам французского</a></div>`;
    return `<div id="frl"><div class="card muted">Загружаю урок ${n}…</div></div>`;
  }
  function memItems(L) {
    const W = L.words || [];
    return AltT.shuffle(W).slice(0, 4).map(([w, m], i) => i % 2
      ? { k: "input", lang: "fr", q: `Как по-французски «${m}»?`, a: [w], why: `«${m}» — ${w}`, hint: `читается «${W.find((x) => x[0] === w)[2]}»` }
      : { k: "choice", lang: "x", q: `Что значит ${w}?`, opts: AltT.shuffle([m, ...AltT.shuffle(W.filter((x) => x[0] !== w)).slice(0, 2).map((x) => x[1])]), a: m, why: `${w} — «${m}»` });
  }
  const fix = (t) => Object.assign({}, t, { lang: t.lang || (t.opts ? "x" : "fr") });
  async function bindLesson(args) {
    const n = +args[0] || 1; if (!$("#frl")) return;
    let L; try { L = await load(n); } catch (e) { $("#frl").innerHTML = `<div class="card">Не удалось загрузить урок.</div>`; return; }
    const I = FR_I.lessons.find((l) => l.n === n);
    const words = (L.words || []).length ? `<h2 class="c2h">🆕 Новые слова <small class="muted">${L.words.length}</small></h2>
      <div class="card c2words">${L.words.map(([w, m, r, et]) => `<div class="c2w">${playBtn(w, 1)}<div><b class="fr">${esc(w)}</b> <span class="muted">«${esc(r)}»</span><div>${esc(m)}</div></div></div>`).join("")}${C2_AUD_NOTE}
      <div class="muted" style="margin-top:8px">Нажми ▶ у каждого слова и повтори вслух. Посмотри, какие буквы молчат.</div></div>
      <h3 class="c2h3">🧠 Запомни</h3><div class="alt-qs" id="frmem"></div>` : "";
    $("#frl").innerHTML = `<div class="row c2crumbs"><a class="muted" href="#/французский">← Французский</a><span class="muted">${esc(I.kind)} · урок ${n} из ${FR_I.lessons.length}</span></div>
      <div class="k">🇫🇷 Французский · урок ${n}</div><h1 class="page">${esc(L.t)}</h1><p class="lead">${esc(L.s || "")}</p>
      <div class="c2prog"><i id="frbar"></i></div>
      ${L.sut ? `<div class="card c2sut"><div class="k">⚡ Суть за 30 секунд</div><div class="c2big">${rich(L.sut, L)}</div></div>` : ""}
      ${L.rule ? `<div class="card frrule">${rich(L.rule, L)}</div>` : ""}
      ${L.prosto ? `<details class="card c2sec" open><summary>📖 Простыми словами</summary>${rich(L.prosto, L)}${C2_AUD_NOTE}</details>` : ""}
      ${L.lub ? `<details class="card c2sec"><summary>🔭 Для любопытных</summary>${rich(L.lub, L)}</details>` : ""}
      ${words}
      <h2 class="c2h">✍ Задания <small class="muted">${L.tasks.length}</small></h2><div class="alt-qs" id="frtasks"></div><div id="frend"></div>`;
    const mem = memItems(L), tasks = L.tasks.map(fix);
    const S2 = CUR = { n, total: mem.length + tasks.length, done: 0, first: 0, finished: false };
    const each = (item, first, ok) => { S2.done++; if (first && ok) S2.first++; $("#frbar").style.width = Math.round(S2.done / S2.total * 100) + "%"; if (S2.done >= S2.total) finish(S2); };
    if (mem.length) AltT.mount($("#frmem"), mem, { onAnswer: each });
    AltT.mount($("#frtasks"), tasks, { onAnswer: each });
  }
  function finish(st) {
    if (st.finished) return; st.finished = true;
    const pct = Math.round(st.first / st.total * 100), stars = pct >= 90 ? 3 : pct >= 70 ? 2 : 1, P = prog(), old = P[st.n] || { stars: 0, best: 0, times: 0 };
    const pts = old.times ? Math.max(0, stars - old.stars) * 5 : st.first + stars * 5 + 10;
    P[st.n] = { stars: Math.max(old.stars, stars), best: Math.max(old.best, pct), times: old.times + 1, date: new Date().toISOString().slice(0, 10) };
    if (pts) Store.addPoints(pts); else Store.save();
    const nx = FR_I.lessons.find((l) => l.n === st.n + 1);
    $("#frend").innerHTML = `<div class="card c2res"><div class="bigstars">${"★".repeat(stars)}${"☆".repeat(3 - stars)}</div>
      <h2>Урок ${st.n} пройден!</h2><p>С первой попытки: <b>${st.first} из ${st.total}</b> (${pct}%). ${pts ? `+${pts} очков ✦` : ""}</p>
      <div class="row" style="justify-content:center;gap:8px">${nx ? `<a class="btn gold" href="#/фр/${nx.n}">Урок ${nx.n} ▶</a>` : ""}<a class="btn" href="#/французский">Все уроки французского</a></div></div>`;
  }
  // реклама на страницах Etoilal: «Etoilal — простой вход во французский»
  const banner = () => `<a class="card xban frban" href="#/французский"><span class="xic">🇫🇷</span><span><b>Etoilal — простой вход во французский</b><small>те же корни и звуки, только без немых букв и исключений · а ещё на сайте есть самоучитель французского</small></span><span class="lst">▶</span></a>`;
  const onPage = () => { try { return /^#\/(французский|фр)(\/|$)/.test(decodeURIComponent(location.hash)); } catch (e) { return false; } };
  return { page, pageLesson, bindLesson, banner, onPage, rich };
})();
