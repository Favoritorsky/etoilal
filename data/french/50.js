window.FR_C = window.FR_C || {};
FR_C[50] = { n: 50, t: "Бы: je voudrais", s: "вежливо и мечтательно — форма «бы»",
  words: [["je voudrais", "я хотел бы", "жё вудрэ"], ["j'aimerais", "мне бы хотелось", "жэмрэ"], ["tu devrais", "тебе следовало бы", "тю дёврэ"], ["ce serait", "это было бы", "сё сёрэ"],
    ["à ta place", "на твоём месте", "а та плас"], ["volontiers", "с удовольствием, охотно", "волонтье"], ["le conseil", "совет", "лё консэй"], ["gentil", "добрый, милый", "жанти"]],
  sut: "Форма «бы» — это основа <b>будущего</b> + окончания <b>прошлого «было»</b> (-ais, -ais, -ait, -ions, -iez, -aient): {{je chanterais}} «я спел бы». Самое частое: {{Je voudrais un café.}} — вежливое «я хотел бы кофе».",
  rule: `<table class="tbl"><thead><tr><th>кто</th><th>chanter</th><th>vouloir</th></tr></thead><tbody>
<tr><td>я</td><td class="fr">je chanterais</td><td class="fr">je voudrais</td></tr><tr><td>ты</td><td class="fr">tu chanterais</td><td class="fr">tu voudrais</td></tr>
<tr><td>он</td><td class="fr">il chanterait</td><td class="fr">il voudrait</td></tr><tr><td>мы</td><td class="fr">nous chanterions</td><td class="fr">nous voudrions</td></tr>
<tr><td>вы</td><td class="fr">vous chanteriez</td><td class="fr">vous voudriez</td></tr><tr><td>они</td><td class="fr">ils chanteraient</td><td class="fr">ils voudraient</td></tr></tbody></table>
<p>Основа — как в будущем: <span class="fr">être → ser-ais, avoir → aur-ais, pouvoir → pourr-ais, devoir → devr-ais, faire → fer-ais, aller → ir-ais</span>.</p>`,
  prosto: `<p>Ты знаешь будущее (je chanter<b>ai</b>) и «было» (je chant<b>ais</b>). Соедини их — получится «бы»: {{je chanterais}}. Эта форма нужна, чтобы <b>вежливо просить</b>, <b>советовать</b> и <b>мечтать</b>.</p>
> Je voudrais un café, s'il vous plaît. :: Я хотел бы кофе, пожалуйста. — «жё вудрэ эн кафэ, силь ву плэ»
> J'aimerais voyager. :: Мне бы хотелось путешествовать. — «жэмрэ вуаяжэ»
> Tu pourrais m'aider ? :: Ты не мог бы мне помочь? — «тю пурэ мэдэ»
> Tu devrais dormir. :: Тебе стоило бы поспать. — «тю дёврэ дормир»
> À ta place, je partirais. :: На твоём месте я бы уехал. — «а та плас, жё партирэ»
> Ce serait gentil ! :: Это было бы мило! — «сё сёрэ жанти»
> Volontiers ! :: С удовольствием! — «волонтье»
@@pin:fr50@@
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «я <b>хотел бы</b>», «ты <b>мог бы</b>» — то же вежливое смягчение.</p>
<p><b>Не как в русском:</b> русское «бы» — отдельное слово с прошедшим временем. Во французском — одно слово с особым окончанием: {{je voudrais}}.</p>
<h3>Частые ошибки</h3>
<p>• Путают {{je chanterai}} (спою) и {{je chanterais}} (спел бы) — на письме разница в s, на слух почти нет. • «je voulerais» — основа как в будущем: {{je voudrais}}. • «Je veux un café» в кафе — грубовато; вежливо: {{Je voudrais un café.}}</p>`,
  lub: `<p>Французы называют эту форму <i>conditionnel</i> — «условное». Её часто слышно в новостях: <i>Le président serait malade</i> — «Президент якобы болен» — так журналисты передают неподтверждённые слухи.</p>
<p>{{volontiers}} — изящный ответ на предложение: «Un café ? — Volontiers !» Звучит как «с превеликим удовольствием».</p>`,
  pins: [{ id: "fr50", t: "Бы: je voudrais", html: `<table class="tbl"><tbody><tr><td>основа будущего +</td><td class="fr">-ais -ais -ait -ions -iez -aient</td></tr><tr><td>частые</td><td class="fr">je voudrais · j'aimerais · tu pourrais · tu devrais · ce serait</td></tr><tr><td>не путай</td><td class="fr">je chanterai (спою) / je chanterais (спел бы)</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Я хотел бы кофе. — Je … un café.", opts: ["voudrais", "veux", "voudrai"], a: "voudrais", why: "вежливо — je voudrais" },
    { k: "input", lang: "fr", q: "Ты не мог бы мне помочь?", a: ["Tu pourrais m'aider ?"], why: "pouvoir → pourr- + ais" },
    { k: "tiles", lang: "fr", q: "На твоём месте я бы уехал.", a: "À ta place je partirais", d: ["partirai", "pars"], why: "partir + -ais" },
    { k: "choice", q: "Тебе стоило бы поспать.", opts: ["Tu devrais dormir.", "Tu dois dormir.", "Tu devras dormir."], a: "Tu devrais dormir.", why: "совет — devrais" },
    { k: "fix", lang: "fr", q: "Je voulerais voyager.", a: ["Je voudrais voyager."], why: "основа как в будущем: voudr-" },
    { k: "listen", say: "Ce serait gentil !", q: "Что прозвучало?", opts: ["Это было бы мило!", "Это будет мило!", "Это было мило!"], a: "Это было бы мило!", why: "serait — было бы" },
    { k: "input", lang: "fr", q: "Мне бы хотелось путешествовать.", a: ["J'aimerais voyager."], why: "aimer → aimer-ais" },
    { k: "choice", q: "Какая форма значит «спел бы»?", opts: ["je chanterais", "je chanterai", "je chantais"], a: "je chanterais", why: "будущее + -ais" },
    { k: "choice", q: "Un café ? — … !", opts: ["Volontiers", "Gentil", "Conseil"], a: "Volontiers", why: "volontiers — с удовольствием" },
    { k: "input", lang: "fr", q: "Это было бы мило!", a: ["Ce serait gentil !", "Ce serait gentil"], why: "être → ser- + ait" },
  ] };
