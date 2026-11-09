window.FR_C = window.FR_C || {};
FR_C[37] = { n: 37, t: "Будущее: je chanterai", s: "глагол целиком + окончание",
  words: [["l'avenir", "будущее", "лавнир"], ["un jour", "однажды, когда-нибудь", "эн жур"], ["plus tard", "позже", "плю тар"], ["gagner", "выигрывать; зарабатывать", "ганьэ"],
    ["devenir", "становиться", "дёвнир"], ["le monde", "мир", "лё монд"], ["riche", "богатый", "риш"], ["célèbre", "знаменитый", "сэлэбр"]],
  sut: "Настоящее будущее — <b>глагол целиком + окончание</b>, похожее на avoir: <b>-ai, -as, -a, -ons, -ez, -ont</b>. {{Je chanterai.}} — «я буду петь, спою». Если глагол кончается на -re, e убирают: {{prendre}} → {{je prendrai}}.",
  rule: `<table class="tbl"><thead><tr><th>кто</th><th>chanter</th><th>читается</th></tr></thead><tbody>
<tr><td>я</td><td class="fr">je chanterai</td><td>жё шантрэ</td></tr><tr><td>ты</td><td class="fr">tu chanteras</td><td>тю шантра</td></tr>
<tr><td>он</td><td class="fr">il chantera</td><td>иль шантра</td></tr><tr><td>мы</td><td class="fr">nous chanterons</td><td>ну шантрон</td></tr>
<tr><td>вы</td><td class="fr">vous chanterez</td><td>ву шантрэ</td></tr><tr><td>они</td><td class="fr">ils chanteront</td><td>иль шантрон</td></tr></tbody></table>
<p>Особые основы: <span class="fr">être → ser-, avoir → aur-, aller → ir-, faire → fer-, venir → viendr-, pouvoir → pourr-, vouloir → voudr-, voir → verr-, devoir → devr-</span>.</p>`,
  prosto: `<p>Ты уже знаешь «скоро» — {{je vais chanter}}. Это будущее — более «далёкое» и книжное: планы, обещания, мечты. Окончания легко запомнить: это почти формы {{avoir}} (ai, as, a, avons → ons…).</p>
> Je chanterai pour toi. :: Я спою для тебя. — «жё шантрэ пур туа»
> Un jour, tu seras célèbre. :: Однажды ты станешь знаменитым. — «эн жур тю сёра сэлэбр»
> Tu deviendras riche. :: Ты станешь богатым. — «тю дёвьендра риш»: devenir — как venir
> Il fera beau demain. :: Завтра будет хорошая погода. — «иль фёра бо дёмэн»
> Nous irons à Paris. :: Мы поедем в Париж. — «нузирон а пари»
> Vous aurez le temps ? :: У вас будет время? — «вузорэ лё тан»
> Ils viendront plus tard. :: Они придут позже. — «иль вьендрон плю тар»
> Je prendrai le train. :: Я поеду на поезде. — «жё прандрэ лё трэн»
> Qu'est-ce que tu feras plus tard ? :: Кем ты будешь потом? (что будешь делать) — «кэскё тю фёра плю тар»
@@pin:fr37@@
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «спою» — одно слово, как {{je chanterai}}.</p>
<p><b>Не как в русском:</b> в русском будущее делают через «буду» или приставку. Во французском — окончанием к глаголу <b>целиком</b>. Внутри всегда слышно «р»: chante<b>r</b>ai, fe<b>r</b>a, se<b>r</b>as.</p>
<h3>Частые ошибки</h3>
<p>• «je prendreai» — у -re убирают e: {{je prendrai}}. • «j'allerai» — у aller особая основа: {{j'irai}}. • Путают {{je chanterai}} (спою) и {{je chanterais}} (спел бы) — звучат почти одинаково; разницу узнаешь в уроке 49.</p>`,
  lub: `<p>Это будущее родилось из «я имею петь»: латинское <i>cantare habeo</i> → <i>chanter-ai</i>. Поэтому окончания так похожи на avoir — это он и есть, прилипший к глаголу.</p>
<p>В разговоре французы чаще говорят {{je vais chanter}}, а {{je chanterai}} — в обещаниях, прогнозах погоды, планах на далёкое будущее и в песнях.</p>`,
  pins: [{ id: "fr37", t: "Будущее: je chanterai", html: `<table class="tbl"><tbody><tr><td>глагол целиком +</td><td class="fr">-ai -as -a -ons -ez -ont</td></tr><tr><td>-re</td><td class="fr">prendre → je prendrai</td></tr><tr><td>особые</td><td class="fr">ser- aur- ir- fer- viendr- pourr- voudr- verr- devr-</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Я спою для тебя. — Je … pour toi.", opts: ["chanterai", "chanterais", "vais chanté"], a: "chanterai", why: "chanter + -ai" },
    { k: "input", lang: "fr", q: "Мы поедем в Париж.", a: ["Nous irons à Paris."], why: "aller → ir-: nous irons" },
    { k: "choice", q: "Un jour, tu … célèbre.", opts: ["seras", "es", "auras"], a: "seras", why: "être → ser-: tu seras" },
    { k: "fix", lang: "fr", q: "Je prendreai le train.", a: ["Je prendrai le train."], why: "у -re убирают e" },
    { k: "tiles", lang: "fr", q: "Они придут позже.", a: "Ils viendront plus tard", d: ["venront", "vont"], why: "venir → viendr-" },
    { k: "input", lang: "fr", q: "Завтра будет хорошая погода.", a: ["Il fera beau demain.", "Demain, il fera beau."], why: "faire → fer-: il fera" },
    { k: "listen", say: "Vous aurez le temps ?", q: "Что прозвучало?", opts: ["У вас будет время?", "У вас есть время?", "У вас было время?"], a: "У вас будет время?", why: "avoir → aur-: vous aurez" },
    { k: "choice", q: "Какую букву всегда слышно в будущем?", opts: ["р", "з", "с"], a: "р", why: "chanteRai, feRa, seRas" },
    { k: "input", lang: "fr", q: "Я поеду на поезде. (будущее одним словом)", a: ["Je prendrai le train."], why: "prendre → prendr-" },
    { k: "choice", q: "Ты станешь богатым: Tu … riche.", opts: ["deviendras", "deveniras", "devenis"], a: "deviendras", why: "devenir — как venir: deviendr-" },
  ] };
