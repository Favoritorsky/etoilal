window.ET_C2 = window.ET_C2 || {};
ET_C2[37] = { n: 37, sec: 5, t: "Большие числа", s: "строго по десяткам: 70 = setdis",
  words: [["nonbr", "число"], ["qonter", "считать"], ["eur", "час"], ["minut", "минута"], ["segond", "секунда"]],
  gram: ["deudis", "troidis", "qatrdis", "senqdis", "sisdis", "setdis", "uitdis", "neufdis", "sent", "mil", "milyon"],
  sut: "Десятки — «сколько» + <b>dis</b>, слитно: 20 deudis, 70 setdis, 90 neufdis. Единицы — отдельно: 21 deudis un. 100 sent, 1000 mil, 1 000 000 milyon.",
  rule: `<p>20 <span class="et">deudis</span> · 30 <span class="et">troidis</span> · 70 <span class="et">setdis</span> · 90 <span class="et">neufdis</span></p><p>21 <span class="et">deudis un</span> · 100 <span class="et">sent</span> · 1000 <span class="et">mil</span></p><p>345 = <span class="et">troi sent qatrdis senq</span></p>`,
  prosto: `<p>Помнишь 1–10? Дальше всё строится как таблица умножения: <b>число десятков + dis</b>, слитно.</p>
@@pin:big@@
<h3>11–19</h3>
<p>«десять» + единица, раздельно: 11 = [[dis un]], 15 = [[dis senq]], 19 = [[dis neuf]].</p>
<h3>Любое число</h3>
<p>Читай по частям, как в русском: сотни → десятки → единицы. Сотни и тысячи — раздельно, десятки — слитно:</p>
> deudis un :: 21
> neufdis neuf :: 99
> troi sent qatrdis senq :: 345
> deu mil deudis sis :: 2026
<h3>Сколько времени</h3>
> deu eur :: два часа
> dis minut :: десять минут
<p>После числа слово, как всегда, не меняется.</p>
<h3>Частые ошибки</h3>
<p>• Раздельно писать десятки: «deu dis» → [[deudis]]. • Французские «четыре-двадцать» для 80 — в Etoilal просто [[uitdis]].</p>`,
  lub: `<p>Французский считает 70 как «шестьдесят-десять» (<i>soixante-dix</i>), 80 как «четыре-двадцать» (<i>quatre-vingts</i>) — следы древнего счёта двадцатками. Etoilal эту путаницу отменил: десятичный счёт, как в китайском.</p>`,
  pins: [{ id: "big", t: "Десятки и большие числа", html: `<table class="tbl"><tbody><tr><td>10</td><td class="et">dis</td><td>60</td><td class="et">sisdis</td></tr><tr><td>20</td><td class="et">deudis</td><td>70</td><td class="et">setdis</td></tr><tr><td>30</td><td class="et">troidis</td><td>80</td><td class="et">uitdis</td></tr><tr><td>40</td><td class="et">qatrdis</td><td>90</td><td class="et">neufdis</td></tr><tr><td>50</td><td class="et">senqdis</td><td>100</td><td class="et">sent</td></tr><tr><td>1000</td><td class="et">mil</td><td>1 000 000</td><td class="et">milyon</td></tr></tbody></table>` }],
  tasks: [
    { k: "input", q: "20", a: ["deudis"], why: "два-десять, слитно" },
    { k: "input", q: "70", a: ["setdis"], why: "семь-десять" },
    {"k": "input", "q": "17", "a": ["dis set"], "why": "десять + семь, раздельно"},
    {"k": "input", "q": "88", "a": ["uitdis uit"], "why": "восемь-десять восемь"},
    {"k": "input", "q": "256", "a": ["deu sent senqdis sis"], "why": "сотни — десятки — единицы"},
    { k: "choice", q: "Что значит uitdis?", opts: ["80", "18", "800"], a: "80", lang: "x", why: "восемь-десять" },
    {"k": "input", "q": "три минуты", "a": ["troi minut"], "why": "после числа слово не меняется"},
    {"k": "fix", "q": "troi dis deu", "a": ["troidis deu"], "why": "десятки — слитно"},
    { k: "input", q: "1000", a: ["mil"], why: "mil — тысяча" },
    { k: "choice", q: "Что значит qonter?", opts: ["считать", "число", "час"], a: "считать", lang: "x", why: "qonter — считать, nonbr — число" },
  ] };
