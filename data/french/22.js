window.FR_C = window.FR_C || {};
FR_C[22] = { n: 22, t: "Где, когда, как, почему", s: "où, quand, comment, pourquoi, qui, quoi",
  words: [["où", "где, куда", "у"], ["quand", "когда", "кан"], ["pourquoi", "почему", "пуркуа"], ["parce que", "потому что", "парскё"],
    ["combien", "сколько", "комбьен"], ["quoi", "что (в конце фразы)", "куа"], ["quel, quelle", "какой, какая", "кэль"], ["la question", "вопрос", "ла кэстьон"]],
  sut: "Вопросительное слово можно поставить <b>в конец</b> — так говорят в разговоре: {{Tu habites où ?}} «Ты живёшь где?». Или <b>в начало</b> с est-ce que: {{Où est-ce que tu habites ?}} На «почему» — {{pourquoi}} — отвечают {{parce que}} «потому что».",
  rule: `<table class="tbl"><thead><tr><th>слово</th><th>значит</th><th>пример</th></tr></thead><tbody>
<tr><td class="fr">où</td><td>где, куда</td><td class="fr">Tu habites où ?</td></tr><tr><td class="fr">quand</td><td>когда</td><td class="fr">Tu pars quand ?</td></tr>
<tr><td class="fr">comment</td><td>как</td><td class="fr">Comment tu t'appelles ?</td></tr><tr><td class="fr">pourquoi</td><td>почему</td><td class="fr">Pourquoi tu ris ?</td></tr>
<tr><td class="fr">qui</td><td>кто</td><td class="fr">Qui est-ce ?</td></tr><tr><td class="fr">combien</td><td>сколько</td><td class="fr">C'est combien ?</td></tr>
<tr><td class="fr">quel / quelle</td><td>какой / какая</td><td class="fr">Quelle heure est-il ?</td></tr></tbody></table>`,
  prosto: `<p>Есть три способа задать вопрос со словом «где, когда, как». В разговоре проще всего — обычная фраза, а вопросительное слово в конце:</p>
> Tu habites où ? :: Где ты живёшь? — «тю абит у»
> Tu manges quoi ? :: Что ты ешь? — «тю манж куа»
> C'est combien ? :: Сколько это стоит? — «сэ комбьен»
<p>Или вопросительное слово в начало + {{est-ce que}}:</p>
> Où est-ce que tu habites ? :: Где ты живёшь? — «у эскё тю абит»
> Quand est-ce que tu vas à Paris ? :: Когда ты едешь в Париж? — «кантэскё тю ва а пари»
> Pourquoi est-ce que tu es fatigué ? :: Почему ты устал? — «пуркуа эскё тю э фатигэ»
> Parce que je travaille beaucoup. :: Потому что я много работаю. — «парскё жё травай боку»
> Qui est-ce ? :: Кто это? — «ки эс»
> Quel livre ? :: Какая книга? — «кэль ливр»
@@pin:fr22@@
<h3>quel и quelle</h3>
<p>«Какой» меняется по роду: {{quel livre}} (он), {{quelle maison}} (она), {{quels}}, {{quelles}} — много. Звучат все одинаково: «кэль».</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> те же вопросы: где, когда, как, почему, кто, сколько.</p>
<p><b>Не как в русском:</b> в разговоре французы часто ставят вопросительное слово <b>в конец</b>: «Ты живёшь где?». «Что» в конце — {{quoi}}, а в начале — {{qu'est-ce que}}.</p>
<h3>Частые ошибки</h3>
<p>• Путают {{où}} «где» и {{ou}} «или» — звучат одинаково, пишутся по-разному. • «Pourquoi tu es fatigué ? — Pourquoi je travaille» — в ответе надо {{parce que}}. • {{quand}} читают «кванд» — надо «кан».</p>`,
  lub: `<p>Вопросы с вопросительным словом в конце («Tu vas où ?») — чисто разговорные. В книгах пишут с перестановкой: <i>Où vas-tu ?</i> Ты их узнаешь по чёрточке между глаголом и «кто».</p>
<p>{{pourquoi}} буквально «для чего» (<i>pour quoi</i>), а {{parce que}} — «через то, что». Похоже на русское «почему» = «по чему».</p>`,
  pins: [{ id: "fr22", t: "Вопросительные слова", html: `<table class="tbl"><tbody><tr><td class="fr">où · quand · comment</td><td>где · когда · как</td></tr><tr><td class="fr">pourquoi — parce que</td><td>почему — потому что</td></tr><tr><td class="fr">qui · quoi · combien</td><td>кто · что · сколько</td></tr><tr><td class="fr">quel / quelle</td><td>какой / какая</td></tr><tr><td>порядок</td><td class="fr">Tu habites où ? / Où est-ce que tu habites ?</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Где ты живёшь? — Tu habites …?", opts: ["où", "ou", "quand"], a: "où", why: "где — où (со значком)" },
    { k: "input", lang: "fr", q: "Сколько это стоит?", a: ["C'est combien ?", "C'est combien"], why: "c'est combien — «сэ комбьен»" },
    { k: "tiles", lang: "fr", q: "Когда ты едешь в Париж?", a: "Quand est-ce que tu vas à Paris", d: ["où", "pourquoi"], why: "quand + est-ce que" },
    { k: "choice", q: "— Pourquoi tu es fatigué ? — … je travaille beaucoup.", opts: ["Parce que", "Pourquoi", "Quand"], a: "Parce que", why: "почему — потому что: parce que" },
    { k: "choice", q: "… maison ? (какой дом)", opts: ["Quel", "Quelle", "Quels"], a: "Quelle", why: "maison — «она»: quelle" },
    { k: "listen", say: "Qui est-ce ?", q: "Что прозвучало?", opts: ["Кто это?", "Что это?", "Где это?"], a: "Кто это?", why: "qui — кто" },
    { k: "input", lang: "fr", q: "Что ты ешь? (вопрос в конце)", a: ["Tu manges quoi ?", "Tu manges quoi"], why: "в конце фразы «что» — quoi" },
    { k: "choice", q: "Как читается quand?", opts: ["кванд", "кан", "куан"], a: "кан", why: "qu — «к», an — в нос, d молчит" },
    { k: "input", lang: "fr", q: "Где ты живёшь? (с est-ce que)", a: ["Où est-ce que tu habites ?", "Où est-ce que tu habites"], why: "où + est-ce que + обычная фраза" },
    { k: "choice", q: "Чем отличаются où и ou?", opts: ["où — где, ou — или", "ничем", "où — когда, ou — где"], a: "où — где, ou — или", why: "звучат одинаково, значат разное" },
  ] };
