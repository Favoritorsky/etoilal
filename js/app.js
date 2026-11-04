// Etoilal — приложение: маршруты #/…, шапка и нижние вкладки, страницы. Данные: ET_DICT, ET_PHRASES, ET_TOC, ET_TR_B64.
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("show"), 1600); }

// ---------------------------------------------------------------- озвучка: записи курса (ET_AUDIO_C), слова словаря (ET_AUDIO), иначе голос браузера
function speak(text) {
  const low = text.toLowerCase().trim(), C = window.ET_AUDIO_C || {};
  const A = window.ET_AUDIO_A || {};                 // записи раздела «Альтернативное обучение» (tools/build_alt_audio.py)
  const K = window.ET_AUDIO_C2 || {};                // записи нового самоучителя (tools/build_course2_audio.py)
  const s = low.replace(/[.!?]+$/, "");
  const f = K[low] || K[s] || C[low] || C[s] || A[low] || A[s] || (window.ET_AUDIO && window.ET_AUDIO[s]);
  if (f) { new Audio(f).play().catch(() => speakTTS(text)); return; }
  speakTTS(text);
}
function speakTTS(text) {
  if (!("speechSynthesis" in window)) { toast("Озвучка недоступна в этом браузере"); return; }
  const u = new SpeechSynthesisUtterance(text.replace(/'/g, "")); u.lang = "fr-FR"; u.rate = .9;
  const v = speechSynthesis.getVoices().find((x) => /^fr/i.test(x.lang)); if (v) u.voice = v;
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}
document.addEventListener("click", (e) => { const b = e.target.closest("[data-say]"); if (b) { e.preventDefault(); e.stopPropagation(); speak(b.dataset.say); } });
const rd = (t) => { try { return reading(t); } catch (e) { return ""; } };
const playBtn = (t, sm) => `<button class="play${sm ? " sm" : ""}" data-say="${esc(t)}" title="Послушать">▶</button>`;

// ---------------------------------------------------------------- переводчик (данные распаковываются один раз)
let TR_READY = null;
function trReady() {
  if (!TR_READY) TR_READY = (async () => {
    const bin = Uint8Array.from(atob(window.ET_TR_B64), (c) => c.charCodeAt(0));
    const txt = await new Response(new Blob([bin]).stream().pipeThrough(new DecompressionStream("gzip"))).text();
    init(JSON.parse(txt));
    for (const [k, v] of Object.entries(Store.get().senses)) choose(k, v);
  })();
  return TR_READY;
}

// ---------------------------------------------------------------- меню
const NAV = [["главная", "Главная", "🏠"], ["учиться", "Учиться", "📖"], ["словарь", "Словарь", "📚"], ["карточки", "Карточки", "🃏"], ["переводчик", "Переводчик", "⇄"],
  ["проверка", "Проверь текст", "✅"], ["справочник", "Справочник", "📐"], ["песни", "Песни", "🎤"], ["библиотека", "Библиотека", "📜"]];
const TABS = [["главная", "Главная", "🏠"], ["учиться", "Учиться", "📖"], ["проверка", "Проверка", "✅"], ["переводчик", "Перевод", "⇄"], ["ещё", "Ещё", "☰"]];
// каждая вкладка меню помнит, где ты в ней был (урок, слово в словаре, загадку…): вкладка ведёт туда; повторное нажатие на
// уже открытую вкладку — к её началу. Хранится в браузере, переживает перезаход на сайт.
let TAB_LAST = {}; try { TAB_LAST = JSON.parse(localStorage.getItem("etoilal-tabs") || "{}"); } catch (e) {}
function tabRemember(navId, raw) {
  TAB_LAST[navId] = "#/" + raw; if (!TABS.some((x) => x[0] === navId)) TAB_LAST["ещё"] = "#/" + raw;
  try { localStorage.setItem("etoilal-tabs", JSON.stringify(TAB_LAST)); } catch (e) {}
}
const tabHref = (id, cur) => (id === cur || id === "главная" || !TAB_LAST[id] ? "#/" + id : TAB_LAST[id]);
function renderNav(cur) {
  const st = Store.streak(), pts = Store.get().points;
  $("#topnav").innerHTML = `<a class="logo" href="#/главная">✦ Etoil<b>al</b></a>` +
    NAV.map(([id, t]) => `<a class="nl${id === cur ? " on" : ""}" href="${esc(tabHref(id, cur))}">${t}</a>`).join("") +
    `<div class="sp"></div><span class="chip f" title="Дней подряд">🔥 ${st}</span><span class="chip" title="Очки">✦ ${pts}</span>` +
    (Cloud.user() ? `<a class="chip cl nk" href="#/профиль" title="Профиль · прогресс в облаке">👤 ${esc(Cloud.user().nick)}</a>`
      : `<a class="chip cl" href="#/вход" title="Войти: прогресс на всех устройствах">☁ Войти</a><a class="chip" href="#/профиль" title="Профиль">👤</a>`);
  const moreOn = !TABS.some((x) => x[0] === cur);
  $("#tabbar").innerHTML = TABS.map(([id, t, i]) => `<a class="${id === cur || (id === "ещё" && moreOn) ? "on" : ""}" href="${esc(id === "ещё" ? (moreOn ? "#/ещё" : TAB_LAST["ещё"] || "#/ещё") : tabHref(id, cur))}"><i>${i}</i>${t}</a>`).join("");
}

// ---------------------------------------------------------------- главная
function dayIndex(n) { const d = new Date(); const k = d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate(); return k % n; }
function sections() {                         // разделы нового самоучителя (ET_C2I) → строки ET_TOC
  return ET_C2I.sections.map((_, k) => ET_TOC.filter((l) => (ET_C2I.lessons.find((x) => x.n === l[0]) || {}).sec === k));
}
const SECTION_NAMES = ET_C2I.sections;
function pageHome() {
  const S = Store.get(), done = (n) => S.lessons[n] && S.lessons[n].stars > 0;
  const next = (ET_TOC.find((l) => !done(l[0])) || ET_TOC[0]);
  const secs = sections();
  const curSec = secs.findIndex((s) => s.some((l) => l[0] === next[0]));
  const ph = ET_PHRASES[dayIndex(ET_PHRASES.length)];
  const words = ET_DICT.words.filter((w) => w[4] && w[4] < 1200 && w[1] === "n");
  const wd = words[dayIndex(words.length)];
  const mapHtml = secs.map((s, k) => {
    const cls = "ucard" + (k === curSec ? " cur" : k > curSec ? " lockd" : "");
    const nDone = s.filter((l) => done(l[0])).length;
    const dots = s.map((l) => `<a href="#/урок/${l[0]}" class="${done(l[0]) ? "d" : l[0] === next[0] ? "c" : ""}" title="${esc(l[0] + ". " + l[1])}">${done(l[0]) ? "★" : l[0] === next[0] ? "▶" : l[0]}</a>`).join("");
    const note = nDone === s.length ? `${nDone} / ${s.length} ★ · пройден` : k === curSec ? `урок ${nDone + 1} из ${s.length}` : k > curSec ? "откроется после предыдущего раздела" : `${nDone} / ${s.length}`;
    return `<div class="${cls}"><small>Раздел ${k + 1}</small><b>${SECTION_NAMES[k] || "Раздел " + (k + 1)}</b><div class="dots">${dots}</div><div class="mini">${note}</div></div>`;
  }).join("");
  const task = Math.min(S.myWords.length, 10);
  return `<div class="home"><div>
    <div class="unit"><div><small>Раздел ${curSec + 1} · урок ${next[0]}</small><b>${esc(next[1])}</b></div><a class="btn" href="#/справочник">📖 Справочник</a></div>
    <div class="map">${mapHtml}</div>
    <div class="card" style="margin-top:16px"><h3>Сейчас: урок ${next[0]} «${esc(next[1])}»</h3>
      <div class="muted">${next[2].length ? "Новые слова: <span class='et' style='font-size:17px'>" + next[2].map(esc).join(", ") + "</span>" : next[3] ? "Проверь себя по прошлым урокам" : next[0] === 1 ? "Первые слова и фразы — начни отсюда" : "Объяснение, примеры и задания"}</div>
      <div style="margin-top:14px"><a class="btn gold" href="#/урок/${next[0]}">Начать урок ▶</a></div></div>
    <div class="tools">
      <a class="card tool" href="#/переводчик"><div class="ic">⇄</div><b>Переводчик</b><span>Русский ⇄ Etoilal, 9 000 слов</span></a>
      <a class="card tool" href="#/проверка"><div class="ic">✅</div><b>Проверь текст</b><span>Найдёт ошибки и объяснит</span></a>
      <a class="card tool" href="#/словарь"><div class="ic">📚</div><b>Словарь</b><span>${ET_DICT.words.length.toLocaleString("ru")} слов с чтением</span></a>
      <a class="card tool" href="#/справочник"><div class="ic">📐</div><b>Справочник</b><span>Грамматика и спряжение</span></a>
    </div></div>
  <aside class="rail">
    <div class="stats"><div class="st">🔥 ${Store.streak()}<small>дней</small></div><div class="st">✦ ${S.points}<small>очков</small></div><div class="st">💎 ${S.chests}<small>сундука</small></div></div>
    ${dailyCard()}
    <div class="card"><div class="row"><h3 style="margin:0">Фраза дня</h3>${playBtn(ph[0])}</div>
      <div class="ph" style="margin-top:8px">${esc(ph[0])}</div><div class="rd">${esc(rd(ph[0]))}</div><div class="muted" style="margin-top:4px">${esc(ph[2])}</div></div>
    <div class="card"><div class="k">Слово дня</div><div class="row"><div class="ph" style="font-size:34px">${esc(wd[0])}</div>${playBtn(wd[0])}</div>
      <div class="muted">${esc(wd[2])} · «${esc(wd[3] || rd(wd[0]))}»</div></div>
    <div class="card"><h3>✅ Проверь свой текст</h3><div class="muted">Je <span class="err">pa savem</span> → Je <span class="fix">savem pa</span></div>
      <div style="margin-top:12px"><a class="btn gold" href="#/проверка">Проверить свой текст</a></div></div>
    <div id="ctop"></div>
  </aside></div>`;
}

// ---------------------------------------------------------------- словарь
const POS = { n: "сущ.", v: "глагол", a: "прил.", adv: "нареч.", name: "имя", lang: "язык", f: "служебное", num: "число" };
const norm = (s) => s.toLowerCase().replace(/ё/g, "е").trim();
let dictState = { q: "", pos: "", shown: 60, open: null };
function dictSearch(q, pos) {
  const W = ET_DICT.words; q = norm(q);
  if (!q) return W.filter((w) => !pos || w[1] === pos).sort((a, b) => (a[4] || 99999) - (b[4] || 99999));
  const cyr = /[а-я]/.test(q), res = [];
  for (const w of W) {
    if (pos && w[1] !== pos) continue;
    let score = -1;
    if (cyr) {
      const ms = norm(w[2]).split(/[,;()]/).map((x) => x.trim());
      if (ms.includes(q)) score = 0; else if (ms.some((m) => m.startsWith(q))) score = 1; else if (norm(w[2]).includes(q)) score = 2;
      else if (w[3] && norm(w[3]).startsWith(q)) score = 3;
    } else {
      const lw = w[0].toLowerCase();
      if (lw === q) score = 0; else if (lw.startsWith(q)) score = 1; else if (lw.includes(q)) score = 2;
    }
    if (score >= 0) res.push([score, w[4] || 99999, w]);
  }
  return res.sort((a, b) => a[0] - b[0] || a[1] - b[1]).map((x) => x[2]);
}
function wordCard(w) {
  const ex = (ET_DICT.exidx[w[0].toLowerCase()] || []).slice(0, 4).map((k) => ET_DICT.examples[k]);
  const der = ET_DICT.words.filter((x) => x[5] && x[5].startsWith(w[0] + " +")).slice(0, 8);
  return `<div class="card wd"><div class="row"><div><div class="big">${esc(w[0])}</div><div class="rd">«${esc(w[3] || rd(w[0]))}» · ${POS[w[1]] || w[1]}</div></div>
    <div class="row">${playBtn(w[0])}<button class="btn sm" data-my="${esc(w[0])}">${Store.hasWord(w[0]) ? "★ в карточках" : "☆ в карточки"}</button></div></div>
    <div style="font-size:19px;margin-top:10px">${esc(w[2])}</div>
    ${w[5] ? `<div class="muted" style="margin-top:6px">Образовано по правилам: ${esc(w[5])}</div>` : ""}
    <div class="aud-note">🔊 Аудио синтезировано — возможны неточности</div>
    ${der.length ? `<div style="margin-top:10px"><span class="muted">Родственные: </span>${der.map((d) => `<span class="tag"><span class="et">${esc(d[0])}</span> — ${esc(d[2])}</span>`).join("")}</div>` : ""}
    ${ex.length ? `<div style="margin-top:12px"><div class="k">Примеры из курса</div>${ex.map((e) => `<div class="ex"><span class="et">${esc(e[0])}</span> ${playBtn(e[0], 1)}<div class="muted">${esc(e[2])}</div></div>`).join("")}</div>` : ""}</div>`;
}
function pageDict() {
  return `<div class="k">Словарь</div><h1 class="page">Все слова <i>Etoilal</i></h1>
  <p class="lead">${ET_DICT.words.length.toLocaleString("ru")} слов — все слова языка: обычные и образованные по правилам, служебные (артикли, местоимения, предлоги, союзы), числа, имена и языки. Ищи по-русски или на этуале.</p>
  <div class="dhead"><input class="in" id="dq" placeholder="Например: звезда, или etoil" value="${esc(dictState.q)}" autocomplete="off">
  <div class="seg" id="dpos">${[["", "все"], ["n", "сущ."], ["v", "глаголы"], ["a", "прил."], ["adv", "нареч."], ["f", "служебные"], ["num", "числа"], ["name", "имена"], ["lang", "языки"]].map(([p, t]) => `<button data-p="${p}" class="${p === dictState.pos ? "on" : ""}">${t}</button>`).join("")}</div></div>
  <div id="dres"></div>`;
}
function dictRender() {
  const res = dictSearch(dictState.q, dictState.pos);
  const list = res.slice(0, dictState.shown);
  const open = dictState.open && res.find((w) => w[0] === dictState.open);
  $("#dres").innerHTML = (open ? wordCard(open) + "<div style='height:14px'></div>" : "") +
    (res.length ? `<div class="muted" style="margin-bottom:8px">Найдено: ${res.length.toLocaleString("ru")}</div>` : `<div class="card muted">Ничего не нашлось. Попробуй другое слово или <a class="et" href="#/переводчик">переводчик</a>.</div>`) +
    `<div class="dlist">${list.map((w) => `<div class="card wrow" data-w="${esc(w[0])}"><div class="txt"><div class="w">${esc(w[0])}</div>
      <div class="m">${esc(w[2])}</div><div class="r">«${esc(w[3] || rd(w[0]))}» · ${POS[w[1]] || w[1]}${w[5] ? " · по правилам" : ""}</div></div>${playBtn(w[0], 1)}</div>`).join("")}</div>` +
    (res.length > list.length ? `<div class="more"><button class="btn" id="dmore">Показать ещё</button></div>` : "");
}
function bindDict() {
  trReady().then(dictRender); dictRender();
  let t; $("#dq").addEventListener("input", (e) => { clearTimeout(t); t = setTimeout(() => { dictState.q = e.target.value; dictState.shown = 60; dictState.open = null; dictRender(); }, 120); });
  $("#dpos").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; dictState.pos = b.dataset.p; dictState.shown = 60; $("#dpos").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b)); dictRender(); });
  $("#dres").addEventListener("click", (e) => {
    const my = e.target.closest("[data-my]"); if (my) { const on = Store.toggleWord(my.dataset.my); toast(on ? "Добавил в карточки" : "Убрал из карточек"); dictRender(); renderNav("словарь"); return; }
    if (e.target.id === "dmore") { dictState.shown += 60; dictRender(); return; }
    const r = e.target.closest(".wrow"); if (r) { dictState.open = r.dataset.w; dictRender(); window.scrollTo({ top: $("#dres").offsetTop - 90, behavior: "smooth" }); }
  });
}

