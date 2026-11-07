window.FR_C = window.FR_C || {};
FR_C[20] = { n: 20, t: "Делать: faire и погода", s: "je fais, il fait beau",
  words: [["faire", "делать", "фэр"], ["le temps", "погода; время", "лё тан"], ["froid", "холодный", "фруа"], ["la pluie", "дождь", "ла плюи"],
    ["il pleut", "идёт дождь", "иль плё"], ["le sport", "спорт", "лё спор"], ["la cuisine", "кухня; готовка", "ла кюизин"], ["les courses", "покупки (продукты)", "ле курс"]],
  sut: "{{faire}} — «делать», и он неправильный: je fais, tu fais, il fait, nous faisons, vous faites, ils font. А ещё французы им говорят о <b>погоде</b>: {{Il fait beau.}} — «хорошая погода» (буквально «оно делает красиво»).",
  rule: `<table class="tbl"><thead><tr><th>кто</th><th>делать</th><th>читается</th></tr></thead><tbody>
<tr><td>я · ты · он</td><td class="fr">je fais · tu fais · il fait</td><td>жё фэ · тю фэ · иль фэ</td></tr>
<tr><td>мы · вы · они</td><td class="fr">nous faisons · vous faites · ils font</td><td>ну фёзон · ву фэт · иль фон</td></tr></tbody></table>
<table class="tbl"><tbody><tr><td class="fr">Il fait beau. / chaud. / froid.</td><td>Хорошая погода. / Жарко. / Холодно.</td></tr><tr><td class="fr">Il pleut.</td><td>Идёт дождь.</td></tr><tr><td class="fr">Quel temps fait-il ?</td><td>Какая погода?</td></tr></tbody></table>`,
  prosto: `<p>Глагол {{faire}} — один из самых частых: им «делают» и дела, и спорт, и покупки, и даже погоду.</p>
> Qu'est-ce que tu fais ? :: Что ты делаешь? — «кэскё тю фэ»
> Je fais la cuisine. :: Я готовлю. — «жё фэ ла кюизин»: буквально «делаю кухню»
> Il fait du sport. :: Он занимается спортом. — «иль фэ дю спор»
> Nous faisons les courses. :: Мы делаем покупки. — «ну фёзон ле курс»
> Vous faites quoi ? :: Что вы делаете? — «ву фэт куа»
> Ils font un gâteau. :: Они делают торт. — «иль фон эн гато»
<p>И погода — тоже через {{il fait}}:</p>
> Il fait beau. :: Хорошая погода. — «иль фэ бо»
> Il fait chaud. :: Жарко. — «иль фэ шо»
> Il fait froid. :: Холодно. — «иль фэ фруа»
> Il pleut. :: Идёт дождь. — «иль плё»
@@pin:fr20@@
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «делать покупки» — то же выражение.</p>
<p><b>Не как в русском:</b> в русском погода — «холодно», «жарко», без «кто». Французам всегда нужно «кто» — и они говорят «оно делает холод»: {{Il fait froid.}} А готовить — «делать кухню»: {{faire la cuisine}}.</p>
<h3>Частые ошибки</h3>
<p>• «C'est froid» о погоде — надо {{Il fait froid.}} • Читают {{nous faisons}} «фэзон» — правильно «фёзон». • «vous faisez» — неправильная форма; надо {{vous faites}}.</p>`,
  lub: `<p>{{vous faites}}, {{vous êtes}} и {{vous dites}} «вы говорите» — три единственных глагола, у которых «вы» не на -ez. Это старые-старые формы, сохранившиеся с латыни.</p>
<p>«Faire» сидит во многих русских словах из французского: «фасон» (<i>façon</i> — «манера делать»), «афера» (<i>à faire</i> — «дело, которое надо сделать»).</p>`,
  pins: [{ id: "fr20", t: "faire и погода", html: `<table class="tbl"><tbody><tr><td class="fr">je fais · tu fais · il fait</td><td>фэ</td></tr><tr><td class="fr">nous faisons · vous faites · ils font</td><td>фёзон · фэт · фон</td></tr><tr><td class="fr">Il fait beau / chaud / froid</td><td>хорошо / жарко / холодно</td></tr><tr><td class="fr">Il pleut</td><td>идёт дождь</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Что ты делаешь? — Qu'est-ce que tu …?", opts: ["fais", "fait", "faites"], a: "fais", why: "tu fais" },
    { k: "input", lang: "fr", q: "Холодно.", a: ["Il fait froid."], why: "погода — il fait…", hint: "«оно делает холод»" },
    { k: "tiles", lang: "fr", q: "Мы делаем покупки.", a: "Nous faisons les courses", d: ["faites", "font"], why: "nous faisons" },
    { k: "choice", q: "Vous … du sport ?", opts: ["faisez", "faites", "font"], a: "faites", why: "особая форма: vous faites" },
    { k: "fix", lang: "fr", q: "C'est chaud.", a: ["Il fait chaud."], why: "о погоде — il fait" },
    { k: "listen", say: "Il pleut.", q: "Что прозвучало?", opts: ["Идёт дождь.", "Холодно.", "Хорошая погода."], a: "Идёт дождь.", why: "il pleut — «иль плё»" },
    { k: "input", lang: "fr", q: "Я готовлю.", a: ["Je fais la cuisine."], why: "faire la cuisine — «делать кухню»" },
    { k: "choice", q: "Ils … un gâteau.", opts: ["font", "sont", "vont"], a: "font", why: "ils font — они делают" },
    { k: "input", lang: "fr", q: "Хорошая погода.", a: ["Il fait beau."], why: "il fait beau" },
    { k: "choice", q: "Как читается nous faisons?", opts: ["ну фэзон", "ну фёзон", "ну фасон"], a: "ну фёзон", why: "ai здесь читается «ё»" },
  ] };
