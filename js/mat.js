// Мат Etoilal (5.11.2026, система A + C, B — для поэзии). Включается переключателем 18+ (по умолчанию выключен):
// тогда грубые слова появляются в словаре, переводчике и «Проверь текст». Уроки мата (#/мат) — с уровня 5 (filozof «Мудрец»).
// A — 5 французских корней + словообразование: putan (putain), qonar (connard), fouter (foutre), bordel (bordel), merd (merde).
// C — шкала силы: -ou мягко · основа — обычно · -ach грубо; усилитель vachman (vachement) — «чертовски».
// B — «звёздные проклятия» для песен и стихов: без грубых слов, высоким стилем.
const MAT_LEVEL = 5;
const Mat = (() => {
  // [слово, часть речи, значение, сила (1 мягко, 2 обычно, 3 грубо, 0 — высокий стиль), корень, русские леммы для переводчика]
  // русские леммы: [лемма, шаблон-лемма, основа шаблона, новая основа] — формы берутся по образцу (ждать → ебать) или списком
  const W = [
    ["putan", "f", "блядь! (междометие досады)", 2, "putan", [["блядь", "мразь", "мраз", "бляд"]]],
    ["putanou", "f", "блин! (мягко)", 1, "putan", [["блин", null, null, null, ["блин"]]]],
    ["putanach", "f", "ёб твою мать! (очень грубо)", 3, "putan", []],
    ["putaniq", "a", "блядский", 2, "putan", []],
    ["qonar", "n", "мудак", 2, "qonar", [["мудак", "дурак", "дур", "муд"]]],
    ["qonarou", "n", "дурачок (мягко, почти ласково)", 1, "qonar", []],
    ["qonarach", "n", "полный мудак (очень грубо)", 3, "qonar", []],
    ["qonarela", "n", "дура, стерва", 2, "qonar", []],
    ["qonariq", "a", "мудацкий", 2, "qonar", []],
    ["qonarman", "adv", "по-мудацки", 2, "qonar", []],
    ["fouter", "v", "ебать (груб.); трахать", 3, "fouter", [["ебать", "ждать", "жд", "еб"]]],
    ["defouter", "v", "отъебаться, отстать (груб.); Defoute! — Отъебись!", 3, "fouter", [["отъебаться", null, null, null, ["отъебаться", "отъебись", "отъебитесь", "отъебался", "отъебалась", "отъебались"]]]],
    ["fouteur", "n", "ёбарь (груб.)", 3, "fouter", []],
    ["foutey", "a", "ёбаный, конченый (груб.)", 3, "fouter", [["ёбаный", null, null, null, ["ёбаный", "ебаный", "ёбаная", "ебаная", "ёбаное", "ебаное", "ёбаные", "ебаные"]]]],
    ["bordel", "n", "бардак; «пиздец» (о беспорядке)", 2, "bordel", [["бардак", "дурак", "дур", "бард"]]],
    ["bordelou", "f", "ну дела! (мягко)", 1, "bordel", []],
    ["bordelach", "f", "полный пиздец! (очень грубо)", 3, "bordel", [["пиздец", null, null, null, ["пиздец", "пиздеца", "пиздецу", "пиздецом", "пиздеце"]]]],
    ["bordeliq", "a", "бардачный, через жопу", 2, "bordel", []],
    ["bordeler", "v", "творить бардак, всё портить", 2, "bordel", []],
    ["merdou", "f", "ерунда, «блин» (мягко)", 1, "merd", [["ерунда", "мразь", "мраз", "ерунд", ["ерунда", "ерунды", "ерунде", "ерунду", "ерундой"]]]],
    ["merdach", "n", "полное дерьмо (очень грубо)", 3, "merd", []],
    ["merder", "v", "облажаться, всё испортить", 2, "merd", [["облажаться", null, null, null, ["облажаться", "облажался", "облажалась", "облажались", "облажаюсь", "облажаешься", "облажается"]]]],
    ["demerder", "v", "выкрутиться, выпутаться (разг.)", 2, "merd", [["выкрутиться", null, null, null, ["выкрутиться", "выкрутился", "выкрутилась", "выкрутились", "выкручусь", "выкрутишься", "выкрутится"]]]],
    ["merdeur", "n", "засранец", 2, "merd", [["засранец", null, null, null, ["засранец", "засранца", "засранцу", "засранцем", "засранце", "засранцы", "засранцев"]]]],
    ["vachman", "adv", "чертовски, охренительно (усилитель)", 2, "vachman", [["охренительно", null, null, null, ["охренительно", "охуенно", "чертовски"]]]],
  ];
  // B — звёздные проклятия (обычные слова языка, высокий стиль)
  const B = [["Etoil etenyey!", "Погасшая звезда! (проклятие)"], ["Tenebr!", "Тьма! (досада, высокий стиль)"], ["Ta etoil etenyeset!", "Чтоб твоя звезда погасла!"],
    ["Le nui to preneset!", "Пусть ночь тебя заберёт!"], ["Sandr e abim!", "Пепел и бездна!"]];
  const STR = ["высокий стиль", "мягко", "обычно", "грубо"];
  const KEY = "etoilal-adult";
  const on = () => { try { return localStorage.getItem(KEY) === "1"; } catch (e) { return false; } };
  const set = (v) => { try { v ? localStorage.setItem(KEY, "1") : localStorage.removeItem(KEY); } catch (e) {} };
  const words = new Set(W.map((x) => x[0]));
  const isRude = (row) => words.has(row[0]) || /\(18\+\)/.test(row[2] || "");     // строка словаря ET_DICT
  // словарь: при включённом 18+ — добавить мат; иначе — убрать и уже бывшие грубые слова (с пометкой 18+)
  let dictDone = false;
  function dict() {
    if (dictDone || !window.ET_DICT) return; dictDone = true;
    if (on()) for (const [w, p, m, s] of W) ET_DICT.words.push([w, p, `${m} (18+, ${STR[s]})`, typeof rd === "function" ? rd(w) : "", 99999, ""]);
    else ET_DICT.words = ET_DICT.words.filter((r) => !isRude(r));
  }
  // переводчик и проверка текста: подмешать слова (вызывается после init переводчика)
  function tr() { if (on() && typeof trAddWords === "function") trAddWords(W.map(([w, p, m, s, , ru]) => ({ w, p: p === "f" ? "f" : p, m: `${m} (18+)`, like: p === "v" ? "emer" : null, ru }))); }
  const toggle = (id) => `<label class="adtog"><input type="checkbox" id="${id}"${on() ? " checked" : ""}> Показывать мат и грубые слова (18+)</label>`;
  function bindToggle(id) { const c = document.getElementById(id); if (!c) return;
    c.onchange = () => { if (c.checked && !confirm("Тебе уже есть 18 лет? Будут показаны грубые слова и мат.")) { c.checked = false; return; } set(c.checked); location.reload(); }; }
  return { W, B, STR, on, set, isRude, dict, tr, toggle, bindToggle };
})();

