window.ET_C2 = window.ET_C2 || {};
ET_C2[30] = { n: 30, sec: 4, t: "Пусть и чтобы: se", s: "Il dormeset — пусть спит; Je voulem qe tu chanteses — чтобы ты пел",
  words: [["perder", "терять"], ["brizer", "ломать, разбивать"], ["rout", "дорога"], ["pri", "цена"], ["modiq", "дешёвый"]],
  gram: ["qe"], unlock: { m: ["se"] },
  sut: "Кусочек <b>se</b> — «пусть»: Il dormeset — пусть спит. «Чтобы» — <b>qe</b> + глагол с se: Je voulem qe tu chanteses — я хочу, чтобы ты пел.",
  rule: `<p>основа + время + <b>se</b> + кто</p><p><span class="et">Il dormeset!</span> Пусть спит!</p><p><span class="et">Je voulem qe tu chanteses.</span> Я хочу, чтобы ты пел.</p>`,
  prosto: `<p>Второй кусочек между временем и «кто» — <b>se</b>, «пусть»:</p>
> Il dormeset! :: Пусть спит!
> Ilz chantesel! :: Пусть поют!
> El repozeset. :: Пусть отдыхает.
<h3>«Чтобы»</h3>
<p>«Чтобы» = [[qe]] + глагол с <b>se</b>:</p>
> Je voulem qe tu chanteses. :: Я хочу, чтобы ты пел.
> Il demandet qe nou partesen. :: Он просит, чтобы мы ушли.
<p>Подсказка: после [[qe]] в смысле «чтобы» — всегда <b>se</b>.</p>
<h3>Как в русском</h3>
<p>В русском «пусть» и «чтобы» — отдельные слова, а глагол почти не меняется («пусть поёт», «чтобы пел»). В Etoilal «пусть» живёт внутри глагола.</p>
<h3>Частые ошибки</h3>
<p>• Без se после «чтобы»: «Je voulem qe tu chantes» звучит как «хочу, что ты поёшь». Правильно — [[Je voulem qe tu chanteses.]] • Путать se и ri: ri — «бы», se — «пусть».</p>`,
  lub: `<p>Это <b>сослагательное наклонение</b> — французское <i>subjonctif</i>: <i>je veux que tu chantes</i>. Только во французском оно обязательное и полно исключений, а в Etoilal — просто кусочек se.</p>`,
  tasks: [
    {"k": "input", "q": "Пусть она спит!", "a": ["El dormeset!"], "why": "e + se + t"},
    {"k": "input", "q": "Пусть танцуют!", "a": ["Ilz dansesel!"], "why": "e + se + l"},
    {"k": "input", "q": "Я хочу, чтобы ты танцевал.", "a": ["Je voulem qe tu danseses."], "why": "qe + se"},
    {"k": "input", "q": "Она просит, чтобы я ушёл.", "a": ["El demandet qe je partesem."], "why": "qe + part-e-se-m"},
    {"k": "fix", "q": "Il voulet qe nou chanten.", "a": ["Il voulet qe nou chantesen."], "why": "после «чтобы» — se"},
    { k: "choice", q: "Что значит repozeset?", opts: ["пусть отдыхает", "отдыхал бы", "наверное, отдыхает"], a: "пусть отдыхает", lang: "x", why: "se — пусть" },
    { k: "tiles", q: "Пусть она не теряет ключ.", a: "El perdeset pa le qle", d: ["perdet", "perderit"], why: "e + se + t, pa после" },
    { k: "choice", q: "Что значит modiq?", opts: ["дешёвый", "цена", "дорога"], a: "дешёвый", lang: "x", why: "modiq — дешёвый, pri — цена" },
    { k: "input", q: "Пусть он не разбивает окно!", a: ["Il brizeset pa le fenetr!"], why: "briz + e + se + t, pa после" },
  ] };
