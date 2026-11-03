window.ET_C2 = window.ET_C2 || {};
ET_C2[31] = { n: 31, sec: 4, t: "Наверное: pe", s: "Il dormepet — он, наверное, спит; вся схема глагола",
  words: [["fatiger", "уставать"], ["entelijan", "умный"], ["rapid", "быстрый"], ["lan", "медленный"], ["febl", "слабый"]],
  gram: [], unlock: { m: ["pe"] },
  sut: "Третий кусочек — <b>pe</b>, «наверное»: Il dormepet — он, наверное, спит. Теперь у тебя вся схема глагола: основа + время + (ri/se/pe) + кто.",
  rule: `<p>основа + время + <b>pe</b> + кто</p><p><span class="et">Il dormepet.</span> Он, наверное, спит.</p><p><span class="et">El revnipet.</span> Она, наверное, вернулась.</p>`,
  prosto: `<p>[[pe]] — «наверное», когда ты не уверен:</p>
> Il dormepet. :: Он, наверное, спит.
> El fatigepet. :: Она, наверное, устала (устаёт).
> Ilz revnipel. :: Они, наверное, вернулись.
> Tu eses entelijan, tu savepes! :: Ты умный, ты, наверное, знаешь!
<h3>Вся схема глагола</h3>
<p>Теперь ты знаешь <b>все</b> кусочки глагола Etoilal. Любая форма любого глагола собирается так:</p>
@@pin:scheme@@
> dans-re-pe-n :: танцевать + будет + наверное + мы = «мы, наверное, будем танцевать»
> chant-i-ri-m :: петь + было + бы + я = «я бы спел (тогда)»
> dorm-e-se-t :: спать + сейчас + пусть + он = «пусть спит»
<h3>Частые ошибки</h3>
<p>• Ставить pe в конец: «dormetpe» → [[dormepet]]. • Добавлять «наверное» отдельным словом — не нужно, всё внутри глагола.</p>`,
  lub: `<p>В лингвистике это <b>предположительное наклонение</b> (эпистемическое). В русском и французском его нет — говорят «наверное», «должно быть». А в некоторых языках (турецком, болгарском) оно есть — как в Etoilal.</p>`,
  pins: [{ id: "scheme", t: "Вся схема глагола", html: `<p><b>основа + время + (наклонение) + кто</b></p><table class="tbl"><tbody><tr><td>время</td><td><span class="et lt">e</span> сейчас · <span class="et lt">i</span> было · <span class="et lt">a</span> было долго · <span class="et lt">re</span> будет · <span class="et lt">o</span> вот-вот · <span class="et lt">u</span> только что</td></tr><tr><td>наклонение</td><td><span class="et lt">ri</span> бы · <span class="et lt">se</span> пусть · <span class="et lt">pe</span> наверное</td></tr><tr><td>кто</td><td><span class="et lt">m</span> я · <span class="et lt">s</span> ты · <span class="et lt">t</span> он · <span class="et lt">n</span> мы · <span class="et lt">z</span> вы · <span class="et lt">l</span> они</td></tr><tr><td>приказ</td><td>основа + <span class="et lt">e</span></td></tr></tbody></table>` }],
  tasks: [
    {"k": "input", "q": "Она, наверное, спит.", "a": ["El dormepet."], "why": "e + pe + t"},
    {"k": "input", "q": "Они, наверное, ушли.", "a": ["Ilz partipel."], "why": "i + pe + l"},
    { k: "choice", q: "Что значит fatigepet?", opts: ["наверное, устаёт", "пусть устаёт", "устал бы"], a: "наверное, устаёт", lang: "x", why: "pe — наверное" },
    { k: "input", q: "Ты, наверное, знаешь.", a: ["Tu savepes."], why: "sav + e + pe + s" },
    {"k": "fix", "q": "Il chantetpe.", "a": ["Il chantepet."], "why": "pe — перед «кто»"},
    { k: "choice", q: "«мы, наверное, будем танцевать»", opts: ["dansrepen", "dansepen", "dansiren"], a: "dansrepen", why: "re + pe + n" },
    { k: "input", q: "я бы спел (тогда)", a: ["Je chantirim."], why: "i + ri + m" },
    { k: "tiles", q: "Она, наверное, устала.", a: "El fatigipet", d: ["fatiget", "fatigeset"], why: "i + pe + t" },
    { k: "choice", q: "Что значит lan?", opts: ["медленный", "быстрый", "слабый"], a: "медленный", lang: "x", why: "lan — медленный, rapid — быстрый" },
    { k: "input", q: "Пусть он отдыхает.", a: ["Il repozeset."], why: "e + se + t — пусть" },
  ] };
