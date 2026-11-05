window.ET_C2 = window.ET_C2 || {};
ET_C2[17] = { n: 17, sec: 2, t: "Вот-вот и только что: o и u", s: "chantom — сейчас спою; chantum — только что спел",
  words: [["mentnant", "сейчас, теперь"], ["deja", "уже"], ["anqor", "ещё"], ["ouvrer", "открывать"], ["fermer", "закрывать"]],
  gram: [], unlock: { t: ["o", "u"] },
  sut: "Ещё два времени: <b>o</b> — «вот-вот, сейчас начну» (chantom), <b>u</b> — «только что» (chantum). Теперь у тебя все шесть.",
  rule: `<p><b>o</b> — вот-вот: <span class="et">Je partom!</span> Я ухожу!</p><p><b>u</b> — только что: <span class="et">Il venut.</span> Он только что пришёл.</p>`,
  prosto: `<p>В русском, чтобы сказать «вот-вот» или «только что», нужны лишние слова. В Etoilal — <b>одна буква</b>:</p>
> Je partom! :: Я ухожу! (вот-вот, уже на пороге)
> Nou manjon. :: Мы сейчас будем есть.
> Il venut. :: Он только что пришёл.
> El fermut le port. :: Она только что закрыла дверь.
<h3>Все шесть времён</h3>
<p>Это все времена Etoilal. Закрепи таблицу — она пригодится в каждом уроке:</p>
@@pin:time6@@
<h3>Как выбрать</h3>
<p>• Действие ещё не началось, но вот-вот — <b>o</b>. • Действие только что закончилось — <b>u</b>. • Просто «будет» — <b>re</b>, просто «было» — <b>i</b> или <b>a</b>.</p>
> Tu manjus deja? :: Ты уже поел (только что)?
> Non, je manjom mentnant. :: Нет, сейчас поем.
<h3>Частые ошибки</h3>
<p>• Путать o и u: o — ещё впереди, u — уже позади. Запомни: <b>o</b> — «о, сейчас начну!», <b>u</b> — «уф, только что сделал».</p>`,
  lub: `<p>Во французском для этого есть обороты <i>je vais chanter</i> (близкое будущее) и <i>je viens de chanter</i> (недавнее прошлое) — по три-четыре слова. Etoilal сжал их в одну букву. В лингвистике такие времена называют <b>проспективом</b> и <b>ретроспективом</b>.</p>`,
  pins: [{ id: "time6", t: "Все 6 времён", html: `<table class="tbl"><thead><tr><th>кусочек</th><th>значит</th><th>пример</th></tr></thead><tbody><tr><td class="et lt">e</td><td>сейчас</td><td><span class="et">chantem</span> пою</td></tr><tr><td class="et lt">i</td><td>было (раз)</td><td><span class="et">chantim</span> спел</td></tr><tr><td class="et lt">a</td><td>было (долго)</td><td><span class="et">chantam</span> пел</td></tr><tr><td class="et lt">re</td><td>будет</td><td><span class="et">chantrem</span> спою</td></tr><tr><td class="et lt">o</td><td>вот-вот</td><td><span class="et">chantom</span> сейчас спою</td></tr><tr><td class="et lt">u</td><td>только что</td><td><span class="et">chantum</span> только что спел</td></tr></tbody></table>` }],
  tasks: [
    {"k": "input", "q": "Мы уходим! (вот-вот)", "a": ["Nou parton!"], "why": "o — вот-вот"},
    {"k": "input", "q": "Она только что пришла.", "a": ["El venut."], "why": "u — только что"},
    { k: "choice", q: "Что значит fermut?", opts: ["только что закрыл", "сейчас закроет", "закроет"], a: "только что закрыл", lang: "x", why: "u — только что" },
    { k: "choice", q: "Что значит ouvrom?", opts: ["я сейчас открою", "я только что открыл", "я открою"], a: "я сейчас открою", lang: "x", why: "o — вот-вот, m — я" },
    {"k": "input", "q": "Ты уже поспал (только что)?", "a": ["Tu dormus deja?"], "why": "u — только что, s — ты"},
    {"k": "input", "q": "Я сейчас буду читать. (вот-вот)", "a": ["Je lizom."], "why": "o — вот-вот"},
    {"k": "tiles", "q": "Он только что открыл окно.", "a": "Il ouvrut le fenetr", "d": ["ouvrot", "ouvrit"], "why": "u — только что"},
    { k: "input", q: "Я сейчас открою окно. (вот-вот)", a: ["J'ouvrom le fenetr."], why: "ouvr + o + m; je + o… → j'" },
    { k: "choice", q: "Сколько всего времён в Etoilal?", opts: ["3", "6", "12"], a: "6", lang: "x", why: "e, i, a, re, o, u" },
    { k: "choice", q: "Что значит anqor?", opts: ["ещё", "уже", "сейчас"], a: "ещё", lang: "x", why: "anqor — ещё, deja — уже" },
  ] };
