window.ET_C2 = window.ET_C2 || {};
ET_C2[21] = { n: 21, sec: 3, t: "Кому: mey, tey, ley…", s: "мне, тебе, ему — тоже перед глаголом",
  words: [["doner", "давать"], ["montrer", "показывать"], ["demander", "спрашивать, просить"], ["reponder", "отвечать"], ["telefoner", "звонить"], ["qourye", "письмо"]],
  gram: ["mey", "tey", "ley", "ney", "vey", "leyz"],
  sut: "Мне — <b>mey</b>, тебе — <b>tey</b>, ему/ей — <b>ley</b>, нам — <b>ney</b>, вам — <b>vey</b>, им — <b>leyz</b>. Все на <b>-ey</b>, все перед глаголом.",
  rule: `<table class="tbl"><tbody><tr><td>мне</td><td class="et">mey</td><td>нам</td><td class="et">ney</td></tr><tr><td>тебе</td><td class="et">tey</td><td>вам</td><td class="et">vey</td></tr><tr><td>ему, ей</td><td class="et">ley</td><td>им</td><td class="et">leyz</td></tr></tbody></table><p><span class="et">Je tey telefonem.</span> Я тебе звоню.</p>`,
  prosto: `<p>«Кому?» — мне, тебе, ему. У этих слов в Etoilal одна примета: все кончаются на <b>-ey</b>.</p>
@@pin:komu@@
> Je tey telefonem. :: Я тебе звоню.
> Il mey repondit. :: Он мне ответил.
> Nou ley demanden. :: Мы его (её) спрашиваем. (дословно «ему»)
> El ney montret le jarden. :: Она показывает нам сад.
> Tu leyz donres le pen? :: Ты дашь им хлеб?
<h3>Отличай «кого» и «кому»</h3>
<p>«кого» — на -o/-a: [[mo]], [[to]], [[lo]]. «кому» — на -ey: [[mey]], [[tey]], [[ley]].</p>
> Il mo voiyet. :: Он меня видит.
> Il mey parlet. :: Он мне говорит.
<h3>ley — и «ему», и «ей»</h3>
<p>Как [[sa]] «его/её», [[ley]] не различает род. Кто имеется в виду — понятно из разговора.</p>
<h3>Глаголы «кому»</h3>
<p>Обрати внимание: «спрашивать», «звонить», «отвечать» в Etoilal идут с «кому», как во французском: [[Je ley demandem]] — дословно «я ему спрашиваю».</p>
<h3>Частые ошибки</h3>
<p>• Путать mo и mey: «Il mo telefonet» → [[Il mey telefonet.]] (звонит мне — кому?). • Ставить после глагола: «Je telefonem tey» → [[Je tey telefonem.]]</p>`,
  lub: `<p>Французский тут хитрее: <i>me, te</i> там одинаковы для «кого» и «кому», а различаются только <i>le/la</i> и <i>lui</i>. В Etoilal всё различается, и по одной примете (-o/-a или -ey) сразу видно, какое это слово.</p>`,
  pins: [{ id: "komu", t: "Кому: mey, tey, ley…", html: `<table class="tbl"><tbody><tr><td>мне</td><td class="et">mey</td><td>нам</td><td class="et">ney</td></tr><tr><td>тебе</td><td class="et">tey</td><td>вам</td><td class="et">vey</td></tr><tr><td>ему, ей</td><td class="et">ley</td><td>им</td><td class="et">leyz</td></tr></tbody></table><p>Все на -ey, всегда <b>перед</b> глаголом.</p>` }],
  tasks: [
    {"k": "input", "q": "Я вам звоню.", "a": ["Je vey telefonem."], "why": "vey — вам"},
    {"k": "input", "q": "Она мне ответила.", "a": ["El mey repondit."], "why": "mey — мне; i — было"},
    { k: "choice", q: "«нам»", opts: ["no", "nou", "ney"], a: "ney", why: "кому — на -ey" },
    {"k": "fix", "q": "Il mo demandet.", "a": ["Il mey demandet."], "why": "спрашивать идёт с «кому» — mey"},
    {"k": "input", "q": "Он показывает мне дом.", "a": ["Il mey montret le mezon."], "why": "mey — мне"},
    {"k": "tiles", "q": "Ты дашь мне хлеб?", "a": "Tu mey donres le pen", "d": ["mo", "ley"], "why": "mey — мне"},
    { k: "choice", q: "«Он меня видит» — какое слово?", opts: ["mo", "mey"], a: "mo", lang: "et", why: "видит кого? — mo" },
    {"k": "input", "q": "Мы им звоним.", "a": ["Nou leyz telefonen."], "why": "leyz — им"},
    { k: "input", q: "Я ему не ответил.", a: ["Je ley repondim pa."], why: "ley перед глаголом, pa после" },
    { k: "choice", q: "Что значит qourye?", opts: ["письмо", "подарок", "ключ"], a: "письмо", lang: "x", why: "qourye — письмо" },
  ] };
