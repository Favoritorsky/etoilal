// Самоучитель: список уроков (#/учиться) и урок (#/урок/N). Данные — data/course/NN.js (window.ET_LESSONS[N]), грузятся по требованию
// тегом <script> (работает и через file://). Урок: теория (слова ▶, примеры с подстрочником, диалог, «Почему так») → задания
// (выбор, «послушай», ввод с прощением опечаток, собери фразу, услышал — напиши, соедини пары) → итог: процент, звёзды, очки.
// Ошибочные задания один раз повторяются в конце; в зачёт идёт первая попытка.

// ---------------------------------------------------------------- загрузка и звук
function loadLesson(n) {
  window.ET_LESSONS = window.ET_LESSONS || {};
  if (ET_LESSONS[n]) return Promise.resolve(ET_LESSONS[n]);
  return new Promise((ok, bad) => {
    const s = document.createElement("script"); s.src = `data/course/${String(n).padStart(2, "0")}.js?v=202611102353`;
    s.onload = () => (ET_LESSONS[n] ? ok(ET_LESSONS[n]) : bad(new Error("нет урока")));
    s.onerror = () => bad(new Error("нет файла урока")); document.head.appendChild(s);
  });
}
let curAudio = null;
function playFile(src, text) {                    // запись, если есть; иначе — голос браузера
  if (curAudio) { curAudio.pause(); curAudio = null; }
  if (!src) { if (text) speak(text); return Promise.resolve(); }
  const a = new Audio(src); curAudio = a;
  return a.play().then(() => new Promise((r) => { a.onended = r; a.onerror = r; })).catch(() => { if (text) speak(text); });
}
const pbtn = (src, text, sm = 1) => `<button class="play${sm ? " sm" : ""}" data-src="${esc(src || "")}" data-say="${esc(text)}" title="Послушать">▶</button>`;

