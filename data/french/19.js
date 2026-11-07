window.FR_C = window.FR_C || {};
FR_C[19] = { n: 19, t: "Идти: je vais à…", s: "aller + à la, au, aux",
  words: [["aller", "идти, ехать", "алэ"], ["la plage", "пляж", "ла плаж"], ["le parc", "парк", "лё парк"], ["le marché", "рынок", "лё маршэ"],
    ["la ville", "город", "ла виль"], ["la boulangerie", "булочная", "ла буланжри"], ["le musée", "музей", "лё мюзэ"], ["chez", "к (кому-то) домой, у", "шэ"]],
  sut: "{{aller}} — «идти» и «ехать» сразу. Он неправильный: je vais, tu vas, il va, nous allons, vous allez, ils vont. «Куда» — через <b>à</b>, но <b>à + le</b> сливается в <b>au</b>, а <b>à + les</b> — в <b>aux</b>: {{Je vais au parc.}}",
  rule: `<table class="tbl"><thead><tr><th>кто</th><th>идти</th><th>читается</th></tr></thead><tbody>
<tr><td>я · ты · он</td><td class="fr">je vais · tu vas · il va</td><td>жё вэ · тю ва · иль ва</td></tr>
<tr><td>мы · вы · они</td><td class="fr">nous allons · vous allez · ils vont</td><td>нузалон · вузалэ · иль вон</td></tr></tbody></table>
<table class="tbl"><tbody><tr><td class="fr">à + la</td><td class="fr">à la plage</td></tr><tr><td class="fr">à + l'</td><td class="fr">à l'école</td></tr>
<tr><td class="fr">à + le = au</td><td class="fr">au parc «о парк»</td></tr><tr><td class="fr">à + les = aux</td><td class="fr">aux musées «о мюзэ»</td></tr></tbody></table>`,
  prosto: `<p>Во французском нет разницы между «идти» и «ехать» — всё это {{aller}}. Куда идёшь — говорят через {{à}} «в, на, к».</p>
> Je vais à la plage. :: Я иду на пляж. — «жё вэ а ла плаж»
> Tu vas à l'école ? :: Ты идёшь в школу? — «тю ва а лэколь»
> Il va au parc. :: Он идёт в парк. — «иль ва о парк»: à + le = au
> Nous allons au marché. :: Мы идём на рынок. — «нузалон о маршэ»
> Vous allez en ville ? :: Вы едете в город? — «вузалэ ан виль»
> Ils vont à la boulangerie. :: Они идут в булочную. — «иль вон а ла буланжри»
> Je vais chez ma sœur. :: Я иду к сестре. — «жё вэ шэ ма сёр»: к человеку — chez
> Comment ça va ? :: Как дела? — «коман са ва»: это тот же глагол — «как оно идёт?»
@@pin:fr19@@
<h3>К человеку — chez</h3>
<p>Если идёшь не в место, а <b>к человеку</b> (к нему домой), говорят {{chez}}: {{chez moi}} — «ко мне домой / у меня дома», {{chez ma sœur}} — «к сестре».</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «в» и «на» (в школу, на пляж) — у французов тоже маленькое слово перед местом.</p>
<p><b>Не как в русском:</b> «в» и «на» — одно слово {{à}}. «Идти» и «ехать» — одно слово {{aller}}. Зато à и le <b>сливаются</b>: не «à le parc», а {{au parc}}.</p>
<h3>Частые ошибки</h3>
<p>• «à le parc» — надо {{au parc}}. • «à les musées» — надо {{aux musées}}. • Путают {{vont}} «вон» (идут) и {{sont}} «сон» (есть). • «Je vais à ma sœur» — к человеку надо {{chez}}.</p>`,
  lub: `<p>Формы aller собраны из трёх разных латинских глаголов: <i>vadere</i> (vais, vas, va, vont), <i>ambulare</i> «гулять» (allons, allez) и <i>ire</i> (будущее: j'irai). Поэтому он такой «лоскутный».</p>
<p>Слово {{chez}} произошло от латинского <i>casa</i> «дом». Отсюда и испанское <i>casa</i>, и «казарма».</p>`,
  pins: [{ id: "fr19", t: "aller и au / aux", html: `<table class="tbl"><tbody><tr><td class="fr">je vais · tu vas · il va</td><td>жё вэ · тю ва · иль ва</td></tr><tr><td class="fr">nous allons · vous allez · ils vont</td><td>нузалон · вузалэ · иль вон</td></tr><tr><td class="fr">à + le = au · à + les = aux</td><td>au parc, aux musées</td></tr><tr><td class="fr">chez</td><td>к человеку: chez moi</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Я иду на пляж. — Je … à la plage.", opts: ["vais", "va", "vas"], a: "vais", why: "je vais" },
    { k: "choice", q: "Il va … parc.", opts: ["à le", "au", "aux"], a: "au", why: "à + le = au" },
    { k: "input", lang: "fr", q: "Мы идём на рынок.", a: ["Nous allons au marché."], why: "nous allons + au", hint: "marché — «он»: au" },
    { k: "tiles", lang: "fr", q: "Ты идёшь в школу?", a: "Tu vas à l'école", d: ["au", "va"], why: "école — гласная: à l'" },
    { k: "fix", lang: "fr", q: "Ils vont à le musée.", a: ["Ils vont au musée."], why: "à + le = au" },
    { k: "choice", q: "Я иду к сестре.", opts: ["Je vais chez ma sœur.", "Je vais à ma sœur.", "Je vais au ma sœur."], a: "Je vais chez ma sœur.", why: "к человеку — chez" },
    { k: "listen", say: "Ils vont à la boulangerie.", q: "Что прозвучало?", opts: ["Они идут в булочную.", "Они в булочной.", "Мы идём в булочную."], a: "Они идут в булочную.", why: "ils vont — они идут" },
    { k: "input", lang: "fr", q: "Вы едете в город?", a: ["Vous allez en ville ?", "Vous allez en ville"], why: "vous allez; «в город» — en ville" },
    { k: "choice", q: "Как читается vous allez?", opts: ["ву алэ", "вузалэ", "вузалез"], a: "вузалэ", why: "связка: s — «з»; z молчит" },
    { k: "input", lang: "fr", q: "Он идёт в парк.", a: ["Il va au parc."], why: "il va au…" },
  ] };
