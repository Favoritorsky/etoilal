window.FR_C = window.FR_C || {};
FR_C[52] = { n: 52, t: "Чтобы: il faut que", s: "особая форма после «надо, чтобы», «хочу, чтобы»",
  words: [["il faut que", "надо, чтобы", "иль фо кё"], ["je veux que", "я хочу, чтобы", "жё вё кё"], ["pour que", "чтобы (для того чтобы)", "пур кё"], ["je suis content que", "я рад, что", "жё сюи контан кё"],
    ["sage", "послушный; мудрый", "саж"], ["la vie", "жизнь", "ла ви"], ["savoir", "знать (что-то)", "савуар"]],
  sut: "После «надо, чтобы», «хочу, чтобы», «чтобы», «рад, что» французы ставят <b>особую форму</b> глагола. Возьми «они» ({{ils partent}}), убери -ent и добавь <b>-e, -es, -e, -ions, -iez, -ent</b>: {{Il faut que je parte.}} — «Мне надо уйти» («надо, чтобы я ушёл»).",
  rule: `<table class="tbl"><thead><tr><th>кто</th><th>partir</th><th>être</th><th>avoir</th></tr></thead><tbody>
<tr><td>que je</td><td class="fr">parte</td><td class="fr">sois</td><td class="fr">aie</td></tr><tr><td>que tu</td><td class="fr">partes</td><td class="fr">sois</td><td class="fr">aies</td></tr>
<tr><td>qu'il</td><td class="fr">parte</td><td class="fr">soit</td><td class="fr">ait</td></tr><tr><td>que nous</td><td class="fr">partions</td><td class="fr">soyons</td><td class="fr">ayons</td></tr>
<tr><td>que vous</td><td class="fr">partiez</td><td class="fr">soyez</td><td class="fr">ayez</td></tr><tr><td>qu'ils</td><td class="fr">partent</td><td class="fr">soient</td><td class="fr">aient</td></tr></tbody></table>
<p>Ещё особые: <span class="fr">faire → que je fasse, aller → que j'aille, pouvoir → que je puisse, savoir → que je sache</span>.</p>`,
  prosto: `<p>Французы называют эту форму <i>subjonctif</i> — «форма желания». Её ставят, когда речь не о факте, а о том, чего <b>хотят, требуют или чувствуют</b>. У глаголов на -er она часто звучит так же, как обычная: {{que je chante}} = «жё шант».</p>
> Il faut que je parte. :: Мне надо уйти. — «иль фо кё жё парт»
> Il faut que tu sois sage. :: Тебе надо быть послушным. — «иль фо кё тю суа саж»
> Je veux que tu viennes. :: Я хочу, чтобы ты пришёл. — «жё вё кё тю вьен»
> Je parle lentement pour que tu comprennes. :: Я говорю медленно, чтобы ты понял. — «жё парль лантман пур кё тю компрэн»
> Je suis content que vous soyez là. :: Я рад, что вы здесь. — «жё сюи контан кё ву суайе ла»
> Il faut que nous fassions les courses. :: Нам надо сходить за покупками. — «иль фо кё ну фасьон ле курс»
> Je veux que tu saches la vérité. :: Я хочу, чтобы ты знал правду. — «жё вё кё тю саш ла вэритэ»
@@pin:fr52@@
<h3>Когда нужна эта форма</h3>
<p>После: {{il faut que}} (надо), {{je veux que}} (хочу, чтобы), {{pour que}} (чтобы), {{je suis content que}} (рад, что), <i>avant que</i> (прежде чем), <i>bien que</i> (хотя). Если «кто» в обеих частях один — проще сказать глаголом целиком: {{Je veux partir.}}, а не «je veux que je parte».</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «хочу, <b>чтобы</b> ты пришё<b>л</b>» — у нас после «чтобы» тоже особая форма (прошедшая).</p>
<p><b>Не как в русском:</b> русское «чтобы» требует прошедшего времени, французское {{que}} — особой формы на -e. «Мне надо уйти» французы говорят «надо, чтобы я ушёл» — {{Il faut que je parte.}}</p>
<h3>Частые ошибки</h3>
<p>• «Il faut que je pars» — нужна особая форма: {{que je parte}}. • «Je veux que tu viens» — {{que tu viennes}}. • «Je veux que je parte» — один «кто»: {{Je veux partir.}}</p>`,
  lub: `<p>В разговоре эту форму используют постоянно — с {{il faut que}} особенно. Но многие французы ошибаются в ней, и это считается признаком «простой» речи. Если ты говоришь {{il faut que je sois}} правильно — звучишь образованно.</p>
<p>{{Que la force soit avec toi}} — «Да пребудет с тобой Сила» из «Звёздных войн» по-французски. Тут та же форма: soit.</p>`,
  pins: [{ id: "fr52", t: "Чтобы: il faut que", html: `<table class="tbl"><tbody><tr><td>основа</td><td>от «они» без -ent: <span class="fr">ils part|ent</span></td></tr><tr><td>окончания</td><td class="fr">-e -es -e -ions -iez -ent</td></tr><tr><td>особые</td><td class="fr">sois, aie, fasse, aille, puisse, sache</td></tr><tr><td>после</td><td class="fr">il faut que · je veux que · pour que · content que</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Мне надо уйти. — Il faut que je …", opts: ["parte", "pars", "partirai"], a: "parte", why: "после il faut que — особая форма" },
    { k: "input", lang: "fr", q: "Я хочу, чтобы ты пришёл.", a: ["Je veux que tu viennes."], why: "venir → que tu viennes" },
    { k: "choice", q: "Il faut que tu … sage.", opts: ["sois", "es", "seras"], a: "sois", why: "être → que tu sois" },
    { k: "fix", lang: "fr", q: "Il faut que je pars.", a: ["Il faut que je parte."], why: "особая форма: parte" },
    { k: "tiles", lang: "fr", q: "Я рад, что вы здесь.", a: "Je suis content que vous soyez là", d: ["êtes", "sommes"], why: "content que + soyez" },
    { k: "listen", say: "Je parle lentement pour que tu comprennes.", q: "Что прозвучало?", opts: ["Я говорю медленно, чтобы ты понял.", "Я говорю медленно, потому что ты не понимаешь.", "Говори медленно, чтобы я понял."], a: "Я говорю медленно, чтобы ты понял.", why: "pour que — чтобы" },
    { k: "choice", q: "Я хочу уйти. (один «кто»)", opts: ["Je veux partir.", "Je veux que je parte.", "Je veux que partir."], a: "Je veux partir.", why: "один «кто» — глагол целиком" },
    { k: "input", lang: "fr", q: "Нам надо сходить за покупками.", a: ["Il faut que nous fassions les courses."], why: "faire → que nous fassions" },
    { k: "choice", q: "Je veux que tu … la vérité.", opts: ["saches", "sais", "sauras"], a: "saches", why: "savoir → que tu saches" },
    { k: "choice", q: "После какого выражения нужна особая форма?", opts: ["il faut que", "je pense que", "parce que"], a: "il faut que", why: "надо, чтобы — особая форма" },
  ] };