// ---------------------------------------------------------------- переводчик
let trDir = "ru", trItems = [];
const TR_EX = { ru: ["Привет! Как дела?", "Я живу в Москве, а мой друг — в Париже.", "Мне 15 лет.", "Скачай этот файл и отправь его мне.", "Ночь тиха, и звёзды поют.", "Если бы я мог, я бы полетел к звёздам."],
  et: ["Salu! Koman tu ales?", "Je to emem.", "Le nui eset trankil e lez etoil chantel.", "Yer je trouvim le livr dans le mezon gran.", "Etoilal eset le lang le plu joli dans le mond."] };
function pageTranslate() {
  return `<div class="k">Переводчик</div><h1 class="page">Русский <i>⇄</i> Etoilal</h1>
  <p class="lead">Опечатки исправляются сами, цифры остаются цифрами, страны и города узнаются. Слова с точечным подчёркиванием — нажми и выбери другой смысл.</p>
  <div class="row" style="margin-bottom:12px;justify-content:flex-start;flex-wrap:wrap"><div class="seg" id="trdir"><button data-d="ru">Русский → Etoilal</button><button data-d="et">Etoilal → Русский</button></div>
  <button class="btn sm" id="trreset" hidden>Сбросить выбор смыслов</button></div>
  <div class="two"><div class="card"><textarea class="in" id="trsrc" spellcheck="false"></textarea><div class="exs" id="trex"></div></div>
  <div class="card"><div class="row"><div class="k" id="trdst">Etoilal</div><div class="row"><button class="btn sm" id="trsay">▶ Послушать</button><button class="btn sm" id="trcopy">Копировать</button></div></div>
  <div class="out" id="trout"><span class="dim">Здесь будет перевод.</span></div><div class="rd" id="trread" style="margin-top:8px"></div><div id="trnotes"></div></div></div>`;
}
let trLast = "";
async function trRun() {
  await trReady();
  const text = $("#trsrc").value; try { localStorage.setItem("etoilal-tr-" + trDir, text); } catch (e) {}
  $("#trreset").hidden = !Object.keys(Store.get().senses).length;
  if (!text.trim()) { $("#trout").innerHTML = '<span class="dim">Здесь будет перевод.</span>'; $("#trread").textContent = ""; $("#trnotes").innerHTML = ""; trLast = ""; return; }
  if (trDir === "et") {
    const r = back(text); trLast = r.text; $("#trout").className = "out ru"; $("#trout").textContent = r.text;
    $("#trread").textContent = "Как читать исходник: " + reading(text);
    $("#trnotes").innerHTML = r.unknown.length ? `<div class="note unk">Не узнал: ${r.unknown.map((w) => `<span class="tag">${esc(w)}</span>`).join("")}</div>` : "";
    return;
  }
  const res = translate(text); trLast = render(res); trItems = []; $("#trout").className = "out";
  const senses = Store.get().senses;
  $("#trout").innerHTML = res.parts.map((p) => p.items.map((it) => {
    const k = trItems.push(it) - 1, chosen = it.alts && it.alts.some((a) => senses[a.key] !== undefined);
    const cls = "w" + (it.unk ? " unk" : "") + (it.name ? " name" : "") + (it.alts ? (chosen ? " chosen" : " alt") : "");
    const tip = it.unk ? "нет в словаре" : it.alts ? "← " + it.src + " · нажми, чтобы выбрать другой смысл" : it.src ? "← " + it.src : "грамматика Etoilal";
    return `<span class="${cls}" data-k="${k}" title="${esc(tip)}">${esc(it.t)}</span>${esc(it.punct || "")}`;
  }).join(" ") + esc(p.end)).join(" ");
  $("#trread").textContent = "Как читать: " + reading(trLast);
  let n = "";
  if (res.fixes.length) n += `<div class="note fixn">Исправил опечатки: ${res.fixes.map(([a, b]) => `<span class="tag"><s>${esc(a)}</s> → ${esc(b)}</span>`).join("")}</div>`;
  if (res.unknown.length) n += `<div class="note unk">Нет в словаре (оставил как есть): ${res.unknown.map((w) => `<span class="tag">${esc(w)}</span>`).join("")}</div>`;
  $("#trnotes").innerHTML = n;
}
let pop = null; const closePop = () => { if (pop) { pop.remove(); pop = null; } };
function bindTranslate() {
  const setDir = (d) => {
    trDir = d; $("#trdir").querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.d === d));
    $("#trdst").textContent = d === "ru" ? "Etoilal" : "Русский"; $("#trsay").hidden = d === "et";
    $("#trsrc").placeholder = d === "ru" ? "Напиши по-русски — перевод появится сразу." : "Вставь текст на Etoilal — переведу на русский (черновой перевод).";
    try { $("#trsrc").value = localStorage.getItem("etoilal-tr-" + d) || ""; } catch (e) {}
    $("#trex").innerHTML = TR_EX[d].map((x) => `<button>${esc(x)}</button>`).join(""); trRun();
  };
  $("#trdir").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) setDir(b.dataset.d); });
  $("#trex").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { $("#trsrc").value = b.textContent; trRun(); } });
  let t; $("#trsrc").addEventListener("input", () => { clearTimeout(t); t = setTimeout(trRun, 160); });
  $("#trcopy").onclick = () => { if (trLast) navigator.clipboard.writeText(trLast).then(() => toast("Скопировано")); };
  $("#trsay").onclick = () => { if (trLast) speak(trLast); };
  $("#trreset").onclick = () => { Store.clearSenses(); TR_READY = null; trRun(); toast("Выбор смыслов сброшен"); };
  $("#trout").addEventListener("click", (ev) => {
    const el = ev.target.closest(".w"); if (!el) return; const it = trItems[+el.dataset.k]; if (!it || !it.alts) return;
    ev.stopPropagation(); closePop(); pop = document.createElement("div"); pop.className = "pop";
    pop.innerHTML = `<div class="ttl">«${esc(it.src)}» — другой смысл:</div><button class="cur"><b>${esc(it.t)}</b><small>сейчас</small></button>` +
      it.alts.map((a, i) => `<button data-i="${i}"><b>${esc(a.w)}</b><small>${esc(a.m)}</small></button>`).join("");
    document.body.appendChild(pop); const r = el.getBoundingClientRect();
    pop.style.top = r.bottom + scrollY + 6 + "px"; pop.style.left = Math.max(16, Math.min(r.left + scrollX, document.documentElement.clientWidth - pop.offsetWidth - 16)) + "px";
    pop.addEventListener("click", (e2) => { const b = e2.target.closest("button"); if (!b) return; e2.stopPropagation();
      if (b.dataset.i !== undefined) { const a = it.alts[+b.dataset.i]; Store.setSense(a.key, a.val); choose(a.key, a.val); toast("Запомнил: " + it.src + " → " + a.w); }
      closePop(); trRun(); });
  });
  setDir(trDir);
}
document.addEventListener("click", closePop);

