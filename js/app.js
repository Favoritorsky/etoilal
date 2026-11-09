// Etoilal — приложение: маршруты #/…, шапка и нижние вкладки, страницы. Данные: ET_DICT, ET_PHRASES, ET_TOC, ET_TR_B64.
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("show"), 1600); }

// ---------------------------------------------------------------- озвучка: записи курса (ET_AUDIO_C), слова словаря (ET_AUDIO), иначе голос браузера
// 7.11.2026: первыми — записи без обрывов (ET_AUDIO_V2, tools/revoice_clean.py); rate — скорость (0.5 / 0.75 / 1, высота голоса та же)
let SPK = null;
function speak(text, rate) {
  const low = text.toLowerCase().trim(), C = window.ET_AUDIO_C || {};
  const A = window.ET_AUDIO_A || {};                 // записи раздела «Альтернативное обучение» (tools/build_alt_audio.py)
  const K = window.ET_AUDIO_C2 || {};                // записи нового самоучителя (tools/build_course2_audio.py)
  const V = window.ET_AUDIO_V2 || {};
  const s = low.replace(/[.!?]+$/, "");
  const FA = (typeof FR !== "undefined" && FR.onPage() && window.FR_AUDIO) || {};   // 8.11.2026: французский (js/french.js)
  const f = FA[low] || FA[s] || V[low] || V[s] || K[low] || K[s] || C[low] || C[s] || A[low] || A[s] || (window.ET_AUDIO && window.ET_AUDIO[s]);
  if (f) { try { SPK && SPK.pause(); } catch (e) {}
    const a = new Audio(f); a.preservesPitch = a.mozPreservesPitch = a.webkitPreservesPitch = true; a.playbackRate = rate || 1; SPK = a;
    a.play().catch(() => speakTTS(text, rate)); return; }
  speakTTS(text, rate);
}
function speakTTS(text, rate) {
  if (!("speechSynthesis" in window)) { toast("Озвучка недоступна в этом браузере"); return; }
  const u = new SpeechSynthesisUtterance(text.replace(/'/g, "")); u.lang = "fr-FR"; u.rate = .9 * (rate || 1);
  const v = speechSynthesis.getVoices().find((x) => /^fr/i.test(x.lang)); if (v) u.voice = v;
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}
document.addEventListener("click", (e) => { const b = e.target.closest("[data-say]"); if (b) { e.preventDefault(); e.stopPropagation(); speak(b.dataset.say, +b.dataset.rate || undefined); } });
// скорость заданий на слух: разделы 1–2 — 0.5x (чтобы разобрать каждое слово), дальше — выбор ученика (по умолчанию 0.75x)
const ARate = {
  sec: null,                                          // раздел открытого урока/контрольной (если у задания нет своего)
  get(sec) { sec = sec ?? this.sec; if (sec != null && sec < 2) return 0.5; const r = +((Store.get().opts || {}).rate); return [0.5, 0.75, 1].includes(r) ? r : 0.75; },
  set(r) { const S = Store.get(); S.opts = S.opts || {}; S.opts.rate = r; Store.save();
    document.querySelectorAll(".lsn[data-free] [data-say]").forEach((b) => b.dataset.rate = r);
    document.querySelectorAll(".lsn[data-free] [data-rate-set]").forEach((b) => b.classList.toggle("on", +b.dataset.rateSet === r)); },
};
document.addEventListener("click", (e) => { const b = e.target.closest("[data-rate-set]"); if (b) { e.preventDefault(); ARate.set(+b.dataset.rateSet); } });
const rd = (t) => { try { return reading(t); } catch (e) { return ""; } };
const playBtn = (t, sm) => `<button class="play${sm ? " sm" : ""}" data-say="${esc(t)}" title="Послушать">▶</button>`;

// ---------------------------------------------------------------- переводчик (данные распаковываются один раз)
let TR_READY = null;
function trReady() {
  if (!TR_READY) TR_READY = (async () => {
    const bin = Uint8Array.from(atob(window.ET_TR_B64), (c) => c.charCodeAt(0));
    const txt = await new Response(new Blob([bin]).stream().pipeThrough(new DecompressionStream("gzip"))).text();
    init(JSON.parse(txt)); Mat.tr();
    for (const [k, v] of Object.entries(Store.get().senses)) choose(k, v);
  })();
  return TR_READY;
}

// линейные значки (дизайн «Индиго», 6.11.2026) — вместо эмодзи в меню, вкладках и на главной
const SVGI = (d) => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const ICO = {
  flame: SVGI('<path d="M12 3c.5 3.5 5 5.2 5 10a5 5 0 0 1-10 0c0-2.2 1.2-3.6 2.3-4.6.1 1.8.9 2.9 2.2 3.2-.4-3 .1-5.8.5-8.6z"/>'),
  star: SVGI('<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.8z"/>'),
  chest: SVGI('<rect x="3.5" y="9" width="17" height="10.5" rx="2"/><path d="M3.5 12.5h17M5 9a7 4.5 0 0 1 14 0M10.5 12.5v2.5h3v-2.5"/>'),
  level: SVGI('<path d="M4 19l5-8 4 5 3-4 4 7z"/><circle cx="16" cy="6" r="2"/>'),
  book: SVGI('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>'),
  home: SVGI('<path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/>'),
  check: SVGI('<path d="M5 12.5l4.5 4.5L19 7.5"/>'), swap: SVGI('<path d="M4 8h14l-3-3M20 16H6l3 3"/>'),
  more: SVGI('<path d="M4 7h16M4 12h16M4 17h16"/>'), chat: SVGI('<path d="M4 5h16v11H9l-5 4z"/>'),
  user: SVGI('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'), cloud: SVGI('<path d="M7 18a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 8a4.5 4.5 0 0 1 0 10z"/>'),
  lock: SVGI('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'), arrow: SVGI('<path d="M5 12h14M13 6l6 6-6 6"/>'),
};
// ---------------------------------------------------------------- две оболочки (8.11.2026): Etoilal и французский — как два сайта
// с одинаковыми разделами и переключателем в шапке. Оболочка запоминается; страницы только одного языка переключают её сами
// (урок Etoilal → Etoilal, урок французского → французский). Разделы, которых во французском ещё нет, показывают заглушку.
const Shell = {
  get() { try { return localStorage.getItem("etoilal-shell") === "fr" ? "fr" : "et"; } catch (e) { return "et"; } },
  set(v) { try { localStorage.setItem("etoilal-shell", v); } catch (e) {} document.body.classList.toggle("shell-fr", v === "fr"); },
  fr() { return this.get() === "fr"; },
  ET_ONLY: new Set(["урок", "альтернатива", "подготовка", "экспресс", "о-языке", "мат", "секрет"]),
  FR_ONLY: new Set(["французский", "фр"]),
  // разделы с одинаковыми функциями: во французской оболочке — своя версия (когда будет) или заглушка
  SAME: { "словарь": ["📚", "Словарь французского"], "карточки": ["🃏", "Карточки французских слов"], "переводчик": ["⇄", "Переводчик с французского"],
    "проверка": ["✅", "Проверь текст на французском"], "справочник": ["📐", "Справочник французской грамматики"], "песни": ["🎤", "Французские песни — караоке"],
    "библиотека": ["📜", "Книги на французском"], "книги": ["📜", "Книги на французском"], "тренировка": ["🔥", "Ежедневная тренировка французского"],
    "тренировки": ["🎯", "Тренировки французского"], "полезное": ["💬", "Французские фразы по ситуациям"], "тексты": ["✍", "Тексты на французском"] },
};
// разделы французской оболочки, которые уже есть (js/french-tools.js); остальные — заглушка frSoon
const FR_PAGES = { "словарь": [() => FRT.dict(), () => FRT.bindDict()], "справочник": [() => FRT.ref(), () => FRT.bindRef()],
  "карточки": [() => FRT.cards(), () => FRT.bindCards()], "тренировка": [() => FRT.train(), () => FRT.bindTrain()], "тренировки": [() => FRT.train(), () => FRT.bindTrain()],
  "полезное": [() => FRT.useful()] };
function frSoon(id) { const [ic, t] = Shell.SAME[id];
  return `<div class="card soon"><div class="ic">${ic}</div><h2>${t}</h2><p class="muted">Во французской оболочке этот раздел будет таким же, как в Etoilal, — сейчас он в работе. Пока есть пробные уроки французского.</p>
    <p><a class="btn gold" href="#/учиться">Уроки французского</a> <a class="btn" href="#/${esc(id)}" data-shell="et">Открыть раздел в Etoilal</a></p></div>`; }
document.addEventListener("click", (e) => { const b = e.target.closest("[data-shell]"); if (b) { e.preventDefault(); Shell.set(b.dataset.shell); PAGE_CACHE.clear(); const h = b.getAttribute("href");
  let cur = location.hash; try { cur = decodeURIComponent(cur); } catch (x) {} if (cur === h) route(); else location.hash = h; } }, true);
const shellSwitch = () => `<span class="shsw"><a href="#/главная" data-shell="et" class="${Shell.fr() ? "" : "on"}" title="Etoilal">✦ Etoilal</a><a href="#/главная" data-shell="fr" class="${Shell.fr() ? "on" : ""}" title="Французский">🇫🇷 Français</a></span>`;
// ---------------------------------------------------------------- меню
const NAV = [["главная", "Главная", "🏠"], ["учиться", "Учиться", "📖"], ["словарь", "Словарь", "📚"], ["карточки", "Карточки", "🃏"], ["переводчик", "Переводчик", "⇄"],
  ["проверка", "Проверь текст", "✅"], ["справочник", "Справочник", "📐"], ["песни", "Песни", "🎤"], ["библиотека", "Библиотека", "📜"], ["чат", "Чат", "💬"]];
const TABS = [["главная", "Главная", "home"], ["учиться", "Учиться", "book"], ["проверка", "Проверка", "check"], ["переводчик", "Перевод", "swap"], ["ещё", "Ещё", "more"]];
// каждая вкладка меню помнит, где ты в ней был (урок, слово в словаре, загадку…): вкладка ведёт туда; повторное нажатие на
// уже открытую вкладку — к её началу. Хранится в браузере, переживает перезаход на сайт.
let TAB_LAST = {}; try { TAB_LAST = JSON.parse(localStorage.getItem("etoilal-tabs") || "{}"); } catch (e) {}
function tabRemember(navId, raw) {
  const p = Shell.fr() ? "fr:" : "";
  TAB_LAST[p + navId] = "#/" + raw; if (!TABS.some((x) => x[0] === navId)) TAB_LAST[p + "ещё"] = "#/" + raw;
  try { localStorage.setItem("etoilal-tabs", JSON.stringify(TAB_LAST)); } catch (e) {}
}
const tabHref = (id, cur) => { const k = (Shell.fr() ? "fr:" : "") + id; return id === cur || id === "главная" || !TAB_LAST[k] ? "#/" + id : TAB_LAST[k]; };
function renderNav(cur) {
  const st = Store.streak(), pts = Store.get().points;
  $("#topnav").innerHTML = (Shell.fr() ? `<a class="logo" href="#/главная"><span class="mk">🇫🇷</span> Fran<b>çais</b></a>` : `<a class="logo" href="#/главная"><span class="mk">✦</span> Etoil<b>al</b></a>`) + shellSwitch() +
    NAV.map(([id, t]) => `<a class="nl${id === cur ? " on" : ""}" href="${esc(tabHref(id, cur))}">${t}</a>`).join("") +
    `<div class="sp"></div><span class="chip f" title="Дней подряд">${ICO.flame} ${st}</span><span class="chip" title="Очки">${ICO.star} ${pts}</span>` +
    (Cloud.user() ? `<a class="chip cl nk" href="#/профиль" title="Профиль · прогресс в облаке">${ICO.user} ${esc(Cloud.user().nick)}</a>`
      : `<a class="chip cl" href="#/вход" title="Войти: прогресс на всех устройствах">${ICO.cloud} Войти</a><a class="chip" href="#/профиль" title="Профиль">${ICO.user}</a>`);
  const moreOn = !TABS.some((x) => x[0] === cur);
  $("#tabbar").innerHTML = TABS.map(([id, t, i]) => `<a class="${id === cur || (id === "ещё" && moreOn) ? "on" : ""}" href="${esc(id === "ещё" ? (moreOn ? "#/ещё" : TAB_LAST[(Shell.fr() ? "fr:" : "") + "ещё"] || "#/ещё") : tabHref(id, cur))}"><i>${ICO[i] || i}</i>${t}</a>`).join("");
}

// ---------------------------------------------------------------- главная
function dayIndex(n) { const d = new Date(); const k = d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate(); return k % n; }
function sections() {                         // разделы нового самоучителя (ET_C2I) → строки ET_TOC
  return ET_C2I.sections.map((_, k) => ET_TOC.filter((l) => (ET_C2I.lessons.find((x) => x.n === l[0]) || {}).sec === k));
}
const SECTION_NAMES = ET_C2I.sections;
function pageHome() {
  const S = Store.get(), L = ET_C2I.lessons, next = Lv.firstOpen(S) || L[L.length - 1], lv = Lv.level(S);
  const ph = ET_PHRASES[dayIndex(ET_PHRASES.length)];
  const words = ET_DICT.words.filter((w) => w[4] && w[4] < 1200 && w[1] === "n");
  const wd = words[dayIndex(words.length)];
  const doneN = L.filter((l) => Lv.done(l.n, S)).length, pad = (n) => String(n).padStart(2, "0");
  const secs = ET_C2I.sections.map((name, k) => {
    const ls = Lv.secLessons(k), nd = ls.filter((l) => Lv.done(l.n, S)).length, passed = Lv.secPassed(k, S), cur = next.sec === k && !passed;
    const lock = !passed && !cur && ls[0].n > next.n, first = ls.find((l) => !Lv.done(l.n, S)) || ls[0];
    return `<${lock ? "div" : "a"} class="gsec${passed ? " done" : cur ? " cur" : lock ? " lock" : ""}"${lock ? "" : ` href="#/урок/${first.n}"`}><span class="no"><span>${pad(k + 1)}${cur ? " · сейчас" : ""}</span><span class="gi2">${passed ? ICO.check : lock ? ICO.lock : ""}</span></span>
      <h3>${esc(name)}</h3><span class="u">уроки ${ls[0].n}–${ls[ls.length - 1].n} · пройдено ${nd} из ${ls.length}</span>
      <div class="rank"><b class="et">${LEVELS[k].w}</b><span>${LEVELS[k].ru}${passed ? " ✓" : ""}</span></div><div class="bar"><i style="width:${Math.round(nd / ls.length * 100)}%"></i></div></${lock ? "div" : "a"}>`;
  }).join("");
  const secL = Lv.secLessons(next.sec);
  return `<div class="ghome"><section class="gh"><div><div class="k">Самоучитель · 40 уроков</div><h1>Язык, который <span>звучит</span> как звёзды</h1></div>
    <div><p>Сорок уроков по порядку. Шесть разделов — шесть уровней: от <b class="et">elev</b> до <b class="et">etoil</b>. Каждый уровень подтверждает контрольная.</p>
      <a class="btn gold" href="#/урок/${next.n}">${doneN ? "Продолжить" : "Начать"}: ${next.check ? "контрольная" : "урок"} ${next.n} ${ICO.arrow}</a></div></section>
  <a class="card gdaily" href="#/тренировка"><span class="gi">${ICO.flame}</span><div><b>Ежедневная тренировка</b><span>${Daily.streak()} дн. подряд · сегодня ${Daily.dlog().s} из ${Daily.st().goal} занятий · ≈ 4 минуты</span></div>
    <span class="btn gold sm">${Daily.dlog().s >= Daily.st().goal ? "Ещё занятие" : "Начать"} ${ICO.arrow}</span></a>
  ${FR.banner()}
  <section class="gstats">${[[ICO.flame, Store.streak(), "дней подряд"], [ICO.star, S.points, "очков"], [ICO.book, doneN + "/" + L.length, "уроков пройдено"], [ICO.chest, S.chests, "сундуков"]]
    .map(([ic, v, t]) => `<div class="gst"><span class="gi">${ic}</span><div><b>${v}</b><span>${t}</span></div></div>`).join("")}</section>
  <div class="gcap"><span>Карта разделов · уровни</span><span>Твой уровень: ${lv ? Lv.badge(lv) + " " + LEVELS[lv - 1].ru : "пока нет — пройди уроки 1–3"}</span></div>
  <section class="ggrid">${secs}</section>
  <div class="gtwo"><div>
    <div class="gcap" style="margin-top:0"><span>Раздел ${pad(next.sec + 1)} — ${esc(ET_C2I.sections[next.sec])}</span><a href="#/учиться">все уроки →</a></div>
    ${secL.map((l) => `<a class="grow${l.n === next.n ? " cur" : ""}" href="${Lv.isOpen(l.n, S) ? "#/урок/" + l.n : "#/урок/" + next.n}"><span class="kk">${pad(l.n)}</span><b>${esc(l.t)}</b><span class="gr">${Lv.done(l.n, S) ? "★".repeat(S.lessons[l.n].stars) : l.n === next.n ? ICO.arrow : Lv.isOpen(l.n, S) ? "" : ICO.lock}</span></a>`).join("")}
    <div class="tools" style="margin-top:22px">
      <a class="card tool" href="#/переводчик"><div class="ic">${ICO.swap}</div><b>Переводчик</b><span>Русский ⇄ Etoilal</span></a>
      <a class="card tool" href="#/проверка"><div class="ic">${ICO.check}</div><b>Проверь текст</b><span>Найдёт ошибки и объяснит</span></a>
      <a class="card tool" href="#/чат"><div class="ic">${ICO.chat}</div><b>Чат</b><span>Общайся со всеми</span></a>
      <a class="card tool" href="#/книги"><div class="ic">${ICO.book}</div><b>Книги читателей</b><span>Пиши с уровня artizan</span></a>
    </div></div>
  <aside class="rail">
    ${dailyCard()}
    <div class="card"><div class="k">Слово дня</div><div class="row"><div class="gword">${esc(wd[0])}</div>${playBtn(wd[0])}</div>
      <div class="muted" style="margin-top:6px">${esc(wd[2])} · «${esc(wd[3] || rd(wd[0]))}»</div></div>
    <div class="card"><div class="row"><div class="k">Фраза дня</div>${playBtn(ph[0])}</div>
      <div class="ph et" style="margin-top:8px;font-size:22px">${esc(ph[0])}</div><div class="rd">${esc(rd(ph[0]))}</div><div class="muted" style="margin-top:4px">${esc(ph[2])}</div></div>
    <div id="ctop"></div>
  </aside></div></div>`;
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
  <div id="dres"></div>${Mat.toggle("adtd")}`;
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
  Mat.bindToggle("adtd");
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
  et: ["Salu! Qoman tu ales?", "Je to emem.", "Le nui eset tranqil e lez etoil chantel.", "Yer je trouvim le livr dans le mezon gran.", "Etoilal eset le lang le plu joli dans le mond."] };
function pageTranslate() {
  return `<div class="k">Переводчик</div><h1 class="page">Русский <i>⇄</i> Etoilal</h1>
  <p class="lead">Опечатки исправляются сами, цифры остаются цифрами, страны и города узнаются. Слова с точечным подчёркиванием — нажми и выбери другой смысл.</p>
  <div class="row" style="margin-bottom:12px;justify-content:flex-start;flex-wrap:wrap"><div class="seg" id="trdir"><button data-d="ru">Русский → Etoilal</button><button data-d="et">Etoilal → Русский</button></div>
  <button class="btn sm" id="trreset" hidden>Сбросить выбор смыслов</button>${Mat.toggle("adtt")}</div>
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
  Mat.bindToggle("adtt");
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
const CK_EX = ["Je pa savem qoi fezer.", "Il tre joli.", "Le ami chantet un chanson.", "Je chantet aveq le joli fleur.", "Ma ami chantel e je danset.", "Yer je trouvit le livr dans le mezon.", "Tu eses ma etoil."];
function pageCheck() {
  return `<div class="k">Проверь свой текст</div><h1 class="page">Найду ошибки и <i>объясню</i></h1>
  <p class="lead">Напиши что-нибудь на Etoilal. Я подчеркну ошибки, объясню каждую и исправлю в один щелчок. Внизу — как это читается и что получилось по-русски.</p>
  <div class="two"><div class="card"><textarea class="in" id="cksrc" spellcheck="false" placeholder="Например: Je pa savem qoi fezer."></textarea>
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
  const items = [["учиться", "📖", "Самоучитель", ET_TOC.length + " уроков с озвучкой"], ["альтернатива", "🧠", "Альтернативное обучение", "весь язык сразу: шпаргалка, тексты, загадки"], ["экспресс", "⚡", "Экспресс-курс", "10 экранов, 15 минут"], ["карточки", "🃏", "Карточки", "повторение слов"], ["тренировка", "🔥", "Ежедневная тренировка", "3–5 минут в день"], ["французский", "🇫🇷", "Французский", "самоучитель французского"], ["тренировки", "🎯", "Тренировки", "на время, на слух, произношение"], ["словарь", "📚", "Словарь", "все слова"], ["справочник", "📐", "Справочник", "грамматика"],
    ["песни", "🎤", "Песни", "караоке"], ["библиотека", "📜", "Библиотека", "рассказы и книги читателей"], ["чат", "💬", "Чат", "общение со всеми"], ["мат", "🔞", "Мат 18+", "с уровня filozof"], ["полезное", "💬", "Полезное", "фразы по ситуациям"], ["тексты", "✍", "Тексты", "переведи — я проверю"], ["о-языке", "✦", "О языке", "история"], ["профиль", "👤", "Профиль", "звания и достижения"], ["вход", "☁", "Аккаунт", "прогресс на всех устройствах"], ["магазин", "🛍", "Магазин", "темы, песни, секреты"]];
  const list = Shell.fr() ? items.filter(([h]) => !Shell.ET_ONLY.has(h) && h !== "французский").map((x) => x[0] === "учиться" ? ["учиться", "🇫🇷", "Уроки французского", "пробные уроки"] : x) : items;
  return `<h1 class="page">Ещё</h1><div class="tools">${list.map(([h, i, t, s]) => `<a class="card tool" href="#/${h}"><div class="ic">${i}</div><b>${t}</b><span>${s}</span></a>`).join("")}</div>`;
}
// профиль, достижения и магазин — js/profile.js
const soon = (ic, t, s) => () => `<div class="card soon"><div class="ic">${ic}</div><h2>${t}</h2><p class="muted">${s}</p><a class="btn gold" href="#/главная">На главную</a></div>`;

// ---------------------------------------------------------------- маршруты
const PAGES = {
  "главная": [pageHome], "словарь": [pageDict, bindDict], "переводчик": [(a) => Lv.examActive() ? Lv.lockedPage("Переводчик") : pageTranslate(a), (a) => !Lv.examActive() && bindTranslate(a)], "ещё": [pageMore], "профиль": [pageProfile, bindProfile],
  "учиться": [c2PageLearn], "урок": [c2PageLesson, c2BindLesson], "экспресс": [pageExpress, bindExpress],
  "тренировки": [pageTrain, bindTrain], "тренировка": [pageDaily, bindDaily],
  "французский": [() => FR.page()], "фр": [(a) => FR.pageLesson(a), (a) => FR.bindLesson(a)],
  "карточки": [(a) => a[0] ? pageCardSession(a) : pageCards(), (a) => a[0] && bindCardSession(a)],
  "проверка": [(a) => Lv.examActive() ? Lv.lockedPage("«Проверь текст»") : pageCheck(a), (a) => !Lv.examActive() && bindCheck(a)],
  "справочник": [pageRef, bindRef],
  "песни": [pageSongs, bindSongs], "библиотека": [pageLibrary, bindLibrary], "полезное": [pageUseful, bindUseful], "тексты": [pageTexts, bindTexts],
  "магазин": [pageShop, bindShop], "секрет": [pageSecret, bindSecret],
  "о-языке": [pageAbout],
  "альтернатива": [altPage, altBind],
  "вход": [cloudPageLogin, cloudBindLogin], "чат": [pageChat, bindChat], "мат": [pageMat, bindMat], "подготовка": [pagePrep, bindPrep], "книги": [pageBooks, bindBooks], "игрок": [cloudPagePlayer, cloudBindPlayer],
};
// Открытые страницы запоминаются: при переходе в другой раздел страница не уничтожается, а откладывается (вместе с ответами,
// введённым текстом, открытыми блоками и прокруткой) и при возвращении показывается как была. Главная, профиль, карточки,
// тренировки и т.п. всегда рисуются заново (там данные меняются). Прямой вызов route() (кнопки «Ещё раз», смена темы) — заново.
const PAGE_KEEP = new Set(["урок", "альтернатива", "переводчик", "проверка", "словарь", "тексты", "справочник", "полезное", "библиотека", "о-языке", "экспресс"]);
// 9.11: во французской оболочке ключи страниц начинаются с «fr:»; там же откладываются уроки (фр/N), карточки и тренировка
const FR_KEEP = new Set(["фр", "тренировки", "тренировка", "карточки"]);
const keepPage = (k) => { const fr = /^fr:/.test(k), id = k.replace(/^fr:/, "").split("/")[0]; return PAGE_KEEP.has(id) || (fr && FR_KEEP.has(id)); };
const PAGE_CACHE = new Map();                          // ключ (адрес) → { el, y, onShow }
const PageHook = { onShow: null };                      // страница может сказать, что сделать при возвращении к ней (урок — доска шпаргалок)
let pageKey = null;
async function route(fromNav) {
  closePop();
  if (typeof examBlocked === "function" && examBlocked(location.hash)) {   // набрали адрес вручную / «назад» — вернуть на контрольную
    history.replaceState(null, "", EX.hash); toast("Недоступно во время контрольной"); return; }
  if (typeof examMayLeave === "function" && !examMayLeave(location.hash)) { history.replaceState(null, "", EX.hash); if (!document.querySelector("#exbox")) return route(true); return; }
  if (typeof examLeave === "function") examLeave();
  const raw = decodeURIComponent(location.hash.replace(/^#\/?/, "")), parts = raw.split("/");
  const id = PAGES[parts[0]] ? parts[0] : "главная";
  if (Shell.FR_ONLY.has(id) && !Shell.fr()) Shell.set("fr");
  else if (Shell.ET_ONLY.has(id) && Shell.fr()) Shell.set("et");
  else document.body.classList.toggle("shell-fr", Shell.fr());
  const key = (Shell.fr() ? "fr:" : "") + id + "/" + parts.slice(1).join("/");
  const [view, bind] = Shell.fr() ? (id === "главная" || id === "учиться" ? [() => FR.page()] : FR_PAGES[id] ? FR_PAGES[id] : Shell.SAME[id] ? [() => frSoon(id)] : PAGES[id]) : PAGES[id];
  const app = $("#app"), cur = [...app.childNodes];       // вся страница целиком (некоторые страницы перерисовывают #app сами)
  if (cur.length && pageKey && keepPage(pageKey) && pageKey !== key && (!app.querySelector("#exbox, .nokeep") || (typeof exOn === "function" && exOn() && app.querySelector("#exbox")))) {        // отложить уходящую страницу
    app.querySelectorAll("audio, video").forEach((m) => { try { m.pause(); } catch (e) {} });
    PAGE_CACHE.delete(pageKey); PAGE_CACHE.set(pageKey, { el: cur, y: scrollY, onShow: PageHook.onShow });
    while (PAGE_CACHE.size > 15) PAGE_CACHE.delete(PAGE_CACHE.keys().next().value);
  }
  PageHook.onShow = null;
  const navId = Shell.fr() && ["французский", "фр"].includes(id) ? "учиться" : ["урок", "экспресс", "тренировки", "тренировка", "альтернатива", "подготовка"].includes(id) ? "учиться" : id === "книги" ? "библиотека" : id;
  if (id !== "ещё") tabRemember(navId, raw || "главная");
  renderNav(navId);
  const kept = fromNav === true && !(Lv.examActive() && ["переводчик", "проверка"].includes(id)) && PAGE_CACHE.get(key);
  pageKey = key;
  if (kept) {                                           // вернуться к отложенной странице как была
    app.replaceChildren(...kept.el); PAGE_CACHE.delete(key); PageHook.onShow = kept.onShow;
    if (kept.onShow) kept.onShow();
    window.scrollTo(0, kept.y); return;
  }
  PAGE_CACHE.delete(key);
  if (id === "главная" && !Shell.fr()) await trReady();               // фраза дня с чтением
  const pg = document.createElement("div"); pg.className = "pg"; pg.innerHTML = view(parts.slice(1)); app.replaceChildren(pg);
  if (bind) await bind(parts.slice(1));
  checkAchievements();
  window.scrollTo(0, 0);
  if (id === "главная") cloudFillTop();
}
window.addEventListener("hashchange", () => route(true));
// контрольная началась/закончилась в другой вкладке — переводчик и «Проверь текст» закрываются/открываются и здесь
window.addEventListener("storage", (e) => { if (e.key === "etoilal-exam" && /^(переводчик|проверка)/.test(pageKey || "")) { PAGE_CACHE.clear(); route(); } });
Store.touchDay();
Mat.dict();
route();
if (Cloud.user()) Cloud.sync().then((changed) => { if (changed) { applyTheme(); route(); } });
