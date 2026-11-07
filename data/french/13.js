window.FR_C = window.FR_C || {};
FR_C[13] = { n: 13, t: "Не: ne … pas", s: "«не» из двух кусочков вокруг глагола",
  words: [["ne … pas", "не", "нё … па"], ["manger", "есть (кушать)", "манжэ"], ["travailler", "работать", "травайе"], ["habiter", "жить (где-то)", "абитэ"],
    ["fumer", "курить", "фюмэ"], ["la viande", "мясо", "ла вьянд"], ["jamais", "никогда", "жамэ"], ["rien", "ничего", "рьен"]],
  sut: "Русское «не» во французском — <b>два кусочка</b>, которые обнимают глагол: <b>ne</b> перед ним, <b>pas</b> после. {{Je ne fume pas.}} — «я не курю». Перед гласной ne становится <b>n'</b>: {{Je n'habite pas ici.}}",
  rule: `<table class="tbl"><thead><tr><th>да</th><th>нет</th><th>читается</th></tr></thead><tbody>
<tr><td class="fr">Je fume.</td><td class="fr">Je <b>ne</b> fume <b>pas</b>.</td><td>жё нё фюм па</td></tr>
<tr><td class="fr">J'habite ici.</td><td class="fr">Je <b>n'</b>habite <b>pas</b> ici.</td><td>жё набит па иси</td></tr>
<tr><td class="fr">Il est content.</td><td class="fr">Il <b>n'</b>est <b>pas</b> content.</td><td>иль нэ па контан</td></tr></tbody></table>
<p>Вместо pas: <span class="fr">jamais</span> — никогда, <span class="fr">rien</span> — ничего.</p>`,
  prosto: `<p>Чтобы сказать «нет», французы ставят глагол <b>в рамку</b>: ne — глагол — pas. Ne сам по себе почти ничего не значит, а pas буквально — «шаг»: «не делаю ни шагу».</p>
> Je ne fume pas. :: Я не курю. — «жё нё фюм па»
> Tu ne manges pas ? :: Ты не ешь? — «тю нё манж па»
> Il ne travaille pas. :: Он не работает. — «иль нё травай па»
> Je n'habite pas ici. :: Я не живу здесь. — «жё набит па иси»: ne → n' перед гласной
> Elle n'est pas fatiguée. :: Она не устала. — «эль нэ па фатигэ»
> Nous ne mangeons pas de viande. :: Мы не едим мяса. — «ну нё манжон па дё вьянд»
> Je ne fume jamais. :: Я никогда не курю. — «жё нё фюм жамэ»
> Il ne mange rien. :: Он ничего не ест. — «иль нё манж рьен»
@@pin:fr13@@
<h3>В разговоре ne пропадает</h3>
<p>В быстрой речи французы часто «глотают» ne: {{Je fume pas.}} — «жё фюм па». Так говорят с друзьями, но пишут всегда с ne. Главное слово — {{pas}}: если слышишь его после глагола, значит, это «не».</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «никогда» и «ничего» тоже требуют «не»: «я <b>никогда не</b> курю», «он <b>ничего не</b> ест». Во французском так же: ne … jamais, ne … rien.</p>
<p><b>Не как в русском:</b> русское «не» — одно слово перед глаголом, французское — два, вокруг глагола. И после «не» вместо du, de la, des ставят просто {{de}}: «pas <b>de</b> viande».</p>
<h3>Частые ошибки</h3>
<p>• Ставят pas перед глаголом: «Je pas fume» — надо {{Je ne fume pas.}} • Забывают n' перед гласной: «Je ne habite» — надо {{Je n'habite pas.}} • С jamais добавляют ещё и pas: «ne … pas jamais» — надо просто {{ne … jamais}}.</p>`,
  lub: `<p>Почему «не» из двух частей? Давным-давно было только ne. Потом для усиления стали добавлять слова: <i>pas</i> «шаг» — «не пойду ни шагу», <i>point</i> «точка» — «нисколечко». Со временем pas стал обязательным, а ne начал исчезать. Через сто лет, возможно, во французском останется только pas.</p>
<p>Глагол {{manger}} с nous пишется <b>mangeons</b> — с e, чтобы g читалась «ж» (помнишь правило g перед a, o — «г»?).</p>`,
  pins: [{ id: "fr13", t: "ne … pas", html: `<table class="tbl"><tbody><tr><td class="fr">ne + глагол + pas</td><td>не</td></tr><tr><td class="fr">n' + гласная</td><td>Je n'habite pas</td></tr><tr><td class="fr">ne … jamais</td><td>никогда не</td></tr><tr><td class="fr">ne … rien</td><td>ничего не</td></tr><tr><td class="fr">pas de</td><td>pas de viande — без du / des</td></tr></tbody></table>` }],
  tasks: [
    { k: "tiles", lang: "fr", q: "Я не курю.", a: "Je ne fume pas", d: ["jamais", "n'"], why: "ne + глагол + pas" },
    { k: "input", lang: "fr", q: "Он не работает.", a: ["Il ne travaille pas."], why: "ne travaille pas", hint: "ne … pas вокруг глагола" },
    { k: "choice", q: "Je … habite pas ici.", opts: ["ne", "n'", "pas"], a: "n'", why: "перед гласной ne → n'" },
    { k: "fix", lang: "fr", q: "Je pas mange.", a: ["Je ne mange pas."], why: "ne перед глаголом, pas — после" },
    { k: "choice", q: "Что значит Je ne fume jamais ?", opts: ["Я никогда не курю.", "Я не курю сейчас.", "Я ничего не курю."], a: "Я никогда не курю.", why: "ne … jamais — никогда" },
    { k: "input", lang: "fr", q: "Она не устала.", a: ["Elle n'est pas fatiguée."], why: "est — гласная: n'est pas" },
    { k: "listen", say: "Il ne mange rien.", q: "Что прозвучало?", opts: ["Он ничего не ест.", "Он не ест мяса.", "Он никогда не ест."], a: "Он ничего не ест.", why: "ne … rien — ничего" },
    { k: "choice", q: "Мы не едим мяса: Nous ne mangeons pas … viande.", opts: ["de", "de la", "la"], a: "de", why: "после pas — просто de" },
    { k: "choice", q: "В разговоре французы часто пропускают…", opts: ["ne", "pas", "глагол"], a: "ne", why: "Je fume pas — ne «глотают»" },
    { k: "input", lang: "fr", q: "Ты не ешь?", a: ["Tu ne manges pas ?", "Tu ne manges pas"], why: "tu manges → tu ne manges pas" },
  ] };
