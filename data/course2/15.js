window.ET_C2 = window.ET_C2 || {};
ET_C2[15] = { n: 15, sec: 2, t: "Будет: re", s: "chantrem — я спою",
  words: [["demen", "завтра"], ["parter", "уходить, уезжать"], ["revner", "возвращаться"], ["achter", "покупать"], ["preparer", "готовить"], ["ekriver", "писать"]],
  gram: [], unlock: { t: ["re"] },
  sut: "«Будет» — кусочек <b>re</b> вместо e: chantem (пою) → <b>chantrem</b> (спою, буду петь).",
  rule: `<p>основа + <b>re</b> + кто = будет: <span class="et">chantrem</span> спою, <span class="et">partres</span> ты уйдёшь, <span class="et">revnret</span> он вернётся</p><p><span class="et">demen</span> — завтра</p>`,
  prosto: `<p>Третье время — <b>re</b>, «будет». Схема та же: основа + <b>re</b> + кто.</p>
@@pin:time3@@
> Demen je chantrem. :: Завтра я спою.
> Tu partres demen? :: Ты уедешь завтра?
> Il revnret. :: Он вернётся.
> Nou achtren le pen. :: Мы купим хлеб.
> El preparret le kafe. :: Она приготовит кофе.
> Ilz ekrivrel. :: Они напишут.
<h3>Одна форма на «спою» и «буду петь»</h3>
<p>В русском будущее бывает двух видов: «спою» (один раз) и «буду петь» (долго). В Etoilal одна форма: [[chantrem]] — и то, и другое.</p>
<p>И «быть» в будущем: [[esrem]] — я буду, [[esret]] — он будет.</p>
> Demen j'esrem isi. :: Завтра я буду здесь.
<h3>Частые ошибки</h3>
<p>• Ставить e перед re: «chanterem» — это другое (узнаешь в уроке 28). Будущее — [[chantrem]]. • Путать re и i: «Demen je chantim» → [[Demen je chantrem.]]</p>`,
  lub: `<p>Как и во французском, «будущее» в Etoilal — это кусочек с r: французское <i>je chanterai</i> → Etoilal [[chantrem]]. Только во французском ещё куча неправильных форм (<i>j'irai, je ferai</i>), а здесь — ни одной: [[alrem]], [[fezrem]].</p>`,
  pins: [{ id: "time3", t: "Сейчас · было · будет", html: `<table class="tbl"><thead><tr><th>когда</th><th>кусочек</th><th>пример</th></tr></thead><tbody><tr><td>сейчас</td><td class="et lt">e</td><td><span class="et">chantem</span> пою</td></tr><tr><td>было</td><td class="et lt">i</td><td><span class="et">chantim</span> спел</td></tr><tr><td>будет</td><td class="et lt">re</td><td><span class="et">chantrem</span> спою</td></tr></tbody></table>` }],
  tasks: [
    {"k": "input", "q": "Завтра я станцую.", "a": ["Demen je dansrem."], "why": "dans + re + m"},
    {"k": "input", "q": "Она вернётся.", "a": ["El revnret."], "why": "revn + re + t"},
    { k: "choice", q: "Что значит achtren?", opts: ["мы купим", "мы купили", "мы покупаем"], a: "мы купим", lang: "x", why: "re — будет, n — мы" },
    {"k": "input", "q": "Вы уедете завтра?", "a": ["Vou partrez demen?", "Eske vou partrez demen?"], "why": "part + re + z"},
    {"k": "tiles", "q": "Я приготовлю чай.", "a": "Je preparrem le te", "d": ["preparim", "preparem"], "why": "re — будет"},
    {"k": "fix", "q": "Demen nou manjin.", "a": ["Demen nou manjren."], "why": "завтра — будет — re"},
    {"k": "input", "q": "Завтра мы будем там.", "a": ["Demen nou esren laba."], "why": "es + re + n"},
    { k: "choice", q: "Какое время в слове ekrivrel?", opts: ["будет", "было", "сейчас"], a: "будет", lang: "x", why: "re — будет" },
    {"k": "input", "q": "Они купят сыр.", "a": ["Ilz achtrel le fromaj."], "why": "acht + re + l"},
    { k: "listen", say: "Ilz revnrel demen.", q: "Послушай и напиши", a: ["Ilz revnrel demen."], why: "«Они вернутся завтра»" },
  ] };
