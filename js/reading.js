// «Полезное» (#/полезное — фразы по ситуациям), «Тексты для перевода» (#/тексты[/N] — переведи с русского, я проверю),
// «Библиотека» (#/библиотека[/id] — рассказ, разговоры, стихи с записью и параллельным переводом).
// Данные: data/useful.js (tools/build_useful.mjs), data/library.js (tools/build_library.py). Разбор слов — bindSongWords (songs.js).

// ---------------------------------------------------------------- полезные фразы
let usefulQ = "";
function pageUseful() {
  return `<div class="k">Полезное</div><h1 class="page">Фразы на <i>каждый день</i></h1>
  <p class="lead">${ET_USEFUL.situations.reduce((a, s) => a + s.phrases.length, 0)} фраз для знакомства, кафе, магазина, города и переписки. Нажми ▶ и повтори вслух; нажми на слово — разбор.</p><div class="aud-note" style="margin:-10px 0 14px">🔊 Аудио синтезировано — возможны неточности</div>
  <input class="in" id="uq" placeholder="Найти фразу: кофе, где, спасибо…" value="${esc(usefulQ)}" autocomplete="off" style="max-width:520px;margin-bottom:14px">
  <div class="sits" id="sits"></div>`;
}
function usefulRender() {
  const q = usefulQ.toLowerCase().replace(/ё/g, "е").trim(), m = (s) => s.toLowerCase().replace(/ё/g, "е").includes(q);
  const html = ET_USEFUL.situations.map((s) => { const ph = s.phrases.filter(([et, ru]) => !q || m(et) || m(ru)); if (!ph.length) return "";
    return `<div class="card sit"><h3>${s.icon} ${esc(s.name)}</h3>${ph.map(([et, ru]) => `<div class="lex">${playBtn(et, 1)}<div><div class="row1"><span class="et"><span class="wl">${et.split(/\s+/).map((w) => `<span class="sw">${esc(w)}</span>`).join(" ")}</span></span></div>
      <div class="ru">${esc(ru)}</div><div class="rd">«${esc(rd(et))}»</div></div></div>`).join("")}</div>`; }).join("");
  $("#sits").innerHTML = html || `<div class="card muted">Ничего не нашлось. Попробуй <a class="et" href="#/переводчик">переводчик</a>.</div>`;
}
async function bindUseful() {
  await trReady(); usefulRender(); bindSongWords($("#sits"));
  let t; $("#uq").addEventListener("input", (e) => { clearTimeout(t); t = setTimeout(() => { usefulQ = e.target.value; usefulRender(); }, 150); });
}

// ---------------------------------------------------------------- тексты для перевода
const LEVEL = ["", "лёгкий", "средний", "посложнее"];
function pageTexts(args) {
  const S = Store.get(), res = S.texts || {};
  if (args[0]) return `<div id="txt"></div>`;
  return `<div class="k">Тексты для перевода</div><h1 class="page">Переведи — <i>я проверю</i></h1>
  <p class="lead">Короткие тексты по-русски. Переведи каждое предложение на Etoilal: я сравню с образцом, найду ошибки и покажу, что получилось у тебя по-русски.</p>
  <div class="songs">${ET_USEFUL.texts.map((t, i) => `<a class="card songc" href="#/тексты/${i + 1}"><div class="sn">${["", "🌱", "🌿", "🌳"][t.level]}</div><div><b>${esc(t.name)}</b>
    <div class="muted">${LEVEL[t.level]} · ${t.sents.length} предложения</div>${res[i + 1] != null ? `<small class="tag">лучший результат: ${res[i + 1]}%</small>` : ""}</div></a>`).join("")}</div>`;
}
function simil(a, b) { a = normA(a); b = normA(b); const n = Math.max(a.length, b.length); return n ? 1 - lev2(a, b) / n : 1; }
function lev2(a, b) {                              // полный Левенштейн (lesson.js lev обрезает длинные строки)
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) { const cur = [i]; for (let j = 1; j <= b.length; j++) cur.push(Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))); prev = cur; }
  return prev[b.length];
}
const dropSubj = (s) => s.replace(/^(je|j'|tu|il|el|nou|vou|ilz|elz)\s*/i, "");
async function bindTexts(args) {
  if (!args[0]) return;
  await trReady();
  const k = +args[0], T = ET_USEFUL.texts[k - 1];
  if (!T) { $("#txt").innerHTML = `<div class="card soon"><h2>Такого текста нет</h2><a class="btn gold" href="#/тексты">Все тексты</a></div>`; return; }
  $("#txt").innerHTML = `<a class="muted" href="#/тексты">← Все тексты</a><div class="k" style="margin-top:10px">${LEVEL[T.level]}</div><h1 class="page">${esc(T.name)}</h1>
    <div class="card trx">${T.sents.map(([et, ru], i) => `<div class="trs" data-i="${i}"><div class="trru">${i + 1}. ${esc(ru)}</div>
      <input class="in" data-i="${i}" placeholder="На Etoilal…" autocomplete="off" spellcheck="false"><div class="trres"></div></div>`).join("")}
      <div class="row" style="justify-content:flex-start;gap:12px;flex-wrap:wrap"><button class="btn gold" id="trchk">Проверить</button><button class="btn" id="trshow">Показать образец</button><span class="muted" id="trscore"></span></div></div>`;
  const check = (reveal) => {
    let sum = 0;
    T.sents.forEach(([et], i) => {
      const inp = $(`.trs[data-i="${i}"] input`), box = $(`.trs[data-i="${i}"] .trres`), v = inp.value.trim();
      if (!v && !reveal) { box.innerHTML = ""; return; }
      const sc = v ? Math.max(simil(v, et), simil(dropSubj(v), dropSubj(et))) : 0; sum += sc;
      const iss = v ? Checker.check(v).filter((x) => !x.soft) : [];
      const st = sc >= .97 ? "ok" : sc >= .8 ? "near" : "no";
      box.innerHTML = (v ? `<div class="note ${st === "ok" ? "fixn" : st === "near" ? "" : "unk"}"><b>${st === "ok" ? "✓ Верно" : st === "near" ? "≈ Почти" : "✗ Не так"}</b>
          ${st !== "ok" ? ` · образец: <span class="et">${esc(et)}</span> ${playBtn(et, 1)}` : ` ${playBtn(et, 1)}`}
          ${iss.length ? `<div class="muted">${iss.map((x) => esc(x.title + ": " + x.why)).join("<br>")}</div>` : ""}
          ${st !== "ok" ? `<div class="muted">Твой вариант по-русски: «${esc(back(v).text)}»</div>` : ""}</div>`
        : `<div class="note">Образец: <span class="et">${esc(et)}</span> ${playBtn(et, 1)}</div>`);
    });
    const pct = Math.round(sum / T.sents.length * 100);
    $("#trscore").textContent = `Совпадение с образцом: ${pct}%`;
    if (!reveal) { const S = Store.get(); S.texts = S.texts || {}; if (pct > (S.texts[k] || 0)) { if (pct >= 90 && (S.texts[k] || 0) < 90) { Store.addPoints(10); toast("✦ +10 очков"); renderNav("тексты"); } S.texts[k] = pct; Store.save(); } }
  };
  $("#trchk").onclick = () => check(false); $("#trshow").onclick = () => check(true);
  $("#txt").addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.matches("input")) { const n = $(`.trs[data-i="${+e.target.dataset.i + 1}"] input`); if (n) n.focus(); else check(false); } });
}

