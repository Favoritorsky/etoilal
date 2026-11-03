window.ET_C2 = window.ET_C2 || {};
ET_C2[29] = { n: 29, sec: 4, t: "Если бы: si + ri", s: "Si j'averim le tan… — если бы у меня было время…",
  words: [["tan", "время"], ["aprener", "учиться, учить"], ["plui", "дождь"], ["nej", "снег"], ["for", "сильный"]],
  gram: ["si"],
  sut: "«Если бы…, то бы…» — <b>si</b> и <b>ri</b> в обеих частях: Si j'averim le tan, j'aprenerim lez lang. Про прошлое — i + ri: Si tu veniris, je chantirim.",
  rule: `<p><span class="et">si</span> — если</p><p>сейчас: <span class="et">Si j'averim le tan, je chanterim.</span></p><p>в прошлом: <span class="et">Si tu veniris, je chantirim.</span> (i + ri)</p>`,
  prosto: `<p>[[si]] — «если». Просто «если» — обычные времена:</p>
> Si tu venres, nou chantren. :: Если ты придёшь, мы споём.
<h3>Если бы (сейчас)</h3>
<p>Когда это мечта или неправда, «бы» (ri) ставят <b>в обе части</b>:</p>
> Si j'averim le tan, j'aprenerim lez lang. :: Если бы у меня было время, я бы учил языки.
> Si il eserit for, il kourerit. :: Если бы он был сильным, он бы бежал.
<h3>Если бы (тогда, в прошлом)</h3>
<p>Про прошлое — <b>i + ri</b>: «если бы тогда…»:</p>
> Si tu veniris, je chantirim. :: Если бы ты пришёл, я бы спел.
> Si nou savirin, nou partirin. :: Если бы мы знали, мы бы ушли.
<h3>Как в русском</h3>
<p>Очень похоже: в русском «бы» тоже в обеих частях — «если бы…, я бы…». Только в Etoilal «бы» внутри глагола.</p>
<h3>Частые ошибки</h3>
<p>• Ставить ri только в одну часть: «Si j'avem le tan, j'aprenerim» → [[Si j'averim le tan, j'aprenerim.]] • Путать e+ri и i+ri: сейчас — eri, тогда — iri.</p>`,
  lub: `<p>Во французском тут разные времена: <i>si j'avais…, je ferais…</i> — «если» требует одно время, а вторая часть другое. В Etoilal проще: одинаковое ri в обеих частях. Лингвисты называют такие фразы <b>ирреальными условными</b>.</p>`,
  tasks: [
    {"k": "input", "q": "Если ты уйдёшь, я буду спать.", "a": ["Si tu partres, je dormrem."], "why": "просто «если» — обычные времена"},
    {"k": "input", "q": "Если бы у меня был дом, я был бы счастлив.", "a": ["Si j'averim un mezon, j'eserim eureu."], "why": "ri в обеих частях"},
    {"k": "input", "q": "Если бы ты позвонил, я бы ответил.", "a": ["Si tu telefoniris, je repondirim."], "why": "про прошлое — i + ri"},
    { k: "choice", q: "«Если бы мы знали (тогда), мы бы ушли»", opts: ["Si nou saverin, nou parterin.", "Si nou savirin, nou partirin."], a: "Si nou savirin, nou partirin.", why: "тогда — i + ri" },
    {"k": "fix", "q": "Si j'avem un kle, j'ouvrerim le port.", "a": ["Si j'averim un kle, j'ouvrerim le port."], "why": "ri — в обеих частях"},
    {"k": "tiles", "q": "Если бы она была сильной, она бы бежала.", "a": "Si el eserit for el kourerit", "d": ["eset", "kouret"], "why": "ri в обеих частях"},
    { k: "choice", q: "Что значит si?", opts: ["если", "когда", "потом"], a: "если", lang: "x", why: "si — если, kan — когда" },
    { k: "choice", q: "Что значит nej?", opts: ["снег", "дождь", "время"], a: "снег", lang: "x", why: "nej — снег, plui — дождь" },
    { k: "input", q: "Если бы я был богат, я бы путешествовал. (путешествие — un voiyaj, «хотел бы путешествие»)", a: ["Si j'eserim rich, je voulerim un voiyaj."], why: "ri в обеих частях" },
  ] };
