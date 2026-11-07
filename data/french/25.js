window.FR_C = window.FR_C || {};
FR_C[25] = { n: 25, t: "Глаголы на -ir: je finis", s: "вторая большая группа глаголов",
  words: [["finir", "заканчивать", "финир"], ["choisir", "выбирать", "шуазир"], ["réussir", "добиваться успеха, сдать", "рэюсир"], ["grandir", "расти", "грандир"],
    ["partir", "уезжать, уходить", "партир"], ["dormir", "спать", "дормир"], ["sortir", "выходить", "сортир"], ["le cours", "урок, занятие", "лё кур"]],
  sut: "Вторая группа глаголов кончается на <b>-ir</b>: {{finir}}. Отрежь -ir и добавь: <b>-is, -is, -it, -issons, -issez, -issent</b>. {{Je finis.}} «жё фини». А {{partir}}, {{dormir}}, {{sortir}} — короче: {{je pars}}, {{je dors}}, {{je sors}}.",
  rule: `<table class="tbl"><thead><tr><th>кто</th><th>finir</th><th>читается</th><th>partir</th></tr></thead><tbody>
<tr><td>я</td><td class="fr">je finis</td><td>жё фини</td><td class="fr">je pars</td></tr>
<tr><td>ты</td><td class="fr">tu finis</td><td>тю фини</td><td class="fr">tu pars</td></tr>
<tr><td>он</td><td class="fr">il finit</td><td>иль фини</td><td class="fr">il part</td></tr>
<tr><td>мы</td><td class="fr">nous finissons</td><td>ну финисон</td><td class="fr">nous partons</td></tr>
<tr><td>вы</td><td class="fr">vous finissez</td><td>ву финисэ</td><td class="fr">vous partez</td></tr>
<tr><td>они</td><td class="fr">ils finissent</td><td>иль финис</td><td class="fr">ils partent</td></tr></tbody></table>`,
  prosto: `<p>Глаголы на -er ты уже знаешь (chanter). Вторая группа — на <b>-ir</b>. Главное отличие: у «мы, вы, они» появляется кусочек <b>-iss-</b>.</p>
> Je finis le travail. :: Я заканчиваю работу. — «жё фини лё травай»
> Tu choisis quoi ? :: Что ты выбираешь? — «тю шуази куа»
> Il réussit toujours. :: Ему всегда всё удаётся. — «иль рэюси тужур»
> Nous finissons à midi. :: Мы заканчиваем в полдень. — «ну финисон а миди»
> Les enfants grandissent. :: Дети растут. — «лезанфан грандис»
<p>Несколько частых глаголов на -ir — без -iss-, они короче:</p>
> Je pars demain. :: Я уезжаю завтра. — «жё пар дёмэн»
> Il dort. :: Он спит. — «иль дор»
> Nous sortons ce soir. :: Мы выходим (гуляем) сегодня вечером. — «ну сортон сё суар»
@@pin:fr25@@
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> у нас тоже группы глаголов: «читать — читаю», «говорить — говорю».</p>
<p><b>Не как в русском:</b> во французском окончания -is, -is, -it опять <b>не слышны</b>: je finis, tu finis, il finit — все «фини». Зато «они» отличается: {{ils finissent}} «финис» — слышно «с».</p>
<h3>Частые ошибки</h3>
<p>• «nous finons» — надо {{nous finissons}} (с -iss-). • «je partis» — partir без -iss-: {{je pars}}. • Читают {{ils finissent}} «финисент» — -ent молчит: «финис».</p>`,
  lub: `<p>Кусочек -iss- пришёл из латыни, где он значил «начинать делать»: <i>florescere</i> «начинать цвести». Во французском смысл потерялся, а кусочек остался.</p>
<p>Глаголов на -ir с -iss- около трёхсот, и почти все новые глаголы во французском делают на -er (<i>googler, liker</i>), а не на -ir.</p>`,
  pins: [{ id: "fr25", t: "Глаголы на -ir", html: `<table class="tbl"><tbody><tr><td class="fr">finir</td><td class="fr">finis · finis · finit · finissons · finissez · finissent</td></tr><tr><td class="fr">partir</td><td class="fr">pars · pars · part · partons · partez · partent</td></tr><tr><td>так же</td><td class="fr">choisir, réussir, grandir · dormir, sortir</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Я заканчиваю работу. — Je … le travail.", opts: ["finis", "finit", "finissons"], a: "finis", why: "je finis" },
    { k: "input", lang: "fr", q: "Мы заканчиваем в полдень.", a: ["Nous finissons à midi."], why: "nous + -issons" },
    { k: "choice", q: "Il … (спит)", opts: ["dort", "dormit", "dormis"], a: "dort", why: "dormir без -iss-: il dort" },
    { k: "tiles", lang: "fr", q: "Дети растут.", a: "Les enfants grandissent", d: ["grandit", "grandis"], why: "ils — -issent" },
    { k: "fix", lang: "fr", q: "Je partis demain.", a: ["Je pars demain."], why: "partir: je pars" },
    { k: "listen", say: "Nous sortons ce soir.", q: "Что прозвучало?", opts: ["Мы выходим сегодня вечером.", "Мы спим вечером.", "Мы уезжаем завтра."], a: "Мы выходим сегодня вечером.", why: "sortir — выходить" },
    { k: "input", lang: "fr", q: "Что ты выбираешь?", a: ["Tu choisis quoi ?", "Qu'est-ce que tu choisis ?"], why: "tu choisis" },
    { k: "choice", q: "Как читается ils finissent?", opts: ["иль финисент", "иль финис", "иль фини"], a: "иль финис", why: "-ent молчит, ss — «с»" },
    { k: "input", lang: "fr", q: "Я уезжаю завтра.", a: ["Je pars demain."], why: "je pars" },
    { k: "choice", q: "Vous … (выбираете)", opts: ["choisez", "choisissez", "choisiez"], a: "choisissez", why: "vous + -issez" },
  ] };
