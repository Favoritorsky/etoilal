window.ET_C2 = window.ET_C2 || {};
ET_C2[36] = { n: 36, sec: 5, t: "Сравнение: plu, mouen, le plu", s: "больше, меньше, самый — без исключений",
  words: [["ot", "высокий"], ["qour", "короткий"], ["lon", "долгий, длинный"], ["gro", "толстый"], ["cher", "дорогой"], ["difisil", "трудный"]],
  gram: ["plu", "mouen"],
  sut: "<b>plu</b> — более, <b>mouen</b> — менее, <b>le plu</b> — самый, «чем» — <b>qe</b>. Никаких «лучше, хуже»: всё через plu.",
  rule: `<p><span class="et">plu gran qe moi</span> — больше меня</p><p><span class="et">mouen cher</span> — менее дорогой</p><p><span class="et">le plu ot</span> — самый высокий</p>`,
  prosto: `<p>В русском сравнение капризное: «большой — больше», «хороший — лучше», «высокий — выше». В Etoilal правило <b>одно</b>: [[plu]] + прилагательное.</p>
> Il eset plu ot qe moi. :: Он выше меня.
> Le laq eset plu gran qe le rivyer. :: Озеро больше реки.
> Le te eset mouen cher qe le qafe. :: Чай дешевле (менее дорогой), чем кофе.
<h3>Самый</h3>
<p>«Самый» = [[le plu]]. Прилагательное — после слова, как обычно:</p>
> l'arbr le plu ot :: самое высокое дерево
> le lang le plu bo :: самый прекрасный язык
<h3>«Лучше» и «хуже»</h3>
<p>Отдельных слов нет: «лучше» = [[plu bon]], «хуже» = [[mouen bon]]. Исключений нет совсем.</p>
<h3>Частые ошибки</h3>
<p>• Забыть «чем»: «plu ot moi» → [[plu ot qe moi]]. • После qe — выделенная форма: «qe je» → [[qe moi]].</p>`,
  lub: `<p>Во французском почти так же (<i>plus grand que moi</i>), но есть исключения: <i>meilleur</i> «лучше», <i>pire</i> «хуже». Etoilal их убрал. Лингвисты называют такое сравнение <b>аналитическим</b> (отдельным словом), а русское «выше» — <b>синтетическим</b>.</p>`,
  tasks: [
    {"k": "input", "q": "Она выше тебя.", "a": ["El eset plu ot qe toi."], "why": "plu + ot + qe toi"},
    {"k": "input", "q": "Море больше озера.", "a": ["Le mer eset plu gran qe le laq."], "why": "plu gran qe"},
    {"k": "input", "q": "самый высокий дом", "a": ["le mezon le plu ot"], "why": "le plu — самый"},
    { k: "choice", q: "«лучше»", opts: ["plu bon", "meyeur", "bonplu"], a: "plu bon", why: "всё через plu" },
    {"k": "input", "q": "Хлеб дешевле сыра. (менее дорогой)", "a": ["Le pen eset mouen cher qe le fromaj."], "why": "mouen — менее"},
    {"k": "fix", "q": "Tu eses plu gro qe je.", "a": ["Tu eses plu gro qe moi."], "why": "после qe — moi"},
    { k: "tiles", q: "Дорога длиннее.", a: "Le rout eset plu lon", d: ["mouen", "lons"], why: "plu lon" },
    { k: "choice", q: "Что значит difisil?", opts: ["трудный", "дорогой", "долгий"], a: "трудный", lang: "x", why: "difisil — трудный" },
    {"k": "input", "q": "самая длинная дорога", "a": ["le rout le plu lon", "le plu lon rout"], "why": "le plu lon"},
  ] };
