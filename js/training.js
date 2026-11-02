// Тренировки (#/тренировки[/режим]): «Набор из 15» (задания пройденных уроков вперемешку — движок lesson.js), «Успей перевести»
// (60 секунд, выбор перевода), «Аудирование» (послушай — выбери / напиши), «Произношение» (запись микрофоном, сравнение с эталоном
// по ритму и громкости + прослушивание рядом). Материал — уроки до первого непройденного включительно (минимум уроки 1–5).

const TR_MODES = [["набор", "🎯", "Набор из 15", "задания всех пройденных уроков вперемешку"], ["успей", "⏱", "Успей перевести", "60 секунд: сколько фраз переведёшь?"],
  ["аудирование", "🎧", "Аудирование", "послушай фразу — выбери перевод или напиши"], ["произношение", "🎙", "Произношение", "запиши себя и сравни с эталоном"]];
function trainLessons() {
  const S = Store.get(), done = ET_TOC.filter((l) => S.lessons[l[0]] && S.lessons[l[0]].stars).map((l) => l[0]);
  const upto = Math.max(6, done.length ? Math.max(...done) + 1 : 0);
  return ET_TOC.filter((l) => l[0] <= upto).map((l) => l[0]);
}
async function trainPool() {
  const ns = trainLessons(), Ls = await Promise.all(ns.map((n) => loadLesson(n).catch(() => null)));
  const tasks = [], phrases = [];
  Ls.forEach((L) => { if (!L) return; for (const b of L.blocks) {
    if (b.type === "task") tasks.push({ ...b, id: L.n + ":" + b.id });
    if (b.type === "gloss" && b.ru && /[.!?]$/.test(b.et)) phrases.push({ et: b.et, ru: b.ru, src: b.src, n: L.n });
    if (b.type === "dialog") for (const l of b.lines) phrases.push({ et: l.et, ru: l.ru, src: l.src, n: L.n });
  } });
  const seen = new Set();
  return { ns, tasks, phrases: phrases.filter((p) => !seen.has(p.ru) && seen.add(p.ru)) };
}
const pick = (arr, k) => shuffle(arr).slice(0, k);
function pageTrain(args) {
  const S = Store.get(), best = S.best || {};
  if (args[0]) return `<div id="trn"><div class="card muted">Готовлю тренировку…</div></div>`;
  const ns = trainLessons();
  return `<div class="k">Тренировки</div><h1 class="page">Закрепи <i>пройденное</i></h1>
  <p class="lead">Материал — уроки 1–${Math.max(...ns)}: всё, что ты уже прошёл, и следующий урок. Чем дальше в курсе — тем больше разнообразия.</p>
  <div class="tmodes">${TR_MODES.map(([id, ic, t, s]) => `<a class="card tmode" href="#/тренировки/${id}"><div class="ic">${ic}</div><b>${t}</b><span>${s}</span>
    ${best[id] ? `<small class="tag">рекорд: ${best[id]}</small>` : ""}</a>`).join("")}</div>`;
}
async function bindTrain(args) {
  if (!args[0]) return;
  const P = await trainPool();
  if (args[0] === "набор") return trainSet(P);
  if (args[0] === "успей") return trainSpeed(P);
  if (args[0] === "аудирование") return trainListen(P);
  if (args[0] === "произношение") return trainSpeak(P);
  $("#trn").innerHTML = `<div class="card soon"><h2>Такой тренировки нет</h2><a class="btn gold" href="#/тренировки">Все тренировки</a></div>`;
}
function trainDone(mode, score, text, pts) {
  const S = Store.get(); S.best = S.best || {}; const rec = score > (S.best[mode] || 0); if (rec) S.best[mode] = score;
  Store.addPoints(pts); renderNav("учиться");
  $("#trn").innerHTML = `<div class="card tdone"><div class="bigstars">${rec ? "🏆" : "✓"}</div><h2>${rec ? "Новый рекорд!" : "Готово!"}</h2><p class="muted">${text}</p>
    <div class="tgain"><span>✦ +${pts} очков</span></div><div class="row" style="justify-content:center;flex-wrap:wrap">
    <button class="btn gold" id="tragain">Ещё раз</button><a class="btn" href="#/тренировки">Все тренировки</a></div></div>`;
  $("#tragain").onclick = () => route();
}
// задания через движок урока: в #trn подставляем контейнер #lsn
function runTasks(mode, tasks, label) {
  $("#trn").innerHTML = `<div id="lsn"></div>`;
  LS = { n: 0, L: { check: true, blocks: [] }, tasks, train: (correct, total, pct) => trainDone(mode, correct, `${label}: верно с первого раза ${correct} из ${total} (${pct}%).`, correct) };
  startTasks();
}

