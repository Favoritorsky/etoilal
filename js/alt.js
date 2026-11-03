// «Альтернативное обучение» (#/альтернатива[/шпаргалка/<глава>|/текст/<N>|/загадка/<N>]) — для тех, кому удобнее увидеть
// весь язык сразу: шпаргалка по всей грамматике (с подробной фонетикой) → тексты с подсказками под каждым кусочком слова →
// загадки «выведи правило сам». Данные — data/alt.js (ET_ALT). Прогресс — Store.get().alt. Все функции — с префиксом alt.
const ALT_VERBS = [["chanter", "петь"], ["danser", "танцевать"], ["parler", "говорить"], ["dormer", "спать"], ["manjer", "есть (пищу)"], ["emer", "любить"],
  ["doner", "давать"], ["lizer", "читать"], ["viver", "жить"], ["vener", "приходить"], ["aler", "идти"], ["eser", "быть"], ["aver", "иметь"]];
const ALT_P = [["m", "я"], ["s", "ты"], ["t", "он, она"], ["n", "мы"], ["z", "вы"], ["l", "они"]];
const ALT_T = [["e", "сейчас"], ["i", "было (раз)"], ["a", "было (долго)"], ["re", "будет"], ["o", "вот-вот"], ["u", "только что"]];
const ALT_M = [["", "—"], ["ri", "бы"], ["se", "пусть"], ["pe", "наверное"]];
const altS = () => { const S = Store.get(); if (!S.alt) S.alt = { cheat: {}, texts: {}, puzzles: {} }; return S.alt; };
const altH = (...p) => "#/" + ["альтернатива", ...p].join("/");

