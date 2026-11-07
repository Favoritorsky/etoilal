window.FR_C = window.FR_C || {};
FR_C[34] = { n: 34, t: "Прошлое с être: je suis allé", s: "глаголы движения — с être, и форма меняется по роду",
  words: [["naître", "родиться", "нэтр"], ["mourir", "умереть", "мурир"], ["monter", "подниматься", "монтэ"], ["descendre", "спускаться", "дэсандр"],
    ["rester", "оставаться", "рэстэ"], ["tomber", "падать", "томбэ"], ["entrer", "входить", "антрэ"], ["l'année", "год (весь год)", "ланэ"]],
  sut: "Около 15 глаголов в прошлом идут не с avoir, а с <b>être</b>: в основном «движение» — идти, приходить, уходить, падать. {{Je suis allé.}} — «я ходил». И у них форма <b>меняется по роду и числу</b>, как прилагательное: {{elle est allée}}, {{ils sont allés}}.",
  rule: `<table class="tbl"><thead><tr><th>кто</th><th>aller в прошлом</th></tr></thead><tbody>
<tr><td>я (он / она)</td><td class="fr">je suis allé / allée</td></tr><tr><td>ты</td><td class="fr">tu es allé / allée</td></tr>
<tr><td>он · она</td><td class="fr">il est allé · elle est allée</td></tr><tr><td>мы</td><td class="fr">nous sommes allés / allées</td></tr>
<tr><td>вы</td><td class="fr">vous êtes allé(e)s</td></tr><tr><td>они</td><td class="fr">ils sont allés · elles sont allées</td></tr></tbody></table>
<p>С être: <span class="fr">aller, venir, arriver, partir, entrer, sortir, monter, descendre, tomber, rester, naître, mourir, rentrer, revenir</span> + все глаголы с «себя» (урок 44).</p>`,
  prosto: `<p>Представь «дом être»: в нём живут глаголы, которые описывают <b>путь</b> — родиться, прийти, войти, подняться, спуститься, упасть, выйти, уйти, умереть. В прошлом они идут с {{être}}, а не с avoir.</p>
> Je suis allé à Paris. :: Я ездил в Париж. — «жё сюизалэ а пари»
> Elle est venue hier. :: Она приходила вчера. — «эль э вёню йер»: «она» — +e
> Nous sommes arrivés à midi. :: Мы приехали в полдень. — «ну сомзаривэ а миди»
> Il est tombé. :: Он упал. — «иль э томбэ»
> Elles sont parties. :: Они (женщины) уехали. — «эль сон парти»
> Tu es resté chez toi ? :: Ты остался дома? — «тю э рэстэ шэ туа»
> Je suis né en deux mille dix. :: Я родился в 2010 году. — «жё сюи нэ ан дё миль дис»
> Ils sont entrés. :: Они вошли. — «иль сонтантрэ»
@@pin:fr34@@
<h3>Форма меняется по роду</h3>
<p>С être прошлая форма ведёт себя как <b>прилагательное</b>: для «она» + e, для «много» + s. {{il est allé}} — {{elle est allée}} — {{ils sont allés}} — {{elles sont allées}}. На слух чаще всего разницы нет — только на письме.</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «он пошёл — она пошла» — прошлое меняется по роду.</p>
<p><b>Не как в русском:</b> по роду меняются только глаголы с être, а с avoir — нет. И выбор avoir / être надо запомнить: «я пошёл» — {{je suis allé}}, но «я поел» — {{j'ai mangé}}.</p>
<h3>Частые ошибки</h3>
<p>• «J'ai allé» — надо {{Je suis allé.}} • «Elle est allé» — для «она» + e: {{allée}}. • «Je suis mangé» — manger идёт с avoir: {{J'ai mangé.}}</p>`,
  lub: `<p>Почему именно эти глаголы? Они описывают <b>изменение места или состояния</b> самого человека: был тут — стал там, не было — родился. Для них «я есть пришедший» звучит логично.</p>
<p>Чтобы запомнить список, французские школьники рисуют дом: человек родился ({{naître}}), вошёл ({{entrer}}), поднялся ({{monter}}), упал ({{tomber}}), спустился ({{descendre}}), вышел ({{sortir}}), ушёл ({{partir}}), умер ({{mourir}}).</p>`,
  pins: [{ id: "fr34", t: "Прошлое с être", html: `<table class="tbl"><tbody><tr><td>глаголы «пути»</td><td class="fr">aller venir arriver partir entrer sortir monter descendre tomber rester naître mourir rentrer</td></tr><tr><td>форма</td><td class="fr">je suis allé(e), ils sont allés, elles sont allées</td></tr><tr><td>особые</td><td class="fr">venu, né, mort</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Я ездил в Париж. — Je … allé à Paris.", opts: ["suis", "ai", "vais"], a: "suis", why: "aller — с être" },
    { k: "choice", q: "Elle est …", opts: ["allé", "allée", "allés"], a: "allée", why: "«она» — + e" },
    { k: "input", lang: "fr", q: "Мы приехали в полдень.", a: ["Nous sommes arrivés à midi.", "Nous sommes arrivées à midi."], why: "arriver — с être, «много» + s" },
    { k: "fix", lang: "fr", q: "J'ai allé au cinéma.", a: ["Je suis allé au cinéma.", "Je suis allée au cinéma."], why: "aller — с être" },
    { k: "tiles", lang: "fr", q: "Он упал.", a: "Il est tombé", d: ["a", "tombée"], why: "tomber — с être" },
    { k: "choice", q: "Какой глагол идёт в прошлом с avoir?", opts: ["manger", "partir", "venir"], a: "manger", why: "manger — не «путь»: j'ai mangé" },
    { k: "listen", say: "Elle est venue hier.", q: "Что прозвучало?", opts: ["Она приходила вчера.", "Она придёт завтра.", "Она пришла сегодня."], a: "Она приходила вчера.", why: "venir → venu(e); hier — вчера" },
    { k: "input", lang: "fr", q: "Ты остался дома? (тебе-мальчику)", a: ["Tu es resté chez toi ?"], why: "rester — с être" },
    { k: "choice", q: "Elles sont … (уехали)", opts: ["partis", "parties", "partie"], a: "parties", why: "elles — «она» + «много»: -ies" },
    { k: "input", lang: "fr", q: "Они вошли.", a: ["Ils sont entrés."], why: "entrer — с être, ils — + s" },
  ] };
