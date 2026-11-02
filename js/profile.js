// Профиль (#/профиль): звание по очкам, статистика, сундуки, достижения, экспорт/импорт прогресса.
// Магазин (#/магазин): темы оформления, бонусные песни, секретные уроки (#/секрет/id) — за очки.
// Достижения проверяются после каждого перехода (checkAchievements, вызывается из route() в app.js): новое → тост и +10 ✦.

const RANKS = [[0, "✧", "Звёздная пыль"], [50, "✦", "Искра"], [150, "🌟", "Светлячок"], [400, "⭐", "Звезда"], [900, "✨", "Созвездие"],
  [1800, "🌌", "Туманность"], [3500, "🪐", "Галактика"], [6000, "💫", "Сверхновая"]];
const rankIdx = (p) => { let k = 0; RANKS.forEach((r, i) => { if (p >= r[0]) k = i; }); return k; };
function maxStreak(days) {
  const d = [...new Set(days)].sort(); let best = 0, cur = 0, prev = null;
  for (const x of d) { const t = Date.parse(x); cur = prev !== null && t - prev === 864e5 ? cur + 1 : 1; best = Math.max(best, cur); prev = t; }
  return best;
}
function progressFacts() {
  const S = Store.get(), L = Object.entries(S.lessons).filter(([, l]) => l.stars), best = S.best || {};
  const checks = ET_TOC.filter((l) => l[3]).map((l) => l[0]);
  return { S, lessons: L.length, three: L.filter(([, l]) => l.stars === 3).length, checkAce: L.some(([n, l]) => checks.includes(+n) && l.stars === 3),
    streak: Math.max(Store.streak(), maxStreak(S.days)), learned: Object.values(S.cards).filter((c) => c.reps > 0).length,
    express: (S.express || 0) >= ET_EXPRESS.screens.length, best, text90: Object.values(S.texts || {}).some((x) => x >= 90),
    checksOk: S.checksOk || 0, my: S.myWords.length, opened: S.chestsOpened || 0, bought: (S.bought || []).length, points: S.points };
}
const ACH = [
  ["first", "🌱", "Первый шаг", "Пройди первый урок", (f) => f.lessons >= 1], ["l5", "📖", "Ученик", "Пройди 5 уроков", (f) => f.lessons >= 5],
  ["l15", "🎓", "Знаток", "Пройди 15 уроков", (f) => f.lessons >= 15], ["lall", "👑", "Выпускник", "Пройди все уроки курса", (f) => f.lessons >= ET_TOC.length],
  ["s10", "⭐", "Отличник", "10 уроков на три звезды", (f) => f.three >= 10], ["chk", "🏅", "Контрольная на отлично", "Любая контрольная на три звезды", (f) => f.checkAce],
  ["d3", "🔥", "Три дня подряд", "Занимайся 3 дня подряд", (f) => f.streak >= 3], ["d7", "🔥", "Неделя подряд", "Занимайся 7 дней подряд", (f) => f.streak >= 7],
  ["d30", "☄️", "Месяц подряд", "Занимайся 30 дней подряд", (f) => f.streak >= 30], ["c10", "🃏", "Первые слова", "Выучи 10 карточек", (f) => f.learned >= 10],
  ["c100", "📚", "Сотня слов", "Выучи 100 карточек", (f) => f.learned >= 100], ["exp", "⚡", "Заговорил!", "Пройди экспресс-курс", (f) => f.express],
  ["spd", "⏱", "Молния", "15 фраз в «Успей перевести»", (f) => (f.best["успей"] || 0) >= 15], ["set", "🎯", "Без единой ошибки", "Набор из 15 — без ошибок", (f) => (f.best["набор"] || 0) >= 15],
  ["txt", "✍️", "Переводчик", "Переведи текст на 90%+", (f) => f.text90], ["ck", "✨", "Чистый текст", "Текст без ошибок в «Проверь свой текст»", (f) => f.checksOk >= 1],
  ["my20", "★", "Коллекционер", "20 слов в «Моих словах»", (f) => f.my >= 20], ["chest", "💎", "Сокровище", "Открой сундук", (f) => f.opened >= 1],
  ["shop", "🛍", "Первая покупка", "Купи что-нибудь в магазине", (f) => f.bought >= 1], ["p1000", "💫", "Тысяча звёзд", "Набери 1000 очков", (f) => f.points >= 1000],
];
function checkAchievements() {
  const f = progressFacts(), S = f.S; S.ach = S.ach || [];
  const fresh = ACH.filter(([id, , , , test]) => !S.ach.includes(id) && test(f));
  if (!fresh.length) return;
  fresh.forEach(([id]) => S.ach.push(id)); S.points += fresh.length * 10; Store.save();
  toast(`🏆 ${fresh.map((a) => a[2]).join(", ")} · +${fresh.length * 10} ✦`);
  const st = document.querySelector(".topnav .chip:not(.f)"); if (st) st.textContent = "✦ " + S.points;
}

