window.FR_C = window.FR_C || {};
FR_C[15] = { n: 15, t: "Иметь: j'ai + числа 0–10", s: "у меня есть = я имею; сколько тебе лет = сколько ты имеешь лет",
  words: [["avoir", "иметь", "авуар"], ["le frère", "брат", "лё фрэр"], ["la sœur", "сестра", "ла сёр"], ["l'an", "год (возраст)", "лан"],
    ["trois", "три", "труа"], ["quatre", "четыре", "катр"], ["cinq", "пять", "сэнк"], ["dix", "десять", "дис"]],
  sut: "Русское «у меня есть» французы говорят «я имею» — глаголом {{avoir}}: {{J'ai un frère.}} — «у меня есть брат». И возраст тоже «имеют»: {{J'ai dix ans.}} — «мне десять лет» (буквально «я имею десять лет»).",
  rule: `<table class="tbl"><thead><tr><th>кто</th><th>иметь</th><th>читается</th></tr></thead><tbody>
<tr><td>я</td><td class="fr">j'ai</td><td>жэ</td></tr><tr><td>ты</td><td class="fr">tu as</td><td>тю а</td></tr>
<tr><td>он / она</td><td class="fr">il / elle a</td><td>иль а / эль а</td></tr><tr><td>мы</td><td class="fr">nous avons</td><td>нузавон</td></tr>
<tr><td>вы</td><td class="fr">vous avez</td><td>вузавэ</td></tr><tr><td>они</td><td class="fr">ils / elles ont</td><td>ильзон / эльзон</td></tr></tbody></table>
<p>0–10: <span class="fr">zéro, un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix</span> — «зэро, эн, дё, труа, катр, сэнк, сис, сэт, юит, нёф, дис».</p>`,
  prosto: `<p>Глагол {{avoir}} — второй главный глагол после «быть». Он тоже неправильный, его формы надо запомнить.</p>
> J'ai un frère. :: У меня есть брат. — «жэ эн фрэр»
> Tu as une sœur ? :: У тебя есть сестра? — «тю а юн сёр»
> Il a un chat. :: У него есть кот. — «иль а эн ша»
> Nous avons deux enfants. :: У нас двое детей. — «нузавон дёзанфан»
> Vous avez trois livres. :: У вас три книги. — «вузавэ труа ливр»
> Elles ont quatre pommes. :: У них четыре яблока. — «эльзон катр пом»
> J'ai dix ans. :: Мне десять лет. — «жэ дизан»
> Je n'ai pas de frère. :: У меня нет брата. — «жё нэ па дё фрэр»
@@pin:fr15@@
<h3>Числа 0–10</h3>
> zéro, un, deux, trois :: 0, 1, 2, 3 — «зэро, эн, дё, труа»
> quatre, cinq, six, sept :: 4, 5, 6, 7 — «катр, сэнк, сис, сэт»
> huit, neuf, dix :: 8, 9, 10 — «юит, нёф, дис»
<p>Перед словом на согласную конечная буква у cinq, six, huit, dix часто молчит: <i>six livres</i> — «си ливр». А перед гласной просыпается: {{six ans}} — «сизан».</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> в старом русском тоже говорили «я имею брата».</p>
<p><b>Не как в русском:</b> «у меня есть» — всегда {{j'ai}}, а возраст — не «мне лет», а «я имею лет»: {{J'ai dix ans.}} Сказать «Je suis dix ans» — ошибка.</p>
<h3>Частые ошибки</h3>
<p>• Возраст через être: «Je suis dix ans» — надо {{J'ai dix ans.}} • Пишут «je ai» — надо {{j'ai}}. • Путают {{ils ont}} «ильзон» (у них есть) и {{ils sont}} «иль сон» (они есть) — слушай «з»!</p>`,
  lub: `<p>Французский счёт до 10 похож на латинский: <i>unus, duo, tres, quattuor, quinque</i>. Отсюда и русские слова: «дуэт» (два), «трио» (три), «квартет» (четыре).</p>
<p>{{ils ont}} и {{ils sont}} отличаются только звуком «з» против «с»: «ильзон» — у них есть, «ильсон» — они есть. Французы различают их на слух легко, а нам нужно тренироваться.</p>`,
  pins: [{ id: "fr15", t: "avoir и числа 0–10", html: `<table class="tbl"><tbody><tr><td class="fr">j'ai · tu as · il a</td><td>жэ · тю а · иль а</td></tr><tr><td class="fr">nous avons · vous avez · ils ont</td><td>нузавон · вузавэ · ильзон</td></tr><tr><td class="fr">J'ai dix ans.</td><td>Мне 10 лет.</td></tr><tr><td>0–10</td><td class="fr">zéro un deux trois quatre cinq six sept huit neuf dix</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "У меня есть брат. — J'… un frère.", opts: ["ai", "as", "a"], a: "ai", why: "j'ai — я имею" },
    { k: "input", lang: "fr", q: "Мне десять лет.", a: ["J'ai dix ans."], why: "возраст — через avoir", hint: "«я имею десять лет»" },
    { k: "tiles", lang: "fr", q: "У тебя есть сестра?", a: "Tu as une sœur", d: ["es", "un"], why: "tu as; sœur — «она»: une" },
    { k: "choice", q: "Как будет «пять»?", opts: ["quatre", "cinq", "six"], a: "cinq", why: "cinq — «сэнк»" },
    { k: "fix", lang: "fr", q: "Je suis dix ans.", a: ["J'ai dix ans."], why: "возраст «имеют», а не «есть»" },
    { k: "choice", q: "Как читается ils ont?", opts: ["иль сон", "ильзон", "иль онт"], a: "ильзон", why: "связка: s — «з»; t молчит" },
    { k: "listen", say: "Nous avons deux enfants.", q: "Что прозвучало?", opts: ["У нас двое детей.", "У нас два кота.", "Мы двое детей."], a: "У нас двое детей.", why: "nous avons — у нас есть" },
    { k: "input", lang: "fr", q: "У меня нет брата.", a: ["Je n'ai pas de frère."], why: "ne … pas, после pas — de", hint: "n'ai pas de" },
    { k: "choice", q: "Как будет «десять»?", opts: ["dix", "deux", "huit"], a: "dix", why: "dix — «дис»" },
    { k: "input", lang: "fr", q: "У него есть кот.", a: ["Il a un chat."], why: "il a — у него есть" },
  ] };