// ---------------------------------------------------------------- «Проверь свой текст»
const CK_EX = ["Je pa savem koi fezer.", "Il tre joli.", "Le ami chantet un chanson.", "Je chantet avek le joli fleur.", "Ma ami chantel e je danset.", "Yer je trouvit le livr dans le mezon.", "Tu eses ma etoil."];
function pageCheck() {
  return `<div class="k">Проверь свой текст</div><h1 class="page">Найду ошибки и <i>объясню</i></h1>
  <p class="lead">Напиши что-нибудь на Etoilal. Я подчеркну ошибки, объясню каждую и исправлю в один щелчок. Внизу — как это читается и что получилось по-русски.</p>
  <div class="two"><div class="card"><textarea class="in" id="cksrc" spellcheck="false" placeholder="Например: Je pa savem koi fezer."></textarea>
    <div class="exs" id="ckex">${CK_EX.map((x) => `<button>${esc(x)}</button>`).join("")}</div></div>
  <div class="card"><div class="row"><div class="k" id="ckstat">Результат</div><button class="btn sm gold" id="ckall" hidden>Исправить всё</button></div>
    <div class="out" id="ckout" style="font-size:20px"><span class="dim">Здесь появится твой текст с подсказками.</span></div>
    <div id="cklist"></div>
    <div id="ckmore" hidden><div class="k" style="margin-top:14px">Как читается</div><div class="rd" id="ckread"></div>
    <div class="k" style="margin-top:12px">Что получилось по-русски</div><div class="muted" id="ckru"></div></div></div></div>`;
}
let ckIss = [];
async function ckRun() {
  await trReady();
  const text = $("#cksrc").value; try { localStorage.setItem("etoilal-check", text); } catch (e) {}
  if (!text.trim()) { $("#ckout").innerHTML = '<span class="dim">Здесь появится твой текст с подсказками.</span>'; $("#cklist").innerHTML = ""; $("#ckmore").hidden = true; $("#ckall").hidden = true; $("#ckstat").textContent = "Результат"; return; }
  ckIss = Checker.check(text);
  const hard = ckIss.filter((x) => !x.soft);
  let html = "", pos = 0;
  ckIss.forEach((it, k) => { html += esc(text.slice(pos, it.a)) + `<span class="${it.soft ? "ck-soft" : "ck-err"}" data-i="${k}" title="${esc(it.title)}">${esc(text.slice(it.a, it.b))}</span>`; pos = it.b; });
  html += esc(text.slice(pos));
  $("#ckout").innerHTML = html.replace(/\n/g, "<br>");
  $("#ckstat").textContent = hard.length ? `Ошибок: ${hard.length}` + (ckIss.length > hard.length ? ` · подсказок: ${ckIss.length - hard.length}` : "") : ckIss.length ? "Ошибок нет · есть подсказка" : "Ошибок нет ✦";
  $("#ckall").hidden = hard.filter((x) => x.fix != null).length < 2;
  $("#cklist").innerHTML = ckIss.length ? ckIss.map((it, k) => `<div class="note ${it.soft ? "" : "unk"} ck-item" data-i="${k}"><div class="row"><b>${esc(it.title)}</b>
      ${it.fix != null ? `<button class="btn sm" data-fix="${k}">«${esc(text.slice(it.a, it.b))}» → «${esc(it.fix)}»</button>` : ""}</div>
      <div class="muted" style="margin-top:4px">${esc(it.why)}</div>
      ${it.alts && it.alts.length > 1 ? `<div style="margin-top:6px">${it.alts.slice(1).map((a) => `<button class="btn sm" data-alt="${k}" data-v="${esc(a)}">${esc(a)}</button>`).join(" ")}</div>` : ""}</div>`).join("")
    : `<div class="note fixn">Отлично — я не нашёл ни одной ошибки. ✦ +5 очков</div>`;
  if (!ckIss.length && text !== ckRun.lastOk) { ckRun.lastOk = text; Store.get().checksOk = (Store.get().checksOk || 0) + 1; Store.addPoints(5); renderNav("проверка"); }
  const fixed = Checker.apply(text, hard);
  $("#ckmore").hidden = false; $("#ckread").textContent = rd(fixed); $("#ckru").textContent = back(fixed).text;
}
function bindCheck() {
  try { $("#cksrc").value = localStorage.getItem("etoilal-check") || ""; } catch (e) {}
  let t; $("#cksrc").addEventListener("input", () => { clearTimeout(t); t = setTimeout(ckRun, 250); });
  $("#ckex").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { $("#cksrc").value = b.textContent; ckRun(); } });
  const put = (s) => { $("#cksrc").value = s; ckRun(); };
  $("#cklist").addEventListener("click", (e) => {
    const f = e.target.closest("[data-fix]"); if (f) { put(Checker.apply($("#cksrc").value, [ckIss[+f.dataset.fix]])); toast("Исправил"); return; }
    const a = e.target.closest("[data-alt]"); if (a) { const it = ckIss[+a.dataset.alt]; put(Checker.apply($("#cksrc").value, [{ ...it, fix: a.dataset.v }])); }
  });
  $("#ckout").addEventListener("click", (e) => { const sp = e.target.closest("[data-i]"); if (!sp) return; const el = $(`.ck-item[data-i="${sp.dataset.i}"]`); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); });
  $("#ckall").onclick = () => { put(Checker.apply($("#cksrc").value, ckIss.filter((x) => !x.soft))); toast("Исправил всё"); };
  ckRun();
}