function pageProfile() {
  const f = progressFacts(), S = f.S, k = rankIdx(S.points), nx = RANKS[k + 1];
  const pct = nx ? Math.round((S.points - RANKS[k][0]) / (nx[0] - RANKS[k][0]) * 100) : 100;
  const got = new Set(S.ach || []);
  return `<div class="k">Профиль</div><h1 class="page">Твой <i>путь</i></h1>
  <div class="card rankc"><div class="rki">${RANKS[k][1]}</div><div style="flex:1 1 200px;min-width:0"><div class="k">Звание</div><div class="rkn">${RANKS[k][2]}</div>
    <div class="q"><i style="width:${pct}%"></i></div><div class="muted">${nx ? `до звания «${nx[2]}» — ещё ${nx[0] - S.points} ✦` : "высшее звание!"}</div></div>
    <a class="btn gold" href="#/магазин">🛍 Магазин</a></div>
  <div class="pstats">${[["🔥", Store.streak(), "дней подряд"], ["✦", S.points, "очков"], ["📖", f.lessons, "уроков"], ["⭐", Object.values(S.lessons).reduce((a, l) => a + (l.stars || 0), 0), "звёзд"],
    ["🃏", f.learned, "слов выучено"], ["🏆", got.size + " / " + ACH.length, "достижений"]].map(([i, n, t]) => `<div class="st">${i} ${n}<small>${t}</small></div>`).join("")}</div>
  <div class="card chestc"><div class="rki">💎</div><div style="flex:1 1 200px;min-width:0"><b>Сундуки: ${S.chests}</b><div class="muted">Сундук дают за первые три звезды в уроке. Внутри — от 20 до 60 очков.</div></div>
    <button class="btn gold" id="chopen" ${S.chests ? "" : "disabled"}>Открыть сундук</button></div>
  <div style="margin-top:16px">${cloudCard()}</div>
  <h2 style="margin-top:22px">Достижения</h2>
  <div class="achs">${ACH.map(([id, ic, t, d]) => `<div class="card ach${got.has(id) ? " on" : ""}"><div class="aic">${got.has(id) ? ic : "🔒"}</div><div><b>${t}</b><small>${d}</small></div></div>`).join("")}</div>
  <div class="card" style="max-width:640px;margin-top:16px"><h3>Копия прогресса в файле</h3><p class="muted">Чтобы перенести его на другое устройство или не потерять при очистке браузера — сохрани файл и загрузи его там.</p>
  <div class="row" style="justify-content:flex-start;flex-wrap:wrap"><button class="btn gold" id="pexp">Сохранить прогресс в файл</button><label class="btn">Загрузить из файла<input type="file" id="pimp" accept=".json" hidden></label></div></div>`;
}
function bindProfile() {
  cloudBindCard();
  $("#pexp").onclick = () => Store.exportFile();
  $("#pimp").onchange = (e) => { const f = e.target.files[0]; if (!f) return; f.text().then((t) => { try { Store.importText(t); applyTheme(); toast("Прогресс загружен"); route(); } catch (er) { toast("Файл не подошёл"); } }); };
  $("#chopen").onclick = () => {
    const S = Store.get(); if (!S.chests) return;
    const n = 20 + Math.floor(Math.random() * 41); S.chests--; S.chestsOpened = (S.chestsOpened || 0) + 1; S.points += n; Store.save();
    toast(`💎 В сундуке ${n} ✦!`); route();
  };
}

// ---------------------------------------------------------------- магазин
const THEMES = [["", "Ночное небо", 0, ["#0b1026", "#f1c97a", "#e99bb8"]], ["dawn", "Рассвет", 100, ["#1a0f22", "#ffb38a", "#ff8fa3"]],
  ["aurora", "Северное сияние", 150, ["#071a1f", "#8ff0c8", "#9fb8ff"]], ["cosmos", "Глубокий космос", 200, ["#0d0820", "#c9a7ff", "#ff9ad5"]]];
