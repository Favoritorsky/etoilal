window.FR_C = window.FR_C || {};
FR_C[51] = { n: 51, t: "Если: si", s: "si + сейчас → будущее; si + было → бы",
  words: [["si", "если", "си"], ["l'argent", "деньги", "ларжан"], ["libre", "свободный", "либр"], ["le voyage", "путешествие", "лё вуаяж"],
    ["la loterie", "лотерея", "ла лотри"], ["rater", "опоздать на, упустить", "ратэ"], ["à l'heure", "вовремя", "а лёр"]],
  sut: "Две главные схемы. <b>Реальное</b>: si + <b>сейчас</b> → <b>будущее</b>: {{S'il pleut, je resterai chez moi.}} «Если пойдёт дождь, я останусь дома». <b>Мечта</b>: si + <b>было</b> (-ais) → <b>бы</b>: {{Si j'avais de l'argent, je voyagerais.}} «Если бы у меня были деньги, я бы путешествовал».",
  rule: `<table class="tbl"><thead><tr><th></th><th>после si</th><th>в другой части</th></tr></thead><tbody>
<tr><td>реально</td><td class="fr">si + je chante (сейчас)</td><td class="fr">je chanterai / je chante / chante !</td></tr>
<tr><td>мечта</td><td class="fr">si + je chantais (было)</td><td class="fr">je chanterais (бы)</td></tr></tbody></table>
<p>После <span class="fr">si</span> <b>никогда</b> не ставят будущее и «бы». <span class="fr">si + il → s'il</span>, но <span class="fr">si elle</span> — без сокращения.</p>`,
  prosto: `<p>Самое важное правило: после {{si}} во французском <b>не бывает</b> ни будущего, ни «бы». «Бы» и будущее — только во второй части фразы.</p>
> S'il pleut, je resterai chez moi. :: Если пойдёт дождь, я останусь дома. — «силь плё, жё рэстрэ шэ муа»
> Si tu veux, on peut sortir. :: Если хочешь, можем выйти погулять. — «си тю вё, он пё сортир»
> Si tu as le temps, appelle-moi ! :: Если будет время, позвони мне! — «си тю а лё тан, апэль муа»
> Si j'avais de l'argent, je voyagerais. :: Если бы у меня были деньги, я бы путешествовал. — «си жавэ дё ларжан, жё вуаяжрэ»
> Si j'étais libre, je viendrais. :: Если бы я был свободен, я бы пришёл. — «си жэтэ либр, жё вьендрэ»
> Si je gagnais à la loterie, j'achèterais une maison. :: Если бы я выиграл в лотерею, я бы купил дом. — «си жё ганьэ а ла лотри, жашэтрэ юн мэзон»
> Si tu pars maintenant, tu seras à l'heure. :: Если уйдёшь сейчас, придёшь вовремя. — «си тю пар мэнтнан, тю сёра а лёр»
@@pin:fr51@@
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «если бы … , то я бы …» — та же мечтательная схема.</p>
<p><b>Не как в русском:</b> в русском «бы» стоит в обеих частях: «если <b>бы</b> я был… я <b>бы</b> пришёл». Во французском «бы» — только во второй, а после si — форма «было»: {{si j'étais}}. И «если пойдёт дождь» (будущее по-русски) — после si настоящее: {{s'il pleut}}.</p>
<h3>Частые ошибки</h3>
<p>• «Si j'aurais de l'argent» — после si нельзя «бы»: {{si j'avais}}. • «S'il pleuvra» — после si нельзя будущее: {{s'il pleut}}. • «Si il» — надо {{s'il}}.</p>`,
  lub: `<p>Французские школьники запоминают правило фразой: «Les <i>si</i> n'aiment pas les <i>-rais</i>» — «Si не любит -rais» (окончание «бы»). Звучит как игра слов: <i>les scies n'aiment pas les raies</i> — «пилы не любят скатов».</p>
<p>Есть и третья схема — сожаление о прошлом: <i>Si j'avais su, je serais venu</i> — «Если бы я знал, я бы пришёл (тогда)». Её узнаешь, когда начнёшь читать книги.</p>`,
  pins: [{ id: "fr51", t: "Если: si", html: `<table class="tbl"><tbody><tr><td>реально</td><td class="fr">si + сейчас → будущее: S'il pleut, je resterai.</td></tr><tr><td>мечта</td><td class="fr">si + было (-ais) → бы: Si j'avais…, je voyagerais.</td></tr><tr><td>запрет</td><td>после si — никогда будущее и «бы»</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Если пойдёт дождь, я останусь дома. — S'il …, je resterai chez moi.", opts: ["pleut", "pleuvra", "pleuvrait"], a: "pleut", why: "после si — настоящее" },
    { k: "choice", q: "Si j'… de l'argent, je voyagerais.", opts: ["avais", "aurais", "ai eu"], a: "avais", why: "мечта: si + было" },
    { k: "input", lang: "fr", q: "Если бы я был свободен, я бы пришёл.", a: ["Si j'étais libre, je viendrais."], why: "si + étais → viendrais" },
    { k: "fix", lang: "fr", q: "Si j'aurais le temps, je viendrais.", a: ["Si j'avais le temps, je viendrais."], why: "после si — не «бы», а «было»" },
    { k: "tiles", lang: "fr", q: "Если хочешь, можем выйти погулять.", a: "Si tu veux on peut sortir", d: ["voudrais", "pourrait"], why: "реально: si + настоящее" },
    { k: "listen", say: "Si je gagnais à la loterie, j'achèterais une maison.", q: "Что прозвучало?", opts: ["Если бы я выиграл в лотерею, я бы купил дом.", "Если я выиграю в лотерею, я куплю дом.", "Я выиграл в лотерею и купил дом."], a: "Если бы я выиграл в лотерею, я бы купил дом.", why: "gagnais … achèterais — мечта" },
    { k: "choice", q: "Si tu pars maintenant, tu … à l'heure.", opts: ["seras", "serais", "es été"], a: "seras", why: "реально: si + сейчас → будущее" },
    { k: "input", lang: "fr", q: "Если будет время, позвони мне!", a: ["Si tu as le temps, appelle-moi !"], why: "si + настоящее, потом приказ" },
    { k: "choice", q: "si + il =", opts: ["s'il", "si il", "s'i"], a: "s'il", why: "si перед il сокращается" },
    { k: "choice", q: "Что НЕЛЬЗЯ ставить после si?", opts: ["будущее и «бы»", "настоящее", "форму «было»"], a: "будущее и «бы»", why: "si не любит -rais" },
  ] };
