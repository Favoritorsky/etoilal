window.FR_C = window.FR_C || {};
FR_C[31] = { n: 31, t: "Только что: je viens de…", s: "venir de + глагол",
  words: [["arriver", "приезжать, прибывать", "аривэ"], ["téléphoner", "звонить (по телефону)", "тэлэфонэ"], ["le message", "сообщение", "лё мэсаж"], ["rentrer", "возвращаться домой", "рантрэ"],
    ["le repas", "еда, обед (приём пищи)", "лё рёпа"], ["l'avion", "самолёт", "лавьон"], ["juste", "как раз, только", "жюст"]],
  sut: "«Только что сделал» — <b>venir de + глагол целиком</b>: {{Je viens de manger.}} — «я только что поел» (буквально «я прихожу от еды»). Ты уже знаешь формы venir — осталось добавить de.",
  rule: `<table class="tbl"><thead><tr><th>кто</th><th>venir de + глагол</th><th>значит</th></tr></thead><tbody>
<tr><td>я</td><td class="fr">je viens de manger</td><td>я только что поел</td></tr><tr><td>ты</td><td class="fr">tu viens d'arriver</td><td>ты только что приехал</td></tr>
<tr><td>он</td><td class="fr">il vient de partir</td><td>он только что ушёл</td></tr><tr><td>мы</td><td class="fr">nous venons de finir</td><td>мы только что закончили</td></tr>
<tr><td>вы</td><td class="fr">vous venez de téléphoner</td><td>вы только что звонили</td></tr><tr><td>они</td><td class="fr">ils viennent de rentrer</td><td>они только что вернулись</td></tr></tbody></table>
<p>Перед гласной de → <span class="fr">d'</span>: <span class="fr">je viens d'arriver</span>.</p>`,
  prosto: `<p>Это зеркало прошлого урока: {{je vais}} + глагол — «скоро сделаю», {{je viens de}} + глагол — «только что сделал».</p>
> Je viens de manger. :: Я только что поел. — «жё вьен дё манжэ»
> Il vient de partir. :: Он только что ушёл. — «иль вьен дё партир»
> Tu viens d'arriver ? :: Ты только что приехал? — «тю вьен дарривэ»
> Nous venons de finir le repas. :: Мы только что пообедали. — «ну вёнон дё финир лё рёпа»
> Elle vient de téléphoner. :: Она только что звонила. — «эль вьен дё тэлэфонэ»
> Ils viennent de rentrer. :: Они только что вернулись домой. — «иль вьен дё рантрэ»
> L'avion vient d'arriver. :: Самолёт только что прилетел. — «лавьон вьен дарривэ»
> Je viens juste de lire ton message. :: Я как раз прочитал твоё сообщение. — «жё вьен жюст дё лир тон мэсаж»
@@pin:fr31@@
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «только что» — тоже отдельный оттенок прошлого.</p>
<p><b>Не как в русском:</b> в русском это прошедшее время + «только что». Во французском — глагол «приходить» в <b>настоящем</b>: «я прихожу от того, что поел». Поэтому формы — {{je viens}}, а не прошлые.</p>
<h3>Частые ошибки</h3>
<p>• Забывают de: «je viens manger» — это «я иду (прихожу) есть»! Надо {{je viens de manger}}. • «je viens de mangé» — после de глагол целиком: {{manger}}. • «de arriver» — перед гласной {{d'arriver}}.</p>`,
  lub: `<p>«Je viens manger» без de значит «я прихожу поесть» — совсем другой смысл. Одно маленькое de превращает будущее в прошлое.</p>
<p>Три «времени» на основе знакомых глаголов: {{je vais chanter}} (скоро), {{je chante}} (сейчас), {{je viens de chanter}} (только что). Настоящие прошедшее и будущее — в следующих уроках.</p>`,
  pins: [{ id: "fr31", t: "Только что / скоро", html: `<table class="tbl"><tbody><tr><td class="fr">je viens de + глагол</td><td>только что сделал</td></tr><tr><td class="fr">je vais + глагол</td><td>скоро сделаю</td></tr><tr><td class="fr">de → d' перед гласной</td><td class="fr">je viens d'arriver</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Я только что поел.", opts: ["Je viens de manger.", "Je viens manger.", "Je vais manger."], a: "Je viens de manger.", why: "только что — venir de" },
    { k: "input", lang: "fr", q: "Он только что ушёл.", a: ["Il vient de partir."], why: "il vient de + partir" },
    { k: "fix", lang: "fr", q: "Tu viens de arriver ?", a: ["Tu viens d'arriver ?"], why: "перед гласной — d'" },
    { k: "tiles", lang: "fr", q: "Они только что вернулись домой.", a: "Ils viennent de rentrer", d: ["vont", "rentrent"], why: "ils viennent de + rentrer" },
    { k: "choice", q: "Что значит Je viens manger ?", opts: ["Я прихожу поесть.", "Я только что поел.", "Я поем завтра."], a: "Я прихожу поесть.", why: "без de — «прихожу поесть»" },
    { k: "listen", say: "L'avion vient d'arriver.", q: "Что прозвучало?", opts: ["Самолёт только что прилетел.", "Самолёт скоро прилетит.", "Поезд только что пришёл."], a: "Самолёт только что прилетел.", why: "vient d'arriver — только что прибыл" },
    { k: "input", lang: "fr", q: "Мы только что пообедали.", a: ["Nous venons de finir le repas."], why: "nous venons de + finir" },
    { k: "choice", q: "Скоро или только что? Je vais partir.", opts: ["скоро уеду", "только что уехал"], a: "скоро уеду", why: "aller + глагол — скоро" },
    { k: "input", lang: "fr", q: "Она только что звонила.", a: ["Elle vient de téléphoner."], why: "elle vient de + téléphoner" },
    { k: "choice", q: "Je viens de … (только что закончил)", opts: ["finir", "fini", "finis"], a: "finir", why: "после de — глагол целиком" },
  ] };
