window.ET_C2 = window.ET_C2 || {};
ET_C2[10] = { n: 10, sec: 1, t: "Не и вопросы", s: "pa после глагола; eske; кто, что, где",
  words: [["saver", "знать"], ["chercher", "искать"], ["jouer", "играть"], ["vouler", "хотеть"], ["ekouter", "слушать"], ["salu", "привет"], ["orevoir", "до свидания"]],
  gram: ["pa", "eske", "ki", "koi", "ou"],
  sut: "«Не» = <b>pa</b>, и оно стоит <b>после</b> глагола: Je savem pa — я не знаю. Вопрос — голосом или <b>eske</b> в начале. Кто — ki, что — koi, где — ou.",
  rule: `<p><span class="et">Je savem pa.</span> — я не знаю (pa после глагола)</p><p><span class="et">Eske tu emes le kafe?</span> — ты любишь кофе?</p><p><span class="et">ki</span> кто · <span class="et">koi</span> что · <span class="et">ou</span> где</p>`,
  prosto: `<p>По-русски «не» стоит <b>перед</b> глаголом: «я не знаю». В Etoilal — <b>после</b>: сначала действие, потом «нет». Дословно «я знаю не».</p>
> Je savem. :: Я знаю.
> Je savem pa. :: Я не знаю.
> Il emet pa le te. :: Он не любит чай.
> Lez anfan dormel pa. :: Дети не спят.
<h3>Вопрос «да или нет»</h3>
<p>Два способа — оба правильные, порядок слов <b>не меняется</b>:</p>
> Tu emes le kafe? :: Ты любишь кофе? — голос вверх в конце
> Eske tu emes le kafe? :: Ты любишь кофе? — с eske в начале
<p>Ответ: [[oui]] или [[non]]: [[Non, j'emem pa le kafe.]] — «Нет, я не люблю кофе».</p>
<h3>Кто, что, где</h3>
<p>Вопросительное слово — в начало, дальше обычный порядок:</p>
> Ki chantet? :: Кто поёт?
> Koi tu cherches? :: Что ты ищешь?
> Ou el eset? :: Где она?
> Ou tu travayes? :: Где ты работаешь?
<h3>Привет и пока</h3>
<p>[[salu]] — «привет» (по-дружески), [[orevoir]] — «до свидания». Ещё ты знаешь [[bonjour]] и [[mersi]] из урока 4.</p>
> Salu! Ou tu eses? :: Привет! Где ты?
<h3>Частые ошибки</h3>
<p>• Ставить pa перед глаголом, как русское «не»: «Je pa savem» → [[Je savem pa.]] • Переставлять слова в вопросе: «Emes tu le kafe?» — так тоже можно, но это высокий стиль; обычно — [[Eske tu emes le kafe?]]</p>`,
  lub: `<p>Во французском отрицание двойное — <i>je ne sais pas</i>, но в разговоре <i>ne</i> выпадает: <i>je sais pas</i>. Etoilal взял именно разговорный вариант. <b>eske</b> — это французское <i>est-ce que</i> («так ли, что…»), записанное как слышится.</p>`,
  tasks: [
    { k: "input", q: "Я не знаю.", a: ["Je savem pa."], why: "pa — после глагола" },
    { k: "fix", q: "Je pa savem.", a: ["Je savem pa."], why: "pa — после глагола" },
    { k: "choice", q: "«Он не любит чай»", opts: ["Il pa emet le te.", "Il emet pa le te.", "Pa il emet le te."], a: "Il emet pa le te.", why: "pa сразу после глагола" },
    { k: "input", q: "Ты любишь кофе? (с eske)", a: ["Eske tu emes le kafe?"], why: "eske в начале, порядок не меняется" },
    { k: "input", q: "Кто поёт?", a: ["Ki chantet?"], why: "ki + глагол на t" },
    { k: "input", q: "Где ты работаешь?", a: ["Ou tu travayes?"], why: "ou — где, в начало" },
    { k: "tiles", q: "Что ты ищешь?", a: "Koi tu cherches", d: ["ki", "pa"], why: "koi — что" },
    { k: "input", q: "Дети не спят.", a: ["Lez anfan dormel pa."], why: "dormel + pa" },
    { k: "choice", q: "Как ответить «Нет, я не хочу»?", opts: ["Non, je voulem pa.", "Non, je pa voulem.", "Pa, je voulem non."], a: "Non, je voulem pa.", why: "non — нет; pa после глагола" },
    { k: "listen", say: "Eske tu ekoutes?", q: "Послушай и напиши", a: ["Eske tu ekoutes?"], why: "«Ты слушаешь?»" },
  ] };
