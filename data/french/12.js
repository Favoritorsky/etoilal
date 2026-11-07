window.FR_C = window.FR_C || {};
FR_C[12] = { n: 12, t: "Глагол сейчас: je chante", s: "я пою, ты поёшь… — пишется по-разному, а звучит почти одинаково",
  words: [["chanter", "петь", "шанте"], ["parler", "говорить", "парле"], ["écouter", "слушать", "экуте"],
    ["danser", "танцевать", "дансе"], ["regarder", "смотреть", "рёгарде"], ["aimer", "любить", "эме"]],
  sut: "Почти все французские глаголы кончаются на <b>-er</b>: {{chanter}} «петь». Отрежь -er — получишь основу chant-, и добавь окончание. Но окончания <b>-e, -es, -e, -ent молчат</b> — поэтому «я пою», «ты поёшь», «он поёт», «они поют» звучат одинаково: «шант». Чтобы было понятно, кто поёт, <b>je, tu, il… говорят всегда</b>.",
  rule: `<table class="tbl"><thead><tr><th>кто</th><th>пишется</th><th>читается</th></tr></thead><tbody>
<tr><td>я</td><td class="fr">je chant<s>e</s></td><td>жё шант</td></tr><tr><td>ты</td><td class="fr">tu chant<s>es</s></td><td>тю шант</td></tr>
<tr><td>он / она</td><td class="fr">il / elle chant<s>e</s></td><td>иль / эль шант</td></tr><tr><td>мы</td><td class="fr">nous chantons</td><td>ну шантон</td></tr>
<tr><td>вы</td><td class="fr">vous chantez</td><td>ву шанте</td></tr><tr><td>они</td><td class="fr">ils / elles chant<s>ent</s></td><td>иль / эль шант</td></tr></tbody></table>`,
  prosto: `<p>Французский глагол собирается как конструктор: <b>основа + окончание</b>. Берёшь {{chanter}} «петь», отрезаешь -er — остаётся chant-. Дальше добавляешь окончание того, кто делает:</p>
> Je chante. :: Я пою. — «жё шант»
> Tu parles. :: Ты говоришь. — «тю парль»
> Il écoute. :: Он слушает. — «иль экут»
> Nous chantons. :: Мы поём. — «ну шантон»
> Vous parlez. :: Вы говорите. — «ву парле»
> Elles dansent. :: Они танцуют. — «эль данс»
@@pin:fr12@@
<h3>Почему без je нельзя</h3>
<p>Послушай: {{je chante}}, {{il chante}}, {{ils chantent}} — везде «шант». Окончания -e, -es, -ent <b>молчат</b> (помнишь немые буквы из урока 1?). По звуку не понять, кто поёт, поэтому <b>je, tu, il, nous, vous, ils говорят всегда</b>. А просто {{Chante !}} — это приказ «пой!».</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> у каждого «кто» своё окончание: пою, поёшь, поёт — chante, chantes, chante.</p>
<p><b>Не как в русском:</b> в русском окончания слышно, поэтому можно сказать просто «пою». Во французском большинство окончаний молчит — без je, tu, il не обойтись. И ещё: перед гласной je теряет e и сливается со словом: {{j'écoute}} «жэкут», {{j'aime}} «жэм».</p>
<p>«Мы» в разговоре французы чаще говорят через {{on}}: {{on chante}} — «мы поём» (глагол — как с il). Nous chantons — так говорят чуть официальнее и пишут.</p>
<h3>Частые ошибки</h3>
<p>• Читать окончание: {{ils chantent}} — «иль шант», а не «иль шантент». • Забывать je: «Chante.» — это «пой!», а не «я пою». • {{nous chantons}} — «шантон»: -ons читается «он». • «Je aime» — надо {{j'aime}}.</p>`,
  lub: `<p>Так устроены только глаголы на <b>-er</b>, но их больше 90 %: chanter, parler, danser, aimer… Неправильных глаголов немного, зато самые частые: être «быть», avoir «иметь», aller «идти», faire «делать». Их разберём отдельно.</p>
<p>Окончание -ent у «они» когда-то читалось. Сейчас его пишут по старой памяти — поэтому французы на письме ошибаются в окончаниях даже чаще, чем иностранцы.</p>`,
  pins: [{ id: "fr12", t: "je chante: все формы", html: `<table class="tbl"><tbody><tr><td class="fr">je chante</td><td>жё шант</td></tr><tr><td class="fr">tu chantes</td><td>тю шант</td></tr><tr><td class="fr">il / elle / on chante</td><td>иль / эль / он шант</td></tr><tr><td class="fr">nous chantons</td><td>ну шантон</td></tr><tr><td class="fr">vous chantez</td><td>ву шанте</td></tr><tr><td class="fr">ils / elles chantent</td><td>иль / эль шант</td></tr></tbody></table><p>-e, -es, -ent молчат → je, tu, il… говорить обязательно</p>` }],
  tasks: [
    { k: "choice", q: "Как по-французски «я пою»?", opts: ["je chante", "je chantes", "chante"], a: "je chante", why: "с je — окончание -e; je обязательно" },
    { k: "input", lang: "fr", q: "Ты говоришь.", a: ["Tu parles."], why: "tu + -es", hint: "у tu окончание -es" },
    { k: "tiles", lang: "fr", q: "Мы поём.", a: "Nous chantons", d: ["chante", "vous"], why: "nous + -ons" },
    { k: "choice", q: "Какие формы звучат одинаково — «шант»?", opts: ["je chante, tu chantes, il chante, ils chantent", "nous chantons, vous chantez", "все шесть"], a: "je chante, tu chantes, il chante, ils chantent", why: "-e, -es, -ent молчат" },
    { k: "input", lang: "fr", q: "Вы слушаете.", a: ["Vous écoutez."], why: "vous + -ez", hint: "у vous окончание -ez" },
    { k: "fix", lang: "fr", q: "Je écoute.", a: ["J'écoute."], why: "перед гласной je → j'" },
    { k: "listen", say: "Nous parlons.", q: "Что прозвучало?", opts: ["Nous parlons.", "Vous parlez.", "Nous parlez."], a: "Nous parlons.", why: "«ну парлон»: -ons = «он»" },
    { k: "input", lang: "rd", q: "Напиши русскими буквами, как читается ils chantent", a: ["иль шант", "ил шант"], why: "-ent молчит", hint: "окончание -ent не читается" },
    { k: "input", lang: "fr", q: "Она танцует.", a: ["Elle danse."], why: "elle + -e" },
    { k: "choice", q: "Что в разговоре чаще всего значит on chante?", opts: ["мы поём", "он поёт", "пой!"], a: "мы поём", why: "в разговоре французы говорят on вместо nous" },
  ] };