// ---------------------------------------------------------------- набор из 15
function trainSet(P) {
  const pool = P.tasks.filter((t) => t.taskType !== "matching" || Math.random() < .4);
  const tasks = pick(pool, 13);
  pick(P.phrases.filter((p) => p.src && p.et.split(" ").length <= 6), 2).forEach((p, i) => tasks.splice(3 + i * 6, 0, { type: "task", id: "d" + i, taskType: "dictation", data: { src: p.src, et: p.et } }));
  runTasks("набор", tasks, "Набор из 15");
}

// ---------------------------------------------------------------- аудирование
function trainListen(P) {
  const ph = P.phrases.filter((p) => p.src);
  const items = pick(ph.length >= 10 ? ph : P.phrases, 10);
  const tasks = items.map((p, i) => i % 3 === 2 && p.et.split(" ").length <= 7
    ? { type: "task", id: "l" + i, taskType: "dictation", data: { src: p.src, et: p.et } }
    : { type: "task", id: "l" + i, taskType: "listening", data: { src: p.src, transcript: p.et, question: "Послушай и выбери перевод",
        options: shuffle([p.ru, ...pick(P.phrases.filter((x) => x.ru !== p.ru), 3).map((x) => x.ru)]).map((t, k) => ({ id: "o" + k, text: t })), correctOptionId: null, _ru: p.ru } });
  tasks.forEach((t) => { if (t.data._ru) t.data.correctOptionId = t.data.options.find((o) => o.text === t.data._ru).id; });
  runTasks("аудирование", tasks, "Аудирование");
}

// ---------------------------------------------------------------- успей перевести (60 с)
function trainSpeed(P) {
  const items = shuffle(P.phrases), T = 60;
  let i = 0, score = 0, miss = 0, left = T, timer = null;
  $("#trn").innerHTML = `<div class="trun"><div class="trtop"><a class="btn sm" href="#/тренировки">✕</a><div class="q tprog speed"><i id="spbar" style="width:100%"></i></div><b id="sptime">${T}</b></div>
    <div class="card tcard" id="spcard"></div><div class="row muted" style="margin-top:10px"><span>Верно: <b id="spok">0</b></span><span>Ошибок: <b id="spno">0</b></span></div></div>`;
  const show = () => {
    const p = items[i % items.length], dirEt = i % 2 === 0;        // по очереди: русский → Etoilal и Etoilal → русский
    const opts = shuffle([p, ...pick(P.phrases.filter((x) => x.ru !== p.ru), 3)]);
    window.__spRight = opts.indexOf(p);                            // для автотеста (tools/test_training.cjs)
    $("#spcard").innerHTML = `<div class="tq">${dirEt ? `Как сказать: <b>${esc(p.ru)}</b>` : `Что значит: <span class="et">${esc(p.et)}</span>`}</div>
      <div class="topts">${opts.map((o, k) => `<button class="topt" data-k="${k}">${dirEt ? `<span class="et">${esc(o.et)}</span>` : esc(o.ru)}</button>`).join("")}</div>`;
    $("#spcard").onclick = (e) => {
      const b = e.target.closest(".topt"); if (!b || !timer) return;
      const ok = opts[+b.dataset.k] === p;
      if (ok) { score++; b.classList.add("good"); } else { miss++; b.classList.add("bad", "shake"); }
      $("#spok").textContent = score; $("#spno").textContent = miss; i++; setTimeout(() => timer && show(), ok ? 180 : 450);
    };
  };
  show();
  timer = setInterval(() => {
    left--; if (!$("#sptime")) { clearInterval(timer); return; }
    $("#sptime").textContent = left; $("#spbar").style.width = (left / T * 100) + "%";
    if (left <= 0) { clearInterval(timer); timer = null; trainDone("успей", score, `За 60 секунд: верно ${score}, ошибок ${miss}.`, score); }
  }, 1000);
}

