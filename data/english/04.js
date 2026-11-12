window.EN_C = window.EN_C || {};
EN_C[4] = { n: 4, t: "Вчера: Past Simple", s: "worked, went, did — и неправильные глаголы",
  words: [["yesterday", "вчера", "е́стэдэй"], ["ago", "назад (тому)", "эгóу"], ["last night", "вчера вечером/ночью", "ласт найт"], ["went", "пошёл, поехал (go)", "уэнт"], ["saw", "увидел (see)", "со"], ["bought", "купил (buy)", "бот"], ["forgot", "забыл (forget)", "фэгóт"], ["lost", "потерял (lose)", "лост"]],
  sut: "Что было и закончилось: {{I played yesterday.}} Обычные глаголы получают <b>-ed</b>: {{work}} → {{worked}}. Частые глаголы — неправильные, их учат: {{go}} → {{went}}, {{see}} → {{saw}}. В вопросе и с «не» — помощник {{did}}, а глагол возвращается в обычную форму.",
  rule: `<table class="tbl"><thead><tr><th></th><th>для всех: I, you, he, they…</th></tr></thead><tbody>
<tr><td>было</td><td class="fr">I worked · she went</td></tr><tr><td>не было</td><td class="fr">I didn't work · she didn't go</td></tr><tr><td>вопрос</td><td class="fr">Did you work? · Where did she go?</td></tr></tbody></table>
<table class="tbl"><thead><tr><th>глагол</th><th>прошлое</th><th></th></tr></thead><tbody>
<tr><td class="fr">go</td><td class="fr">went</td><td>пошёл</td></tr><tr><td class="fr">see</td><td class="fr">saw</td><td>увидел</td></tr><tr><td class="fr">buy</td><td class="fr">bought</td><td>купил</td></tr><tr><td class="fr">have</td><td class="fr">had</td><td>имел, было</td></tr><tr><td class="fr">get</td><td class="fr">got</td><td>получил</td></tr><tr><td class="fr">come</td><td class="fr">came</td><td>пришёл</td></tr><tr><td class="fr">take</td><td class="fr">took</td><td>взял</td></tr><tr><td class="fr">lose · forget</td><td class="fr">lost · forgot</td><td>потерял · забыл</td></tr></tbody></table>`,
  prosto: `<p>Хорошая новость: в прошлом нет -s для he/she и нет «было/была/было»: одна форма для всех.</p>
> I watched a film last night. :: Вчера вечером я смотрел фильм.
> We went to the cinema. :: Мы ходили в кино.
> She bought a new phone. :: Она купила новый телефон.
> I saw him two days ago. :: Я видел его два дня назад. — ago стоит после времени: two days ago
> I lost my keys! :: Я потерял ключи!
> He didn't come. :: Он не пришёл.
> Did you forget? :: Ты забыл?
> What did you do yesterday? :: Что ты делал вчера?
@@pin:en4@@
<h3>was и were</h3>
<p>Прошлое от am/is/are: {{I was}}, {{he was}}, {{you were}}, {{they were}}. {{I was tired.}} — «я был уставший». С ними did не нужен: {{Were you at home?}}</p>
<h3>Частые ошибки</h3>
<p>• «Did you went?» — после did глагол обычный: {{Did you go?}} • «I didn't saw» → {{I didn't see.}} • «I goed» → {{I went.}}</p>`,
  lub: `<p>Окончание -ed звучит по-разному: {{played}} — «плэйд», {{worked}} — «уёркт», а после t и d — «ид»: {{waited}} — «уэйтид». Носители специально не думают — само получается.</p>`,
  pins: [{ id: "en4", t: "Past Simple", html: `<table class="tbl"><tbody><tr><td class="fr">worked · went · saw</td><td>было</td></tr><tr><td class="fr">didn't + go</td><td>не было</td></tr><tr><td class="fr">Did you go?</td><td>вопрос</td></tr><tr><td class="fr">was / were</td><td>был, были</td></tr><tr><td class="fr">went saw bought had got came took lost forgot</td><td>неправильные</td></tr></tbody></table>` }],
  tasks: [
    { k: "input", lang: "en", q: "Вчера вечером я смотрел фильм.", a: ["I watched a film last night.", "Last night I watched a film.", "I watched a movie last night."], why: "watch → watched" },
    { k: "choice", q: "We … to the cinema yesterday.", opts: ["go", "went", "goed"], a: "went", why: "go → went" },
    { k: "fix", lang: "en", q: "Did you saw him?", a: ["Did you see him?"], why: "после did — see" },
    { k: "input", lang: "en", q: "Я потерял ключи!", a: ["I lost my keys!", "I lost my keys."], why: "lose → lost" },
    { k: "choice", q: "Два дня назад — ?", opts: ["two days ago", "ago two days", "before two days"], a: "two days ago", why: "ago — после времени" },
    { k: "input", lang: "en", q: "Он не пришёл.", a: ["He didn't come.", "He did not come."], why: "didn't + come" },
    { k: "choice", q: "I … tired yesterday.", opts: ["was", "were", "did"], a: "was", why: "I → was" },
    { k: "listen", say: "She bought a new phone.", q: "Что прозвучало?", opts: ["Она купила новый телефон.", "Она потеряла новый телефон.", "Она увидела новый телефон."], a: "Она купила новый телефон.", why: "bought — купила" },
    { k: "input", lang: "en", q: "Что ты делал вчера?", a: ["What did you do yesterday?"], why: "вопрос — did" },
    { k: "fix", lang: "en", q: "They was at home.", a: ["They were at home."], why: "they → were" },
    { k: "input", lang: "en", q: "Ты забыл?", a: ["Did you forget?"], why: "Did + forget" },
  ] };
