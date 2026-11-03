window.ET_C2 = window.ET_C2 || {};
ET_C2[35] = { n: 35, sec: 5, t: "Который: ki и ke", s: "l'anfan ki chantet; le livr ke je lizem",
  words: [["ibou", "сова"], ["kloch", "колокол"], ["orloj", "часы"], ["fotografi", "фотография"], ["lanp", "лампа"]],
  gram: [],
  sut: "«Который» — <b>ki</b>, если он сам делает действие (l'anfan ki chantet — ребёнок, который поёт), и <b>ke</b>, если с ним что-то делают (le livr ke je lizem — книга, которую я читаю).",
  rule: `<p><span class="et">ki</span> — который сам делает: <span class="et">l'ibou ki dormet</span></p><p><span class="et">ke</span> — с которым делают: <span class="et">le fotografi ke je regardem</span></p>`,
  prosto: `<p>Ты уже знаешь [[ki]] «кто» и [[ke]] «что, чтобы». Они же работают как «который»:</p>
<h3>ki — он сам делает</h3>
> l'anfan ki chantet :: ребёнок, который поёт
> L'ibou ki dormet laba eset vyeu. :: Сова, которая спит там, старая.
> Le kloch ki chantet eset gran. :: Колокол, который поёт, большой.
<h3>ke — с ним делают</h3>
> le livr ke je lizem :: книга, которую я читаю
> Le fotografi ke tu regardes eset bo. :: Фотография, на которую ты смотришь, прекрасна.
> L'orloj ke nou trouvin eset vyeu. :: Часы, которые мы нашли, старые.
<h3>Как выбрать</h3>
<p>Задай вопрос: «который <b>сам</b> делает?» → [[ki]]. «<b>Его</b> делают?» → [[ke]]. Подсказка: после [[ke]] обычно стоит «кто делает» (je, tu, nou…), а после [[ki]] — сразу глагол.</p>
<h3>Частые ошибки</h3>
<p>• «le livr ki je lizem» → [[le livr ke je lizem]] (книгу читаю я). • ke перед гласной сливается: [[ke il]] → [[k'il]].</p>`,
  lub: `<p>Во французском так же: <i>qui</i> и <i>que</i>. В русском одно слово «который», зато оно меняется по падежам: «который, которую, которому». В Etoilal падежей нет — их работу делает выбор ki/ke.</p>`,
  tasks: [
    { k: "choice", q: "«ребёнок, который поёт»", opts: ["l'anfan ki chantet", "l'anfan ke chantet"], a: "l'anfan ki chantet", why: "сам делает — ki" },
    { k: "choice", q: "«книга, которую я читаю»", opts: ["le livr ki je lizem", "le livr ke je lizem"], a: "le livr ke je lizem", why: "её читают — ke" },
    {"k": "input", "q": "Кошка, которая спит здесь, молодая.", "a": ["Le cha ki dormet isi eset jeun."], "why": "сама спит — ki"},
    {"k": "input", "q": "Книга, которую мы нашли, старая.", "a": ["Le livr ke nou trouvin eset vyeu."], "why": "её нашли — ke"},
    {"k": "fix", "q": "Le tablo ki tu regardes eset bo.", "a": ["Le tablo ke tu regardes eset bo."], "why": "на неё смотрят — ke"},
    {"k": "tiles", "q": "Сова, которая поёт, маленькая.", "a": "L'ibou ki chantet eset peti", "d": ["ke", "chantel"], "why": "сама поёт — ki"},
    { k: "input", q: "лампа, которую ты купил", a: ["le lanp ke tu achtis"], why: "её купили — ke" },
    { k: "choice", q: "Что значит ibou?", opts: ["сова", "колокол", "часы"], a: "сова", lang: "x", why: "ibou — сова" },
    { k: "input", q: "Я знаю, что он поёт.", a: ["Je savem k'il chantet."], why: "ke + il → k'il" },
  ] };
