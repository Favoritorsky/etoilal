window.ET_C2 = window.ET_C2 || {};
ET_C2[22] = { n: 22, sec: 3, t: "Цепочка: Je lo tey donem", s: "кто → кого → кому → глагол",
  words: [["mesaj", "сообщение"], ["istoir", "история"], ["kado", "подарок"], ["voizen", "сосед"], ["dokteur", "врач"]],
  gram: [],
  sut: "Если в фразе есть и «кого», и «кому», порядок всегда один: <b>кто → кого → кому → глагол</b>: Je lo tey donem — я тебе его даю.",
  rule: `<p><b>кто → кого → кому → глагол</b></p><p><span class="et">Je lo tey donem.</span> Я тебе его даю.</p><p><span class="et">Il la mey montrit.</span> Он мне её показал.</p>`,
  prosto: `<p>В русском порядок свободный: «я тебе его даю», «я его тебе даю» — оба правильно. В Etoilal порядок <b>один</b>, поэтому не нужно думать:</p>
@@pin:chain@@
> Je lo tey donem. :: Я тебе его даю.
> Il la mey montrit. :: Он мне её показал.
> Nou lo leyz dizren. :: Мы им это скажем.
> Tu loz ney donres? :: Ты дашь их нам?
<h3>Как собрать</h3>
<p>Например: «Я дам тебе подарок». Подарок = «его» = [[lo]]. Тебе = [[tey]]. Дам = [[donrem]]. Ставим по формуле: [[Je lo tey donrem.]]</p>
<h3>С отрицанием и вопросом</h3>
> Je lo tey donrem pa. :: Я тебе его не дам.
> Eske tu lo mey montres? :: Ты мне его покажешь?
<h3>Частые ошибки</h3>
<p>• Менять местами «кого» и «кому»: «Je tey lo donem» → [[Je lo tey donem.]] • Ставить что-то после глагола: «Je lo donem tey» → [[Je lo tey donem.]]</p>`,
  lub: `<p>Во французском этот порядок — кошмар учеников: <i>je te le donne</i>, но <i>je le lui donne</i> — порядок зависит от лица. В Etoilal одна формула на все случаи.</p>`,
  pins: [{ id: "chain", t: "Порядок: кто → кого → кому → глагол", html: `<p><b>кто → кого → кому → глагол (→ pa)</b></p><p><span class="et">Je lo tey donem.</span> — Я тебе его даю.</p><p><span class="et">Je lo tey donem pa.</span> — Я тебе его не даю.</p>` }],
  tasks: [
    { k: "input", q: "Я тебе его даю.", a: ["Je lo tey donem."], why: "кто → кого → кому → глагол" },
    { k: "tiles", q: "Он мне её показал.", a: "Il la mey montrit", d: ["mo", "ley"], why: "la (её) → mey (мне) → глагол" },
    { k: "fix", q: "Je tey lo donem.", a: ["Je lo tey donem."], why: "сначала «кого», потом «кому»" },
    { k: "input", q: "Я дам тебе подарок. (подарок — «его»)", a: ["Je lo tey donrem."], why: "lo tey + donrem" },
    { k: "input", q: "Мы им это скажем.", a: ["Nou lo leyz dizren."], why: "lo → leyz → глагол" },
    { k: "choice", q: "«Ты дашь их нам?»", opts: ["Tu loz ney donres?", "Tu ney loz donres?", "Tu donres loz ney?"], a: "Tu loz ney donres?", why: "кого (loz) → кому (ney)" },
    { k: "input", q: "Я тебе его не дам.", a: ["Je lo tey donrem pa."], why: "pa — после глагола" },
    { k: "input", q: "Ты мне его покажешь?", a: ["Eske tu lo mey montres?", "Tu lo mey montres?"], why: "показываешь — сейчас; lo mey" },
    { k: "choice", q: "Что значит voizen?", opts: ["сосед", "врач", "друг"], a: "сосед", lang: "x", why: "voizen — сосед, dokteur — врач" },
    { k: "input", q: "Врач мне ответил.", a: ["Le dokteur mey repondit."], why: "mey перед глаголом" },
  ] };