// ---------------------------------------------------------------- произношение
async function decodeUrl(url) {                  // запись → огибающая громкости; через file:// браузер файл не отдаёт — тогда null
  if (location.protocol === "file:") return null;
  try { const buf = await (await fetch(url)).arrayBuffer(); return await decodeBuf(buf); } catch (e) { return null; }
}
async function decodeBuf(buf) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const a = await ctx.decodeAudioData(buf); ctx.close && ctx.close();
  const d = a.getChannelData(0), hop = Math.round(a.sampleRate / 50), env = [];
  for (let i = 0; i + hop <= d.length; i += hop) { let s = 0; for (let j = i; j < i + hop; j++) s += d[j] * d[j]; env.push(Math.sqrt(s / hop)); }
  return env;
}
function envCompare(a, b) {                      // 0–100: похожесть ритма (огибающие без тишины по краям, одной длины) и длительности
  const trim = (e) => { const m = Math.max(...e), th = m * .12; let s = e.findIndex((x) => x > th), t = e.length - 1 - [...e].reverse().findIndex((x) => x > th); return s < 0 ? [] : e.slice(s, t + 1).map((x) => x / m); };
  const A = trim(a), B = trim(b); if (A.length < 5 || B.length < 5) return 0;
  const N = 60, rs = (e) => Array.from({ length: N }, (_, i) => e[Math.floor(i * e.length / N)]);
  const x = rs(A), y = rs(B), mx = x.reduce((p, c) => p + c) / N, my = y.reduce((p, c) => p + c) / N;
  let sxy = 0, sx = 0, sy = 0; for (let i = 0; i < N; i++) { sxy += (x[i] - mx) * (y[i] - my); sx += (x[i] - mx) ** 2; sy += (y[i] - my) ** 2; }
  const corr = sxy / Math.sqrt(sx * sy || 1), dur = Math.min(A.length, B.length) / Math.max(A.length, B.length);
  return Math.round(Math.max(0, Math.min(1, (corr * .7 + dur * .3))) * 100);
}
function trainSpeak(P) {
  const items = pick(P.phrases.filter((p) => p.src && p.et.split(" ").length <= 5), 6);
  if (!items.length) { $("#trn").innerHTML = `<div class="card soon"><h2>Записи ещё готовятся</h2><p class="muted">Для произношения нужны фразы с записью.</p></div>`; return; }
  let i = 0; const scores = [];
  const can = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  const show = () => {
    const p = items[i]; let blobUrl = null; window.__pronSrc = p.src;
    $("#trn").innerHTML = `<div class="trun"><div class="trtop"><a class="btn sm" href="#/тренировки">✕</a><div class="q tprog"><i style="width:${i / items.length * 100}%"></i></div><span class="muted">${i + 1} / ${items.length}</span></div>
      <div class="card tcard pron"><div class="muted">Послушай, потом запиши себя — и сравни.</div>
        <div class="pet et">${esc(p.et)}</div><div class="rd">«${esc(rd(p.et))}»</div><div class="muted">${esc(p.ru)}</div>
        <div class="row prow"><button class="btn" id="pref">▶ Эталон</button><button class="btn gold" id="prec" ${can ? "" : "disabled"}>🎙 Записать</button><button class="btn" id="pme" disabled>▶ Моя запись</button></div>
        <div id="pres" class="pres">${can ? "" : `<div class="note unk">Этот браузер не умеет записывать звук. Повтори вслух за эталоном.</div>`}</div></div>
      <div class="lnav"><span></span><button class="btn" id="pnext">${i + 1 < items.length ? "Следующая фраза ▶" : "Готово ★"}</button></div></div>`;
    $("#pref").onclick = () => playFile(p.src, p.et);
    $("#pnext").onclick = () => { if (++i < items.length) show(); else finishSpeak(); };
    $("#pme").onclick = () => blobUrl && playFile(blobUrl);
    $("#prec").onclick = async () => {
      let stream; try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch (e) { $("#pres").innerHTML = `<div class="note unk">Нет доступа к микрофону — разреши его в настройках браузера.</div>`; return; }
      const rec = new MediaRecorder(stream), parts = []; rec.ondataavailable = (e) => parts.push(e.data);
      const ms = Math.min(8000, 1500 + p.et.length * 110);
      $("#prec").disabled = true; $("#prec").textContent = "● Говори…"; $("#pres").innerHTML = `<div class="q"><i class="recbar" style="animation-duration:${ms}ms"></i></div>`;
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(parts, { type: rec.mimeType || "audio/webm" }); blobUrl = URL.createObjectURL(blob);
        $("#prec").disabled = false; $("#prec").textContent = "🎙 Ещё раз"; $("#pme").disabled = false;
        const [ref, me] = await Promise.all([decodeUrl(p.src), blob.arrayBuffer().then(decodeBuf).catch(() => null)]);
        if (!ref || !me) { $("#pres").innerHTML = `<div class="note">Записал! Сравни на слух: ▶ Эталон и ▶ Моя запись.${location.protocol === "file:" ? " (Автоматическая оценка работает, когда сайт открыт через интернет, а не из файла.)" : ""}</div>`; scores[i] = null; return; }
        const sc = envCompare(ref, me); scores[i] = sc;
        const st = sc >= 75 ? 3 : sc >= 50 ? 2 : 1;
        $("#pres").innerHTML = `<div class="note ${st > 1 ? "fixn" : ""}"><b>${"★".repeat(st)}${"☆".repeat(3 - st)} Похоже на ${sc}%</b><div class="muted">Это оценка ритма и громкости (где паузы, где ударение), а не каждого звука. Послушай обе записи подряд — так лучше всего слышно разницу.</div></div>`;
      };
      rec.start(); setTimeout(() => rec.state === "recording" && rec.stop(), ms);
    };
  };
  const finishSpeak = () => {
    const got = scores.filter((x) => x != null), avg = got.length ? Math.round(got.reduce((a, b) => a + b) / got.length) : 0;
    trainDone("произношение", avg, got.length ? `Средняя похожесть: ${avg}% по ${got.length} фразам.` : "Ты повторил фразы вслух — это главное.", 5 + Math.round(avg / 10));
  };
  show();
}