// ---------------------------------------------------------------- разметка глав
function altWord(w) { return `<b class="et say alt-w" data-say="${esc(w)}" title="«${esc(rd(w))}» — нажми, чтобы послушать">${esc(w)}</b>`; }
function altEx(et, ru) {
  return `<div class="alt-ex">${playBtn(et, 1)}<div><span class="et">${esc(et)}</span> <span class="alt-ru">— ${esc(ru)}</span><div class="rd">«${esc(rd(et))}»</div></div></div>`;
}
function altRich(body) {
  const out = []; let buf = [];
  const flush = () => { if (buf.length) { out.push(`<div class="alt-exs">${buf.join("")}</div>`); buf = []; } };
  for (const line of body.split("\n")) {
    const m = line.match(/^>\s*(.+?)\s*::\s*(.+)$/);
    if (m) { buf.push(altEx(m[1], m[2])); continue; }
    flush();
    if (line.trim() === "@@sounds@@") out.push(altSounds());
    else if (line.trim() === "@@verb@@") out.push(altVerbBox());
    else if (line.trim() === "@@reader@@") out.push(`<div class="card alt-reader"><input class="in" id="altread" placeholder="Например: Le soley briyet" autocomplete="off" spellcheck="false">
      <div class="row" style="margin-top:10px;justify-content:flex-start"><button class="btn sm" id="altreadsay">▶ Прочитать вслух</button></div><div class="alt-big" id="altreadout"></div></div>`);
    else out.push(line.replace(/\[\[([^\]]+)\]\]/g, (_, w) => altWord(w)).replace(/<table class="tbl">/g, '<div class="tblw"><table class="tbl">').replace(/<\/table>/g, "</table></div>"));
  }
  flush();
  return out.join("\n");
}
function altSounds() {
  return `<div class="tblw"><table class="tbl alt-snd"><thead><tr><th>пишется</th><th>звук</th><th>как произносить</th><th>послушай</th></tr></thead><tbody>${ET_ALT.sounds.map(([l, s, n, ex]) =>
    `<tr><td class="et alt-l">${esc(l)}</td><td class="alt-s">${esc(s)}</td><td>${esc(n)}</td><td>${ex.split(" ").map((w) => `<span class="alt-sx">${altWord(w)}<small>${esc(rd(w))}</small></span>`).join("")}</td></tr>`).join("")}</tbody></table></div>`;
}
function altVerbBox() {
  const sel = (id, opts) => `<select class="in alt-sel" id="${id}">${opts.map(([v, t], i) => `<option value="${i}">${esc(t)}</option>`).join("")}</select>`;
  return `<div class="card alt-verb"><div class="alt-vgrid">
    <label>Глагол${sel("av-v", ALT_VERBS.map(([w, m]) => [w, w + " — " + m]))}</label>
    <label>Когда${sel("av-t", ALT_T)}</label><label>Наклонение${sel("av-m", ALT_M)}</label><label>Кто${sel("av-p", ALT_P)}</label></div>
    <div class="alt-vout" id="av-out"></div></div>`;
}
function altVerbRun() {
  const v = ALT_VERBS[+$("#av-v").value], t = ALT_T[+$("#av-t").value], m = ALT_M[+$("#av-m").value], p = ALT_P[+$("#av-p").value];
  const st = v[0].slice(0, -2), w = st + t[0] + m[0] + p[0];
  let ru = ""; try { const b = back(w); if (!b.unknown.length) ru = b.text.replace(/[.!?]$/, ""); } catch (e) {}
  $("#av-out").innerHTML = `<div class="alt-parts"><span class="mo-b">${st}<small>${esc(v[1])}</small></span>+<span class="mo-t">${t[0]}<small>${esc(t[1])}</small></span>` +
    (m[0] ? `+<span class="mo-m">${m[0]}<small>${esc(m[1])}</small></span>` : "") + `+<span class="mo-p">${p[0]}<small>${esc(p[1])}</small></span></div>
    <div class="row" style="justify-content:center;gap:12px"><span class="et alt-big">${w}</span>${playBtn(w)}</div><div class="rd" style="text-align:center">«${esc(rd(w))}»${ru ? " · по-русски примерно: " + esc(ru) : ""}</div>`;
}
function altBindRich() {
  if ($("#av-v")) { ["#av-v", "#av-t", "#av-m", "#av-p"].forEach((s) => $(s).addEventListener("change", altVerbRun)); altVerbRun(); }
  if ($("#altread")) {
    const run = () => { const t = $("#altread").value.trim(); $("#altreadout").textContent = t ? "«" + rd(t) + "»" : ""; };
    $("#altread").addEventListener("input", run); $("#altreadsay").onclick = () => { const t = $("#altread").value.trim(); if (t) speak(t); };
  }
}

// ---------------------------------------------------------------- главная раздела
function altPageHome() {
  const A = altS(), C = ET_ALT.cheat, T = ET_ALT.texts, P = ET_ALT.puzzles;
  const nC = C.filter((c) => A.cheat[c.id]).length, nT = T.filter((_, i) => A.texts[i + 1]).length, nP = P.filter((_, i) => A.puzzles[i + 1] !== undefined).length;
  const nextC = C.find((c) => !A.cheat[c.id]) || C[0], nextT = T.findIndex((_, i) => !A.texts[i + 1]) + 1 || 1, nextP = P.findIndex((_, i) => A.puzzles[i + 1] === undefined) + 1 || 1;
  const step = (n, ic, t, s, done, all, href, list) => `<div class="card alt-step"><div class="alt-sn">${n}</div><div style="flex:1;min-width:0"><b>${ic} ${t}</b><div class="muted">${s}</div>
    <div class="alt-bar"><i style="width:${Math.round(done / all * 100)}%"></i></div><small class="muted">${done} из ${all}</small>${list}</div>
    <a class="btn ${done < all ? "gold" : ""}" href="${href}">${done ? done < all ? "Дальше ▶" : "Повторить" : "Начать ▶"}</a></div>`;
  return `<div class="k">Альтернативное обучение</div><h1 class="page">Весь язык <i>сразу</i></h1>
  <p class="lead">Для тех, кому скучно идти маленькими шагами. Сначала — шпаргалка по всему языку (подробнее всего — про звуки), потом тексты, где под каждым кусочком слова подписано, что он значит, а потом загадки: правила находишь сам.</p>
  <div class="alt-steps">
  ${step(1, "📐", "Шпаргалка", "Весь язык: звуки, слова, глагол-конструктор, местоимения, числа", nC, C.length, altH("шпаргалка", nextC.id),
    `<div class="alt-mini">${C.map((c) => `<a href="${altH("шпаргалка", c.id)}" class="${A.cheat[c.id] ? "d" : ""}">${c.ic} ${esc(c.t)}</a>`).join("")}</div>`)}
  ${step(2, "📜", "Тексты с подсказками", "Подсказки постепенно исчезают: под всеми словами → только под новыми → без подсказок", nT, T.length, altH("текст", nextT),
    `<div class="alt-mini">${T.map((x, i) => `<a href="${altH("текст", i + 1)}" class="${A.texts[i + 1] ? "d" : ""}">${i + 1}. ${esc(x.t)}</a>`).join("")}</div>`)}
  ${step(3, "🧩", "Загадки", "Примеры с переводом — правило выводишь сам и сразу проверяешь", nP, P.length, altH("загадка", nextP),
    `<div class="alt-mini">${P.map((x, i) => `<a href="${altH("загадка", i + 1)}" class="${A.puzzles[i + 1] !== undefined ? "d" : ""}">${i + 1}. ${esc(x.t)}</a>`).join("")}</div>`)}
  </div>`;
}