const BONUS_SONGS = { 6: 80, 7: 80, 8: 80 };              // песни 6–8 — бонусные (открываются в магазине)
const SECRETS = [
  { id: "словечки", icon: "😏", title: "Разговорные словечки", cost: 120, intro: "Как звучат «блин», «короче», «ладно», «ура» и «вау». Такие слова не учат в учебниках, но без них речь звучит как у робота.",
    phrases: [["Zut! Je perdim ma telefon!", "Блин! Я потерял телефон!"], ["Bref, je venom.", "Короче, сейчас приду."], ["Dakor, alor demen.", "Ладно, тогда завтра."],
      ["Oke, mersi!", "Окей, спасибо!"], ["Wa, s'eset tre bo!", "Вау, это очень красиво!"], ["Oura! Nou parvenin!", "Ура! У нас получилось!"], ["Oi, pardone!", "Ой, прости!"], ["Be, je savem pa.", "Ну, я не знаю."]],
    tips: ["Междометия не меняются и стоят в начале фразы, обычно с запятой или восклицательным знаком.", "**zut** — мягкое ругательство, как «блин»: его можно сказать при всех.", "**alor** значит «тогда, итак» — им удобно начинать вывод: *Alor, nou alen?* — «Ну что, идём?»"],
    quiz: [["Как сказать «Блин!»?", ["Zut!", "Bref!", "Oura!"], 0], ["«Dakor» значит…", ["ладно", "короче", "ура"], 0]] },
  { id: "стихи", icon: "🪶", title: "Как писать стихи на Etoilal", cost: 150, intro: "Etoilal придуман для песен: ударение всегда на последнем слоге, слова сливаются, а прилагательное перед словом звучит образно. Вот приёмы, которыми написаны песни и стихи из библиотеки.",
    phrases: [["Le nui venet lanman,", "Ночь приходит медленно,"], ["Le mer dormet trankilman.", "море тихо спит."], ["Ma keur kriet sans son,", "Моё сердце кричит без звука,"], ["Me persone ekoutet ma peur.", "но никто не слушает мой страх."],
      ["Un sonbr nui", "мрачная ночь (образно)"], ["Le plu bo etoil", "самая прекрасная звезда"]],
    tips: ["**Рифма** — по последнему слогу: keur / peur / douleur, son / chanson / nom, nui / gri / li, lanman / trankilman (все наречия на -man рифмуются между собой).",
      "**Ритм**: ударение на конце каждого слова и сильнее всего — в конце строки. Считай слоги: 6–8 в строке звучат как песня.",
      "**Образ**: поставь прилагательное перед словом — и строка станет эмоциональной: *un sonbr nui* — не просто «тёмная», а «мрачная, страшная» ночь.",
      "**Перекличка**: вопрос и ответ в скобках, как в «Ryen»: *Koi eset? (Ryen, ryen.)*"],
    quiz: [["Что рифмуется с «keur»?", ["peur", "lun", "mer"], 0], ["Как сказать образно «мрачная ночь»?", ["un sonbr nui", "un nui sonbr", "le nui sonbr"], 0]] },
];
const owned = (id) => (Store.get().bought || []).includes(id);
function buy(id, cost) {
  const S = Store.get(); if (owned(id)) return true;
  if (S.points < cost) { toast(`Не хватает ${cost - S.points} ✦`); return false; }
  S.points -= cost; S.spent = (S.spent || 0) + cost; S.bought = [...(S.bought || []), id]; Store.save(); toast("Куплено! ✦ −" + cost); return true;
}
function applyTheme() { document.body.className = (Store.get().theme ? "theme-" + Store.get().theme : ""); }
function pageShop() {
  const S = Store.get();
  return `<div class="shopw"><div class="k">Магазин</div><h1 class="page">Потрать <i>звёзды</i></h1><p class="lead">У тебя <b>✦ ${S.points}</b>. Очки дают за уроки, карточки, тренировки и задание дня.</p>
  <h2>Темы оформления</h2><div class="shop">${THEMES.map(([id, t, c, col]) => { const has = !id || owned("theme:" + id), cur = (S.theme || "") === id;
    return `<div class="card shopi"><div class="sw3" style="background:linear-gradient(135deg, ${col[0]} 40%, ${col[1]} 41% 70%, ${col[2]} 71%)"></div><b>${t}</b>
      ${cur ? `<span class="tag">включена</span>` : has ? `<button class="btn sm" data-theme="${id}">Включить</button>` : `<button class="btn sm gold" data-buy="theme:${id}" data-cost="${c}">✦ ${c}</button>`}</div>`; }).join("")}</div>
  <h2 style="margin-top:22px">Бонусные песни</h2><div class="shop">${Object.entries(BONUS_SONGS).map(([n, c]) => { const s = ET_SONGS.find((x) => x.n === +n); if (!s) return "";
    return `<div class="card shopi"><div class="sn" style="font-size:30px">🎵</div><b class="et">${esc(s.title)}</b><small class="muted">«${esc(s.ru)}»</small>
      ${owned("song:" + n) ? `<a class="btn sm" href="#/песни/${s.id}">Открыть</a>` : `<button class="btn sm gold" data-buy="song:${n}" data-cost="${c}">✦ ${c}</button>`}</div>`; }).join("")}</div>
  <h2 style="margin-top:22px">Секретные уроки</h2><div class="shop">${SECRETS.map((x) => `<div class="card shopi"><div class="sn" style="font-size:30px">${x.icon}</div><b>${x.title}</b><small class="muted">${esc(x.intro.slice(0, 70))}…</small>
      ${owned("secret:" + x.id) ? `<a class="btn sm" href="#/секрет/${x.id}">Открыть</a>` : `<button class="btn sm gold" data-buy="secret:${x.id}" data-cost="${x.cost}">✦ ${x.cost}</button>`}</div>`).join("")}</div></div>`;
}
function bindShop() {
  $(".shopw").onclick = (e) => {
    const b = e.target.closest("[data-buy]"); if (b) { if (buy(b.dataset.buy, +b.dataset.cost)) { if (b.dataset.buy.startsWith("theme:")) { Store.get().theme = b.dataset.buy.slice(6); Store.save(); applyTheme(); } route(); } return; }
    const t = e.target.closest("[data-theme]"); if (t) { Store.get().theme = t.dataset.theme; Store.save(); applyTheme(); route(); }
  };
}
function pageSecret(args) {
  const x = SECRETS.find((s) => s.id === args[0]);
  if (!x) return `<div class="card soon"><h2>Такого урока нет</h2><a class="btn gold" href="#/магазин">Магазин</a></div>`;
  if (!owned("secret:" + x.id)) return `<div class="card soon"><div class="ic">🔒</div><h2>${x.title}</h2><p class="muted">Секретный урок открывается в магазине за ✦ ${x.cost}.</p><a class="btn gold" href="#/магазин">В магазин</a></div>`;
  const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<span class='et'>$1</span>");
  return `<div class="k">Секретный урок</div><h1 class="page">${x.icon} ${x.title}</h1><p class="lead">${esc(x.intro)}</p>
  <div class="card xcard"><div class="xph">${x.phrases.map(([et, ru]) => `<div class="lex">${playBtn(et, 1)}<div><div class="row1"><span class="et">${esc(et)}</span> <span class="ru">— ${esc(ru)}</span></div><div class="rd">«${esc(rd(et))}»</div></div></div>`).join("")}</div></div>
  <div class="card xcard" style="margin-top:14px"><h3>💡 Как это работает</h3>${x.tips.map((t) => `<p>${md(t)}</p>`).join("")}</div>
  <div class="card xcard" style="margin-top:14px"><h3>Проверь себя</h3>${x.quiz.map(([q, o, r], i) => `<div class="tq" style="margin:10px 0">${esc(q)}</div>
    <div class="topts sq" data-r="${r}">${o.map((v, k) => `<button class="topt" data-k="${k}">${/[а-я]/i.test(v) ? esc(v) : `<span class="et">${esc(v)}</span>`}</button>`).join("")}</div>`).join("")}</div>`;
}
function bindSecret() {
  document.querySelectorAll(".sq").forEach((g) => g.onclick = (e) => { const b = e.target.closest(".topt"); if (!b || g.dataset.done) return; g.dataset.done = 1;
    g.querySelectorAll(".topt").forEach((x) => x.classList.add(x.dataset.k === g.dataset.r ? "good" : x === b ? "bad" : "dim")); });
}
applyTheme();
