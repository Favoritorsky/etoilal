window.ET_C2 = window.ET_C2 || {};
ET_C2[25] = { n: 25, sec: 3, t: "Без, до, после, во время", s: "sans, avant, apre, pandant, depui, juska",
  words: [["konje", "отпуск"], ["pon", "мост"], ["rivyer", "река"], ["fore", "лес"], ["chan", "поле"]],
  gram: ["sans", "avant", "apre", "pandant", "depui", "juska"],
  sut: "<b>sans</b> без, <b>avant</b> до, <b>apre</b> после, <b>pandant</b> во время, <b>depui</b> с (какого-то времени), <b>juska</b> до (куда, когда).",
  rule: `<table class="tbl"><tbody><tr><td class="et">sans</td><td>без</td><td class="et">pandant</td><td>во время</td></tr><tr><td class="et">avant</td><td>до (раньше)</td><td class="et">apre</td><td>после</td></tr><tr><td class="et">depui</td><td>с (времени)</td><td class="et">juska</td><td>до (куда, когда)</td></tr></tbody></table>`,
  prosto: `<p>Ещё шесть предлогов — про время и «без». Всё то же: слово после них не меняется.</p>
> Je partem sans toi. :: Я ухожу без тебя.
> Avant le travay, je lizem. :: До работы я читаю.
> Apre le konje, nou revnren. :: После отпуска мы вернёмся.
> Pandant le nui, il dormet. :: Ночью (во время ночи) он спит.
> Depui yer, je savem. :: Со вчерашнего дня я знаю.
> Nou alin juska le pon. :: Мы дошли до моста.
<h3>avant и juska — оба «до»</h3>
<p>[[avant]] — «раньше чего-то» (до работы, до ночи). [[juska]] — «вплоть до» места или момента: [[juska le pon]] — до самого моста, [[juska demen]] — до завтра.</p>
<h3>Частые ошибки</h3>
<p>• Путать avant и juska: «Je dormem avant le maten» — «сплю раньше утра» (странно); «до утра» — [[juska le maten]]. • Ставить mo после sans: «sans mo» → [[sans moi]].</p>`,
  lub: `<p>[[juska]] — французское <i>jusqu'à</i>, слитое в одно слово; [[depui]] — <i>depuis</i>; [[pandant]] — <i>pendant</i>, но с a, чтобы не совпадало с формами глаголов (в Etoilal ни одно слово не совпадает с формой глагола).</p>`,
  tasks: [
    { k: "input", q: "без тебя", a: ["sans toi"], why: "sans + toi" },
    { k: "input", q: "После отпуска мы вернёмся.", a: ["Apre le konje nou revnren."], why: "apre — после" },
    { k: "input", q: "До работы я читаю.", a: ["Avant le travay je lizem."], why: "avant — до" },
    { k: "choice", q: "«до моста» (дошли до самого моста)", opts: ["avant le pon", "juska le pon"], a: "juska le pon", why: "juska — вплоть до места" },
    { k: "input", q: "Ночью он спит. (во время ночи)", a: ["Pandant le nui il dormet."], why: "pandant — во время" },
    { k: "tiles", q: "Со вчерашнего дня я знаю.", a: "Depui yer je savem", d: ["avant", "apre"], why: "depui — с (времени)" },
    { k: "fix", q: "Je partem sans mo.", a: ["Je partem sans moi."], why: "после предлога — moi" },
    { k: "choice", q: "Что значит fore?", opts: ["лес", "поле", "река"], a: "лес", lang: "x", why: "fore — лес, chan — поле, rivyer — река" },
    { k: "input", q: "Мы дошли до реки.", a: ["Nou alin juska le rivyer."], why: "juska + le rivyer" },
    { k: "listen", say: "Apre le konje, nou revnren.", q: "Послушай и напиши", a: ["Apre le konje, nou revnren."], why: "«После отпуска мы вернёмся»" },
  ] };
