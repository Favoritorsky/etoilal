// Самоучитель французского (8.11.2026) — отдельный курс до B1, по тем же правилам, что самоучитель Etoilal (js/course2.js),
// но без сравнений с Etoilal (решение пользователя). Страницы: #/французский (= «Главная»/«Учиться» французской оболочки) и #/фр/N.
// Урок — слоёный пирог: ⚡ суть → таблица → 📖 простыми словами (📌 закрепить таблицу на доске) → 🔭 для любопытных → 🆕 слова и
// «Запомни» → ✍ задания (свои + 🎧 на слух, собираются из примеров урока) → 🔁 повторение слов прошлых уроков → итог.
// Доска шпаргалок — js/board.js (у французской оболочки свои закреплённые таблицы). Уроки открываются по порядку; раздел
// заканчивается контрольной (по одному заданию, 60 с на каждое, одна попытка, ≥ 80 % — уровень раздела, пересдача через час).
// Данные: data/french/index.js (FR_I), data/french/NN.js (FR_C[N]) — грузятся по требованию. Озвучка: data/fr-audio.js (FR_AUDIO).
// Прогресс: Store.get().fr[N] = {stars, best, times, date}, .frans[N] — ответы урока, .frExam[N] — время попытки, .frFirst[N] — первое прохождение.
// Разметка текста: «> фраза :: перевод — «чтение»» — пример с ▶; {{слово}} — французское с ▶; <s>буквы</s> — пишутся, но не читаются.
const FR = (() => {
  const PASS = 80, RETRY_MIN = 60, EX_SEC = 60, NO_COOLDOWN = new Set(["qub"]);
  const LV = [
    { w: "Lecteur", ru: "Читатель", ic: "📖" }, { w: "Débutant", ru: "Новичок", ic: "🌱" }, { w: "Voyageur", ru: "Путешественник", ic: "🧳" },
    { w: "Conteur", ru: "Рассказчик", ic: "🕰" }, { w: "Habitant", ru: "Местный", ic: "🏡" }, { w: "Francophone", ru: "Франкофон · B1", ic: "🗼" },
  ];
  const load = (n) => { window.FR_C = window.FR_C || {};
    if (FR_C[n]) return Promise.resolve(FR_C[n]);
    return new Promise((ok, bad) => { const s = document.createElement("script"); s.src = `data/french/${String(n).padStart(2, "0")}.js?v=202611080357`;
      s.onload = () => (FR_C[n] ? ok(FR_C[n]) : bad(new Error("нет урока"))); s.onerror = () => bad(new Error("нет файла урока")); document.head.appendChild(s); }); };
  const S0 = () => { const S = Store.get(); S.fr = S.fr || {}; return S; };
  const prog = () => S0().fr;
  const nick = () => { try { return Cloud.user() ? String(Cloud.user().nick || "").toLowerCase() : ""; } catch (e) { return ""; } };
  const lessons = () => FR_I.lessons, info = (n) => lessons().find((l) => l.n === +n);
  const done = (n) => !!((prog()[n] || {}).stars);
  const firstOpen = () => lessons().find((l) => !done(l.n)) || null;
  const isOpen = (n) => { const f = firstOpen(); return !f || n <= f.n || done(n); };
  const secPassed = (k) => { const L = lessons().filter((l) => l.sec === k), c = L.find((l) => l.check); return L.length && (c ? done(c.n) : L.every((l) => done(l.n))); };
  const level = () => { let k = 0; while (k < LV.length && secPassed(k)) k++; return k; };
  // дневной лимит новых уроков — как в Etoilal (levels.js): для Qub 2 новых урока французского в день, день с 7:30
  const DAY_LIMIT = { qub: 2 }, dayOf = (t) => { const d = new Date(+t - 7.5 * 3600000); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); };
  const dayLimit = () => DAY_LIMIT[nick()] || 0;
  const dayUsed = () => { const k = dayOf(Date.now()); return Object.entries(S0().frFirst || {}).filter(([n, t]) => dayOf(t) === k && !(info(n) || {}).check).length; };
  const dayBlocked = (n) => !!dayLimit() && !done(n) && !(info(n) || {}).check && dayUsed() >= dayLimit();
  const retryLeft = (n) => { if (NO_COOLDOWN.has(nick())) return 0; const t = (S0().frExam || {})[n]; if (!t) return 0;
    return Math.max(0, Math.ceil((Date.parse(t) + RETRY_MIN * 60000 - Date.now()) / 60000)); };

  // ---------------------------------------------------------------- разметка текста
  const fw = (w) => `<b class="fr say" data-say="${esc(w)}" title="Нажми, чтобы послушать">${esc(w)}</b>`;
  const exParse = (line) => { const m = line.match(/^>\s*(.+?)\s*::\s*(.+)$/); if (!m) return null; const [ru, ...rest] = m[2].split(" — "); return { fr: m[1], ru: ru.trim(), note: rest.join(" — ") }; };
  function rich(body, L, pinBtn) {
    const out = []; let buf = [];
    const flush = () => { if (buf.length) { out.push(`<div class="alt-exs">${buf.join("")}</div>`); buf = []; } };
    for (const line of String(body || "").split("\n")) {
      const e = exParse(line);
      if (e) { buf.push(`<div class="alt-ex">${playBtn(e.fr, 1)}<div><span class="fr">${esc(e.fr)}</span> <span class="alt-ru">— ${esc(e.ru)}</span>${e.note ? `<div class="rd">${esc(e.note)}</div>` : ""}</div></div>`); continue; }
      flush();
      const p = line.trim().match(/^@@pin:(\w+)@@$/);
      if (p) { const P = (L.pins || []).find((x) => x.id === p[1]);
        if (P) out.push(`<div class="card c2pin"><div class="row"><b>📌 ${esc(P.t)}</b>${pinBtn ? Board.pinButton(P.id) : ""}</div>${rich(P.html, L)}${pinBtn ? `<div class="muted c2pinhint">Это важная таблица — закрепи её на доске шпаргалок, чтобы не листать назад.</div>` : ""}</div>`); continue; }
      out.push(line.replace(/\{\{([^}]+)\}\}/g, (_, w) => fw(w))
        .replace(/<table class="tbl">/g, '<div class="tblw"><table class="tbl">').replace(/<\/table>/g, "</table></div>"));
    }
    flush();
    let html = out.join("\n");
    if (/<s>/.test(html) && !/frleg/.test(html)) html += `<div class="muted frleg">Подчёркнутые бледные буквы пишутся, но <b>не читаются</b>.</div>`;
    return html;
  }

  // ---------------------------------------------------------------- витрина и список уроков
  function page() {
    const L = lessons(), nd = L.filter((l) => done(l.n)).length, lv = level(), next = firstOpen() || L[L.length - 1], P = prog();
    const stars = L.reduce((a, l) => a + ((P[l.n] || {}).stars || 0), 0);
    return `<section class="frhero card"><div class="k">🇫🇷 Самоучитель французского · ${L.length} уроков · до уровня B1</div>
      <h1 class="page">Французский <i>по порядку</i></h1>
      <p class="lead">Для тех, кто начинает с нуля или немного знает: простыми словами, без терминов, с чтением русскими буквами и озвучкой. Каждый урок — как слоёный пирог: суть за 30 секунд, объяснение, «для любопытных», слова и задания. Каждый урок опирается только на пройденное.</p>
      <div class="learnhead"><div class="stats"><div class="st">📖 ${nd}<small>из ${L.length} уроков</small></div><div class="st">★ ${stars}<small>звёзд</small></div><div class="st">✦ ${Store.get().points}<small>очков</small></div></div>
      <a class="btn gold" href="#/фр/${next.n}">${nd ? "Продолжить" : "Начать"}: ${next.check ? "контрольная" : "урок"} ${next.n} ▶</a>${dayLimit() ? `<div class="muted dlim">Сегодня новых уроков: <b>${Math.min(dayUsed(), dayLimit())} из ${dayLimit()}</b> · новый день начинается в 7:30</div>` : ""}</div></section>
    <div class="card lvlad"><div class="row"><div><div class="k">Твой уровень</div><b class="lvnow">${lv ? `${LV[lv - 1].ic} <span class="fr">${LV[lv - 1].w}</span> · ${LV[lv - 1].ru}` : "пока без уровня — пройди раздел «Звуки и чтение»"}</b></div></div>
      <div class="lvsteps">${LV.map((x, k) => `<div class="lvs${k < lv ? " d" : k === lv ? " c" : ""}"><i>${k + 1}</i><b class="fr">${x.w}</b><small>${x.ru}</small></div>`).join("")}</div>
      <div class="muted">Уровень раздела даёт контрольная (нужно ≥ ${PASS} %). Уроки открываются строго по порядку.</div></div>
    ${FR_I.sections.map((sec, k) => `<div class="lsec"><h2><span class="gn">${k + 1}</span>${esc(sec)}<span class="lvtag${secPassed(k) ? " d" : ""}">${LV[k].ic} <span class="fr">${LV[k].w}</span></span></h2><div class="llist">
      ${L.filter((l) => l.sec === k).map((l) => { const st = (P[l.n] || {}).stars || 0, open = isOpen(l.n);
        return `<${open ? "a" : "div"} class="card lrow${l.n === next.n ? " cur" : ""}${l.check ? " chk" : ""}${open ? "" : " lockd"}"${open ? ` href="#/фр/${l.n}"` : ""}><span class="ln">${open ? (l.check ? "✓" : l.n) : "🔒"}</span>
          <span class="lt"><b>${esc(l.t)}</b><small>${l.check ? `контрольная · уровень ${esc(LV[l.sec].w)}` : esc(l.s)}</small></span>
          <span class="lst">${st ? "★".repeat(st) + "☆".repeat(3 - st) : l.n === next.n ? "▶" : ""}</span></${open ? "a" : "div"}>`; }).join("")}
    </div></div>`).join("")}
    <p class="muted">Озвучка синтезирована — возможны неточности.</p>`;
  }

  // ---------------------------------------------------------------- задания урока
  const sig = (t) => { const s = t.q + "|" + JSON.stringify(t.a) + "|" + (t.say || ""); let h = 5381; for (const c of s) h = ((h * 33) ^ c.charCodeAt(0)) >>> 0; return h.toString(36); };
  const mix = (base, add) => { const out = base.slice(); add.forEach((t, i) => out.splice(Math.min(out.length, Math.round((i + 1) * base.length / (add.length + 1)) + i), 0, t)); return out; };
  const fix = (t) => Object.assign({ rq: t.why }, t, { lang: t.lang || (t.opts ? "x" : "fr") });
  const wordsUpTo = (n, incl) => lessons().filter((l) => (incl ? l.n <= n : l.n < n)).flatMap((l) => (window.FR_C && FR_C[l.n] && FR_C[l.n].words) || []);
  const exOf = (L) => ["sut", "prosto"].flatMap((f) => String(L[f] || "").split("\n").map(exParse).filter(Boolean));
  function memItems(L) {
    const W = L.words || []; if (!W.length) return [];
    const pool = wordsUpTo(L.n, true);
    return W.map(([w, m, r], i) => {
      const others = AltT.shuffle(pool.filter((x) => x[0] !== w && x[1] !== m)).slice(0, 2), why = `${w} «${r}» — ${m}`;
      return i % 2 === 0
        ? { k: "choice", q: `Как будет «${m}»?`, opts: [w, ...others.map((x) => x[0])], a: w, lang: "x", why, rq: why }
        : { k: "choice", q: `Что значит ${w}?`, opts: [m, ...others.map((x) => x[1])], a: m, lang: "x", why, rq: why };
    });
  }
  // задания на слух — из примеров урока: выбрать перевод, собрать из плиток, написать услышанное (примерно треть всех заданий)
  function listenItems(L, I) {
    const ex = exOf(L).filter((e) => !/[«»…]/.test(e.fr)), all = lessons().filter((l) => l.n <= L.n).flatMap((l) => (window.FR_C && FR_C[l.n] ? exOf(FR_C[l.n]) : []));
    const n = Math.max(2, Math.round((L.tasks || []).length / 2.5)), out = [], kinds = ["pick", "tiles", "dict"];
    AltT.shuffle(ex).slice(0, n).forEach((e, i) => {
      const k = kinds[i % 3], why = `«${e.fr}» — ${e.ru}`;
      if (k === "pick") { const opts = [e.ru, ...AltT.shuffle([...new Set(all.map((x) => x.ru))].filter((x) => x !== e.ru)).slice(0, 2)];
        out.push({ k: "listen", lsn: "pick", sec: I.sec, say: e.fr, q: "Послушай и выбери перевод", opts, a: e.ru, lang: "x", why, rq: why }); }
      else if (k === "tiles" && e.fr.split(" ").length >= 2) { const words = e.fr.replace(/\s*[.!?]+$/, "").replace(/,/g, "");
        const d = AltT.shuffle([...new Set(all.flatMap((x) => x.fr.replace(/[.!?,]/g, "").split(" ")))].filter((w) => w && !words.split(" ").includes(w))).slice(0, 2);
        out.push({ k: "tiles", lsn: "tiles", sec: I.sec, say: e.fr, q: "Послушай и собери фразу", a: words, d, lang: "fr", why, rq: why }); }
      else out.push({ k: "input", lsn: "dict", sec: I.sec, say: e.fr, q: "Послушай и напиши, что услышал", a: [e.fr], lang: "fr", why, rq: why, hint: e.note || why });
    });
    return out;
  }
  // повторение: слова уроков n-1, n-3, n-7, n-15 — 4 задания, одно — написать слово, одно — на слух
  function reviewItems(n) {
    const back = [1, 3, 7, 15].map((d) => n - d).filter((x) => x >= 1);
    const cand = back.flatMap((k) => ((window.FR_C && FR_C[k] && FR_C[k].words) || []).map((w) => [...w, k]));
    const pick = AltT.shuffle(cand).slice(0, 4), pool = wordsUpTo(n);
    return pick.map(([w, m, r, k], i) => {
      const others = AltT.shuffle(pool.filter((x) => x[0] !== w && x[1] !== m)).slice(0, 2), why = `${w} «${r}» — ${m} (урок ${k})`;
      if (i === 0) return { k: "input", lang: "fr", q: `Напиши по-французски: «${m}»`, a: [w], why, rq: why, hint: `читается «${r}»` };
      if (i === 1) return { k: "listen", say: w, q: "Что прозвучало?", opts: [w, ...others.map((x) => x[0])], a: w, lang: "x", why, rq: why };
      return i % 2 ? { k: "choice", q: `Что значит ${w}?`, opts: [m, ...others.map((x) => x[1])], a: m, lang: "x", why, rq: why }
        : { k: "choice", q: `Как будет «${m}»?`, opts: [w, ...others.map((x) => x[0])], a: w, lang: "x", why, rq: why };
    });
  }
  const loadPrev = (n) => Promise.all(lessons().filter((l) => l.n < n).map((l) => load(l.n).catch(() => null)));

  // ---------------------------------------------------------------- урок
  let CUR = null;
  function pageLesson(args) {
    const n = +args[0] || 1, I = info(n);
    if (!I) return `<div class="card soon"><h2>Такого урока нет</h2><a class="btn gold" href="#/французский">К урокам французского</a></div>`;
    if (!isOpen(n)) { const f = firstOpen();
      return `<div class="card soon nokeep"><div class="ic">🔒</div><h2>${I.check ? "Контрольная" : "Урок"} ${n} пока ${I.check ? "закрыта" : "закрыт"}</h2>
        <p class="muted">Уроки и контрольные открываются строго по порядку. Сначала пройди ${f.check ? "контрольную" : "урок"} ${f.n} «${esc(f.t)}».</p>
        <a class="btn gold" href="#/фр/${f.n}">К ${f.check ? "контрольной" : "уроку"} ${f.n} ▶</a></div>`; }
    if (dayBlocked(n)) return `<div class="card soon nokeep"><div class="ic">🌙</div><h2>На сегодня уроков хватит</h2>
      <p class="muted">Ты прошёл ${dayUsed()} из ${dayLimit()} новых уроков французского за день. Урок ${n} откроется в 7:30 утра.<br>Лучше понемногу каждый день, чем рывками — так не перегоришь.</p>
      <p><a class="btn gold" href="#/французский">Повторить пройденное</a></p></div>`;
    return Board.wrap(`<div id="frl"><div class="card muted">Загружаю ${I.check ? "контрольную" : "урок"} ${n}…</div></div>`);
  }
  const pinOffer = (L, end) => { const P = (L.pins || []).filter((p) => !(Store.get().board || { cards: [] }).cards.some((c) => c.id === p.id)); if (!P.length) return "";
    return `<div class="card c2offer"><div><b>📌 ${end ? "Не забудь закрепить" : "В этом уроке важная таблица"}${P.length > 1 ? "ы" : ""}</b>
      <div class="muted">${end ? "Закреплённая таблица останется на доске шпаргалок во всех следующих уроках французского." : "Закрепи её на доске шпаргалок — она останется сбоку во всех следующих уроках, пока сам не уберёшь."}</div></div>
      <div class="c2offb">${P.map((p) => `<span class="c2offi"><span>${esc(p.t)}</span>${Board.pinButton(p.id)}</span>`).join("")}</div></div>`; };
  async function bindLesson(args) {
    const n = +args[0] || 1; if (!$("#frl")) return;
    const I = info(n); Board.bind();
    let L; try { L = await load(n); await loadPrev(n); } catch (e) { $("#frl").innerHTML = `<div class="card">Не удалось загрузить урок.</div>`; return; }
    ARate.sec = I.sec;
    // доска: правило, слова, примеры, частые ошибки
    const exL = exOf(L).slice(0, 5).map((e) => `> ${e.fr} :: ${e.ru}`).join("\n"), errM = String(L.prosto || "").match(/<h3>Частые ошибки<\/h3>([\s\S]*?)(?=<h3>|$)/);
    const wl = (W) => W.map(([w, m, r]) => `<div class="bw">${playBtn(w, 1)}<b class="fr">${esc(w)}</b> <span class="muted">«${esc(r)}» ${esc(m)}</span></div>`).join("");
    const bInfo = { title: L.t, pins: L.pins || [], html: `<div class="brule"><b class="btitle">${esc(L.t)}</b>${rich(L.rule || L.sut, L)}</div>`,
      words: (L.words || []).length ? wl(L.words) : "", ex: exL ? rich(exL, L) : "", err: errM ? rich(errM[1], L) : "" };
    Board.setLesson(bInfo); PageHook.onShow = () => { Board.setLesson(bInfo); Board.render(); };
    if (I.check) return examBind(n, L, I);
    const words = (L.words || []).length ? `<h2 class="c2h">🆕 Новые слова <small class="muted">${L.words.length}</small></h2>
      <div class="card c2words">${L.words.map(([w, m, r]) => `<div class="c2w">${playBtn(w, 1)}<div><b class="fr">${esc(w)}</b> <span class="muted">«${esc(r)}»</span><div>${esc(m)}</div></div></div>`).join("")}${C2_AUD_NOTE}
      <div class="muted" style="margin-top:8px">Нажми ▶ у каждого слова и повтори вслух. Потом — быстрая проверка, чтобы слова запомнились.</div></div>
      <h3 class="c2h3">🧠 Запомни</h3><div class="alt-qs" id="frmem"></div>` : "";
    const sec = FR_I.sections[I.sec];
    $("#frl").innerHTML = `<div class="row c2crumbs"><a class="muted" href="#/французский">← Все уроки</a><span class="muted">Раздел ${I.sec + 1}: ${esc(sec)} · урок ${n} из ${lessons().length}</span></div>
      <div class="k">🇫🇷 Урок ${n}${I.kind ? " · " + esc(I.kind) : ""}</div><h1 class="page">${esc(L.t)}</h1><p class="lead">${esc(L.s || "")}</p>
      <div class="c2prog"><i id="frbar"></i></div>
      ${L.sut ? `<div class="card c2sut"><div class="k">⚡ Суть за 30 секунд</div><div class="c2big">${rich(L.sut, L)}</div></div>` : ""}
      ${L.rule ? `<div class="card frrule">${rich(L.rule, L)}</div>` : ""}
      ${pinOffer(L)}
      ${L.prosto ? `<details class="card c2sec" open><summary>📖 Простыми словами</summary>${rich(L.prosto, L, true)}${C2_AUD_NOTE}</details>` : ""}
      ${L.lub ? `<details class="card c2sec"><summary>🔭 Для любопытных</summary>${rich(L.lub, L)}</details>` : ""}
      ${words}
      <h2 class="c2h">✍ Задания <small class="muted" id="frtn"></small></h2><div class="alt-qs" id="frtasks"></div>
      <h2 class="c2h" id="frrevh">🔁 Повторение слов прошлых уроков</h2><div class="alt-qs" id="frrev"></div><div id="frend"></div>`;
    Board.render();
    // ответы сохраняются вместе с прогрессом: frans[N] = { items: {mem, rev, lsn}, sigs, a: {mem, tasks, rev}, res }
    const S = S0(); S.frans = S.frans || {};
    const saved = S.frans[n] && S.frans[n].items ? S.frans[n] : null;
    const mem = saved ? saved.items.mem : memItems(L), rev = saved ? saved.items.rev : reviewItems(n), lsn = saved && saved.items.lsn ? saved.items.lsn : listenItems(L, I);
    const tasks = mix((L.tasks || []).map(fix), lsn);
    const rec = saved || { items: { mem, rev, lsn }, a: { mem: {}, tasks: {}, rev: {} } }; rec.items.lsn = lsn;
    const sigs = tasks.map(sig), was = rec.sigs || sigs, bySig = {};
    for (const [k, v] of Object.entries(rec.a.tasks)) if (was[k] && !bySig[was[k]]) bySig[was[k]] = v;
    rec.a.tasks = {}; sigs.forEach((sg, k) => { if (bySig[sg]) rec.a.tasks[k] = bySig[sg]; }); rec.sigs = sigs;
    const onTry = (g) => (k, v) => { (rec.a[g][k] = rec.a[g][k] || []).push(v); rec.at = new Date().toISOString(); S0().frans = S0().frans || {}; S0().frans[n] = rec; Store.save(); };
    $("#frtn").textContent = tasks.length;
    if (!rev.length) { $("#frrevh").remove(); $("#frrev").remove(); }
    const st = CUR = { n, L, rec, total: mem.length + tasks.length + rev.length, done: 0, first: 0, finished: false };
    window.__frCur = { mem, tasks, rev };                 // для тестов
    const each = (item, first, ok) => { st.done++; if (first && ok) st.first++; const b = $("#frbar"); if (b) b.style.width = Math.round(st.done / st.total * 100) + "%"; if (st.done >= st.total) finish(st); };
    if (mem.length) AltT.mount($("#frmem"), mem, { onAnswer: each, onTry: onTry("mem"), restore: rec.a.mem, bonus: true });
    AltT.mount($("#frtasks"), tasks, { onAnswer: each, onTry: onTry("tasks"), restore: rec.a.tasks, bonus: true });
    if (rev.length) AltT.mount($("#frrev"), rev, { onAnswer: each, onTry: onTry("rev"), restore: rec.a.rev, bonus: true });
    if (saved && st.done && !st.finished) toast("Продолжаешь с того места, где остановился ✦");
  }
  function again(n) { const S = S0(); if (S.frans) delete S.frans[n]; Store.save(); route(); window.scrollTo(0, 0); }
  function finish(st) {
    if (st.finished) return; st.finished = true;
    const { n, L, rec } = st, pct = Math.round(st.first / st.total * 100), stars = pct >= 90 ? 3 : pct >= 70 ? 2 : 1, P = prog(), old = P[n] || { stars: 0, best: 0, times: 0 };
    let pts = 0; const replay = !!rec.res;
    if (replay) pts = rec.res.pts;
    else { pts = old.times ? Math.max(0, stars - old.stars) * 5 + Math.ceil(st.first / 3) : st.first + stars * 5 + 10;
      if (!old.times) { const S = S0(); S.frFirst = S.frFirst || {}; S.frFirst[n] = Date.now(); }
      P[n] = { stars: Math.max(old.stars, stars), best: Math.max(old.best, pct), times: old.times + 1, date: new Date().toISOString().slice(0, 10) };
      rec.res = { pts }; S0().frans[n] = rec; Store.addPoints(pts); renderNav("учиться"); }
    const nx = info(n + 1);
    $("#frend").innerHTML = `<div class="card c2res"><div class="bigstars">${"★".repeat(stars)}${"☆".repeat(3 - stars)}</div>
      <h2>Урок ${n} пройден!</h2><p>С первой попытки: <b>${st.first} из ${st.total}</b> (${pct}%). ${pts ? `+${pts} очков ✦` : ""}</p>
      ${pinOffer(L, true)}
      ${stars < 3 ? `<p class="muted">Хочешь три звезды? Пройди урок ещё раз — засчитается лучший результат.</p>` : ""}
      <div class="row" style="justify-content:center;gap:10px;flex-wrap:wrap">${nx ? `<a class="btn gold" href="#/фр/${nx.n}">${nx.check ? "Контрольная" : "Урок " + nx.n}: ${esc(nx.t)} ▶</a>` : `<a class="btn gold" href="#/французский">Курс пройден! 🎓</a>`}
      <button class="btn" onclick="FR.again(${n})">↻ Пройти снова</button></div></div>`;
    if (!replay) $("#frend").scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // ---------------------------------------------------------------- контрольная раздела
  let EX = null;
  async function examBind(n, L, I) {
    // итоговая (последняя) контрольная — по всему курсу: по заданию из каждого урока последнего раздела + 8 случайных уроков раньше
    const last = !info(n + 1), all = lessons().filter((l) => !l.check);
    const secL = last ? all.filter((l) => l.sec === I.sec).concat(AltT.shuffle(all.filter((l) => l.sec < I.sec)).slice(0, 8)) : all.filter((l) => l.sec === I.sec);
    const best = prog()[n], left = retryLeft(n), lv = LV[I.sec], miss = ((S0().frMiss || {})[n] || []);
    await Promise.all(secL.map((l) => load(l.n).catch(() => null)));
    // задания: свои задания контрольной + по 1–2 задания каждого урока раздела + задания на слух (треть) — всё вперемешку
    const own = (L.tasks || []).map(fix), per = secL.length > 6 ? 1 : 2, fromL = secL.flatMap((l) => AltT.shuffle((FR_C[l.n] || {}).tasks || []).slice(0, per).map(fix));
    const src = { n, tasks: own.concat(fromL), prosto: secL.map((l) => (FR_C[l.n] || {}).prosto || "").join("\n") };
    const base = AltT.shuffle(own.concat(fromL)), items = mix(base, listenItems(src, I).slice(0, Math.round(base.length / 2)));
    Board.render();
    $("#frl").innerHTML = `<div class="row c2crumbs"><a class="muted" href="#/французский">← Все уроки</a><span class="muted">Раздел ${I.sec + 1}: ${esc(FR_I.sections[I.sec])}</span></div>
      <div class="k">🇫🇷 Контрольная · урок ${n}</div><h1 class="page">${esc(L.t)}</h1><p class="lead">${esc(L.s || "")}</p>
      ${L.rule ? `<div class="card frrule">${rich(L.rule, L)}</div>` : ""}
      <div class="card exrules"><div class="exlv"><span class="k">Сдашь — получишь уровень</span><b>${lv.ic} <span class="fr">${lv.w}</span> · ${lv.ru}</b></div>
        <ul><li><b>${items.length} заданий</b>, по одному. На каждое — <b>${EX_SEC} секунд</b>. Время вышло — задание не засчитано.</li>
        <li>Подсказок нет, ответ даётся <b>один раз</b>.</li>
        <li>Задания <b>🎧 на слух</b>: запись звучит сама, слушать можно сколько угодно раз${I.sec >= 2 ? ", скорость — 0.5x / 0.75x / 1x" : " (медленно, 0.5x)"}.</li>
        <li>Доска шпаргалок (твои закреплённые таблицы и записи) — можно.</li>
        <li>Нужно набрать <b>${PASS} %</b>. Не вышло — пересдать можно через час.</li></ul>
        ${best ? `<p class="note fixn">Контрольная сдана: ${best.best} %, ${"★".repeat(best.stars)}${"☆".repeat(3 - best.stars)}. Можно пересдать на лучший результат.</p>` : ""}
        ${left ? `<p class="note unk">Пересдача будет доступна через ${left} мин.</p>` : `<button class="btn gold" id="exgo">Начать контрольную ▶</button>`}
        <span class="muted"> · примерно ${Math.ceil(items.length * 0.6)}–${items.length} мин</span></div>
      ${miss.length ? `<div class="card prepc" id="frmissc"><b>🔁 Работа над ошибками</b><div class="muted">В прошлой попытке не получилось ${miss.length} заданий. Перереши их спокойно — с подсказками и разбором, без таймера. На результат контрольной не влияет.</div>
        <button class="btn sm" id="frmissgo">Перерешать ошибки (${miss.length})</button><div class="alt-qs" id="frmissq"></div></div>` : ""}<div id="exbox"></div>`;
    window.__frExam = items;                              // для тестов
    const mg = $("#frmissgo"); if (mg) mg.onclick = () => { mg.remove(); AltT.mount($("#frmissq"), miss, { onAnswer: () => {} }); };
    const go = $("#exgo"); if (go) go.onclick = () => { const mc = $("#frmissc"); if (mc) mc.remove();
      const S = S0(); S.frExam = S.frExam || {}; S.frExam[n] = new Date().toISOString(); Store.save();
      EX = { n, I, items, i: 0, score: 0, timer: null, miss: [] };
      $(".exrules").outerHTML = `<div class="card exbar"><div class="row"><b id="exnum"></b><span class="extime" id="extime"></span></div><div class="c2prog"><i id="exprog"></i></div></div>`;
      step(); };
  }
  function step() {
    const E = EX, it = E.items[E.i], box = $("#exbox"); if (!box) return;
    window.__frCur = { exam: it };
    $("#exnum").textContent = `Задание ${E.i + 1} из ${E.items.length}`; $("#exprog").style.width = Math.round(E.i / E.items.length * 100) + "%";
    box.innerHTML = `<div class="alt-qs" id="exq"></div><div id="exnext"></div>`;
    const tEl = $("#extime"), qEl = $("#exq"); let sec = EX_SEC;
    const tick = () => { tEl.textContent = `⏱ ${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`; tEl.classList.toggle("hot", sec <= 10); };
    const after = (item, first, ok) => { clearInterval(E.timer); if (ok) E.score++; else E.miss.push(item);
      const last = E.i === E.items.length - 1, nx = $("#exnext"); nx.innerHTML = `<button class="btn gold" id="exn">${last ? "Узнать результат ▶" : "Дальше ▶"}</button>`;
      nx.querySelector("#exn").onclick = () => { if (last) examEnd(); else { E.i++; step(); window.scrollTo(0, $("#exbox").offsetTop - 120); } }; };
    AltT.mount(qEl, [it], { exam: true, base: E.i, onAnswer: after });
    tick(); clearInterval(E.timer); E.timer = setInterval(() => { if (!qEl.isConnected) { clearInterval(E.timer); return; } sec--; tick(); if (sec <= 0) { clearInterval(E.timer); if (qEl._timeout) qEl._timeout(); } }, 1000);
    const inp = box.querySelector("input"); if (inp) inp.focus({ preventScroll: true });
    const pl = box.querySelector(".lsn-play"); if (pl) setTimeout(() => pl.isConnected && pl.click(), 350);
  }
  function examEnd() {
    const E = EX, n = E.n, pct = Math.round(E.score / E.items.length * 100), pass = pct >= PASS, before = level(), P = prog();
    let pts = 0;
    if (pass) { const stars = pct >= 95 ? 3 : pct >= 88 ? 2 : 1, old = P[n] || { stars: 0, best: 0, times: 0 };
      pts = old.times ? Math.max(0, stars - old.stars) * 5 : Math.round(E.score) + stars * 5 + 20;
      P[n] = { stars: Math.max(old.stars, stars), best: Math.max(old.best, pct), times: old.times + 1, date: new Date().toISOString().slice(0, 10) };
      if (pts) Store.addPoints(pts); else Store.save(); renderNav("учиться"); }
    const S = S0(); S.frMiss = S.frMiss || {}; S.frMiss[n] = JSON.parse(JSON.stringify(E.miss)).map((t) => { delete t.again; return t; });
    Store.save();
    const after = level(), up = after > before ? LV[after - 1] : null, nx = info(n + 1);
    $("#exbox").innerHTML = `<div class="card c2res"><div class="bigstars">${pass ? "✓" : "✗"}</div>
      <h2>${pass ? "Контрольная сдана!" : "Пока не сдана"}</h2><p>Результат: <b>${pct} %</b> (${E.score} из ${E.items.length}). Нужно ${PASS} %. ${pts ? `+${pts} очков ✦` : ""}</p>
      ${up ? `<div class="lvup"><small>Новый уровень</small><b>${up.ic} <span class="fr">${up.w}</span></b><span>${up.ru}</span></div>` : ""}
      ${E.miss.length ? `<details class="card"><summary>Ошибки (${E.miss.length})</summary><ul>${E.miss.map((t) => `<li>${esc(t.q || "")} — <b>${esc([].concat(t.a)[0])}</b>${t.why ? ` <span class="muted">(${esc(t.why)})</span>` : ""}</li>`).join("")}</ul></details>` : ""}
      ${pass ? "" : `<p class="muted">Повтори уроки раздела и попробуй снова через час.</p>`}
      <div class="row" style="justify-content:center;gap:10px">${pass && nx ? `<a class="btn gold" href="#/фр/${nx.n}">Урок ${nx.n}: ${esc(nx.t)} ▶</a>` : ""}<a class="btn" href="#/французский">Все уроки</a></div></div>`;
    $("#exprog").style.width = "100%";
  }

  // реклама на страницах Etoilal: «Etoilal — простой вход во французский»
  const banner = () => `<a class="card xban frban" href="#/французский"><span class="xic">🇫🇷</span><span><b>Etoilal — простой вход во французский</b><small>те же корни и звуки, только без немых букв и исключений · а ещё на сайте есть самоучитель французского</small></span><span class="lst">▶</span></a>`;
  const onPage = () => { try { return /^#\/(французский|фр)(\/|$)/.test(decodeURIComponent(location.hash)) || (typeof Shell !== "undefined" && Shell.fr()); } catch (e) { return false; } };
  return { page, pageLesson, bindLesson, banner, onPage, rich, again, load, done, isOpen, level, LV, info, exParse, listenItems, memItems };
})();
