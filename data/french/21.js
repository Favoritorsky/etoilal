window.FR_C = window.FR_C || {};
FR_C[21] = { n: 21, t: "Немного чего-то: du, de la", s: "хлеб, воду, музыку — «кусочек» от целого",
  words: [["du pain", "хлеба (немного)", "дю пэн"], ["de l'eau", "воды (немного)", "дё ло"], ["le fromage", "сыр", "лё фромаж"], ["le café", "кофе", "лё кафэ"],
    ["la confiture", "варенье", "ла конфитюр"], ["boire", "пить", "буар"], ["vouloir — je veux", "хотеть — я хочу", "вулуар — жё вё"], ["un peu de", "немного", "эн пё дё"]],
  sut: "Когда берёшь <b>часть</b> чего-то, что не считают штуками (хлеб, вода, сыр), французы ставят <b>du</b> (он), <b>de la</b> (она), <b>de l'</b> (перед гласной): {{Je mange du pain.}} — «я ем хлеб» (сколько-то хлеба). После «не» — просто <b>de</b>: {{Je ne bois pas de café.}}",
  rule: `<table class="tbl"><thead><tr><th></th><th>немного (часть)</th><th>пример</th></tr></thead><tbody>
<tr><td>«он»</td><td class="fr">du</td><td class="fr">du pain, du fromage</td></tr>
<tr><td>«она»</td><td class="fr">de la</td><td class="fr">de la confiture</td></tr>
<tr><td>перед гласной</td><td class="fr">de l'</td><td class="fr">de l'eau</td></tr>
<tr><td>после «не»</td><td class="fr">de / d'</td><td class="fr">pas de pain, pas d'eau</td></tr></tbody></table>`,
  prosto: `<p>По-русски мы говорим «дай хлеба», «хочу воды» — и окончание показывает, что нужна <b>часть</b>, а не весь хлеб в мире. Французы показывают это маленьким словом {{du}} или {{de la}}.</p>
> Je mange du pain. :: Я ем хлеб. — «жё манж дю пэн»
> Tu bois du café ? :: Ты пьёшь кофе? — «тю буа дю кафэ»
> Il veut de l'eau. :: Он хочет воды. — «иль вё дё ло»
> Nous mangeons du fromage. :: Мы едим сыр. — «ну манжон дю фромаж»
> Elle mange de la confiture. :: Она ест варенье. — «эль манж дё ла конфитюр»
> Je ne bois pas de café. :: Я не пью кофе. — «жё нё буа па дё кафэ»
> Un peu de lait ? :: Немного молока? — «эн пё дё лэ»
@@pin:fr21@@
<h3>le café или du café?</h3>
<p>Когда говоришь о чём-то <b>вообще</b> (любить, не любить) — {{le}}: {{J'aime le café.}} «Я люблю кофе (вообще)». Когда <b>ешь или пьёшь часть</b> — {{du}}: {{Je bois du café.}} «Я пью кофе (сколько-то)».</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «хочу воды» (часть) и «люблю воду» (вообще) — разные окончания. Во французском разные маленькие слова.</p>
<p><b>Не как в русском:</b> в русском можно сказать «я ем хлеб» вообще без подсказки. Во французском маленькое слово <b>обязательно</b>: «Je mange pain» — ошибка.</p>
<h3>Частые ошибки</h3>
<p>• Пропускают du: «Je bois café» — надо {{Je bois du café.}} • После «не» оставляют du: «pas du café» — надо {{pas de café}}. • «J'aime du café» — любят вообще: {{J'aime le café.}}</p>`,
  lub: `<p>du — это слившиеся de + le, «из того самого»: «я ем из хлеба». Такое же слияние ты видел у au (à + le). В итальянском похоже: <i>del pane</i>.</p>
<p>Глагол {{boire}} «пить» неправильный: je bois, tu bois, il boit, nous buvons, vous buvez, ils boivent. А {{vouloir}} «хотеть» — je veux, tu veux, il veut. Подробнее о «хотеть» — в уроке 26.</p>`,
  pins: [{ id: "fr21", t: "du, de la, de l'", html: `<table class="tbl"><tbody><tr><td class="fr">du</td><td>часть, «он»: du pain</td></tr><tr><td class="fr">de la</td><td>часть, «она»: de la confiture</td></tr><tr><td class="fr">de l'</td><td>перед гласной: de l'eau</td></tr><tr><td class="fr">pas de</td><td>после «не»: pas de café</td></tr><tr><td class="fr">le / la</td><td>вообще: J'aime le café</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Я ем хлеб. — Je mange … pain.", opts: ["du", "de la", "le"], a: "du", why: "часть, pain — «он»: du" },
    { k: "choice", q: "Elle mange … confiture.", opts: ["du", "de la", "des"], a: "de la", why: "confiture — «она»: de la" },
    { k: "input", lang: "fr", q: "Он хочет воды.", a: ["Il veut de l'eau."], why: "eau — гласная: de l'", hint: "il veut + de l'…" },
    { k: "fix", lang: "fr", q: "Je ne bois pas du café.", a: ["Je ne bois pas de café."], why: "после pas — de" },
    { k: "choice", q: "Я люблю кофе (вообще).", opts: ["J'aime le café.", "J'aime du café.", "J'aime de café."], a: "J'aime le café.", why: "любят вообще — le" },
    { k: "tiles", lang: "fr", q: "Ты пьёшь кофе?", a: "Tu bois du café", d: ["le", "de"], why: "пьёшь часть — du" },
    { k: "listen", say: "Nous mangeons du fromage.", q: "Что прозвучало?", opts: ["Мы едим сыр.", "Мы любим сыр.", "Мы едим хлеб."], a: "Мы едим сыр.", why: "du fromage — «дю фромаж»" },
    { k: "input", lang: "fr", q: "Немного молока?", a: ["Un peu de lait ?", "Un peu de lait"], why: "un peu de — без артикля" },
    { k: "choice", q: "Je bois … eau.", opts: ["du", "de l'", "de la"], a: "de l'", why: "перед гласной — de l'" },
    { k: "input", lang: "fr", q: "Я ем сыр.", a: ["Je mange du fromage."], why: "часть — du" },
  ] };
