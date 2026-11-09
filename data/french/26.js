window.FR_C = window.FR_C || {};
FR_C[26] = { n: 26, t: "Мочь, хотеть, должен", s: "pouvoir, vouloir, devoir + глагол целиком",
  words: [["pouvoir", "мочь", "пувуар"], ["vouloir", "хотеть", "вулуар"], ["devoir", "быть должным", "дёвуар"], ["il faut", "надо", "иль фо"],
    ["nager", "плавать", "нажэ"], ["aider", "помогать", "эдэ"], ["apprendre", "учить (что-то)", "апрандр"], ["conduire", "водить (машину)", "кондюир"]],
  sut: "После «могу, хочу, должен» второй глагол стоит <b>целиком</b>, как в словаре: {{Je peux nager.}} — «я могу плавать», {{Je veux manger.}} — «я хочу есть». А «надо» — {{il faut}} + глагол: {{Il faut partir.}} — «надо уходить».",
  rule: `<table class="tbl"><thead><tr><th>кто</th><th>мочь</th><th>хотеть</th><th>должен</th></tr></thead><tbody>
<tr><td>я</td><td class="fr">je peux</td><td class="fr">je veux</td><td class="fr">je dois</td></tr>
<tr><td>ты</td><td class="fr">tu peux</td><td class="fr">tu veux</td><td class="fr">tu dois</td></tr>
<tr><td>он</td><td class="fr">il peut</td><td class="fr">il veut</td><td class="fr">il doit</td></tr>
<tr><td>мы</td><td class="fr">nous pouvons</td><td class="fr">nous voulons</td><td class="fr">nous devons</td></tr>
<tr><td>вы</td><td class="fr">vous pouvez</td><td class="fr">vous voulez</td><td class="fr">vous devez</td></tr>
<tr><td>они</td><td class="fr">ils peuvent</td><td class="fr">ils veulent</td><td class="fr">ils doivent</td></tr></tbody></table>
<p>Читается: пё, вё, дуа · пувон, вулон, дёвон · пёв, вёль, дуав.</p>`,
  prosto: `<p>Эти три глагола — неправильные, но очень нужные. После них второй глагол <b>не меняется</b> — стоит в словарной форме на -er, -ir, -re.</p>
> Je peux nager. :: Я умею (могу) плавать. — «жё пё нажэ»
> Tu peux m'aider ? :: Можешь мне помочь? — «тю пё мэдэ»
> Je veux apprendre le français. :: Я хочу учить французский. — «жё вё апрандр лё франсэ»
> Il veut venir. :: Он хочет прийти. — «иль вё вёнир»
> Nous devons travailler. :: Мы должны работать. — «ну дёвон травайе»
> Vous voulez du café ? :: Хотите кофе? — «ву вулэ дю кафэ»
> Ils doivent partir. :: Им надо уходить. — «иль дуав партир»
> Il faut manger. :: Надо есть. — «иль фо манжэ»
@@pin:fr26@@
<h3>«Не могу», «не хочу»</h3>
<p>ne … pas обнимает <b>первый</b> глагол: {{Je ne peux pas venir.}} — «я не могу прийти». {{Je ne veux pas manger.}} — «я не хочу есть».</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «я хочу <b>есть</b>», «я могу <b>плавать</b>» — второй глагол в начальной форме.</p>
<p><b>Не как в русском:</b> «надо» во французском — с «кто»: {{il faut}} «оно надо». А «уметь плавать» французы чаще говорят тоже через {{pouvoir}} или {{savoir}}.</p>
<h3>Частые ошибки</h3>
<p>• Меняют второй глагол: «Je veux mange» — надо {{Je veux manger.}} • Ставят pas после второго глагола: «Je peux venir pas» — надо {{Je ne peux pas venir.}} • «Il faut que partir» — после il faut сразу глагол: {{Il faut partir.}}</p>`,
  lub: `<p>Вежливо «я хотел бы» — {{je voudrais}} «жё вудрэ». Так говорят в кафе и магазине: <i>Je voudrais un café, s'il vous plaît.</i> Эту форму («бы») разберём в уроке 49 — а пока запомни целиком.</p>
<p>{{devoir}} значит ещё и «быть должным деньги»: <i>Je te dois dix euros</i> — «я тебе должен десять евро». Отсюда и слово «долг».</p>`,
  pins: [{ id: "fr26", t: "pouvoir, vouloir, devoir", html: `<table class="tbl"><tbody><tr><td>мочь</td><td class="fr">peux peux peut · pouvons pouvez peuvent</td></tr><tr><td>хотеть</td><td class="fr">veux veux veut · voulons voulez veulent</td></tr><tr><td>должен</td><td class="fr">dois dois doit · devons devez doivent</td></tr><tr><td>+ глагол целиком</td><td class="fr">Je peux nager. Il faut partir.</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Я хочу есть. — Je … manger.", opts: ["veux", "peux", "dois"], a: "veux", why: "хотеть — vouloir: je veux" },
    { k: "input", lang: "fr", q: "Я умею плавать. (через pouvoir)", a: ["Je peux nager."], why: "je peux + глагол целиком" },
    { k: "fix", lang: "fr", q: "Il veut mange.", a: ["Il veut manger."], why: "после vouloir глагол целиком" },
    { k: "tiles", lang: "fr", q: "Мы должны работать.", a: "Nous devons travailler", d: ["doivent", "travaillons"], why: "nous devons + глагол целиком" },
    { k: "choice", q: "Можешь мне помочь?", opts: ["Tu peux m'aider ?", "Tu peux m'aides ?", "Tu veux m'aider ?"], a: "Tu peux m'aider ?", why: "мочь — pouvoir, второй глагол целиком" },
    { k: "input", lang: "fr", q: "Надо уходить.", a: ["Il faut partir."], why: "il faut + глагол" },
    { k: "listen", say: "Ils doivent partir.", q: "Что прозвучало?", opts: ["Им надо уходить.", "Они хотят уйти.", "Они могут уйти."], a: "Им надо уходить.", why: "ils doivent — «иль дуав»" },
    { k: "input", lang: "fr", q: "Я не могу прийти.", a: ["Je ne peux pas venir."], why: "ne … pas вокруг первого глагола" },
    { k: "choice", q: "Vous … du café ? (хотите)", opts: ["voulez", "veulent", "veux"], a: "voulez", why: "vous voulez" },
    { k: "input", lang: "fr", q: "Я хочу учить французский.", a: ["Je veux apprendre le français."], why: "je veux + apprendre" },
  ] };