// ---------------------------------------------------------------- профиль и «ещё»
function pageMore() {
  const items = [["учиться", "📖", "Самоучитель", ET_TOC.length + " уроков с озвучкой"], ["альтернатива", "🧠", "Альтернативное обучение", "весь язык сразу: шпаргалка, тексты, загадки"], ["экспресс", "⚡", "Экспресс-курс", "10 экранов, 15 минут"], ["карточки", "🃏", "Карточки", "повторение слов"], ["тренировки", "🎯", "Тренировки", "на время, на слух, произношение"], ["словарь", "📚", "Словарь", "все слова"], ["справочник", "📐", "Справочник", "грамматика"],
    ["песни", "🎤", "Песни", "караоке"], ["библиотека", "📜", "Библиотека", "рассказы"], ["полезное", "💬", "Полезное", "фразы по ситуациям"], ["тексты", "✍", "Тексты", "переведи — я проверю"], ["о-языке", "✦", "О языке", "история"], ["профиль", "👤", "Профиль", "звания и достижения"], ["вход", "☁", "Аккаунт", "прогресс на всех устройствах"], ["магазин", "🛍", "Магазин", "темы, песни, секреты"]];
  return `<h1 class="page">Ещё</h1><div class="tools">${items.map(([h, i, t, s]) => `<a class="card tool" href="#/${h}"><div class="ic">${i}</div><b>${t}</b><span>${s}</span></a>`).join("")}</div>`;
}
// профиль, достижения и магазин — js/profile.js
const soon = (ic, t, s) => () => `<div class="card soon"><div class="ic">${ic}</div><h2>${t}</h2><p class="muted">${s}</p><a class="btn gold" href="#/главная">На главную</a></div>`;

