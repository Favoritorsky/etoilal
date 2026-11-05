// Задания «Альтернативного обучения»: один движок для заданий в главах, после текстов, в загадках и в «Практике».
// Задание — объект: { k: вид, q: вопрос, a: ответ(ы), why: короткое правило, hint: подсказка, more: подробное объяснение, ref: id главы, say: что озвучить }
//   k = "choice" (opts — варианты, a — верный), "input" (a — массив верных ответов; lang "et"/"ru"/"rd" — чтение русскими буквами),
//       "tiles" (собрать фразу из слов: a — фраза, d — лишние слова), "fix" (q — фраза с ошибкой; исправь), "listen" (послушай say и напиши / выбери).
//       5.11.2026: "read" (ответь по тексту: text — текст Etoilal, q — вопрос, opts/a), "finish" (закончи фразу: start, opts/a),
//       "sense" (составь по смыслу: q — ситуация по-русски, a — фраза, d — лишние слова; собирается плитками),
//       "trtext" (переведи текст: dir "ru" — с Etoilal на русский / "et" — на Etoilal, parts: [[etoilal, русский], …]; балл — доля верных предложений).
// opt.exam — режим контрольной: без «?» и подсказок, одна попытка; el._timeout() — время вышло (задание не засчитано).
// Ход: ошибка → подсказка и вторая попытка → подробный разбор (что не так по кусочкам, правило, ссылка на главу) и верный ответ.
// Ответ Etoilal принимается в любом верном виде: без «я/ты/он…» в начале, с eske и без; опечатка в одну букву — засчитывается, но показывается.
const AltT = (() => {
  const SUBJ = new Set(["je", "tu", "il", "el", "nou", "vou", "ilz", "elz", "on"]);
  const norm = (s) => String(s).toLowerCase().replace(/ё/g, "е").replace(/[’`]/g, "'").replace(/[«»"!?.,;:—–()]/g, " ").replace(/\s+/g, " ").trim();
  function variants(a) {                               // все верные виды ответа Etoilal
    const out = new Set([norm(a)]);
    for (const v of [...out]) { if (v.startsWith("esqe ")) out.add(v.slice(5)); }
    for (const v of [...out]) {
      const w = v.split(" ");
      if (SUBJ.has(w[0]) && w.length > 1) out.add(w.slice(1).join(" "));
      if (/^j'/.test(w[0])) out.add([w[0].slice(2), ...w.slice(1)].join(" "));
    }
    return [...out];
  }
  function lev(a, b) {
    const m = a.length, n = b.length, d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
    for (let j = 1; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  // сравнить ответ с верными: {ok, typo: [[было, надо]], best}
  function judge(item, val) {
    const answers = [].concat(item.a), lang = item.lang || (["choice", "read", "finish"].includes(item.k) ? "x" : "et");
    const pool = lang === "et" ? answers.flatMap(variants) : answers.map(norm);
    const v = norm(val);
    if (!v) return { ok: false, empty: true, best: answers[0] };
    if (pool.includes(v)) return { ok: true };
    if (lang === "x") return { ok: false, best: answers[0] };
    // опечатка: те же слова, в одном слове длиной ≥ 4 не больше одной буквы
    const vw = v.split(" ");
    for (const p of pool) {
      const pw = p.split(" "); if (pw.length !== vw.length) continue;
      const diff = pw.map((w, i) => [vw[i], w]).filter(([x, y]) => x !== y);
      // в Etoilal конец слова — это грамматика (кто делает, много), поэтому ошибка в последней букве — не опечатка
      const [x, y] = diff[0] || ["", ""], endDiff = x.slice(0, -1) === y.slice(0, -1) || x === y.slice(0, -1) || y === x.slice(0, -1);
      if (diff.length === 1 && y.length >= 4 && lev(x, y) === 1 && !(lang === "et" && (endDiff || isOtherForm(x, y))))
        return { ok: true, typo: diff };
    }
    let best = pool[0], bd = 1e9;
    for (const p of pool) { const d = lev(v, p); if (d < bd) { bd = d; best = p; } }
    return { ok: false, best };
  }
  // «опечатка» не засчитывается, если это другая форма того же глагола (chantem вместо chantet — ошибка, а не опечатка)
  function isOtherForm(a, b) { const x = verbParts(a), y = verbParts(b); return !!(x && y); }
  const T_NAME = { e: "сейчас", i: "было (раз)", a: "было (долго)", re: "будет", o: "вот-вот", u: "только что" };
  const M_NAME = { ri: "бы", se: "пусть", pe: "наверное" };
  const P_NAME = { m: "я", s: "ты", t: "он/она", n: "мы", z: "вы", l: "они" };
  function verbParts(w) {                               // форма глагола → {lemma, st, t, m, p} или null
    try {
      const info = wordInfo(w)[0]; if (!info || !info.lemma || !/er$/.test(info.lemma) || !info.form) return null;
      const st = info.lemma.slice(0, -2); if (!w.toLowerCase().startsWith(st)) return null;
      const m = w.toLowerCase().slice(st.length).match(/^(re|e|i|a|o|u|you|yo|ye)(ri|se|pe)?([mstnzl])$/); if (!m) return null;
      return { lemma: info.lemma, mean: info.mean, st, t: m[1].replace(/^you$/, "u").replace(/^yo$/, "o").replace(/^ye$/, "e"), m: m[2] || "", p: m[3] };
    } catch (e) { return null; }
  }
  // подробный разбор: что не так в ответе по сравнению с верным
  function explain(item, val, best) {
    const out = [];
    if ((item.lang || "et") === "et" && item.k !== "choice") {
      const uw = norm(val).split(" ").filter(Boolean), bw = norm(best).split(" ");
      // выравнивание слов (наибольшая общая подпоследовательность)
      const L = Array.from({ length: uw.length + 1 }, () => Array(bw.length + 1).fill(0));
      for (let i = uw.length - 1; i >= 0; i--) for (let j = bw.length - 1; j >= 0; j--) L[i][j] = uw[i] === bw[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
      const extra = [], miss = [], pairs = []; let i = 0, j = 0;
      while (i < uw.length || j < bw.length) {
        if (i < uw.length && j < bw.length && uw[i] === bw[j]) { i++; j++; continue; }
        if (i < uw.length && j < bw.length && L[i + 1][j + 1] >= Math.max(L[i + 1][j], L[i][j + 1])) { pairs.push([uw[i], bw[j]]); i++; j++; continue; }
        if (j < bw.length && (i >= uw.length || L[i][j + 1] >= L[i + 1][j])) { miss.push(bw[j]); j++; } else { extra.push(uw[i]); i++; }
      }
      for (const [u, b] of pairs) {
        const pu = verbParts(u), pb = verbParts(b);
        if (pu && pb && pu.lemma === pb.lemma) {
          const bits = [];
          bits.push(pu.t === pb.t ? `время верное (${T_NAME[pb.t]})` : `время: у тебя «${pu.t}» (${T_NAME[pu.t]}), нужно «${pb.t}» (${T_NAME[pb.t]})`);
          if (pu.m !== pb.m) bits.push(pb.m ? `нужен кусочек «${pb.m}» (${M_NAME[pb.m]})` + (pu.m ? `, а не «${pu.m}»` : "") : `кусочек «${pu.m}» (${M_NAME[pu.m]}) здесь не нужен`);
          bits.push(pu.p === pb.p ? `«кто» верно (${P_NAME[pb.p]})` : `«кто»: у тебя «${pu.p}» (${P_NAME[pu.p]}), нужно «${pb.p}» (${P_NAME[pb.p]})`);
          out.push(`<b class="et">${esc(u)}</b> → <b class="et">${esc(b)}</b>: глагол <span class="et">${esc(pb.lemma)}</span> верный; ${bits.join("; ")}.`);
        } else if (u.replace(/'/g, "") === b.replace(/'/g, "") || (b.includes("'") && !u.includes("'"))) {
          out.push(`<b class="et">${esc(u)}</b> → <b class="et">${esc(b)}</b>: нужно слияние с апострофом — короткое слово на -e перед гласной теряет e.`);
        } else if (u + "z" === b || b + "z" === u) {
          out.push(b.endsWith("z") ? `<b class="et">${esc(u)}</b> → <b class="et">${esc(b)}</b>: «много» — маленькое слово перед существительным получает z.` : `<b class="et">${esc(u)}</b> → <b class="et">${esc(b)}</b>: здесь один предмет — z не нужна.`);
        } else {
          const m = (wordInfo(b)[0] || {}).mean;
          out.push(`<b class="et">${esc(u)}</b> → <b class="et">${esc(b)}</b>${m ? ` («${esc(m.split(/[;,]/)[0])}»)` : ""}.`);
        }
      }
      if (miss.length) out.push(`Не хватает: ${miss.map((w) => `<b class="et">${esc(w)}</b>${(() => { const m = (wordInfo(w)[0] || {}).mean; return m ? ` («${esc(m.split(/[;,(]/)[0].trim())}»)` : ""; })()}`).join(", ")}.`);
      if (extra.length) out.push(`Лишнее: ${extra.map((w) => `<b class="et">${esc(w)}</b>`).join(", ")}.`);
      try {
        const seen = new Set();
        for (const x of Checker.check(val)) if (!x.soft && !/Большая буква/.test(x.title) && !seen.has(x.why)) { seen.add(x.why); out.push(`${esc(x.title)}: ${esc(x.why)}`); }
      } catch (e) {}
      if (/^(pa|jame|ryen)$/.test(uw[0]) || uw.some((w, k) => /^(pa|jame|ryen)$/.test(w) && k > 0 && !verbParts(uw[k - 1]))) out.push("Помни: <b>pa / jame / ryen</b> стоят сразу <b>после</b> глагола.");
    }
    return out;
  }

  // ---------------------------------------------------------------- «Переведи текст»
  // русский ответ сверяем мягко: доля основ слов образца (первые 5 букв), которые есть в ответе; образцов несколько
  // (свой перевод + обратный перевод сайта). Порядок слов и мелкие отличия не важны.
  const RU_SKIP = new Set(["и", "а", "в", "на", "с", "у", "к", "о", "это", "есть", "же", "ли"]);
  const ruStems = (s) => norm(s).replace(/[^а-яa-z\s-]/g, " ").split(/\s+/).filter((w) => w && !RU_SKIP.has(w)).map((w) => w.slice(0, 5));
  function ruMatch(val, refs) {
    const u = new Set(ruStems(val)); if (!u.size) return false;
    return refs.some((r) => { const st = ruStems(r); if (!st.length) return false;
      const hit = st.filter((x) => u.has(x)).length; return hit / st.length >= 0.75 && u.size <= st.length * 1.7 + 2; });
  }
  function judgeText(item, vals) {
    const res = item.parts.map(([et, ru], i) => {
      const v = String(vals[i] || "").trim(); if (!v) return false;
      if (item.dir === "ru") { let b = ""; try { b = typeof back === "function" ? String(back(et) || "") : ""; } catch (e) {}
        return ruMatch(v, [ru, b].filter(Boolean)); }
      if (judge({ a: [et], lang: "et" }, v).ok) return true;
      try { const hard = Checker.check(v).filter((x) => !x.soft && !/Большая буква/.test(x.title));
        return !hard.length && ruMatch(String(back(v) || ""), [ru]); } catch (e) { return false; }
    });
    return { res, frac: res.filter(Boolean).length / res.length };
  }

  // ---------------------------------------------------------------- отрисовка
  let SEQ = 0;
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function card(item, n, opt = {}) {
    const id = "t" + (++SEQ), lang = item.lang || "et";
    const head = { choice: "Выбери", input: lang === "ru" ? "Переведи на русский" : lang === "rd" ? "Напиши русскими буквами, как читается" : "Напиши на Etoilal", tiles: "Собери фразу", fix: "Найди и исправь ошибку", listen: "Послушай", read: "Ответь по тексту", finish: "Закончи фразу", sense: "Составь по смыслу",
      trtext: item.dir === "ru" ? "Переведи текст на русский" : "Переведи текст на Etoilal" }[item.k] || "";
    let body = "";
    const sayBtn = item.say ? `<button class="btn sm alt-say" data-say="${esc(item.say)}">▶ Послушать</button>` : "";
    if (item.k === "trtext") {
      body = `<div class="alt-tt">${item.parts.map(([et, ru], i) => `<div class="alt-ttr"><div class="alt-tts${item.dir === "ru" ? " et" : ""}">${i + 1}. ${esc(item.dir === "ru" ? et : ru)}</div>
        <input class="in${item.dir === "ru" ? "" : " et-in"}" data-tt="${i}" placeholder="${item.dir === "ru" ? "По-русски…" : "На Etoilal…"}" autocomplete="off" spellcheck="false"></div>`).join("")}</div>
        <div class="row alt-in" style="justify-content:flex-start"><button class="btn gold" data-go>Проверить весь текст</button></div>`;
    } else if (item.k === "choice" || item.k === "read" || item.k === "finish" || (item.k === "listen" && item.opts)) {
      body = `<div class="alt-ch">${shuffle(item.opts).map((o) => `<button class="btn${/[a-z]/.test(o) && !/[а-я]/i.test(o) ? " et" : ""}" data-c="${esc(o)}">${esc(o)}</button>`).join("")}</div>`;
    } else if (item.k === "tiles" || item.k === "sense") {
      const words = shuffle([...item.a.replace(/[.!?]$/, "").split(" "), ...(item.d || [])]);
      body = `<div class="alt-tl-out" data-out></div><div class="alt-tl">${words.map((w, i) => `<button class="btn et" data-tile="${i}">${esc(w)}</button>`).join("")}</div>
        <div class="row alt-in" style="justify-content:flex-start"><button class="btn sm" data-clear>Сбросить</button><button class="btn gold" data-go>Проверить</button></div>`;
    } else {
      const pre = item.k === "fix" ? item.q : "";
      body = `<div class="row alt-in"><input class="in${lang === "et" ? " et-in" : ""}" value="${esc(pre)}" placeholder="${lang === "ru" ? "По-русски…" : lang === "rd" ? "Русскими буквами…" : "На Etoilal…"}" autocomplete="off" spellcheck="false"><button class="btn gold" data-go>Проверить</button></div>`;
    }
    const q = item.k === "fix" ? `<span class="et">${esc(item.q)}</span>` : item.k === "listen" && !item.q ? "Что прозвучало?"
      : item.k === "finish" ? `<span class="et">${esc(item.start)} …</span>` : item.k === "trtext" ? esc(item.q || "Переведи каждое предложение. Засчитывается каждое верное.") : esc(item.q || "");
    const text = item.k === "read" ? `<div class="alt-text et">${esc(item.text)}</div>` : "";
    return `<div class="card alt-q alt-task" id="${id}" data-n="${n}"><div class="alt-qh">${head}${item.rq && !opt.exam ? `<button class="qbtn" data-rq title="Какое правило здесь нужно?">?</button>` : ""}</div>${text}<div class="alt-qt"><span class="alt-qn">${n + 1 + (opt.base || 0)}</span><span>${q}</span>${sayBtn}</div>${body}<div class="alt-fb"></div></div>`;
  }

  // set: { el, items, onAnswer(item, firstTry, ok), onDone(stats) }
  function mount(el, items, opt = {}) {
    el.innerHTML = items.map((it, n) => card(it, n, opt)).join("");
    const st = items.map(() => ({ tries: 0, done: false, ok: false }));
    const finish = () => { if (st.every((s) => s.done) && opt.onDone) opt.onDone({ first: st.filter((s) => s.ok && s.tries === 1).length, total: st.length, ok: st.filter((s) => s.ok).length }); };
    let replaying = false;
    const answer = (box, val) => {
      const n = +box.dataset.n, item = items[n], s = st[n]; if (s.done) return;
      const fb = box.querySelector(".alt-fb");
      if (item.k === "trtext") {                          // весь текст проверяется за один раз; балл — доля верных предложений
        if (!val.some((x) => String(x).trim())) { fb.innerHTML = `<div class="note">Сначала переведи хотя бы одно предложение 🙂</div>`; return; }
        s.tries++; if (opt.onTry && !replaying) opt.onTry(n, JSON.stringify(val));
        const r = judgeText(item, val); s.done = true; s.ok = r.frac === 1; s.frac = r.frac; lock(box);
        box.classList.add(r.frac === 1 ? "ok" : "shown");
        box.querySelectorAll("[data-tt]").forEach((inp, i) => inp.classList.add(r.res[i] ? "good" : "bad"));
        fb.innerHTML = `<div class="note ${r.frac === 1 ? "fixn" : "unk"}"><b>${r.res.filter(Boolean).length} из ${r.res.length} предложений верно.</b>
          <ol class="alt-tta">${item.parts.map(([et, ru], i) => `<li class="${r.res[i] ? "g" : "b"}">${r.res[i] ? "✓" : "✗"} ${item.dir === "ru" ? esc(ru) : `<span class="et">${esc(et)}</span> ${playBtn(et, 1)}`}</li>`).join("")}</ol>
          ${item.why ? `<div>${esc(item.why)}</div>` : ""}</div>`;
        if (opt.onAnswer) opt.onAnswer(item, s.tries === 1, s.ok, r.frac); finish(); return;
      }
      const r = judge(item, val);
      if (r.empty) { fb.innerHTML = `<div class="note">Сначала ответь 🙂</div>`; return; }
      s.tries++; if (opt.onTry && !replaying) opt.onTry(n, val);
      if (r.ok) {
        s.done = s.ok = true; box.classList.add("ok"); lock(box);
        const shown = [].concat(item.a)[0];
        fb.innerHTML = `<div class="note fixn">✓ Верно${r.typo ? ` — но опечатка: <b class="et">${esc(r.typo[0][0])}</b> → <b class="et">${esc(r.typo[0][1])}</b>` : ""}${norm(val) !== norm(shown) && item.k !== "choice" ? `. Вариант из ответа: <span class="et">${esc(shown)}</span>` : ""}${item.why ? ". " + esc(item.why) : ""}${(item.lang || "et") === "et" && /[a-z]/.test(shown) ? " " + playBtn(shown, 1) : ""}</div>`;
        if (opt.onAnswer) opt.onAnswer(item, s.tries === 1, true, 1); finish(); return;
      }
      if (!replaying) { box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake"); }
      if (s.tries === 1 && !opt.exam) {
        const hint = item.hint || item.why || "Посмотри ещё раз на правило главы.";
        fb.innerHTML = `<div class="note unk">Пока не так. Подсказка: ${esc(hint)}. Попробуй ещё раз.</div>`;
        if (item.k === "tiles") reset(box);
        return;
      }
      s.done = true; box.classList.add("shown"); lock(box);
      const ex = explain(item, val, r.best);
      const correct = [].concat(item.a)[0];
      fb.innerHTML = `<div class="note unk alt-why"><div><b>Разбор.</b> Верно: <b class="${(item.lang || "et") === "et" || item.k === "choice" ? "et" : ""}">${esc(correct)}</b> ${/[a-z]/.test(correct) && !/[а-я]/i.test(correct) ? playBtn(correct, 1) : ""}</div>
        ${ex.length ? `<ul>${ex.map((x) => `<li>${x}</li>`).join("")}</ul>` : ""}
        ${item.more ? `<div>${esc(item.more)}</div>` : item.why ? `<div>Правило: ${esc(item.why)}.</div>` : ""}
        ${item.ref ? `<div style="margin-top:6px"><a class="btn sm" href="#/альтернатива/шпаргалка/${item.ref}">📐 Открыть главу «${esc((ET_ALT.cheat.find((c) => c.id === item.ref) || {}).t || "")}»</a></div>` : ""}</div>`;
      if (opt.onAnswer) opt.onAnswer(item, false, false, 0); finish();
    };
    // время вышло (контрольная): все незаконченные задания — не засчитаны, показываем верный ответ
    el._timeout = () => el.querySelectorAll(".alt-task").forEach((box) => {
      const n = +box.dataset.n, item = items[n], s = st[n]; if (s.done) return;
      s.done = true; s.tries = s.tries || 1; box.classList.add("shown"); lock(box);
      const correct = item.k === "trtext" ? "" : [].concat(item.a)[0];
      box.querySelector(".alt-fb").innerHTML = `<div class="note unk">⏰ Время вышло — задание не засчитано.${correct ? ` Верно: <b class="${/[a-z]/.test(correct) && !/[а-я]/i.test(correct) ? "et" : ""}">${esc(correct)}</b>` : ""}</div>`;
      if (opt.onAnswer) opt.onAnswer(item, false, false, 0); finish();
    });
    const lock = (box) => box.querySelectorAll("input, [data-c], [data-go], [data-tile], [data-clear], [data-tt]").forEach((b) => b.disabled = true);
    const reset = (box) => { box.querySelector("[data-out]").innerHTML = ""; box.querySelectorAll("[data-tile]").forEach((b) => b.hidden = false); };
    el.addEventListener("click", (e) => {
      const box = e.target.closest(".alt-task"); if (!box) return;
      if (e.target.closest("[data-rq]")) { const old = box.querySelector(".alt-rqpop"); if (old) { old.remove(); return; }
        box.querySelector(".alt-qh").insertAdjacentHTML("afterend", `<div class="alt-rqpop">📌 ${esc(items[+box.dataset.n].rq)}<span class="muted"> · шпаргалка урока — на доске сбоку</span></div>`); return; }
      const c = e.target.closest("[data-c]"); if (c && !c.disabled) { box.querySelectorAll("[data-c]").forEach((b) => b.classList.toggle("on", b === c)); answer(box, c.dataset.c); return; }
      const t = e.target.closest("[data-tile]"); if (t && !t.disabled) { t.hidden = true; box.querySelector("[data-out]").insertAdjacentHTML("beforeend", `<button class="btn et" data-back="${t.dataset.tile}">${esc(t.textContent)}</button>`); return; }
      const bk = e.target.closest("[data-back]"); if (bk) { box.querySelector(`[data-tile="${bk.dataset.back}"]`).hidden = false; bk.remove(); return; }
      if (e.target.closest("[data-clear]")) { reset(box); return; }
      if (e.target.closest("[data-go]")) {
        const out = box.querySelector("[data-out]"), tt = box.querySelectorAll("[data-tt]");
        answer(box, tt.length ? [...tt].map((x) => x.value) : out ? [...out.children].map((b) => b.textContent).join(" ") : box.querySelector("input").value); }
    });
    el.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.matches(".alt-task input") && !e.target.dataset.tt) answer(e.target.closest(".alt-task"), e.target.value); });
    // сохранённые попытки (opt.restore: номер задания → [ответ, ответ…]) — повторяем, как будто ответили заново
    if (opt.restore) { replaying = true;
      for (const [k, vals] of Object.entries(opt.restore)) { const box = el.querySelector(`.alt-task[data-n="${k}"]`); if (!box) continue;
        for (const v of vals) { const it = items[+k];
          if (it.k === "trtext") { let a = []; try { a = JSON.parse(v); } catch (e) {} box.querySelectorAll("[data-tt]").forEach((x, i) => x.value = a[i] || ""); answer(box, a); continue; }
          if (it.opts) box.querySelectorAll("[data-c]").forEach((b) => b.classList.toggle("on", b.dataset.c === v));
          else { const inp = box.querySelector("input"); if (inp) inp.value = v; }
          answer(box, v); } }
      replaying = false; }
    return st;
  }
  return { mount, judge, judgeText, ruMatch, variants, verbParts, explain, norm, shuffle };
})();
