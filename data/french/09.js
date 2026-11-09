window.FR_C = window.FR_C || {};
FR_C[9] = { n: 9, t: "Быть: je suis, tu es…", s: "самый важный глагол — неправильный",
  words: [["être", "быть", "этр"], ["content", "довольный, рад", "контан"], ["fatigué", "усталый", "фатигэ"], ["russe", "русский", "рюс"],
    ["étudiant", "студент", "этюдьян"], ["malade", "больной", "малад"], ["prêt", "готов", "прэ"], ["et", "и", "э"]],
  sut: "В русском «я студент» — без глагола. Во французском глагол «быть» нужен <b>всегда</b>: {{Je suis russe.}} — «я (есть) русский». Формы {{être}} неправильные — их просто запоминают: je suis, tu es, il est, nous sommes, vous êtes, ils sont.",
  rule: `<table class="tbl"><thead><tr><th>кто</th><th>быть</th><th>читается</th></tr></thead><tbody>
<tr><td>я</td><td class="fr">je suis</td><td>жё сюи</td></tr><tr><td>ты</td><td class="fr">tu es</td><td>тю э</td></tr>
<tr><td>он / она</td><td class="fr">il / elle est</td><td>иль э / эль э</td></tr><tr><td>мы</td><td class="fr">nous sommes</td><td>ну сом</td></tr>
<tr><td>вы</td><td class="fr">vous êtes</td><td>вузэт</td></tr><tr><td>они</td><td class="fr">ils / elles sont</td><td>иль сон / эль сон</td></tr></tbody></table>`,
  prosto: `<p>В русском мы говорим «я студент», «он устал» — и никакого глагола. Во французском так нельзя: между «кто» и «какой» всегда стоит глагол {{être}} «быть». Буквально: «я есть студент».</p>
> Je suis russe. :: Я русский. — «жё сюи рюс»
> Tu es fatigué ? :: Ты устал? — «тю э фатигэ»
> Il est étudiant. :: Он студент. — «иль этэтюдьян»: связка t + é
> Elle est malade. :: Она больна. — «эль э малад»
> Nous sommes prêts. :: Мы готовы. — «ну сом прэ»
> Vous êtes content ? :: Вы довольны? — «вузэт контан»: связка s + ê
> Ils sont étudiants. :: Они студенты. — «иль сонтэтюдьян»
@@pin:fr9@@
<h3>Кто есть кто</h3>
<p>{{je}} — я, {{tu}} — ты, {{il}} — он, {{elle}} — она, {{nous}} — мы, {{vous}} — вы, {{ils}} — они (мужчины или смешанная группа), {{elles}} — они (только женщины). s на конце nous, vous, ils, elles молчит — но просыпается перед гласной: {{vous êtes}} «вузэт».</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «быть» — тоже неправильный: «есть», «был», «буду» совсем не похожи.</p>
<p><b>Не как в русском:</b> в русском «быть» в настоящем пропускают: «я студент». Во французском — <b>никогда</b>: {{Je suis étudiant.}}</p>
<h3>Частые ошибки</h3>
<p>• Пропускают глагол: «Je russe» — надо {{Je suis russe.}} • Путают {{il est}} «иль э» (он есть) и {{et}} «э» (и) — звучат одинаково! • Читают {{ils sont}} как «ильс сонт» — s и t молчат: «иль сон».</p>`,
  lub: `<p>{{être}} — самый неправильный глагол почти во всех европейских языках: английское <i>be — am — is — are</i>, немецкое <i>sein — bin — ist</i>. Он такой древний, что его формы собраны из нескольких разных старых глаголов.</p>
<p>Слово «женщина-студентка» — {{étudiante}} «этюдьянт»: e на конце, и t начинает звучать. Подробнее про «он» и «она» у слов — в уроке 15.</p>`,
  pins: [{ id: "fr9", t: "être — быть", html: `<table class="tbl"><tbody><tr><td class="fr">je suis</td><td>жё сюи</td></tr><tr><td class="fr">tu es</td><td>тю э</td></tr><tr><td class="fr">il / elle est</td><td>иль / эль э</td></tr><tr><td class="fr">nous sommes</td><td>ну сом</td></tr><tr><td class="fr">vous êtes</td><td>вузэт</td></tr><tr><td class="fr">ils / elles sont</td><td>иль / эль сон</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Я русский. — Je … russe.", opts: ["suis", "es", "est"], a: "suis", why: "je suis — я есть" },
    { k: "input", lang: "fr", q: "Ты устал?", a: ["Tu es fatigué ?", "Tu es fatigué"], why: "tu es — ты есть" },
    { k: "tiles", lang: "fr", q: "Мы готовы.", a: "Nous sommes prêts", d: ["sont", "êtes"], why: "nous sommes" },
    { k: "choice", q: "Elle … malade.", opts: ["es", "est", "sont"], a: "est", why: "il / elle est" },
    { k: "fix", lang: "fr", q: "Je étudiant.", a: ["Je suis étudiant."], why: "«быть» во французском не пропускают" },
    { k: "choice", q: "Как читается vous êtes?", opts: ["ву этэс", "вузэт", "ву эт"], a: "вузэт", why: "связка: s проснулась, звучит «з»" },
    { k: "input", lang: "fr", q: "Они студенты.", a: ["Ils sont étudiants.", "Elles sont étudiantes."], why: "ils sont + слово с s на конце (молчит)", hint: "ils sont…" },
    { k: "listen", say: "Il est content.", q: "Что прозвучало?", opts: ["Он доволен.", "Он устал.", "Он болен."], a: "Он доволен.", why: "content — «довольный»" },
    { k: "choice", q: "Какие два слова звучат одинаково — «э»?", opts: ["est и et", "es и êtes", "suis и sont"], a: "est и et", why: "est (есть) и et (и) — оба «э»" },
    { k: "input", lang: "fr", q: "Вы довольны?", a: ["Vous êtes content ?", "Vous êtes contents ?", "Vous êtes content"], why: "vous êtes — «вузэт»" },
  ] };