// ---------------------------------------------------------------- шпаргалка
function altPageCheat(id) {
  const C = ET_ALT.cheat, k = Math.max(0, C.findIndex((c) => c.id === id)), c = C[k], A = altS();
  if (!A.cheat[c.id]) { A.cheat[c.id] = 1; Store.save(); }
  return `<div class="row alt-crumbs"><a class="muted" href="${altH()}">← Альтернативное обучение</a><span class="muted">Шпаргалка · ${k + 1} из ${C.length}</span></div>
  <div class="alt-cheat"><nav class="card alt-toc">${C.map((x, i) => `<a href="${altH("шпаргалка", x.id)}" class="${i === k ? "on" : ""}${A.cheat[x.id] ? " d" : ""}"><span>${x.ic}</span>${esc(x.t)}</a>`).join("")}</nav>
  <article class="card alt-body"><div class="k">Глава ${k + 1}</div><h1 class="page" style="margin-top:4px">${c.ic} ${esc(c.t)}</h1>${altRich(c.body)}
  <div class="row alt-nav">${k ? `<a class="btn" href="${altH("шпаргалка", C[k - 1].id)}">← ${esc(C[k - 1].t)}</a>` : "<span></span>"}
    ${k < C.length - 1 ? `<a class="btn gold" href="${altH("шпаргалка", C[k + 1].id)}">${esc(C[k + 1].t)} →</a>` : `<a class="btn gold" href="${altH("текст", 1)}">К текстам →</a>`}</div></article></div>`;
}

