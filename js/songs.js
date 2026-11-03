// Песни (#/песни[/id]): тексты с переводом по строкам; у песен с записью — караоке (подсветка слова по таймингам, щелчок по строке —
// перемотка). Любое слово: наведение — перевод, щелчок — разбор (словарная форма, время/лицо глагола, чтение, ▶, в карточки).
// Данные — data/songs.js (tools/build_songs.py).

const FORM_T = ["наст.", "прош. (сделал)", "прош. длит. (делал)", "буд.", "скоро", "только что"], FORM_P = ["я", "ты", "он/она", "мы", "вы", "они"], FORM_M = ["бы", "пусть", "наверное"];
let FORMIDX = null;
function wordInfo(raw) {                          // слово песни → [{w, lemma, mean, form, pos}] (слияние l'ami → le + ami)
  const t = raw.replace(/[^A-Za-zÀ-ÿ']/g, "").toLowerCase(); if (!t) return [];
  const parts = /^[a-z]'./.test(t) ? [t[0] + "e", t.slice(2)] : [t.replace(/'/g, "")];
  if (!FORMIDX) { FORMIDX = new Map(); E.forEach((e, i) => e.f && e.f.forEach((f, k) => { if (!FORMIDX.has(f)) FORMIDX.set(f, [i, k]); })); }
  return parts.map((w) => {
    const d = dictInfo(w);
    if (d) return { w, lemma: d[0], mean: d[2], pos: POS[d[1]] || "" };
    const fi = FORMIDX.get(w);
    if (fi) { const [i, k] = fi, e = E[i];
      const form = k < 36 ? `${FORM_T[Math.floor(k / 6)]}, ${FORM_P[k % 6]}` : k < 54 ? `«${FORM_M[Math.floor((k - 36) / 6)]}», ${FORM_P[(k - 36) % 6]}` : k === 54 ? "приказ (ты)" : "инфинитив";
      return { w, lemma: e.w, mean: e.m, form, pos: "глагол" }; }
    if (D && D.FUNC && D.FUNC[w]) return { w, lemma: null, mean: D.FUNC[w], pos: "служебное" };
    // составная форма: основа + время + наклонение + лицо (dansrepen = «наверное, будем танцевать»)
    const TV = ["e", "i", "a", "re", "o", "u"], MV = { ri: "бы", se: "пусть", pe: "наверное" };
    let best = null;
    E.forEach((e) => { if (!e.f || !/er$/.test(e.w)) return; const st = e.w.slice(0, -2); if (st.length < 2 || !w.startsWith(st) || (best && best.st.length >= st.length)) return;
      const m = w.slice(st.length).match(/^(re|e|i|a|o|u|you|yo)(ri|se|pe)?([mstnzl])$/); if (m) best = { st, e, m }; });
    if (best) { const t = TV.indexOf(best.m[1].replace(/^yo(u)?$/, (x) => x === "you" ? "u" : "o")), p = "mstnzl".indexOf(best.m[3]);
      return { w, lemma: best.e.w, mean: best.e.m, pos: "глагол", form: `${FORM_T[t] || ""}${best.m[2] ? ` + «${MV[best.m[2]]}»` : ""}, ${FORM_P[p]}` }; }
    const ru = back(w).text; return { w, lemma: null, mean: back(w).unknown.length ? "" : ru.replace(/[.!?]$/, "").toLowerCase(), pos: "" };
  });
}
const wordsHtml = (et, timed) => timed
  ? timed.map(([w, s, e]) => `<span class="sw" data-s="${s}" data-e="${e}">${esc(w)}</span>`).join(" ")
  : et.split(/\s+/).map((w) => `<span class="sw">${esc(w)}</span>`).join(" ");
