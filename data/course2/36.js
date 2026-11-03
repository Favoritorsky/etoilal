window.ET_C2 = window.ET_C2 || {};
ET_C2[36] = { n: 36, sec: 5, t: "Сравнение: plu, mouen, le plu", s: "больше, меньше, самый — без исключений",
  words: [["ot", "высокий"], ["kour", "короткий"], ["lon", "долгий, длинный"], ["gro", "толстый"], ["cher", "дорогой"], ["difisil", "трудный"]],
  gram: ["plu", "mouen"],
  sut: "<b>plu</b> — более, <b>mouen</b> — менее, <b>le plu</b> — самый, «чем» — <b>ke</b>. Никаких «лучше, хуже»: всё через plu.",
  rule: `<p><span class="et">plu gran ke moi</span> — больше меня</p><p><span class="et">mouen cher</span> — менее дорогой</p><p><span class="et">le plu ot</span> — самый высокий</p>`,
  prosto: `<p>В русском сравнение капризное: «большой — больше», «хороший — лучше», «высокий — выше». В Etoilal правило <b>одно</b>: [[plu]] + прилагательное.</p>
> Il eset plu ot ke moi. :: Он выше меня.
> Le lak eset plu gran ke le rivyer. :: Озеро больше реки.
> Le te eset mouen cher ke le kafe. :: Чай дешевле (менее дорогой), чем кофе.
<h3>Самый</h3>
<p>«Самый» = [[le plu]]. Прилагательное — после слова, как обычно:</p>
> l'arbr le plu ot :: самое высокое дерево
> le lang le plu bo :: самый прекрасный язык
<h3>«Лучше» и «хуже»</h3>
<p>Отдельных слов нет: «лучше» = [[plu bon]], «хуже» = [[mouen bon]]. Исключений нет совсем.</p>
<h3>Частые ошибки</h3>
<p>• Забыть «чем»: «plu ot moi» → [[plu ot ke moi]]. • После ke — выделенная форма: «ke je» → [[ke moi]].</p>`,
  lub: `<p>Во французском почти так же (<i>plus grand que moi</i>), но есть исключения: <i>meilleur</i> «лучше», <i>pire</i> «хуже». Etoilal их убрал. Лингвисты называют такое сравнение <b>аналитическим</b> (отдельным словом), а русское «выше» — <b>синтетическим</b>.</p>`,
  tasks: [
    { k: "input", q: "Он выше меня.", a: ["Il eset plu ot ke moi."], why: "plu + ot + ke moi" },
    { k: "input", q: "Озеро больше реки.", a: ["Le lak eset plu gran ke le rivyer."], why: "plu gran ke" },
    { k: "input", q: "самое высокое дерево", a: ["l'arbr le plu ot"], why: "le plu — самый" },
    { k: "choice", q: "«лучше»", opts: ["plu bon", "meyeur", "bonplu"], a: "plu bon", why: "всё через plu" },
    { k: "input", q: "Чай дешевле, чем кофе. (менее дорогой)", a: ["Le te eset mouen cher ke le kafe."], why: "mouen — менее" },
    { k: "fix", q: "Il eset plu ot ke je.", a: ["Il eset plu ot ke moi."], why: "после ke — moi" },
    { k: "tiles", q: "Дорога длиннее.", a: "Le rout eset plu lon", d: ["mouen", "lons"], why: "plu lon" },
    { k: "choice", q: "Что значит difisil?", opts: ["трудный", "дорогой", "долгий"], a: "трудный", lang: "x", why: "difisil — трудный" },
    { k: "input", q: "самый прекрасный язык", a: ["le lang le plu bo", "le plu bo lang"], why: "le plu bo" },
  ] };
