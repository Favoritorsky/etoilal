window.ET_C2 = window.ET_C2 || {};
ET_C2[30] = { n: 30, sec: 4, t: "Пусть и чтобы: se", s: "Il dormeset — пусть спит; Je voulem ke tu chanteses — чтобы ты пел",
  words: [["perder", "терять"], ["brizer", "ломать, разбивать"], ["rout", "дорога"], ["pri", "цена"], ["modik", "дешёвый"]],
  gram: ["ke"], unlock: { m: ["se"] },
  sut: "Кусочек <b>se</b> — «пусть»: Il dormeset — пусть спит. «Чтобы» — <b>ke</b> + глагол с se: Je voulem ke tu chanteses — я хочу, чтобы ты пел.",
  rule: `<p>основа + время + <b>se</b> + кто</p><p><span class="et">Il dormeset!</span> Пусть спит!</p><p><span class="et">Je voulem ke tu chanteses.</span> Я хочу, чтобы ты пел.</p>`,
  prosto: `<p>Второй кусочек между временем и «кто» — <b>se</b>, «пусть»:</p>
> Il dormeset! :: Пусть спит!
> Ilz chantesel! :: Пусть поют!
> El repozeset. :: Пусть отдыхает.
<h3>«Чтобы»</h3>
<p>«Чтобы» = [[ke]] + глагол с <b>se</b>:</p>
> Je voulem ke tu chanteses. :: Я хочу, чтобы ты пел.
> Il demandet ke nou partesen. :: Он просит, чтобы мы ушли.
<p>Подсказка: после [[ke]] в смысле «чтобы» — всегда <b>se</b>.</p>
<h3>Как в русском</h3>
<p>В русском «пусть» и «чтобы» — отдельные слова, а глагол почти не меняется («пусть поёт», «чтобы пел»). В Etoilal «пусть» живёт внутри глагола.</p>
<h3>Частые ошибки</h3>
<p>• Без se после «чтобы»: «Je voulem ke tu chantes» звучит как «хочу, что ты поёшь». Правильно — [[Je voulem ke tu chanteses.]] • Путать se и ri: ri — «бы», se — «пусть».</p>`,
  lub: `<p>Это <b>сослагательное наклонение</b> — французское <i>subjonctif</i>: <i>je veux que tu chantes</i>. Только во французском оно обязательное и полно исключений, а в Etoilal — просто кусочек se.</p>`,
  tasks: [
    { k: "input", q: "Пусть спит!", a: ["Il dormeset!", "Dormeset!"], why: "e + se + t" },
    { k: "input", q: "Пусть поют!", a: ["Ilz chantesel!"], why: "e + se + l" },
    { k: "input", q: "Я хочу, чтобы ты пел.", a: ["Je voulem ke tu chanteses."], why: "ke + se" },
    { k: "input", q: "Он просит, чтобы мы ушли.", a: ["Il demandet ke nou partesen."], why: "ke + part-e-se-n" },
    { k: "fix", q: "Je voulem ke tu chantes.", a: ["Je voulem ke tu chanteses."], why: "после «чтобы» — se" },
    { k: "choice", q: "Что значит repozeset?", opts: ["пусть отдыхает", "отдыхал бы", "наверное, отдыхает"], a: "пусть отдыхает", lang: "x", why: "se — пусть" },
    { k: "tiles", q: "Пусть она не теряет ключ.", a: "El perdeset pa le kle", d: ["perdet", "perderit"], why: "e + se + t, pa после" },
    { k: "choice", q: "Что значит modik?", opts: ["дешёвый", "цена", "дорога"], a: "дешёвый", lang: "x", why: "modik — дешёвый, pri — цена" },
    { k: "input", q: "Пусть он не разбивает окно!", a: ["Il brizeset pa le fenetr!"], why: "briz + e + se + t, pa после" },
  ] };
