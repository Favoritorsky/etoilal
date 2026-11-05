window.ET_C2 = window.ET_C2 || {};
ET_C2[18] = { n: 18, sec: 2, t: "Слова времени", s: "сегодня, утром, никогда, ничего, потом",
  words: [["ojourdui", "сегодня"], ["maten", "утро"], ["jame", "никогда"], ["ryen", "ничего"], ["pui", "потом"], ["alor", "тогда"]],
  gram: [],
  sut: "Слова «когда» обычно стоят в начале или в конце фразы. <b>jame</b> «никогда» и <b>ryen</b> «ничего» стоят там же, где pa, — <b>после глагола</b>.",
  rule: `<p><span class="et">ojourdui</span> сегодня · <span class="et">yer</span> вчера · <span class="et">demen</span> завтра · <span class="et">le maten</span> утром</p><p><span class="et">jame</span> никогда, <span class="et">ryen</span> ничего — после глагола, как pa</p>`,
  prosto: `<h3>Где ставить</h3>
<p>Как в русском — в начале или в конце фразы:</p>
> Ojourdui je travayem. :: Сегодня я работаю.
> Le maten, je lizem. :: Утром я читаю.
> Je chantim, pui je dansim. :: Я спел, потом станцевал.
<p>«Утром» = [[le maten]] (дословно «то утро»), «вечером» = [[le soir]], «ночью» = [[le nui]].</p>
<h3>jame и ryen — как pa</h3>
<p>Эти слова тоже отрицание, и стоят они там же, где [[pa]], — <b>после глагола</b>. Второе «не» не нужно:</p>
> Il chantet jame. :: Он никогда не поёт.
> Je voiyem ryen. :: Я ничего не вижу.
> Nou fezin ryen yer. :: Вчера мы ничего не сделали.
<p>По-русски «никогда <b>не</b> поёт» — два отрицания. В Etoilal — одно: [[Il chantet jame.]]</p>
<h3>alor — тогда</h3>
> Alor, qoi nou fezren? :: Тогда что мы будем делать?
<h3>Частые ошибки</h3>
<p>• Ставить jame перед глаголом: «Il jame chantet» → [[Il chantet jame.]] • Добавлять pa: «Je voiyem pa ryen» → [[Je voiyem ryen.]]</p>`,
  lub: `<p>Во французском — <i>il ne chante jamais</i>, <i>je ne vois rien</i>: снова двойное отрицание, и снова Etoilal взял разговорный вариант без <i>ne</i>. Слова [[jame]] и [[ryen]] — это и есть французские <i>jamais</i> и <i>rien</i>, записанные как слышатся.</p>`,
  tasks: [
    {"k": "input", "q": "Сегодня я читаю.", "a": ["Ojourdui je lizem."], "why": "ojourdui — в начале"},
    {"k": "input", "q": "Она никогда не танцует.", "a": ["El danset jame."], "why": "jame — после глагола"},
    {"k": "fix", "q": "Je pa trouvem ryen.", "a": ["Je trouvem ryen."], "why": "ryen — после глагола, pa не нужно"},
    {"k": "input", "q": "Утром я работаю.", "a": ["Le maten je travayem."], "why": "le maten — утром"},
    {"k": "tiles", "q": "Я поел, потом поспал.", "a": "Je manjim pui je dormim", "d": ["alor", "dormem"], "why": "pui — потом"},
    { k: "choice", q: "«Вчера мы ничего не сделали»", opts: ["Yer nou fezin ryen.", "Yer nou ryen fezin.", "Yer nou fezin pa ryen."], a: "Yer nou fezin ryen.", why: "ryen после глагола, без pa" },
    { k: "choice", q: "Что значит alor?", opts: ["тогда", "потом", "всегда"], a: "тогда", lang: "x", why: "alor — тогда, pui — потом" },
    { k: "input", q: "Вечером мы танцуем.", a: ["Le soir nou dansen."], why: "le soir — вечером" },
    { k: "fix", q: "El jame dormet.", a: ["El dormet jame."], why: "jame — после глагола" },
    { k: "listen", say: "Ojourdui je fezem ryen.", q: "Послушай и напиши", a: ["Ojourdui je fezem ryen."], why: "«Сегодня я ничего не делаю»" },
  ] };
