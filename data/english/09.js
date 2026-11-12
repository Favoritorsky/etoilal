window.EN_C = window.EN_C || {};
EN_C[9] = { n: 9, t: "Мочь и надо: can, must, have to, should", s: "умею, обязан, приходится, стоит",
  words: [["can", "могу, умею", "кэн"], ["can't", "не могу", "кант"], ["must", "должен (обязан)", "маст"], ["have to", "приходится, надо", "хэв ту"], ["should", "стоит, следует", "шуд"], ["mustn't", "нельзя", "маснт"], ["allowed", "разрешено", "элáуд"], ["advice", "совет", "эдвáйс"]],
  sut: "{{can}} — могу/умею. {{must}} — я сам считаю, что обязан. {{have to}} — так надо по правилам или обстоятельствам. {{should}} — совет: «стоит». После всех них — глагол без to: {{can play}}, {{should go}}. Исключение — have <b>to</b>.",
  rule: `<table class="tbl"><thead><tr><th>слово</th><th>значит</th><th>пример</th></tr></thead><tbody>
<tr><td class="fr">can / can't</td><td>могу, умею / не могу</td><td class="fr">I can swim.</td></tr>
<tr><td class="fr">could</td><td>мог (в прошлом); не могли бы вы</td><td class="fr">Could you help me?</td></tr>
<tr><td class="fr">must</td><td>должен (сам так считаю)</td><td class="fr">I must study more.</td></tr>
<tr><td class="fr">have to / has to</td><td>приходится (правила, жизнь)</td><td class="fr">She has to work on Sunday.</td></tr>
<tr><td class="fr">should</td><td>стоит, советую</td><td class="fr">You should sleep.</td></tr>
<tr><td class="fr">mustn't · don't have to</td><td>нельзя · не обязательно</td><td class="fr">You mustn't smoke here. · You don't have to come.</td></tr></tbody></table>`,
  prosto: `<p>Главная ловушка: {{mustn't}} и {{don't have to}} — совсем разные вещи. «Mustn't» — запрещено. «Don't have to» — не обязательно, можешь, если хочешь.</p>
> I can't find my phone. :: Не могу найти телефон.
> Can you help me? :: Можешь мне помочь?
> Could you repeat, please? :: Не могли бы вы повторить? — вежливее, чем can
> I have to get up at six. :: Мне приходится вставать в шесть.
> She has to wear a uniform. :: Ей приходится носить форму. — she → has to
> You should go to bed. :: Тебе стоит лечь спать.
> You shouldn't eat so much sugar. :: Не стоит есть так много сахара.
> You mustn't touch it! :: Это трогать нельзя!
> You don't have to pay, it's free. :: Платить не нужно, это бесплатно.
@@pin:en9@@
<h3>Прошлое и будущее</h3>
<p>У must нет прошлого — берут {{had to}}: {{I had to wait.}} — «Мне пришлось ждать». «Смогу» — {{will be able to}}: {{I'll be able to come.}}</p>
<h3>Частые ошибки</h3>
<p>• «I can to swim» → {{I can swim.}} • «He cans» — у can нет -s: {{He can.}} • «You must not to go» → {{You mustn't go.}}</p>`,
  lub: `<p>{{gotta}} — разговорное «have got to» = надо: <i>I gotta go!</i> — «Мне пора!» Услышишь в фильмах и песнях постоянно.</p>`,
  pins: [{ id: "en9", t: "can / must / have to / should", html: `<table class="tbl"><tbody><tr><td class="fr">can · could</td><td>могу · мог; вежливая просьба</td></tr><tr><td class="fr">must · have to (had to)</td><td>должен · приходится (пришлось)</td></tr><tr><td class="fr">should</td><td>стоит (совет)</td></tr><tr><td class="fr">mustn't ≠ don't have to</td><td>нельзя ≠ не обязательно</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "I … swim. (умею)", opts: ["can", "can to", "cans"], a: "can", why: "can + глагол без to" },
    { k: "input", lang: "en", q: "Не могу найти телефон.", a: ["I can't find my phone.", "I cannot find my phone.", "I can't find my phone!"], why: "can't + find" },
    { k: "choice", q: "Это бесплатно — платить не нужно. You … pay.", opts: ["mustn't", "don't have to", "can't"], a: "don't have to", why: "не обязательно — don't have to" },
    { k: "input", lang: "en", q: "Тебе стоит лечь спать.", a: ["You should go to bed.", "You should sleep."], why: "совет — should" },
    { k: "fix", lang: "en", q: "She have to work on Sunday.", a: ["She has to work on Sunday."], why: "she → has to" },
    { k: "input", lang: "en", q: "Мне пришлось ждать.", a: ["I had to wait."], why: "прошлое — had to" },
    { k: "choice", q: "Вежливо: «Не могли бы вы повторить?»", opts: ["Could you repeat, please?", "You must repeat.", "Repeat!"], a: "Could you repeat, please?", why: "could — вежливо" },
    { k: "listen", say: "You mustn't touch it!", q: "Что прозвучало?", opts: ["Это трогать нельзя!", "Это можно не трогать.", "Тебе стоит это потрогать."], a: "Это трогать нельзя!", why: "mustn't — нельзя" },
    { k: "fix", lang: "en", q: "I can to help you.", a: ["I can help you."], why: "после can — без to" },
    { k: "input", lang: "en", q: "Можешь мне помочь?", a: ["Can you help me?", "Could you help me?"], why: "Can you…?" },
  ] };