function pageSongs(args) {
  if (args[0]) return `<div id="song"><div class="card muted">Загружаю песню…</div></div>`;
  return `<div class="k">Песни</div><h1 class="page">Песни на <i>Etoilal</i></h1>
  <p class="lead">Тексты с переводом каждой строки. Наведи на слово — увидишь перевод, нажми — полный разбор. У песен с 🎵 есть запись и караоке.</p>
  <div class="songs">${ET_SONGS.map((s) => `<a class="card songc" href="#/песни/${s.id}"><div class="sn">${songLocked(s) ? "🔒" : s.audio ? "🎵" : "📝"}</div><div><b class="et">${esc(s.title)}</b>
    <div>«${esc(s.ru)}»</div><small class="muted">${songLocked(s) ? `бонусная песня — в магазине за ✦ ${BONUS_SONGS[s.n]} · ` : s.audio ? "запись + караоке · " : ""}${s.parts.reduce((a, p) => a + p.lines.length, 0)} строк</small></div></a>`).join("")}</div>`;
}
let songRaf = null;
const songLocked = (s) => BONUS_SONGS[s.n] && !owned("song:" + s.n);
async function bindSongs(args) {
  if (!args[0]) return;
  await trReady();
  const s = ET_SONGS.find((x) => x.id === args[0]);
  if (s && songLocked(s)) { $("#song").innerHTML = `<div class="card soon"><div class="ic">🔒</div><h2><span class="et">${esc(s.title)}</span> «${esc(s.ru)}»</h2><p class="muted">Бонусная песня открывается в магазине за ✦ ${BONUS_SONGS[s.n]}.</p><a class="btn gold" href="#/магазин">В магазин</a></div>`; return; }
  if (!s) { $("#song").innerHTML = `<div class="card soon"><h2>Такой песни нет</h2><a class="btn gold" href="#/песни">Все песни</a></div>`; return; }
  const showRu = localStorage.getItem("etoilal-song-ru") !== "0";
  const body = s.sung
    ? `<div class="kara" id="kara">${s.sung.map((l, i) => `${i === 0 || s.sung[i - 1].part !== l.part ? `<div class="spart">${esc(l.part)}</div>` : ""}
        <div class="sl" data-i="${i}" data-t="${l.w.length ? l.w[0][1] : 0}"><div class="set">${wordsHtml(l.et, l.w)}</div><div class="sru">${esc(l.ru)}</div></div>`).join("")}</div>`
    : `<div class="kara">${s.parts.map((p) => `<div class="spart">${esc(p.part)}${p.note ? ` <i class="muted">— ${esc(p.note)}</i>` : ""}</div>${p.lines.map((l) =>
        `<div class="sl"><div class="set">${playBtn(l.et.replace(/[()]/g, ""), 1)} ${wordsHtml(l.et)}</div><div class="sru">${esc(l.ru)}</div></div>`).join("")}`).join("")}</div>`;
  $("#song").innerHTML = `<a class="muted" href="#/песни">← Все песни</a><div class="k" style="margin-top:10px">Песня ${s.n}</div><h1 class="page"><span class="et" style="font-size:inherit">${esc(s.title)}</span> <i>«${esc(s.ru)}»</i></h1>
    ${s.about ? `<p class="lead">${esc(s.about.replace(/\*\*/g, ""))}</p>` : ""}
    <div class="row sctl"><label class="gltog"><input type="checkbox" id="sru" ${showRu ? "checked" : ""}> перевод</label>${s.audio ? "" : `<span class="muted">Записи пока нет — строки читает голос браузера ▶</span>`}</div>
    ${s.audio ? `<div class="card splayer"><button class="play" id="splay">▶</button><input type="range" id="sseek" min="0" max="1000" value="0"><span class="muted" id="stime">0:00</span><audio id="saudio" src="${s.audio}" preload="metadata"></audio></div><div class="aud-note" style="margin:-6px 0 10px">🎵 Песня сгенерирована нейросетью — возможны неточности в произношении</div>` : ""}
    <div class="card${showRu ? "" : " noru"}" id="stext">${body}</div>`;
  $("#sru").onchange = (e) => { localStorage.setItem("etoilal-song-ru", e.target.checked ? "1" : "0"); $("#stext").classList.toggle("noru", !e.target.checked); };
  bindSongWords();
  if (!s.audio) return;
  const a = $("#saudio"), fmt = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
  const words = [...document.querySelectorAll("#kara .sw")], lines = [...document.querySelectorAll("#kara .sl")];
  let curLine = -1;
  const tick = () => {
    const t = a.currentTime;
    if (a.duration) { $("#sseek").value = Math.round(t / a.duration * 1000); $("#stime").textContent = fmt(t) + " / " + fmt(a.duration); }
    for (const w of words) { const s0 = +w.dataset.s, e0 = +w.dataset.e; w.classList.toggle("on", t >= s0 && t < e0 + .05); w.classList.toggle("past", t >= e0 + .05); }
    let li = -1; lines.forEach((l, i) => { if (t + .3 >= +l.dataset.t) li = i; });
    if (li !== curLine) { lines.forEach((l, i) => l.classList.toggle("cur", i === li)); curLine = li;
      if (li >= 0 && !a.paused) { const r = lines[li].getBoundingClientRect(); if (r.top < 140 || r.bottom > innerHeight - 120) window.scrollTo({ top: r.top + scrollY - innerHeight / 3, behavior: "smooth" }); } }
    if (!a.paused) songRaf = requestAnimationFrame(tick);
  };
  $("#splay").onclick = () => { if (a.paused) a.play(); else a.pause(); };
  a.onplay = () => { $("#splay").textContent = "❚❚"; cancelAnimationFrame(songRaf); tick(); };
  a.onpause = () => { $("#splay").textContent = "▶"; cancelAnimationFrame(songRaf); };
  a.onloadedmetadata = tick; a.onseeked = tick;
  $("#sseek").oninput = (e) => { if (a.duration) a.currentTime = e.target.value / 1000 * a.duration; };
  $("#kara").addEventListener("click", (e) => { if (e.target.closest(".sw")) return; const l = e.target.closest(".sl"); if (l) { a.currentTime = +l.dataset.t; a.play(); } });
  window.addEventListener("hashchange", () => { a.pause(); cancelAnimationFrame(songRaf); }, { once: true });
}
function bindSongWords(box = $("#stext")) {      // наведение — перевод, щелчок — разбор слова (песни, библиотека, тексты)

  box.addEventListener("mouseover", (e) => {
    const w = e.target.closest(".sw"); if (!w || w.title) return;
    w.title = wordInfo(w.textContent).map((x) => x.mean ? `${x.w} — ${x.mean}` : x.w).join(" · ");
  });
  box.addEventListener("click", (e) => {
    const w = e.target.closest(".sw"); if (!w) return; e.stopPropagation(); closePop();
    const info = wordInfo(w.textContent);
    pop = document.createElement("div"); pop.className = "pop wpop";
    pop.innerHTML = info.map((x) => `<div class="wpi"><div class="row"><b class="et" style="font-size:22px">${esc(x.w)}</b>${playBtn(x.w, 1)}</div>
      <div class="rd">«${esc(rd(x.w))}»${x.pos ? " · " + esc(x.pos) : ""}</div>
      ${x.mean ? `<div>${esc(x.mean)}</div>` : `<div class="muted">нет в словаре</div>`}
      ${x.form ? `<div class="muted">форма глагола <span class="et">${esc(x.lemma)}</span>: ${esc(x.form)}</div>` : ""}
      ${x.lemma ? `<button class="btn sm" data-my="${esc(x.lemma)}">${Store.hasWord(x.lemma) ? "★ в карточках" : "☆ в карточки"}</button>` : ""}</div>`).join("");
    document.body.appendChild(pop); const r = w.getBoundingClientRect();
    pop.style.top = r.bottom + scrollY + 6 + "px"; pop.style.left = Math.max(16, Math.min(r.left + scrollX, document.documentElement.clientWidth - pop.offsetWidth - 16)) + "px";
    pop.addEventListener("click", (ev) => { ev.stopPropagation(); const sb = ev.target.closest("[data-say]"); if (sb) { speak(sb.dataset.say); return; } const m = ev.target.closest("[data-my]"); if (m) { const on = Store.toggleWord(m.dataset.my); m.textContent = on ? "★ в карточках" : "☆ в карточки"; toast(on ? "Добавил в карточки" : "Убрал из карточек"); } });
  });
}