// ---------------------------------------------------------------- тексты
function altSplit(tok) { return tok.split("+").map((s) => s.split("-")); }   // «J'+es-e-m» → [["J'"], ["es","e","m"]]
const ALT_PERS = new Set(["я", "ты", "он", "она", "мы", "вы", "они"]);
function altMorphClass(parts, glosses, i) {
  if (parts.length === 1) return "";
  if (i === 0) return "mo-b";
  if (parts.length === 2) return glosses[1] === "много" ? "mo-z" : "mo-s";
  if (i === parts.length - 1 && ALT_PERS.has(glosses[i])) return "mo-p";
  return i === 1 ? "mo-t" : "mo-m";
}
function altSeenBefore(n) {                         // слова (в той же форме), встречавшиеся в текстах 1…n-1
  const seen = new Set();
  ET_ALT.texts.slice(0, n - 1).forEach((t) => t.lines.forEach((l) => l[2].split(" ").forEach((tok) => altSplit(tok).forEach((p) => seen.add(p.join("").toLowerCase())))));
  return seen;
}
let altHint = null;
function altPageText(n) {
  const T = ET_ALT.texts, x = T[n - 1]; if (!x) return altPageHome();
  const mode = altHint || x.hint, seen = altSeenBefore(n);
  const lines = x.lines.map(([et, ru, g, r], li) => {
    const gt = g.split(" "), rt = r.split(" ");
    const blocks = gt.map((tok, j) => {
      const gp = altSplit(tok), rp = altSplit(rt[j] || "");
      const isNew = gp.some((p) => !seen.has(p.join("").toLowerCase()));   // новое — слово в такой форме ещё не встречалось
      const show = mode === "all" || (mode === "new" && isNew);
      const top = gp.map((p, s) => p.map((m, i) => `<span class="${altMorphClass(p, rp[s] || [], i)}">${esc(m)}</span>`).join("")).join("");
      const bot = gp.map((p, s) => p.map((m, i) => `<span class="${altMorphClass(p, rp[s] || [], i)}">${esc(((rp[s] || [])[i] || "?").replace(/_/g, " "))}</span>`).join("<i>·</i>")).join("<i>+</i>");
      return `<span class="alt-blk${show ? "" : " hid"}${isNew && mode !== "all" ? " nw" : ""}"><span class="t">${top}</span><span class="g">${bot}</span></span>`;
    }).join("");
    const showRu = mode === "all";
    return `<div class="card alt-line"><div class="row" style="justify-content:flex-start;gap:10px;flex-wrap:nowrap">${playBtn(et)}<div style="min-width:0"><div class="et alt-sent">${esc(et)}</div><div class="rd">«${esc(rd(et))}»</div></div></div>
      <div class="alt-il">${blocks}</div>
      <div class="alt-tr${showRu ? "" : " hid"}" data-l="${li}"><span>${esc(ru)}</span><button class="btn sm">Показать перевод</button></div></div>`;
  }).join("");
  const done = altS().texts[n];
  return `<div class="row alt-crumbs"><a class="muted" href="${altH()}">← Альтернативное обучение</a><span class="muted">Текст ${n} из ${T.length}</span></div>
  <div class="k">Текст ${n} · ${esc(x.s)}</div><h1 class="page">${esc(x.t)}</h1>
  <p class="lead">${esc(x.note)}</p>
  <div class="row alt-tools"><div class="seg" id="althint">${[["all", "Подсказки под всеми"], ["new", "Только под новыми"], ["none", "Без подсказок"]].map(([m, t]) => `<button data-m="${m}" class="${m === mode ? "on" : ""}">${t}</button>`).join("")}</div>
    <button class="btn sm" id="altsayall">▶ Весь текст</button></div>
  <div class="alt-legend"><span class="mo-b">основа</span><span class="mo-t">время</span><span class="mo-m">бы / пусть / наверное</span><span class="mo-p">кто</span><span class="mo-z">много (z)</span><span class="mo-s">суффикс</span>
    <span class="muted">${mode === "all" ? "" : "Слово без подсказки — нажми на него."}</span></div>
  <div id="altlines">${lines}</div>
  <div class="row alt-nav">${n > 1 ? `<a class="btn" href="${altH("текст", n - 1)}">← Текст ${n - 1}</a>` : "<span></span>"}
    <button class="btn gold" id="altdone">${done ? "✓ Прочитано" : "Прочитал ✓"}</button>
    ${n < T.length ? `<a class="btn" href="${altH("текст", n + 1)}">Текст ${n + 1} →</a>` : `<a class="btn" href="${altH("загадка", 1)}">К загадкам →</a>`}</div>`;
}
function altBindText(n) {
  const x = ET_ALT.texts[n - 1]; if (!x) return;
  $("#althint").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; altHint = b.dataset.m; route(); });
  $("#altlines").addEventListener("click", (e) => {
    const bl = e.target.closest(".alt-blk"); if (bl) { bl.classList.toggle("hid"); return; }
    const tr = e.target.closest(".alt-tr button"); if (tr) tr.parentElement.classList.remove("hid");
  });
  $("#altsayall").onclick = () => altPlayAll(x.lines.map((l) => l[0]));
  $("#altdone").onclick = () => { const A = altS(); if (!A.texts[n]) { A.texts[n] = 1; Store.addPoints(5); toast("+5 очков ✦"); renderNav("альтернатива"); } else Store.save();
    location.hash = n < ET_ALT.texts.length ? altH("текст", n + 1) : altH("загадка", 1); };
}
window.addEventListener("hashchange", () => { altHint = null; if (altPlayAll.cur) altPlayAll.cur.pause(); });
function altPlayAll(list) {                            // весь текст: записи фраз одна за другой (без записи — голосом браузера)
  if (altPlayAll.cur) altPlayAll.cur.pause();
  const C = window.ET_AUDIO_C || {}, A = window.ET_AUDIO_A || {};
  const file = (t) => { const l = t.toLowerCase().trim(), s = l.replace(/[.!?]+$/, ""); return C[l] || C[s] || A[l] || A[s]; };
  const next = (i) => { if (i >= list.length) return; const f = file(list[i]);
    if (!f) { speak(list[i]); return; }
    const a = new Audio(f); altPlayAll.cur = a; a.onended = () => setTimeout(() => next(i + 1), 350); a.play().catch(() => {}); };
  next(0);
}