// ---------------------------------------------------------------- проверка ответа
const normA = (s) => String(s).toLowerCase().replace(/ё/g, "е").replace(/[’`]/g, "'").replace(/[.,!?;:«»"()…—–-]/g, " ").replace(/\s+/g, " ").trim();
function lev(a, b) {
  const m = a.length, n = b.length; if (Math.abs(m - n) > 3) return 9;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur.push(Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))); prev = cur; }
  return prev[n];
}
// → { ok, typo, right }: точное совпадение или опечатка (1 правка до 8 букв, 2 — длиннее); подлежащее-местоимение можно опустить
function checkAnswer(input, answers) {
  const x = normA(input); if (!x) return { ok: false, right: answers[0] };
  const list = answers.map(normA);
  if (list.includes(x)) return { ok: true, right: answers[0] };
  for (let k = 0; k < list.length; k++) {
    const lim = list[k].length > 8 ? 2 : 1;
    if (lev(x, list[k]) <= lim) return { ok: true, typo: true, right: answers[k] };
  }
  return { ok: false, right: answers[0] };
}

// ---------------------------------------------------------------- список уроков
function pageLearn() {
  const S = Store.get(), done = (n) => S.lessons[n] && S.lessons[n].stars > 0;
  const next = ET_TOC.find((l) => !done(l[0])) || ET_TOC[0];
  const total = ET_TOC.filter((l) => done(l[0])).length;
  const stars = Object.values(S.lessons).reduce((a, l) => a + (l.stars || 0), 0);
  return `<div class="k">Самоучитель</div><h1 class="page">Etoilal <i>с нуля</i></h1>
  <p class="lead">${ET_TOC.length} уроков: объяснение простыми словами, слова и фразы с озвучкой, диалоги Тео и Марка и задания. После каждого блока — контрольная.</p>
  <div class="learnhead card"><div class="stats"><div class="st">📖 ${total}<small>из ${ET_TOC.length} уроков</small></div><div class="st">★ ${stars}<small>звёзд</small></div><div class="st">✦ ${S.points}<small>очков</small></div></div>
    <a class="btn gold" href="#/урок/${next[0]}">${total ? "Продолжить" : "Начать"}: урок ${next[0]} ▶</a></div>
  <a class="card xban" href="#/экспресс${S.express && S.express < ET_EXPRESS.screens.length ? "/" + (S.express + 1) : ""}"><span class="xic">⚡</span><span><b>Экспресс-курс: минимум, чтобы заговорить</b>
    <small>10 экранов, 15 минут${S.express ? ` · пройдено ${Math.min(S.express, ET_EXPRESS.screens.length)} из ${ET_EXPRESS.screens.length}` : " — если хочется начать говорить прямо сегодня"}</small></span><span class="lst">▶</span></a>
  <a class="card xban" href="#/альтернатива"><span class="xic">🧠</span><span><b>Альтернативное обучение: весь язык сразу</b><small>шпаргалка по всему языку (подробно — звуки), тексты с подсказками под каждым кусочком слова, загадки</small></span><span class="lst">▶</span></a>
  <a class="card xban trban" href="#/тренировки"><span class="xic">🎯</span><span><b>Тренировки</b><small>набор из 15 заданий, «успей перевести», аудирование, произношение</small></span><span class="lst">▶</span></a>
  ${sections().map((sec, k) => `<div class="lsec"><h2><span class="gn">${k + 1}</span>${SECTION_NAMES[k] || "Раздел " + (k + 1)}</h2><div class="llist">
    ${sec.map((l) => { const st = (S.lessons[l[0]] || {}).stars || 0, chk = l[3];
      return `<a class="card lrow${l[0] === next[0] ? " cur" : ""}${chk ? " chk" : ""}" href="#/урок/${l[0]}"><span class="ln">${chk ? "✓" : l[0]}</span>
        <span class="lt"><b>${esc(l[1])}</b><small>${chk ? "контрольная" : l[2].length ? esc(l[2].slice(0, 5).join(", ")) : "практика"}</small></span>
        <span class="lst">${st ? "★".repeat(st) + "☆".repeat(3 - st) : l[0] === next[0] ? "▶" : ""}</span></a>`; }).join("")}</div></div>`).join("")}`;
}

// ---------------------------------------------------------------- урок: теория
let LS = null;                                    // состояние открытого урока
const rich = (children) => children.map((c) => {
  let t = esc(c.text).replace(/(^|[\s(«])\*([^*\n]+?)\*(?=[\s,.!?:;)»]|$)/g, "$1<i>$2</i>");
  if (c.bold) t = /[А-Яа-яЁё]/.test(c.text) ? `<b>${t}</b>` : `<b class="et say" data-say="${esc(c.text)}">${t}</b>`;
  return t;
}).join("");
function glossHtml(et, gl) {
  const a = et.split(/\s+/), b = (gl || "").split(/\s+/);
  if (!gl || a.length !== b.length) return gl ? `<div class="gl">${esc(gl.replace(/_/g, " "))}</div>` : "";
  return `<div class="ilin">${a.map((w, i) => `<span><b>${esc(w)}</b><i>${esc(b[i].replace(/_/g, " "))}</i></span>`).join("")}</div>`;
}
function blockHtml(b) {
  switch (b.type) {
    case "paragraph": return `<p>${rich(b.children)}</p>`;
    case "heading": return `<h3 class="lh${b.level > 2 ? " sub" : ""}">${rich(b.children)}</h3>`;
    case "table": {
      const [head, ...rows] = b.rows;
      return `<div class="tblw"><table class="tbl"><thead><tr>${head.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${rows.map((r, i) =>
        `<tr>${r.map((c, j) => { const s = b.say && b.say[i] && b.say[i][j]; const lat = c && !/[А-Яа-яЁё]/.test(c) && /[a-z]/i.test(c);
          return `<td>${lat ? `<span class="et">${esc(c)}</span>` : esc(c)}${s ? " " + pbtn(s, c) : ""}</td>`; }).join("")}</tr>`).join("")}</tbody></table></div>`;
    }
    case "words": return `<div class="lwords">${b.items.map((w) => `<div class="lw">${pbtn(w.src, w.et, 0)}<div><div class="et">${esc(w.et)}</div><div class="rd">«${esc(w.rd)}»</div><div>${esc(w.ru)}</div></div>
      <button class="star${Store.hasWord(w.et) ? " on" : ""}" data-my="${esc(w.et)}" title="В мои карточки">${Store.hasWord(w.et) ? "★" : "☆"}</button></div>`).join("")}</div>`;
    case "gloss": return `<div class="lex">${pbtn(b.src, b.et)}<div><div class="row1"><span class="et">${esc(b.et)}</span> <span class="ru">— ${esc(b.ru)}</span></div>${glossHtml(b.et, b.gloss)}</div></div>`;
    case "dialog": return `<div class="ldlg">${b.all ? `<button class="btn sm" data-all="${esc(b.all)}">▶ Весь диалог</button>` : ""}
      ${b.lines.map((l) => `<div class="dl ${l.who === "Тео" ? "t" : "m"}"><span class="who">${esc(l.who)}</span><div class="bub">${pbtn(l.src, l.et)}<div><div class="et">${esc(l.et)}</div><div class="ru">${esc(l.ru)}</div>${glossHtml(l.et, l.gl)}</div></div></div>`).join("")}</div>`;
    case "audio": return b.src ? `<button class="btn ltrack" data-src="${esc(b.src)}" data-say="">${b.song ? "🎵" : "▶"} ${esc(b.caption || "Послушать")}</button>` : "";
    default: return "";
  }
}
function theoryHtml(L) {
  const secs = []; let cur = { title: "", blocks: [] }; let stop = false;
  for (const b of L.blocks) {
    if (b.type === "task") continue;
    const ht = b.type === "heading" ? b.children.map((c) => c.text).join("") : "";
    if (/^(Упражнения|Задания|Повторение)$/.test(ht)) { stop = true; continue; }
    if (stop) continue;
    if (b.type === "heading" && b.level <= 2) { if (cur.blocks.length || cur.title) secs.push(cur); cur = { title: ht, blocks: [] }; continue; }
    cur.blocks.push(b);
  }
  if (cur.blocks.length || cur.title) secs.push(cur);
  const icon = { "Почему так": "💡", "Новые слова": "🔤", "Примеры": "✦", "Диалог": "💬", "Запомни": "📌", "Послушай": "🎧", "Послушай песню": "🎵" };
  return secs.filter((s) => s.blocks.map(blockHtml).join("").trim()).map((s) => `<section class="card lsecn${s.title === "Почему так" ? " why" : s.title === "Запомни" ? " mem" : ""}">${s.title ? `<h2>${icon[s.title] || "✦"} ${esc(s.title)}</h2>` : ""}${s.blocks.map(blockHtml).join("")}</section>`).join("");
}
function pageLesson(args) {
  const n = +args[0] || 1;
  return `<div id="lsn" data-n="${n}"><div class="card muted">Загружаю урок ${n}…</div></div>`;
}
async function bindLesson(args) {
  const n = +args[0] || 1;
  let L; try { L = await loadLesson(n); } catch (e) { $("#lsn").innerHTML = `<div class="card soon"><div class="ic">📖</div><h2>Урока ${n} нет</h2><a class="btn gold" href="#/учиться">Ко всем урокам</a></div>`; return; }
  const tasks = L.blocks.filter((b) => b.type === "task");
  LS = { n, L, tasks: buildQueue(L, tasks) };
  const st = (Store.get().lessons[n] || {}).stars || 0;
  const prev = ET_TOC.find((l) => l[0] === n - 1), next = ET_TOC.find((l) => l[0] === n + 1);
  $("#lsn").innerHTML = `<div class="lhead"><div><div class="k">${L.check ? "Контрольная" : "Урок " + n} · ${esc(sectionName(n))}</div><h1 class="page">${esc(L.title)}</h1>
      ${st ? `<div class="lstars">${"★".repeat(st)}${"☆".repeat(3 - st)} <span class="muted">лучший результат: ${Store.get().lessons[n].best}%</span></div>` : ""}</div>
      <label class="gltog"><input type="checkbox" id="gltog" ${localStorage.getItem("etoilal-gloss") === "0" ? "" : "checked"}> подстрочник</label></div>
    <div class="ltheory${localStorage.getItem("etoilal-gloss") === "0" ? " nogl" : ""}" id="ltheory">${theoryHtml(L)}</div>
    <div class="lgo card"><div><b>${L.check ? "Проверь себя" : "Теперь — задания"}</b><div class="muted">${LS.tasks.length} заданий · ошибки повторятся в конце</div></div>
      <button class="btn gold" id="lstart">Начать задания ▶</button></div>
    <div class="lnav">${prev ? `<a class="btn" href="#/урок/${n - 1}">← ${esc(prev[1])}</a>` : "<span></span>"}${next ? `<a class="btn" href="#/урок/${n + 1}">${esc(next[1])} →</a>` : ""}</div>`;
  $("#gltog").onchange = (e) => { localStorage.setItem("etoilal-gloss", e.target.checked ? "1" : "0"); $("#ltheory").classList.toggle("nogl", !e.target.checked); };
  $("#lstart").onclick = () => startTasks();
  $("#lsn").addEventListener("click", lessonClick);
}
function sectionName(n) { const k = sections().findIndex((s) => s.some((l) => l[0] === n)); return SECTION_NAMES[k] || ""; }
function lessonClick(e) {
  const my = e.target.closest("[data-my]");
  if (my) { const on = Store.toggleWord(my.dataset.my); my.classList.toggle("on", on); my.textContent = on ? "★" : "☆"; toast(on ? "Добавил в карточки" : "Убрал из карточек"); renderNav("учиться"); return; }
  const all = e.target.closest("[data-all]");
  if (all) { playFile(all.dataset.all); return; }
}

// ---------------------------------------------------------------- задания
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function buildQueue(L, tasks) {
  const q = tasks.map((t) => ({ ...t }));
  // «услышал — напиши»: 2 примера урока с записью (в контрольных — нет)
  if (!L.check) {
    const ex = shuffle(L.blocks.filter((b) => b.type === "gloss" && b.src && b.et.split(" ").length <= 6)).slice(0, 2);
    ex.forEach((g, i) => q.splice(Math.min(q.length, 3 + i * 4), 0, { type: "task", id: "dict" + i, taskType: "dictation", data: { src: g.src, et: g.et, ru: g.ru } }));
  }
  return q;
}
function startTasks() {
  Object.assign(LS, { i: 0, queue: LS.tasks.slice(), first: {}, retried: new Set(), answered: false });
  $("#lsn").innerHTML = `<div class="trun"><div class="trtop"><button class="btn sm" id="trclose" title="Выйти к объяснению">✕</button><div class="q tprog"><i id="tbar"></i></div><span class="muted" id="tcount"></span></div>
    <div class="card tcard" id="tcard"></div><div class="tfb" id="tfb" hidden></div></div>`;
  $("#trclose").onclick = () => route();
  showTask();
}
function showTask() {
  const t = LS.queue[LS.i]; LS.answered = false;
  const total = LS.tasks.length, doneN = Object.keys(LS.first).length;
  $("#tbar").style.width = (doneN / total * 100) + "%"; $("#tcount").textContent = `${Math.min(doneN + 1, total)} / ${total}`;
  $("#tfb").hidden = true; $("#tfb").className = "tfb";
  const d = t.data, retry = LS.retried.has(t.id) ? `<div class="tag">повтор</div>` : "";
  let h = "";
  const cleanQ = (s) => esc(s).replace(/«([^»]*[a-z][^»]*)»/gi, "«<span class='et'>$1</span>»");
  switch (t.taskType) {
    case "multiple_choice": case "listening":
      h = `${retry}<div class="tq">${t.taskType === "listening" ? `<button class="play big" id="tplay">▶</button>` : ""}${cleanQ(d.question)} ${d.qsay ? pbtn(d.qsay, "") : ""}</div>
        <div class="topts">${shuffle(d.options).map((o) => `<button class="topt" data-o="${esc(o.id)}">${/[А-Яа-яЁё]/.test(o.text) ? esc(o.text) : `<span class="et">${esc(o.text)}</span>`}</button>`).join("")}</div>`;
      break;
    case "free_input": case "translation": case "dictation": {
      const q = t.taskType === "dictation" ? `<button class="play big" id="tplay">▶</button> Послушай и напиши на Etoilal`
        : t.taskType === "translation" ? `Переведи на Etoilal: <b>${esc(d.source.replace(/\s*\(переведи на Etoilal\)\s*$/, ""))}</b>` : cleanQ(d.question);
      h = `${retry}<div class="tq">${q}</div><input class="in tin" id="tin" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Напиши ответ…">
        <div class="tkeys">${["'", "é"].slice(0, 1).map((k) => `<button class="btn sm" data-key="${k}">${k}</button>`).join("")}<span class="muted">Опечатку в одну букву прощу.</span></div>
        <button class="btn gold tcheck" id="tok">Проверить</button>`;
      break;
    }
    case "sentence_order": {
      const toks = d.answers[0].split(" ");
      h = `${retry}<div class="tq">Собери фразу: <b>${esc(d.translation)}</b></div><div class="tline" id="tline"></div>
        <div class="tchips" id="tchips">${shuffle(toks.map((w, i) => [w, i])).map(([w, i]) => `<button class="chipw" data-i="${i}">${esc(w)}</button>`).join("")}</div>
        <button class="btn gold tcheck" id="tok">Проверить</button>`;
      break;
    }
    case "matching": {
      h = `${retry}<div class="tq">${esc(d.instruction)}</div><div class="tmatch"><div>${shuffle(d.pairs).map((p) => `<button class="mt l" data-p="${p.id}"><span class="et">${esc(p.left)}</span></button>`).join("")}</div>
        <div>${shuffle(d.pairs).map((p) => `<button class="mt r" data-p="${p.id}">${esc(p.right)}</button>`).join("")}</div></div>`;
      break;
    }
  }
  $("#tcard").innerHTML = h;
  bindTask(t);
}
function bindTask(t) {
  const d = t.data;
  const play = $("#tplay");
  if (play) { const go = () => playFile(d.src, d.transcript || d.et); play.onclick = go; setTimeout(go, 250); }
  if (["multiple_choice", "listening"].includes(t.taskType)) {
    $("#tcard").querySelectorAll(".topt").forEach((b) => b.onclick = () => {
      if (LS.answered) return;
      const ok = b.dataset.o === d.correctOptionId;
      $("#tcard").querySelectorAll(".topt").forEach((x) => x.classList.add(x.dataset.o === d.correctOptionId ? "good" : x === b ? "bad" : "dim"));
      const right = d.options.find((o) => o.id === d.correctOptionId);
      answer(t, ok, { right: right.text, say: right.say || (t.taskType === "listening" ? d.src : null), sayText: right.say ? right.text : d.transcript });
    });
  }
  if (["free_input", "translation", "dictation"].includes(t.taskType)) {
    const inp = $("#tin"); inp.focus();
    const answers = t.taskType === "dictation" ? [d.et] : d.answers;
    const go = () => { if (LS.answered) return next(); const r = checkAnswer(inp.value, answers); inp.disabled = true;
      answer(t, r.ok, { right: r.right, typo: r.typo, say: d.say || d.src, sayText: r.right }); };
    $("#tok").onclick = go; inp.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); go(); } };
    $("#tcard").querySelectorAll("[data-key]").forEach((k) => k.onclick = () => { inp.value += k.dataset.key; inp.focus(); });
  }
  if (t.taskType === "sentence_order") {
    const line = $("#tline"), chips = $("#tchips");
    const move = (e) => { if (LS.answered) return; const c = e.target.closest(".chipw"); if (!c) return; (c.parentNode === chips ? line : chips).appendChild(c); };
    line.onclick = move; chips.onclick = move;
    $("#tok").onclick = () => {
      if (LS.answered) return next();
      const got = [...line.querySelectorAll(".chipw")].map((c) => c.textContent).join(" ");
      const ok = normA(got) === normA(d.answers[0]);
      answer(t, ok, { right: d.answers[0], say: d.say, sayText: d.answers[0] });
    };
  }
  if (t.taskType === "matching") {
    let sel = null, left = d.pairs.length, miss = 0;
    $("#tcard").querySelectorAll(".mt").forEach((b) => b.onclick = () => {
      if (b.classList.contains("done") || LS.answered) return;
      if (b.classList.contains("l")) { const p = d.pairs.find((x) => x.id === b.dataset.p); playFile(p.say, p.left); }
      if (!sel || sel.classList.contains(b.classList.contains("l") ? "l" : "r")) { if (sel) sel.classList.remove("sel"); sel = b; b.classList.add("sel"); return; }
      if (sel.dataset.p === b.dataset.p) { sel.classList.add("done"); b.classList.add("done"); sel.classList.remove("sel"); sel = null; if (--left === 0) answer(t, miss === 0, { right: miss ? "ошибок: " + miss : "", say: null }); }
      else { miss++; b.classList.add("shake"); setTimeout(() => b.classList.remove("shake"), 400); sel.classList.remove("sel"); sel = null; }
    });
  }
}
function answer(t, ok, info) {
  LS.answered = true;
  if (!(t.id in LS.first)) LS.first[t.id] = ok;
  if (!ok && !LS.retried.has(t.id)) { LS.retried.add(t.id); LS.queue.push(t); }
  const fb = $("#tfb"); fb.hidden = false; fb.className = "tfb " + (ok ? "ok" : "no");
  const rightHtml = info.right && !/^ошибок/.test(info.right) ? (/[А-Яа-яЁё]/.test(info.right) ? esc(info.right) : `<span class="et">${esc(info.right)}</span>`) : esc(info.right || "");
  fb.innerHTML = `<div><b>${ok ? (info.typo ? "Почти! Засчитано" : ["Верно!", "Отлично!", "Так держать!", "Точно!"][Math.floor(Math.random() * 4)]) : "Не совсем"}</b>
      ${(!ok || info.typo) && info.right ? `<div>${t.taskType === "matching" ? rightHtml : "Правильно: " + rightHtml}</div>` : ""}</div>
    <div class="row">${info.say || info.sayText && !/[А-Яа-яЁё]/.test(info.sayText) ? pbtn(info.say, info.sayText || "", 0) : ""}<button class="btn ${ok ? "gold" : ""}" id="tnext">Дальше ▶</button></div>`;
  $("#tnext").onclick = next; $("#tnext").focus();
  if (ok && info.say && t.taskType !== "listening") playFile(info.say, info.sayText);
}
function next() {
  LS.i++;
  if (LS.i >= LS.queue.length) return lessonFinish();
  showTask();
}
function lessonFinish() {
  const vals = Object.values(LS.first), correct = vals.filter(Boolean).length, pct = Math.round(correct / Math.max(1, vals.length) * 100);
  if (LS.train) return LS.train(correct, vals.length, pct);           // тренировка (training.js) — свой итог
  const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : 1;
  const r = Store.finishLesson(LS.n, stars, pct, correct);
  renderNav("учиться");
  const nxt = ET_TOC.find((l) => l[0] === LS.n + 1);
  $("#lsn").innerHTML = `<div class="card tdone"><div class="bigstars">${"★".repeat(stars)}<span>${"☆".repeat(3 - stars)}</span></div>
    <h2>${stars === 3 ? "Великолепно!" : stars === 2 ? "Хорошо!" : "Урок пройден"}</h2>
    <p class="muted">Верно с первого раза: ${correct} из ${vals.length} (${pct}%)</p>
    <div class="tgain"><span>✦ +${r.pts} очков</span>${r.chest ? "<span>💎 +1 сундук</span>" : ""}</div>
    ${stars < 3 ? `<p class="muted">Три звезды — от 90%. Можно пройти задания ещё раз: очки дадут за улучшение.</p>` : ""}
    <div class="row" style="justify-content:center;flex-wrap:wrap">${nxt ? `<a class="btn gold" href="#/урок/${LS.n + 1}">Дальше: ${esc(nxt[1])} ▶</a>` : `<a class="btn gold" href="#/учиться">Ко всем урокам</a>`}
    <button class="btn" id="tagain">Ещё раз</button><a class="btn" href="#/урок/${LS.n}">К объяснению</a></div></div>`;
  $("#tagain").onclick = () => startTasks();
}
// клики по кнопкам ▶ с data-src (уроки): запись, иначе голос браузера
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-src]"); if (!b || b.id === "tplay") return;
  e.preventDefault(); e.stopImmediatePropagation(); playFile(b.dataset.src, b.dataset.say);
}, true);