// ---------------------------------------------------------------- уроки мата (#/мат, #/мат/N)
const MAT_LESSONS = [
  { t: "Пять корней", s: "putan, qonar, fouter, bordel, merd — откуда они и что значат",
    html: `<p>Весь мат Etoilal держится на <b>пяти корнях</b>. Все они — из французского, как и остальной язык. Запомнишь пять корней — поймёшь любое ругательство.</p>
      <table class="tbl"><tbody><tr><td class="et">putan</td><td>блядь! (досада)</td><td class="muted">франц. putain</td></tr><tr><td class="et">qonar</td><td>мудак</td><td class="muted">connard</td></tr>
      <tr><td class="et">fouter</td><td>ебать</td><td class="muted">foutre</td></tr><tr><td class="et">bordel</td><td>бардак, пиздец</td><td class="muted">bordel</td></tr><tr><td class="et">merd</td><td>дерьмо</td><td class="muted">merde</td></tr></tbody></table>
      <p>Примеры:</p>`, ex: [["Putan, je perdim ma qle!", "Блядь, я потерял ключ!"], ["Il eset un qonar.", "Он мудак."], ["Qel bordel!", "Какой бардак!"], ["Merd! Le port eset fermey.", "Дерьмо! Дверь закрыта."]],
    tasks: [{ k: "choice", q: "Что значит qonar?", opts: ["мудак", "бардак", "дерьмо"], a: "мудак", lang: "x", why: "qonar — от франц. connard" },
      { k: "choice", q: "Как сказать «Какой бардак!»?", opts: ["Qel bordel!", "Qel merd!", "Qel putan!"], a: "Qel bordel!", lang: "x", why: "bordel — бардак" },
      { k: "input", q: "Напиши корень, который значит «дерьмо»", a: ["merd"], why: "merd — от merde" }] },
  { t: "Шкала силы", s: "-ou мягко, основа — обычно, -ach грубо, vachman — «чертовски»",
    html: `<p>Силу ругательства меняют <b>те же суффиксы</b>, что и у обычных слов: <b class="et">-ou</b> (маленькое) делает слово мягче, <b class="et">-ach</b> (огромное) — грубее.</p>
      <table class="tbl"><tbody><tr><th>мягко</th><th>обычно</th><th>грубо</th></tr><tr><td class="et">putanou</td><td class="et">putan</td><td class="et">putanach</td></tr>
      <tr><td>блин!</td><td>блядь!</td><td>ёб твою мать!</td></tr><tr><td class="et">qonarou</td><td class="et">qonar</td><td class="et">qonarach</td></tr><tr><td>дурачок</td><td>мудак</td><td>полный мудак</td></tr>
      <tr><td class="et">bordelou</td><td class="et">bordel</td><td class="et">bordelach</td></tr><tr><td>ну дела!</td><td>бардак</td><td>полный пиздец!</td></tr>
      <tr><td class="et">merdou</td><td class="et">merd</td><td class="et">merdach</td></tr><tr><td>ерунда</td><td>дерьмо</td><td>полное дерьмо</td></tr></tbody></table>
      <p>Усилитель <b class="et">vachman</b> («чертовски», от франц. vachement) ставится перед словом, как <span class="et">tre</span>: <span class="et">vachman bo</span> — «чертовски красивый».</p>`,
    ex: [["Putanou, j'oubliim!", "Блин, я забыл!"], ["Tu eses vachman bo!", "Ты чертовски красивый!"], ["Bordelach!", "Полный пиздец!"], ["Il eset un qonarou.", "Он дурачок."]],
    tasks: [{ k: "choice", q: "Самое мягкое из трёх:", opts: ["putanou", "putan", "putanach"], a: "putanou", lang: "x", why: "-ou — мягче" },
      { k: "choice", q: "Как сказать «полный пиздец!»?", opts: ["Bordelach!", "Bordelou!", "Bordel!"], a: "Bordelach!", lang: "x", why: "-ach — грубее, сильнее" },
      { k: "input", q: "«дурачок» (мягко)", a: ["qonarou"], why: "qonar + ou" }] },
  { t: "Слова из корней", s: "-iq, -man, -ela, -eur и приставка de-",
    html: `<p>От корней мата строятся слова по обычным правилам языка:</p>
      <table class="tbl"><tbody><tr><td class="et">qonariq</td><td>мудацкий</td><td class="muted">-iq — прилагательное</td></tr><tr><td class="et">qonarman</td><td>по-мудацки</td><td class="muted">-man — как?</td></tr>
      <tr><td class="et">qonarela</td><td>дура, стерва</td><td class="muted">-ela — женщина</td></tr><tr><td class="et">merdeur</td><td>засранец</td><td class="muted">-eur — кто делает</td></tr>
      <tr><td class="et">putaniq</td><td>блядский</td><td></td></tr><tr><td class="et">bordeliq</td><td>бардачный, через жопу</td><td></td></tr>
      <tr><td class="et">foutey</td><td>ёбаный</td><td class="muted">-ey — «сделанный»</td></tr></tbody></table>`,
    ex: [["Il parlet qonarman.", "Он говорит по-мудацки."], ["Le travay foutey!", "Ёбаная работа!"], ["Ma chanbr eset bordeliq.", "Моя комната — бардак."]],
    tasks: [{ k: "choice", q: "Что значит qonarman?", opts: ["по-мудацки", "мудацкий", "дура"], a: "по-мудацки", lang: "x", why: "-man — наречие" },
      { k: "input", q: "«засранец» (от merd + «кто делает»)", a: ["merdeur"], why: "merd + eur" },
      { k: "choice", q: "«ёбаная работа» —", opts: ["le travay foutey", "le foutey travay", "le travay fouter"], a: "le travay foutey", lang: "x", why: "прилагательное — после слова; -ey" }] },
  { t: "Глаголы", s: "fouter, merder, demerder, defouter, bordeler — со всеми временами",
    html: `<p>Глаголы мата спрягаются, как все глаголы: основа + время + кто.</p>
      <table class="tbl"><tbody><tr><td class="et">merder</td><td>облажаться</td><td class="et">Je merdim.</td><td>Я облажался.</td></tr>
      <tr><td class="et">demerder</td><td>выкрутиться</td><td class="et">Nou demerdren.</td><td>Мы выкрутимся.</td></tr>
      <tr><td class="et">defouter</td><td>отъебаться</td><td class="et">Defoute!</td><td>Отъебись!</td></tr>
      <tr><td class="et">bordeler</td><td>творить бардак</td><td class="et">Ilz bordelel.</td><td>Они творят бардак.</td></tr>
      <tr><td class="et">fouter</td><td>ебать</td><td class="et">Je fouterim pa…</td><td>Я бы не стал… (груб.)</td></tr></tbody></table>`,
    ex: [["Je merdim.", "Я облажался."], ["Nou demerdren.", "Мы выкрутимся."], ["Defoute!", "Отъебись!"]],
    tasks: [{ k: "input", q: "«Я облажался» (было, один раз)", a: ["Je merdim."], why: "merd + i + m" },
      { k: "input", q: "«Мы выкрутимся» (будет)", a: ["Nou demerdren."], why: "demerd + re + n" },
      { k: "choice", q: "Как сказать «Отъебись!»?", opts: ["Defoute!", "Fouter!", "Defoutem!"], a: "Defoute!", lang: "x", why: "приказ: основа + e" }] },
  { t: "Звёздные проклятия", s: "высокий стиль для песен и стихов",
    html: `<p>Для песен и стихов грубые слова не годятся. Там ругаются <b>звёздами и ночью</b> — красиво, но зло. Это обычные слова языка, их можно говорить при всех.</p>`,
    ex: null, tasks: [{ k: "choice", q: "Что значит «Ta etoil etenyeset!»?", opts: ["Чтоб твоя звезда погасла!", "Твоя звезда красивая!", "Пусть ночь придёт!"], a: "Чтоб твоя звезда погасла!", lang: "x", why: "etenyer — гаснуть; se — пусть" },
      { k: "choice", q: "Какое проклятие — «высокий стиль»?", opts: ["Sandr e abim!", "Bordelach!", "Putan!"], a: "Sandr e abim!", lang: "x", why: "пепел и бездна — для стихов" }] },
];
function pageMat(a) {
  const lv = Lv.level();
  if (lv < MAT_LEVEL) return `<div class="card soon nokeep"><div class="ic">🔒</div><h2>Уроки мата — с уровня ${Lv.badge(MAT_LEVEL)}</h2>
    <p class="muted">Сначала пройди самоучитель до контрольной раздела ${MAT_LEVEL} «${esc(ET_C2I.sections[MAT_LEVEL - 1])}». Сейчас у тебя ${lv ? Lv.badge(lv) : "нет уровня"}.</p><a class="btn gold" href="#/учиться">К урокам</a></div>`;
  if (!Mat.on()) return `<div class="card soon nokeep"><div class="ic">🔞</div><h2>Уроки мата — только 18+</h2><p class="muted">Включи показ грубых слов — тогда откроются уроки, а мат появится в словаре и переводчике.</p>${Mat.toggle("adtm")}</div>`;
  const n = +a[0]; const S = Store.get(); S.matDone = S.matDone || {};
  if (!n) return `<div class="k">18+ · уровень ${Lv.badge(MAT_LEVEL)}</div><h1 class="page">Мат Etoilal</h1>
    <p class="lead">Как ругаются на языке звёзд: пять корней, шкала силы, слова и глаголы, а для песен — звёздные проклятия.</p>${Mat.toggle("adtm")}
    <div class="llist">${MAT_LESSONS.map((L, i) => `<a class="card lrow" href="#/мат/${i + 1}"><span class="ln">${S.matDone[i + 1] ? "✓" : i + 1}</span><span class="lt"><b>${esc(L.t)}</b><small>${esc(L.s)}</small></span><span class="lst">▶</span></a>`).join("")}</div>`;
  const L = MAT_LESSONS[n - 1]; if (!L) return `<div class="card soon"><h2>Такого урока нет</h2><a class="btn gold" href="#/мат">К урокам мата</a></div>`;
  const ex = L.ex || Mat.B;
  return `<a class="muted" href="#/мат">← Уроки мата</a><div class="k" style="margin-top:10px">18+ · урок ${n} из ${MAT_LESSONS.length}</div><h1 class="page">${esc(L.t)}</h1><p class="lead">${esc(L.s)}</p>
    <div class="card c2sec">${L.html}<div class="matex">${ex.map(([e, r]) => `<div class="c2w">${playBtn(e, 1)}<div><b class="et">${esc(e)}</b><div class="muted">${esc(r)}</div></div></div>`).join("")}</div></div>
    <h2 class="c2h">✍ Задания</h2><div class="alt-qs" id="mattasks"></div><div id="matend"></div>`;
}
function bindMat(a) {
  Mat.bindToggle("adtm"); const n = +a[0], L = MAT_LESSONS[n - 1]; if (!L || !$("#mattasks")) return;
  let left = L.tasks.length;
  AltT.mount($("#mattasks"), L.tasks, { onAnswer: () => { if (--left) return; const S = Store.get(); S.matDone = S.matDone || {};
    if (!S.matDone[n]) { S.matDone[n] = 1; Store.addPoints(10); }
    $("#matend").innerHTML = `<div class="card c2res"><h2>Урок пройден ✦</h2><div class="row" style="justify-content:center;gap:10px">${MAT_LESSONS[n] ? `<a class="btn gold" href="#/мат/${n + 1}">Дальше: ${esc(MAT_LESSONS[n].t)} ▶</a>` : ""}<a class="btn" href="#/мат">Все уроки мата</a></div></div>`; } });
}
