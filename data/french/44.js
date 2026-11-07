window.FR_C = window.FR_C || {};
FR_C[44] = { n: 44, t: "Себя: je me lève", s: "глаголы с «-ся»",
  words: [["se lever", "вставать", "сё лёвэ"], ["se réveiller", "просыпаться", "сё рэвэйе"], ["se laver", "умываться, мыться", "сё лавэ"], ["s'habiller", "одеваться", "сабийе"],
    ["se coucher", "ложиться спать", "сё кушэ"], ["se promener", "гулять", "сё промнэ"], ["se dépêcher", "торопиться", "сё дэпэшэ"], ["tôt", "рано", "то"]],
  sut: "Русское «-ся» («умываться» = «умывать себя») во французском — маленькое слово <b>перед глаголом</b>: {{je me lave}} «я умываюсь», {{tu te lèves}} «ты встаёшь», {{il se couche}} «он ложится». В словаре такие глаголы пишут с {{se}}: {{se laver}}.",
  rule: `<table class="tbl"><thead><tr><th>кто</th><th>se laver</th><th>читается</th></tr></thead><tbody>
<tr><td>я</td><td class="fr">je me lave</td><td>жё мё лав</td></tr><tr><td>ты</td><td class="fr">tu te laves</td><td>тю тё лав</td></tr>
<tr><td>он</td><td class="fr">il se lave</td><td>иль сё лав</td></tr><tr><td>мы</td><td class="fr">nous nous lavons</td><td>ну ну лавон</td></tr>
<tr><td>вы</td><td class="fr">vous vous lavez</td><td>ву ву лавэ</td></tr><tr><td>они</td><td class="fr">ils se lavent</td><td>иль сё лав</td></tr></tbody></table>
<p>Прошлое — с <b>être</b>: <span class="fr">je me suis levé(e)</span>. Приказ: <span class="fr">Lève-toi ! Dépêche-toi !</span></p>`,
  prosto: `<p>Ты уже знаешь один такой глагол — {{je m'appelle}} «меня зовут» (буквально «я себя зову»). Все «-ся» глаголы устроены так же.</p>
> Je me lève tôt. :: Я встаю рано. — «жё мё лэв то»
> Tu te réveilles à quelle heure ? :: Во сколько ты просыпаешься? — «тю тё рэвэй а кэлёр»
> Il se lave. :: Он умывается. — «иль сё лав»
> Nous nous promenons dans le parc. :: Мы гуляем в парке. — «ну ну промнон дан лё парк»
> Vous vous habillez ? :: Вы одеваетесь? — «ву вузабийе»
> Ils se couchent tard. :: Они ложатся поздно. — «иль сё куш тар»
> Je me suis levé à sept heures. :: Я встал в семь часов. — «жё мё сюи лёвэ а сэтёр»: прошлое с être
> Dépêche-toi ! :: Торопись! — «дэпэш туа»
@@pin:fr44@@
<h3>Прошлое — всегда с être</h3>
<p>Все глаголы с {{se}} в прошлом идут с {{être}}, и форма меняется по роду: {{elle s'est levée}} «она встала», {{nous nous sommes promenés}} «мы гуляли».</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «умываться», «одеваться» — это «умывать / одевать себя». Тот же смысл.</p>
<p><b>Не как в русском:</b> «-ся» у нас в конце глагола, а у французов — отдельное слово <b>перед</b> ним, и оно меняется: me, te, se, nous, vous. Не все совпадают: «гулять» по-французски — «гулять себя» {{se promener}}.</p>
<h3>Частые ошибки</h3>
<p>• Забывают me / te / se: «je lève à sept heures» значит «я поднимаю (что-то)». Надо {{je me lève}}. • «Je me ai levé» — прошлое с être: {{je me suis levé}}. • В приказе: «Te dépêche !» — надо {{Dépêche-toi !}}</p>`,
  lub: `<p>Без se глаголы значат «делать кому-то другому»: {{laver}} «мыть (машину, ребёнка)», {{lever}} «поднимать», {{coucher}} «укладывать». С se — «делать себе»: {{se laver}} «мыться самому».</p>
<p>Бывает и «друг друга»: <i>Ils s'aiment</i> — «они любят друг друга», <i>On se voit demain !</i> — «Увидимся завтра!».</p>`,
  pins: [{ id: "fr44", t: "Себя: se laver", html: `<table class="tbl"><tbody><tr><td class="fr">je me · tu te · il se</td><td rowspan="2">+ глагол</td></tr><tr><td class="fr">nous nous · vous vous · ils se</td></tr><tr><td>прошлое</td><td class="fr">je me suis levé(e)</td></tr><tr><td>приказ</td><td class="fr">Lève-toi ! Dépêche-toi !</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Я встаю рано. — Je … lève tôt.", opts: ["me", "se", "te"], a: "me", why: "je — me" },
    { k: "input", lang: "fr", q: "Он умывается.", a: ["Il se lave."], why: "il — se" },
    { k: "tiles", lang: "fr", q: "Мы гуляем в парке.", a: "Nous nous promenons dans le parc", d: ["se", "promenez"], why: "nous — nous" },
    { k: "fix", lang: "fr", q: "Je me ai levé à sept heures.", a: ["Je me suis levé à sept heures.", "Je me suis levée à sept heures."], why: "прошлое с se — être" },
    { k: "choice", q: "Elle s'est …", opts: ["levée", "levé", "lever"], a: "levée", why: "с être + «она»: -ée" },
    { k: "listen", say: "Ils se couchent tard.", q: "Что прозвучало?", opts: ["Они ложатся поздно.", "Они встают поздно.", "Они ложатся рано."], a: "Они ложатся поздно.", why: "se coucher — ложиться, tard — поздно" },
    { k: "input", lang: "fr", q: "Торопись!", a: ["Dépêche-toi !", "Dépêche-toi"], why: "приказ: глагол + -toi" },
    { k: "choice", q: "Vous … habillez ?", opts: ["vous", "se", "nous"], a: "vous", why: "vous — vous" },
    { k: "input", lang: "fr", q: "Я встал в семь часов. (мальчик)", a: ["Je me suis levé à sept heures."], why: "je me suis levé" },
    { k: "choice", q: "Что значит je lève (без me)?", opts: ["я поднимаю (что-то)", "я встаю", "я ложусь"], a: "я поднимаю (что-то)", why: "без se — делать кому-то / чему-то" },
  ] };