// ---------------------------------------------------------------- загадки
const altNorm = (s) => s.toLowerCase().replace(/ё/g, "е").replace(/[«».,!?;:"]/g, " ").replace(/\s+/g, " ").trim();
let altPZ = null;
function altPagePuzzle(n) {
  const P = ET_ALT.puzzles, x = P[n - 1]; if (!x) return altPageHome();
  altPZ = { n, st: x.q.map(() => ({ tries: 0, ok: false, shown: false })) };
  const ex = x.ex.map(([et, ru]) => { const w = et.split(" → ")[0];
    return `<div class="alt-ex">${playBtn(w, 1)}<div><span class="et">${esc(et)}</span> <span class="alt-ru">— ${esc(ru)}</span></div></div>`; }).join("");
  const qs = x.q.map(([q, ans, why, ch], i) => `<div class="card alt-q" data-i="${i}"><div class="alt-qt"><span class="alt-qn">${i + 1}</span>${esc(q)}</div>
    ${ch ? `<div class="alt-ch">${ch.map((c) => `<button class="btn" data-c="${esc(c)}">${esc(c)}</button>`).join("")}</div>`
      : `<div class="row alt-in"><input class="in" placeholder="Напиши на Etoilal…" autocomplete="off" spellcheck="false"><button class="btn gold" data-go>Проверить</button></div>`}
    <div class="alt-fb"></div></div>`).join("");
  return `<div class="row alt-crumbs"><a class="muted" href="${altH()}">← Альтернативное обучение</a><span class="muted">Загадка ${n} из ${P.length}</span></div>
  <div class="k">Загадка ${n} · ${esc(x.s)}</div><h1 class="page">${esc(x.t)}</h1>
  <p class="lead">Посмотри на примеры и найди закономерность. Правило не подсказываю — попробуй вывести сам, потом ответь на вопросы.</p>
  <div class="card"><div class="k" style="margin-bottom:8px">Примеры</div><div class="alt-exs">${ex}</div></div>
  <div class="alt-qs">${qs}</div>
  <div class="card alt-rule" id="altrule" hidden></div>
  <div class="row alt-nav">${n > 1 ? `<a class="btn" href="${altH("загадка", n - 1)}">← Загадка ${n - 1}</a>` : "<span></span>"}
    <button class="btn" id="altshowrule">Показать правило</button>
    ${n < P.length ? `<a class="btn" href="${altH("загадка", n + 1)}">Загадка ${n + 1} →</a>` : `<a class="btn" href="${altH()}">К разделу →</a>`}</div>`;
}
function altBindPuzzle(n) {
  const x = ET_ALT.puzzles[n - 1]; if (!x) return;
  const showRule = () => { const r = $("#altrule"); r.hidden = false; const st = altPZ.st, good = st.filter((s) => s.ok && s.tries === 1).length;
    r.innerHTML = `<div class="k">Правило</div><div style="font-size:17px;margin-top:6px">${esc(x.rule)}</div>` +
      (st.every((s) => s.ok || s.shown) ? `<div class="note fixn">С первой попытки: ${good} из ${st.length}</div>` : ""); };
  const finish = () => {
    if (!altPZ.st.every((s) => s.ok || s.shown)) return;
    const good = altPZ.st.filter((s) => s.ok && s.tries === 1).length, A = altS(), first = A.puzzles[n] === undefined;
    A.puzzles[n] = Math.max(A.puzzles[n] || 0, good);
    if (first && good) { Store.addPoints(good * 2); toast(`+${good * 2} очков ✦`); renderNav("альтернатива"); } else Store.save();
    showRule();
  };
  const check = (box, val) => {
    const i = +box.dataset.i, [, ans, why] = x.q[i], s = altPZ.st[i]; if (s.ok || s.shown) return;
    s.tries++; const ok = ans.some((a) => altNorm(a) === altNorm(val)), fb = box.querySelector(".alt-fb");
    if (ok) { s.ok = true; box.classList.add("ok"); fb.innerHTML = `<div class="note fixn">✓ Верно${ans[0] !== val ? ": <span class='et'>" + esc(ans[0]) + "</span>" : ""} — ${esc(why)}</div>`;
      box.querySelectorAll("button, input").forEach((b) => b.disabled = true); finish(); return; }
    box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake");
    fb.innerHTML = `<div class="note unk">Не совсем. ${s.tries >= 2 ? `Подсказка: ${esc(why)}.` : "Посмотри на примеры ещё раз."} <button class="btn sm" data-show>Показать ответ</button></div>`;
  };
  $(".alt-qs").addEventListener("click", (e) => {
    const box = e.target.closest(".alt-q"); if (!box) return;
    const c = e.target.closest("[data-c]"); if (c) { box.querySelectorAll("[data-c]").forEach((b) => b.classList.toggle("on", b === c)); check(box, c.dataset.c); return; }
    if (e.target.closest("[data-go]")) { check(box, box.querySelector("input").value); return; }
    if (e.target.closest("[data-show]")) { const i = +box.dataset.i, s = altPZ.st[i]; s.shown = true; box.classList.add("shown");
      box.querySelector(".alt-fb").innerHTML = `<div class="note">Ответ: <span class="et">${esc(x.q[i][1][0])}</span> ${playBtn(x.q[i][1][0], 1)} — ${esc(x.q[i][2])}</div>`;
      box.querySelectorAll("input, [data-c], [data-go]").forEach((b) => b.disabled = true); finish(); }
  });
  $(".alt-qs").addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.matches("input")) check(e.target.closest(".alt-q"), e.target.value); });
  $("#altshowrule").onclick = showRule;
}

// ---------------------------------------------------------------- маршрут
function altPage(a) {
  if (a[0] === "шпаргалка") return altPageCheat(a[1]);
  if (a[0] === "текст") return altPageText(+a[1] || 1);
  if (a[0] === "загадка") return altPagePuzzle(+a[1] || 1);
  return altPageHome();
}
async function altBind(a) {
  await trReady();                                     // чтение и обратный перевод нужны данные переводчика
  if (a[0] === "шпаргалка") { $("#app").innerHTML = altPageCheat(a[1]); altBindRich(); }
  else if (a[0] === "текст") { $("#app").innerHTML = altPageText(+a[1] || 1); altBindText(+a[1] || 1); }
  else if (a[0] === "загадка") { $("#app").innerHTML = altPagePuzzle(+a[1] || 1); altBindPuzzle(+a[1] || 1); }
}
