window.ET_C2 = window.ET_C2 || {};
ET_C2[32] = { n: 32, sec: 4, t: "Поющий и спетый: -ant и -ey", s: "причастия и «песня была спета»",
  words: [["eqrivene", "писатель"], ["versiq", "стихотворение"], ["chanteur", "певец"], ["danseur", "танцор"], ["muziq", "музыка"]],
  gram: ["par"], unlock: { part: true },
  sut: "<b>-ant</b> — «-ущий»: chantant — поющий. <b>-ey</b> — «-нный, -тый»: chantey — спетый. «Была спета кем-то» = esit + -ey + <b>par</b>.",
  rule: `<p><span class="et">chantant</span> поющий · <span class="et">chantey</span> спетый</p><p><span class="et">Le chanson esit chantey par l'anfan.</span> Песня была спета ребёнком.</p>`,
  prosto: `<p>Из любого глагола можно сделать «прилагательное»:</p>
<p>• <b>основа + ant</b> — тот, кто делает сейчас: «поющий, танцующий». • <b>основа + ey</b> — то, с чем это сделали: «спетый, написанный».</p>
> un anfan chantant :: поющий ребёнок
> un versiq eqrivey :: написанное стихотворение
> lez danseur dansant :: танцующие танцоры
<p>Они, как все прилагательные, стоят после слова и не меняются.</p>
<h3>«Была спета» — кем-то</h3>
<p>Чтобы сказать, что действие сделали <b>с чем-то</b>, берут «быть» + <b>-ey</b>, а «кем» — через [[par]]:</p>
> Le chanson esit chantey par l'anfan. :: Песня была спета ребёнком.
> Le versiq eset lizey par le metr. :: Стихотворение читается учителем.
> Le livr esit eqrivey par un eqrivene. :: Книга была написана писателем.
<h3>Как в русском</h3>
<p>В русском «спетый, спета, спеты» и «ребёнком» с окончанием. В Etoilal [[chantey]] не меняется, а «кем» — просто [[par]] + слово.</p>
<h3>Частые ошибки</h3>
<p>• Путать -ant и -ey: поющий (сам делает) — [[chantant]], спетый (с ним сделали) — [[chantey]]. • Забыть par: «esit chantey l'anfan» → [[esit chantey par l'anfan]].</p>`,
  lub: `<p>-ey выбран специально: если бы причастие было на -at, оно совпало бы с формой «он пел» (chantat). В Etoilal строгое правило — ни одно слово не совпадает с формой глагола. Лингвисты назвали бы «была спета» <b>пассивом</b>.</p>`,
  tasks: [
    {"k": "input", "q": "танцующий ребёнок", "a": ["un anfan dansant", "l'anfan dansant"], "why": "основа + ant"},
    {"k": "input", "q": "написанное письмо", "a": ["un qourye eqrivey", "le qourye eqrivey"], "why": "основа + ey"},
    { k: "choice", q: "«спетый»", opts: ["chantant", "chantey", "chantet"], a: "chantey", why: "-ey — «-нный, -тый»" },
    {"k": "input", "q": "Стихотворение было написано учителем.", "a": ["Le versiq esit eqrivey par le metr."], "why": "esit + -ey + par"},
    {"k": "input", "q": "Книга была прочитана ребёнком.", "a": ["Le livr esit lizey par l'anfan."], "why": "esit + lizey + par"},
    {"k": "fix", "q": "Le versiq esit chantey le chanteur.", "a": ["Le versiq esit chantey par le chanteur."], "why": "«кем» — через par"},
    {"k": "tiles", "q": "поющие певцы", "a": "lez chanteur chantant", "d": ["chantey", "chantantz"], "why": "-ant; прилагательное не меняется"},
    { k: "choice", q: "Что значит muziq?", opts: ["музыка", "песня", "стихотворение"], a: "музыка", lang: "x", why: "muziq — музыка, versiq — стихотворение" },
    { k: "input", q: "Музыка слушается певцом. (eqoutey)", a: ["Le muziq eset eqoutey par le chanteur."], why: "eset + eqoutey + par" },
  ] };