// ---------------------------------------------------------------- библиотека
function pageLibrary(args) {
  if (args[0]) return `<div id="lib"></div>`;
  return `<div class="k">Библиотека</div><h1 class="page">Читай и <i>слушай</i></h1>
  <p class="lead">Сказка, разговоры и стихи на Etoilal с записью и переводом каждой строки. Можно спрятать перевод и проверять себя.</p>
  <div class="songs">${ET_LIBRARY.map((t) => `<a class="card songc" href="#/библиотека/${t.id}"><div class="sn">${t.icon}</div><div><b class="et">${esc(t.title)}</b>
    <div>«${esc(t.ru)}» · ${t.kind}</div><small class="muted">${t.paras.reduce((a, p) => a + p.length, 0)} строк${t.audio ? " · запись ~5 мин" : ""}</small></div></a>`).join("")}
    <a class="card songc" href="#/песни"><div class="sn">🎤</div><div><b>Песни</b><div class="muted">8 песен, у двух — караоке</div></div></a></div>`;
}
async function bindLibrary(args) {
  if (!args[0]) return;
  await trReady();
  const t = ET_LIBRARY.find((x) => x.id === args[0]);
  if (!t) { $("#lib").innerHTML = `<div class="card soon"><h2>Такого текста нет</h2><a class="btn gold" href="#/библиотека">Библиотека</a></div>`; return; }
  const mode = localStorage.getItem("etoilal-lib-mode") || "par";
  $("#lib").innerHTML = `<a class="muted" href="#/библиотека">← Библиотека</a><div class="k" style="margin-top:10px">${t.kind}</div>
    <h1 class="page"><span class="et" style="font-size:inherit">${esc(t.title)}</span> <i>«${esc(t.ru)}»</i></h1>
    <div class="row sctl"><div class="seg" id="lmode"><button data-m="par">рядом</button><button data-m="under">под строкой</button><button data-m="hide">спрятать перевод</button></div>
      <span class="muted">Нажми на слово — разбор, на ▶ — строка голосом.</span></div>
    ${t.audio ? `<div class="card splayer"><span class="muted">Вся запись:</span><audio controls preload="none" src="${t.audio}" style="flex:1;min-width:0"></audio></div><div class="aud-note" style="margin:-6px 0 10px">🔊 Аудио синтезировано — возможны неточности</div>` : ""}
    <div class="card libt" id="libt">${t.paras.map((p) => `<div class="lp">${p.map((l) => `<div class="ll${l.d ? " dlg" : ""}"><div class="le">${playBtn(l.et, 1)} <span class="et">${l.d ? "— " : ""}${l.et.split(/\s+/).map((w) => `<span class="sw">${esc(w)}</span>`).join(" ")}</span></div>
      <div class="lr">${esc(l.ru)}</div></div>`).join("")}</div>`).join("")}</div>`;
  const setMode = (m) => { $("#libt").className = "card libt m-" + m; $("#lmode").querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.m === m)); localStorage.setItem("etoilal-lib-mode", m); };
  setMode(mode);
  $("#lmode").onclick = (e) => { const b = e.target.closest("button"); if (b) setMode(b.dataset.m); };
  $("#libt").addEventListener("click", (e) => { const l = e.target.closest(".ll"); if (l && !e.target.closest(".sw,.play") && $("#libt").classList.contains("m-hide")) l.classList.toggle("open"); });
  bindSongWords($("#libt"));
}
