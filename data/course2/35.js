window.ET_C2 = window.ET_C2 || {};
ET_C2[35] = { n: 35, sec: 5, t: "Который: qi и qe", s: "l'anfan qi chantet; le livr qe je lizem",
  words: [["ibou", "сова"], ["qloch", "колокол"], ["orloj", "часы"], ["fotografi", "фотография"], ["lanp", "лампа"]],
  gram: [],
  sut: "«Который» — <b>qi</b>, если он сам делает действие (l'anfan qi chantet — ребёнок, который поёт), и <b>qe</b>, если с ним что-то делают (le livr qe je lizem — книга, которую я читаю).",
  rule: `<p><span class="et">qi</span> — который сам делает: <span class="et">l'ibou qi dormet</span></p><p><span class="et">qe</span> — с которым делают: <span class="et">le fotografi qe je regardem</span></p>`,
  prosto: `<p>Ты уже знаешь [[qi]] «кто» и [[qe]] «что, чтобы». Они же работают как «который»:</p>
<h3>qi — он сам делает</h3>
> l'anfan qi chantet :: ребёнок, который поёт
> L'ibou qi dormet laba eset vyeu. :: Сова, которая спит там, старая.
> Le qloch qi chantet eset gran. :: Колокол, который поёт, большой.
<h3>qe — с ним делают</h3>
> le livr qe je lizem :: книга, которую я читаю
> Le fotografi qe tu regardes eset bo. :: Фотография, на которую ты смотришь, прекрасна.
> L'orloj qe nou trouvin eset vyeu. :: Часы, которые мы нашли, старые.
<h3>Как выбрать</h3>
<p>Задай вопрос: «который <b>сам</b> делает?» → [[qi]]. «<b>Его</b> делают?» → [[qe]]. Подсказка: после [[qe]] обычно стоит «кто делает» (je, tu, nou…), а после [[qi]] — сразу глагол.</p>
<h3>Частые ошибки</h3>
<p>• «le livr qi je lizem» → [[le livr qe je lizem]] (книгу читаю я). • qe перед гласной сливается: [[qe il]] → [[q'il]].</p>`,
  lub: `<p>Во французском так же: <i>qui</i> и <i>que</i>. В русском одно слово «который», зато оно меняется по падежам: «который, которую, которому». В Etoilal падежей нет — их работу делает выбор qi/qe.</p>`,
  tasks: [
    { k: "choice", q: "«ребёнок, который поёт»", opts: ["l'anfan qi chantet", "l'anfan qe chantet"], a: "l'anfan qi chantet", why: "сам делает — qi" },
    { k: "choice", q: "«книга, которую я читаю»", opts: ["le livr qi je lizem", "le livr qe je lizem"], a: "le livr qe je lizem", why: "её читают — qe" },
    {"k": "input", "q": "Кошка, которая спит здесь, молодая.", "a": ["Le cha qi dormet isi eset jeun."], "why": "сама спит — qi"},
    {"k": "input", "q": "Книга, которую мы нашли, старая.", "a": ["Le livr qe nou trouvin eset vyeu."], "why": "её нашли — qe"},
    {"k": "fix", "q": "Le tablo qi tu regardes eset bo.", "a": ["Le tablo qe tu regardes eset bo."], "why": "на неё смотрят — qe"},
    {"k": "tiles", "q": "Сова, которая поёт, маленькая.", "a": "L'ibou qi chantet eset peti", "d": ["qe", "chantel"], "why": "сама поёт — qi"},
    { k: "input", q: "лампа, которую ты купил", a: ["le lanp qe tu achtis"], why: "её купили — qe" },
    { k: "choice", q: "Что значит ibou?", opts: ["сова", "колокол", "часы"], a: "сова", lang: "x", why: "ibou — сова" },
    { k: "input", q: "Я знаю, что он поёт.", a: ["Je savem q'il chantet."], why: "qe + il → q'il" },
  ] };
