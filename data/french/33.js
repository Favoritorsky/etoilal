window.FR_C = window.FR_C || {};
FR_C[33] = { n: 33, t: "Прошлое неправильных: j'ai fait, j'ai vu", s: "fait, vu, pris, eu, été, dit, lu, écrit, bu, mis",
  words: [["voir", "видеть", "вуар"], ["dire", "сказать, говорить", "дир"], ["écrire", "писать", "экрир"], ["lire", "читать", "лир"],
    ["mettre", "класть; надевать", "мэтр"], ["la lettre", "письмо", "ла лэтр"], ["le journal", "газета", "лё журналь"], ["la vérité", "правда", "ла вэритэ"]],
  sut: "У самых частых глаголов прошлая форма <b>особая</b> — её запоминают: {{faire}} → {{fait}}, {{voir}} → {{vu}}, {{prendre}} → {{pris}}, {{avoir}} → {{eu}}, {{être}} → {{été}}, {{dire}} → {{dit}}. Всё остальное — как в прошлом уроке: {{J'ai vu un film.}}",
  rule: `<table class="tbl"><thead><tr><th>глагол</th><th>прошлая форма</th><th>пример</th></tr></thead><tbody>
<tr><td class="fr">faire</td><td class="fr">fait «фэ»</td><td class="fr">j'ai fait</td></tr><tr><td class="fr">voir</td><td class="fr">vu «вю»</td><td class="fr">j'ai vu</td></tr>
<tr><td class="fr">prendre</td><td class="fr">pris «при»</td><td class="fr">j'ai pris</td></tr><tr><td class="fr">avoir</td><td class="fr">eu «ю»</td><td class="fr">j'ai eu</td></tr>
<tr><td class="fr">être</td><td class="fr">été «этэ»</td><td class="fr">j'ai été</td></tr><tr><td class="fr">dire</td><td class="fr">dit «ди»</td><td class="fr">j'ai dit</td></tr>
<tr><td class="fr">écrire · lire</td><td class="fr">écrit · lu</td><td class="fr">j'ai écrit, j'ai lu</td></tr>
<tr><td class="fr">boire · mettre</td><td class="fr">bu · mis</td><td class="fr">j'ai bu, j'ai mis</td></tr>
<tr><td class="fr">vouloir · pouvoir · devoir</td><td class="fr">voulu · pu · dû</td><td class="fr">j'ai pu</td></tr></tbody></table>`,
  prosto: `<p>Как в русском «идти — шёл», у частых французских глаголов прошлая форма не по правилу. Хорошая новость: avoir остаётся тем же, меняется только второе слово.</p>
> Qu'est-ce que tu as fait hier ? :: Что ты делал вчера? — «кэскё тю а фэ йер»
> J'ai vu un film. :: Я посмотрел фильм. — «жэ вю эн фильм»
> Il a pris le train. :: Он поехал на поезде. — «иль а при лё трэн»
> Nous avons eu de la chance. :: Нам повезло. — «нузавонзю дё ла шанс»: буквально «мы имели удачу»
> Elle a dit la vérité. :: Она сказала правду. — «эль а ди ла вэритэ»
> J'ai écrit une lettre. :: Я написал письмо. — «жэ экри юн лэтр»
> Tu as lu le journal ? :: Ты читал газету? — «тю а лю лё журналь»
> Ils ont bu du thé. :: Они выпили чаю. — «ильзон бю дю тэ»
> J'ai été malade. :: Я болел. — «жэ этэ малад»
@@pin:fr33@@
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> у частых глаголов — особые формы, их просто запоминают (идти — шёл, есть — ел).</p>
<p><b>Не как в русском:</b> «я был» — тоже через avoir: {{j'ai été}} «я имел бытым». Звучит странно, но так говорят все.</p>
<h3>Частые ошибки</h3>
<p>• «j'ai voiré», «j'ai prendu» — надо {{vu}}, {{pris}}. • «j'ai faisé» — надо {{fait}}. • Читают {{eu}} «эу» — правильно «ю»: {{j'ai eu}} «жэ ю».</p>`,
  lub: `<p>Почти все такие формы — из латыни: <i>factum</i> → fait (отсюда «факт» — «сделанное»), <i>scriptum</i> → écrit (отсюда «скрипт» — «написанное»), <i>dictum</i> → dit («диктант» — «сказанное»).</p>
<p>Как запомнить: сгруппируй по звуку конца. На «-и»: dit, pris, mis, écrit. На «-ю»: vu, lu, bu, eu, pu, voulu. Отдельно: fait, été.</p>`,
  pins: [{ id: "fr33", t: "Особые прошлые формы", html: `<table class="tbl"><tbody><tr><td>на «-и»</td><td class="fr">dit, pris, mis, écrit</td></tr><tr><td>на «-ю»</td><td class="fr">vu, lu, bu, eu, pu, voulu</td></tr><tr><td>особые</td><td class="fr">fait (faire), été (être), dû (devoir)</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Я посмотрел фильм. — J'ai … un film.", opts: ["vu", "voiré", "vois"], a: "vu", why: "voir → vu" },
    { k: "input", lang: "fr", q: "Что ты делал вчера?", a: ["Qu'est-ce que tu as fait hier ?"], why: "faire → fait" },
    { k: "choice", q: "Il a … le train.", opts: ["pris", "prendu", "prené"], a: "pris", why: "prendre → pris" },
    { k: "tiles", lang: "fr", q: "Она сказала правду.", a: "Elle a dit la vérité", d: ["disé", "est"], why: "dire → dit" },
    { k: "fix", lang: "fr", q: "J'ai faisé les courses.", a: ["J'ai fait les courses."], why: "faire → fait" },
    { k: "input", lang: "fr", q: "Я написал письмо.", a: ["J'ai écrit une lettre."], why: "écrire → écrit" },
    { k: "listen", say: "Nous avons eu de la chance.", q: "Что прозвучало?", opts: ["Нам повезло.", "Нам не повезло.", "У нас есть шанс."], a: "Нам повезло.", why: "avoir de la chance — повезти; eu — прошлое" },
    { k: "choice", q: "Я болел. — J'ai … malade.", opts: ["été", "eu", "suis"], a: "été", why: "être → été" },
    { k: "input", lang: "fr", q: "Ты читал газету?", a: ["Tu as lu le journal ?"], why: "lire → lu" },
    { k: "choice", q: "Как читается j'ai eu?", opts: ["жэ эу", "жэ ю", "жэ ё"], a: "жэ ю", why: "eu — «ю»" },
  ] };
