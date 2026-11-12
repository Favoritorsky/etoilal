window.EN_C = window.EN_C || {};
EN_C[20] = { n: 20, t: "Ещё раньше: Past Perfect", s: "the train had left — к тому моменту уже",
  words: [["by the time", "к тому времени, как", "бай зэ тайм"], ["before", "до, раньше", "бифó"], ["realised", "понял, осознал (realise)", "рúэлайзд"], ["gone", "ушёл, уехал (go)", "гон"], ["closed", "закрыл(ся)", "клóузд"], ["missed", "пропустил, опоздал на (miss)", "мист"], ["already", "уже", "олрэ́ди"], ["never … before", "никогда раньше не", "нэ́вэ … бифó"]],
  sut: "{{had}} + третья форма — «уже <b>до</b> того момента в прошлом». {{When I arrived, the train had left.}} — «Когда я пришёл, поезд <b>уже</b> ушёл» (сначала ушёл поезд, потом пришёл я).",
  rule: `<table class="tbl"><thead><tr><th>что раньше</th><th>что потом</th></tr></thead><tbody>
<tr><td class="fr">had + 3-я форма</td><td class="fr">Past Simple</td></tr>
<tr><td class="fr">The film had started</td><td class="fr">when we came in.</td></tr>
<tr><td class="fr">I had never seen snow</td><td class="fr">before I went to Moscow.</td></tr></tbody></table>
<p>Форма одна для всех: {{I had}}, {{she had}}, {{they had}}. Коротко — {{I'd}}, {{she'd}}. Не — {{hadn't}}.</p>`,
  prosto: `<p>Past Perfect нужен, когда рассказываешь о прошлом и хочешь «отмотать ещё назад». Если события идут по порядку — хватит Past Simple.</p>
> When I arrived, the train had already left. :: Когда я пришёл, поезд уже ушёл.
> I realised that I had lost my phone. :: Я понял, что потерял телефон.
> By the time we got there, the shop had closed. :: Когда мы добрались, магазин уже закрылся.
> She had never seen the sea before. :: Она никогда раньше не видела моря.
> He was angry because I had forgotten his birthday. :: Он злился, потому что я забыл про его день рождения.
> We missed the start — the game had begun. :: Мы пропустили начало — игра уже началась.
@@pin:en20@@
<h3>По порядку — без Past Perfect</h3>
<p>{{I got up, had breakfast and went to school.}} — всё по порядку, Past Simple. А {{When I got to school, the lesson had started.}} — урок начался раньше, чем я пришёл.</p>
<h3>Частые ошибки</h3>
<p>• «When I came, the train left» — звучит, как будто поезд ушёл, когда ты пришёл (одновременно). Надо {{had left}}. • «I had went» → {{I had gone.}}</p>`,
  lub: `<p>В «The Last Train»: Павел нашёл в кармане билет, которого раньше не было. Можно сказать: <i>Somebody had put a ticket in his pocket.</i> — «Кто-то (до этого) положил ему билет в карман».</p>`,
  pins: [{ id: "en20", t: "Past Perfect", html: `<table class="tbl"><tbody><tr><td class="fr">had + 3-я форма</td><td>уже до того момента</td></tr><tr><td class="fr">When I came, the train had left</td><td>сначала ушёл поезд</td></tr><tr><td class="fr">by the time · never … before</td><td>к тому времени · никогда раньше</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "When I arrived, the train … left.", opts: ["had", "has", "was"], a: "had", why: "раньше другого прошлого — had left" },
    { k: "input", lang: "en", q: "Я понял, что потерял телефон.", a: ["I realised that I had lost my phone.", "I realized that I had lost my phone.", "I realised I had lost my phone.", "I realized I had lost my phone.", "I realised that I'd lost my phone."], why: "потерял раньше — had lost" },
    { k: "fix", lang: "en", q: "She had never saw the sea before.", a: ["She had never seen the sea before."], why: "had + seen" },
    { k: "input", lang: "en", q: "Когда мы добрались, магазин уже закрылся.", a: ["By the time we got there, the shop had closed.", "When we got there, the shop had closed.", "When we got there, the shop had already closed.", "By the time we got there, the shop had already closed."], why: "had closed" },
    { k: "choice", q: "Я встал, позавтракал и пошёл в школу.", opts: ["I got up, had breakfast and went to school.", "I had got up, had had breakfast and went to school."], a: "I got up, had breakfast and went to school.", why: "по порядку — Past Simple" },
    { k: "listen", say: "We missed the start — the game had begun.", q: "Что прозвучало?", opts: ["Мы пропустили начало — игра уже началась.", "Мы успели к началу игры.", "Игра начнётся без нас."], a: "Мы пропустили начало — игра уже началась.", why: "had begun — уже началась" },
    { k: "input", lang: "en", q: "Она никогда раньше не видела моря.", a: ["She had never seen the sea before.", "She'd never seen the sea before."], why: "had never seen … before" },
    { k: "choice", q: "He was angry because I … his birthday.", opts: ["had forgotten", "have forgotten", "forget"], a: "had forgotten", why: "забыл раньше, чем он злился" },
    { k: "fix", lang: "en", q: "When we came in, the film has started.", a: ["When we came in, the film had started.", "When we came in, the film had already started."], why: "had started" },
  ] };
