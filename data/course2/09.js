window.ET_C2 = window.ET_C2 || {};
ET_C2[9] = { n: 9, sec: 1, t: "Глагол сейчас", s: "основа + e + кто — одна схема для всех глаголов",
  words: [["chanter", "петь"], ["danser", "танцевать"], ["parler", "говорить"], ["manjer", "есть (пищу)"], ["dormer", "спать"], ["emer", "любить"], ["regarder", "смотреть"], ["travayer", "работать"]],
  gram: [],
  sut: "Любой глагол: отрежь <b>-er</b> → основа, добавь <b>e</b> (сейчас) и букву <b>кто</b> (m s t n z l): chanter → chant + e + m = <b>chantem</b> «я пою».",
  rule: `<p>основа + <b>e</b> + кто: <span class="et">chantem</span> пою</p><table class="tbl"><tbody><tr><td class="et lt">m</td><td>я</td><td class="et lt">s</td><td>ты</td><td class="et lt">t</td><td>он, она</td></tr><tr><td class="et lt">n</td><td>мы</td><td class="et lt">z</td><td>вы</td><td class="et lt">l</td><td>они</td></tr></tbody></table>`,
  prosto: `<p>Помнишь «быть»: es-e-m, es-e-s, es-e-t…? <b>Все</b> глаголы Etoilal устроены точно так же. Неправильных глаголов нет — ни одного.</p>
<h3>Три шага</h3>
<p>1) Возьми глагол из словаря: [[chanter]] — «петь». 2) Отрежь <b>-er</b>: остаётся основа <b>chant</b>. 3) Добавь <b>e</b> (сейчас) и букву «кто»:</p>
@@pin:verb@@
> Je chantem. :: Я пою.
> Tu danses. :: Ты танцуешь.
> Il parlet. :: Он говорит.
> El dormet. :: Она спит.
> Nou manjen. :: Мы едим.
> Vou regardez. :: Вы смотрите.
> Ilz travayel. :: Они работают.
<h3>Как читать глагол</h3>
<p>Читай <b>с конца</b>: последняя буква — кто, перед ней — когда (пока только e — сейчас), всё остальное — что делают. [[dormel]] → dorm + e + l → «они спят».</p>
<h3>Как в русском, а как нет</h3>
<p>В русском окончания у каждого глагола свои: пиш<b>у</b>, сид<b>им</b>, хоч<b>ет</b>, ед<b>ят</b>… Тут одна схема: выучил шесть букв — знаешь все формы всех глаголов.</p>
<p>И ещё: «я» и «ты» можно не говорить — по последней букве и так ясно, кто: [[Chantem.]] — «Пою».</p>
<h3>Частые ошибки</h3>
<p>• Забыть e: «chantm» → [[chantem]]. • Путать t и l: «Lez anfan danset» (дети) → [[Lez anfan dansel.]] • Слияние: «je emem» → [[j'emem]].</p>`,
  lub: `<p>В Etoilal шесть «времён», и это только первое. Вместо e можно поставить i (было), re (будет) и ещё три — и всё по той же схеме. Лингвисты называют такой глагол <b>агглютинативным</b>: значения «приклеиваются» друг за другом, как в турецком или финском. Во французском, откуда корни, всё наоборот — формы сливаются и полны исключений.</p>`,
  pins: [{ id: "verb", t: "Глагол сейчас: основа + e + кто", html: `<table class="tbl"><thead><tr><th></th><th>кто</th><th>пример</th></tr></thead><tbody><tr><td class="et lt">m</td><td>я</td><td><span class="et">chantem</span> пою</td></tr><tr><td class="et lt">s</td><td>ты</td><td><span class="et">chantes</span> поёшь</td></tr><tr><td class="et lt">t</td><td>он, она</td><td><span class="et">chantet</span> поёт</td></tr><tr><td class="et lt">n</td><td>мы</td><td><span class="et">chanten</span> поём</td></tr><tr><td class="et lt">z</td><td>вы</td><td><span class="et">chantez</span> поёте</td></tr><tr><td class="et lt">l</td><td>они</td><td><span class="et">chantel</span> поют</td></tr></tbody></table>` }],
  tasks: [
    { k: "input", q: "я пою", a: ["Je chantem."], why: "chant + e + m" },
    { k: "input", q: "ты танцуешь", a: ["Tu danses."], why: "dans + e + s" },
    { k: "choice", q: "Что значит dormet?", opts: ["он спит", "я сплю", "они спят"], a: "он спит", lang: "x", why: "t — он/она" },
    { k: "input", q: "мы едим", a: ["Nou manjen."], why: "manj + e + n" },
    { k: "input", q: "Они работают.", a: ["Ilz travayel."], why: "travay + e + l" },
    { k: "input", q: "Я люблю кофе.", a: ["J'emem le kafe."], why: "je + emem → j'emem" },
    { k: "tiles", q: "Дети танцуют.", a: "Lez anfan dansel", d: ["danset", "le"], why: "много → l (они)" },
    { k: "fix", q: "Lez cha dormet.", a: ["Lez cha dormel."], why: "кошки — они → l" },
    { k: "choice", q: "Что значит regardez?", opts: ["вы смотрите", "мы смотрим", "ты смотришь"], a: "вы смотрите", lang: "x", why: "z — вы" },
    { k: "listen", say: "El parlet.", q: "Что прозвучало?", opts: ["El parlet.", "El parlel.", "Elz parlel."], a: "El parlet.", why: "«Она говорит»" },
  ] };
