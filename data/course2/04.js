window.ET_C2 = window.ET_C2 || {};
ET_C2[4] = { n: 4, sec: 1, t: "Я, ты, он… — личные местоимения", s: "je, tu, il, el, nou, vou, ilz, elz",
  words: [["om", "мужчина, человек"], ["omela", "женщина"], ["frer", "брат"], ["seur", "сестра"], ["maman", "мама"], ["per", "отец, папа"], ["bonjour", "здравствуй(те)"], ["mersi", "спасибо"]],
  gram: ["je", "tu", "il", "el", "nou", "vou", "ilz", "elz", "e"],
  sut: "Я — <b>je</b>, ты — <b>tu</b>, он — <b>il</b>, она — <b>el</b>, мы — <b>nou</b>, вы — <b>vou</b>, они — <b>ilz</b> (или <b>elz</b>, если все — женщины).",
  rule: `<table class="tbl"><tbody><tr><td>я</td><td class="et">je</td><td>мы</td><td class="et">nou</td></tr><tr><td>ты</td><td class="et">tu</td><td>вы</td><td class="et">vou</td></tr>
<tr><td>он</td><td class="et">il</td><td>они</td><td class="et">ilz</td></tr><tr><td>она</td><td class="et">el</td><td>они (ж.)</td><td class="et">elz</td></tr></tbody></table><p>«и» — <span class="et">e</span></p>`,
  prosto: `<p>Без этих слов не построить ни одной фразы, поэтому начинаем с них. Их всего восемь:</p>
@@pin:pron@@
<h3>Как запомнить</h3>
<p>• <b>je, tu</b> — почти как по-французски. • <b>il</b> — он, <b>el</b> — она: отличаются одной буквой. • «Они» — это «он» + <b>z</b>: [[il]] → [[ilz]], [[el]] → [[elz]]. Запомни эту z — в Etoilal она всегда значит «много».</p>
<h3>ilz или elz?</h3>
<p>Если среди «них» есть хотя бы один мужчина — [[ilz]]. Если только женщины — [[elz]]. Как во французском (<i>ils / elles</i>).</p>
> frer e seur :: брат и сестра → ilz (они)
> maman e seur :: мама и сестра → elz (они, только женщины)
<h3>vou — и «вы», и «Вы»</h3>
<p>[[vou]] говорят нескольким людям — и одному человеку вежливо, как русское «Вы».</p>
<h3>Маленькое слово «и»</h3>
<p>«и» — это одна буква <b>e</b>: [[je e tu]] — «я и ты», [[frer e seur]] — «брат и сестра».</p>
<h3>Вежливые слова</h3>
<p>И сразу два слова, без которых не обойтись: [[bonjour]] — «здравствуй(те)» и [[mersi]] — «спасибо». Ударение, как всегда, в конце: «бонжУр», «мэрсИ».</p>
<h3>Частые ошибки</h3>
<p>• Путать [[il]] и [[el]]: il — он, el — она. • Говорить [[ilz]] о маме и сестре — надо [[elz]].</p>`,
  lub: `<p>Почему «они» = «он» + z? В Etoilal z — это знак множества для всех маленьких слов: «тот» le → «те» lez, «он» il → «они» ilz. Одна логика на весь язык — ты увидишь её ещё много раз.</p>
<p>О вещах (стол, дом) в Etoilal тоже говорят «он» — il, как во французском. Рода у вещей нет вообще.</p>`,
  pins: [{ id: "pron", t: "Личные местоимения", html: `<table class="tbl"><tbody><tr><td>я</td><td class="et">je</td><td>мы</td><td class="et">nou</td></tr><tr><td>ты</td><td class="et">tu</td><td>вы, Вы</td><td class="et">vou</td></tr><tr><td>он</td><td class="et">il</td><td>они</td><td class="et">ilz</td></tr><tr><td>она</td><td class="et">el</td><td>они (только женщины)</td><td class="et">elz</td></tr></tbody></table>` }],
  tasks: [
    { k: "input", q: "мы", a: ["nou"], why: "мы — nou" },
    { k: "choice", q: "«она»", opts: ["il", "el", "elz"], a: "el", why: "il — он, el — она" },
    { k: "choice", q: "«вы»", opts: ["vou", "nou", "tu"], a: "vou", why: "vou — вы (и вежливое «Вы»)" },
    { k: "input", q: "они (брат и сестра)", a: ["ilz"], why: "есть мужчина → ilz" },
    { k: "input", q: "они (мама и сестра)", a: ["elz"], why: "только женщины → elz" },
    { k: "choice", q: "Что значит je?", opts: ["я", "ты", "он"], a: "я", lang: "x", why: "je — я" },
    { k: "tiles", q: "я и ты", a: "je e tu", d: ["il", "nou"], why: "e — «и»" },
    { k: "input", q: "брат и сестра", a: ["frer e seur"], why: "e — «и»" },
    { k: "choice", q: "Как сказать «Вы» одному человеку вежливо?", opts: ["tu", "vou", "il"], a: "vou", why: "vou — и «вы», и вежливое «Вы»" },
    { k: "choice", q: "Что значит omela?", opts: ["женщина", "мужчина", "мама"], a: "женщина", lang: "x", why: "omela — женщина" },
  ] };