// ---------------------------------------------------------------- маршруты
const PAGES = {
  "главная": [pageHome], "словарь": [pageDict, bindDict], "переводчик": [pageTranslate, bindTranslate], "ещё": [pageMore], "профиль": [pageProfile, bindProfile],
  "учиться": [c2PageLearn], "урок": [c2PageLesson, c2BindLesson], "экспресс": [pageExpress, bindExpress],
  "тренировки": [pageTrain, bindTrain],
  "карточки": [(a) => a[0] ? pageCardSession(a) : pageCards(), (a) => a[0] && bindCardSession(a)],
  "проверка": [pageCheck, bindCheck],
  "справочник": [pageRef, bindRef],
  "песни": [pageSongs, bindSongs], "библиотека": [pageLibrary, bindLibrary], "полезное": [pageUseful, bindUseful], "тексты": [pageTexts, bindTexts],
  "магазин": [pageShop, bindShop], "секрет": [pageSecret, bindSecret],
  "о-языке": [pageAbout],
  "альтернатива": [altPage, altBind],
  "вход": [cloudPageLogin, cloudBindLogin], "игрок": [cloudPagePlayer, cloudBindPlayer],
};
// Открытые страницы запоминаются: при переходе в другой раздел страница не уничтожается, а откладывается (вместе с ответами,
// введённым текстом, открытыми блоками и прокруткой) и при возвращении показывается как была. Главная, профиль, карточки,
// тренировки и т.п. всегда рисуются заново (там данные меняются). Прямой вызов route() (кнопки «Ещё раз», смена темы) — заново.
const PAGE_KEEP = new Set(["урок", "альтернатива", "переводчик", "проверка", "словарь", "тексты", "справочник", "полезное", "библиотека", "о-языке", "экспресс"]);
const PAGE_CACHE = new Map();                          // ключ (адрес) → { el, y, onShow }
const PageHook = { onShow: null };                      // страница может сказать, что сделать при возвращении к ней (урок — доска шпаргалок)
let pageKey = null;
async function route(fromNav) {
  closePop();
  const raw = decodeURIComponent(location.hash.replace(/^#\/?/, "")), parts = raw.split("/");
  const id = PAGES[parts[0]] ? parts[0] : "главная", key = id + "/" + parts.slice(1).join("/");
  const [view, bind] = PAGES[id];
  const app = $("#app"), cur = [...app.childNodes];       // вся страница целиком (некоторые страницы перерисовывают #app сами)
  if (cur.length && pageKey && PAGE_KEEP.has(pageKey.split("/")[0]) && pageKey !== key) {        // отложить уходящую страницу
    app.querySelectorAll("audio, video").forEach((m) => { try { m.pause(); } catch (e) {} });
    PAGE_CACHE.delete(pageKey); PAGE_CACHE.set(pageKey, { el: cur, y: scrollY, onShow: PageHook.onShow });
    while (PAGE_CACHE.size > 15) PAGE_CACHE.delete(PAGE_CACHE.keys().next().value);
  }
  PageHook.onShow = null;
  const navId = ["урок", "экспресс", "тренировки", "альтернатива"].includes(id) ? "учиться" : id;
  if (id !== "ещё") tabRemember(navId, raw || "главная");
  renderNav(navId);
  const kept = fromNav === true && PAGE_CACHE.get(key);
  pageKey = key;
  if (kept) {                                           // вернуться к отложенной странице как была
    app.replaceChildren(...kept.el); PAGE_CACHE.delete(key); PageHook.onShow = kept.onShow;
    if (kept.onShow) kept.onShow();
    window.scrollTo(0, kept.y); return;
  }
  PAGE_CACHE.delete(key);
  if (id === "главная") await trReady();               // фраза дня с чтением
  const pg = document.createElement("div"); pg.className = "pg"; pg.innerHTML = view(parts.slice(1)); app.replaceChildren(pg);
  if (bind) await bind(parts.slice(1));
  checkAchievements();
  window.scrollTo(0, 0);
  if (id === "главная") cloudFillTop();
}
window.addEventListener("hashchange", () => route(true));
Store.touchDay();
route();
if (Cloud.user()) Cloud.sync().then((changed) => { if (changed) { applyTheme(); route(); } });
