window.ET_C2 = window.ET_C2 || {};
ET_C2[10] = { n: 10, sec: 1, t: "Не и вопросы", s: "pa после глагола; esqe; кто, что, где",
  words: [["saver", "знать"], ["chercher", "искать"], ["jouer", "играть"], ["vouler", "хотеть"], ["eqouter", "слушать"], ["salu", "привет"], ["orevoir", "до свидания"]],
  gram: ["pa", "esqe", "qi", "qoi", "ou"],
  sut: "«Не» = <b>pa</b>, и оно стоит <b>после</b> глагола: Je savem pa — я не знаю. Вопрос — голосом или <b>esqe</b> в начале. Кто — qi, что — qoi, где — ou.",
  rule: `<p><span class="et">Je savem pa.</span> — я не знаю (pa после глагола)</p><p><span class="et">Esqe tu emes le qafe?</span> — ты любишь кофе?</p><p><span class="et">qi</span> кто · <span class="et">qoi</span> что · <span class="et">ou</span> где</p>`,
  prosto: `<p>По-русски «не» стоит <b>перед</b> глаголом: «я не знаю». В Etoilal — <b>после</b>: сначала действие, потом «нет». Дословно «я знаю не».</p>
> Je savem. :: Я знаю.
> Je savem pa. :: Я не знаю.
> Il emet pa le te. :: Он не любит чай.
> Lez anfan dormel pa. :: Дети не спят.
<h3>Вопрос «да или нет»</h3>
<p>Два способа — оба правильные, порядок слов <b>не меняется</b>:</p>
> Tu emes le qafe? :: Ты любишь кофе? — голос вверх в конце
> Esqe tu emes le qafe? :: Ты любишь кофе? — с esqe в начале
<p>Ответ: [[oui]] или [[non]]: [[Non, j'emem pa le qafe.]] — «Нет, я не люблю кофе».</p>
<h3>Кто, что, где</h3>
<p>Вопросительное слово — в начало, дальше обычный порядок:</p>
> Qi chantet? :: Кто поёт?
> Qoi tu cherches? :: Что ты ищешь?
> Ou el eset? :: Где она?
> Ou tu travayes? :: Где ты работаешь?
<h3>Привет и пока</h3>
<p>[[salu]] — «привет» (по-дружески), [[orevoir]] — «до свидания». Ещё ты знаешь [[bonjour]] и [[mersi]] из урока 4.</p>
> Salu! Ou tu eses? :: Привет! Где ты?
<h3>Частые ошибки</h3>
<p>• Ставить pa перед глаголом, как русское «не»: «Je pa savem» → [[Je savem pa.]] • Переставлять слова в вопросе: «Emes tu le qafe?» — так тоже можно, но это высокий стиль; обычно — [[Esqe tu emes le qafe?]]</p>`,
  lub: `<p>Во французском отрицание двойное — <i>je ne sais pas</i>, но в разговоре <i>ne</i> выпадает: <i>je sais pas</i>. Etoilal взял именно разговорный вариант. <b>esqe</b> — это французское <i>est-ce que</i> («так ли, что…»), записанное как слышится.</p>`,
  tasks: [
    {"k": "input", "q": "Я не танцую.", "a": ["Je dansem pa."], "why": "pa — после глагола"},
    {"k": "fix", "q": "Il pa chantet.", "a": ["Il chantet pa."], "why": "pa — после глагола"},
    { k: "choice", q: "«Он не любит чай»", opts: ["Il pa emet le te.", "Il emet pa le te.", "Pa il emet le te."], a: "Il emet pa le te.", why: "pa сразу после глагола" },
    {"k": "input", "q": "Ты любишь чай? (с esqe)", "a": ["Esqe tu emes le te?"], "why": "esqe в начале, порядок не меняется"},
    {"k": "input", "q": "Кто танцует?", "a": ["Qi danset?"], "why": "qi + глагол на t"},
    {"k": "input", "q": "Где ты спишь?", "a": ["Ou tu dormes?"], "why": "ou — где, в начало"},
    {"k": "tiles", "q": "Что ты слушаешь?", "a": "Qoi tu eqoutes", "d": ["qi", "pa"], "why": "qoi — что"},
    {"k": "input", "q": "Кошки не спят.", "a": ["Lez cha dormel pa."], "why": "dormel + pa"},
    { k: "choice", q: "Как ответить «Нет, я не хочу»?", opts: ["Non, je voulem pa.", "Non, je pa voulem.", "Pa, je voulem non."], a: "Non, je voulem pa.", why: "non — нет; pa после глагола" },
    { k: "listen", say: "Esqe tu eqoutes?", q: "Послушай и напиши", a: ["Esqe tu eqoutes?"], why: "«Ты слушаешь?»" },
  ] };
